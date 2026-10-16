import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
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
      text: 'Handgemachter Teig, 48 bis 96 Stunden gereift, Zutaten aus Süditalien und ein Holzofen bei 450°.\n\nHauptstrasse 44\n2325 Himberg bei Wien\n\nJetzt bestellen: littlenapoliat@gmail.com',
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
      text: 'Wir freuen uns auf euch.\n\nHauptstrasse 44\n2325 Himberg bei Wien\n\nJetzt bestellen: littlenapoliat@gmail.com\n\nwww.littlenapoli.at',
    },
  },
];

type Face = Page | 'cover' | 'end' | 'blank';

interface Leaf {
  front: Face;
  back: Face;
}

const FLIP_MS = 1050;
const ALL_PAGES: Page[] = spreads.flatMap((s) => [s.left, s.right]);

const CHIPS: { label: string; match: string }[] = [
  { label: 'Classiche', match: 'Classiche' },
  { label: 'Speciali', match: 'Speciali' },
  { label: 'Pizze Gialle', match: 'Pizze Gialle' },
  { label: 'Calzone', match: '& Calzone' },
  { label: 'Insalata', match: 'Insalata' },
  { label: 'Antipasti', match: 'Antipasti' },
  { label: 'Pasta', match: 'Pasta' },
  { label: 'Dolce', match: 'Dolce' },
  { label: 'Da Bere', match: 'Da Bere' },
  { label: 'Allergene', match: 'Allergene' },
];

const chipPage = (match: string) =>
  ALL_PAGES.findIndex((p) => p.type !== 'intro' && (p.heading === match || p.sub === match));

function buildLeaves(single: boolean): Leaf[] {
  if (single) {
    return [
      { front: 'cover', back: 'blank' },
      ...ALL_PAGES.map((p): Leaf => ({ front: p, back: 'blank' })),
    ];
  }
  const half = ALL_PAGES.length / 2;
  const leaves: Leaf[] = [];
  for (let j = 0; j <= half; j++) {
    leaves.push({
      front: j === 0 ? 'cover' : ALL_PAGES[2 * j - 1],
      back: j === half ? 'end' : ALL_PAGES[2 * j],
    });
  }
  return leaves;
}

function renderLine(line: string, key: number) {
  const m = line.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  if (!m) return <span key={key}>{line}<br /></span>;
  const [before, after] = line.split(m[0]);
  return (
    <span key={key}>
      {before}
      <a href={`mailto:${m[0]}`} onClick={(e) => e.stopPropagation()}>{m[0]}</a>
      {after}
      <br />
    </span>
  );
}

