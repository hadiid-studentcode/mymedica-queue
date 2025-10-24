import prisma from "@/lib/prisma";

export const stageService = {
  create: async (name: string, order: number, tenantId: string) => {
    return prisma.queueStage.create({
      data: {
        name: name,
        order: order,
        tenantId: tenantId,
      },
    });
  },
  update: async (name: string, order: number, id: string) => {
    return prisma.queueStage.update({
      where: {
        id,
      },
      data: {
        name: name,
        order: order,
      },
    });
  },
  delete: async (id: string) => {
    return prisma.queueStage.delete({
      where: {
        id,
      },
    });
  },

  getAll: async (tenantId: string) => {
    return prisma.queueStage.findMany({
      where: {
        tenantId,
      },
      orderBy: {
        order: "asc",
      },
    });
  },
};
