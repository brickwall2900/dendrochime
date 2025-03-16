import Link from "next/link";

function Thingy({ title, href, children }: { title: string, href?: string, children?: React.ReactNode }) {
    return (
        <section>
            <Link className="text-xl bg-green-400 w-full p-2 pl-4 inline-block" href={href || "#"}>{title}</Link>
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

            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
            <Thingy title="Newsroom" href="/news">
            </Thingy>
            <Thingy title="Your Communities" href="/communities">
            </Thingy>
            <Thingy title="Educational Videos">
            </Thingy>
            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
            <Thingy title="hahahahaah gyatt">
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
                <p>gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt gyatt </p>
            </Thingy>
        </div>
    );
}