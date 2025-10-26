import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";

export const queueService = {
  create: async (
    patienName: string,
    queueNumber: string,
    tenantId: string,
    currentStageId: string
  ) => {
    return prisma.queueEntry.create({
      data: {
        patientName: patienName,
        queueNumber: queueNumber,
        tenantId: tenantId,
        currentStageId: currentStageId,
      },
    });
  },

  moveToProgressStage: async (queueEntryId: string) => {
    return prisma.queueEntry.update({
      where: {
        id: queueEntryId,
      },
      data: {
        status: Status.IN_PROGRESS,
      },
    });
  },
  markCompleted: async (queueEntryId: string) => {
    return prisma.queueEntry.update({
      where: {
        id: queueEntryId,
      },
      data: {
        status: Status.COMPLETED,
      },
    });
  },
  moveToNextStage: async (id: string) => {
    return prisma.$transaction(async (tx) => {
      const currentEntry = await tx.queueEntry.findUnique({
        where: {
          id: id,
        },
        include: {
          currentStage: {
            select: { order: true },
          },
        },
      });

      if (!currentEntry) {
        throw new Error("Entri antrian tidak ditemukan.");
      }

      const nextStage = await tx.queueStage.findFirst({
        where: {
          tenantId: currentEntry.tenantId,
          order: currentEntry.currentStage.order + 1,
        },
      });

      if (nextStage) {
        return tx.queueEntry.update({
          where: {
            id: id,
          },
          data: {
            currentStageId: nextStage.id,
            status: Status.WAITING,
          },
        });
      } else {
        return tx.queueEntry.update({
          where: {
            id: id,
          },
          data: {
            status: Status.COMPLETED,
          },
        });
      }
    });
  },

  viewActiveQueue: async (tenantId: string) => {
    return prisma.queueEntry.findMany({
      where: {
        tenantId: tenantId,
        status: {
          in: [Status.IN_PROGRESS, Status.WAITING],
        },
      },
    });
  },
  getStageIdByTenantIdFirst: async (tenantId: string) => {
    return prisma.queueStage.findFirst({
      where: {
        tenantId: tenantId,
      },
      select: {
        id: true,
      },
    });
  },
  delete: async (id: string) => {
    return prisma.queueEntry.delete({
      where: {
        id,
      },
    });
  },
  updateStatus: async (status: Status, id: string) => {
    return prisma.queueEntry.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
  },
};
