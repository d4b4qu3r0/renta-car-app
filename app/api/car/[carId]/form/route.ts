import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: { carId: string } } // Asegúrate de que el tipo de context sea correcto
) {
  try {
    const { userId } = await auth();
    const { carId } = context.params; // Acceder directamente a params
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!carId) {
      return new NextResponse("Bad Request: Missing carId", { status: 400 });
    }

    const car = await db.car.update({
      where: { id: carId },
      data: {
        UserId: userId,
        ...data,
      },
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error("[CAR PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}