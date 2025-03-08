"use client";

import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args: any) => fetch(args, {cache: "no-cache"}).then((res) => res.json())

const URL = "https://api.adviceslip.com/advice"

export default function FunFact() {
    const [ fact, setFact ] = useState(null);
    const { data, error, mutate, isLoading } = useSWR(URL, fetcher);

    async function newFact() {
        // let data: any = await mutate();
        // console.log(data);
        // console.log(data.slip.advice);
        setFact(data.slip.advice);
    }

    function btnNewFact() {
        newFact();
    }

    useEffect(() => {
        newFact();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{new String(error)}</p>
    }

    return <>
        <p>Fun Fact: {fact != null ? fact : "??"}</p>
        <button type="button" onClick={btnNewFact}>New fact!</button>
    </>
}