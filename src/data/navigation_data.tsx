import { Footprints, NotepadText, Space, TentTree, Trees, Trophy } from "lucide-react";

export const links = [
    { href: "/home", name: "Home" },
    { href: "/dashboard", name: "Dashboard" },
];

export const sidebar_links = [
    { href: "/footprint-record", name: "Corbon Footprint Record", icon: <Footprints /> },
    { href: "/carbon-seq-data", name: "Carbon Sequestration and Tree smomething", icon: <Trees /> },
    { href: "/green-spaces", name: "Green Spaces around You", icon: <TentTree /> },
    { href: "https://www.google.com", name: "Add note", icon: <NotepadText /> },
    { href: "https://www.google.com", name: "Achievements", icon: <Trophy /> },
];