import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image";
import LoginForm from "./login-form";
import Link from "next/link";

export default function LoginBox() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center">
            <img src="/tree.jpg" alt="Trees" className="w-max h-max fixed object-cover -z-10" />
            <Card className="md:w-md w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">LOG IN</CardTitle>
                    <CardDescription>Log in with your account here!</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="place-self-center mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="signup" className="underline underline-offset-4">
                            Sign up!
                        </Link>
                    </div>    
                </CardFooter>
            </Card>
        </div>
    );
}