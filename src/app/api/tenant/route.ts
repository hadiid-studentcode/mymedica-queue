import { signUp } from "@/lib/auth-client";
import { tenantService } from "@/services/tenant.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tenantName, name, email } = await req.json();

    if (!tenantName || !name || !email) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Buat user
    const userRes = await signUp.email({
      name : name,
      email : email,
      password: name,
    });

    const userId = userRes.data?.user.id;


    if (!userId) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 500 }
      );
    }

    // Buat tenant
    const tenant = await tenantService.create(tenantName, userId);

    return NextResponse.json(
      {
        message: "User and tenant created successfully",
        data: { user: userRes.data, tenant },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}
