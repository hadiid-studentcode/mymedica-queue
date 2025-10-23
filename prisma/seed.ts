import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function main() {
  const res = await auth.api.signUpEmail({
    body: {
      email: "superadmin@mymedica.com",
      password: "superadmin",
      name: "Super Admin",
    },
  });

  console.log("✅ User created:", res?.user?.email);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
