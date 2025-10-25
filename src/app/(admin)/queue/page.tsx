"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  Loader2,
  Trash2,
  CheckCircle2Icon,
} from "lucide-react";

import { DialogComponent } from "@/components/dialogComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { SpinnerBadge } from "@/components/spinner-badge";
import { useTenant } from "@/context/tenantContext";
import { generateQueueNumber } from "@/lib/utils";

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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { tenantID } = useTenant();
  const [queue, setQueue] = useState([]);

  const resetAlert = () => {
    setSuccess(false);
    setError(false);
    setMessage("");
  };

  const fetchQueue = async () => {
    try {
      const res = await fetch(`/api/queue?tenantId=${tenantID}`);
      const json = await res.json();
      setQueue(json.data || []);
    } catch (err) {
      console.log("Failed to fetch queue:", err);
    }
  };

  useEffect(() => {
    const loadQueue = async () => {
      await fetchQueue();
    };
    loadQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      patienName: formData.get("patienName"),
      queueNumber: generateQueueNumber("A", 1000),
      tenantId: tenantID,
    };

    try {
      const res = await fetch("/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        setMessage(data.message || `Request failed with status ${res.status}`);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setMessage(data.message);
      setLoading(false);
      await fetchQueue();
    } catch (err) {
      setError(true);
      setMessage((err as Error).message || "Something went wrong");
    }
  };

  console.log(queue);
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Antrian</h1>

        <DialogComponent
          variant="default"
          buttonText="Tambah Pasien"
          dialogTitle="Tambah Pasien"
          formDialog={() => {
            return (
              <>
                {error && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Error : {message}</AlertTitle>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-500">
                    <CheckCircle2Icon className="text-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                {loading && (
                  <SpinnerBadge
                    value="Loading..."
                    variant="outline"
                    className="text-center mt-3"
                  />
                )}
                <form onSubmit={handleSubmit} method="post">
                  <div className="grid gap-4 mb-5 mt-3">
                    <div className="grid gap-3">
                      <Label htmlFor="patienName">Nama Pasien</Label>
                      <Input
                        id="patienName"
                        name="patienName"
                        placeholder="john doe"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" onClick={resetAlert}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </>
            );
          }}
        />
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
