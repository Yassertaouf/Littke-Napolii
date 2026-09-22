import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import AllergenBadges, { ALLERGEN_LEGEND } from '@/components/AllergenBadges';

interface MenuBookProps {
  isOpen: boolean;
  onClose: () => void;
  pdfHref: string;
}

interface MenuLine {
  name: string;
  desc: string;
  price: string;
  allergens?: string[];
}

interface ItemsPage {
  type: 'items';
  heading: string;
  sub: string;
  items: MenuLine[];
}

interface IntroPage {
  type: 'intro';
  heading: string;
  sub: string;
  text: string;
}

interface LegendPage {
  type: 'legend';
  heading: string;
  sub: string;
}

type Page = ItemsPage | IntroPage | LegendPage;

interface Spread {
  left: Page;
  right: Page;
}

const spreads: Spread[] = [
  {
    left: {
      type: 'intro',
      heading: 'Little Napoli',
      sub: "L'autentica pizza napoletana",
      text: 'Handgemachter Teig, 48 bis 96 Stunden gereift, Zutaten aus Süditalien und ein Holzofen bei 450°.\n\nHauptstrasse 44\n2325 Himberg bei Wien\n\nJetzt bestellen: 02235 42733',
    },
    right: {
      type: 'items',
      heading: 'La Pizza',
      sub: 'Classiche',
      items: [
        { name: 'Marinara', desc: 'San Marzano Tomatensauce, Oregano, Knoblauch, Basilikum', price: '8,50 €', allergens: ['A'] },
        { name: 'Regina Margherita', desc: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, Basilikum', price: '9,90 €', allergens: ['A', 'G'] },
        { name: 'Cotto', desc: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, Prosciutto Cotto, Basilikum', price: '13,90 €', allergens: ['A', 'G'] },
        { name: 'Salame', desc: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, Salami aus Neapel, Basilikum', price: '13,90 €', allergens: ['A', 'G'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'La Pizza',
      sub: 'Classiche',
      items: [
        { name: 'Diabola 2.0', desc: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, scharfe Salami, Jalapeño-Creme, Basilikum', price: '14,30 €', allergens: ['A', 'G'] },
        { name: 'Bufala', desc: 'San Marzano Tomatensauce, Büffelmozzarella aus Neapel D.O.P., Basilikum', price: '13,90 €', allergens: ['A', 'G'] },
        { name: 'Vegetariana', desc: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, frisches Grillgemüse, Basilikum', price: '14,60 €', allergens: ['A', 'G'] },
      ],
    },
    right: {
      type: 'items',
      heading: 'La Pizza',
      sub: 'Speciali',
      items: [
        { name: 'Testa Rossa', desc: 'San Marzano Tomatensauce, marinierte Sardellenfilets, Kapern, Oliven, halbgetrocknete Tomaten, Basilikum', price: '14,70 €', allergens: ['A', 'D', 'O'] },
        { name: '4 Stagioni', desc: 'San Marzano Tomatensauce, Fior di Latte, Prosciutto Cotto, Salami aus Neapel, Artischocken, Oliven, Champignons, Basilikum', price: '14,90 €', allergens: ['A', 'G'] },
        { name: 'Red Passion', desc: 'Fior di Latte, Rucola, Prosciutto Crudo San Daniele 24 Monate D.O.P., marinierte Kirschtomaten, Grana Padano 24 Monate D.O.P.', price: '15,50 €', allergens: ['A', 'G'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'La Pizza',
      sub: 'Speciali',
      items: [
        { name: 'Tropea', desc: 'Fior di Latte, karamellisierte rote Zwiebel, Oliven, Thunfisch, Basilikum', price: '13,50 €', allergens: ['A', 'D', 'G'] },
        { name: 'Secret Love', desc: 'Fior di Latte, getrocknete Tomaten, marinierte Kirschtomaten, ligurisches Pesto', price: '14,60 €', allergens: ['A', 'G'] },
        { name: 'Bresaola Valtellinese', desc: 'Fior di Latte, Rucola, marinierte Kirschtomaten, Bresaola Valtellinese', price: '16,90 €', allergens: ['A', 'G'] },
      ],
    },
    right: {
      type: 'items',
      heading: 'Pizze Gialle',
      sub: 'Mit Datteltomate',
      items: [
        { name: 'Yellow Marinara', desc: 'Gelbe Datteltomatensauce, Oregano, Knoblauch, Basilikum', price: '8,50 €', allergens: ['A'] },
        { name: 'Yellow Bufala', desc: 'Gelbe Datteltomatensauce, Büffelmozzarella D.O.P., marinierte Kirschtomaten, Basilikum-Pesto', price: '14,90 €', allergens: ['A', 'G'] },
        { name: 'Mediterranea', desc: 'Gelbe Datteltomatensauce, Fior di Latte, karamellisierte rote Zwiebel, halbgetrocknete Tomaten, Thunfisch, Oregano', price: '14,80 €', allergens: ['A', 'D', 'G'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'Pizze Gialle',
      sub: 'Mit Datteltomate',
      items: [
        { name: 'Testa Gialla', desc: 'Gelbe Datteltomatensauce, Knoblauch, Kapern, Oliven, Sardellen, marinierte Kirschtomaten, Basilikum', price: '14,70 €', allergens: ['A', 'D'] },
        { name: 'Super Parmigiana', desc: 'Gelbe Datteltomatensauce, Fior di Latte, gegrillte Melanzani, Grana Padano 24 Monate D.O.P., Basilikum', price: '14,60 €', allergens: ['A', 'G'] },
        { name: 'Yellow Margherita', desc: 'Gelbe Datteltomatensauce, Fior di Latte aus Sorrento, Basilikum', price: '10,50 €', allergens: ['A', 'G'] },
      ],
    },
    right: {
      type: 'items',
      heading: 'Senza Pomodoro',
      sub: '& Calzone',
      items: [
        { name: '4 Formaggi', desc: 'Fior di Latte, Grana Padano 24 Monate D.O.P., Gorgonzola Dolce D.O.P., Ricotta, roter Pfeffer', price: '14,60 €', allergens: ['A', 'G'] },
        { name: 'Sophia Loren', desc: 'Fior di Latte, Pistazienmortadella, Pistazien, Pistaziencreme, Basilikum', price: '16,60 €', allergens: ['A', 'G', 'H'] },
        { name: 'Vaticano (Calzone)', desc: 'San Marzano Tomatensauce, Fior di Latte, Prosciutto Cotto, Salame, Champignons, Basilikum', price: '14,90 €', allergens: ['A', 'G'] },
        { name: 'Emotion (Calzone)', desc: 'Gelbe Datteltomatensauce, Fior di Latte, Pistazienmortadella', price: '15,80 €', allergens: ['A', 'G', 'H'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'Insalata',
      sub: 'Frisch & leicht',
      items: [
        { name: 'Rucola', desc: 'Rucola, marinierte Kirschtomaten, Grana Padano 24 Monate D.O.P.', price: '8,90 €', allergens: ['G'] },
        { name: 'Pinna Gialla', desc: 'Thunfisch, Zwiebel, marinierte Kirschtomaten, Oliven, Olivenöl', price: '10,90 €', allergens: ['D'] },
        { name: 'Insalata Verde', desc: 'Blattsalat, Olivenöl', price: '4,80 €' },
      ],
    },
    right: {
      type: 'items',
      heading: 'Antipasti',
      sub: 'Zum Teilen',
      items: [
        { name: 'Focaccia Knoblauch', desc: 'Hausgemachte Focaccia mit Knoblauch', price: '5,50 €', allergens: ['A'] },
        { name: 'Focaccia Pesto', desc: 'Hausgemachte Focaccia mit Pesto', price: '5,50 €', allergens: ['A'] },
        { name: 'Focaccia Chili', desc: 'Hausgemachte Focaccia mit Chili', price: '5,50 €', allergens: ['A'] },
        { name: 'Caprese di Bufala', desc: 'Rucola, marinierte Kirschtomaten (rot-gelb), Büffelmozzarella', price: '13,50 €', allergens: ['G'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'Pasta',
      sub: 'Fatta con amore',
      items: [
        { name: 'Spaghetti Pomodoro', desc: '350g · Tomatensauce, Grana Padano, Basilikum', price: '9,90 €', allergens: ['A', 'L'] },
        { name: 'Tagliatelle Ragù Bolognese', desc: '300g · Ragù Bolognese gemischt, Grana Padano, Basilikum', price: '12,50 €', allergens: ['A', 'C', 'G', 'L'] },
        { name: 'Garganelli al Salmone', desc: '300g · Räucherlachs, getrocknete Tomaten, Basilikum', price: '12,90 €', allergens: ['A', 'C', 'D', 'G'] },
      ],
    },
    right: {
      type: 'items',
      heading: 'Pasta',
      sub: 'Fatta con amore',
      items: [
        { name: 'Raviolo Pomodoro Datterino', desc: '350g · mit Ricotta gefüllte Ravioli, Datteltomatensauce, Basilikum, Grana Padano', price: '12,50 €', allergens: ['A', 'C', 'G'] },
        { name: 'Penne Arrabbiata', desc: '350g · scharfe Tomatensauce, Grana Padano, Basilikum', price: '11,50 €', allergens: ['A'] },
        { name: 'Gnocchi Pomodoro e Mozzarella', desc: '350g · Tomatensauce, Mozzarella, Grana Padano, Basilikum', price: '12,30 €', allergens: ['A', 'G'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'Pasta',
      sub: 'Fatta con amore',
      items: [
        { name: 'Strozzapreti', desc: '300g · Steinpilzsauce mit Speck, Grana Padano, Basilikum', price: '13,30 €', allergens: ['A', 'C', 'F', 'G'] },
        { name: 'Gramigna Panna Salsiccia', desc: '350g · Obersauce mit Salsiccia-Wurst, Grana Padano, Basilikum', price: '13,50 €', allergens: ['A', 'C', 'G'] },
        { name: 'Lasagne Caserecce', desc: '500g · Ragù Bolognese gemischt', price: '13,90 €', allergens: ['A', 'C', 'G', 'L'] },
      ],
    },
    right: {
      type: 'items',
      heading: 'Dolce',
      sub: 'Il gran finale',
      items: [
        { name: 'Dolce Vita', desc: 'Süße Pizza mit Nutella und frischen Früchten · für 2 Personen', price: '12,90 €', allergens: ['A', 'F', 'G', 'H'] },
        { name: 'Roccia', desc: 'Süße Pizza mit Pistaziencreme, Ferrero Rocher und frischen Früchten · für 2 Personen', price: '13,90 €', allergens: ['A', 'F', 'G', 'H'] },
        { name: 'Hausgemachtes Tiramisu', desc: 'Ohne Alkohol', price: '6,50 €', allergens: ['A', 'G'] },
        { name: 'Pistazienprofiterol', desc: 'Hausgemacht', price: '6,50 €', allergens: ['A', 'C', 'G', 'H'] },
      ],
    },
  },
  {
    left: {
      type: 'items',
      heading: 'Da Bere',
      sub: 'Acqua & Limonaden',
      items: [
        { name: 'Acqua Naturale', desc: 'San Benedetto, 0,5 L', price: '4,50 €' },
        { name: 'Acqua Frizzante', desc: 'San Benedetto, 0,5 L', price: '4,50 €' },
        { name: 'Fritz-Kola', desc: 'Klassisch', price: '4,50 €' },
        { name: 'Fritz-Kola Super Zero', desc: 'Ohne Zucker', price: '2,20 €' },
        { name: 'Fritz-Kola Bio Apfelschorle', desc: '', price: '2,20 €' },
        { name: 'Fritz-Kola Bio Traubenschorle', desc: '', price: '3,70 €' },
      ],
    },
    right: {
      type: 'items',
      heading: 'Da Bere',
      sub: 'Eistee & Bier',
      items: [
        { name: 'Estathé Pesca', desc: 'Eistee Pfirsich', price: '3,70 €' },
        { name: 'Estathé Limone', desc: 'Eistee Zitrone', price: '3,70 €' },
        { name: 'Ichnusa non-filtrata', desc: 'Italienisches Spezial-Bier, 0,33 L', price: '3,70 €' },
        { name: 'Moretti', desc: 'Italienisches Bier, 0,33 L', price: '3,50 €' },
        { name: 'Messina Cristalli di Sale', desc: 'Italienisches Bier, 0,33 L', price: '3,50 €' },
      ],
    },
  },
  {
    left: {
      type: 'legend',
      heading: 'Allergene',
      sub: 'Gut zu wissen',
    },
    right: {
      type: 'intro',
      heading: 'Grazie!',
      sub: 'A presto',
      text: 'Wir freuen uns auf euch.\n\nHauptstrasse 44\n2325 Himberg bei Wien\n\nJetzt bestellen: 02235 42733\n\nwww.littlenapoli.at',
    },
  },
];

function PageContent({ page }: { page: Page }) {
  if (page.type === 'intro') {
    return (
      <div className="menubook-intro">
        <span className="menubook-page-kicker">{page.sub}</span>
        <h3 className="menubook-intro-title">{page.heading}</h3>
        {page.text.split('\n\n').map((para, i) => (
          <p key={i}>{para.split('\n').map((line, j) => (
            <span key={j}>{line}<br /></span>
          ))}</p>
        ))}
      </div>
    );
  }
  if (page.type === 'legend') {
    return (
      <div className="menubook-items menubook-legend">
        <span className="menubook-page-kicker">{page.sub}</span>
        <h3 className="menubook-page-title">{page.heading}</h3>
        <ul className="menubook-legend-list">
          {ALLERGEN_LEGEND.map(([code, label]) => (
            <li key={code}>
              <AllergenBadges codes={[code]} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="menubook-items">
      <span className="menubook-page-kicker">{page.heading}</span>
      <h3 className="menubook-page-title">{page.sub}</h3>
      <ul>
        {page.items.map((item) => (
          <li key={item.name}>
            <div className="menubook-item-head">
              <span className="menubook-item-name">{item.name}</span>
              <AllergenBadges codes={item.allergens} size="sm" />
              <span className="menubook-item-dots" />
              <span className="menubook-item-price">{item.price}</span>
            </div>
            {item.desc && <p className="menubook-item-desc">{item.desc}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

const FLIP_DURATION = 560;

export default function MenuBook({ isOpen, onClose, pdfHref }: MenuBookProps) {
  const [render, setRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<{ spread: Spread; dir: 'next' | 'prev'; index: number } | null>(null);
  const flipTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setSpreadIndex(0);
      setOutgoing(null);
      const t = window.setTimeout(() => setAnimateIn(true), 30);
      return () => window.clearTimeout(t);
    }
    setAnimateIn(false);
    const t = window.setTimeout(() => setRender(false), 650);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  const goTo = (nextIndex: number, dir: 'next' | 'prev') => {
    if (outgoing) return;
    if (nextIndex < 0 || nextIndex > spreads.length - 1) return;
    setOutgoing({ spread: spreads[spreadIndex], dir, index: spreadIndex });
    setSpreadIndex(nextIndex);
    if (flipTimeout.current) window.clearTimeout(flipTimeout.current);
    flipTimeout.current = window.setTimeout(() => setOutgoing(null), FLIP_DURATION);
  };

  useEffect(() => {
    if (!render) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(spreadIndex + 1, 'next');
      if (e.key === 'ArrowLeft') goTo(spreadIndex - 1, 'prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, onClose, spreadIndex, outgoing]);

  useEffect(() => () => { if (flipTimeout.current) window.clearTimeout(flipTimeout.current); }, []);

  if (!render) return null;

  const spread = spreads[spreadIndex];

  return (
    <div className={animateIn ? 'menubook-overlay is-visible' : 'menubook-overlay'}>
      <button className="menubook-backdrop" onClick={onClose} aria-label="Menü schließen" />
      <div className="menubook-stage">
        <a className="menubook-download" href={pdfHref} target="_blank" rel="noreferrer"><Download size={16} /> PDF</a>
        <button className="menubook-close" onClick={onClose} aria-label="Schließen"><X size={20} /></button>
        <div className={animateIn ? 'menubook is-open' : 'menubook'}>
          <div className="menubook-pages">
            <div className="menubook-page left">
              <PageContent page={spread.left} />
              <span className="menubook-page-number">{spreadIndex * 2 + 1}</span>
            </div>
            <div className="menubook-page right">
              <PageContent page={spread.right} />
              <span className="menubook-page-number">{spreadIndex * 2 + 2}</span>
            </div>
          </div>
          {outgoing && (
            <div className={`menubook-pages menubook-pages-flip flip-${outgoing.dir}`} aria-hidden="true">
              <div className="menubook-page left">
                <PageContent page={outgoing.spread.left} />
                <span className="menubook-page-number">{outgoing.index * 2 + 1}</span>
              </div>
              <div className="menubook-page right">
                <PageContent page={outgoing.spread.right} />
                <span className="menubook-page-number">{outgoing.index * 2 + 2}</span>
              </div>
            </div>
          )}
          <div className="menubook-cover">
            <div className="menubook-cover-emblem">III</div>
            <span className="menubook-cover-title">Menu Book</span>
            <span className="menubook-cover-sub">L'autentica pizza napoletana</span>
          </div>
        </div>
        <div className="menubook-controls">
          <button onClick={() => goTo(spreadIndex - 1, 'prev')} disabled={spreadIndex === 0 || !!outgoing} aria-label="Vorherige Seite">
            <ChevronLeft size={18} />
          </button>
          <div className="menubook-dots">
            {spreads.map((_, index) => (
              <span key={index} className={index === spreadIndex ? 'active' : ''} />
            ))}
          </div>
          <button onClick={() => goTo(spreadIndex + 1, 'next')} disabled={spreadIndex === spreads.length - 1 || !!outgoing} aria-label="Nächste Seite">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
