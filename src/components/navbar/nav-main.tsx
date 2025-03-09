"use client";

import links from "@/data/navigation_data"
import Link from "next/link"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"
import { useState } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger, useSidebar } from "../ui/sidebar";

export default function NavigationShit() {
    return <>
        <Navigation name="asaaaaaa" />
    </>;
}

function SidebarShit() {
    const sidebar = useSidebar();

    function itemSidebarClose() {
        sidebar.toggleSidebar();
    }

    return (
        <Sidebar side="right">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>AAAA</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="AAAA">
                                <SidebarMenuButton>
                                    <span>
                                        shit
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarMenuButton onClick={itemSidebarClose}>CLOSE</SidebarMenuButton>
            </SidebarContent>
            <SidebarFooter />
            <SidebarRail />
        </Sidebar>
    );
}

export function SidebarNavigation({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>
        <SidebarProvider>
            <main className="w-full h-full">
                {children}
            </main>
            <SidebarShit></SidebarShit>
        </SidebarProvider>
    </>;
}

function Navigation({ name }: { name: string }) {
    return <>
        <div className="fixed flex w-full h-12 top-0 z-12 overflow-hidden bg-green-700 items-center justify-start place-content-center pl-2 gap-4">
            <span className="text-white">{name}</span>
            <nav>
                {
                    links.map((x) => {
                        return <Link key={x.name} className="text-white p-4 transition duration-100 hover:underline hover:bg-green-500" href={x.href}>{x.name}</Link>
                    })
                }
            </nav>
        </div>
    </>
}