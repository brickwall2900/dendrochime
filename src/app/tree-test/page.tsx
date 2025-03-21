"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { getTreeSpecies, isSuccess, TreeSpecies } from "@/data/client_data_utils";
  

export function TreeThingItem({ species, className }: { species: TreeSpecies, className?: string }) {
    return (
        <li className={cn("flex flex-col border p-4 border-gray-800 rounded-xl max-w-full", className)}>
            <div className="flex flex-row justify-between">
                <Link className="text-xl hover:underline" href="#">{species.species}</Link>
                {/* <p className="text-sm">Modified <time dateTime={news.dateModified.toString()}>{news.dateModified.toLocaleString()}</time></p> */}
            </div>

            <div className="flex flex-row">
                <p className="text-md truncate">{species.co2_stock} CO2 stock</p>
            </div>
        </li>
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

    // For now, this only gives the top 10 results.
    // TODO: Add page controls!

    return (<article className="m-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between justify-start">
            <h1 className="text-3xl">Tree Species Search</h1>
            <form onSubmit={onSearch} className="flex gap-2">
                <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="border p-2 rounded-md"
                />
                <Button type="submit" ref={buttonRef} >Search</Button>
            </form>
        </div>
        <ul className="flex flex-col gap-4">
            {!error ? 
                results.map(x => <TreeThingItem species={x} key={x.id}></TreeThingItem>)
                : <li>Error fetching tree species! {error}</li>}
        </ul>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    </article>);
}