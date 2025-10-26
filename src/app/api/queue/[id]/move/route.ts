import { queueService } from "@/services/queue.service";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
      

        if ( !id) {
            return NextResponse.json({
                message: "stageId and id are required",
                status: 400,
            });
        }
        const data = await queueService.moveToNextStage(id);
        return NextResponse.json({
            message: "Queue updated successfully",
            data: data,
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: `Internal Server Error : ${error}`,
            status: 500,
        });
    }
}