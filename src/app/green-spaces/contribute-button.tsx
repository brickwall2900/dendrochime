"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react";
  

export default function ContributeButton() {
    return (
        <Dialog>
            <DialogTrigger className="inline-flex justify-center items-center gap-2 bg-black hover:bg-gray-700 p-2 text-white whitespace-nowrap rounded-md text-sm font-medium h-9 cursor-pointer">
                <PlusCircle /> Contribute
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}