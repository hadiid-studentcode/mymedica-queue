"use client";

import { TableComponents } from "@/components/table";
import { DialogComponent } from "@/components/dialogComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export default function TenantPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      tenantName: formData.get("tenant"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    try {
      const res = await fetch("/api/tenant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      console.log("Success:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-6 p-4">
      <DialogComponent
        variant="default"
        buttonText="Tambah Tenant"
        dialogTitle="Tambah Tenant"
        formDialog={() => {
          return (
            <>
              <form onSubmit={handleSubmit} method="post">
                <div className="grid gap-4 mb-5 mt-3">
                  <div className="grid gap-3">
                    <Label htmlFor="tenant">Tenant Name</Label>
                    <Input
                      id="tenant"
                      name="tenant"
                      placeholder="Klink health always"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="john doe" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="3Bb9T@example.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
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
