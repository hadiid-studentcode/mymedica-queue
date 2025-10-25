"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TenantProvider } from "@/context/tenantContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isTenant, setIsTenant] = useState<boolean | null>(null);
  const [tenantID, setTenantID] = useState<string | null>(null);

  const fetchTenant = async (userId: string) => {
    try {
      const res = await fetch(`/api/tenant/userId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const result = await res.json();
      return {
        isdata: result.isdata,
        data: result.data,
      };
    } catch (error) {
      console.error("Failed to fetch tenant:", error);
      return {
        isdata: false,
        data: null,
      };
    }
  };

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    (async () => {
      const data = await fetchTenant(session.user.id);
      if (data?.isdata === true && data?.data?.id) {
        setIsTenant(true);
        setTenantID(data.data.id);
      } else {
        // Ini akan menangkap { isdata: false } atau jika fetch gagal
        setIsTenant(false);
        setTenantID(null);
      }
    })();
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  console.log("tenantID", tenantID);
  console.log("isTenant", isTenant);

  return (
    <TenantProvider value={{ tenantID, isTenant }}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" user={user} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TenantProvider>
  );
}
