"use client";

import { links, sidebar_links } from "@/data/navigation_data"
import Link from "next/link"
import { Button } from "../ui/button"
import { MenuIcon, MenuSquareIcon } from "lucide-react"
import { useState } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger, useSidebar } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export default function NavigationMain() {
    return <>
        <Navigation name="DendroChime" />
    </>;
}

function SidebarMain() {
    const sidebar = useSidebar();
    const router = useRouter();

    function itemSidebarClose() {
        sidebar.toggleSidebar();
    }

    function itemSidebarChosenFactory(href: string) {
        return () => {
            router.push(href);
        };
    }

    return <>
        <SidebarTrigger>
            <MenuSquareIcon></MenuSquareIcon>
        </SidebarTrigger>
        <Sidebar side="right" collapsible="icon">
            <SidebarContent>
                {sidebar_links.map((x) => {
                    return (
                        <SidebarMenuButton className="py-8" key={x.name} onClick={itemSidebarChosenFactory(x.href)}>
                            {x.name}
                        </SidebarMenuButton>
                    );
                })}
                <SidebarMenuButton className="py-8" onClick={itemSidebarClose}>CLOSE</SidebarMenuButton>
            </SidebarContent>
            <SidebarFooter />
            <SidebarRail />
        </Sidebar>
    </>;
}

export function SidebarNavigation({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>
        <SidebarProvider>
            <main className="w-full h-full">
                {children}
            </main>
            <SidebarMain></SidebarMain>
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