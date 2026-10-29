import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  CalendarClock,
  QrCode,
  ArrowLeftRight,
  Banknote,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Scissors,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";

const phone = "60178460827";
const tcLink = "https://tinyurl.com/Fafa-Salon";
const realImages = {
  homepage: "/assets/homepage.jpg",
  rebonding: "/assets/rebonding.jpg",
  relaxing: "/assets/relaxing.jpg",
  keratin: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=900&auto=format&fit=crop",
  colour: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=900&auto=format&fit=crop",
  treatment: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=900&auto=format&fit=crop",
  walkin: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=900&auto=format&fit=crop",
  combo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
};
const salonToolsBg = realImages.homepage;

function bookingLink(service) {
  if (service === "pertanyaan salon") return `https://wa.me/${phone}?text=${encodeURIComponent("Hi FAFA Salon, saya nak buat pertanyaan salon.")}`;
  return `#booking?service=${encodeURIComponent(service)}`;
}

const services = {
  rebonding: {
    no: "01",
    title: "Rebonding & Relaxing",
    cardTitle: "Rebonding & Relaxing",
    short: "Dua pilihan pelurusan untuk rambut lebih kemas dan mudah diurus.",
    visual: "rebonding",
    booking: "Rebonding / Relaxing",
    intro: "Kedua-dua servis membantu meluruskan dan mengemaskan rambut. Pilihan yang sesuai bergantung pada hasil yang diinginkan, keadaan rambut dan sejarah chemical.",
    panels: [
      { title: "Silky Rebonding", text: "Untuk hasil lurus yang lebih jelas, licin dan kemas. Sesuai dipertimbangkan untuk rambut kerinting atau bergelombang yang sukar diurus, selepas pemeriksaan hairstylist. Bahagian rambut yang telah direbonding kekal lurus; akar baharu tumbuh mengikut tekstur asal dan mungkin memerlukan touch-up." },
      { title: "Soft Relaxing", text: "Untuk hasil lurus yang lebih natural dan lembut, tanpa kesan terlalu tegang seperti rebonding. Sesuai dipertimbangkan untuk rambut halus atau biasa yang mahu kelihatan lebih kemas. Ketahanan sekitar 3–6 bulan bergantung pada keadaan rambut dan penjagaan harian." },
      { title: "Mana satu sesuai untuk anda?", text: "Rebonding untuk hasil lebih lurus dan licin; relaxing untuk hasil lebih natural. Hairstylist akan semak tekstur, kekuatan serta sejarah colour atau bleach sebelum mencadangkan servis. Rambut sensitif, rosak atau pernah bleach perlu dinilai dahulu." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  keratin: {
    no: "02",
    title: "Keratin Treatment",
    cardTitle: "Keratin",
    short: "Anti frizz, lembut & nampak sihat.",
    visual: "keratin",
    booking: "Keratin Treatment / Keratin Brazilian",
    intro: "Rawatan untuk rambut frizzy, kembang, kering atau ada bekas chemical termasuk rambut colour dan bleach.",
    panels: [
      { title: "Consultation dahulu", text: "Hairstylist akan cek keadaan rambut dahulu dan suggest pilihan keratin yang paling sesuai mengikut kondisi rambut." },
      { title: "Keratin Treatment", text: "Sesuai untuk rambut biasa atau separa kering. Merapikan rambut dan beri kilauan sementara." },
      { title: "Keratin Brazilian Anti Frizz", text: "Beri sedikit pelurusan dan kekemasan untuk rambut frizzy dan kembang." },
      { title: "Keratin Brazilian Aqua Repair", text: "Sesuai untuk rambut ada bekas chemical, bleach, rosak dan kering. Membantu melembapkan semula rambut rosak." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  colour: {
    no: "03",
    title: "Hair Colour",
    cardTitle: "Colour",
    short: "Warna cantik tanpa bleach.",
    visual: "colour",
    booking: "Hair Colour",
    intro: "Colour yang tidak memerlukan penggunaan bleach dalam pewarnaan. Hasil warna bergantung kepada warna rambut asal.",
    panels: [{ title: "Pilihan warna", text: "Honey Brown, Ash Brown, Maroon Red, Maroon Purple, Hazelnut Brown dan Golden Brown." }],
    colours: ["Honey Brown", "Ash Brown", "Maroon Red", "Maroon Purple", "Hazelnut Brown", "Golden Brown"],
    time: "Subject to consultation",
  },
  treatment: {
    no: "04",
    title: "Light Hair Treatment",
    cardTitle: "Treatment",
    short: "Soft treatment & scalp treatment.",
    visual: "treatment",
    booking: "Light Hair Treatment",
    intro: "Rawatan ringan untuk rambut dan kulit kepala.",
    panels: [
      { title: "Soft Treatment", text: "Fokus rambut. Kurang kusut dan mudah diurus. Kesan biasanya sementara dan perlu ulang rawatan." },
      { title: "Scalp Treatment", text: "Fokus kulit kepala. Membersihkan & merawat kulit kepala. Kurangkan kelemumur & kegatalan." },
      { title: "Combo Soft + Scalp Treatment", text: "Pilihan combo Soft Treatment dan Scalp Treatment untuk kesan lebih baik — rambut lebih mudah diurus dan kulit kepala lebih bersih." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  walkin: {
    no: "05",
    title: "Walk In Services",
    cardTitle: "Walk In",
    short: "Wash, blow, cut & styling.",
    visual: "walkin",
    booking: "Walk In Services",
    intro: "Walk-in available from 11 am - 5.00 pm depending on available slot.",
    panels: [
      { title: "Wash & Blow", text: "Double Cleanse + Head Massage + Blow Dry. Short RM28, Medium RM38, Long RM48." },
      { title: "Cut & Blow", text: "RM38." },
      { title: "Styling / Iron Add On", text: "Iron atau simple styling boleh add on RM10." },
      { title: "Haircut Add On", text: "Add on any style haircut RM20 untuk servis tertentu." },
    ],
    time: "Walk In Available: 11 am - 5.00 pm",
  },
};


const combos = {
  combo_rebonding_keratin: {
    no: "C01",
    title: "Rebonding / Relaxing + Keratin Brazilian",
    short: "Lurus lebih kemas + bantu kurangkan frizz.",
    visual: "comboStraight",
    booking: "Combo Rebonding / Relaxing + Keratin Brazilian",
    panels: [
      { title: "Sesuai untuk", text: "Customer yang mahu rambut lebih lurus, kemas dan dalam masa yang sama mahu rambut nampak lebih lembut dan kurang frizz." },
      { title: "Nota servis", text: "Hairstylist akan cek keadaan rambut dahulu sama ada lebih sesuai buat rebonding atau relaxing sebelum keratin." },
    ],
  },
  combo_rebonding_colour: {
    no: "C02",
    title: "Rebonding / Relaxing + Colour",
    short: "Kemas + warna lebih menyerlah.",
    visual: "comboColour",
    booking: "Combo Rebonding / Relaxing + Colour",
    panels: [
      { title: "Sesuai untuk", text: "Customer yang mahu rambut nampak lebih kemas dan dalam masa yang sama mahu tambah warna rambut." },
      { title: "Nota servis", text: "Pilihan warna bergantung kepada keadaan rambut, sejarah chemical dan consultation hairstylist." },
    ],
  },
  combo_colour_keratin: {
    no: "C03",
    title: "Colour + Keratin Brazilian",
    short: "Warna cantik + rambut lebih lembut.",
    visual: "comboKeratin",
    booking: "Combo Colour + Keratin Brazilian",
    panels: [
      { title: "Sesuai untuk", text: "Customer yang mahu buat colour dan mahu rambut nampak lebih kemas, lembut dan kurang frizz selepas servis." },
      { title: "Nota servis", text: "Hairstylist akan cek keadaan rambut dan suggest pilihan keratin yang sesuai selepas colour." },
    ],
  },
  combo_soft_scalp: {
    no: "C04",
    title: "Soft + Scalp Treatment",
    short: "Rambut lebih mudah urus + kulit kepala lebih bersih.",
    visual: "comboTreatment",
    booking: "Combo Soft + Scalp Treatment",
    panels: [
      { title: "Sesuai untuk", text: "Customer yang mahu rawatan ringan untuk rambut dan kulit kepala dalam satu sesi." },
      { title: "Kesan / Manfaat", text: "Soft Treatment fokus pada rambut supaya kurang kusut, manakala Scalp Treatment fokus membersihkan dan menyegarkan kulit kepala." },
    ],
  },
};

const nav = [
  ["rebonding", "Rebonding & Relaxing"],
  ["keratin", "Keratin"],
  ["colour", "Colour"],
  ["treatment", "Treatment"],
  ["walkin", "Walk In"],
  ["combo", "Combo"],
];

const pageMotion = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -18, filter: "blur(8px)" },
  transition: { duration: 0.42, ease: "easeOut" },
};

export default function App() {
  const [page, setPage] = useState(() => window.location.hash.startsWith("#booking") ? "booking" : "home");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.startsWith('#booking')) {
        setPage('booking'); setMenuOpen(false); window.scrollTo({ top: 0 });
      } else { setPage('home'); setMenuOpen(false); }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const current = services[page];
  const currentCombo = combos[page];

  const go = (target) => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search + (target === 'booking' ? '#booking' : ''));
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="phone-frame">
        <Header page={page} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <AnimatePresence mode="wait">
          {page === "booking" && <BookingPage key="booking" go={go} />}
          {page === "home" && <HomePage key="home" go={go} />}
          {page === "contact" && <ContactPage key="contact" />}
          {page === "location" && <LocationPage key="location" />}
          {page === "combo" && <ComboPage key="combo" go={go} />}
          {currentCombo && <ComboDetailPage key={page} item={currentCombo} go={go} />}
          {current && <ServicePage key={page} item={current} go={go} />}
        </AnimatePresence>
        <BottomBar go={go} page={page} />
      </div>
    </main>
  );
}

function Header({ page, go, menuOpen, setMenuOpen }) {
  return (
    <header className="top-nav">
      <button className="brand luxury-brand" onClick={() => go("home")}>
        <div className="brand-wording">
          <span>FAFA SALON</span>
          <small>BEAUTY CENTRE</small>
        </div>
      </button>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="nav-drawer" initial={{ opacity: 0, y: -12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.96 }}>
            {nav.map(([id, label]) => <button className={page === id ? "active" : ""} key={id} onClick={() => go(id)}>{label}</button>)}
            <button onClick={() => go("contact")}>Contact</button>
            <button onClick={() => go("location")}>Location</button>
            <button onClick={() => go("booking")}>Booking / Semak Slot</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HomePage({ go }) {
  return (
    <motion.section className="page home-page" {...pageMotion}>
      <style>{`
        .home-page .hero-content{width:100%;min-width:0}
        .home-page .hero h1.salon-headline{font-family:"Playfair Display",Georgia,serif;font-size:clamp(30px,9vw,42px);font-weight:800;line-height:1.08;letter-spacing:-1px;margin:20px 0 18px;color:#fff}
        .home-page .salon-headline span,.home-page .salon-headline em{display:block}
        .home-page .salon-headline em{font-style:normal;color:#ff66a9}
        .home-page .hero p.salon-intro{max-width:none;color:#f4edf2;font-size:14px;line-height:1.8;margin:0 0 24px}
        .home-page .payment-methods{margin:24px 0}
        .home-page .payment-heading{color:#ff80b8;font-size:11px;letter-spacing:2px;font-weight:800;text-transform:uppercase;margin:0 0 14px}
        .home-page .payment-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;list-style:none;margin:0;padding:0}
        .home-page .payment-item{grid-column:span 2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;min-width:0;min-height:92px;padding:13px 5px;border:1px solid rgba(255,255,255,.18);border-radius:16px;background:rgba(17,17,25,.75);color:#fff;text-align:center}
        .home-page .payment-item:nth-last-child(-n+2){grid-column:span 3}
        .home-page .payment-symbol{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(230,80,152,.12);color:#ff80b8}
        .home-page .payment-item b{color:#fff;font-size:12px;line-height:1.4}
        .home-page .payment-item.spaylater .payment-symbol{color:#ffbe89;background:rgba(255,126,70,.12)}
        .home-page .payment-item.qr .payment-symbol{color:#b4d6ff;background:rgba(70,137,255,.12)}
        .home-page .hero-actions.only-wa{display:flex;justify-content:center;width:100%;margin:28px auto 8px}
        .home-page .hero-actions.only-wa a{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:100%;min-height:68px;padding:20px 14px;box-sizing:border-box;margin:0 auto;background:linear-gradient(135deg,#e52f88,#ff79b4);border:1px solid #ff8fc2;border-radius:18px;color:#fff;font-size:19px;font-weight:900;line-height:1.3;text-align:center;text-decoration:none;box-shadow:0 8px 26px rgba(230,80,152,.3)}
        .home-page .hero-actions.only-wa a:focus-visible{outline:3px solid white;outline-offset:5px}
        .home-page .hero-actions.only-wa a:hover{filter:brightness(1.08)}
      `}</style>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${salonToolsBg})` }} />
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <img className="hero-logo" src="/assets/fafa-logo.png" alt="FAFA Salon Beauty Centre" />
          <span className="kicker">Your Beauty, Our Passion</span>
          <h1 className="salon-headline"><span>SALON PILIHAN</span><span>WANITA DAN</span><em>MUSLIMAH</em></h1>
          <p className="salon-intro">Tampil cantik dan berkeyakinan, dengan ruang menunggu selesa untuk suami &amp; anak, lengkap dengan TV (Netflix &amp; YouTube) serta WiFi percuma!</p>
          <section className="payment-methods" aria-label="Kaedah bayaran">
            <h2 className="payment-heading">Payment Methods</h2>
            <ul className="payment-grid">
              <li className="payment-item"><span className="payment-symbol" aria-hidden="true"><CreditCard size={23} /></span><b>Credit Card</b></li>
              <li className="payment-item spaylater"><span className="payment-symbol" aria-hidden="true"><CalendarClock size={23} /></span><b>SPayLater</b></li>
              <li className="payment-item qr"><span className="payment-symbol" aria-hidden="true"><QrCode size={23} /></span><b>QR / TnGo</b></li>
              <li className="payment-item"><span className="payment-symbol" aria-hidden="true"><ArrowLeftRight size={23} /></span><b>Transfer</b></li>
              <li className="payment-item"><span className="payment-symbol" aria-hidden="true"><Banknote size={23} /></span><b>Cash</b></li>
            </ul>
          </section>
          <div className="hero-actions only-wa"><a href={bookingLink("booking appointment")}><CalendarDays size={23} aria-hidden="true" /><span>Semak Slot &amp; Booking</span></a></div>
        </motion.div>
      </section>

      <section className="services-section">
        <div className="section-heading center"><span>Our Services</span><h2>Perkhidmatan Kami</h2></div>
        <div className="service-grid">
          {Object.keys(services).map((id) => (
            <motion.div key={id} className="service-card" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <button className="image-button" onClick={() => go(id)}><ServiceVisual type={services[id].visual} compact /></button>
              <div className="card-body">
                <div className="icon-badge"><ServiceIcon type={id} /></div>
                <h3>{services[id].cardTitle}</h3>
                <p>{services[id].short}</p>
                <a href={bookingLink(services[id].booking)}><MessageCircle size={16} /> Saya berminat nak buat {services[id].cardTitle.toUpperCase()}</a>
                <button className="detail-btn" onClick={() => go(id)}>Lihat detail <ChevronRight size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="banner-cta">
        <div><MessageCircle size={34} /><h2>Nak booking atau tanya dulu?</h2><p>Isi borang untuk semakan slot melalui WhatsApp.</p></div>
        <a href={bookingLink("booking appointment")}>Isi Borang Booking</a>
      </section>

      <section className="policy-card">
        <a className="tc-link" href={tcLink}>View full T&C</a>
      </section>

      <section className="quick-links">
        <button onClick={() => go("combo")}>Combo Services</button>
        <button onClick={() => go("contact")}>Contact Us</button>
        <button onClick={() => go("location")}>Our Location</button>
      </section>
    </motion.section>
  );
}

function ServicePage({ item, go }) {
  return (
    <motion.section className="page service-page" {...pageMotion}>
      <section className="service-cover">
        <ServiceVisual type={item.visual} />
        <div className="cover-overlay">
          <button className="back-btn" onClick={() => go("home")}><ArrowLeft size={17} /> Home</button>
          <span className="service-no">{item.no}</span>
          <h1>{item.title}</h1>
          <p>{item.short}</p>
        </div>
      </section>
      <section className="content-block">
        <span className="kicker">Exclusive Detail</span>
        <h2>{item.title}</h2>
        <p className="lead">{item.intro}</p>
        <div className="time-pill"><Clock3 size={17} /> {item.time}</div>
        {item.panels.map((panel) => <InfoPanel key={panel.title} title={panel.title} text={panel.text} />)}
        {item.colours && <div className="colour-board">{item.colours.map((c, i) => <div className={`colour-chip c${i}`} key={c}><span>{c}</span></div>)}</div>}
        {item.visual === "rebonding" ? <div style={{display: "grid", gap: 12}}>
          <a className="main-wa" style={{marginTop: 16}} href={bookingLink("Silky Rebonding")}><MessageCircle size={18} /> Pilih Silky Rebonding</a>
          <a className="main-wa" style={{marginTop: 0}} href={bookingLink("Soft Relaxing")}><MessageCircle size={18} /> Pilih Soft Relaxing</a>
        </div> : <a className="main-wa" href={bookingLink(item.booking)}><MessageCircle size={18} /> Saya berminat nak buat {item.title}</a>}
      </section>
    </motion.section>
  );
}

function InfoPanel({ title, text }) {
  return <motion.div className="info-panel" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h3>{title}</h3><p>{text}</p></motion.div>;
}


function ComboPage({ go }) {
  return (
    <motion.section className="page combo-page" {...pageMotion}>
      <section className="combo-hero">
        <div className="combo-hero-bg" />
        <div className="combo-hero-content">
          <span className="kicker">Combo Services</span>
          <h1>Combo<br />Jimat</h1>
          
        </div>
      </section>

      <section className="services-section">
        <div className="section-heading center">
          <span>FAFA Salon Combo</span>
          <h2>Pilihan Combo</h2>
        </div>

        <div className="service-grid">
          {Object.keys(combos).map((id) => (
            <motion.div
              key={id}
              className="service-card combo-card"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button className="image-button" onClick={() => go(id)}>
                <ServiceVisual type={combos[id].visual} compact />
              </button>
              <div className="card-body">
                <div className="icon-badge">
                  <Sparkles size={18} />
                </div>
                <h3>{combos[id].title}</h3>
                <p>{combos[id].short}</p>
                <a href={bookingLink(combos[id].booking)}>
                  <MessageCircle size={16} /> Saya berminat nak buat COMBO
                </a>
                <button className="detail-btn" onClick={() => go(id)}>
                  Lihat detail <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.section>
  );
}

function ComboDetailPage({ item, go }) {
  return (
    <motion.section className="page service-page combo-detail-page" {...pageMotion}>
      <section className="service-cover">
        <ServiceVisual type={item.visual} />
        <div className="cover-overlay">
          <button className="back-btn" onClick={() => go("combo")}>
            <ArrowLeft size={17} /> Combo
          </button>
          <span className="service-no">{item.no}</span>
          <h1>{item.title}</h1>
          <p>{item.short}</p>
        </div>
      </section>

      <section className="content-block">
        <span className="kicker">Combo Detail</span>
        <h2>{item.title}</h2>
        <p className="lead">Sila WhatsApp untuk semakan slot dan consultation.</p>

        {item.panels.map((panel) => (
          <InfoPanel key={panel.title} title={panel.title} text={panel.text} />
        ))}

        <a className="main-wa" href={bookingLink(item.booking)}>
          <MessageCircle size={18} /> Saya berminat nak buat {item.title}
        </a>
      </section>
    </motion.section>
  );
}


function ContactPage() {
  return (
    <motion.section className="page contact-page" {...pageMotion}>
      <div className="full-visual">
        <div className="full-salon-bg" />
        <div className="full-overlay" />
        <div className="full-content">
          <img className="contact-logo" src="/assets/fafa-logo.png" alt="FAFA Salon Beauty Centre" />
          <span className="kicker white">Contact Us</span>
          <h1>017 - 846 0827</h1>
          <p>For other enquiries please WhatsApp us.</p>
          <a className="main-wa" target="_blank" rel="noopener noreferrer" href={bookingLink("pertanyaan salon")}><MessageCircle size={18} /> Click Here For WhatsApp</a>
        </div>
      </div>
    </motion.section>
  );
}

function LocationPage() {
  return (
    <motion.section className="page location-page" {...pageMotion}>
      <div className="content-block">
        <span className="kicker">Our Location</span>
        <h2>FAFA Salon Branches</h2>
        <LocationCard title="Setapak KL" text="Fafa Salon Beauty (Setapak) - Salon Wanita & Muslimah KL" link="https://maps.app.goo.gl/ykZWpN2WaiSx8cFM7" />
        <LocationCard title="Selayang Batu Caves" text="Fafa Salon Beauty (Selayang) - Salon Wanita & Muslimah" link="https://www.google.com/maps/search/Fafa+Salon+Beauty+Selayang+Salon+Wanita+Muslimah" />
        <div className="location-card muted"><MapPin size={18} /><div><h3>Cheras</h3><p>Coming Soon</p></div></div>
      </div>
    </motion.section>
  );
}

function LocationCard({ title, text, link }) {
  return <div className="location-card"><MapPin size={18} /><div><h3>{title}</h3><p>{text}</p><a href={link}>Open Google Map</a></div></div>;
}

function ServiceIcon({ type }) {
  if (type === "rebonding") return <Scissors size={18} />;
  if (type === "relaxing") return <Wand2 size={18} />;
  if (type === "keratin") return <Sparkles size={18} />;
  if (type === "colour") return <Sparkles size={18} />;
  if (type === "treatment") return <ShieldCheck size={18} />;
  return <Scissors size={18} />;
}

function ServiceVisual({ type, compact = false }) {
  const imageMap = {
    rebonding: realImages.rebonding,
    relaxing: realImages.relaxing,
    keratin: realImages.keratin,
    colour: realImages.colour,
    treatment: realImages.treatment,
    walkin: realImages.walkin,
    comboStraight: realImages.rebonding,
    comboColour: realImages.colour,
    comboKeratin: realImages.keratin,
    comboTreatment: realImages.treatment,
  };

  if (type?.startsWith("combo")) {
    const comboPairs = {
      comboStraight: [realImages.rebonding, realImages.keratin],
      comboColour: [realImages.rebonding, realImages.colour],
      comboKeratin: [realImages.colour, realImages.keratin],
      comboTreatment: [realImages.treatment, realImages.walkin],
    };

    return (
      <div className={`real-service-visual combo-real ${compact ? "compact" : ""}`}>
        <img src={comboPairs[type]?.[0] || realImages.combo} alt="Combo service 1" />
        <img src={comboPairs[type]?.[1] || realImages.combo} alt="Combo service 2" />
        <div className="real-image-overlay" />
      </div>
    );
  }

  return (
    <div className={`real-service-visual visual-${type} ${compact ? "compact" : ""}`}>
      <img src={imageMap[type] || realImages.combo} alt={`${type} service`} />
      <div className="real-image-overlay" />
    </div>
  );
}

function BottomBar({ go, page }) {
  const current = services[page] || combos[page];
  const href = current ? bookingLink(current.booking) : bookingLink("booking appointment");
  return <div className="bottom-bar"><button onClick={() => go("home")}><Home size={16} /> Home</button><a href={href}><MessageCircle size={16} /> Book Now</a></div>;
}

const bookingChoices = [
  'Silky Rebonding', 'Soft Relaxing',
  ...Object.values(services).filter(item => !['rebonding', 'treatment', 'walkin'].includes(item.visual)).map(item => item.booking),
  'Bleach + Colour', 'Highlight + Colour', 'Touch-up Rebonding',
  'Soft Treatment', 'Protein Treatment', 'Scalp Treatment',
  'Hair Cut & Styling', 'Hair Wash', 'Setting Curl', 'Hairdo',
  ...Object.values(combos).map(item => item.booking),
  'Lain-lain / Perlukan nasihat',
];
const lengthChoices = ['1 — Sebahu', '2 — Ketiak–atas bra line', '3 — Bawah bra line–atas pinggang', '4 — Bawah pinggang'];
const hairCheckNote = 'Hairstylist akan memeriksa paras dan ketebalan rambut sebenar.';
function malaysiaToday() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = type => parts.find(p => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
function initialBookingServices() {
  const requested = new URLSearchParams(window.location.hash.split('?')[1] || '').get('service');
  const mapped = { 'Light Hair Treatment': 'Soft Treatment', 'Walk In Services': 'Hair Wash' }[requested] || requested;
  return bookingChoices.includes(mapped) ? [mapped] : [];
}
function BookingPage({ go }) {
  const [selected, setSelected] = useState(initialBookingServices);
  const [form, setForm] = useState({ name: '', phone: '', branch: '', date: '', time: '', length: '', thickness: '', notes: '' });
  const [error, setError] = useState('');
  const update = (key, value) => { setForm(prev => ({ ...prev, [key]: value })); };
  const today = malaysiaToday();
  const walkInOnly = selected.length > 0 && selected.every(item => ['Hair Cut & Styling', 'Hair Wash'].includes(item));
  const isCombo = selected.some(item => item.startsWith('Combo ')) || (selected.length > 1 && !walkInOnly);
  const end = walkInOnly ? 18 : isCombo ? 15.5 : 17;
  const times = [];
  for (let value = 11; value <= end; value += 0.5) {
    const hour = Math.floor(value);
    times.push(`${hour > 12 ? hour - 12 : hour}:${value % 1 ? '30' : '00'} ${hour >= 12 ? 'PM' : 'AM'}`);
  }
  const toggle = item => {
    const next = selected.includes(item) ? selected.filter(value => value !== item) : [...selected, item];
    setSelected(next); setError('');
    const cutWash = next.length > 0 && next.every(value => ['Hair Cut & Styling', 'Hair Wash'].includes(value));
    setForm(prev => ({ ...prev, time: '', date: cutWash ? today : prev.date }));
  };
  const dateLabel = form.date ? new Date(`${form.date}T12:00:00`).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
  const message = [
    'Hi FAFA Salon! Saya nak semak harga & kekosongan slot.', '',
    `Nama: ${form.name.trim()}`, `No. telefon: ${form.phone.trim()}`,
    `Cawangan: ${form.branch}`, `Servis: ${selected.join(' + ')}`,
    `Tarikh pilihan: ${dateLabel}`, `Masa pilihan: ${form.time}`,
    `Panjang rambut: ${form.length}`, `Ketebalan: ${form.thickness}`,
    `Nota: ${form.notes.trim() || '-'}`, '', hairCheckNote, '',
    'Mohon admin berikan harga dan sahkan slot. Saya faham tempahan belum disahkan dan deposit RM30 seorang hanya dibayar selepas pengesahan admin.',
    ...(walkInOnly ? ['Cut / Wash: semakan hari yang sama sahaja, minimum 30 minit sebelum datang. Tiada booking awal.'] : []),
  ].join('\n');
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const validate = element => {
    const node = element.closest('form');
    if (!selected.length) { setError('Sila pilih sekurang-kurangnya satu servis.'); node.querySelector('input[type=checkbox]').focus(); return false; }
    if (!node.reportValidity()) { setError('Sila lengkapkan semua ruangan wajib dan tandakan persetujuan.'); return false; }
    if (form.date < today || (walkInOnly && form.date !== today)) { setError('Sila pilih tarikh yang sah. Cut / Wash untuk semakan hari yang sama sahaja.'); return false; }
    if (!times.includes(form.time)) { setError('Sila pilih semula masa mengikut servis.'); return false; }
    setError(''); return true;
  };
  return (
    <motion.section className="page booking-page" {...pageMotion}>
      <style>{`
        .booking-page{background:#090910 !important;color:#fff !important;min-height:100vh;padding-bottom:110px;color-scheme:dark;isolation:isolate;overflow-x:clip}
        .booking-page,.booking-page *{box-sizing:border-box}
        .booking-page .content-block{padding:26px 20px 36px;background:radial-gradient(ellipse at top right,rgba(230,80,152,.12),transparent 440px),#090910;color:#fff;width:100%;min-width:0}
        .booking-page h2,.booking-page strong{color:#fff}
        .booking-page .lead{color:#e1d5df;font-size:14px;line-height:1.8}
        .booking-page .kicker{color:#ff80b8}
        .booking-page input::placeholder,.booking-page textarea::placeholder{color:#b7a9b7;opacity:1}
        .booking-page select option{color:#fff;background:#1a1a25}
        .booking-page h2{font-size:30px;line-height:1.2;margin:12px 0}
        .booking-page .booking-back{display:flex;align-items:center;gap:7px;background:transparent;color:#ff80b8;padding:0;margin:0 0 24px}
        .booking-page form{display:grid;gap:24px;min-width:0}
        .booking-page fieldset{border:0;margin:0;padding:0;min-width:0}
        .booking-page legend{font-size:12px;color:#ff80b8;font-weight:800;letter-spacing:1px;padding:0 0 12px}
        .booking-page .booking-services{display:grid;grid-template-columns:1fr 1fr;gap:9px}
        .booking-page .booking-choice{display:flex;align-items:flex-start;gap:7px;background:#1a1a25;border:1px solid #453343;border-radius:12px;padding:12px 9px;font-size:12px;line-height:1.5;cursor:pointer;color:#f4eaf0;overflow-wrap:anywhere}
        .booking-page .booking-choice.selected{border-color:#ff79b4;background:#3d2033}
        .booking-page input[type=checkbox]{accent-color:#e65098;width:17px;height:17px;flex-shrink:0;margin:2px 0}
        .booking-page .booking-fields{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;min-width:0}
        .booking-page .booking-field{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;font-size:14px;font-weight:600;line-height:1.5;color:#fff;min-width:0}
        .booking-page input:not([type=checkbox]),.booking-page select,.booking-page textarea{width:100%;max-width:100%;min-width:0;background:#1a1a25;border:1px solid #453343;border-radius:12px;padding:13px 12px;color:#fff;font:16px system-ui;box-sizing:border-box;color-scheme:dark;line-height:24px;-webkit-text-fill-color:#fff;opacity:1}
        .booking-page input:not([type=checkbox]),.booking-page select{height:52px;min-height:52px;max-height:52px;margin:0}
        .booking-page input[type=date]{display:block;appearance:none;-webkit-appearance:none;inline-size:100%;min-inline-size:0;max-inline-size:100%;text-align:left;padding:13px 12px;overflow:hidden}
        .booking-page input[type=date]::-webkit-date-and-time-value{text-align:left;min-height:24px;margin:0}
        .booking-page input[type=date]::-webkit-datetime-edit{padding:0;display:inline-flex;line-height:24px}
        .booking-page input[type=date]::-webkit-calendar-picker-indicator{margin:0;padding:0;flex-shrink:0}
        .booking-page textarea{min-height:110px;resize:vertical;font-weight:400}
        .booking-page .booking-fields input,.booking-page .booking-fields select{font-weight:400}
        .booking-page input:focus-visible,.booking-page select:focus-visible,.booking-page textarea:focus-visible,.booking-page a:focus-visible{outline:2px solid #ff79b4;outline-offset:3px}
        .booking-page .booking-note{font-size:13px;line-height:1.8;color:#e1d5df;margin:10px 0 0}
        .booking-page .booking-notice{background:#291b27;border:1px solid #714361;border-radius:16px;padding:16px;font-size:13px;line-height:1.8;color:#f0deea}
        .booking-page .booking-consent{display:flex;gap:10px;font-size:13px;line-height:1.7;color:#e9dce5}
        .booking-page .booking-error{color:#ff9bbf;font-size:13px;line-height:1.6;margin:0}
        .booking-page .booking-send{display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(135deg,#e65098,#ff79b4);padding:17px 12px;border-radius:14px;color:#fff;text-decoration:none;font-weight:800;font-size:14px;text-align:center}
        .booking-page .booking-copy{width:100%;font-size:13px;min-height:200px}
        .booking-page .booking-fallback{background:transparent;color:#ff80b8;border:1px solid #714361;border-radius:12px;padding:12px;font-size:13px;width:100%;cursor:pointer}
      `}</style>
      <div className="content-block">
        <button className="booking-back" onClick={() => go('home')}><ArrowLeft size={16} /> Kembali ke Home</button>
        <span className="kicker">Booking / Semak Slot</span>
        <h2>Jom rancang hair day anda</h2>
        <p className="lead">Pilih servis dan waktu pilihan. Admin akan semak kekosongan serta berikan harga melalui WhatsApp.</p>
        <form onSubmit={event => { event.preventDefault(); event.currentTarget.querySelector('[data-booking-send]').click(); }}>
          <fieldset>
            <legend>01 / PILIH SERVIS ANDA</legend>
            <p className="booking-note" style={{ margin: '0 0 12px' }}>Boleh pilih lebih daripada satu servis.</p>
            <div className="booking-services">{bookingChoices.map(item => <label key={item} className={`booking-choice ${selected.includes(item) ? 'selected' : ''}`}><input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} /><span>{item}</span></label>)}</div>
          </fieldset>
          <fieldset>
            <legend>02 / CAWANGAN & WAKTU</legend>
            <div className="booking-fields">
              <label className="booking-field">Cawangan *<select value={form.branch} required onChange={event => update('branch', event.target.value)}><option value="">Pilih cawangan</option><option>Setapak, Kuala Lumpur</option><option>Selayang, Batu Caves</option></select></label>
              <label className="booking-field">Tarikh pilihan *<input type="date" required min={today} max={walkInOnly ? today : undefined} value={form.date} onChange={event => update('date', event.target.value)} /></label>
              <label className="booking-field">Masa pilihan *<select value={form.time} required onChange={event => update('time', event.target.value)}><option value="">Pilih masa</option>{times.map(time => <option key={time}>{time}</option>)}</select></label>
            </div>
            <p className="booking-note">Slot tertakluk pada kekosongan. Admin akan sahkan waktu mengikut servis dan jadual cawangan.</p>
            {walkInOnly && <p className="booking-note">Cut / Wash: semakan hari yang sama sahaja, minimum 30 minit sebelum datang. Tiada booking awal.</p>}
          </fieldset>
          <fieldset>
            <legend>03 / MAKLUMAT ANDA</legend>
            <div className="booking-fields">
              <label className="booking-field">Nama penuh *<input required maxLength={100} autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} placeholder="Nama anda" /></label>
              <label className="booking-field">No. telefon / WhatsApp *<input required type="tel" minLength={9} maxLength={20} autoComplete="tel" value={form.phone} onChange={event => update('phone', event.target.value)} placeholder="Contoh: 0123456789" /></label>
              <label className="booking-field">Panjang rambut *<select required value={form.length} onChange={event => update('length', event.target.value)}><option value="">Pilih paras rambut</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
              <label className="booking-field">Ketebalan rambut *<select required value={form.thickness} onChange={event => update('thickness', event.target.value)}><option value="">Pilih ketebalan</option>{['Nipis', 'Biasa', 'Tebal', 'Sangat tebal'].map(item => <option key={item}>{item}</option>)}</select></label>
              <p className="booking-note">{hairCheckNote}</p>
              <label className="booking-field">Nota tambahan<textarea maxLength={1000} value={form.notes} onChange={event => update('notes', event.target.value)} placeholder="Sejarah colour / bleach, keadaan rambut atau permintaan khas." /></label>
            </div>
          </fieldset>
          <div className="booking-notice"><strong>Semak dahulu, baru booking.</strong><br />Harga akan diberikan oleh admin berdasarkan servis dan keadaan rambut. Deposit RM30 seorang hanya dibuat selepas harga dan slot disahkan. Borang ini belum mengesahkan tempahan.</div>
          <label className="booking-consent"><input type="checkbox" required /><span>Saya Faham slot tertakluk kepada kekosongan dan bersetuju menghantar maklumat ini kepada Fafa Salon.</span></label>
          <p className="booking-error" role="alert">{error}</p>
          <a data-booking-send className="booking-send" href={href} target="_blank" rel="noopener noreferrer" onClick={event => { if (!validate(event.currentTarget)) event.preventDefault(); }}><MessageCircle size={18} /> Hantar detail ke WhatsApp ↗</a>
        </form>
      </div>
    </motion.section>
  );
}
