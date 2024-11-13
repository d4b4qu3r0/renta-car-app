import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = await auth();
    const { carId, priceDay, startDate, endDate, carName } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!carId || !priceDay || !startDate || !endDate || !carName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    );
    const totalAmount = Number(priceDay) * numberOfDays;

    const order = await db.order.create({
      data: {
        carId,
        carName: carName,
        userId: userId,
        status: "confirmed",
        totalAmount: totalAmount.toString(),
        orderDate: startDate,
        orderEndDate: endDate,
      },
    });

    return NextResponse.json({ 
      success: true,
      url: '/order-confirmation',
      orderId: order.id
    });
    
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ 
      success: false,
      url: '/order-error',
      message: "Error creating order"
    }, { 
      status: 500 
    });
  }
}