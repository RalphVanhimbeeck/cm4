"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Flipbook.module.css";
import HandTracker from "./HandTracker";

type Page = {
  id: string;
  content: React.ReactNode | null;
};

export const printPages: React.ReactNode[] = [];
const pages: Page[] = [
  // 0 — COVER
  {
    id: "cover",
    content: (
      <div className="relative w-full h-full rounded overflow-hidden" style={{ background: "#050810" }}>

        {/* Achtergrond foto */}
        <img
          src="/InteractieveInformatieStructuren1.jpg"
          alt="Cover"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6, mixBlendMode: "luminosity" }}
        />

        {/* Kleur overlay — blauwe gloed */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(0,80,255,0.35) 0%, rgba(180,0,255,0.2) 50%, rgba(0,0,0,0.7) 100%)"
        }} />

        {/* Onderaan donkere fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{
          background: "linear-gradient(to top, rgba(5,8,16,1) 0%, transparent 100%)"
        }} />

        {/* Bovenaan dunne lijn + editie */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <div style={{ width: "30%", height: "1px", background: "rgba(255,255,255,0.3)" }} />
          <p style={{ fontFamily: "Georgia, serif", fontSize: "7px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.3em" }}>
            VOL. 01 — 2026
          </p>
          <div style={{ width: "30%", height: "1px", background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* Titel */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8">
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.4rem, 5vw, 2.4rem)",
            fontWeight: 400,
            color: "white",
            letterSpacing: "0.18em",
            lineHeight: 1,
            marginBottom: "6px",
          }}>
            HALLUCINATE
          </h1>
          <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.25)", marginBottom: "8px" }} />
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "7px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}>
            The art of artificial imagination — Refik Anadol
          </p>
        </div>

      </div>
    ),
  },
  // 1 — INSIDE COVER
  { id: "inside-cover", content: null },
  // 2 — Page 1  (spread 1: Inside / 1)
  {
    id: "page-1",
    content: (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-gray-100 rounded p-4 w-3/4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Machine Hallucinations is geen gewone tentoonstelling. Het is een ervaring die je binnentrekt in een wereld waar data niet langer een getal of grafiek is, maar iets wat je voelt, ziet en bijna kunt aanraken. Refik Anadol slaagt erin om het onzichtbare zichtbaar te maken — de enorme hoeveelheden informatie die onze wereld vormgeven, omgezet naar bewegende, ademende beelden die nooit twee keer hetzelfde zijn.
            <br /><br />
            In dit magazine verkennen we hoe zijn werk raakt aan grafisch ontwerp, sound design, data-visualisatie en cinematografie. Niet vanuit een technisch standpunt, maar vanuit een menselijk één: wat doet het met je als een machine begint te dromen? En wat betekent dat voor de manier waarop wij als ontwerpers naar ons vak kijken?
            <br /><br />
            Dit is geen handleiding. Het is een uitnodiging om anders te kijken.
          </p>
        </div>
      </div>
    ),
  },
  // 3 — Page 2  (LINKERPAGINA spread 2: "2/3")
  {
    id: "page-2",
    content: (
      <div className="flex flex-row w-full h-full gap-3">
        <div className="flex-1 rounded overflow-hidden">
          <img src="/sounddesign1.jpeg" alt="Sound Design 1" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
          Bij Machine Hallucinations speelt sound design een veel grotere rol dan enkel achtergrondgeluid. 
          Het geluid vormt samen met de visuals één geheel en bepaalt sterk hoe de bezoeker de installatie ervaart. 
          Refik Anadol gebruikt geen klassieke muziek, maar werkt met diepe ambient geluiden, lage frequenties en digitale texturen die constant veranderen. 
          Daardoor voelt de ruimte bijna levend aan en word je volledig ondergedompeld in de installatie.
          De soundscape beweegt mee met de projecties en versterkt de transformaties van de beelden. 
          </p>
        </div>
      </div>
    ),
  },
  // 4 — Page 3  (RECHTERPAGINA spread 2: "2/3")
  {
    id: "page-3",
    content: (
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
            Door het gebruik van surround sound lijkt het alsof de ruimte zelf reageert op wat er visueel gebeurt. 
            Hierdoor kijkt de bezoeker niet alleen naar een projectie, maar bevindt hij zich midden in een audiovisueel systeem waarin beeld en geluid voortdurend met elkaar verbonden zijn.
            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden">
            <img src="/sounddesign2.jpeg" alt="Sound Design 2" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              Wat deze installatie interessant maakt, is dat het geluid geen klassiek verhaal vertelt zoals in film.
              Er is geen duidelijke melodie of spanningsopbouw, maar eerder een constante stroom van geluid die de ervaring hypnotisch en dromerig maakt. 
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
            Het sound design zorgt ervoor dat de AI-gegenereerde beelden minder technisch aanvoelen en meer emotie oproepen. 
            Hierdoor wordt geluid niet alleen decoratie, maar een echte interface tussen mens, ruimte en data.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 5 — Page 4  (LINKERPAGINA spread 3: "4/5")
  {
    id: "page-4",
    content: (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex-[3]"
          style={{
            backgroundImage: "url('/Datadrivengrafischeobjecten.jpeg')",
            backgroundSize: "calc(200% + 16px) 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex-[2] flex flex-row gap-3 pt-3">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
            Bij Machine Hallucinations ontstaan de visuals volledig vanuit data en artificiële intelligentie. 
            In plaats van beelden manueel te ontwerpen zoals bij klassieke motion graphics, gebruikt Refik Anadol enorme datasets die door AI geanalyseerd worden. 
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              Voor Unsupervised gebruikte hij de digitale collectie van het MoMA, waarbij de machine verbanden zocht tussen kleuren, vormen, composities en stijlen.
              De data wordt zo omgezet in bewegende en abstracte visuals die constant veranderen.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 6 — Page 5  (RECHTERPAGINA spread 3: "4/5")
  {
    id: "page-5",
    content: (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex-[3]"
          style={{
            backgroundImage: "url('/Datadrivengrafischeobjecten.jpeg')",
            backgroundSize: "calc(200% + 16px) 100%",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex-[2] flex flex-row gap-3 pt-3">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              De grafische objecten voelen daardoor niet statisch aan, maar eerder als levende systemen die blijven evolueren.
              De visuals lijken op vloeistoffen, digitale sculpturen of neurale netwerken die zich in realtime ontwikkelen.
              Wat interessant is, is dat Refik Anadol data ziet als een nieuw artistiek materiaal.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              Hierdoor verschuift grafisch ontwerp van iets vast en gecontroleerd naar een generatief proces waarin algoritmes mee bepalen hoe de beelden eruitzien.
              Dat roept ook vragen op over creativiteit en auteurschap: is de kunstenaar nog de maker, of speelt de AI daar even goed een rol in?
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 7 — Page 6
  {
    id: "page-6",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        {/* Boven */}
        <div className="flex flex-1 gap-3">
          <div className="flex-1 rounded overflow-hidden">
            <img src="/GrafiekInTijd&Ruimte1.jpeg" alt="Grafiek in tijd en ruimte 1" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
            De visuals van Machine Hallucinations ontstaan volledig vanuit data en artificiële intelligentie. 
            In plaats van beelden handmatig te ontwerpen, gebruikt Refik Anadol enorme datasets die door AI geanalyseerd worden.
            </p>
          </div>
        </div>

        {/* Onder */}
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
            Voor Unsupervised gebruikte hij de digitale collectie van het MoMA, waarbij de machine verbanden zocht tussen kleuren, vormen, composities en stijlen. 
            De data wordt hierdoor omgezet in abstracte en bewegende visuals die constant veranderen en nooit exact hetzelfde zijn.
            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden">
            <img src="/GrafiekInTijd&Ruimte2.jpeg" alt="Grafiek in tijd en ruimte 2" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    ),
  },
  // 8 — Page 7
  {
    id: "page-7",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        {/* Boven */}
        <div className="flex gap-3 flex-[1]">
          <div className="flex-1 rounded overflow-hidden">
            <img src="/GrafiekInTijd&Ruimte3.jpeg" alt="Grafiek in tijd en ruimte 3" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
            De grafische objecten voelen daardoor meer aan als levende systemen dan als gewone illustraties. 
            De visuals lijken op vloeistoffen, digitale sculpturen of neurale netwerken die zich in realtime ontwikkelen.
            </p>
          </div>
        </div>

        {/* Midden (gesplitst: tekst + foto) */}
        <div className="flex gap-3 flex-[1.5]">
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
            Dit maakt het project interessant binnen hedendaags grafisch ontwerp, 
            omdat de ontwerper niet langer elk detail bepaalt, 
            maar eerder een systeem creëert waarin algoritmes mee de beelden genereren.
            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden">
            <img src="/GrafiekInTijd&Ruimte4.jpeg" alt="Grafiek in tijd en ruimte 4" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Onder */}
        <div className="flex gap-3 flex-[1.5]">
          <div className="flex-1 rounded overflow-hidden">
            <img src="/GrafiekInTijd&Ruimte5.jpeg" alt="Grafiek in tijd en ruimte 5" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
            Daardoor stelt de installatie ook vragen over creativiteit en auteurschap: is de kunstenaar nog de maker, 
            of speelt de AI daar even goed een rol in?
            </p>
          </div>
        </div>

      </div>
    ),
  },

  // 9 — Page 8 (LINKS - spread 8/9) — volledig foto's
  {
    id: "page-8",
    content: (
      <div className="flex flex-col w-full h-full gap-2" style={{ minHeight: 0 }}>

        {/* Rij 1+2 gecombineerd: links kolom (grote foto + brede foto), rechts lange foto */}
        <div className="flex gap-2 min-h-0" style={{ flex: "2.5 2.5 0" }}>
          {/* Linkerkolom */}
          <div className="flex flex-col gap-2 min-h-0" style={{ flex: "2.2 2.2 0" }}>
            {/* Boven: grote foto links + 2 kleine gestapeld */}
            <div className="flex gap-2 min-h-0" style={{ flex: "2 2 0" }}>
              <div className="rounded overflow-hidden min-h-0" style={{ flex: "1.2 1.2 0" }}>
                <img src="/InteractieveInformatieStructuren1.jpg" alt="Interactieve Informatie Structuren 1" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2 min-h-0" style={{ flex: "1 1 0" }}>
                <div className="flex-1 rounded overflow-hidden min-h-0">
                  <img src="/InteractieveInformatieStructuren2.jpg" alt="Interactieve Informatie Structuren 2" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 rounded overflow-hidden min-h-0">
                  <img src="/InteractieveInformatieStructuren3.jpg" alt="Interactieve Informatie Structuren 3" loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            {/* Onder: brede foto */}
            <div className="flex-1 rounded overflow-hidden min-h-0">
              <img src="/InteractieveInformatieStructuren4.jpg" alt="Interactieve Informatie Structuren 4" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Rechterkolom: lange foto die doorloopt */}
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/InteractieveInformatieStructuren5.jpg" alt="Interactieve Informatie Structuren 5" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Rij 3: 4 kleine foto's naast elkaar */}
        <div className="flex gap-2 min-h-0" style={{ flex: "0.8 0.8 0" }}>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/InteractieveInformatieStructuren6.jpg" alt="Interactieve Informatie Structuren 6" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/InteractieveInformatieStructuren7.jpeg" alt="Interactieve Informatie Structuren 7" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/InteractieveInformatieStructuren8.jpg" alt="Interactieve Informatie Structuren 8" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/InteractieveInformatieStructuren9.jpg" alt="Interactieve Informatie Structuren 9" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Rij 4: grote foto links + rechts 2 foto's gestapeld */}
        <div className="flex gap-2 min-h-0" style={{ flex: "1.5 1.5 0" }}>
          <div className="rounded overflow-hidden min-h-0" style={{ flex: "1.5 1.5 0" }}>
            <img src="/InteractieveInformatieStructuren10.webp" alt="Interactieve Informatie Structuren 10" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-h-0">
            <div className="flex-1 rounded overflow-hidden min-h-0">
              <img src="/InteractieveInformatieStructuren11.jpeg" alt="Interactieve Informatie Structuren 11" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded overflow-hidden min-h-0">
              <img src="/InteractieveInformatieStructuren12.jpg" alt="Interactieve Informatie Structuren 12" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

      </div>
    ),
  },

  // 10 — Page 9 (RECHTS - spread 8/9) — twee tekstblokken naast elkaar
  {
    id: "page-9",
    content: (
      <div className="flex flex-row w-full h-full gap-3">

        <div className="flex-1 bg-gray-100 rounded p-3 overflow-hidden">
          <p className="text-[11.5px] text-gray-500 leading-relaxed">
          Hoewel Machine Hallucinations geen klassieke interactieve installatie is met knoppen of touchscreens, draait het project volledig rond de interactie tussen mens, ruimte en informatie. 
          Refik Anadol zet grote hoeveelheden data om in een omgeving waarin bezoekers zich fysiek kunnen bewegen. 
          Daardoor wordt informatie niet langer iets statisch of analytisch, maar een ervaarbare en bijna emotionele ervaring.
          In plaats van data te vereenvoudigen zoals bij traditionele infographics of interfaces, worden complexe datasets hier net omgezet in abstracte en organische visuele systemen. 
          De informatie wordt geen object meer om naar te kijken,
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded p-3 overflow-hidden">
          <p className="text-[11.5px] text-gray-500 leading-relaxed">
          maar een volledige atmosfeer waarin je als bezoeker terechtkomt. 
          Hierdoor verschuift de ervaring van begrijpen naar beleven.
          De installatie sluit aan bij het idee van post-digitale interfaces, waarbij de klassieke interface bijna volledig verdwijnt. 
          Bezoekers gebruiken geen schermen of menu’s, maar interpreteren data via licht, geluid en beweging. 
          Tegelijk herdefinieert het werk ook het idee van een archief: de MoMA-collectie wordt een dynamisch, levend systeem dat voortdurend nieuwe verbanden legt, waardoor de installatie vragen oproept over hoe we in de toekomst met digitale informatie en cultuur omgaan.
          </p>
        </div>

      </div>
    ),
  },

  // 11 — Page 10 (LINKS - spread 10/11) — twee tekstblokken naast elkaar
  {
    id: "page-10",
    content: (
      <div className="flex flex-row w-full h-full gap-3">

        <div className="flex-1 bg-gray-100 rounded p-3 overflow-hidden">
          <p className="text-[11px] text-gray-500 leading-relaxed">
          Sequentie is een belangrijk onderdeel van de visuele structuur binnen Machine Hallucinations. 
          De installatie bestaat uit een continue stroom van beelden die in elkaar overlopen zonder duidelijke onderbrekingen. 
          In plaats van vaste scènes of een lineair verloop ontstaat er een eindeloze transformatie waarin elke visuele toestand automatisch overgaat in de volgende.
          In tegenstelling tot klassieke motion graphics, waar alles vooraf wordt opgebouwd in een tijdlijn, worden deze sequenties hier gegenereerd door AI en algoritmes. 
          Daardoor herhaalt de visuele stroom zich nooit exact op dezelfde manier.
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded p-3 overflow-hidden">
          <p className="text-[11px] text-gray-500 leading-relaxed">
          Het systeem voelt daardoor minder als een afgewerkt video-werk en meer als een proces dat voortdurend in beweging is en zichzelf blijft genereren.
          De overgangen tussen de beelden spelen hierbij een grote rol. 
          Vormen smelten samen, vervormen en evolueren op een vloeiende manier waardoor een bijna hypnotisch ritme ontstaat. 
          Hierdoor krijgt het werk een organische kwaliteit en lijkt het alsof de machine zelf aan het denken of dromen is. 
          Dit maakt het interessant binnen grafisch ontwerp, omdat de nadruk verschuift van een eindbeeld naar een systeem van regels en gedrag dat eindeloze variaties kan produceren.
          </p>
        </div>

      </div>
    ),
  },

  // 12 — Page 11 (RECHTS - spread 10/11) — grote foto bijna volledige pagina
  {
    id: "page-11",
    content: (
      <div className="flex w-full h-full">
        <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
        <img src="/2021_Refik-Anadol_Machine-Hallucinations.jpg.webp" alt="Sequentiële Grafische Systemen" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
  },

  // 13 — BACK COVER
  {
    id: "back-cover",
    content: (
      <div className="absolute inset-0 rounded overflow-hidden flex items-end justify-center pb-5" style={{ background: "#050810" }}>

        {/* Achtergrond foto */}
        <img
          src="/InteractieveInformatieStructuren5.jpg"
          alt="Back Cover"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3, mixBlendMode: "luminosity" }}
        />

        {/* Kleur overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(0,80,255,0.35) 0%, rgba(180,0,255,0.2) 50%, rgba(0,0,0,0.7) 100%)"
        }} />

        {/* Onderaan donkere fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{
          background: "linear-gradient(to top, rgba(5,8,16,1) 0%, transparent 100%)"
        }} />

        {/* Made by RVH */}
        <span className="relative z-10 text-white text-[8px] tracking-widest lowercase opacity-50">made by rvh</span>

      </div>
    ),
  },
];

/* =========================
   SPREADS
========================= */
const totalSpreads = 7;
const totalPages = pages.length - 1;

type SpreadMeta = {
  left: { pageNumber: number; theme: string } | null;
  right: { pageNumber: number; theme: string } | null;
};

const spreadMeta: SpreadMeta[] = [
  { left: null, right: null },
  { left: null, right: { pageNumber: 1, theme: "Introduction" } },
  { left: { pageNumber: 2, theme: "Sound Design" }, right: { pageNumber: 3, theme: "Sound Design" } },
  { left: { pageNumber: 4, theme: "Data driven grafische objecten" }, right: { pageNumber: 5, theme: "Data driven grafische objecten" } },
  { left: { pageNumber: 6, theme: "Grafiek in tijd en ruimte" }, right: { pageNumber: 7, theme: "Grafiek in tijd en ruimte" } },
  { left: { pageNumber: 8, theme: "Interactieve informatie structuren" }, right: { pageNumber: 9, theme: "Interactieve informatie structuren" } },
  { left: { pageNumber: 10, theme: "Sequentiële grafische systemen" }, right: { pageNumber: 11, theme: "Sequentiële grafische systemen" } },
  { left: null, right: null },
];

// Vul printPages voor gebruik in PrintLayout
pages.forEach((p, i) => { printPages[i] = p.content; });

/* Voettekst per verborgen PDF-bronpagina (index in de `pages`-array).
   Zelfde thema's/nummering als de live weergave, apart bijgehouden
   omdat de PDF-export enkel `page.content` klont, niet de live PageLabel-overlay. */
const pdfFooters: Record<number, { text: string; align: "left" | "right" }> = {
  2:  { text: "Introduction | 1",                                align: "right" },
  3:  { text: "2 | Sound Design",                                 align: "left"  },
  4:  { text: "Sound Design | 3",                                  align: "right" },
  5:  { text: "4 | Data driven grafische objecten",                align: "left"  },
  6:  { text: "Data driven grafische objecten | 5",                align: "right" },
  7:  { text: "6 | Grafiek in tijd en ruimte",                     align: "left"  },
  8:  { text: "Grafiek in tijd en ruimte | 7",                     align: "right" },
  9:  { text: "8 | Interactieve informatie structuren",            align: "left"  },
  10: { text: "Interactieve informatie structuren | 9",            align: "right" },
  11: { text: "10 | Sequentiële grafische systemen",                align: "left"  },
  12: { text: "Sequentiële grafische systemen | 11",                align: "right" },
};

const pageMeta: ({ pageNumber: number; theme: string } | null)[] = [
  null,
  null,
  { pageNumber: 1, theme: "Thema" },
  { pageNumber: 2, theme: "Thema" },
  { pageNumber: 3, theme: "Thema" },
  { pageNumber: 4, theme: "Thema" },
  { pageNumber: 5, theme: "Thema" },
  { pageNumber: 6, theme: "Thema" },
  { pageNumber: 7, theme: "Thema" },
  { pageNumber: 8, theme: "Thema" },
  { pageNumber: 9, theme: "Thema" },
  { pageNumber: 10, theme: "Thema" },
  { pageNumber: 11, theme: "Thema" },
  null,
];

/* =========================
   LABEL COMPONENT
========================= */
function PageLabel({
  side,
  meta,
}: {
  side: "left" | "right";
  meta: { pageNumber: number; theme: string } | null;
}) {
  if (!meta) return null;
  const isRight = side === "right";
  return (
    <div
      className={`absolute bottom-1 ${
        isRight ? "right-3 text-right" : "left-3 text-left"
      } text-[8px] tracking-widest uppercase text-gray-400 select-none`}
    >
      {isRight
        ? `${meta.theme} | ${meta.pageNumber}`
        : `${meta.pageNumber} | ${meta.theme}`}

    </div>
  );
}

/* =========================
   SPREAD 4/5 — aparte component
   Foto als horizontale balk over de volledige spread,
   4 tekstblokken naast elkaar eronder.
========================= */
function CrossSpread({
  leftContent,
  rightContent,
  metaLeft,
  metaRight,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  metaLeft: { pageNumber: number; theme: string } | null;
  metaRight: { pageNumber: number; theme: string } | null;
}) {
  // background-size: 200%+ zodat elke pagina slechts de helft van de foto toont
  const photoStyle = (side: "left" | "right"): React.CSSProperties => ({
    backgroundImage: "url('/Datadrivengrafischeobjecten.jpeg')",
    backgroundSize: "calc(200% + 16px) 100%",
    backgroundPosition: side === "left" ? "left center" : "right center",
    backgroundRepeat: "no-repeat",
  });

  return (
    <div className="hidden md:flex gap-4 w-full h-full justify-center">

      {/* Linkerpagina */}
      <div
        className="relative h-full border rounded shadow bg-white overflow-hidden flex flex-col"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Foto — linker helft van het doorlopende beeld */}
        <div className="flex-[3]" style={photoStyle("left")} />
        {/* Tekst onderaan */}
        <div className="flex-[2] flex flex-row gap-3 p-4 pt-3">
          {leftContent}
        </div>
        <PageLabel side="left" meta={metaLeft} />
      </div>

      {/* Rechterpagina */}
      <div
        className="relative h-full border rounded shadow bg-white overflow-hidden flex flex-col"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Foto — rechter helft van het doorlopende beeld */}
        <div className="flex-[3]" style={photoStyle("right")} />
        {/* Tekst onderaan */}
        <div className="flex-[2] flex flex-row gap-3 p-4 pt-3">
          {rightContent}
        </div>
        <PageLabel side="right" meta={metaRight} />
      </div>

    </div>
  );
}

/* =========================
   COMPONENT
========================= */
export default function Flipbook({
  externalSpreadIndex,
  onSpreadChange,
  externalMobilePageIndex,
  onMobilePageChange,
}: {
  externalSpreadIndex?: number;
  onSpreadChange?: (index: number) => void;
  externalMobilePageIndex?: number;
  onMobilePageChange?: (index: number) => void;
}) {
  const [spreadIndex, setSpreadIndex] = useState<number>(
    externalSpreadIndex ?? 0
  );
  const [mobilePageIndex, setMobilePageIndex] = useState<number>(0);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [showGridView, setShowGridView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [handTrackingEnabled, setHandTrackingEnabled] = useState(false);
  const isFullscreenRef = useRef(false);
  const flipbookWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      isFullscreenRef.current = active;
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      flipbookWrapperRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
      // Meteen zelf bijwerken i.p.v. enkel te wachten op het
      // (soms vertraagde) fullscreenchange-event van de browser —
      // zo stopt de camera direct zodra er op de knop geklikt wordt.
      setIsFullscreen(false);
      isFullscreenRef.current = false;
    }
  };

  const touchStartX = useRef<number | null>(null);

  // Sync met externe navigatie (vanuit navbar)
  useEffect(() => {
    if (externalSpreadIndex !== undefined && externalSpreadIndex !== spreadIndex) {
      setSpreadIndex(externalSpreadIndex);
    }
  }, [externalSpreadIndex]);

  // Sync mobile page met externe navigatie (vanuit menu)
  useEffect(() => {
    if (externalMobilePageIndex !== undefined && externalMobilePageIndex !== mobilePageIndex) {
      setMobilePageIndex(externalMobilePageIndex);
    }
  }, [externalMobilePageIndex]);

  const updateSpread = (index: number) => {
    setSpreadIndex(index);
    onSpreadChange?.(index);
  };

  const updateMobilePage = (index: number) => {
    setMobilePageIndex(index);
    onMobilePageChange?.(index);
  };

  const nextSpread = () => updateSpread(Math.min(spreadIndex + 1, totalSpreads));
  const prevSpread = () => updateSpread(Math.max(spreadIndex - 1, 0));

  // Welke spread hoort bij welke pagina-index (zelfde indeling als getSpread hieronder)
  const pageIndexToSpread = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7];
  const goToPage = (idx: number) => {
    updateMobilePage(idx);
    updateSpread(pageIndexToSpread[idx] ?? 0);
    setShowGridView(false);
  };

  const nextPage = () => updateMobilePage(Math.min(mobilePageIndex + 1, totalPages));
  const prevPage = () => updateMobilePage(Math.max(mobilePageIndex - 1, 0));

  // Gebruik ref zodat keydown listener niet elke keer opnieuw aangemaakt wordt
  const spreadIndexRef = useRef(spreadIndex);
  spreadIndexRef.current = spreadIndex;
  const mobilePageIndexRef = useRef(mobilePageIndex);
  mobilePageIndexRef.current = mobilePageIndex;

  // Stabiele callback voor HandTracker — met lege deps blijft de referentie
  // gelijk over renders heen, zodat HandTracker's camera niet steeds herstart.
  const handleHandFlip = useCallback((dir: "LEFT" | "RIGHT") => {
    if (dir === "RIGHT") {
      updateSpread(Math.min(spreadIndexRef.current + 1, totalSpreads));
    } else {
      updateSpread(Math.max(spreadIndexRef.current - 1, 0));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") updateSpread(Math.min(spreadIndexRef.current + 1, totalSpreads));
      if (e.key === "ArrowLeft") updateSpread(Math.max(spreadIndexRef.current - 1, 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // Lege deps — listener wordt maar één keer aangemaakt

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) updateMobilePage(Math.max(mobilePageIndexRef.current - 1, 0));
    if (deltaX < -50) updateMobilePage(Math.min(mobilePageIndexRef.current + 1, totalPages));
    touchStartX.current = null;
  };

  const isCover = spreadIndex === 0;
  const isBackCover = spreadIndex === totalSpreads;

  const getSpread = () => {
    switch (spreadIndex) {
      case 0: return { left: null, right: pages[0].content };
      case 1: return { left: pages[1].content, right: pages[2].content };
      case 2: return { left: pages[3].content, right: pages[4].content };
      case 3: return { left: pages[5].content, right: pages[6].content };
      case 4: return { left: pages[7].content, right: pages[8].content };
      case 5: return { left: pages[9].content, right: pages[10].content };
      case 6: return { left: pages[11].content, right: pages[12].content };
      case 7: return { left: pages[13].content, right: null };
      default: return { left: null, right: null };
    }
  };

  const { left, right } = getSpread();
  const currentMeta = spreadMeta[spreadIndex];

  const mobilePage = pages[mobilePageIndex];
  const mobileIsCover = mobilePageIndex === 0;
  const mobileIsBackCover = mobilePageIndex === totalPages;

  const spreadLabels = [
    "Cover",
    "Inside / 1",
    "2 / 3",
    "4 / 5",
    "6 / 7",
    "8 / 9",
    "10 / 11",
    "Rear"
  ];

  /* Tekstblokken voor spread 4/5 — links en rechts apart doorgeven */
  const spread45LeftContent = (
    <>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Bij Machine Hallucinations ontstaan de visuals volledig vanuit data en artificiële intelligentie.
          In plaats van beelden manueel te ontwerpen zoals bij klassieke motion graphics, gebruikt Refik Anadol enorme datasets die door AI geanalyseerd worden.
        </p>
      </div>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Voor Unsupervised gebruikte hij de digitale collectie van het MoMA, waarbij de machine verbanden zocht tussen kleuren, vormen, composities en stijlen.
          De data wordt zo omgezet in bewegende en abstracte visuals die constant veranderen.
        </p>
      </div>
    </>
  );

  const spread45RightContent = (
    <>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          De grafische objecten voelen daardoor niet statisch aan, maar eerder als levende systemen die blijven evolueren.
          De visuals lijken op vloeistoffen, digitale sculpturen of neurale netwerken die zich in realtime ontwikkelen.
          Wat interessant is, is dat Refik Anadol data ziet als een nieuw artistiek materiaal.
        </p>
      </div>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Hierdoor verschuift grafisch ontwerp van iets vast en gecontroleerd naar een generatief proces waarin algoritmes mee bepalen hoe de beelden eruitzien.
          Dat roept ook vragen op over creativiteit en auteurschap: is de kunstenaar nog de maker, of speelt de AI daar even goed een rol in?
        </p>
      </div>
    </>
  );


  // ── PDF EXPORT — échte download, zoals bij Issuu ──────────────
  const [pdfProgress, setPdfProgress] = useState<string>("");

  const withTimeout = <T,>(promise: Promise<T>, ms: number, label: string): Promise<T> =>
    Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(`Time-out (${ms / 1000}s) bij: ${label}`)), ms)
      ),
    ]);

  const exportPDF = async () => {
    setIsExportingPDF(true);
    setPdfProgress("Starten…");
    console.time("PDF-export totaal");
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const { jsPDF } = await import("jspdf");

      const spreadDefs: [number | null, number | null][] = [
        [null, 0],
        [1,    2],
        [3,    4],
        [5,    6],
        [7,    8],
        [9,    10],
        [11,   12],
        [13,   null],
      ];

      const A4_WIDTH_MM = 297;
      const A4_HEIGHT_MM = 210;
      const CAPTURE_WIDTH = 1400;
      const CAPTURE_HEIGHT = 990;

      let exportRoot = document.getElementById("pdf-export-root");
      if (!exportRoot) {
        exportRoot = document.createElement("div");
        exportRoot.id = "pdf-export-root";
        exportRoot.style.position = "fixed";
        exportRoot.style.top = "-9999px";
        exportRoot.style.left = "-9999px";
        exportRoot.style.pointerEvents = "none";
        document.body.appendChild(exportRoot);
      }

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      for (let i = 0; i < spreadDefs.length; i++) {
        const [leftIdx, rightIdx] = spreadDefs[i];
        const label = `spread ${i + 1}/${spreadDefs.length}`;
        setPdfProgress(`Pagina ${i + 1} van ${spreadDefs.length}…`);
        console.time(label);

        const spreadEl = document.createElement("div");
        spreadEl.className = "pdf-spread-hidden";
        spreadEl.style.display = "flex";
        spreadEl.style.width = `${CAPTURE_WIDTH}px`;
        spreadEl.style.height = `${CAPTURE_HEIGHT}px`;
        spreadEl.style.gap = "20px";
        spreadEl.style.background = "white";

        const makeSide = (idx: number | null) => {
          const side = document.createElement("div");
          side.style.flex = "1";
          side.style.height = "100%";
          side.style.position = "relative";
          side.style.overflow = "hidden";
          side.style.background = "white";
          if (idx !== null) {
            const source = document.getElementById(`pdf-page-${idx}`);
            if (source) {
              const clone = source.cloneNode(true) as HTMLElement;
              clone.style.width = "100%";
              clone.style.height = "100%";
              // Video/canvas/iframe kan html2canvas niet renderen en laat het proces hangen — negeren.
              clone.querySelectorAll("video, canvas, iframe").forEach((el) => el.remove());
              side.appendChild(clone);
            }
          }
          return side;
        };

        spreadEl.appendChild(makeSide(leftIdx));
        spreadEl.appendChild(makeSide(rightIdx));

        exportRoot.innerHTML = "";
        exportRoot.appendChild(spreadEl);

        // Geklonde <img>'s stonden op loading="lazy" en zaten al bij -9999px,
        // dus ze zijn NOOIT geladen door de browser. Forceer nu eager laden.
        const imgsInSpread = Array.from(spreadEl.querySelectorAll("img"));
        imgsInSpread.forEach((img) => {
          img.loading = "eager";
          img.decoding = "sync";
        });

        console.log(`[${label}] ${imgsInSpread.length} afbeelding(en) gevonden, wachten tot ze geladen zijn…`);
        await Promise.all(
          imgsInSpread.map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete && img.naturalWidth > 0) {
                  resolve();
                  return;
                }
                const done = () => resolve();
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
                setTimeout(done, 8000); // val na 8s toch door, per afbeelding
              })
          )
        );
        console.log(`[${label}] afbeeldingen klaar, start html2canvas…`);

        try {
          const canvas = await withTimeout(
            html2canvas(spreadEl, {
              scale: 1.5,
              useCORS: true,
              backgroundColor: "#ffffff",
              imageTimeout: 8000,
              logging: false,
              ignoreElements: (el) =>
                el.tagName === "VIDEO" || el.tagName === "CANVAS" || el.tagName === "IFRAME",
            }),
            20000,
            label
          );

          const imgData = canvas.toDataURL("image/jpeg", 0.85);
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
          console.timeEnd(label);
        } catch (spreadErr) {
          console.error(`Fout bij ${label}:`, spreadErr);
          console.timeEnd(label);
          // Ga door met de volgende spread i.p.v. de hele export te laten vastlopen
          if (i > 0) pdf.addPage();
        }
      }

      exportRoot.innerHTML = "";
      setPdfProgress("PDF opslaan…");
      pdf.save("HALLUCINATE-Refik-Anadol.pdf");
      console.timeEnd("PDF-export totaal");
    } catch (err) {
      console.error("PDF export mislukt:", err);
      console.timeEnd("PDF-export totaal");
      alert("Er ging iets mis bij het downloaden van de PDF. Probeer opnieuw.");
    } finally {
      setIsExportingPDF(false);
      setPdfProgress("");
    }
  };

  return (
    <div ref={flipbookWrapperRef} className={styles.wrapper}>
      {handTrackingEnabled && <HandTracker showOverlay onFlip={handleHandFlip} />}
      <div
        className="w-full max-w-5xl mx-auto px-2 sm:px-4"
        style={{ height: "62vh" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* DESKTOP — spread view */}
        {spreadIndex === 3 ? (
          /* Spread 4/5 — foto bovenaan over volledige breedte, tekst eronder */
          <CrossSpread
            leftContent={spread45LeftContent}
            rightContent={spread45RightContent}
            metaLeft={currentMeta.left}
            metaRight={currentMeta.right}
          />
        ) : (
          <div className="hidden md:flex gap-4 w-full h-full justify-center">
            {!isCover && (
              <div className="relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center p-6 pb-5">
                {left}
                <PageLabel side="left" meta={currentMeta.left} />
              </div>
            )}
            {!isBackCover && (
              <div
                className={`relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden ${
                  isCover ? "p-0" : "p-6 pb-5"
                }`}
              >
                {right}
                {!isCover && (
                  <PageLabel side="right" meta={currentMeta.right} />
                )}
              </div>
            )}
          </div>
        )}

        {/* MOBILE — één pagina tegelijk */}
        <div className="md:hidden w-full h-full flex items-center justify-center">
          <div
            className={`relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden ${
              mobileIsCover ? "p-0" : "p-4"
            }`}
          >
            {mobilePage.content}
            {!mobileIsCover && !mobileIsBackCover && (
              <PageLabel side="right" meta={pageMeta[mobilePageIndex]} />
            )}
          </div>
        </div>
      </div>

      {/* CONTROLS — alleen desktop */}
      <div className="hidden md:flex justify-center gap-4 mt-4">
        <button
          className={`px-4 py-2 border rounded disabled:opacity-40 transition-colors ${
            isFullscreen ? "border-white text-white hover:bg-white hover:text-black" : ""
          }`}
          onClick={prevSpread}
          disabled={spreadIndex === 0}
        >
          ← Vorige
        </button>
        <button
          className={`px-4 py-2 border rounded disabled:opacity-40 transition-colors ${
            isFullscreen ? "border-white text-white hover:bg-white hover:text-black" : ""
          }`}
          onClick={nextSpread}
          disabled={spreadIndex === totalSpreads}
        >
          Volgende →
        </button>
      </div>

      {/* NAV */}
      <div className={`${isFullscreen ? "hidden" : "flex"} items-center justify-center gap-2 mt-2 flex-wrap`}>
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border bg-white shadow text-lg disabled:opacity-30"
          onClick={prevPage}
          disabled={mobilePageIndex === 0}
          aria-label="Vorige pagina"
        >
          ‹
        </button>

        {spreadLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => updateSpread(i)}
            className={`hidden md:block px-3 py-2 border rounded text-xs ${
              spreadIndex === i ? "bg-black text-white" : ""
            }`}
          >
            {label}
          </button>
        ))}

        <span className="md:hidden text-xs text-gray-500">
          {mobilePageIndex + 1} / {totalPages + 1}
        </span>

        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border bg-white shadow text-lg disabled:opacity-30"
          onClick={nextPage}
          disabled={mobilePageIndex === totalPages}
          aria-label="Volgende pagina"
        >
          ›
        </button>
      </div>

      {/* PDF EXPORT + GRID VIEW KNOPPEN */}
      <div className="flex justify-center gap-2 mt-3">
        <button
          onClick={exportPDF}
          disabled={isExportingPDF}
          data-pdf-btn
          aria-label="Download als PDF"
          className={`flex items-center gap-2 px-5 py-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
            isFullscreen
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isExportingPDF ? (
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          )}
          {isExportingPDF ? (pdfProgress || "Bezig met downloaden…") : "Download"}
        </button>

        <button
          onClick={() => setShowGridView(true)}
          aria-label="Grid view"
          className={`flex items-center gap-2 px-5 py-2 text-xs rounded transition-colors ${
            isFullscreen
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Grid view
        </button>

        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          className={`flex items-center gap-2 px-5 py-2 text-xs rounded transition-colors ${
            isFullscreen
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isFullscreen ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 3H5a2 2 0 0 0-2 2v4" />
              <path d="M15 3h4a2 2 0 0 1 2 2v4" />
              <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
              <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          )}
          {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        </button>

        <button
          onClick={() => setHandTrackingEnabled((v) => !v)}
          aria-label={handTrackingEnabled ? "Handtracker uitzetten" : "Handtracker aanzetten"}
          className={`flex items-center gap-2 px-5 py-2 text-xs rounded transition-colors ${
            handTrackingEnabled
              ? "bg-green-600 text-white hover:bg-green-700"
              : isFullscreen
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 11V6a2 2 0 0 0-4 0v5" />
            <path d="M14 10V4a2 2 0 0 0-4 0v6" />
            <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
            <path d="M6 14v-2a2 2 0 0 0-4 0v3a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8v-3a2 2 0 0 0-4 0v2" />
          </svg>
          {handTrackingEnabled ? "Handtracker aan" : "Handtracker"}
        </button>
      </div>

      {/* GRID VIEW OVERLAY — zoals bij Issuu */}
      {showGridView && (
        <div className="fixed inset-0 z-50 bg-black/90 overflow-y-auto p-6">
          <button
            onClick={() => setShowGridView(false)}
            aria-label="Sluiten"
            className="fixed top-4 right-4 z-10 text-white text-2xl w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          >
            ✕
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 max-w-6xl mx-auto pt-10">
            {pages.map((page, idx) => (
              <button
                key={page.id}
                onClick={() => goToPage(idx)}
                aria-label={idx === 0 ? "Ga naar cover" : `Ga naar pagina ${idx}`}
                className="relative bg-white rounded shadow overflow-hidden hover:ring-2 hover:ring-white transition-all"
                style={{ width: "140px", height: "196px" }}
              >
                <div
                  style={{
                    width: "500px",
                    height: "700px",
                    transform: "scale(0.28)",
                    transformOrigin: "top left",
                    pointerEvents: "none",
                  }}
                >
                  {page.content}
                </div>
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {idx === 0 ? "Cover" : idx}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Verborgen bronpaginas voor PDF-export */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px", pointerEvents: "none", zIndex: -1 }}>
        {pages.map((page, idx) => {
          const footer = pdfFooters[idx];
          return (
            <div
              key={page.id}
              id={`pdf-page-${idx}`}
              style={{ width: "500px", height: "700px", background: "white", overflow: "hidden", position: "relative" }}
            >
              <div style={{ width: "100%", height: footer ? "calc(100% - 22px)" : "100%", overflow: "hidden" }}>
                {page.content}
              </div>
              {footer && (
                <div
                  style={{
                    width: "100%",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    [footer.align === "left" ? "justifyContent" : "justifyContent"]:
                      footer.align === "left" ? "flex-start" : "flex-end",
                    paddingLeft: footer.align === "left" ? "12px" : undefined,
                    paddingRight: footer.align === "right" ? "12px" : undefined,
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                  }}
                >
                  {footer.text}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

