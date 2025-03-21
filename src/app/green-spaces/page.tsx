"use client";

import MapCaller from '@/components/map/map-caller';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CheckCheck, PlusCircle, RecycleIcon } from 'lucide-react';
import Link from 'next/link';
import ContributeButton from './contribute-button';
import { getGreenSpaces, GreenSpace, isSuccess } from '@/data/client_data_utils';
import { Location, Marker } from '@/components/map/map';
import { useEffect, useRef, useState } from 'react';

// Welcome to DendroChime, where mobile support... isn't there yet.
export default function Page() {
    const [ greenSpaces, setGreenSpaces ] = useState<GreenSpace[]>([]);
    const [ position, setPosition ] = useState<Location | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const reloadButtonRef = useRef<HTMLButtonElement | null>(null);

    function reload() {
        const doSomething = async () => {
            const button = reloadButtonRef.current;
            if (button) { button.disabled = true; }
            const response = await getGreenSpaces();
            if (isSuccess(response) && response.response) {
                setGreenSpaces(response.response);
            } else {
                setError(response.status);
            }
            if (button) { button.disabled = false; }
        }

        doSomething().catch(console.error);
    }

    useEffect(() => {
        reload();
    }, []);

    function onMapClicked(loc: Location) {
        setPosition(loc);
    }

    return (
        <article className="m-8 flex flex-row gap-2 h-full">
            <section className="p-2 flex flex-col gap-4 w-[80%]">
                <div className="flex flex-row">
                    <h1 className="text-3xl text-left px-auto mr-auto">Green Spaces Near You!</h1>
                    <Button onClick={reload} ref={reloadButtonRef}><RecycleIcon /> Reload</Button>
                </div>
                <MapCaller markers={greenSpaces?.map((x) => {
                    const marker = {} as Marker
                    marker.lat = x.location.lat;
                    marker.long = x.location.long;
                    marker.id = x.id;
                    marker.popup = <div>
                        <p>{x.name}</p>
                        <p>{marker.lat}, {marker.long}</p>
                    </div>
                    return marker;
                })} onMapClicked={onMapClicked} />
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
                    <ContributeButton onContribute={reload} position={position} />

                    <Button>
                        <CheckCheck /> Validate
                    </Button>
                </div>
            </aside>
        </article>
    );
}