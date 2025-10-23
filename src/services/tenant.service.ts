import prisma from "@/lib/prisma";

export const tenantService = {
  create: async (name: string, userId: string) => {
    return prisma.tenant.create({
      data: {
        name,
        userId,
      },
    });
  },
};
