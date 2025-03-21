"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
    const router = useRouter();

    return (
        <div className="flex m-4 gap-2">
            <Button onClick={() => router.push("/login")}>Log In</Button>
            <p className="px-4 self-center">or</p>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        </div>
    );
}