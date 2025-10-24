import { stageService } from "@/services/stage.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, order, tenantId } = await req.json();

    if (!name || !order || !tenantId) {
      return NextResponse.json({
        message: "Name, order, and tenantId are required",
        status: 400,
      });
    }
    const data = await stageService.create(name, order, tenantId);
    return NextResponse.json({
      message: "Stage created successfully",
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

    const data = await stageService.getAll(tenantId);
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
