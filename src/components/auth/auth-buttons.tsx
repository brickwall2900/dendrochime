"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GodDamnButtons() {
    const router = useRouter();

    return (
        <div className="flex m-4 gap-2">
            <Button onClick={() => router.push("/login")}>Log In</Button>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        </div>
    );
}