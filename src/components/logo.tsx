import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (<div className={cn("relative aspect-9/2", className)}>
        <Image src="/icon/logo.png" alt="DendroChime" fill className="aspect-9/2 object-cover" />
    </div>);
}