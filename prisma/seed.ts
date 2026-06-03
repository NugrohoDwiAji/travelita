import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "@prisma/client";
import { emailSchema, nameSchema, passwordSchema, usernameSchema } from "../app/utils/auth-validation";
import { hashPassword } from "../app/utils/password";
import { z } from "zod";

const adminSeedSchema = z.object({
	name: nameSchema,
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
});

type AdminSeedInput = z.infer<typeof adminSeedSchema>;

function createPrismaClient() {
	const adapter = new PrismaPg({
		connectionString: process.env.DATABASE_URL,
	});

	return new PrismaClient({ adapter });
}

function getAdminSeedInput(): AdminSeedInput {
	const validation = adminSeedSchema.safeParse({
		name: process.env.ADMIN_NAME,
		username: process.env.ADMIN_USERNAME,
		email: process.env.ADMIN_EMAIL,
		password: process.env.ADMIN_PASSWORD,
	});


	if (!validation.success) {
		const message = validation.error.issues
			.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
			.join("\n");

		throw new Error(`Konfigurasi admin tidak valid:\n${message}`);
	}

	return validation.data;
}

export async function seedAdminUser(prisma: PrismaClient, input: AdminSeedInput) {
	const existingAdmin = await prisma.user.findUnique({
		where: { email: input.email },
		select: { id: true, role: true },
	});

	const usernameOwner = await prisma.user.findFirst({
		where: {
			username: input.username,
			NOT: existingAdmin ? { email: input.email } : undefined,
		},
		select: { id: true, email: true },
	});

	if (usernameOwner) {
		throw new Error(
			`Username ${input.username} sudah dipakai oleh user lain (${usernameOwner.email}).`
		);
	}

	const hashedPassword = await hashPassword(input.password);

	const admin = await prisma.user.upsert({
		where: { email: input.email },
		update: {
			name: input.name,
			username: input.username,
			password: hashedPassword,
			role: UserRole.ADMIN,
		},
		create: {
			name: input.name,
			username: input.username,
			email: input.email,
			password: hashedPassword,
			role: UserRole.ADMIN,
		},
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			role: true,
			createdAt: true,
		},
		
	});

	return {
		admin,
		action: existingAdmin ? "updated" : "created"
	};
}

async function main() {
	const prisma = createPrismaClient();

	try {
		const input = getAdminSeedInput();
		const { admin, action } = await seedAdminUser(prisma, input);

		console.log(`Admin ${action}:`);
		console.log(`- id: ${admin.id}`);
		console.log(`- name: ${admin.name}`);
		console.log(`- username: ${admin.username}`);
		console.log(`- email: ${admin.email}`);
		console.log(`- role: ${admin.role}`);
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error("Gagal menjalankan seed admin.");
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
