"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { GiHamburgerMenu } from "react-icons/gi"
import { themes, ThemeItem } from "@/components/themes"

interface SidebarSliderProps {
  isOpen: boolean
  onClose: () => void
  // Callback die zowel spreadIndex (desktop) als mobilePageIndex (mobile) doorgeeft
  onThemeClick: (spreadIndex: number, mobilePageIndex: number) => void
  activeSpreadIndex?: number
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <GiHamburgerMenu size={24} />
    </button>
  )
}

export default function SidebarSlider({
  isOpen,
  onClose,
  onThemeClick,
  activeSpreadIndex,
}: SidebarSliderProps) {
  const handleClick = (theme: ThemeItem) => {
    onThemeClick(theme.spreadIndex, theme.mobilePageIndex)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Thema's</p>

            <nav className="flex flex-col">
              {themes.map((theme) => {
                const isActive = activeSpreadIndex === theme.spreadIndex
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleClick(theme)}
                    className={`text-left px-3 py-3 rounded text-sm transition-colors ${
                      isActive
                        ? "bg-black text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {theme.title}
                  </button>
                )
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
