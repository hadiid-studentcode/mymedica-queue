import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function main() {
  const res = await auth.api.signUpEmail({
    body: {
      email: "seed@example.com",
      password: "password123",
      name: "Seed User",
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
