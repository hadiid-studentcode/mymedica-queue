import prisma from "@/lib/prisma";

export const userService = {
  delete: async (id: string) => {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
};
