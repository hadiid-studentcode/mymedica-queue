import { tenantService } from "@/services/tenant.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { tenantName } = await req.json();

   
    if (!tenantName) {
      return NextResponse.json({
        message: "Tenant Name Required",
        status: 400,
      });
    }

    if (!id) {
      return NextResponse.json({
        message: "ID Required",
        status: 400,
      });
    }

    const data = await tenantService.update(tenantName, id);

    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (error) {
    console.error("PUT tenants error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await tenantService.delete(id);
    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (error) {
    console.error("DELETE tenants error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
