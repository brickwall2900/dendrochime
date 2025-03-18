/* 
footprint_data: {
    section: {
        action: {
            icon: <icon to be displayed in grid>
            name: <name to be displayed in grid>
            internalName: <internal name>
            co2: <???>
        }
    }
}
*/

// TODO
// Defining icons here MIGHT be bad?? We are literally integrating JSX into data..?
// Bad programming practice?

import { Car, Bus, Plane, Train, Leaf, TreePalm, Utensils, Home, Factory, BinaryIcon } from "lucide-react";

export type FootprintAction = {
    icon: React.ReactNode,
    name: string,
    internalName: string,
    co2: number // in kg CO₂ per activity
}

export type FootprintSection = {
    name: string,
    actions: FootprintAction[]
}

export const footprint_data: FootprintSection[] = [
    {
        name: "Transportation",
        actions: [
            {
                icon: <Car className="w-full h-full" />,
                name: "Car",
                internalName: "drive_car",
                co2: 2.3, // kg CO₂ per mile
            },
            {
                icon: <BinaryIcon className="w-full h-full" />,
                name: "Bicycle",
                internalName: "ride_bike",
                co2: 0, // No emissions
            },
            {
                icon: <Bus className="w-full h-full" />,
                name: "Bus",
                internalName: "take_bus",
                co2: 0.089, // kg CO₂ per mile per passenger
            },
            {
                icon: <Train className="w-full h-full" />,
                name: "Train",
                internalName: "take_train",
                co2: 0.041, // kg CO₂ per mile per passenger
            },
            {
                icon: <Plane className="w-full h-full" />,
                name: "Plane",
                internalName: "fly_plane",
                co2: 90, // kg CO₂ per hour flight
            },
        ],
    },
    {
        name: "Energy Usage",
        actions: [
            {
                icon: <Home className="w-full h-full" />,
                name: "Electricity",
                internalName: "electricity_use",
                co2: 0.5, // kg CO₂ per kWh
            },
            {
                icon: <Factory className="w-full h-full" />,
                name: "Natural Gas",
                internalName: "use_gas",
                co2: 2, // kg CO₂ per cubic meter
            },
        ],
    },
    {
        name: "Diet & Food",
        actions: [
            {
                icon: <Utensils className="w-full h-full" />,
                name: "Meat",
                internalName: "eat_meat",
                co2: 27, // kg CO₂ per kg of beef
            },
            {
                icon: <Leaf className="w-full h-full" />,
                name: "Vegetarian",
                internalName: "eat_vegetarian",
                co2: 6, // kg CO₂ per kg of plant-based food
            },
        ],
    },
    {
        name: "Trees & Offsets",
        actions: [
            {
                icon: <TreePalm className="w-full h-full" />,
                name: "Plant",
                internalName: "plant_tree",
                co2: -20, // kg CO₂ absorbed per year
            },
        ],
    },
];