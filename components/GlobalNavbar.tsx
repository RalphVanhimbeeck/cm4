"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"
import { themes } from "./themes"

type GlobalNavbarProps = {
  onNavigate: (spreadIndex: number) => void
  currentSpreadIndex?: number
}

export default function GlobalNavbar({ onNavigate, currentSpreadIndex = 0 }: GlobalNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleThemeClick = (spreadIndex: number) => {
    onNavigate(spreadIndex)
    setIsSidebarOpen(false)
  }

  return (
    <>
      {/* Hamburger menu icon button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* SidebarSlider component */}
      <SidebarSlider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <nav className="flex flex-col space-y-1">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 px-2">
            Thema's
          </p>

          {themes.map((theme) => {
            const isActive = currentSpreadIndex === theme.spreadIndex
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeClick(theme.spreadIndex)}
                className={`text-left px-3 py-2 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {theme.title}
              </button>
            )
          })}
        </nav>
      </SidebarSlider>
    </>
  )
}
