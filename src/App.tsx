import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  FileText,
  Clock3,
  Flame,
  Instagram,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Quote,
  Star,
  X,
} from 'lucide-react';
import MenuBook from '@/components/MenuBook';
import OpeningHours from '@/components/OpeningHours';
import AllergenBadges from '@/components/AllergenBadges';
import { DoodleField, MenuCategoryIcon, KickerIcon } from '@/components/ItalianDoodles';

const heroImages = [
  { src: '/images/pizza-cutout-1.png', label: 'Pesto & Burrata' },
  { src: '/images/pizza-cutout-2.png', label: 'Margherita al Pesto' },
  { src: '/images/pizza-cutout-3.png', label: 'Prosciutto & Rucola' },
  { src: '/images/pizza-cutout-4.png', label: 'Burrata Dorata' },
];

const menuItems = [
  { name: 'Regina Margherita', description: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, Basilikum', price: '9,90 €', category: 'klassiker', allergens: ['A', 'G'], image: '/images/real-pizza-3.jpg' },
  { name: 'Diabola 2.0', description: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, scharfe Salami, Jalapeño-Creme, Basilikum', price: '14,30 €', category: 'signaturen', allergens: ['A', 'G'], image: '/images/real-pizza-4.jpg' },
  { name: 'Sophia Loren', description: 'Fior di Latte aus Sorrento, Pistazienmortadella, Pistazien, Pistaziencreme, Basilikum', price: '16,60 €', category: 'signaturen', allergens: ['A', 'G', 'H'], image: '/images/real-pizza-1.jpg' },
  { name: 'Vegetariana', description: 'San Marzano Tomatensauce, Fior di Latte aus Sorrento, frisches Grillgemüse, Basilikum', price: '14,60 €', category: 'vegetarisch', allergens: ['A', 'G'], image: '/images/real-pizza-2.jpg' },
];

const menuPdfHref = 'https://littlenapoli.at/wp-content/uploads/2026/01/little-napoli-2026-web.pdf';

const galleryImages = ['/images/pizza-photo-1.jpg', '/images/pizza-photo-2.jpg', '/images/pizza-photo-5.jpg'];
const phoneNumber = '+43 2235 42733';
const phoneHref = 'tel:+43223542733';
const logoSrc = '/images/logo.png';
const instagramHref = 'https://www.instagram.com/little_napoli_pizzeria';
const mapsDirectionsHref = 'https://www.google.com/maps/place/Little+Napoli+Pizzeria+%26+Feinkost/@48.082986,16.4369179,17z/data=!4m6!3m5!1s0x476dad9d0f184225:0xb93fa8159718ff1c!8m2!3d48.0830058!4d16.4393005!16s%2Fg%2F11wfsd0c3y';

function App() {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isMenuBookOpen, setMenuBookOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const visibleItems = activeCategory === 'Alle'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory.toLowerCase());

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <span className="live-dot" />
        <span className="announcement-brand">Little Napoli</span>
        <span className="announcement-detail"> · Pizzeria &amp; Feinkost · Himberg bei Wien</span>
        <span className="announcement-separator">·</span>
        <a href={phoneHref}><Phone size={11} /> {phoneNumber}</a>
      </div>

      <header className="main-nav">
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Zur Startseite">
          <img className="brand-logo-image" src={logoSrc} alt="Little Napoli" />
        </button>
        <nav className={isMenuOpen ? 'nav-links is-open' : 'nav-links'}>
          <button onClick={() => scrollTo('menu')}>Speisekarte</button>
          <button onClick={() => scrollTo('story')}>Über uns</button>
          <button onClick={() => scrollTo('chef')}>Pizzaiolo</button>
          <button onClick={() => scrollTo('contact')}>Kontakt</button>
        </nav>
        <div className="nav-actions"><a className="nav-instagram" href={instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><button className="nav-menu-pdf" onClick={() => setMenuBookOpen(true)}><FileText size={16} /> Menü</button><a className="nav-download" href={menuPdfHref} target="_blank" rel="noreferrer" aria-label="Speisekarte als PDF herunterladen"><Download size={16} /></a><a className="nav-phone" href={phoneHref}><Phone size={16} /> {phoneNumber}</a></div>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menü öffnen">
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-video-bg"><img src="/images/banner-boutique.jpg" alt="" loading="eager" /></div>
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> L'autentica pizza napoletana</p>
            <div className="hero-logo-big"><img src={logoSrc} alt="Little Napoli" /></div>
            <p className="hero-description">Der authentische Geschmack Neapels in jedem Bissen. Lebendiger Teig, Produkte aus Süditalien und das Feuer als einziger Beschleuniger.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('menu')}>Speisekarte entdecken <ArrowDownRight size={17} /></button>
              <a className="text-button" href={phoneHref}><Phone size={16} /> {phoneNumber}</a>
            </div>
          </div>
          <div className="hero-art" aria-label="Pizza-Galerie von Little Napoli" onMouseEnter={() => setHeroIndex((heroIndex + 1) % heroImages.length)}>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="hero-sticker">Made<br /><strong>with<br />fire</strong></span>
            {heroImages.map((image, index) => (
              <img className={heroIndex === index ? 'hero-pizza is-visible' : 'hero-pizza'} key={image.src} src={image.src} alt={image.label} />
            ))}
            <div className="hero-caption"><span>0{heroIndex + 1}</span><span>{heroImages[heroIndex].label}<br />buon appetito</span></div>
            <div className="hero-dots">{heroImages.map((image, index) => <button key={image.src} className={heroIndex === index ? 'active' : ''} onClick={() => setHeroIndex(index)} aria-label={`Siehe ${image.label}`} />)}</div>
          </div>
          <div className="hero-side-note">BUON<br />APPETITO <ArrowDownRight size={16} /></div>
        </section>

        <div className="marquee-band" aria-hidden="true"><div>FARINA · FUOCO · PASSIONE <span>✳</span> FARINA · FUOCO · PASSIONE <span>✳</span> FARINA · FUOCO · PASSIONE <span>✳</span></div></div>

        <section className="intro-section section-pad" id="story">
          <DoodleField variant="intro" />
          <img className="sketch-art sketch-art-intro alt" src="/images/sketch-pizza-round.png" alt="" aria-hidden="true" loading="lazy" />
          <div className="section-kicker">01 <span /> Geschmack vor allem <KickerIcon section="story" /></div>
          <div className="intro-grid">
            <div className="intro-left">
              <h2>Weniger<br />ist <em>mehr.</em></h2>
              <img className="intro-mascot" src="/images/pizza-honey-statue.png" alt="Pizza, honey?" loading="lazy" />
            </div>
            <div className="intro-text">
              <p className="large-copy">Bei Little Napoli verbinden wir Handwerk, Liebe und Leidenschaft zur echten italienischen Esskultur.</p>
              <p>Unser Teig wird nach traditioneller neapolitanischer Methode zubereitet. Das Mehl von der Amalfiküste ruht 48 bis 96 Stunden und trifft auf sorgfältig ausgewählte Zutaten aus Süditalien, zertifiziert nach D.O.P., S.T.G. und D.O.C.</p>
              <button className="round-link" onClick={() => scrollTo('contact')}>Unsere Geschichte entdecken <ArrowUpRight size={17} /></button>
            </div>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <DoodleField variant="menu" />
          <img className="sketch-art sketch-art-menu" src="/images/sketch-pizza-slice.png" alt="" aria-hidden="true" loading="lazy" />
          <div className="menu-header"><div><div className="section-kicker">02 <span /> La carta <KickerIcon section="menu" /></div><h2>Einfach.<br /><em>Großzügig.</em></h2></div><p>Jede Pizza kommt in weniger als 90 Sekunden aus dem Ofen.<br />Der Rest liegt in euren Händen.</p></div>
          <div className="category-tabs">{['Alle', 'Klassiker', 'Signaturen', 'Vegetarisch'].map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="menu-grid">{visibleItems.map((item, index) => <article className="menu-card" key={item.name}><div className="menu-card-image"><img src={item.image} alt={item.name} loading="lazy" /><span className="card-number">0{index + 1}</span><MenuCategoryIcon category={item.category} /></div><div className="menu-card-info"><div><div className="menu-card-name-row"><h3>{item.name}</h3><AllergenBadges codes={item.allergens} size="sm" /></div><p>{item.description}</p></div><strong>{item.price}</strong></div></article>)}</div>
          <div className="menu-footer"><span>Unsere Karte wechselt mit den Jahreszeiten</span><div className="menu-footer-actions"><a className="text-button" href={menuPdfHref} target="_blank" rel="noreferrer"><Download size={16} /> Speisekarte als PDF <ArrowUpRight size={16} /></a><button className="text-button" onClick={() => setMenuBookOpen(true)}><FileText size={16} /> Die ganze Speisekarte durchblättern <ArrowUpRight size={16} /></button></div></div>
        </section>

        <section className="split-story">
          <div className="split-image"><video src="/videos/pizza-baking.mp4" autoPlay muted loop playsInline aria-label="Pizza im Holzofen" /><span className="image-label">Nel cuore di Vienna</span></div>
          <div className="split-copy">
            <DoodleField variant="split" />
            <div className="section-kicker">03 <span /> Unsere Handwerkskunst <KickerIcon section="craft" /></div><h2>Feuer<br />als <em>Signatur.</em></h2><p>Mit neapolitanischem Teig macht man keine Kompromisse. Er braucht Geduld, einen glühenden Ofen und Hände, die wissen, wann es genug ist.</p><div className="stats-row"><div><strong>48–96h</strong><span>Gärzeit</span></div><div><strong>450°</strong><span>im Ofen</span></div><div><strong>90s</strong><span>Backzeit</span></div></div>
          </div>
        </section>

        <section className="chef-section" id="chef">
          <div className="chef-portrait"><img src="/images/chef.jpg" alt="Pizzaiolo Little Napoli" /><span className="image-label">Unser Pizzaiolo</span></div>
          <div className="chef-copy">
            <DoodleField variant="chef" />
            <div className="section-kicker">04 <span /> Der Handwerker hinter dem Teig <KickerIcon section="chef" /></div><h2>Eine Bewegung,<br />die zur <em>Kunst</em> wird.</h2><p className="large-copy">Pizza ist nicht nur ein Gericht. Sie ist eine Bewegung, eine Erinnerung und eine Art, Tradition weiterzugeben.</p><p>Unser Pizzaiolo trägt die neapolitanische Tradition mit zeitgenössischer Energie weiter. Jede Teigkugel wird von Hand geöffnet, präzise belegt und mit Respekt dem Ofen anvertraut.</p><div className="chef-award"><span className="award-stars">III</span><span>Pizzaiolo<br />Artista Contemporaneo<br /><strong>2025</strong></span></div>
          </div>
        </section>

        <section className="academy-section" id="academy">
          <div className="academy-orb" />
          <DoodleField variant="academy" />
          <div className="academy-top"><div className="section-kicker light">05 <span /> Little Napoli Academy <KickerIcon section="academy" /></div><span className="academy-note">Vom Mehl<br />zum Stolz.</span></div>
          <div className="academy-grid">
            <div>
              <h2>Lerne,<br /><em>echte</em> Pizza zu machen.</h2>
              <p className="academy-lead">Du möchtest eine Pizzeria eröffnen, deine Technik perfektionieren oder verstehen, was eine Pizza unvergesslich macht?</p>
              <p>Unsere Ausbildungen sind für alle, die hinter die Theke wollen und Dinge mit Leidenschaft machen. Ruf uns einfach an und wir besprechen alles direkt am Telefon.</p>
              <div className="academy-bottom academy-facts"><span><Flame size={17} /> Intensivkurs · 2 Tage</span><span><Star size={15} fill="currentColor" /> Praxis mit unserem Chef</span></div>
              <a className="button button-dark" href={phoneHref} style={{ marginTop: 30 }}>Jetzt anrufen <Phone size={16} /></a>
            </div>
            <a className="academy-preview" href={phoneHref}>
              <img src="/images/pizza-cutout-2.png" alt="Ausbildung Pizza" className="preview-pizza" />
              <div className="preview-orbit" />
              <span className="preview-cta">Jetzt<br /><strong>anrufen</strong></span>
            </a>
          </div>
        </section>

        <section className="gallery-section section-pad">
          <DoodleField variant="gallery" />
          <img className="sketch-art sketch-art-gallery alt" src="/images/sketch-pizza-whole.png" alt="" aria-hidden="true" loading="lazy" />
          <div className="gallery-header"><div className="section-kicker">06 <span /> La vita è bella <KickerIcon section="gallery" /></div><h2>Zu Tisch,<br /><em>ganz einfach.</em></h2><p>Ein Stück Neapel in Himberg bei Wien.<br />Wir halten euch einen Platz frei.</p></div><div className="gallery-grid">{galleryImages.map((image, index) => <div className={`gallery-item gallery-${index + 1}`} key={image}><img src={image} alt="Pizza Little Napoli" loading="lazy" />{index === 1 && <span className="gallery-quote"><Quote size={22} />"Pizza ist die Kunst,<br />Menschen glücklich zu machen."</span>}</div>)}</div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-layout">
            <div className="contact-card">
              <DoodleField variant="contact" />
              <div><div className="section-kicker light">07 <span /> Besucht uns <KickerIcon section="contact" /></div><h2>Little Napoli<br /><em>Pizzeria & Feinkost.</em></h2></div>
              <div className="contact-details">
                <div><MapPin size={20} /><p>Hauptstrasse 44<br />2325 Himberg bei Wien</p></div>
                <div className="contact-hours"><span className="contact-hours-label"><Clock3 size={20} /><p>Öffnungszeiten</p></span><OpeningHours /></div>
                <a className="button button-light" href={phoneHref}><Phone size={17} /> {phoneNumber} anrufen</a>
              </div>
            </div>
            <div className="contact-map-wrap">
              <div className="contact-map-frame">
                <span className="contact-map-corner tl" />
                <span className="contact-map-corner tr" />
                <span className="contact-map-corner bl" />
                <span className="contact-map-corner br" />
                <div className="contact-map-badge">
                  <span className="contact-map-pin"><MapPin size={16} /></span>
                  <div><strong>Little Napoli</strong><span>Pizzeria & Feinkost</span></div>
                </div>
                <iframe
                  title="Little Napoli Pizzeria & Feinkost — Standort"
                  src="https://www.google.com/maps?q=Little+Napoli+Pizzeria+%26+Feinkost,+Hauptstrasse+44,+2325+Himberg+bei+Wien,+Austria&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a className="contact-map-cta" href={mapsDirectionsHref} target="_blank" rel="noreferrer">
                  <Navigation size={16} /> Route berechnen
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <DoodleField variant="footer" />
        <div className="footer-brand"><img className="brand-logo-image" src={logoSrc} alt="Little Napoli" /></div><p>Pizza fatta bene.<br />Vita fatta meglio.</p><div className="footer-right"><a href={phoneHref}><Phone size={19} /> {phoneNumber}</a><a href={instagramHref} target="_blank" rel="noreferrer"><Instagram size={19} /> Instagram</a><span>© 2026 Little Napoli</span></div>
      </footer>
      <MenuBook isOpen={isMenuBookOpen} onClose={() => setMenuBookOpen(false)} pdfHref={menuPdfHref} />
    </div>
  );
}

export default App;
