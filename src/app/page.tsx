import AuthButtons from "@/components/auth/auth-buttons";
import Logo from "@/components/logo";

function TitlePage() {
    return (
        <article className="flex flex-col items-center place-content-center h-svh">
            <Logo className="h-20" />
            <p>Ding in a Greener Tomorrow</p>
            <p>One record at a time</p>
            <AuthButtons />
        </article>
    );
}

export default function Page() {
    return <>
        <TitlePage />
    </>
}