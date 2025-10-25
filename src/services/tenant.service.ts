import prisma from "@/lib/prisma";

export const tenantService = {
  create: async (name: string, userId: string) => {
    return prisma.tenant.create({
      data: {
        name,
        userId: userId,
      },
    });
  },

  getAll: async () => {
    return prisma.tenant.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  update: async (name: string, id: string) => {
    return prisma.tenant.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  },

  delete: async (id: string) => {
    return prisma.tenant.delete({
      where: {
        id,
      },
    });
  },

  findById: async (id: string) => {
    return prisma.tenant.findUnique({
      where: {
        id,
      },
    });
  },

  findByUserId: async (userId: string) => {
    return prisma.tenant.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true, 
      },
    });
  },
};
