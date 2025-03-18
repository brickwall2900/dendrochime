"use client";

import { links, sidebar_links } from "@/data/navigation_data"
import Link from "next/link"
import { Bell, LayoutDashboard, MenuIcon, MenuSquareIcon, MoveLeft, MoveRight, Search, SidebarClose, SidebarOpen, User, XIcon } from "lucide-react"
import { useState } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserAccountButton } from "./user-account";

function SidebarMobile() {
    const sidebar = useSidebar();
    const router = useRouter();

    function returnToDashboard() {
        router.push("/dashboard");
        sidebar.setOpen(false);
        sidebar.setOpenMobile(false);
    }

    return <>
        <SidebarMenuButton className="py-8" onClick={returnToDashboard}><LayoutDashboard /> Dashboard</SidebarMenuButton>
        <SidebarSeparator />
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
            sidebar.setOpen(false);
            sidebar.setOpenMobile(false);
        };
    }

    const isMobile = useIsMobile();

    return <>
        <Sidebar side="right" variant="floating" collapsible="icon" className="border-l pt-12 z-1000 ">
            <SidebarContent>
                {isMobile && <SidebarMobile />}

                {sidebar_links.map((x) => {
                    return (
                        <SidebarMenuButton className="py-8" key={x.name} onClick={itemSidebarChosenFactory(x.href)}>
                            {x.icon} {x.name}
                        </SidebarMenuButton>
                    );
                })}
                <SidebarMenuButton className="py-8" onClick={itemSidebarClose}>
                    {!sidebar.open ? <SidebarClose /> : <SidebarOpen /> } CLOSE
                </SidebarMenuButton>
            </SidebarContent>
            <SidebarFooter />
            <SidebarRail />
        </Sidebar>
    </>;
}

export function MainWithSidebarNav({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>
        <SidebarProvider className="overflow-x-hidden">
            <div className="flex min-h-screen min-w-screen flex-col">
                <Navigation name="DendroChime" />
                <main className="flex-1 pt-12 mb-12 md:pr-16 w-full">
                    {/* <div className="h-full w-full"> */}
                        {children}
                    {/* </div> */}
                </main>
            </div>
            <SidebarMain />
        </SidebarProvider>
    </>;
}

function Navigation({ name }: { name: string }) {
    const isMobile = useIsMobile();
    return <>
        <header className="fixed flex w-full h-12 top-0 z-69420 overflow-hidden bg-green-700 items-center justify-start place-content-center px-4 gap-4">
            <span className="text-white">{name}</span>
            {!isMobile && <nav>
                {
                    links.map((x) => {
                        return <Link key={x.name} className="text-white p-4 transition duration-100 hover:underline hover:bg-green-500" href={x.href}>{x.name}</Link>
                    })
                }
            </nav>}
            <span className="ml-auto" />
            <Search color="#FFFFFF" />
            <Input className="bg-white w-64" type="text" placeholder="Search..." />
            <Button><Bell /></Button>
            <UserAccountButton />
            {isMobile && <SidebarTrigger><Sidebar /></SidebarTrigger>}
        </header>
    </>
}