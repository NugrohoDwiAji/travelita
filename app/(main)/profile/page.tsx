import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import ProfileUserCard, { type ProfileUserData } from "@/app/components/organism/ProfileUserCard";


async function getCurrentUserProfile(userId: string): Promise<ProfileUserData | null> {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      profile: {
        select: {
          id: true,
          userId: true,
          coutry: true,
          city: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const user = await getCurrentUserProfile(session.user.id);

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto w-full max-w-7xl ">
        <ProfileUserCard user={user} />
      </div>
    </main>
  );
}