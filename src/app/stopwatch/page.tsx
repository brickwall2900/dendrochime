"use client";

import { useEffect, useState } from "react"

function Timer({ tick, ms }: { tick: number, ms: number }) {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTicks((t) => t + tick);
        }, ms);

        return () => clearInterval(interval);
    }, []);

    return (<h1>{ticks} ticks after page load!</h1>)
}

export default function Page() {
    return <>
        <Timer tick={3} ms={300} />
        <Timer tick={2} ms={1000} />
        <Timer tick={8} ms={100} />
    </>
}