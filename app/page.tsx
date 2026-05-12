"use client"

import { useState } from "react"
import GlobalNavbar from "@/components/GlobalNavbar"
import Flipbook from "@/components/Flipbook"

export default function Page() {
  const [spreadIndex, setSpreadIndex] = useState(0)

  return (
    <>
      <GlobalNavbar
        onNavigate={setSpreadIndex}
        currentSpreadIndex={spreadIndex}
      />
      <Flipbook
        externalSpreadIndex={spreadIndex}
        onSpreadChange={setSpreadIndex}
      />
    </>
  )
}
