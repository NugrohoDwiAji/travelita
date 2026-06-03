"use server";

import { randomUUID } from "crypto";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { BookingType, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const packageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama paket harus diisi"),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0, "Harga tidak boleh negatif"),
  features: z.string().min(1, "Fitur harus diisi"),
  badge: z.string().optional().nullable(),
  highlighted: z.boolean().default(false),
});

const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Pertanyaan harus diisi"),
  answer: z.string().min(1, "Jawaban harus diisi"),
});

const routeSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(1, "Asal harus diisi"),
  to: z.string().min(1, "Tujuan harus diisi"),
  duration: z.string().min(1, "Durasi harus diisi"),
  price: z.coerce.number().min(0, "Harga tidak boleh negatif"),
  tag: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  order: z.coerce.number().int().default(0),
});

const spotSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama spot harus diisi"),
  region: z.string().min(1, "Region harus diisi"),
  depth: z.string().min(1, "Kedalaman harus diisi"),
  price: z.coerce.number().min(0, "Harga tidak boleh negatif"),
  fish: z.string().optional().nullable(),
  level: z.string().optional().nullable(),
  tag: z.string().optional().nullable(),
  order: z.coerce.number().int().default(0),
  isBestSeller: z.boolean().default(false),
});

const contentSchema = z.object({
  badge: z.string().optional().nullable(),
  title: z.string().min(1, "Judul harus diisi"),
  subtitle: z.string().optional().nullable(),
  description: z.string().min(1, "Deskripsi harus diisi"),
  ctaPrimary: z.string().optional().nullable(),
  ctaSecondary: z.string().optional().nullable(),
  packages: z.array(packageSchema),
  faqs: z.array(faqSchema),
});

export type ContentInput = z.infer<typeof contentSchema>;
export type ServiceContent = ContentInput;
export type SpotInput = z.infer<typeof spotSchema>;

