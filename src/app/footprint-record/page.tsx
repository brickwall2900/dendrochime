import { footprint_data, FootprintAction } from "@/data/footprint_data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Carbon Footprint Record",
};

function TrackerItem( { item }: { item: FootprintAction } ) {
    return (
        <section className="w-16 h-16 p-2 bg-green-300 hover:bg-green-400 flex flex-col items-center">
            {item.icon}

            <p className="text-xs truncate py-1">{item.name}</p>
        </section>
    );
}

function TrackerThing( { items }: { items: FootprintAction[] } ) {
    return (
        <div className="grid gap-2 auto-rows-[4rem] grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] justify-items-center overflow-clip">
            {items.map((x) => {
                return <TrackerItem item={x} key={x.internalName} />
            })}
        </div>
    );
}

function Thingy({ title, icon, children }: { title: string, icon?: React.ReactNode, children?: React.ReactNode }) {
    return (
        <section className="rounded-md">
            <h1 className="text-xl bg-green-400 w-full p-2 pl-4 inline-flex gap-2">{icon && icon} {title}</h1>
            <div className="bg-green-600 w-full p-4">
                {children}
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <article className="m-8 flex flex-col gap-4">
            <h1 className="text-3xl">Carbon Footprint Tracker!!!!</h1>
            {footprint_data.map((x) => {
                return <Thingy title={x.name} key={x.name}>
                    <TrackerThing items={x.actions} />
                </Thingy>
            })}
        </article>
    );
}