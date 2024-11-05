import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { cityId: number } }) {
  try {
    const cityId = params.cityId;
    if (!cityId) {
      return new NextResponse("Missing cityId", { status: 400 });
    }

    const city = await prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      return new NextResponse("City not found", { status: 404 });
    }

    return NextResponse.json(city);
  } catch (err: any) {
    console.error("api/cities/[cityid]-error&&&get");
    return new NextResponse("Internal Error 500", { status: 500 });
  }
}

export async function DELETE({ params }: { params: { cityId: number } }) {
  try {
    const cityId = params.cityId;
    if (!cityId) {
      return new NextResponse("Missing cityId", { status: 400 });
    }

    const city = await prisma.city.delete({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      return new NextResponse("City not found", { status: 404 });
    }

    return NextResponse.json(city);
  } catch (err: any) {
    console.error("api/cities/[cityid]-error&&&delete");
    return new NextResponse("Internal Error 500", { status: 500 });
  }
}
