"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"
import { themes } from "./themes"

type GlobalNavbarProps = {
  onNavigate: (spreadIndex: number, mobilePageIndex: number) => void
  currentSpreadIndex?: number
}

export default function GlobalNavbar({ onNavigate, currentSpreadIndex = 0 }: GlobalNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleThemeClick = (spreadIndex: number, mobilePageIndex: number) => {
    onNavigate(spreadIndex, mobilePageIndex)
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
      <SidebarSlider
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onThemeClick={handleThemeClick}
        activeSpreadIndex={currentSpreadIndex}
      />
    </>
  )
}
