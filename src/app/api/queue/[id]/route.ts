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
