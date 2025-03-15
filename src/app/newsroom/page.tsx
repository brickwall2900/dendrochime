import { Button } from "@/components/ui/button";
import CreatePostButton from "./CreatePostButton";

export default function Page() {
    return (
        <div className="m-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-3xl">Newsroom</h1>
                { /* vvvvvvvv TODO: make client component vvvvvvvv */ }
                <CreatePostButton />
            </div>
            <p>This is the newsroom :pp</p>
        </div>
    );
}