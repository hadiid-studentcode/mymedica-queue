"use client";

import React from "react";
import { ArrowRight, Clock, Loader2, Trash2, Plus } from "lucide-react";

const stages = [
  {
    id: "stage-1",
    title: "Registrasi",
    patients: [
      {
        id: "pat-1",
        name: "Ahmad Dhani",
        status: "waiting",
      },
    ],
  },
  {
    id: "stage-2",
    title: "Poli Umum (Perawat)",
    patients: [],
  },
  {
    id: "stage-3",
    title: "Ruang Dokter",
    patients: [
      {
        id: "pat-2",
        name: "Ani Yudhoyono",
        status: "in_progress",
      },
    ],
  },
  {
    id: "stage-4",
    title: "Farmasi",
    patients: [],
  },
  {
    id: "stage-5",
    title: "KASIR",
    patients: [],
  },
  {
    id: "stage-6",
    title: "Ruang Dokter",
    patients: [],
  },
  {
    id: "stage-7",
    title: "Ruang Dokter",
    patients: [],
  },
];

function PatientCard({
  patient,
}: {
  patient: { id: string; name: string; status: string };
}) {
  const isWaiting = patient.status === "waiting";
  const isInProgress = patient.status === "in_progress";

  return (
    <div className="rounded-lg border bg-white text-slate-900 shadow-md dark:bg-slate-950 dark:border-slate-800 dark:text-slate-50">
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <h3 className="text-base font-bold tracking-tight">{patient.name}</h3>
        <button className="inline-flex items-center justify-center rounded-md h-8 w-8 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
          <Trash2 className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      <div className="p-4 pt-2 pb-4">
        {isWaiting && (
          <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            <Clock className="mr-1.5 h-3 w-3" />
            MENUNGGU
          </span>
        )}
        {isInProgress && (
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
            DIPROSES
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 p-4 pt-0">
        {isWaiting ? (
          <>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 flex-1 bg-blue-600 text-white hover:bg-blue-600/90">
              Proses
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 flex-1 bg-slate-200 text-slate-900 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-50">
              Pindah <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 flex-1 bg-orange-500 text-white hover:bg-orange-600">
              Kembalikan
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 flex-1 bg-gray-700 text-white hover:bg-gray-800">
              Pindah <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function QueueDashboardPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Antrian</h1>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-600/90">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pasien
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4 min-w-max h-[calc(100vh-200px)]">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="min-w-[300px] w-[300px] flex flex-col"
            >
              <div className="flex justify-between items-center p-4 rounded-t-lg bg-slate-100 dark:bg-slate-900">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  {stage.title}
                </h2>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                  {stage.patients.length}
                </span>
              </div>
              <div className="h-1 bg-indigo-600 w-full"></div>

              <div className="p-4 bg-slate-100/70 dark:bg-slate-900/70 rounded-b-lg space-y-4 flex-1 overflow-y-auto min-h-[200px]">
                {stage.patients.length > 0 ? (
                  stage.patients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-24 text-sm text-gray-500">
                    Antrian kosong
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
