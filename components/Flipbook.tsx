"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Flipbook.module.css";

type Page = {
  id: string;
  content: React.ReactNode | null;
};

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
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
          Bij Machine Hallucinations ontstaan de visuals volledig vanuit data en artificiële intelligentie. 
          In plaats van beelden manueel te ontwerpen zoals bij klassieke motion graphics, gebruikt Refik Anadol enorme datasets die door AI geanalyseerd worden. 
          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident deserunt mollit.
          </p>
        </div>
      </div>
    ),
  },
  // 6 — Page 5  (RECHTERPAGINA spread 3: "4/5")
  {
    id: "page-5",
    content: (
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Sunt in culpa qui officia deserunt mollit anim id est laborum
            consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste
            natus error sit voluptatem accusantium doloremque.
          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit, sed quia consequuntur magni dolores eos qui ratione
            sequi nesciunt neque porro quisquam.
          </p>
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

  const nextPage = () => updateMobilePage(Math.min(mobilePageIndex + 1, totalPages));
  const prevPage = () => updateMobilePage(Math.max(mobilePageIndex - 1, 0));

  // Gebruik ref zodat keydown listener niet elke keer opnieuw aangemaakt wordt
  const spreadIndexRef = useRef(spreadIndex);
  spreadIndexRef.current = spreadIndex;
  const mobilePageIndexRef = useRef(mobilePageIndex);
  mobilePageIndexRef.current = mobilePageIndex;

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


  // ── PDF EXPORT ──────────────────────────────────────────────
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);

    // Laad scripts dynamisch
    const loadScript = (src: string) =>
      new Promise<void>((res) => {
        if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => res();
        document.head.appendChild(s);
      });

    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

    const h2c = (window as any).html2canvas;
    const { jsPDF } = (window as any).jspdf;

    // A4 landscape in px @ 96dpi
    const PAGE_W = 1122;
    const PAGE_H = 794;

    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [PAGE_W, PAGE_H] });

    // Spread configuratie: [linker page-index, rechter page-index]
    // null = lege helft (cover/backcover)
    const spreadDefs: [number | null, number | null][] = [
      [null, 0],    // Cover
      [1,    2],    // Inside / Intro
      [3,    4],    // Sound Design
      [5,    6],    // Data driven
      [7,    8],    // Grafiek
      [9,    10],   // Interactieve
      [11,   12],   // Sequentiële
      [13,   null], // Back cover
    ];

    for (let si = 0; si < spreadDefs.length; si++) {
      const [leftIdx, rightIdx] = spreadDefs[si];

      // Tijdelijk een off-screen container renderen
      const wrap = document.createElement("div");
      wrap.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: ${PAGE_W}px;
        height: ${PAGE_H}px;
        display: flex;
        gap: 12px;
        padding: 24px;
        box-sizing: border-box;
        background: white;
        font-family: Georgia, serif;
      `;

      const makeHalf = (pageIdx: number | null) => {
        const half = document.createElement("div");
        half.style.cssText = `
          flex: 1;
          height: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          background: white;
        `;

        if (pageIdx !== null) {
          // Kloon de pagina uit de verborgen "pdf-source" div
          const source = document.getElementById(`pdf-page-${pageIdx}`);
          if (source) {
            const clone = source.cloneNode(true) as HTMLElement;
            clone.style.cssText = "width:100%;height:100%;position:relative;";
            half.appendChild(clone);
          }
        } else {
          half.style.background = "#f3f4f6";
        }
        return half;
      };

      wrap.appendChild(makeHalf(leftIdx));
      wrap.appendChild(makeHalf(rightIdx));
      document.body.appendChild(wrap);

      const canvas = await h2c(wrap, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: PAGE_W,
        height: PAGE_H,
        logging: false,
      });

      document.body.removeChild(wrap);

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      if (si > 0) pdf.addPage([PAGE_W, PAGE_H], "landscape");
      pdf.addImage(imgData, "JPEG", 0, 0, PAGE_W, PAGE_H);
    }

    pdf.save("HALLUCINATE_magazine.pdf");
    setIsExporting(false);
  };
  // ────────────────────────────────────────────────────────────

  return (
    <div className={styles.wrapper}>
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
          className="px-4 py-2 border rounded disabled:opacity-40"
          onClick={prevSpread}
          disabled={spreadIndex === 0}
        >
          ← Vorige
        </button>
        <button
          className="px-4 py-2 border rounded disabled:opacity-40"
          onClick={nextSpread}
          disabled={spreadIndex === totalSpreads}
        >
          Volgende →
        </button>
      </div>

      {/* NAV */}
      <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
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

      {/* PDF EXPORT KNOP */}
      <div className="flex justify-center mt-3">
        <button
          onClick={exportToPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2 bg-black text-white text-xs rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isExporting ? (
            <>
              <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
              Exporteren...
            </>
          ) : (
            <>↓ Download PDF</>
          )}
        </button>
      </div>

      {/* Verborgen bronpaginas voor PDF-export */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px", pointerEvents: "none", zIndex: -1 }}>
        {pages.map((page, idx) => (
          <div
            key={page.id}
            id={`pdf-page-${idx}`}
            style={{ width: "500px", height: "700px", background: "white", overflow: "hidden", position: "relative" }}
          >
            {page.content}
          </div>
        ))}
      </div>
    </div>
  );
}
