import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
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
  const text = `Hi FAFA Salon, saya berminat nak buat ${service}. Boleh saya dapatkan info booking?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function applyLink(data) {
  const text = [
    "Hi FAFA Salon, saya berminat untuk apply kerja.",
    "",
    `Nama: ${data.name || "-"}`,
    `Umur: ${data.age || "-"}`,
    `No. Telefon: ${data.phone || "-"}`,
    `Pengalaman kerja salon: ${data.experience || "-"}`,
    `Servis yang boleh dibuat: ${data.skills || "-"}`,
    `Branch pilihan: ${data.branch || "-"}`,
    `Boleh mula kerja: ${data.start || "-"}`,
    `Ada tempat tinggal sendiri: ${data.stay || "-"}`,
    `Catatan: ${data.notes || "-"}`,
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

const services = {
  rebonding: {
    no: "01",
    title: "Silky Rebonding",
    cardTitle: "Rebonding",
    short: "Rambut lurus, licin & mudah diurus.",
    visual: "rebonding",
    booking: "Silky Rebonding",
    intro: "Rawatan kimia untuk menjadikan rambut lurus, licin dan kemas untuk jangka masa panjang.",
    panels: [
      { title: "Sesuai untuk", text: "Rambut kerinting atau bergelombang, kasar, tebal dan sukar diurus. Sesuai untuk rambut tidak sensitif dan tidak terdedah dengan chemical lain seperti colour atau bleach." },
      { title: "Kesan / Manfaat", text: "Rambut kelihatan lurus, berkilat, mudah diurus serta kurang kusut." },
      { title: "Ketahanan", text: "Permanent lurus sehingga tumbuh rambut baru. Bahagian akar baru perlu touch up mengikut pertumbuhan rambut." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  relaxing: {
    no: "02",
    title: "Soft Relaxing",
    cardTitle: "Relaxing",
    short: "Lurus natural, tidak terlalu tegang.",
    visual: "relaxing",
    booking: "Soft Relaxing",
    intro: "Rawatan kimia untuk melembutkan rambut kerinting atau kasar, menjadikannya lebih lurus dan mudah diurus.",
    panels: [
      { title: "Sesuai untuk", text: "Rambut halus, biasa atau tidak terlalu tebal yang ingin kelihatan lebih kemas tanpa kesan terlalu lurus seperti rebonding." },
      { title: "Kesan / Manfaat", text: "Rambut tampak lurus neutral, mudah diurus, kurang kusut serta lurus semulajadi." },
      { title: "Ketahanan", text: "Ketahanan sekitar 3–6 bulan bergantung kepada jagaan harian, keadaan rambut dan rutin selepas servis." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  keratin: {
    no: "03",
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
    no: "04",
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
    no: "05",
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
    no: "06",
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
  ["rebonding", "Rebonding"],
  ["relaxing", "Relaxing"],
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
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const current = services[page];
  const currentCombo = combos[page];

  const go = (target) => {
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="phone-frame">
        <Header page={page} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <AnimatePresence mode="wait">
          {page === "home" && <HomePage key="home" go={go} />}
          {page === "contact" && <ContactPage key="contact" />}
          {page === "location" && <LocationPage key="location" />}
          {page === "join" && <JoinPage key="join" />}
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
            <button onClick={() => go("join")}>Join Us</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HomePage({ go }) {
  return (
    <motion.section className="page home-page" {...pageMotion}>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${salonToolsBg})` }} />
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <img className="hero-logo" src="/assets/fafa-logo.png" alt="FAFA Salon Beauty Centre" />
          <span className="kicker">Your Beauty, Our Passion</span>
          <h1>LOOK GOOD<br />FEEL <em>CONFIDENT</em></h1>
          <p>Salon wanita & muslimah dengan servis rambut yang kemas, exclusive dan mudah booking.</p>
          <div className="trust-row">
            <div><ShieldCheck size={22} /><b>Women Only</b><small>Muslimah friendly</small></div>
            <div><Sparkles size={22} /><b>Premium Result</b><small>Kemas & cantik</small></div>
            <div><CalendarDays size={22} /><b>Easy Booking</b><small>WhatsApp terus</small></div>
          </div>
          <div className="hero-actions only-wa"><a href={bookingLink("booking appointment")}>WhatsApp Booking</a></div>
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
        <div><MessageCircle size={34} /><h2>Nak booking atau tanya dulu?</h2><p>WhatsApp kami sekarang</p></div>
        <a href={bookingLink("booking appointment")}>Chat WhatsApp</a>
      </section>

      <section className="policy-card">
        <h2>Terms & Conditions</h2>
        <p>Extra charge for thick & sensitive hair if any.</p>
        <p>All services not include hair wash / haircut.</p>
        <p>Weekend / P.Holiday extra RM10 per service.</p>
        <p>All prices valid by deposit booking only.</p>
        <p>Not applicable for walk-in customer.</p>
        <a className="tc-link" href={tcLink}>View full T&C</a>
      </section>

      <section className="quick-links">
        <button onClick={() => go("combo")}>Combo Services</button>
        <button onClick={() => go("join")}>Join Us</button>
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
        <a className="main-wa" href={bookingLink(item.booking)}><MessageCircle size={18} /> Saya berminat nak buat {item.title}</a>
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
          <a className="main-wa" href={bookingLink("pertanyaan salon")}><MessageCircle size={18} /> Click Here For WhatsApp</a>
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
        <LocationCard title="Setapak KL" text="Fafa Salon Beauty (Setapak) - Salon Wanita & Muslimah KL" link="https://www.google.com/maps/search/Fafa+Salon+Beauty+Setapak+Salon+Wanita+Muslimah+KL" />
        <LocationCard title="Selayang Batu Caves" text="Fafa Salon Beauty (Selayang) - Salon Wanita & Muslimah" link="https://www.google.com/maps/search/Fafa+Salon+Beauty+Selayang+Salon+Wanita+Muslimah" />
        <div className="location-card muted"><MapPin size={18} /><div><h3>Cheras</h3><p>Coming Soon</p></div></div>
      </div>
    </motion.section>
  );
}

