export type EmissionId = string

export interface EmissionAction {
  id: EmissionId
  internalName: string
  name: string
  icon: string
  co2?: number
}

export interface EmissionSection {
  id: EmissionId
  name: string
  actions: EmissionAction[]
}

export const emissionData: EmissionSection[] = [
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

export function getSection(id: EmissionId): EmissionSection | undefined {
    return emissionData.find((section) => section.id === id)
}
  
  export function getAction(sectionId: EmissionId, actionId: EmissionId): EmissionAction | undefined {
    const section = getSection(sectionId)
    return section?.actions.find((action) => action.id === actionId)
}  