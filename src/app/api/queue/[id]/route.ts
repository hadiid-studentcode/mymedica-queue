import { queueService } from "@/services/queue.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        message: "ID Required",
        status: 400,
      });
    }

    const data = await queueService.delete(id);
    return NextResponse.json({
      message: "Queue deleted successfully",
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!status || !id) {
      return NextResponse.json({
        message: "Status and id are required",
        status: 400,
      });
    }
    const data = await queueService.updateStatus(status, id);
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
