import * as React from "react";
import {
  BellIcon,
  ChartBarIcon,
  FileTextIcon,
  HouseIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@phosphor-icons/react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import type { JwtPayload } from "@/modules/auth";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: SquaresFourIcon },
  { title: "Proveedores", url: "/proveedores", icon: HouseIcon },
  { title: "Contratos", url: "/contratos", icon: FileTextIcon },
  { title: "Alertas", url: "/alertas", icon: BellIcon, badge: "2" },
  { title: "Reportes", url: "/reportes", icon: ChartBarIcon },
  { title: "Usuarios", url: "/usuarios", icon: UsersIcon },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: JwtPayload }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-baseline gap-1.5 px-2 py-1.5">
          <span className="text-lg font-bold">Kyōtei</span>
          <span className="text-xs text-muted-foreground">協定</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
