import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function DELETE (
    req: Request,
    {
        params,
    }: {
        params: { orderId: string };
    }
    ) {
    try {
        const {userId} = await auth();
        const {orderId} = params;
    
        if (!userId) {
        return new NextResponse("Unauthorized", {status: 401});
        }
    
        const deletedOrder = await db.order.delete({
        where: {
            id: orderId,
        },
        });
    
        return NextResponse.json(deletedOrder);
    } catch (error) {
        console.log("[DELETE ORDER ID]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
    }
