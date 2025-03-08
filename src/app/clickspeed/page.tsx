"use client";

import { useState } from "react";

export default function Page() {
    const [click, setClicks] = useState(0);

    function btnClick() {
        setClicks(click + 1);
    }

    function btnReset() {
        setClicks(0);
    }

    return <>
        <p>You have clicked {click} times!</p>
        <button type="button" onClick={btnClick}>Click!!</button>
        <button type="button" onClick={btnReset}>Reset</button> 
    </>
}