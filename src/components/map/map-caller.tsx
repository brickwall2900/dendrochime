'use client';

import dynamic from 'next/dynamic';

const LazyMap = dynamic(() => import("@/components/map/map"), {
    ssr: false,
    loading: () => <p>Map is loading...</p>,
});

function MapCaller(...props: any) {
    return <LazyMap {...props} />;
}

export default MapCaller;