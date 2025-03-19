import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image";
import Link from "next/link";
import SignUpSomething from "./sign-up-steps";

export default function SignUpBox() {
    return (
        <div className="flex min-h-svh w-full h-full items-center justify-center">
            <img src="/tree.jpg" alt="Trees" className="w-max h-max fixed object-cover -z-10" />
            <Card className="md:w-3xl w-xl md:h-xl h-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">SIGN UP</CardTitle>
                    <CardDescription>Create your account here!</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpSomething />
                </CardContent>
            </Card>
        </div>
    );
}