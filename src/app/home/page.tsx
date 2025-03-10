import AuthButtons from "@/components/auth/auth-buttons";

function TitlePage() {
    return (
        <div className="flex flex-col items-center place-content-center h-svh">
            <h1 className="justify-between text-4xl text-center">Dendrochime</h1>
            <p>Ding in a Greener Tomorrow</p>
            <p>One record at a time</p>
            <AuthButtons />
        </div>
    );
}

export default function Page() {
    return <>
        <TitlePage />
    </>
}