type ServiceSpotRecord = SpotInput & {
  id: string;
  contentId: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getServiceContent(serviceType: BookingType) {
  try {
    const content = await prisma.serviceContent.findUnique({
      where: { serviceType },
      include: {
        packages: true,
        faqs: true,
      },
    });

    return { success: true, data: content };
  } catch (error) {
    console.error("Error fetching service content:", error);
    return { success: false, error: "Gagal mengambil konten layanan." };
  }
}

export async function getContent(serviceType: BookingType) {
  return getServiceContent(serviceType);
}

export async function getServiceRoutes(serviceType: BookingType) {
  try {
    // Cari content ID dulu
    const content = await prisma.serviceContent.findUnique({
      where: { serviceType },
      select: { id: true },
    });

    if (!content) {
      return { success: true, data: [] };
    }

    // Query raw untuk bypass validasi ORM jika tabel belum ada
    const dbRoutes = await prisma.$queryRaw<
      Array<{
        id: string;
        contentId: string;
        from: string;
        to: string;
        duration: string;
        price: number;
        tag: string | null;
        type: string | null;
        icon: string | null;
        order: number;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      SELECT * FROM service_route
      WHERE "contentId" = ${content.id}
      ORDER BY "order" ASC
    `;

    // Buat rute bolak-balik: forward + reverse dengan harga sama
    const routes: typeof dbRoutes = [];
    let order = 0;

    for (const route of dbRoutes) {
      // Forward route (original)
      routes.push({ ...route, order });

      // Reverse route (swap from/to, same price)
      routes.push({
        ...route,
        id: `${route.id}-rev`,
        from: route.to,
        to: route.from,
        order: order + 1,
      });

      order += 2;
    }

    return { success: true, data: routes };
  } catch (error) {
    // Tabel service_route mungkin belum ada - return data kosong
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("service_route") || msg.includes("does not exist")) {
      return { success: true, data: [] };
    }
    console.error("Error fetching routes:", error);
    return { success: false, error: "Gagal mengambil data rute." };
  }
}

export async function getServiceSpots(serviceType: BookingType) {
  try {
    const content = await prisma.serviceContent.findUnique({
      where: { serviceType },
      select: { id: true },
    });

    if (!content) {
      return { success: true, data: [] };
    }

    const spots = await prisma.$queryRaw<ServiceSpotRecord[]>`
      SELECT
        id,
        "contentId",
        name,
        region,
        depth,
        price,
        fish,
        level,
        tag,
        "order",
        "isBestSeller",
        "createdAt",
        "updatedAt"
      FROM "service_spot"
      WHERE "contentId" = ${content.id}
      ORDER BY "order" ASC
    `;

    return { success: true, data: spots };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("service_spot") || msg.includes("does not exist")) {
      return { success: true, data: [] };
    }
    console.error("Error fetching spots:", error);
    return { success: false, error: "Gagal mengambil data spot." };
  }
}

export async function updateServiceContent(serviceType: BookingType, data: ContentInput) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Anda tidak memiliki izin untuk melakukan aksi ini." };
  }

  const validation = contentSchema.safeParse(data);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { success: false, error: firstError || "Data tidak valid." };
  }

  const { packages, faqs, ...contentData } = validation.data;

  try {
    // Sequential queries tanpa $transaction (Neon PostgreSQL timeout issue)
    // 1. Upsert ServiceContent
    const upsertedContent = await prisma.serviceContent.upsert({
      where: { serviceType },
      create: {
        ...contentData,
        serviceType,
      },
      update: contentData,
    });

    // 2. Handle Packages
    const existingPackages = await prisma.servicePackage.findMany({
      where: { contentId: upsertedContent.id },
      select: { id: true },
    });
    
    const newPackageIds = packages.filter(p => p.id).map(p => p.id as string);
    const packagesToDelete = existingPackages
      .filter(p => !newPackageIds.includes(p.id))
      .map(p => p.id);

    if (packagesToDelete.length > 0) {
      await prisma.servicePackage.deleteMany({
        where: { id: { in: packagesToDelete } },
      });
    }

    const existingPackageIds = existingPackages.map(p => p.id);
    for (const pkg of packages) {
      if (pkg.id && existingPackageIds.includes(pkg.id)) {
        await prisma.servicePackage.update({
          where: { id: pkg.id },
          data: { ...pkg, contentId: upsertedContent.id },
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...createData } = pkg;
        await prisma.servicePackage.create({
          data: { ...createData, contentId: upsertedContent.id },
        });
      }
    }

    // 3. Handle FAQs
    const existingFaqs = await prisma.serviceFaq.findMany({
      where: { contentId: upsertedContent.id },
      select: { id: true },
    });

    const existingFaqIds = existingFaqs.map(f => f.id);
    const newFaqIds = faqs.filter(f => f.id).map(f => f.id as string);
    const faqsToDelete = existingFaqs
      .filter(f => !newFaqIds.includes(f.id))
      .map(f => f.id);

    if (faqsToDelete.length > 0) {
      await prisma.serviceFaq.deleteMany({
        where: { id: { in: faqsToDelete } },
      });
    }

    for (const faq of faqs) {
      if (faq.id && existingFaqIds.includes(faq.id)) {
        await prisma.serviceFaq.update({
          where: { id: faq.id },
          data: { ...faq, contentId: upsertedContent.id },
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...createData } = faq;
        await prisma.serviceFaq.create({
          data: { ...createData, contentId: upsertedContent.id },
        });
      }
    }

    const result = await prisma.serviceContent.findUnique({
      where: { id: upsertedContent.id },
      include: {
        packages: true,
        faqs: true,
      },
    });

    revalidatePath("/admin/content");
    revalidatePath("/");

    return { success: true, message: "Konten layanan berhasil diperbarui.", data: result };
  } catch (error) {
    console.error("Error updating service content:", error);
    return { success: false, error: "Terjadi kesalahan server saat memperbarui konten layanan." };
  }
}

export async function updateServiceRoutes(serviceType: BookingType, routes: z.infer<typeof routeSchema>[]) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Anda tidak memiliki izin untuk melakukan aksi ini." };
  }

  const validation = z.array(routeSchema).safeParse(routes);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { success: false, error: firstError || "Data rute tidak valid." };
  }

  try {
    // Sequential queries tanpa $transaction (Neon PostgreSQL timeout issue)
    const content = await prisma.serviceContent.upsert({
      where: { serviceType },
      create: {
        serviceType,
        title: "",
        description: "",
      },
      update: {},
    });

    const existingRoutes = await prisma.serviceRoute.findMany({
      where: { contentId: content.id },
      select: { id: true },
    });

    const newRouteIds = validation.data.filter((r) => r.id).map((r) => r.id as string);
    const routesToDelete = existingRoutes
      .filter((r) => !newRouteIds.includes(r.id))
      .map((r) => r.id);

    if (routesToDelete.length > 0) {
      await prisma.serviceRoute.deleteMany({
        where: { id: { in: routesToDelete } },
      });
    }

    const existingRouteIds = existingRoutes.map((r) => r.id);
    for (const route of validation.data) {
      if (route.id && existingRouteIds.includes(route.id)) {
        await prisma.serviceRoute.update({
          where: { id: route.id },
          data: { ...route, contentId: content.id },
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...createData } = route;
        await prisma.serviceRoute.create({
          data: { ...createData, contentId: content.id },
        });
      }
    }

    const result = await prisma.serviceRoute.findMany({
      where: { contentId: content.id },
      orderBy: { order: "asc" },
    });

    revalidatePath("/admin/content");
    return { success: true, message: "Rute berhasil diperbarui.", data: result };
  } catch (error) {
    // Tabel service_route mungkin belum ada di database
    const isMissingTable =
      error instanceof Error &&
      error.message.includes("service_route");
    if (isMissingTable) {
      return {
        success: false,
        error: "Tabel rute belum tersedia. Jalankan migration: npx prisma migrate dev --name add_service_route",
      };
    }
    console.error("Error updating routes:", error);
    return { success: false, error: "Terjadi kesalahan server saat memperbarui rute." };
  }
}

export type RouteInput = z.infer<typeof routeSchema>;

export async function updateServiceSpots(serviceType: BookingType, spots: SpotInput[]) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Anda tidak memiliki izin untuk melakukan aksi ini." };
  }

  const validation = z.array(spotSchema).safeParse(spots);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { success: false, error: firstError || "Data spot tidak valid." };
  }

  try {
    const content = await prisma.serviceContent.upsert({
      where: { serviceType },
      create: {
        serviceType,
        title: "",
        description: "",
      },
      update: {},
    });

    const existingSpots = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM "service_spot"
      WHERE "contentId" = ${content.id}
    `;

    const newSpotIds = validation.data.filter((spot) => spot.id).map((spot) => spot.id as string);
    const spotsToDelete = existingSpots
      .filter((spot) => !newSpotIds.includes(spot.id))
      .map((spot) => spot.id);

    if (spotsToDelete.length > 0) {
      await prisma.$executeRaw`
        DELETE FROM "service_spot"
        WHERE id IN (${Prisma.join(spotsToDelete)})
          AND "contentId" = ${content.id}
      `;
    }

    const existingSpotIds = existingSpots.map((spot) => spot.id);
    for (const spot of validation.data) {
      if (spot.id && existingSpotIds.includes(spot.id)) {
        await prisma.$executeRaw`
          UPDATE "service_spot"
          SET
            name = ${spot.name},
            region = ${spot.region},
            depth = ${spot.depth},
            price = ${spot.price},
            fish = ${spot.fish},
            level = ${spot.level},
            tag = ${spot.tag},
            "order" = ${spot.order},
            "isBestSeller" = ${spot.isBestSeller},
            "updatedAt" = CURRENT_TIMESTAMP
          WHERE id = ${spot.id}
            AND "contentId" = ${content.id}
        `;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...createData } = spot;
        await prisma.$executeRaw`
          INSERT INTO "service_spot" (
            id,
            "contentId",
            name,
            region,
            depth,
            price,
            fish,
            level,
            tag,
            "order",
            "isBestSeller",
            "updatedAt"
          ) VALUES (
            ${randomUUID()},
            ${content.id},
            ${createData.name},
            ${createData.region},
            ${createData.depth},
            ${createData.price},
            ${createData.fish},
            ${createData.level},
            ${createData.tag},
            ${createData.order},
            ${createData.isBestSeller},
            CURRENT_TIMESTAMP
          )
        `;
      }
    }

    const result = await prisma.$queryRaw<ServiceSpotRecord[]>`
      SELECT
        id,
        "contentId",
        name,
        region,
        depth,
        price,
        fish,
        level,
        tag,
        "order",
        "isBestSeller",
        "createdAt",
        "updatedAt"
      FROM "service_spot"
      WHERE "contentId" = ${content.id}
      ORDER BY "order" ASC
    `;

    revalidatePath("/admin/content");
    revalidatePath("/spear-fishing");

    return { success: true, message: "Spot berhasil diperbarui.", data: result };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("service_spot") || msg.includes("does not exist")) {
      return {
        success: false,
        error: "Tabel spot belum tersedia. Jalankan migration: npx prisma migrate dev --name add_service_spot",
      };
    }
    console.error("Error updating spots:", error);
    return { success: false, error: "Terjadi kesalahan server saat memperbarui spot." };
  }
}

