import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
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
  combo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
};
const salonToolsBg = realImages.homepage;

function bookingLink(service) {
  if (service === "pertanyaan salon") return `https://wa.me/${phone}?text=${encodeURIComponent("Hi FAFA Salon, saya nak buat pertanyaan salon.")}`;
  return bookingChoices.includes(service) ? `#booking?service=${encodeURIComponent(service)}` : "#booking";
}

const services = {
  rebonding: {
    no: "01",
    title: "Rebonding atau Relaxing",
    cardTitle: "Rebonding atau Relaxing",
    short: "Dua pilihan pelurusan untuk rambut lebih kemas dan mudah diurus.",
    visual: "rebonding",
    booking: "Rebonding / Relaxing",
    intro: "Kedua-dua servis membantu meluruskan dan mengemaskan rambut. Pilihan yang sesuai bergantung pada hasil yang diinginkan, keadaan rambut dan sejarah chemical.",
    panels: [
      { title: "Silky Rebonding", text: "Untuk hasil lurus yang lebih jelas, licin dan kemas. Sesuai dipertimbangkan untuk rambut kerinting atau bergelombang yang sukar diurus, selepas pemeriksaan hairstylist. Bahagian rambut yang telah direbonding kekal lurus; akar baharu tumbuh mengikut tekstur asal dan mungkin memerlukan touch-up. Pelurusan menggunakan proses kimia untuk mengubah bentuk rambut. Hasil lebih lurus berbanding rawatan keratin; kesesuaian pada rambut yang pernah colour atau bleach perlu diperiksa dahulu." },
      { title: "Soft Relaxing", text: "Untuk hasil lurus yang lebih natural dan lembut, tanpa kesan terlalu tegang seperti rebonding. Sesuai dipertimbangkan untuk rambut halus atau biasa yang mahu kelihatan lebih kemas. Ketahanan sekitar 3–6 bulan bergantung pada keadaan rambut dan penjagaan harian. Pelurusan yang menyasarkan rupa lebih natural dan tidak terlalu tegang. Tahap pelurusan serta ketahanan berbeza mengikut tekstur dan keadaan rambut." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  keratin: {
    no: "02",
    title: "Keratin",
    cardTitle: "Keratin",
    short: "Anti frizz, lembut & nampak sihat.",
    visual: "keratin",
    booking: "Keratin",
    intro: "Rawatan untuk rambut frizzy, kembang, kering atau ada bekas chemical termasuk rambut colour dan bleach.",
    panels: [
      { title: "Keratin Botox Premium", text: "Sudah tentu pilihan terbaik! Gabungan Anti-Frizz & Repair menjadikan rambut lebih rapi, kemas dan mudah diurus dengan 50% pelurusan. Formula lebih selesa dan tidak pedih seperti Keratin Brazilian. Pilihan untuk pelanggan yang mengutamakan rambut lebih rapi, lembut dan mudah diurus. Ia bukan pengganti rebonding jika mahukan hasil lurus penuh. Hasil sebenar bergantung pada keadaan rambut." },
      { title: "Keratin Brazilian Anti Frizz", text: "Beri sedikit pelurusan dan kekemasan untuk rambut frizzy dan kembang. Fokus mengurangkan rupa frizz dan kembang supaya rambut kelihatan lebih kemas. Ia tidak menjamin rambut lurus sepenuhnya; sesuai dibincangkan jika mahu mengekalkan rupa lebih natural." },
      { title: "Keratin Brazilian Aqua Repair", text: "Sesuai untuk rambut ada bekas chemical, bleach, rosak dan kering. Membantu melembapkan semula rambut rosak. Fokus penjagaan rambut yang kering atau mempunyai sejarah chemical. Rambut yang rapuh perlu diperiksa dahulu; rawatan ini tidak menjamin pemulihan penuh kerosakan rambut." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },
  colour: {
    no: "03",
    title: "Hair Colour",
    cardTitle: "Colour",
    short: "Pilihan colour tanpa bleach, bleach + colour atau highlight + colour.",
    visual: "colour",
    booking: "Colour No Bleach",
    intro: "Pilih servis warna mengikut hasil yang diinginkan. Hairstylist akan semak keadaan dan sejarah rambut sebelum mencadangkan servis yang sesuai.",
    panels: [
      { title: "Colour No Bleach", text: "Pewarnaan tanpa bleach. Hasil warna bergantung pada warna asal dan sejarah pewarnaan rambut. Warna dipilih mengikut asas rambut semasa. Rambut gelap tidak semestinya mendapat tona terang seperti contoh. Colour sahaja tidak semestinya dapat mencerahkan rambut yang pernah diwarnakan hitam." },
      { title: "Bleach + Colour", text: "Proses bleach diikuti pewarnaan untuk pilihan warna yang memerlukan asas rambut lebih cerah. Kesesuaian dinilai oleh hairstylist dahulu. Bleach mencerahkan asas rambut sebelum tona pilihan dimasukkan. Warna sasaran mungkin memerlukan tahap pencerahan berbeza; hairstylist akan menilai kekuatan rambut dan kesesuaian proses dahulu." },
      { title: "Highlight + Colour", text: "Highlight pada bahagian rambut terpilih, diikuti pewarnaan untuk menghasilkan dimensi dan tona warna. Hanya bahagian rambut tertentu dicerahkan untuk mewujudkan dimensi, kemudian ditambah tona warna. Kesan berbeza daripada pewarnaan penuh; bincangkan kedudukan dan tona highlight semasa konsultasi." },
    ],
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
      { title: "Soft Treatment", text: "Fokus rambut. Kurang kusut dan mudah diurus. Kesan biasanya sementara dan perlu ulang rawatan. Fokus pada helaian rambut untuk rasa lebih lembut dan membantu rambut mudah disikat. Ia tidak meluruskan rambut secara kekal. Kesan bergantung pada keadaan rambut dan penjagaan selepas servis." },
      { title: "Scalp Treatment", text: "Fokus kulit kepala. Membersihkan & merawat kulit kepala. Kurangkan kelemumur & kegatalan. Fokus pada pembersihan serta penjagaan kulit kepala. Ia berbeza daripada rawatan untuk helaian rambut dan bukan rawatan perubatan bagi masalah kulit kepala." },
    ],
    time: "Single Service: 11 am - 5.00 pm",
  },

  haircut: {
    no:"05",title:"Hair Cut & Hair Wash",cardTitle:"Hair Cut & Hair Wash",visual:"haircut",walkinOnly:true,
    short:"Potongan dan cucian rambut. Walk-in sahaja.",
    intro:"Tak perlu booking. Boleh walk-in atau mesej 30 minit sebelum datang pada hari yang sama untuk semak kekosongan. Mungkin perlu menunggu giliran.",
    time:"Slot terakhir: Hair Wash 5:30 PM • Hair Cut 6:00 PM",
    panels:[{title:"Hair Cut & Styling",text:"Potongan untuk ubah paras, bentuk, layer atau gaya rambut. Bincangkan gaya dengan hairstylist sebelum mula. Potong banyak walaupun lurus tetap dikira Hair Cut. Mungkin perlu menunggu giliran."},{title:"Hair Wash",text:"Cucian rambut untuk rasa bersih dan segar. Jika mahu tambah potongan atau styling, maklumkan dahulu untuk semakan caj. Mungkin perlu menunggu giliran."}]
  },
  eyelash: {
    no:"06",title:"Eyelash",cardTitle:"Eyelash",visual:"eyelash",walkinOnly:true,
    short:"Pilihan lentikan atau sambungan bulu mata.",
    intro:"Walk-in sahaja, tak perlu booking. Datang sebelum 4:00 petang. Mesej 30 minit sebelum datang pada hari yang sama untuk semak kekosongan. Mungkin perlu menunggu giliran.",
    time:"Walk-in Eyelash: sebelum 4:00 PM",
    panels:[{title:"Eyelash Perm",text:"Melentikkan bulu mata asli supaya nampak lebih terangkat dan kemas, tanpa menambah bulu mata sambungan. Hasil bergantung pada panjang dan keadaan bulu mata asal. Walk-in sebelum 4:00 petang; mungkin perlu menunggu giliran."},{title:"Eyelash Extension",text:"Menambah sambungan pada bulu mata asli untuk nampak lebih panjang dan penuh. Bincangkan gaya natural atau lebih menyerlah sebelum servis. Walk-in sebelum 4:00 petang; mungkin perlu menunggu giliran."}]
  },

};


const combos = {
  combo_rebonding_keratin: {
    no: "C01",
    title: "Rebonding / Relaxing + Keratin Brazilian",
    short: "Lurus lebih kemas + bantu kurangkan frizz.",
    visual: "comboStraight",
    booking: "Rebonding / Relaxing + Keratin Brazilian",
    panels: [
      { title: "Apa yang digabungkan", text: "Rebonding atau relaxing untuk pelurusan, bersama Keratin Brazilian untuk membantu rambut kelihatan lebih rapi dan kurang frizz. Jenis pelurusan serta keratin dipilih selepas pemeriksaan rambut." },
      { title: "Sebelum memilih", text: "Maklumkan sejarah colour, bleach dan chemical. Gabungan hanya diteruskan jika keadaan rambut sesuai; hasil dan susunan proses ditentukan oleh hairstylist." },
      { title: "Sesuai untuk", text: "Customer yang mahu rambut lebih lurus, kemas dan dalam masa yang sama mahu rambut nampak lebih lembut dan kurang frizz." },
      { title: "Nota servis", text: "Hairstylist akan cek keadaan rambut dahulu sama ada lebih sesuai buat rebonding atau relaxing sebelum keratin." },
    ],
  },
  combo_rebonding_colour: {
    no: "C02",
    title: "Rebonding / Relaxing + Colour",
    short: "Kemas + warna lebih menyerlah.",
    visual: "comboColour",
    booking: "Rebonding / Relaxing + Colour",
    panels: [
      { title: "Apa yang digabungkan", text: "Rebonding atau relaxing bersama Colour No Bleach. Pelurusan memberi bentuk lebih kemas, manakala colour menambah tona pada rambut. Pilihan warna rujukan ada di bawah." },
      { title: "Had pilihan colour", text: "Pilihan warna ini merujuk kepada Colour No Bleach. Bleach dan highlight tidak dianggap termasuk dalam combo ini. Sebarang proses tambahan perlu dibincangkan dahulu; kesesuaian gabungan bergantung pada keadaan rambut." },
      { title: "Sesuai untuk", text: "Customer yang mahu rambut nampak lebih kemas dan dalam masa yang sama mahu tambah warna rambut." },
      { title: "Nota servis", text: "Pilihan warna bergantung kepada keadaan rambut, sejarah chemical dan consultation hairstylist." },
    ],
  },
  combo_colour_keratin: {
    no: "C03",
    title: "Colour + Keratin Brazilian",
    short: "Warna cantik + rambut lebih lembut.",
    visual: "comboKeratin",
    booking: "Colour + Keratin Brazilian",
    panels: [
      { title: "Apa yang digabungkan", text: "Colour No Bleach untuk tona rambut, bersama Keratin Brazilian untuk membantu mengurangkan rupa frizz dan menjadikan rambut lebih mudah diurus. Ia tidak memberikan jaminan pelurusan penuh seperti rebonding." },
      { title: "Pemilihan keratin dan warna", text: "Hairstylist akan mencadangkan Anti Frizz atau Aqua Repair berdasarkan keadaan rambut. Pilihan warna rujukan ada di bawah; bleach atau highlight perlu konsultasi berasingan." },
      { title: "Sesuai untuk", text: "Customer yang mahu buat colour dan mahu rambut nampak lebih kemas, lembut dan kurang frizz selepas servis." },
      { title: "Nota servis", text: "Hairstylist akan cek keadaan rambut dan suggest pilihan keratin yang sesuai selepas colour." },
    ],
  },
  combo_soft_scalp: {
    no: "C04",
    title: "Soft + Scalp Treatment",
    short: "Rambut lebih mudah urus + kulit kepala lebih bersih.",
    visual: "comboTreatment",
    booking: "Soft + Scalp Treatment",
    panels: [
      { title: "Apa yang digabungkan", text: "Soft Treatment menjaga helaian rambut supaya lebih lembut dan mudah disikat; Scalp Treatment memfokuskan pembersihan dan penjagaan kulit kepala." },
      { title: "Hasil yang boleh dijangka", text: "Penjagaan rambut dan kulit kepala dalam satu sesi. Tiada pelurusan kekal atau pertukaran warna. Kesan berbeza mengikut keadaan rambut dan rutin penjagaan harian." },
      { title: "Sesuai untuk", text: "Customer yang mahu rawatan ringan untuk rambut dan kulit kepala dalam satu sesi." },
      { title: "Kesan / Manfaat", text: "Soft Treatment fokus pada rambut supaya kurang kusut, manakala Scalp Treatment fokus membersihkan dan menyegarkan kulit kepala." },
    ],
  },
};

const nav = [
  ["rebonding", "Rebonding atau Relaxing"],
  ["keratin", "Keratin"],
  ["colour", "Colour"],
  ["treatment", "Treatment"],
  ["combo", "Combo"],
];

const pageMotion = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -18, filter: "blur(8px)" },
  transition: { duration: 0.42, ease: "easeOut" },
};

function pageFromHash() {
  const target = window.location.hash.slice(1).split('?')[0];
  return ['home', 'booking', 'contact', 'location', 'combo', ...Object.keys(services), ...Object.keys(combos)].includes(target) ? target : 'home';
}

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleHash = () => {
      setPage(pageFromHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const current = services[page];
  const currentCombo = combos[page];

  const go = (target) => {
    const nextHash = target === 'home' ? '' : `#${target}`;
    if (window.location.hash !== nextHash) window.history.pushState(null, '', window.location.pathname + window.location.search + nextHash);
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="phone-frame">
        <Header page={page} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({top:0,behavior:"instant"})}>
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
        .home-page .hero{min-height:0;height:auto;align-items:flex-start;padding:18px 22px 16px}
        .home-page .hero-content{width:100%;min-width:0}
        .home-page .hero-logo-frame{position:relative;width:min(100%,260px);aspect-ratio:3.15;overflow:hidden;margin:0 auto 10px}
        .home-page .hero-logo-frame .hero-logo{position:absolute;width:100%;max-width:none;height:auto;left:0;top:50%;transform:translateY(-51.2%);margin:0;display:block}
        .home-page .hero .kicker{display:block;text-align:center;font-size:9px;letter-spacing:2px}
        .home-page .hero-content{text-align:center}
        .home-page .hero h1.salon-headline{font-family:"Playfair Display",Georgia,serif;font-size:clamp(27px,7.8vw,34px);font-weight:800;line-height:1.08;letter-spacing:-.5px;margin:10px 0 12px;color:#fff}
        .home-page .salon-headline span,.home-page .salon-headline em{display:block}
        .home-page .salon-headline em{font-style:normal;color:#ff66a9}
        .home-page .hero p.salon-intro{max-width:none;color:#f4edf2;font-size:13px;line-height:1.6;margin:0}
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
          <div className="hero-logo-frame"><img className="hero-logo" src="/assets/fafa-logo.png" alt="FAFA Salon Beauty Centre" /></div>
          <span className="kicker">Your Beauty, Our Passion</span>
          <h1 className="salon-headline"><span>SALON PILIHAN</span><span>WANITA DAN</span><em>MUSLIMAH</em></h1>
          <p className="salon-intro">Tampil cantik dan berkeyakinan, dengan ruang menunggu selesa untuk suami &amp; anak, lengkap dengan TV (Netflix &amp; YouTube) serta WiFi percuma!</p>
        </motion.div>
      </section>

      <section className="services-section category-menu" aria-label="Pilih kategori servis">
        <style>{`
          .category-menu{padding:18px 18px 20px;background:#17121b}
          .category-menu .section-heading h2{font-size:25px;margin:6px 0 8px;color:white}
          .category-menu p{text-align:center;color:#dbc6d4;font-size:13px;line-height:1.6;margin:0 0 12px}
          .category-buttons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
          .category-button{min-height:82px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:7px;padding:12px 8px;border:1px solid #fa80b68c;border-radius:20px;background:linear-gradient(140deg,#452039,#251c2d);color:#fff;cursor:pointer;font:inherit;font-size:15px;font-weight:800;text-align:center;line-height:1.4}
          .category-button svg{color:#ff98c9}
          .category-button:focus-visible{outline:3px solid #ff98c9;outline-offset:3px}
        `}</style>
        <div className="section-heading center"><span>Our Services</span><h2>Perkhidmatan Kami</h2></div>
        <p>Tekan kategori untuk lihat detail servis dan maklumat lanjut.</p>
        <div className="category-buttons">{Object.entries(services).map(([id,item]) => <button type="button" key={id} className="category-button" onClick={() => go(id)}><ServiceIcon type={id} /><span>{item.cardTitle}</span></button>)}</div>
      </section>

      <section style={{padding:"0 22px 28px",background:"#17121b"}}>
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
      </section>

      <section className="quick-links">
        <button onClick={() => go("contact")}>Contact Us</button>
        <button onClick={() => go("location")}>Our Location</button>
        <a className="footer-tc" href={tcLink}>View Full T&amp;C</a>
        <style>{`.quick-links button,.quick-links .footer-tc{font-family:inherit;font-size:14px;font-weight:900;line-height:1.4}.quick-links .footer-tc{display:flex;align-items:center;justify-content:center;padding:16px;border-radius:18px;background:#171722;border:1px solid rgba(255,255,255,.12);color:white;text-align:center;text-decoration:none}`}</style>
      </section>
    </motion.section>
  );
}

function ServicePage({ item, go }) {
  useLayoutEffect(() => { window.scrollTo({top:0,behavior:"instant"}); }, [item.title]);
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
        <h3 style={{color:"#8b1744",marginTop:24}}>{item.walkinOnly ? "Walk-in sahaja • Tak perlu booking" : "Single Services"}</h3>
        <ServiceCategories item={item} />
        {!item.walkinOnly && <p className="lead" style={{marginTop:20}}>Hairstylist akan cek keadaan rambut dan cadangkan servis yang sesuai.</p>}
        {!item.walkinOnly && <div style={{marginTop:28}}><ComboSpotlight go={go} service={item.visual} /></div>}
      </section>
    </motion.section>
  );
}

function ComboSpotlight({ go, service }) {
  const related = {
    rebonding: ["combo_rebonding_keratin", "combo_rebonding_colour"],
    keratin: ["combo_rebonding_keratin", "combo_colour_keratin"],
    colour: ["combo_rebonding_colour", "combo_colour_keratin"],
    treatment: ["combo_soft_scalp"],
  };
  const ids = related[service] || ["combo_rebonding_keratin", "combo_rebonding_colour", "combo_colour_keratin"];
  return <aside className="combo-spotlight" aria-label="Cadangan Combo Services">
    <style>{`
      .combo-spotlight{margin:0 0 26px;padding:24px 20px;background:linear-gradient(145deg,#4d1231,#251627);border:2px solid #fa71b1;border-radius:26px;color:#fff;box-shadow:0 12px 32px #b92b6b24}
      .content-block .combo-spotlight{margin-top:24px}
      .combo-spotlight .combo-label{display:inline-flex;align-items:center;gap:7px;color:#ffd4e8;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase}
      .combo-spotlight h2,.content-block .combo-spotlight h2{font-family:inherit;font-size:30px;line-height:1.15;margin:12px 0;color:white;font-weight:900}
      .combo-spotlight .combo-pitch{font-size:18px;font-weight:800;line-height:1.5;margin:0 0 8px;color:#ffb7d8}
      .combo-spotlight .combo-description{font-size:14px;line-height:1.7;color:#f2deea;margin:0 0 12px}
      .combo-spotlight .combo-suggestion{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;padding:14px;margin-top:9px;border:1px solid #ffffff40;background:#ffffff0d;border-radius:14px;color:white;font:inherit;font-size:14px;font-weight:700;line-height:1.5;cursor:pointer}
      .combo-spotlight .combo-all{width:100%;display:flex;justify-content:center;align-items:center;gap:8px;margin-top:18px;padding:16px;border:0;border-radius:16px;background:linear-gradient(120deg,#e84d96,#ff7cba);color:#fff;font:inherit;font-size:16px;font-weight:900;cursor:pointer}
      .combo-spotlight button:focus-visible{outline:3px solid #fff;outline-offset:3px}
    `}</style>
    <span className="combo-label"><Sparkles size={17} aria-hidden="true" /> Gabungkan servis pilihan anda</span>
    <h2>COMBO SERVICES</h2>
    <p className="combo-pitch">Lebih berbaloi, dua servis dalam satu sesi.</p>
    <p className="combo-description">{service === "rebonding" ? "Dah nak buat rebonding atau relaxing? Lengkapkan dengan keratin atau colour untuk gaya yang anda inginkan." : service === "keratin" ? "Nak rambut lebih kemas sambil tambah warna atau pelurusan? Terokai gabungan servis keratin." : service === "colour" ? "Dah pilih colour? Gabungkan dengan keratin atau pelurusan untuk lengkapkan gaya rambut anda." : service === "treatment" ? "Jaga rambut dan kulit kepala sekali dengan gabungan Soft + Scalp Treatment." : "Nak luruskan rambut sekali dengan colour atau keratin? Lihat pilihan gabungan sebelum pilih servis anda."}</p>
    {ids.map(id => <button type="button" key={id} className="combo-suggestion" onClick={() => go(id)}><span>{combos[id].title}</span><ChevronRight size={19} style={{flexShrink:0}} aria-hidden="true" /></button>)}
    <button type="button" className="combo-all" onClick={() => go("combo")}>Lihat Semua Combo <ChevronRight size={20} aria-hidden="true" /></button>
  </aside>;
}

function NoBleachPalette() {
  const groups = [{title:"Brown Natural",indices:[0,4,5]},{title:"Ash Brown",indices:[1]},{title:"Maroon",indices:[2,3]}];
  return <div><p style={{marginTop:12}}>Pilihan warna tanpa bleach. Hasil bergantung pada warna asal, sejarah pewarnaan dan keadaan rambut. Warna rujukan ini tidak menjamin hasil yang sama pada setiap rambut.</p>
    {groups.map(group => <div key={group.title}><h3>{group.title}</h3><div className="colour-board">{group.indices.map(i => <div className={`colour-chip c${i}`} key={i}><span>{services.colour.colours[i]}</span></div>)}</div></div>)}
    <p style={{marginTop:16,fontSize:12}}>Paparan tona sebagai rujukan sahaja. Rambut yang pernah diwarnakan hitam perlu dinilai dahulu. Nyatakan warna yang diminati dalam nota booking dan sahkan dengan hairstylist.</p>
  </div>;
}

function ServiceCategories({ item, categories }) {
  const [openCategory, setOpenCategory] = useState(null);
  return <div className="colour-categories">
    <style>{`
      .colour-category{margin-top:14px;border:1px solid #edbad1;border-radius:22px;background:#fff;overflow:hidden;box-shadow:0 12px 26px rgba(120,40,80,.06)}
      .colour-category-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px;text-align:left;background:#fff3f8;border:0;color:#8b1744;cursor:pointer;font:inherit}
      .colour-category-toggle strong{display:block;font-size:18px;line-height:1.4}
      .colour-category-toggle small{display:block;margin-top:5px;color:#715664;font-size:12px;line-height:1.5}
      .colour-category-toggle:focus-visible{outline:3px solid #db3984;outline-offset:-4px}
      .colour-category-content{padding:20px;color:#513d48}
      .colour-category-content p{font-size:14px;line-height:1.75;margin:0 0 14px;color:#68515e}
      .colour-category-content h3{font-size:15px;color:#8b1744;margin:22px 0 0}
      .colour-category-content .colour-board{margin-top:12px;grid-template-columns:repeat(2,minmax(0,1fr))}
      .colour-category-content .colour-chip{min-height:104px;padding:12px;border-radius:16px;font-size:13px;text-shadow:0 1px 5px #000}
      .colour-category-content .main-wa{margin-top:22px}
    `}</style>
    {(categories || item.panels.filter(panel => panel.title !== "Mana satu sesuai untuk anda?")).map((category, index) => {
      const isOpen = openCategory === category.title;
      return <section className="colour-category" key={category.title}>
        <button type="button" className="colour-category-toggle" aria-expanded={isOpen} aria-controls={`colour-category-${index}`} onClick={event => {
          const trigger = event.currentTarget;
          setOpenCategory(isOpen ? null : category.title);
          if (!isOpen) requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!trigger.isConnected) return;
            const header = document.querySelector('.top-nav');
            const offset = (header?.getBoundingClientRect().height || 0) + 16;
            window.scrollTo({top:Math.max(0,window.scrollY + trigger.getBoundingClientRect().top - offset),behavior:"smooth"});
          }));
        }}>
          <span><strong>{category.title}</strong><small>{isOpen ? "Tutup detail" : item.visual === "colour" ? "Tekan untuk lihat pilihan warna & detail" : "Tekan untuk lihat detail servis"}</small></span>
          <ChevronRight size={20} aria-hidden="true" style={{flexShrink:0, transform:isOpen ? "rotate(90deg)" : undefined}} />
        </button>
        {isOpen && <div className="colour-category-content" id={`colour-category-${index}`}>
          {category.text && <p>{category.text}</p>}
          {category.panels && category.panels.map(panel => <div key={panel.title}><h3>{panel.title}</h3><p style={{marginTop:8}}>{panel.text}</p></div>)}
          {item.visual === "colour" && (index === 0 ? <>
            <NoBleachPalette />
          </> : <><h3>Pilihan Warna {category.title}</h3><p style={{marginTop:10}}>Pilihan tona warna akan ditentukan bersama hairstylist selepas semakan keadaan rambut dan hasil yang diinginkan. Boleh nyatakan warna pilihan dalam nota booking.</p></>)}
          {item.visual === "combo" && /Colour/.test(category.title) && <><h3>Pilihan Warna Colour No Bleach</h3><NoBleachPalette /></>}
          {!item.walkinOnly && <a className="main-wa" href={bookingLink(category.booking || category.title)}><MessageCircle size={18} /> Saya berminat nak buat {category.title}</a>}
        </div>}
      </section>;
    })}
  </div>;
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

        <ServiceCategories item={{visual:"combo"}} categories={Object.values(combos).map(combo => ({title:combo.title,text:combo.short,panels:combo.panels,booking:combo.booking}))} />
      </section>
    </motion.section>
  );
}

