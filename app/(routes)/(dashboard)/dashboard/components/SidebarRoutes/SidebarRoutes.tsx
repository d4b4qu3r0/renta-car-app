"use client";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@clerk/nextjs";
import { dataGeneralSidebar, dataAdminlSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { isAdministrator } from "@/lib/isAdministrator";

export function SidebarRoutes() {
  const { userId } = useAuth();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p6">
          <p className="mb-2 text-slate-500">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        {isAdministrator(userId) && (
          <div className="p-2 md:p6">
            <p className="mb-2 text-slate-500">ADMIN</p>
            {dataAdminlSidebar.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </div>
        )}
      </div>

      <div>
        <Separator />
        <footer className="p-3 mt-3 text-center">
          2024 © Renta Car all rights reserved
        </footer>
      </div>
    </div>
  );
}
