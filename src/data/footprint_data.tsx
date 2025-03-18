export type FootprintId = string

export interface FootprintAction {
  id: FootprintId
  internalName: string
  name: string
  icon: React.ReactNode
  co2?: number
}

export interface FootprintSection {
  id: FootprintId
  name: string
  actions: FootprintAction[]
}

export const footprint_data: FootprintSection[] = [
  {
    id: "transport",
    name: "Transport",
    actions: [
      {
        id: "car",
        internalName: "car",
        name: "Car",
        icon: "🚗",
        co2: 0.2,
      },
      {
        id: "bus",
        internalName: "bus",
        name: "Bus",
        icon: "🚌",
        co2: 0.1,
      },
      {
        id: "train",
        internalName: "train",
        name: "Train",
        icon: "🚆",
        co2: 0.05,
      },
      {
        id: "flight",
        internalName: "flight",
        name: "Flight",
        icon: "✈️",
        co2: 1.0,
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    actions: [
      {
        id: "meat",
        internalName: "meat",
        name: "Meat",
        icon: "🥩",
        co2: 2.0,
      },
      {
        id: "vegetables",
        internalName: "vegetables",
        name: "Vegetables",
        icon: "🥦",
        co2: 0.5,
      },
    ],
  },
  {
    id: "energy",
    name: "Energy",
    actions: [
      {
        id: "electricity",
        internalName: "electricity",
        name: "Electricity",
        icon: "💡",
        co2: 0.3,
      },
      {
        id: "gas",
        internalName: "gas",
        name: "Gas",
        icon: "🔥",
        co2: 1.5,
      },
    ],
  },
]

export function getSection(id: FootprintId): FootprintSection | undefined {
    return footprint_data.find((section) => section.id === id)
}
  
  export function getAction(sectionId: FootprintId, actionId: FootprintId): FootprintAction | undefined {
    const section = getSection(sectionId)
    return section?.actions.find((action) => action.id === actionId)
}  