import { tenantService } from "@/services/tenant.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const data = await tenantService.findByUserId(userId);

    if (!data) {
      return NextResponse.json(
        { message: "Tenant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "success", isdata: true, data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET tenants error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
