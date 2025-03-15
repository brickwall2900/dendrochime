import Link from "next/link";

function Section({ title, href, children }: { title: string, href?: string, children?: React.ReactNode }) {
    return (
        <div>
            <Link className="text-xl bg-green-400 w-full p-2 pl-4 inline-block" href={href || "#"}>{title}</Link>
            <div className="bg-green-600 w-full p-4">
                {children}
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div className="m-8 flex flex-col gap-4">
            <h1 className="text-3xl">Dashboard!</h1>
            <p>Welcome to DendroChime! ermmm actually ts pmo icl c u pls b qt. </p>

            <Section title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Section>
            <Section title="Newsroom" href="/news">
            </Section>
            <Section title="Your Communities" href="/communities">
            </Section>
            <Section title="Educational Videos">
            </Section>
        </div>
    );
}