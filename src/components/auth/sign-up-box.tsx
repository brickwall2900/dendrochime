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
            <Card className="md:w-2xl w-lg md:h-xl h-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">SIGN UP</CardTitle>
                    <CardDescription>Create your account here!</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpSomething />
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="place-self-center mt-4 text-center text-sm">
                        You already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Log in!
                        </Link>
                    </div>    
                </CardFooter>
            </Card>
        </div>
    );
}