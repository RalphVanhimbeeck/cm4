"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Flipbook.module.css";
import HandTracker from "./HandTracker";

type Page = {
  id: string;
  content: React.ReactNode | null;
};

export const printPages: React.ReactNode[] = [];

/* =========================
   THEMA-OPENER & FOTO-QUOTE
========================= */

// Thema-openingspagina: foto-achtergrond die bij het thema past, met een
// donkere overlay voor leesbaarheid en het themanummer + titel erover.
function ThemeOpener({ number, title, image }: { number: string; title: string; image: string }) {
  return (
    <div className="relative w-full h-full rounded overflow-hidden flex items-center justify-center">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.8 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.7) 100%)" }}
      />
      <div className="relative z-10 text-center px-4">
        <div className="text-[8cqw] tracking-[0.2em] text-white/90 mb-2 font-semibold">{number}</div>
        <div className="text-[6.5cqw] font-semibold tracking-wide text-white uppercase">{title}</div>
      </div>
    </div>
  );
}

// Foto met een grote quote eroverheen (donkere gradient onderaan voor leesbaarheid)
function PhotoQuote({ src, alt, quote }: { src: string; alt: string; quote: string }) {
  return (
    <div className="relative w-full h-full rounded overflow-hidden">
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 50%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white text-[6cqw] font-semibold leading-snug tracking-wide">{quote}</p>
      </div>
    </div>
  );
}

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
            The art of artificial imagination
          </p>
        </div>

      </div>
    ),
  },

  // 1 — INSIDE COVER
  { id: "inside-cover", content: null },

  // ===== INTRODUCTION (pagina 1-2) =====

  // 2 — Page 1  (introductie — apart kleiner dan de rest: enige lange, doorlopende tekst zonder andere vakken om naar uit te wijken)
  {
    id: "page-1",
    content: (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-gray-100 rounded p-3 w-3/4">
          <p className="text-[2.7cqw] text-gray-500 leading-snug">
            Toen ik aan dit project begon, dacht ik dat ik een magazine ging maken over één kunstenaar. Over Refik Anadol, over Machine Hallucinations, over een machine die droomt in data.
            <br /><br />
            Grafisch ontwerp wordt traditioneel geassocieerd met het statische beeld: een poster, een pagina, een foto binnen een vast kader. Maar naarmate ik dieper in mijn eigen onderzoek dook, merkte ik dat digitale media die relatie volledig veranderen. Een beeld kan bewegen, reageren op data, reageren op een gebruiker, of nieuwe versies van zichzelf genereren.
            <br /><br />
            Ik was al weken bezig met geluid, met golfvormen en MIDI-noten, met algoritmes die pixels herschikken, met code die geen instructie meer is maar bijna poëzie, met handen die door de lucht bewegen en een pagina laten omslaan. Op het eerste gezicht leken dat vijf losse onderwerpen: Sound Design, Data-driven Grafische Objecten, Grafiek in Tijd &amp; Ruimte, Interactieve Informatiestructuren en Sequentiële Grafische Systemen.
            <br /><br />
            Maar hoe verder ik kwam, hoe duidelijker het patroon werd. Geluid is data. Data wordt beeld. Beeld beweegt door tijd. Tijd wordt ruimte waarin iemand kan staan. En die iemand — de kijker, de lezer, jij — wordt zelf onderdeel van het systeem.
            <br /><br />
            Refik Anadol blijft doorheen dit magazine een belangrijk ijkpunt, omdat zijn werk zoveel van die lagen samenbrengt. Maar dit is niet enkel zijn verhaal. Het is het verhaal van wat er gebeurt zodra grafisch ontwerp stopt met stilstaan.
          </p>
        </div>
      </div>
    ),
  },

  // 3 — Page 2  (vijf thema's lijst)
  {
    id: "page-2",
    content: (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-gray-100 rounded p-4 w-3/4">
          <p className="text-[3.6cqw] text-gray-500 leading-relaxed">
            <strong className="text-gray-600">01 — Sound Design</strong><br />
            Geluid introduceert tijd, ritme en atmosfeer.<br /><br />
            <strong className="text-gray-600">02 — Data-driven Objecten</strong><br />
            Data en algoritmes introduceren systemen en generatie.<br /><br />
            <strong className="text-gray-600">03 — Tijd &amp; Ruimte</strong><br />
            Beweging laat het beeld bestaan buiten het kader.<br /><br />
            <strong className="text-gray-600">04 — Interactie</strong><br />
            De kijker krijgt invloed op de ervaring.<br /><br />
            <strong className="text-gray-600">05 — Sequentie</strong><br />
            Toestanden verbinden zich tot één proces.
          </p>
        </div>
      </div>
    ),
  },

  // ===== 01 / SOUND DESIGN (pagina 3-7) =====

  // 4 — Page 3  (thema-opener — foto-achtergrond i.p.v. arcering)
  {
    id: "page-3",
    content: <ThemeOpener number="01" title="Sound Design" image="/sound-design-bg.svg" />,
  },

  // 5 — Page 4  (intro + "Geluid als opgebouwd materiaal" — uit teksten-themas.pdf)
  {
    id: "page-4",
    content: (
      <div className="flex flex-row w-full h-full gap-3">
        <div className="flex-1 rounded overflow-hidden">
          <img src="/sounddesign1.jpeg" alt="Sound Design 1" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-[3.0cqw] text-gray-500 leading-relaxed">
          <b>Van geluid als effect naar geluid als ruimtelijk materiaal</b>
          <br></br>
          <br />
          Geluid wordt vaak gebruikt om een beeld te ondersteunen. Een film krijgt muziek, een animatie geluidseffecten en een installatie een soundscape. Tijdens mijn onderzoek merkte ik dat geluid veel meer kan zijn dan een aanvulling op beeld. Het kan een ruimte bepalen, beweging suggereren, emoties oproepen en zelfs informatie overbrengen.
          Daarom ben ik geluid gaan bekijken als een ontwerpmateriaal. Zoals een grafisch ontwerper werkt met kleur, typografie, vorm en compositie, werkt een sound designer met toonhoogte, frequentie, volume, ritme, textuur en ruimte. 
          Het gaat dus niet alleen om wat je hoort, maar ook om wanneer je iets hoort en welk gevoel dat oproept.
          Een belangrijk onderdeel van mijn onderzoek was de synthesizer. 
          </p>
        </div>
      </div>
    ),
  },

  // 6 — Page 5  ("Geluid als opgebouwd materiaal" / "Beweging in geluid" / "Van de studio naar de echte wereld" / "Visual score")
  {
    id: "page-5",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
              Hiermee kan geluid worden opgebouwd uit elektronische signalen.
              Door verschillende golfvormen en parameters te combineren, kan een eenvoudige klank veranderen in een complex geluid. 
              Ik zag hierin een duidelijke vergelijking met grafisch ontwerp: een ontwerper kan met eenvoudige vormen een complexe compositie maken, terwijl een sound designer hetzelfde doet met klanken.
              Ook tijd speelt hierbij een belangrijke rol. 
            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/sounddesign2.jpeg" alt="Sound Design 2" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Een geluid kan veranderen in volume, toonhoogte of frequentie.
            Het kan langzaam opbouwen, verdwijnen of steeds opnieuw veranderen. Hierdoor wordt geluid een bewegend materiaal. Dit sluit meteen aan bij mijn onderzoek naar tijd en sequentie.
            Mijn onderzoek ging daarnaast verder dan elektronische geluiden. Met field recording kunnen geluiden uit de echte wereld worden opgenomen en opnieuw gebruikt. 
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Natuur, steden, machines en menselijke activiteiten worden zo onderdeel van een nieuwe compositie. Chris Watson is hier een interessant voorbeeld van. Zijn werk laat zien dat een omgeving niet alleen iets is om naar te kijken, maar ook iets om bewust naar te luisteren.
            Een andere interessante link tussen geluid en grafisch ontwerp vond ik in de visual score. Hierbij worden muzikale ideeën voorgesteld met lijnen, vormen en symbolen. 
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 7 — Page 6  (schets: 2×2-grid — tekst/tekst boven, tekst/foto onder)
  {
    id: "page-6",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Een lijn kan bijvoorbeeld een verandering in toonhoogte aangeven, terwijl de positie of grootte van een element iets kan zeggen over timing of volume. Muziek wordt zo bijna een grafische compositie.
            Ook algoritmes kunnen muziek genereren. De maker hoeft niet iedere noot zelf te bepalen, maar kan regels vastleggen waarbinnen het systeem werkt. 
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Een voorbeeld hiervan is de Dice Music van Mozart, waarbij muzikale fragmenten volgens bepaalde regels willekeurig gecombineerd worden.
            Van daaruit kwam ik bij data sonification: het omzetten van data naar geluid. Gegevens kunnen bijvoorbeeld worden vertaald naar toonhoogte, volume of ritme. Een Geigerteller doet dit op een eenvoudige manier door straling hoorbaar te maken.
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Dit roept een interessante vraag op: als data zowel zichtbaar als hoorbaar kan worden gemaakt, waarom zouden we data dan altijd als een grafiek moeten bekijken?
            Bij Refik Anadol wordt die vraag bijzonder interessant. In Machine Hallucinations is geluid geen achtergrondmuziek, maar onderdeel van de volledige ervaring. 
            
            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/sounddesign1.jpeg" alt="Sound Design 1" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    ),
  },

  // 8 — Page 7  (schets: grote tekst boven, grote foto onder)
  {
    id: "page-7",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex-1 bg-gray-100 rounded flex items-center p-3 overflow-hidden min-h-0">
          <p className="text-[3.0cqw] text-gray-500 leading-snug">
          Digitale texturen, lage frequenties, ambient geluiden en andere klanken vullen samen de ruimte. De bezoeker staat daardoor niet buiten het werk, maar bevindt zich er middenin.
          De beelden en geluiden blijven voortdurend veranderen. Net zoals een synthesizerklank kan evolueren, verandert ook de soundscape mee met de visuele omgeving.
          Mijn belangrijkste inzicht uit dit onderzoek is daarom dat geluid niet alleen iets is dat een beeld ondersteunt. Het kan zelf materiaal, structuur en ruimte worden.          </p>
        </div>
        <div className="flex-1 rounded overflow-hidden min-h-0">
          <img src="/sounddesign2.jpeg" alt="Sound Design 2" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
  },

  // ===== 02 / DATA-DRIVEN GRAFISCHE OBJECTEN (pagina 8-12) =====

  // 9 — Page 8  (thema-opener — foto-achtergrond)
  {
    id: "page-8",
    content: <ThemeOpener number="02" title="Data driven grafische objecten" image="/data-driven-bg.svg" />,
  },

  // 10 — Page 9  (intro + "Van ontwerp naar systeem")
  {
    id: "page-9",
    content: (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-gray-100 rounded p-4 w-[90%]">
          <p className="text-[3.0cqw] text-gray-500 leading-snug">
          <b>Wanneer de designer niet meer ieder beeld zelf maakt</b>
          <br />
          <br />
          Traditioneel grafisch ontwerp draait vaak rond het maken van één specifieke compositie. De designer kiest de kleuren, typografie, beelden en positie van ieder element. Tijdens mijn onderzoek ontdekte ik dat dit in digitale media anders kan werken.
          <br />
          <br />
          Een designer kan namelijk niet alleen een beeld ontwerpen, maar ook een systeem dat beelden kan genereren.
          <br />
          <br />
          De belangrijkste verandering is daardoor niet alleen technisch. Het verandert vooral de rol van de designer. In plaats van ieder detail zelf te bepalen, ontwerpt hij de regels waarbinnen een beeld kan ontstaan.
          <br />
          <br />
          Een belangrijk voorbeeld hiervan is creative coding. Programmeren wordt hierbij gebruikt als een creatief hulpmiddel. Met tools zoals Processing en p5.js kunnen patronen, animaties, interactieve beelden en generatieve systemen worden gemaakt.
          <br />
          <br />
          Hierdoor begon ik code anders te bekijken. Het is niet alleen iets waarmee je een website of applicatie bouwt. Code kan ook een manier zijn om visuele ideeën te onderzoeken.
         </p>
        </div>
      </div>
    ),
  },

  // 11 — Page 10  (BESTAAND — linkerhelft CrossSpread-foto + "Code als taal" / "Sorting algorithms als visuele kunst".
  // De foto wordt normaal getekend door <CrossSpread> op spreadIndex 6;
  // deze versie is de fallback voor mobiel/PDF.)
  {
    id: "page-10",
    content: (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex-[3] min-h-0"
          style={{
            backgroundImage: "url('/Datadrivengrafischeobjecten.jpeg')",
            backgroundSize: "calc(200% + 16px) 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex-[2] flex flex-row gap-2 pt-2 min-h-0 overflow-hidden">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Dat werd nog duidelijker tijdens mijn onderzoek naar code poetry. Hierbij wordt de programmeercode zelf onderdeel van het kunstwerk. De code moet dus niet alleen goed werken, maar kan ook visueel of inhoudelijk betekenis krijgen.
            Daaruit kwam voor mij een belangrijk inzicht: 
            </p>          
            </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            code hoeft niet alleen het gereedschap te zijn waarmee je een ontwerp maakt. Code kan zelf ontwerpmateriaal worden.
            Ook algoritmes kunnen op die manier gebruikt worden. Sorting algorithms zijn bijvoorbeeld gemaakt om gegevens te ordenen. Wanneer je zo'n proces visueel maakt, ontstaat er
        </p>            
          </div>
        </div>
      </div>
    ),
  },

  // 12 — Page 11  (BESTAAND — rechterhelft CrossSpread-foto + "Algoritmische compositie" / "Refik Anadol en data als materiaal" / "Van afbeelding naar proces" / "De rol van de designer")
  {
    id: "page-11",
    content: (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex-[3] min-h-0"
          style={{
            backgroundImage: "url('/Datadrivengrafischeobjecten.jpeg')",
            backgroundSize: "calc(200% + 16px) 100%",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex-[2] flex flex-row gap-2 pt-2 min-h-0 overflow-hidden">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            echter een soort animatie. Je ziet de elementen stap voor stap veranderen totdat ze geordend zijn.
            Een technisch proces wordt zo een visuele compositie.
            Hetzelfde gebeurt bij algoritmische muziek. Een computer kan muzikale fragmenten selecteren en combineren volgens bepaalde regels.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            De maker bepaalt niet iedere afzonderlijke uitkomst, maar bepaalt het systeem.
             <br /><br />
             Hierdoor wordt duidelijk dat generatieve vormgeving niet pas met AI is begonnen. Het idee dat een systeem zelf resultaten kan produceren bestaat al veel langer.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 13 — Page 12  ("Mijn eigen magazine als data-driven object" + "Code als materiaal" + "Van data naar ervaring")
  {
    id: "page-12",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex-1 bg-gray-100 rounded flex items-center p-3 overflow-hidden min-h-0">
          <p className="text-[3.0cqw] text-gray-500 leading-snug">
          Bij Refik Anadol wordt dit principe op een enorme schaal toegepast. Hij gebruikt grote hoeveelheden data als artistiek materiaal. Foto's, archieven, natuurbeelden en andere gegevens worden verzameld en verwerkt met machine learning.
          Data wordt bij Anadol bijna zoals verf gebruikt door een schilder: als grondstof voor iets nieuws.
          Een belangrijk begrip hierbij is latent space. Binnen een AI-model worden relaties en overeenkomsten tussen beelden opgeslagen. De machine kan vervolgens door deze abstracte ruimte bewegen en nieuwe visuele combinaties creëren.
          Het resultaat is daardoor geen vaste afbeelding. Het is een systeem dat voortdurend nieuwe toestanden kan aannemen.
          Dat verandert ook onze kijk op het grafische object. Een poster is normaal gezien klaar wanneer hij gedrukt is. Een data-driven object hoeft geen definitieve vorm te hebben. Het kan blijven veranderen en verschillende resultaten produceren.
          
          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-center p-3 overflow-hidden min-h-0">
          <p className="text-[3.0cqw] text-gray-500 leading-snug">
          Dit roept natuurlijk ook vragen op over auteurschap. Wie heeft zo'n beeld gemaakt? De designer? De programmeur? De dataset? Het algoritme? Of de machine?
          Voor mij ligt het antwoord ergens tussen deze verschillende elementen. De designer bepaalt het kader en de regels, maar heeft niet noodzakelijk controle over ieder detail van het eindresultaat.
          Ook mijn eigen magazine sluit hierop aan. Ik ontwerp niet alleen de pagina's, maar ook het systeem erachter. JavaScript en CSS bepalen hoe de pagina's worden opgebouwd, hoe de navigatie werkt en hoe de gebruiker door het magazine beweegt.
          Mijn project is natuurlijk veel eenvoudiger dan dat van Anadol, maar het basisidee is hetzelfde: ik ontwerp niet alleen het beeld, maar ook het systeem waarbinnen het beeld functioneert.
          Data wordt zo meer dan informatie. Het kan een materiaal, input, structuur en inspiratiebron worden.
          </p>
        </div>
      </div>
    ),
  },

  // ===== 03 / GRAFIEK IN TIJD & RUIMTE (pagina 13-16) =====

  // 14 — Page 13  (thema-opener — foto-achtergrond)
  {
    id: "page-13",
    content: <ThemeOpener number="03" title="Grafiek in tijd en ruimte" image="/tijd-ruimte-bg.svg" />,
  },

  // 15 — Page 14  (intro + "Typografie die beweegt" / "Tijd als ontwerpmateriaal" + "Het magazine als tijdservaring")
  {
    id: "page-14",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/GrafiekInTijd&Ruimte1.jpeg" alt="Grafiek in tijd en ruimte 1" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            <b>Wanneer grafisch ontwerp niet meer stilstaat</b>
            <br /><br />
            Grafisch ontwerp wordt vaak gekoppeld aan het platte vlak. Een poster staat op papier, een boek op een pagina en een afbeelding op een scherm. Maar door animatie, film en digitale technologie is grafisch ontwerp steeds minder statisch geworden.
            Mijn onderzoek naar kinetic typography was hierbij een belangrijk vertrekpunt. 

            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Letters en woorden kunnen bewegen, groter worden, vervormen of verdwijnen. Tekst wordt daardoor niet alleen gelezen, maar ook ervaren als beweging.
            Een woord kan bijvoorbeeld versnellen wanneer het over snelheid gaat, of langzaam verdwijnen wanneer je een gevoel van rust wilt creëren. De beweging wordt zo een extra laag van typografie.
            De designer ontwerpt daardoor niet alleen hoe iets eruitziet, maar ook hoe het zich door de tijd gedraagt.

            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/GrafiekInTijd&Ruimte2.jpeg" alt="Grafiek in tijd en ruimte 2" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    ),
  },

  // 16 — Page 15  ("Van pagina naar ruimte" + "Machine Hallucinations als ruimtelijke grafiek" / "Tijd als ervaring" + "Ruimte verandert de betekenis" / "Van scherm naar omgeving" + "Beweging vs. interactie")
  {
    id: "page-15",
    content: (
      <div className="flex flex-col w-full h-full gap-1.5 min-h-0">
        <div className="flex gap-1.5 flex-[1] min-h-0">
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/GrafiekInTijd&Ruimte3.jpeg" alt="Grafiek in tijd en ruimte 3" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-1.5 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Dat zorgt voor een heel andere manier van kijken. Een poster heeft één vaste toestand, terwijl een animatie honderden verschillende toestanden kan hebben. De overgang tussen die toestanden wordt daardoor net zo belangrijk als de beelden zelf.
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 flex-[1.5] min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-1.5 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Dit zie ik ook terug in mijn eigen digitale magazine. Wanneer je van de ene pagina naar de andere gaat, zie je niet alleen twee afzonderlijke pagina's. Door de flip-animatie zie je de ene pagina veranderen in de andere.
            De overgang zelf wordt onderdeel van het ontwerp.
            Van daaruit kwam ik bij een tweede dimensie: ruimte.
            </p>
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/GrafiekInTijd&Ruimte4.jpeg" alt="Grafiek in tijd en ruimte 4" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex gap-1.5 flex-[1.5] min-h-0">
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/GrafiekInTijd&Ruimte5.jpeg" alt="Grafiek in tijd en ruimte 5" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-1.5 overflow-hidden min-h-0">
            <p className="text-[3.0cqw] text-gray-500 leading-snug">
            Projection mapping laat bijvoorbeeld zien hoe grafische beelden op gebouwen en andere oppervlakken kunnen worden geprojecteerd. De fysieke omgeving wordt dan onderdeel van het ontwerp.
            Het canvas is niet langer alleen een scherm of een pagina, maar een volledige ruimte.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 17 — Page 16  ("Mijn eigen magazine" + "Van grafiek naar tijd-ruimte" — conclusie)
  {
    id: "page-16",
    content: (
      <div className="flex flex-row w-full h-full gap-3">
        <div className="flex-1 bg-gray-100 rounded flex items-center p-3 overflow-hidden">
          <p className="text-[3.0cqw] text-gray-500 leading-snug">
          Bij Refik Anadol wordt dit heel duidelijk. In Machine Hallucinations worden grote oppervlakken gebruikt om data, licht, beweging en geluid samen te brengen. 
          De bezoeker kijkt niet gewoon naar een scherm, maar bevindt zich midden in de installatie.
          <br /><br />
          De beelden veranderen voortdurend. Vormen vloeien in elkaar over, kleuren verschuiven en patronen verdwijnen weer. Een afzonderlijk frame is daardoor minder belangrijk dan het proces dat eraan voorafgaat en erop volgt.
          Het beeld wordt tijdelijk.
          <br /><br />
          Dat is een groot verschil met een poster. Bij een poster kan je alles in één oogopslag zien. Bij een bewegend werk zie je altijd maar één moment van een groter geheel. Je moet wachten om te ontdekken wat er daarna gebeurt.

          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-center p-3 overflow-hidden">
          <p className="text-[3.0cqw] text-gray-500 leading-snug">
          Ook de schaal heeft invloed op de ervaring. Een klein beeld op een laptop voelt anders dan een projectie die een volledige muur vult. Hoe groter het beeld, hoe meer je eigen lichaam onderdeel wordt van de ervaring.
          <br /><br />
          Dit sluit aan bij immersive media. Hierbij gaat het niet meer alleen om naar een beeld kijken, maar om een volledige omgeving te creëren.
          <br /><br />
          De vraag verschuift daardoor van:
          “Waar plaats ik dit beeld?”
          naar:
          “Welke omgeving wil ik creëren?”
          <br /><br />
          Mijn magazine werkt op een veel kleinere schaal, maar bevat dezelfde gedachte. De gebruiker bepaalt zelf het tempo van het bladeren en kan via de navigatie verschillende routes door de inhoud nemen.
          Grafiek hoeft daardoor niet alleen iets te zijn waar je naar kijkt.
          Het kan iets zijn dat je doorloopt, ervaart en ondergaat.
          </p>
        </div>
      </div>
    ),
  },

  // ===== 04 / INTERACTIEVE INFORMATIESTRUCTUREN (pagina 17-20) =====

  // 18 — Page 17  (thema-opener — foto-achtergrond)
  {
    id: "page-17",
    content: <ThemeOpener number="04" title="Interactieve informatie structuren" image="/interactief-bg.svg" />,
  },

  // 19 — Page 18  (BESTAAND — volledige fotocollage, ongewijzigd — geen tekstvakken beschikbaar)
  {
    id: "page-18",
    content: (
      <div className="flex flex-col w-full h-full gap-2" style={{ minHeight: 0 }}>
        <div className="flex gap-2 min-h-0" style={{ flex: "2.5 2.5 0" }}>
          <div className="flex flex-col gap-2 min-h-0" style={{ flex: "2.2 2.2 0" }}>
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
            <div className="flex-1 rounded overflow-hidden min-h-0">
              <img src="/InteractieveInformatieStructuren4.jpg" alt="Interactieve Informatie Structuren 4" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 rounded overflow-hidden min-h-0">
            <img src="/InteractieveInformatieStructuren5.jpg" alt="Interactieve Informatie Structuren 5" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex gap-2 min-h-0" style={{ flex: "0.8 0.8 0" }}>
          <div className="flex-1 rounded overflow-hidden min-h-0"><img src="/InteractieveInformatieStructuren6.jpg" alt="Interactieve Informatie Structuren 6" loading="lazy" className="w-full h-full object-cover" /></div>
          <div className="flex-1 rounded overflow-hidden min-h-0"><img src="/InteractieveInformatieStructuren7.jpeg" alt="Interactieve Informatie Structuren 7" loading="lazy" className="w-full h-full object-cover" /></div>
          <div className="flex-1 rounded overflow-hidden min-h-0"><img src="/InteractieveInformatieStructuren8.jpg" alt="Interactieve Informatie Structuren 8" loading="lazy" className="w-full h-full object-cover" /></div>
          <div className="flex-1 rounded overflow-hidden min-h-0"><img src="/InteractieveInformatieStructuren9.jpg" alt="Interactieve Informatie Structuren 9" loading="lazy" className="w-full h-full object-cover" /></div>
        </div>
        <div className="flex gap-2 min-h-0" style={{ flex: "1.5 1.5 0" }}>
          <div className="rounded overflow-hidden min-h-0" style={{ flex: "1.5 1.5 0" }}>
            <img src="/InteractieveInformatieStructuren10.webp" alt="Interactieve Informatie Structuren 10" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-h-0">
            <div className="flex-1 rounded overflow-hidden min-h-0"><img src="/InteractieveInformatieStructuren11.jpeg" alt="Interactieve Informatie Structuren 11" loading="lazy" className="w-full h-full object-cover" /></div>
            <div className="flex-1 rounded overflow-hidden min-h-0"><img src="/InteractieveInformatieStructuren12.jpg" alt="Interactieve Informatie Structuren 12" loading="lazy" className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </div>
    ),
  },

  // 20 — Page 19  (intro + "Van kijker naar deelnemer" + "De interactieve sound installation" + "Interactieve kunst" / "Informatiestructuren" + "Mijn digitale magazine" + "De handtracker" + "Post-digitale interfaces" + "Anadol en de verdwijnende interface")
  {
    id: "page-19",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            <b>Van informatie bekijken naar informatie ervaren</b>
            <br /><br />
            In traditionele grafische communicatie bepaalt de ontwerper meestal hoe informatie wordt aangeboden. Een boek heeft pagina's, een infographic heeft een vaste structuur en een website heeft een bepaalde navigatie.
            <br /><br />
            Digitale media maken het mogelijk om dit veel dynamischer te maken. De gebruiker kan zelf keuzes maken, navigeren en reageren.
            

            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            Tijdens mijn onderzoek begon ik daarom na te denken over een andere vraag:
            Wat gebeurt er wanneer de gebruiker niet alleen informatie ontvangt, maar onderdeel wordt van het systeem?
            Een interactieve installatie kan bijvoorbeeld reageren op beweging, geluid, aanraking of de positie van een persoon. Hierdoor ontstaat een relatie tussen de gebruiker en het werk.
            Een interessant voorbeeld uit mijn onderzoek is de interactieve sound installation van Fleur Roggeman. 

            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            Hierbij wordt menselijke impact zichtbaar gemaakt door geluid te koppelen aan een visuele reactie. Wanneer geluid ontstaat, verschijnt een rode vorm of “bubble”.
            Een abstract idee wordt hierdoor iets wat je letterlijk kunt zien en ervaren.
            Dat vond ik interessant omdat informatie hier niet wordt uitgelegd met tekst of een grafiek. De informatie wordt een ervaring.
            Ook projecten zoals TeamLab, Rain Room, The Pool en The Treachery of Sanctuary werken met dit principe. 
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            De bezoeker is niet alleen iemand die naar het kunstwerk kijkt, maar wordt onderdeel van hoe het werk functioneert.
            Hierdoor bestaat het kunstwerk eigenlijk pas volledig wanneer iemand ermee in contact komt.
            Ook mijn eigen digitale magazine heeft een eenvoudige vorm van deze interactie. De gebruiker kan door de pagina's bladeren, maar kan ook via het menu rechtstreeks naar een bepaald thema gaan.
            De lezer bepaalt daardoor gedeeltelijk zijn eigen route.

            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 21 — Page 20  ("Van data naar atmosfeer" + "Het archief als interactieve ervaring" + "De gebruiker als onderdeel van het systeem" + "Van informatie naar ervaring" — conclusie)
  {
    id: "page-20",
    content: (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-gray-100 rounded p-4 w-[90%]">
          <p className="text-[2.9cqw] text-gray-500 leading-snug">
            Ik heb dit idee verder onderzocht met handtracking. Het doel was om pagina's niet alleen met knoppen te bedienen, maar ook met een fysieke handbeweging. Het omslaan van een digitale pagina wordt dan een lichamelijke handeling.
            <br /><br />
            De interface wordt hierdoor minder zichtbaar. Je hoeft niet meer na te denken over welke knop je moet indrukken. Je maakt gewoon een beweging met je hand en het systeem reageert daarop. De gebruiker wordt onderdeel van het systeem.
            <br /><br />
            Dit sluit aan bij het idee van een post-digitale interface. Technologie wordt minder zichtbaar en de gebruiker ervaart vooral wat er gebeurt.
            Bij Anadol is dit heel duidelijk. Machine Hallucinations heeft geen klassieke interface met knoppen of menu's. Toch is de bezoeker voortdurend onderdeel van de ervaring, door te bewegen, te kijken, te luisteren en een bepaalde positie in te nemen, verandert de manier waarop het werk wordt ervaren.
            <br /><br />
            De ruimte wordt als het ware de interface.
            Dit verandert ook hoe we naar informatie kunnen kijken. Een traditionele infographic probeert data zo duidelijk mogelijk uit te leggen. Anadol doet bijna het tegenovergestelde. Hij neemt enorme hoeveelheden data en maakt er geen eenvoudige grafiek van, maar een complexe audiovisuele omgeving.
            De data wordt niet alleen gelezen.
            Ze wordt ervaren.
            Dat is voor mij de belangrijkste conclusie van dit thema. Interactieve informatie gaat niet alleen over het tonen van informatie, maar over het ontwerpen van wat iemand ermee kan doen, ontdekken en ervaren.
            De gebruiker wordt daardoor niet meer alleen lezer of kijker, maar deelnemer.

          </p>
        </div>
      </div>
    ),
  },

  // ===== 05 / SEQUENTIËLE GRAFISCHE SYSTEMEN (pagina 21-24) =====

  // 22 — Page 21  (thema-opener — foto-achtergrond)
  {
    id: "page-21",
    content: <ThemeOpener number="05" title="Sequentiële grafische systemen" image="/sequentieel-bg.svg" />,
  },

  // 23 — Page 22  (foto + grotere quote)
  {
    id: "page-22",
    content: (
      <PhotoQuote
        src="/2021_Refik-Anadol_Machine-Hallucinations.jpg.webp"
        alt="Sequentiële Grafische Systemen 1"
        quote="Het beeld is niet het eindresultaat."
      />
    ),
  },

  // 24 — Page 23  (intro t/m "Het beeld als toestand" / "Sequentie en het magazine" t/m "De vijf thema's komen samen")
  {
    id: "page-23",
    content: (
      <div className="flex flex-col w-full h-full gap-2 min-h-0">
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            <b>Van afzonderlijke beelden naar een continu proces</b>
            <br /><br />
            Een grafisch ontwerp wordt vaak gezien als een verzameling losse beelden. Een poster is één beeld, een pagina één compositie en een illustratie heeft meestal een duidelijk eindpunt.
            Tijdens mijn onderzoek begon ik grafisch ontwerp anders te bekijken. Een ontwerp kan ook bestaan uit verschillende toestanden die elkaar opvolgen.
            Dat noemen we een sequentieel systeem.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            Een sequentie ontstaat wanneer verschillende beelden, vormen of gebeurtenissen in een bepaalde volgorde worden ervaren. Dit kan een boek zijn, maar ook een film, animatie, website of interactieve installatie.
            Hierbij is niet alleen het beeld zelf belangrijk, maar vooral wat ervoor en erna gebeurt.
            Dat werd duidelijk tijdens mijn onderzoek naar kinetic typography. Een bewegende tekst bestaat niet uit één vast beeld. 
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-2 min-h-0">
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            Letters kunnen groter worden, van plaats veranderen of verdwijnen.
            De betekenis zit daardoor niet alleen in het woord, maar ook in de verandering.
            Ook algoritmes werken sequentieel. Ze bestaan uit verschillende stappen die in een bepaalde volgorde worden uitgevoerd. Bij sorting algorithms kan je bijvoorbeeld zien hoe elementen één voor één worden verplaatst totdat ze gesorteerd zijn.
            Het eindresultaat is interessant, maar het proces ernaartoe misschien nog meer.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-center p-2 overflow-hidden min-h-0">
            <p className="text-[2.9cqw] text-gray-500 leading-snug">
            Dit principe komt ook terug in algoritmische muziek. Een computer kan verschillende muzikale fragmenten selecteren en combineren volgens bepaalde regels. De volgorde van de noten bepaalt uiteindelijk hoe de compositie klinkt.
            Hierdoor begon ik een visueel ontwerp ook meer als een proces te zien. Een vorm kan ontstaan, veranderen en vervolgens opnieuw worden gebruikt om een volgende vorm te maken.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 25 — Page 24  (foto + grotere quote — ANDERE foto dan pagina 22)
  {
    id: "page-24",
    content: (
      <PhotoQuote
        src="/GrafiekInTijd&Ruimte5.jpeg"
        alt="Sequentiële Grafische Systemen 2"
        quote="Van beeld naar systeem."
      />
    ),
  },

  // 26 — Page 25  (NIEUW — samenvatting van het magazine, uit de conclusie van teksten-themas.pdf.
  // Apart kleiner dan de rest, zelfde reden als pagina 1: één lange, doorlopende tekst zonder extra vakken.)
  {
    id: "page-25",
    content: (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-gray-100 rounded p-3 w-4/4">
          <p className="text-[2.8cqw] text-gray-500 leading-snug">
          Bij Refik Anadol wordt dit heel duidelijk.
          In Machine Hallucinations verschijnen de beelden niet als volledig afzonderlijke afbeeldingen. Ze vloeien voortdurend in elkaar over. Een vorm verandert in een andere, kleuren verschuiven en patronen groeien of verdwijnen.
          <i>Het is dus niet simpelweg:</i>
          <b>beeld 1 → beeld 2 → beeld 3 </b>
           <i>maar eerder: </i>
          <b>beeld 1 → verandering → beeld 2 → verandering → beeld 3. </b>
          De overgang is minstens zo belangrijk als het beeld zelf.
          Hierdoor ben ik een beeld gaan zien als een tijdelijke toestand. Het systeem bevindt zich even in een bepaalde vorm en verandert daarna verder.
          Ook mijn eigen magazine kan op deze manier bekeken worden.
          Een pagina is een toestand.
          De flip-animatie is de overgang.
          De volgende pagina is de nieuwe toestand:
          <b> pagina A → flip → pagina B. </b>
          Hierdoor ontwerp ik niet alleen afzonderlijke pagina's, maar ook de relaties ertussen.
          Welke kleur komt terug? Hoe verandert de typografie? Wanneer krijgt de lezer veel informatie en wanneer juist weinig? Wanneer moet een pagina rustig zijn en wanneer mag het beeld intens worden?
          Zo wordt het volledige magazine één compositie die zich stap voor stap ontvouwt.
          Een belangrijk onderdeel hiervan is ritme. Ritme bestaat niet alleen in muziek. Ook visueel kan je een bepaald tempo creëren.
          Een drukke pagina kan bijvoorbeeld gevolgd worden door een rustige pagina met veel witruimte. Een snelle animatie kan daarna overgaan in een langzaam beeld.
          Mijn onderzoek naar sound design sluit hier opnieuw op aan. Ook geluid kan versnellen, vertragen, herhalen en veranderen. Beeld en geluid kunnen daardoor samen eenzelfde ritme creëren.
          Een sequentie hoeft bovendien geen klassiek verhaal te vertellen. Bij film is de volgorde vaak bedoeld om een verhaal te tonen. Bij generatieve kunst kan de verandering veel abstracter zijn.
          Bij Anadol hoeft de bezoeker bijvoorbeeld niet te weten welk beeld eerst kwam. Het belangrijkste is dat het systeem voortdurend in beweging blijft.
          Dat bracht mij bij een van de belangrijkste inzichten uit mijn onderzoek: 
          <i> De overgang kan zelf onderdeel worden van het ontwerp. </i>
          Een vloeiende overgang kan rust geven. Een abrupte overgang kan spanning creëren. Herhaling kan ritme veroorzaken en verandering kan ontwikkeling suggereren.
          De designer ontwerpt daardoor niet alleen objecten, maar ook de relaties tussen die objecten.

          </p>
        </div>
      </div>
    ),
  },

  // 27 — BACK COVER (weer los/solo — komt pas ná pagina 25)
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
        <span className="relative z-10 text-white text-[2.4cqw] tracking-widest lowercase opacity-50">made by rvh</span>

      </div>
    ),
  },
];

// LET OP: dit is de INDEX van de laatste spread (0-14 = 15 spreads), niet het aantal.
const totalSpreads = 14;
const totalPages = pages.length - 1;

type SpreadMeta = {
  left: { pageNumber: number; theme: string } | null;
  right: { pageNumber: number; theme: string } | null;
};

// Elke spread = 2 pagina's naast elkaar (behalve de cover, de solo-intro
// en de rear cover — die staat weer helemaal los/solo, na pagina 25).
// Pagina 10/11 (Data-driven fotospread) wordt speciaal getekend door
// <CrossSpread> — zie spreadIndex === 6 verderop.
const spreadMeta: SpreadMeta[] = [
  { left: null, right: null },                                                                                             // 0 — cover
  { left: null, right: { pageNumber: 1, theme: "Introduction" } },                                                          // 1 — solo intro
  { left: { pageNumber: 2, theme: "Introduction" }, right: { pageNumber: 3, theme: "Sound Design" } },                      // 2
  { left: { pageNumber: 4, theme: "Sound Design" }, right: { pageNumber: 5, theme: "Sound Design" } },                      // 3
  { left: { pageNumber: 6, theme: "Sound Design" }, right: { pageNumber: 7, theme: "Sound Design" } },                      // 4
  { left: { pageNumber: 8, theme: "Data driven grafische objecten" }, right: { pageNumber: 9, theme: "Data driven grafische objecten" } }, // 5
  { left: { pageNumber: 10, theme: "Data driven grafische objecten" }, right: { pageNumber: 11, theme: "Data driven grafische objecten" } }, // 6 — CrossSpread
  { left: { pageNumber: 12, theme: "Data driven grafische objecten" }, right: { pageNumber: 13, theme: "Grafiek in tijd en ruimte" } },      // 7
  { left: { pageNumber: 14, theme: "Grafiek in tijd en ruimte" }, right: { pageNumber: 15, theme: "Grafiek in tijd en ruimte" } },           // 8
  { left: { pageNumber: 16, theme: "Grafiek in tijd en ruimte" }, right: { pageNumber: 17, theme: "Interactieve informatie structuren" } },  // 9
  { left: { pageNumber: 18, theme: "Interactieve informatie structuren" }, right: { pageNumber: 19, theme: "Interactieve informatie structuren" } }, // 10
  { left: { pageNumber: 20, theme: "Interactieve informatie structuren" }, right: { pageNumber: 21, theme: "Sequentiële grafische systemen" } },     // 11
  { left: { pageNumber: 22, theme: "Sequentiële grafische systemen" }, right: { pageNumber: 23, theme: "Sequentiële grafische systemen" } },         // 12
  { left: { pageNumber: 24, theme: "Sequentiële grafische systemen" }, right: { pageNumber: 25, theme: "Sequentiële grafische systemen" } },         // 13 — page-24 + page-25 (samenvatting)
  { left: { pageNumber: 26, theme: "Conculsie"}, right: { pageNumber: 27, theme: ""}},       // 14 — page-26 + page-27 (samenvatting)
  { left: null, right: null },                                                                                                                        // 15 — rear cover, solo
];

// Vul printPages voor gebruik in PrintLayout
pages.forEach((p, i) => { printPages[i] = p.content; });

/* Voettekst per verborgen PDF-bronpagina (index in de `pages`-array).
   Regel: oneven paginanummer = rechterpagina ("Thema | N"), even = linkerpagina ("N | Thema"). */
const pdfFooters: Record<number, { text: string; align: "left" | "right" }> = {
  2:  { text: "Introduction | 1",                                        align: "right" },
  3:  { text: "2 | Introduction",                                        align: "left"  },
  4:  { text: "Sound Design | 3",                                        align: "right" },
  5:  { text: "4 | Sound Design",                                        align: "left"  },
  6:  { text: "Sound Design | 5",                                        align: "right" },
  7:  { text: "6 | Sound Design",                                        align: "left"  },
  8:  { text: "Sound Design | 7",                                        align: "right" },
  9:  { text: "8 | Data driven grafische objecten",                      align: "left"  },
  10: { text: "Data driven grafische objecten | 9",                      align: "right" },
  11: { text: "10 | Data driven grafische objecten",                     align: "left"  },
  12: { text: "Data driven grafische objecten | 11",                     align: "right" },
  13: { text: "12 | Data driven grafische objecten",                     align: "left"  },
  14: { text: "Grafiek in tijd en ruimte | 13",                          align: "right" },
  15: { text: "14 | Grafiek in tijd en ruimte",                          align: "left"  },
  16: { text: "Grafiek in tijd en ruimte | 15",                          align: "right" },
  17: { text: "16 | Grafiek in tijd en ruimte",                          align: "left"  },
  18: { text: "Interactieve informatie structuren | 17",                 align: "right" },
  19: { text: "18 | Interactieve informatie structuren",                 align: "left"  },
  20: { text: "Interactieve informatie structuren | 19",                 align: "right" },
  21: { text: "20 | Interactieve informatie structuren",                 align: "left"  },
  22: { text: "Sequentiële grafische systemen | 21",                     align: "right" },
  23: { text: "22 | Sequentiële grafische systemen",                     align: "left"  },
  24: { text: "Sequentiële grafische systemen | 23",                     align: "right" },
  25: { text: "24 | Sequentiële grafische systemen",                     align: "left"  },
  26: { text: "Sequentiële grafische systemen | 25",                     align: "right" },
  27: { text: "Conclusie | 26",                                          align: "left" },
  28: { text: " | 28",                                                   align: "right" },
};

// pageMeta[i] hoort bij pages[i] (index = pageNumber + 1, door cover + inside-cover ervoor)
const pageMeta: ({ pageNumber: number; theme: string } | null)[] = [
  null, null,                                                     // cover, inside-cover
  { pageNumber: 1, theme: "Introduction" },
  { pageNumber: 2, theme: "Introduction" },
  { pageNumber: 3, theme: "Sound Design" },
  { pageNumber: 4, theme: "Sound Design" },
  { pageNumber: 5, theme: "Sound Design" },
  { pageNumber: 6, theme: "Sound Design" },
  { pageNumber: 7, theme: "Sound Design" },
  { pageNumber: 8, theme: "Data driven grafische objecten" },
  { pageNumber: 9, theme: "Data driven grafische objecten" },
  { pageNumber: 10, theme: "Data driven grafische objecten" },
  { pageNumber: 11, theme: "Data driven grafische objecten" },
  { pageNumber: 12, theme: "Data driven grafische objecten" },
  { pageNumber: 13, theme: "Grafiek in tijd en ruimte" },
  { pageNumber: 14, theme: "Grafiek in tijd en ruimte" },
  { pageNumber: 15, theme: "Grafiek in tijd en ruimte" },
  { pageNumber: 16, theme: "Grafiek in tijd en ruimte" },
  { pageNumber: 17, theme: "Interactieve informatie structuren" },
  { pageNumber: 18, theme: "Interactieve informatie structuren" },
  { pageNumber: 19, theme: "Interactieve informatie structuren" },
  { pageNumber: 20, theme: "Interactieve informatie structuren" },
  { pageNumber: 21, theme: "Sequentiële grafische systemen" },
  { pageNumber: 22, theme: "Sequentiële grafische systemen" },
  { pageNumber: 23, theme: "Sequentiële grafische systemen" },
  { pageNumber: 24, theme: "Sequentiële grafische systemen" },
  { pageNumber: 25, theme: "Sequentiële grafische systemen" },
  { pageNumber: 26, theme: "Conclusie" },
  { pageNumber: 27, theme: "" },
  null,                                                            // back-cover
];

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
      } text-[2.4cqw] tracking-widest uppercase text-gray-400 select-none`}
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
        className="relative h-full border rounded shadow bg-white overflow-hidden flex flex-col [container-type:inline-size]"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Foto — linker helft van het doorlopende beeld */}
        <div className="flex-[3] min-h-0" style={photoStyle("left")} />
        {/* Tekst onderaan */}
        <div className="flex-[2] flex flex-row gap-3 p-4 pt-3 min-h-0 overflow-hidden">
          {leftContent}
        </div>
        <PageLabel side="left" meta={metaLeft} />
      </div>

      {/* Rechterpagina */}
      <div
        className="relative h-full border rounded shadow bg-white overflow-hidden flex flex-col [container-type:inline-size]"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Foto — rechter helft van het doorlopende beeld */}
        <div className="flex-[3] min-h-0" style={photoStyle("right")} />
        {/* Tekst onderaan */}
        <div className="flex-[2] flex flex-row gap-3 p-4 pt-3 min-h-0 overflow-hidden">
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
  const pageIndexToSpread = [
    0,             // 0  cover
    1, 1,          // 1  inside-cover, page-1 (solo intro)
    2, 2,          // 3-4  page-2, page-3
    3, 3,          // 5-6  page-4, page-5
    4, 4,          // 7-8  page-6, page-7
    5, 5,          // 9-10 page-8, page-9
    6, 6,          // 11-12 page-10, page-11 (CrossSpread)
    7, 7,          // 13-14 page-12, page-13
    8, 8,          // 15-16 page-14, page-15
    9, 9,          // 17-18 page-16, page-17
    10, 10,        // 19-20 page-18, page-19
    11, 11,        // 21-22 page-20, page-21
    12, 12,        // 23-24 page-22, page-23
    13, 13,        // 25-26 page-24, page-25
    14,            // 27 back-cover
  ];
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
      case 0:  return { left: null, right: pages[0].content };                    // cover
      case 1:  return { left: pages[1].content, right: pages[2].content };        // inside-cover + page-1
      case 2:  return { left: pages[3].content, right: pages[4].content };        // page-2, page-3
      case 3:  return { left: pages[5].content, right: pages[6].content };        // page-4, page-5
      case 4:  return { left: pages[7].content, right: pages[8].content };        // page-6, page-7
      case 5:  return { left: pages[9].content, right: pages[10].content };       // page-8, page-9
      case 6:  return { left: pages[11].content, right: pages[12].content };      // page-10, page-11 (CrossSpread)
      case 7:  return { left: pages[13].content, right: pages[14].content };      // page-12, page-13
      case 8:  return { left: pages[15].content, right: pages[16].content };      // page-14, page-15
      case 9:  return { left: pages[17].content, right: pages[18].content };      // page-16, page-17
      case 10: return { left: pages[19].content, right: pages[20].content };      // page-18, page-19
      case 11: return { left: pages[21].content, right: pages[22].content };      // page-20, page-21
      case 12: return { left: pages[23].content, right: pages[24].content };      // page-22, page-23
      case 13: return { left: pages[25].content, right: pages[26].content };      // page-24, page-25
      case 14: return { left: pages[27].content, right: null };                   // back-cover
      default: return { left: null, right: null };
    }
  };

  const { left, right } = getSpread();
  const currentMeta = spreadMeta[spreadIndex];

  const mobilePage = pages[mobilePageIndex];
  const mobileIsCover = mobilePageIndex === 0;
  const mobileIsBackCover = mobilePageIndex === totalPages;

  // Debug/nav-labels per spread (15 spreads, zelfde volgorde als spreadMeta)
  const spreadLabels = [
    "Cover",
    "Inside / 1",
    "2 / 3",
    "4 / 5",
    "6 / 7",
    "8 / 9",
    "10 / 11",
    "12 / 13",
    "14 / 15",
    "16 / 17",
    "18 / 19",
    "20 / 21",
    "22 / 23",
    "24 / 25",
    "26 / 27",
    "Rear",
  ];

  /* Tekstblokken voor spread 10/11 (spreadIndex 6, de Data-driven fotospread)
     — links en rechts apart doorgeven aan <CrossSpread>. Zelfde tekst als
     pages[11]/pages[12].content hierboven (bewust gesynchroniseerd, zie
     projectnotities over spread-content-mismatch). */
  const spread1011LeftContent = (
    <>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
        <p className="text-[3.0cqw] text-gray-500 leading-snug">
        Dat werd nog duidelijker tijdens mijn onderzoek naar code poetry. Hierbij wordt de programmeercode zelf onderdeel van het kunstwerk. De code moet dus niet alleen goed werken, maar kan ook visueel of inhoudelijk betekenis krijgen.
        Daaruit kwam voor mij een belangrijk inzicht: 
        </p>
      </div>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
        <p className="text-[3.0cqw] text-gray-500 leading-snug">
        code hoeft niet alleen het gereedschap te zijn waarmee je een ontwerp maakt. Code kan zelf ontwerpmateriaal worden.
        Ook algoritmes kunnen op die manier gebruikt worden. Sorting algorithms zijn bijvoorbeeld gemaakt om gegevens te ordenen. Wanneer je zo'n proces visueel maakt, ontstaat er
        </p>
      </div>
    </>
  );

  const spread1011RightContent = (
    <>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
        <p className="text-[3.0cqw] text-gray-500 leading-snug">
        echter een soort animatie. Je ziet de elementen stap voor stap veranderen totdat ze geordend zijn.
        Een technisch proces wordt zo een visuele compositie.
        Hetzelfde gebeurt bij algoritmische muziek. Een computer kan muzikale fragmenten selecteren en combineren volgens bepaalde regels. 
        </p>
      </div>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden min-h-0">
        <p className="text-[3.0cqw] text-gray-500 leading-snug">
        De maker bepaalt niet iedere afzonderlijke uitkomst, maar bepaalt het systeem.
        <br /><br />
        Hierdoor wordt duidelijk dat generatieve vormgeving niet pas met AI is begonnen. Het idee dat een systeem zelf resultaten kan produceren bestaat al veel langer.
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

      // Elk paar = twee `pages`-array-indices die samen één PDF-spread vormen.
      // Zelfde volgorde/logica als spreadMeta hierboven, maar dan als
      // array-index i.p.v. paginanummer (index = pageNumber + 1).
      const spreadDefs: [number | null, number | null][] = [
        [null, 0],   // cover
        [1,    2],   // inside-cover + page-1
        [3,    4],   // page-2, page-3
        [5,    6],   // page-4, page-5
        [7,    8],   // page-6, page-7
        [9,    10],  // page-8, page-9
        [11,   12],  // page-10, page-11
        [13,   14],  // page-12, page-13
        [15,   16],  // page-14, page-15
        [17,   18],  // page-16, page-17
        [19,   20],  // page-18, page-19
        [21,   22],  // page-20, page-21
        [23,   24],  // page-22, page-23
        [25,   26],  // page-24, page-25
        [27,   null],// back-cover
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
      pdf.save("HALLUCINATE.pdf");
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
        className={isFullscreen ? "w-full max-w-[95vw] mx-auto px-4" : "w-full max-w-5xl mx-auto px-2 sm:px-4"}
        style={{ height: isFullscreen ? "88vh" : "62vh" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* DESKTOP — spread view */}
        {spreadIndex === 6 ? (
          /* Spread 10/11 — foto bovenaan over volledige breedte, tekst eronder */
          <CrossSpread
            leftContent={spread1011LeftContent}
            rightContent={spread1011RightContent}
            metaLeft={currentMeta.left}
            metaRight={currentMeta.right}
          />
        ) : (
          <div className="hidden md:flex gap-4 w-full h-full justify-center">
            {!isCover && (
              <div className="relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden p-6 pb-5 [container-type:inline-size]">
                {left}
                <PageLabel side="left" meta={currentMeta.left} />
              </div>
            )}
            {!isBackCover && (
              <div
                className={`relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden [container-type:inline-size] ${
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
            className={`relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden [container-type:inline-size] ${
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

