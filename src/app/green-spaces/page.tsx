import MapCaller from '@/components/map/map-caller';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CheckCheck, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import ContributeButton from './contribute-button';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Green Spaces near You",
};

export default async function Page() {
    return (
        <article className="m-8 flex flex-row gap-2 h-full">
            <section className="p-2 flex flex-col gap-4 w-[80%]">
                <h1 className="text-3xl">Green Spaces near You!</h1>
                <MapCaller />
                <p>Any problems with the map? {" "}
                    <Link className="underline text-blue-500" href="https://www.openstreetmap.org/fixthemap" target="_blank">Report it.</Link>
                </p>
            </section>
            <aside className="p-4 flex flex-col gap-6 border-2 border-gray-800 rounded-md w-[20%]">
                <div className="flex flex-col gap-2">
                    <label>Where are you?</label>
                    <Input type="text" className="space-y-4" />
                </div>                

                <div className="flex flex-col gap-2">
                    <ContributeButton />

                    <Button>
                        <CheckCheck /> Validate
                    </Button>
                </div>
            </aside>
        </article>
    );
}