import SignUpBox from "@/components/auth/sign-up-box";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default function SignUpPage() {
    return (<SignUpBox />);
}