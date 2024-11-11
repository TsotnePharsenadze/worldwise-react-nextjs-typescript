import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { cityName, country, emoji, date, notes, lat, lng } = body;
    if (!cityName || !country || !user?.id) {
      return NextResponse.json(
        { error: "cityName, country, and userId are required fields." },
        { status: 400 }
      );
    }

    const newCity = await prisma.city.create({
      data: {
        cityName,
        country,
        emoji,
        date: date ? new Date(date) : new Date(),
        notes,
        user: {
          connect: { id: user?.id },
        },
        position: lat && lng ? { create: { lat, lng } } : undefined,
      },
      include: {
        position: true,
      },
    });

    return NextResponse.json(newCity, { status: 201 });
  } catch (error) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the city." },
      { status: 500 }
    );
  }
}
