"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

export default function CreatePostButton() {
    return (
        <Dialog>
            <DialogTrigger className="bg-black hover:bg-gray-700 px-4 text-white rounded-2xl cursor-pointer">
                Create Post!
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>TODO</DialogTitle>
                <DialogDescription>
                    Creating news requires a complex editing page like Word does.
                    I plan to make this in Markdown to make things easy...
                    For now, you can't create news yet :(
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}