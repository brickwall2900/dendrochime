"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTreeSpecies, isSuccess, TreeSpecies } from '@/data/client_data_utils';
import { TreePine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function TreeSpeciesBox({ treeSpecies }: { treeSpecies: TreeSpecies }) {
    return (
        <article className="bg-green-600 rounded-md flex flex-col max-w-1/5 min-w-1/5 h-full p-4 gap-2 justify-between items-center">
            <figure className="w-full aspect-square bg-purple-600"> </figure>
            <dl className="flex flex-col justify-between h-full">
                <div className="flex flex-col items-center">
                    <dt className="font-bold text-sm">Scientific Name</dt>
                    <dd className="italic text-center text-sm">{treeSpecies.scientific_name}</dd>
                </div>
                <div className="flex flex-col items-center">
                    <dt className="font-bold text-sm">Common Name</dt>
                    <dd className="italic text-center text-sm">{treeSpecies.common_names.join(", ")}</dd>
                </div>
                <div className="flex flex-col items-center">
                    <dt className="font-bold text-sm">Family</dt>
                    <dd className="italic text-center text-sm">{treeSpecies.family}</dd>
                </div>
                <div className="flex flex-col items-center">
                    <dt className="font-bold text-sm">Native Location</dt>
                    <dd className="italic text-center text-sm">{treeSpecies.native_location}</dd>
                </div>
            </dl>
            {/* <p className="font-bold text-sm text-center text-white">Abosrbs up to {(treeSpecies.co2_stock).toFixed(2)} kg CO2 every year.</p> */}
        </article>
    );
}

export default function Page() {
    const [ query, setQuery ] = useState("");
    const [ error, setError ] = useState<string | null>(null);
    const [ results, setResults ] = useState<TreeSpecies[]>([]);

    const buttonRef = useRef<HTMLButtonElement>(null);

    async function doSomething() {
        const button = buttonRef.current;
        if (button) { button.disabled = true; }
        
        try {
            const response = await getTreeSpecies(query);
            if (isSuccess(response) && response.response) {
                setResults(response.response);
                setError(null);
            } else {
                setError(response.status);
            }
        } catch (error) {
            setError(String(error));
        }
        if (button) { button.disabled = false; }
    }

    async function onSearch(e: React.FormEvent) {
        e.preventDefault();
        doSomething();
    }

    useEffect(() => {
        doSomething();
    }, []);

    return (
        <article className="m-8 flex flex-col gap-4 h-full">
            <div className="flex flex-row">
                <div className="flex flex-row items-center gap-2 mr-auto px-auto">
                    <TreePine />
                    <h1 className="text-4xl text-left font-bold">Carbon Sequestration and Tree Accounting</h1>
                </div>
                <form onSubmit={onSearch} className="flex gap-2">
                    <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="border p-2 rounded-md"
                    />
                    <Button type="submit" ref={buttonRef}>Search</Button>
                </form>
            </div>
            <ul className="flex flex-row gap-4 overflow-x-scroll w-full h-full">
                {!error ? 
                    results.map(x => <TreeSpeciesBox treeSpecies={x} key={x.id}></TreeSpeciesBox>)
                    : <li>Error fetching tree species! {error}</li>}
            </ul>
        </article>
    );
}