"use server";

import { prisma } from "@/libs/prisma";

import getSession from "./getSession";

export default async function getCities() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  try {
    const currentUser = await prisma.user.findMany({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    const cities = await prisma.city.findMany({
      where: {
        userId: currentUser[0].id,
      },
      include: {
        position: true,
      },
    });

    return cities;
  } catch (error: any) {
    return null;
  }
}