function PageContent({ page }: { page: Page }) {
  if (page.type === 'intro') {
    return (
      <div className="menubook-intro">
        <span className="menubook-page-kicker">{page.sub}</span>
        <h3 className="menubook-intro-title">{page.heading}</h3>
        {page.text.split('\n\n').map((para, i) => (
          <p key={i}>{para.split('\n').map((line, j) => renderLine(line, j))}</p>
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

function FaceView({ face, side, active }: { face: Face; side: 'front' | 'back'; active: boolean }) {
  const cls = `mb-face mb-${side}${active ? ' is-active' : ''}`;
  if (face === 'cover') {
    return (
      <div className={`${cls} mb-cover`}>
        <div className="mb-cover-frame" />
        <span className="mb-cover-emblem">III</span>
        <span className="mb-cover-title">La Carta</span>
        <span className="mb-cover-brand">Little Napoli</span>
        <span className="mb-cover-sub">L'autentica pizza napoletana</span>
        <span className="mb-cover-hint">Zum Öffnen klicken</span>
      </div>
    );
  }
  if (face === 'end') {
    return (
      <div className={`${cls} mb-cover mb-cover-back`}>
        <div className="mb-cover-frame" />
        <span className="mb-cover-emblem">III</span>
        <span className="mb-cover-sub">Pizza fatta bene · Vita fatta meglio</span>
      </div>
    );
  }
  if (face === 'blank') return <div className={`${cls} mb-blank`} />;
  return (
    <div className={cls}>
      <PageContent page={face} />
    </div>
  );
}

export default function MenuBook({ pdfHref }: { pdfHref: string }) {
  const [single, setSingle] = useState(false);
  const [flipped, setFlipped] = useState(0);
  const [turning, setTurning] = useState<Record<number, boolean>>({});
  const bookRef = useRef<HTMLDivElement | null>(null);
  const autoOpened = useRef(false);
  const timers = useRef<number[]>([]);
  const flippedRef = useRef(0);
  const touchX = useRef<number | null>(null);

  const leaves = buildLeaves(single);
  const maxFlip = single ? leaves.length - 1 : leaves.length;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setSingle(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setFlipped(0);
    flippedRef.current = 0;
    setTurning({});
    autoOpened.current = false;
  }, [single]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const turnLeaf = (index: number) => {
    setTurning((t) => ({ ...t, [index]: true }));
    const t = window.setTimeout(() => {
      setTurning((cur) => {
        const next = { ...cur };
        delete next[index];
        return next;
      });
    }, FLIP_MS + 60);
    timers.current.push(t);
  };

  const flipTo = (target: number) => {
    const goal = Math.max(0, Math.min(maxFlip, target));
    const from = flippedRef.current;
    if (goal === from) return;
    const dir = goal > from ? 1 : -1;
    const steps = Math.abs(goal - from);
    const gap = steps > 1 ? Math.max(90, Math.min(190, 900 / steps)) : 0;
    for (let i = 0; i < steps; i++) {
      const t = window.setTimeout(() => {
        const cur = flippedRef.current;
        const leafIndex = dir === 1 ? cur : cur - 1;
        turnLeaf(leafIndex);
        flippedRef.current = cur + dir;
        setFlipped(cur + dir);
      }, i * gap);
      timers.current.push(t);
    }
  };

  const next = () => flipTo(flippedRef.current + 1);
  const prev = () => flipTo(flippedRef.current - 1);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !autoOpened.current && flippedRef.current === 0) {
          autoOpened.current = true;
          const t = window.setTimeout(() => flipTo(1), reduce ? 0 : 900);
          timers.current.push(t);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single]);

  const pageToFlip = (k: number) => (single ? k + 1 : Math.floor(k / 2) + 1);
  const currentPageIndex = single ? flipped - 1 : (flipped - 1) * 2;
  const activeChip = CHIPS.reduce((acc, chip, idx) => {
    const p = chipPage(chip.match);
    return p >= 0 && p <= Math.max(0, single ? currentPageIndex : currentPageIndex + 1) && flipped > 0 ? idx : acc;
  }, -1);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const shift = single ? 0 : flipped === 0 ? -25 : flipped === maxFlip ? 25 : 0;

  const counter = (() => {
    if (flipped === 0) return 'Umschlag';
    if (single) return `Seite ${flipped} / ${ALL_PAGES.length}`;
    if (flipped >= maxFlip) return 'Ende';
    return `Seite ${flipped * 2 - 1}–${flipped * 2} / ${ALL_PAGES.length}`;
  })();

  return (
    <div className="mb-stage" tabIndex={0} onKeyDown={onKey} aria-label="Digitale Speisekarte zum Blättern">
      <div className="mb-glow" aria-hidden="true" />
      <div
        ref={bookRef}
        className={`mb-book${single ? ' is-single' : ''}${flipped === 0 ? ' is-closed' : ''}`}
        style={{ transform: `translateX(${shift}%)` }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
        }}
      >
        {!single && <div className="mb-spine" aria-hidden="true" />}
        {leaves.map((leaf, i) => {
          const isFlipped = flipped > i;
          const z = turning[i] ? 200 + (leaves.length - i) : isFlipped ? i + 1 : leaves.length - i;
          const frontActive = !isFlipped && flipped === i;
          const backActive = !single && isFlipped && flipped === i + 1;
          return (
            <div
              key={i}
              className={`mb-leaf${isFlipped ? ' is-flipped' : ''}${turning[i] ? ' is-turning' : ''}`}
              style={{ zIndex: z }}
              onClick={() => (isFlipped ? prev() : next())}
            >
              <FaceView face={leaf.front} side="front" active={frontActive} />
              <FaceView face={leaf.back} side="back" active={backActive} />
            </div>
          );
        })}
      </div>

      <div className="mb-chips" role="tablist" aria-label="Kategorien">
        {CHIPS.map((chip, idx) => (
          <button
            key={chip.label}
            className={idx === activeChip ? 'active' : ''}
            onClick={() => flipTo(pageToFlip(chipPage(chip.match)))}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="mb-controls">
        <button onClick={prev} disabled={flipped === 0} aria-label="Vorherige Seite"><ChevronLeft size={18} /></button>
        <span className="mb-counter">{counter}</span>
        <button onClick={next} disabled={flipped >= maxFlip} aria-label="Nächste Seite"><ChevronRight size={18} /></button>
        <a className="mb-pdf" href={pdfHref} target="_blank" rel="noreferrer"><Download size={15} /> PDF</a>
      </div>
    </div>
  );
}
