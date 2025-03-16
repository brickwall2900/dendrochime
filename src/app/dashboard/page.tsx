import Link from "next/link";
import LatestNews from "./latest-news";
import { Group, NewspaperIcon } from "lucide-react";
import TopCommunity from "./top-community";

function Thingy({ title, href, icon, children }: { title: string, href?: string, icon?: React.ReactNode, children?: React.ReactNode }) {
    return (
        <section>
            <Link className="text-xl bg-green-400 w-full p-2 pl-4 inline-flex gap-2" href={href || "#"}>{icon && icon} {title}</Link>
            <div className="bg-green-600 w-full p-4">
                {children}
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <div className="m-8 flex flex-col gap-4">
            <h1 className="text-3xl">Dashboard!</h1>
            <p>Welcome to DendroChime! ermmm actually ts pmo icl c u pls b qt. </p>

            <Thingy title="Newsroom" href="/news" icon={<NewspaperIcon />}>
                <LatestNews />
            </Thingy>
            <Thingy title="Your Communities" href="/communities" icon={<Group />}>
                <TopCommunity />
            </Thingy>
            <Thingy title="Educational Videos">
            </Thingy>
        </div>
    );
}