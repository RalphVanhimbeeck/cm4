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
      <div className="relative w-full h-full">
        <img
          src="/cover-coding.png"
          alt="Cover"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 flex items-start justify-start pt-8 pl-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg tracking-widest text-left">
            CODE<br />MAGAZINE
          </h1>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
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
          <img src="/sounddesign1.jpeg" alt="Sound Design 1" className="w-full h-full object-cover" />
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
            <img src="/sounddesign2.jpeg" alt="Sound Design 2" className="w-full h-full object-cover" />
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
            <img src="/GrafiekInTijd&Ruimte1.jpeg" alt="Grafiek in tijd en ruimte 1" className="w-full h-full object-cover" />
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
            <img src="/GrafiekInTijd&Ruimte2.jpeg" alt="Grafiek in tijd en ruimte 2" className="w-full h-full object-cover" />
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
            <img src="/GrafiekInTijd&Ruimte3.jpeg" alt="Grafiek in tijd en ruimte 3" className="w-full h-full object-cover" />
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
            <img src="/GrafiekInTijd&Ruimte4.jpeg" alt="Grafiek in tijd en ruimte 4" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Onder */}
        <div className="flex gap-3 flex-[1.5]">
          <div className="flex-1 rounded overflow-hidden">
            <img src="/GrafiekInTijd&Ruimte5.jpeg" alt="Grafiek in tijd en ruimte 5" className="w-full h-full object-cover" />
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
      <div className="flex flex-col w-full h-full gap-3">

        {/* Rij 1+2 gecombineerd: links kolom (grote foto + brede foto), rechts lange foto */}
        <div className="flex gap-3 flex-[3]">
          {/* Linkerkolom */}
          <div className="flex-[2.2] flex flex-col gap-3">
            {/* Boven: grote foto links + 2 kleine gestapeld */}
            <div className="flex gap-3 flex-[2]">
              <div className="flex-[1.2] bg-gray-200 rounded flex items-center justify-center">
                Foto
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
                  Foto
                </div>
                <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
                  Foto
                </div>
              </div>
            </div>
            {/* Onder: brede foto */}
            <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
              Foto
            </div>
          </div>
          {/* Rechterkolom: lange foto die doorloopt */}
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

        {/* Rij 3: 4 kleine foto's naast elkaar */}
        <div className="flex gap-3 flex-1">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

        {/* Rij 4: grote foto links + rechts 2 foto's gestapeld */}
        <div className="flex gap-3 flex-[2]">
          <div className="flex-[1.5] bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
              Foto
            </div>
            <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
              Foto
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
          <p className="text-[11.5px] text-gray-500 leading-relaxed">
          Sequentie is een belangrijk onderdeel van de visuele structuur binnen Machine Hallucinations. 
          De installatie bestaat uit een continue stroom van beelden die in elkaar overlopen zonder duidelijke onderbrekingen. 
          In plaats van vaste scènes of een lineair verloop ontstaat er een eindeloze transformatie waarin elke visuele toestand automatisch overgaat in de volgende.
          In tegenstelling tot klassieke motion graphics, waar alles vooraf wordt opgebouwd in een tijdlijn, worden deze sequenties hier gegenereerd door AI en algoritmes. 
          Daardoor herhaalt de visuele stroom zich nooit exact op dezelfde manier.
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded p-3 overflow-hidden">
          <p className="text-[11.5px] text-gray-500 leading-relaxed">
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
        <img src="public/SequentiëleGrafischeSystemen.jpeg" alt="Sequentiële Grafische Systemen" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
  },

  // 13 — BACK COVER
  {
    id: "back-cover",
    content: (
      <div className="absolute inset-0 bg-[#1b2a4a] rounded flex items-end justify-center pb-3">
        <span className="text-white text-[8px] tracking-widest lowercase opacity-70">Made by RVH</span>
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
}: {
  externalSpreadIndex?: number;
  onSpreadChange?: (index: number) => void;
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

  const updateSpread = (index: number) => {
    setSpreadIndex(index);
    onSpreadChange?.(index);
  };

  const nextSpread = () => updateSpread(Math.min(spreadIndex + 1, totalSpreads));
  const prevSpread = () => updateSpread(Math.max(spreadIndex - 1, 0));

  const nextPage = () => setMobilePageIndex((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setMobilePageIndex((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSpread();
      if (e.key === "ArrowLeft") prevSpread();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spreadIndex]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevPage();
    if (deltaX < -50) nextPage();
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
    </div>
  );
}
