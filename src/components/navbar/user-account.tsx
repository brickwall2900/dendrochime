import { LogIn, LogOut, User } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
  

function UserAccountDropdown() {

}

export function UserAccountButton() {
    const router = useRouter();

    function onUserLogInOutClicked() {
        router.push("/login");
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full bg-white border-2 border-black text-white p-2"><User color="black" /></DropdownMenuTrigger>
            <DropdownMenuContent className="z-69421">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onUserLogInOutClicked}><LogIn />Log In</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}