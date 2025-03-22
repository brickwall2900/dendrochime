import { Footprints, NotepadText, Shrub, TentTree, Trees, Trophy } from "lucide-react";

export const links = [
    { href: "/", name: "Home" },
    { href: "/dashboard", name: "Dashboard" },
];

export const sidebar_links = [
    { href: "/emission-record", name: "Carbon Emission Record", icon: <Footprints /> },
    { href: "/tree-profiles", name: "Tree Profiles", icon: <Shrub /> },
    { href: "/green-spaces", name: "Green Spaces Near You", icon: <Trees /> },
    { href: "#", name: "Add note", icon: <NotepadText /> },
    { href: "#", name: "Achievements", icon: <Trophy /> },
];