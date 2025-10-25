import { queueService } from "@/services/queue.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { patienName, queueNumber, tenantId, currentStageId } =
      await req.json();

    if (!patienName || !queueNumber || !tenantId || !currentStageId) {
      return NextResponse.json({
        message:
          "patienName, queueNumber, tenantId, and currentStageId are required",
        status: 400,
      });
    }

    const data = await queueService.create(
      patienName,
      queueNumber,
      tenantId,
      currentStageId
    );
    return NextResponse.json({
      message: "Queue created successfully",
      data: data,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Internal Server Error : ${error}`,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return NextResponse.json({
        message: "tenantId is required",
        status: 400,
      });
    }

    const data = await queueService.viewActiveQueue(tenantId);
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