function LocationCard({ title, text, link }) {
  return <div className="location-card"><MapPin size={18} /><div><h3>{title}</h3><p>{text}</p><a href={link}>Open Google Map</a></div></div>;
}

function JoinPage() {
  const [form, setForm] = useState({ name: "", age: "", phone: "", experience: "", skills: "", branch: "", start: "", stay: "", notes: "" });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <motion.section className="page join-page" {...pageMotion}>
      <div className="content-block">
        <span className="kicker">Join Us</span>
        <h2>Apply Hairstylist</h2>
        <p className="lead">Isi form di bawah. Bila tekan submit, semua detail akan terus masuk ke WhatsApp FAFA Salon.</p>
        <div className="job-form">
          <label>Nama penuh<input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Contoh: Nur Aina" /></label>
          <label>Umur<input value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="Contoh: 23 tahun" /></label>
          <label>No. telefon<input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Contoh: 01X-XXXXXXX" /></label>
          <label>Pengalaman kerja salon<textarea value={form.experience} onChange={(e) => update("experience", e.target.value)} placeholder="Contoh: 1 tahun buat rebonding, colour, treatment" /></label>
          <label>Servis yang boleh dibuat<textarea value={form.skills} onChange={(e) => update("skills", e.target.value)} placeholder="Contoh: Hair wash, blow, colour, rebonding, keratin" /></label>
          <label>Branch pilihan<select value={form.branch} onChange={(e) => update("branch", e.target.value)}><option value="">Pilih branch</option><option>Setapak KL</option><option>Selayang Batu Caves</option><option>BTR Cheras</option><option>Mana-mana branch</option></select></label>
          <label>Boleh mula kerja bila?<input value={form.start} onChange={(e) => update("start", e.target.value)} placeholder="Contoh: Segera / 1 Jun" /></label>
          <label>Tempat tinggal<select value={form.stay} onChange={(e) => update("stay", e.target.value)}><option value="">Pilih jawapan</option><option>Ada tempat tinggal sendiri</option><option>Perlukan tempat tinggal</option></select></label>
          <label>Catatan tambahan<textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Contoh: Ada pengalaman salon muslimah / boleh kerja weekend" /></label>
        </div>
        <a className="main-wa" href={applyLink(form)}><MessageCircle size={18} /> Submit Application To WhatsApp</a>
      </div>
    </motion.section>
  );
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
