"use client";

import { createContext, useContext } from "react";

interface TenantContextType {
  tenantID: string | null;
  isTenant: boolean;
}

const TenantContext = createContext<TenantContextType>({
  tenantID: null,
  isTenant: false,
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TenantContextType;
}) => {
  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};
