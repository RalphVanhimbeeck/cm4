"use client"

import { useState } from "react"
import GlobalNavbar from "@/components/GlobalNavbar"
import Flipbook from "@/components/Flipbook"

export default function Page() {
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [mobilePageIndex, setMobilePageIndex] = useState(0)

  const handleNavigate = (spreadIdx: number, mobileIdx: number) => {
    setSpreadIndex(spreadIdx)
    setMobilePageIndex(mobileIdx)
  }

  return (
    <>
      <GlobalNavbar
        onNavigate={handleNavigate}
        currentSpreadIndex={spreadIndex}
      />
      <Flipbook
        externalSpreadIndex={spreadIndex}
        onSpreadChange={setSpreadIndex}
        externalMobilePageIndex={mobilePageIndex}
        onMobilePageChange={setMobilePageIndex}
      />
    </>
  )
}
