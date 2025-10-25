"use client";

import { DialogComponent } from "@/components/dialogComponent";
import { SpinnerBadge } from "@/components/spinner-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTenant } from "@/context/tenantContext";

const stages = [
  { id: "1", name: "Registrasi" },
  { id: "2", name: "Poli Umum (Perawat)" },
  { id: "3", name: "Ruang Dokter" },
  { id: "4", name: "Farmasi" },
];

export default function QueueStagePage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [queueStage, setQueueStage] = useState([]);
  const { tenantID, isTenant } = useTenant();

  console.log(tenantID, isTenant);

  const resetAlert = () => {
    setSuccess(false);
    setError(false);
    setMessage("");
  };

  const fetchQueueStage = async () => {
    try {
      const res = await fetch(`/api/stage?tenantId=${tenantID}`);
      const json = await res.json();
      setQueueStage(json.data || []);
    } catch (err) {
      console.log("Failed to fetch tenants:", err);
    }
  };

  useEffect(() => {
    const loadTenants = async () => {
      await fetchQueueStage();
    };
    loadTenants();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      tenantName: formData.get("tenant"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    try {
      const res = await fetch("/api/tenant", {
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
    } catch (err) {
      setError(true);
      console.log(err);
      setMessage("Something went wrong");
      setLoading(false);
    }
  };

  console.log(queueStage);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Kelola Tahapan Antrian (Stages)
        </h1>
        {success && (
          <Alert className="border-green-500">
            <CheckCircle2Icon className="text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <DialogComponent
          variant="default"
          buttonText="Tambah Stage"
          dialogTitle="Tambah Stage"
          formDialog={() => {
            return (
              <>
                {error && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Error : {message}</AlertTitle>
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
                      <Label htmlFor="name">Nama Tahapan</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Contoh : Poli Umum"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="oder">Nomor Urut</Label>
                      <Input
                        type="number"
                        id="oder"
                        name="oder"
                        placeholder="1"
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

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex items-center gap-3 p-4 border rounded-lg bg-white"
              >
                <span className="flex-1 text-base font-medium">
                  {stage.name}
                </span>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" aria-label="Move up">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Move down">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:text-blue-700"
                    aria-label="Edit stage"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    aria-label="Delete stage"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500 mt-4">
        Catatan: Urutan stage di atas menentukan alur antrian pasien di
        dashboard.
      </p>
    </div>
  );
}
