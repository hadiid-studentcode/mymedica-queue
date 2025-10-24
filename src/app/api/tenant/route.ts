import { tenantService } from "@/services/tenant.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tenantName,name,email } = await req.json();

    if (!tenantName) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const tenant = await tenantService.create(tenantName, "1");

    return NextResponse.json(
      { message: "Tenant created", data: tenant },
      { status: 201 }
    );
  } catch (error) {
    console.error("Tenant creation failed:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}