const privateCarPricingSchema = z.object({
  basePrice: z.coerce.number().min(0, "Harga dasar tidak boleh negatif"),
  fullDayMultiplier: z.coerce.number().min(1, "Multiplier minimal 1"),
});

export type PrivateCarPricingInput = z.infer<typeof privateCarPricingSchema>;

export async function getPrivateCarPricing() {
  try {
    const content = await prisma.serviceContent.findUnique({
      where: { serviceType: BookingType.PRIVATE_CAR },
      select: { id: true },
    });

    if (!content) {
      return { success: true, data: { basePrice: 350000, fullDayMultiplier: 1.8 } };
    }

    const pricing = await prisma.privateCarPricing.findUnique({
      where: { contentId: content.id },
    });

    if (!pricing) {
      return { success: true, data: { basePrice: 350000, fullDayMultiplier: 1.8 } };
    }

    return {
      success: true,
      data: {
        basePrice: pricing.basePrice,
        fullDayMultiplier: pricing.fullDayMultiplier,
      },
    };
  } catch (error) {
    // Tabel mungkin belum ada
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("private_car_pricing") || msg.includes("does not exist")) {
      return { success: true, data: { basePrice: 350000, fullDayMultiplier: 1.8 } };
    }
    console.error("Error fetching private car pricing:", error);
    return { success: false, error: "Gagal mengambil data harga." };
  }
}

