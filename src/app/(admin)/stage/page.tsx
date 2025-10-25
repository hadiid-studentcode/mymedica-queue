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

} from "lucide-react";
import { useEffect, useState } from "react";
import { useTenant } from "@/context/tenantContext";

export default function QueueStagePage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [queueStage, setQueueStage] = useState<{ id: string; name: string, order: number }[]>(
    []
  );
  const { tenantID } = useTenant();


  const resetAlert = () => {
    setSuccess(false);
    setError(false);
    setMessage("");
  };

  useEffect(() => {
    const fetchQueueStage = async () => {
      if (!tenantID) return;

      try {
        const res = await fetch(`/api/stage?tenantId=${tenantID}`);
        const json = await res.json();
        setQueueStage(json.data || []);
      } catch (err) {
        console.log("Failed to fetch queue stage:", err);
      }
    };

    fetchQueueStage();
  }, [tenantID]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      order: Number(formData.get("order")),
      tenantId: tenantID,
    };

    try {
      const res = await fetch("/api/stage", {
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

      if (tenantID) {
        fetch(`/api/stage?tenantId=${tenantID}`)
          .then((res) => res.json())
          .then((json) => setQueueStage(json.data || []));
      }
    } catch (err) {
      setError(true);
      setMessage(`Something went wrong ${(err as Error).message}`);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    resetAlert();
    setLoading(true);

    try {
      const res = await fetch(`/api/stage/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(
          data.message || `Request failed with status ${res.status}`
        );
      }

      setSuccess(true);
      setMessage(data.message);
      await fetch(`/api/stage?tenantId=${id}`)
        .then((res) => res.json())
        .then((json) => setQueueStage(json.data || []));
    } catch (err) {
      setError(true);
      console.error("Failed to delete stage:", err);
      setMessage((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      order: Number(formData.get("order")),
      tenantId: tenantID,
    };

    try {
      const res = await fetch(`/api/stage/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if(!res.ok){
        setError(true);
        setMessage(data.message || `Request failed with status ${res.status}`);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setMessage(data.message);
      setLoading(false);

      if(tenantID){
        fetch(`/api/stage?tenantId=${tenantID}`)
          .then((res) => res.json())
          .then((json) => setQueueStage(json.data || []));
      }

    } catch (err) {
        setError(true);
        setMessage(`Something went wrong ${(err as Error).message}`);
        setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Kelola Tahapan Antrian (Stages)
        </h1>

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
                      <Label htmlFor="order">Nomor Urut</Label>
                      <Input
                        type="number"
                        id="order"
                        name="order"
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

      {success && (
        <Alert className="border-green-500 mb-5">
          <CheckCircle2Icon className="text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {queueStage.length > 0 ? (
              queueStage.map((stage) => (
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
                    <DialogComponent
                      variant="outline"
                      buttonText="Edit Stage"
                      dialogTitle="Edit Stage"
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
                            <form
                              onSubmit={(e) => handleUpdate(stage.id, e)}
                            method="post"
                            >
                              <div className="grid gap-4 mb-5 mt-3">
                                <div className="grid gap-3">
                                  <Label htmlFor="name">Nama Tahapan</Label>
                                  <Input
                                    id="name"
                                    name="name"
                                    placeholder="Contoh : Poli Umum"
                                    required
                                    defaultValue={stage.name}
                                  />
                                </div>
                                <div className="grid gap-3">
                                  <Label htmlFor="oder">Nomor Urut</Label>
                                  <Input
                                    type="number"
                                    id="order"
                                    name="order"
                                    placeholder="1"
                                    required
                                    defaultValue={stage.order}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    onClick={resetAlert}
                                  >
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
                    <Button
                      variant="ghost"
                      size="default"
                      className="text-white hover:text-white-700 bg-red-500 hover:bg-red-400"
                      aria-label="Delete stage"
                      onClick={() => handleDelete(stage.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Belum ada tahapan antrian. Silakan tambahkan.
              </p>
            )}
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
