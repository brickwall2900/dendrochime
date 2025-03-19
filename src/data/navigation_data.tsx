import { Footprints, NotepadText, Space, TentTree, Trees, Trophy } from "lucide-react";

export const links = [
    { href: "/home", name: "Home" },
    { href: "/dashboard", name: "Dashboard" },
];

export const sidebar_links = [
    { href: "/emission-record", name: "Corbon Emission Record", icon: <Footprints /> },
    { href: "/carbon-seq-data", name: "Carbon Sequestration and Tree smomething", icon: <Trees /> },
    { href: "/green-spaces", name: "Green Spaces around You", icon: <TentTree /> },
    { href: "#", name: "Add note", icon: <NotepadText /> },
    { href: "#", name: "Achievements", icon: <Trophy /> },
];