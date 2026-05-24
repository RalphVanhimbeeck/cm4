// app/print/page.tsx
// Speciale pagina alleen voor PDF export — toont alle spreads na elkaar
// Wordt gebruikt door de Puppeteer API route

import PrintLayout from "@/components/PrintLayout";

export default function PrintPage() {
  return <PrintLayout />;
}
