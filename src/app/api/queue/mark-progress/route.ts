import { queueService } from "@/services/queue.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { queueEntryId } = await req.json();

    if (!queueEntryId) {
      return NextResponse.json({
        message: "tenantId is required",
        status: 400,
      });
    }

    const data = await queueService.moveToProgressStage(queueEntryId);
    return NextResponse.json({
      message: "success",
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
