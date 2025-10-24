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

  moveToNextStage: async (queueEntryId: string) => {
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

  viewActiveQueue: async (tenantId: string) => {
    return prisma.queueEntry.findMany({
      where: {
        tenantId: tenantId,
        status: Status.IN_PROGRESS || Status.WAITING,
      },
    });
  },
};
