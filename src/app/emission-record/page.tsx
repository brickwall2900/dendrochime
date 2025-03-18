"use client"

import type React from "react"

import { footprint_data, type FootprintAction, type FootprintId, type FootprintSection } from "@/data/footprint_data"
import { createContext, useContext, useMemo, useState } from "react"
import { X } from "lucide-react"

// Define a type for tracked emissions
type TrackedEmission = {
  sectionId: FootprintId
  itemId: FootprintId
  timestamp: Date
  id: string // unique id for each emission entry
}

type EmissionContext = {
  addEmission: (section: FootprintId, item: FootprintId) => void
  removeEmission: (emissionId: string) => void
  getEmissionsForSection: (sectionId: FootprintId) => TrackedEmission[]
  emissions: TrackedEmission[]
}

const EmissionContext = createContext<EmissionContext | null>(null)

function useEmission() {
  const context = useContext(EmissionContext)
  if (!context) {
    throw new Error("useEmission must be used within an EmissionContext.Provider")
  }

  return context
}

function TrackerItem({ item, section }: { item: FootprintAction; section: FootprintSection }) {
  const context = useEmission()

  function btnItemPress() {
    context.addEmission(section.id, item.id)
  }

  return (
    <button className="w-16 h-16 p-2 bg-green-300 hover:bg-green-400 flex flex-col items-center" onClick={btnItemPress}>
      {item.icon}
      <p className="text-xs truncate py-1">{item.name}</p>
    </button>
  )
}

function TrackerThing({ items, section }: { items: FootprintAction[]; section: FootprintSection }) {
  return (
    <div className="grid gap-2 auto-rows-[4rem] grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] justify-items-center overflow-clip">
      {items.map((x) => {
        return <TrackerItem item={x} key={x.internalName} section={section} />
      })}
    </div>
  )
}

function EmissionsList({ section }: { section: FootprintSection }) {
  const { getEmissionsForSection, removeEmission } = useEmission()
  const emissions = getEmissionsForSection(section.id)

  if (emissions.length === 0) {
    return (
      <div className="text-gray-100 italic text-sm">
        No emissions recorded for this section. Click items above to add them.
      </div>
    )
  }

  // Group emissions by item id to show count
  const groupedEmissions = emissions.reduce<
    Record<FootprintId, { count: number; action: FootprintAction | undefined; emissions: TrackedEmission[] }>
  >((acc, emission) => {
    if (!acc[emission.itemId]) {
      const action = section.actions.find((a) => a.id === emission.itemId)
      acc[emission.itemId] = {
        count: 0,
        action,
        emissions: [],
      }
    }
    acc[emission.itemId].count += 1
    acc[emission.itemId].emissions.push(emission)
    return acc
  }, {})

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-white font-medium">Your recorded emissions:</h3>
      <div className="space-y-2">
        {Object.entries(groupedEmissions).map(([itemId, { count, action, emissions }]) => (
          <div key={itemId} className="bg-green-500 p-2 rounded flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">{action?.icon}</div>
              <span>
                {action?.name} × {count}
              </span>
              <span className="text-green-100 text-sm">({(count * (action?.co2 || 0)).toFixed(1)} kg CO₂)</span>
            </div>
            <div>
              <button
                onClick={() => {
                  // Get the most recent emission for this action and remove it
                  const mostRecentEmission = emissions[emissions.length - 1]
                  if (mostRecentEmission) {
                    removeEmission(mostRecentEmission.id)
                  }
                }}
                className="p-1 hover:bg-green-600 rounded flex items-center gap-1"
                title="Remove one emission"
              >
                <X className="w-4 h-4" />
                <span className="text-xs">Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm font-medium text-white">
        <span>Total emissions for {section.name}:</span>
        <span>
          {emissions
            .reduce((total, emission) => {
              const action = section.actions.find((a) => a.id === emission.itemId)
              return total + (action?.co2 || 0)
            }, 0)
            .toFixed(1)}{" "}
          kg CO₂
        </span>
      </div>
    </div>
  )
}

function Thingy({
  title,
  icon,
  children,
  section,
}: {
  title: string
  icon?: React.ReactNode
  children?: React.ReactNode
  section: FootprintSection
}) {
  return (
    <section className="rounded-md overflow-hidden">
      <h1 className="text-xl bg-green-400 w-full p-2 pl-4 inline-flex gap-2">
        {icon && icon} {title}
      </h1>
      <div className="bg-green-600 w-full p-4">{children}</div>
      <div className="bg-green-600 w-full p-4 border-t border-green-500">
        <EmissionsList section={section} />
      </div>
    </section>
  )
}

export default function Page() {
  // Add state to track user's emissions
  const [emissions, setEmissions] = useState<TrackedEmission[]>([])

  function addEmission(sectionId: FootprintId, itemId: FootprintId) {
    const newEmission: TrackedEmission = {
      sectionId,
      itemId,
      timestamp: new Date(),
      id: `emission-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }

    setEmissions((prev) => [...prev, newEmission])
  }

  function removeEmission(emissionId: string) {
    setEmissions((prev) => prev.filter((emission) => emission.id !== emissionId))
  }

  function getEmissionsForSection(sectionId: FootprintId): TrackedEmission[] {
    return emissions.filter((emission) => emission.sectionId === sectionId)
  }

  const contextValue = useMemo<EmissionContext>(
    () => ({
      addEmission,
      removeEmission,
      getEmissionsForSection,
      emissions,
    }),
    [emissions],
  )

  const totalEmissions = emissions.reduce((total, emission) => {
    try {
      const section = footprint_data.find((s) => s.id === emission.sectionId)
      if (!section) return total

      const action = section.actions.find((a) => a.id === emission.itemId)
      return total + (action?.co2 || 0)
    } catch (error) {
      return total
    }
  }, 0)

  return (
    <EmissionContext.Provider value={contextValue}>
      <title>Carbon Emission Record</title>
      <article className="m-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl">Carbon Emission Record!!!!</h1>
          <div className="rounded bg-green-800 text-white p-3">
            <p className="text-lg font-bold">Total CO₂ E: {totalEmissions.toFixed(1)} kg</p>
            <p className="text-xs">From {emissions.length} recorded activities</p>
          </div>
        </div>
        {footprint_data.map((x) => {
          return (
            <Thingy title={x.name} key={x.name} section={x}>
              <TrackerThing items={x.actions} section={x} />
            </Thingy>
          )
        })}
      </article>
    </EmissionContext.Provider>
  )
}