import Image from "next/image"
import FunFact from "./funfacts";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge"

function ImageTest() {
    return <Image 
        src="https://s3-eu-west-1.amazonaws.com/blog-ecotree/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg" 
        alt="Trees" 
        width={500}
        height={500}
    />
}

export default function TestPage() {
    return <>
        <ImageTest />
        <p>hello!</p>
        <Suspense fallback={<p>Loading...</p>}>
            <FunFact />
        </Suspense>
    </>;
}