function ComboDetailPage({ item, go }) {
  useLayoutEffect(() => { window.scrollTo({top:0,behavior:"instant"}); }, [item.title]);
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

        <ServiceCategories item={{visual:"combo"}} categories={[{title:item.title,panels:item.panels,booking:item.booking}]} />
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
  if (type === "eyelash") return <Eye size={18} />;
  if (type === "rebonding") return <Scissors size={18} />;
  if (type === "relaxing") return <Wand2 size={18} />;
  if (type === "keratin") return <Sparkles size={18} />;
  if (type === "colour") return <Sparkles size={18} />;
  if (type === "treatment") return <ShieldCheck size={18} />;
  return <Scissors size={18} />;
}

function ServiceVisual({ type, compact = false }) {
  if (type === "eyelash") return <div className="real-service-visual" style={{minHeight:280,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#501c3c,#17121b)",color:"#ff9bcb"}}><Eye size={110} aria-hidden="true" /></div>;
  const imageMap = {
    haircut: realImages.combo,
    hairwash: realImages.treatment,
    rebonding: realImages.rebonding,
    relaxing: realImages.relaxing,
    keratin: realImages.keratin,
    colour: realImages.colour,
    treatment: realImages.treatment,
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
      comboTreatment: [realImages.treatment, realImages.combo],
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
  return <div className="bottom-bar"><button onClick={() => go("home")}><Home size={16} /> Home</button>{!current?.walkinOnly && <a href={href}><MessageCircle size={16} /> Book Now</a>}</div>;
}

const comboBookingChoices = Object.values(combos).map(item => item.booking);
const singleBookingChoices = [
  'Silky Rebonding', 'Soft Relaxing',
  'Keratin Brazilian Anti Frizz', 'Keratin Brazilian Aqua Repair', 'Keratin Botox Premium',
  'Colour No Bleach', 'Bleach + Colour', 'Highlight + Colour',
  'Soft Treatment', 'Scalp Treatment',
];
const otherBookingChoice = 'Lain-lain / Perlukan nasihat';
const bookingChoices = [...comboBookingChoices, ...singleBookingChoices, otherBookingChoice];
function allowsCut(service) { return service !== otherBookingChoice; }
const lengthChoices = ['1 — Sebahu', '2 — Ketiak–atas bra line', '3 — Bawah bra line–atas pinggang', '4 — Bawah pinggang'];
const hairCheckNote = 'Hairstylist akan memeriksa paras dan ketebalan rambut sebenar.';
function malaysiaToday() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = type => parts.find(p => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
function initialBookingServices() {
  const requested = new URLSearchParams(window.location.hash.split('?')[1] || '').get('service');
  return bookingChoices.includes(requested) ? [requested] : [];
}
function BookingPage({ go }) {
  const [selected, setSelected] = useState(initialBookingServices);
  const [wantCut, setWantCut] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', branch: '', date: '', time: '', length: '', cutLength: '', thickness: '', notes: '' });
  const [error, setError] = useState('');
  const update = (key, value) => { setForm(prev => ({ ...prev, [key]: value })); };
  const canAddCut = selected.some(allowsCut);
  const hasCut = canAddCut && wantCut;
  const today = malaysiaToday();
  const isCombo = selected.some(item => comboBookingChoices.includes(item)) || selected.length > 1;
  const end = isCombo ? 15.5 : 17;
  const times = [];
  for (let value = 11; value <= end; value += 0.5) {
    const hour = Math.floor(value);
    times.push(`${hour > 12 ? hour - 12 : hour}:${value % 1 ? '30' : '00'} ${hour >= 12 ? 'PM' : 'AM'}`);
  }
  const toggle = item => {
    const next = selected.includes(item) ? selected.filter(value => value !== item) : [...selected, item];
    setSelected(next); setError('');
    if (!next.some(allowsCut)) { setWantCut(false); setForm(prev => ({...prev, cutLength: ''})); }
    setForm(prev => ({ ...prev, time: '' }));
  };
  const dateLabel = form.date ? new Date(`${form.date}T12:00:00`).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
  const message = [
    'Hi FAFA Salon! Saya nak semak harga & kekosongan slot.', '',
    `Nama: ${form.name.trim()}`, `No. telefon: ${form.phone.trim()}`,
    `Cawangan: ${form.branch}`, `Servis: ${selected.join(' + ')}`,
    ...(hasCut ? [`Add-on Hair Cut: potong ke paras ${form.cutLength}`] : []),
    `Tarikh pilihan: ${dateLabel}`, `Masa pilihan: ${form.time}`,
    `Panjang rambut sekarang${hasCut ? " (sebelum potong)" : ""}: ${form.length}`, `Ketebalan: ${form.thickness}`,
    `Nota: ${form.notes.trim() || '-'}`, '', hairCheckNote, '',
    'Mohon admin berikan harga dan sahkan slot. Saya faham tempahan belum disahkan dan deposit RM30 seorang hanya dibayar selepas pengesahan admin.',
  ].join('\n');
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const validate = element => {
    const node = element.closest('form');
    if (!selected.length) { setError('Sila pilih sekurang-kurangnya satu servis.'); node.querySelector('input[type=checkbox]').focus(); return false; }
    if (!node.reportValidity()) { setError('Sila lengkapkan semua ruangan wajib dan tandakan persetujuan.'); return false; }
    if (form.date < today) { setError('Sila pilih tarikh hari ini atau selepasnya.'); return false; }
    if (!times.includes(form.time)) { setError('Sila pilih semula masa mengikut servis.'); return false; }
    setError(''); return true;
  };
  const renderChoice = item => (
    <div className={`booking-service-item ${item === otherBookingChoice ? 'booking-other' : ''}`} key={item}>
      <label className={`booking-choice ${selected.includes(item) ? 'selected' : ''}`}><input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} /><span>{item}</span></label>

    </div>
  );
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
        .booking-page .booking-services{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;align-items:start}
        .booking-page .booking-group-title{color:#ff80b8;font:700 14px system-ui;margin:22px 0 12px}
        .booking-page .booking-service-item{min-width:0}
        .booking-page .booking-choice{height:100%}
        .booking-page .booking-other{grid-column:1/-1;width:min(100%,280px);justify-self:center;margin-top:5px}
        .booking-page .booking-other .booking-choice{justify-content:center;text-align:center}
        .booking-page .booking-addons{margin-top:7px;padding:11px 9px;background:#291b27;border:1px solid #714361;border-radius:12px;display:grid;gap:10px;color:#fff;font-size:12px;line-height:1.5}
        .booking-page .booking-cut-card{margin-top:22px;padding:16px;border-radius:16px;background:#1b1420;border:1px solid #714361}
        .booking-page .booking-cut-card.active{border-color:#ff79b4;background:#291b27}
        .booking-page .booking-cut-toggle{gap:12px;align-items:flex-start;font-size:14px}
        .booking-page .booking-cut-toggle strong{display:block;font-size:15px;color:#fff}
        .booking-page .booking-cut-toggle small{display:block;color:#d1c4ce;font-weight:400;line-height:1.6;margin-top:4px}
        .booking-page .booking-cut-target{border-top:1px solid #714361;margin-top:8px;padding-top:18px}
        .booking-page .booking-cut-target label.booking-field{display:grid;gap:10px}
        .booking-page .booking-addon-title{color:#ff99c9;font-size:11px;font-weight:700}
        .booking-page .booking-addons label{display:flex;gap:7px;align-items:flex-start;cursor:pointer}
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
            <h3 className="booking-group-title">Combo Services</h3>
            <div className="booking-services">{comboBookingChoices.map(renderChoice)}</div>
            <h3 className="booking-group-title">Single Services</h3>
            <div className="booking-services">{singleBookingChoices.map(renderChoice)}{renderChoice(otherBookingChoice)}</div>
            {canAddCut && <div className={`booking-addons booking-cut-card ${hasCut ? 'active' : ''}`}>
              <label className="booking-cut-toggle"><input type="checkbox" checked={wantCut} onChange={event => { const checked = event.target.checked; setWantCut(checked); if (!checked) update('cutLength', ''); }} /><span><strong>Add-on Hair Cut</strong><small>Tambah potongan rambut untuk servis pilihan anda.</small></span></label>
              {hasCut && <div className="booking-cut-target">
                <label className="booking-field">Nak potong ke paras mana? *<select required value={form.cutLength} onChange={event => update('cutLength', event.target.value)}><option value="">Pilih paras selepas dipotong</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
                <p className="booking-note" style={{marginTop: 10}}>Pilih paras rambut yang diinginkan selepas dipotong. Hairstylist akan sahkan potongan semasa konsultasi.</p>
              </div>}
            </div>}
            <p className="booking-notice" style={{marginTop: 18, marginBottom: 0}}><strong>Hair Cut &amp; Hair Wash</strong><br />Untuk walk-in sahaja dan tidak memerlukan booking. Sila WhatsApp 30 minit sebelum datang untuk semakan kekosongan.</p>
          </fieldset>
          <fieldset>
            <legend>02 / CAWANGAN & WAKTU</legend>
            <div className="booking-fields">
              <label className="booking-field">Cawangan *<select value={form.branch} required onChange={event => update('branch', event.target.value)}><option value="">Pilih cawangan</option><option>Setapak, Kuala Lumpur</option><option>Selayang, Batu Caves</option></select></label>
              <label className="booking-field">Tarikh pilihan *<input type="date" required min={today} value={form.date} onChange={event => update('date', event.target.value)} /></label>
              <label className="booking-field">Masa pilihan *<select value={form.time} required onChange={event => update('time', event.target.value)}><option value="">Pilih masa</option>{times.map(time => <option key={time}>{time}</option>)}</select></label>
            </div>
            <p className="booking-note">Slot tertakluk pada kekosongan. Admin akan sahkan waktu mengikut servis dan jadual cawangan.</p>
          </fieldset>
          <fieldset>
            <legend>03 / MAKLUMAT ANDA</legend>
            <div className="booking-fields">
              <label className="booking-field">Nama penuh *<input required maxLength={100} autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} placeholder="Nama anda" /></label>
              <label className="booking-field">No. telefon / WhatsApp *<input required type="tel" minLength={9} maxLength={20} autoComplete="tel" value={form.phone} onChange={event => update('phone', event.target.value)} placeholder="Contoh: 0123456789" /></label>
              <label className="booking-field">Panjang rambut sekarang{hasCut ? " (sebelum potong)" : ""} *<select required value={form.length} onChange={event => update('length', event.target.value)}><option value="">Pilih paras rambut</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
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
