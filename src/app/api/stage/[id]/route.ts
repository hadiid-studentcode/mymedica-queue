import { stageService } from "@/services/stage.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, order } = await req.json();

    if (!name || !order || !id) {
      return NextResponse.json({
        message: "Name, order, and id are required",
        status: 400,
      });
    }
    const data = await stageService.update(name, order, id);
    return NextResponse.json({
      message: "Stage updated successfully",
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

    const data = await stageService.delete(id);
    return NextResponse.json({
      message: "Stage deleted successfully",
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
