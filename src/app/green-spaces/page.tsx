import MapCaller from '@/components/map/map-caller';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CheckCheck, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import ContributeButton from './contribute-button';
import { getGreenSpaces, isSuccess } from '@/data/something_data_utils';
import { Marker } from '@/components/map/map';

export default async function Page() {
    const response = await getGreenSpaces();

    if (!isSuccess(response)) {
        return <p>Unable to get green spaces.</p>
    }
    const greenSpaces = response.response;

    return (
        <article className="m-8 flex flex-row gap-2 h-full">
            <section className="p-2 flex flex-col gap-4 w-[80%]">
                <h1 className="text-3xl">Green Spaces Near You!</h1>
                <p>{greenSpaces?.length} markers loaded...</p>
                <MapCaller markers={greenSpaces?.map((x) => x.location as Marker)} />
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