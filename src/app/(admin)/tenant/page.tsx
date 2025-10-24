"use client";

import { TableComponents } from "@/components/table";
import { DialogComponent } from "@/components/dialogComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { SpinnerBadge } from "@/components/spinner-badge";
import { useEffect } from "react";

export default function TenantPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);

  const resetAlert = () => {
    setSuccess(false);
    setError(false);
    setMessage("");
  };

  const fetchTenants = async () => {
    try {
      const res = await fetch("/api/tenant");
      const json = await res.json();
      setTenants(json.data || []);
    } catch (err) {
      console.log("Failed to fetch tenants:", err);
    }
  };

  useEffect(() => {
    const loadTenants = async () => {
      await fetchTenants();
    };
    loadTenants();
  }, []);

  console.log(tenants);

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

  return (
    <div className="flex flex-col items-start justify-start gap-6 p-4">
      {success && (
        <Alert className="border-green-500">
          <CheckCircle2Icon className="text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <DialogComponent
        variant="default"
        buttonText="Tambah Tenant"
        dialogTitle="Tambah Tenant"
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
                    <Label htmlFor="tenant">Tenant Name</Label>
                    <Input
                      id="tenant"
                      name="tenant"
                      placeholder="Clinic sehat selalu"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="john doe"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@mail.com"
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

      <div className="w-full overflow-x-auto">
        <TableComponents />
      </div>
    </div>
  );
}
