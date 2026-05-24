import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1587, height: 1122 });

    // networkidle2 is sneller dan networkidle0 (wacht tot max 2 requests actief)
    await page.goto(`${baseUrl}/print`, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Forceer alle afbeeldingen te laden in parallel (sneller dan wachten)
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map((img) => new Promise((res) => { img.onload = img.onerror = res; }))
      );
    });

    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "8mm", bottom: "8mm", left: "8mm", right: "8mm" },
    });

    await browser.close();

    return new NextResponse(pdf as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="HALLUCINATE_magazine.pdf"',
      },
    });
  } catch (error) {
    if (browser) await browser.close();
    console.error("PDF fout:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}