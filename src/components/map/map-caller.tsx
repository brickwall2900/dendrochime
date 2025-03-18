'use client';

import dynamic from 'next/dynamic';
import { ComponentProps, ComponentPropsWithoutRef } from 'react';

const LazyMap = dynamic(() => import("@/components/map/map"), {
    ssr: false,
    loading: () => <p>Map is loading...</p>,
});

function MapCaller(props: ComponentProps<typeof LazyMap>) {
    return <LazyMap {...props} />;
}

export default MapCaller;