export async function updatePrivateCarPricing(data: PrivateCarPricingInput) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Anda tidak memiliki izin untuk melakukan aksi ini." };
  }

  const validation = privateCarPricingSchema.safeParse(data);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { success: false, error: firstError || "Data tidak valid." };
  }

  try {
    // Upsert content dulu
    const content = await prisma.serviceContent.upsert({
      where: { serviceType: BookingType.PRIVATE_CAR },
      create: {
        serviceType: BookingType.PRIVATE_CAR,
        title: "Private Car",
        description: "Layanan private car untuk perjalanan Anda.",
      },
      update: {},
    });

    // Upsert pricing
    const pricing = await prisma.privateCarPricing.upsert({
      where: { contentId: content.id },
      create: {
        contentId: content.id,
        basePrice: validation.data.basePrice,
        fullDayMultiplier: validation.data.fullDayMultiplier,
      },
      update: {
        basePrice: validation.data.basePrice,
        fullDayMultiplier: validation.data.fullDayMultiplier,
      },
    });

    revalidatePath("/admin/content");
    revalidatePath("/");

    return {
      success: true,
      message: "Harga berhasil diperbarui.",
      data: {
        basePrice: pricing.basePrice,
        fullDayMultiplier: pricing.fullDayMultiplier,
      },
    };
  } catch (error) {
    // Tabel mungkin belum ada
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("private_car_pricing") || msg.includes("does not exist")) {
      return {
        success: false,
        error: "Tabel harga belum tersedia. Jalankan migration: npx prisma migrate dev --name add_private_car_pricing",
      };
    }
    console.error("Error updating private car pricing:", error);
    return { success: false, error: "Terjadi kesalahan server saat memperbarui harga." };
  }
}
