"use client";

import { Location } from "@/components/map/map";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { GreenSpace, addGreenSpace, isSuccess } from "@/data/client_data_utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
  

export default function ContributeButton({ position, onContribute }: { position?: (Location | null), onContribute?: () => void }) {
    const [ parkName, setParkName ] = useState("");
    const [ open, setOpen ] = useState(false);

    async function doContribute() {
        setOpen(false);
        if (!parkName.trim()) {
            toast(<p>Blank name!</p>);
            return;
        }
        if (position) {
            try {
                const greenSpace = {} as GreenSpace;
                greenSpace.location = position;
                greenSpace.name = parkName
                
                const response = await addGreenSpace(greenSpace);
                if (isSuccess(response) && response.response) {
                    toast(<p>Successfully contributed {parkName}</p>);
                    if (onContribute) {
                        onContribute();
                    }
                } else {
                    toast(<p>Error: {String(response.status)}</p>);
                }
            } catch (e) {
                toast(<p>An error has occured: {String(e)}</p>);
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className="inline-flex justify-center items-center gap-2 bg-black hover:bg-gray-700 p-2 text-white whitespace-nowrap rounded-md text-sm font-medium h-9 cursor-pointer">
                <PlusCircle /> Contribute
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Do you want to contribute?</DialogTitle>
                <DialogDescription>
                    Your picked location will get reviewed by experts and
                    they will decide if it gets approved or rejected.
                </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Name:</p>
                    <Input type="text" value={parkName} placeholder="The Park!!" onChange={(e) => setParkName(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={doContribute}>Contribute!</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}