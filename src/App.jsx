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
  if (service === "pertanyaan salon") return `https://wa.me/${phone}?text=${encodeURIComponent("Hi FAFA Salon, saya ingin membuat pertanyaan mengenai:\n\n[Tulis pertanyaan anda dengan lengkap di sini sebelum menghantar mesej.]")}`;
  return bookingChoices.includes(service) ? `#booking?service=${encodeURIComponent(service)}` : "#booking";
}

const services = {
  rebonding: {
    no: "01",
    title: "Rebonding atau Relaxing",
    cardTitle: "Rebonding atau Relaxing",
    short: "Dua pilihan pelurusan untuk rambut lebih kemas dan mudah diurus.",
    visual: "rebonding",
    booking: "Silky Rebonding / Soft Relaxing",
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
    title: "Silky Rebonding / Soft Relaxing + Keratin Brazilian",
    short: "Lurus lebih kemas + bantu kurangkan frizz.",
    visual: "comboStraight",
    booking: "Silky Rebonding / Soft Relaxing + Keratin Brazilian",
    panels: [
      { title: "Apa yang digabungkan", text: "Rebonding atau relaxing untuk pelurusan, bersama Keratin Brazilian untuk membantu rambut kelihatan lebih rapi dan kurang frizz. Jenis pelurusan serta keratin dipilih selepas pemeriksaan rambut." },
      { title: "Sebelum memilih", text: "Maklumkan sejarah colour, bleach dan chemical. Gabungan hanya diteruskan jika keadaan rambut sesuai; hasil dan susunan proses ditentukan oleh hairstylist." },
      { title: "Sesuai untuk", text: "Customer yang mahu rambut lebih lurus, kemas dan dalam masa yang sama mahu rambut nampak lebih lembut dan kurang frizz." },
      { title: "Nota servis", text: "Hairstylist akan cek keadaan rambut dahulu sama ada lebih sesuai buat rebonding atau relaxing sebelum keratin." },
    ],
  },
  combo_rebonding_colour: {
    no: "C02",
    title: "Silky Rebonding / Soft Relaxing + Colour",
    short: "Kemas + warna lebih menyerlah.",
    visual: "comboColour",
    booking: "Silky Rebonding / Soft Relaxing + Colour",
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
  return ['home', 'booking', 'contact', 'location', 'walkin', 'reviews', 'combo', ...Object.keys(services), ...Object.keys(combos)].includes(target) ? target : 'home';
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
          {page === "walkin" && <WalkInPage key="walkin" />}
          {page === "reviews" && <ReviewsPage key="reviews" />}
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

function PaymentLogo({src,name}) {
  const [failed,setFailed] = useState(false);
  return failed ? <span style={{fontSize:12,fontWeight:800,color:"#352a33"}}>{name}</span> : <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />;
}

function PromoNote() {
  return <p style={{fontSize:11,lineHeight:1.5,fontWeight:400,margin:"8px 0 0",opacity:.75,textAlign:"center"}}>Harga promo terkini tertakluk pada terma dan syarat.</p>;
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
        .home-page .payment-methods{margin:12px 0 20px;padding:22px 16px;background:#fff;border-radius:20px;color:#231a22}
        .home-page .payment-heading{color:#ff80b8;font-size:11px;letter-spacing:2px;font-weight:800;text-transform:uppercase;margin:0 0 14px}
        .home-page .payment-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px 12px;list-style:none;margin:0;padding:0}
        .home-page .payment-item{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:8px;min-width:0;padding:0;background:none;border:0;border-radius:0;color:#fff;text-align:center}
        .home-page .payment-brand{height:48px;width:100%;display:flex;align-items:center;justify-content:center;gap:7px;color:#47313e}
        .home-page .payment-brand img{display:block;width:100%;max-width:110px;max-height:48px;object-fit:contain}
        .home-page .payment-brand.cards img{max-width:43px;max-height:30px}
        .home-page .payment-item b{color:#352a33;font-size:12px;line-height:1.4;font-weight:600}
        .home-page .payment-heading{text-align:center;color:#8b1744;margin-bottom:20px}
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
          <p className="salon-intro">Tampil lebih cantik dan berkeyakinan. Nikmati ruang menunggu yang selesa dilengkapi TV dan WiFi percuma! Ruang rambut dan ruang menunggu yang berasingan untuk menjaga privasi pelanggan Wanita &amp; Muslimah</p>
        </motion.div>
      </section>

      <section className="services-section category-menu" aria-label="Pilih kategori servis">
        <style>{`
          .category-menu{padding:18px 18px 20px;background:#17121b}
          .category-menu .section-heading h2{font-size:25px;margin:6px 0 8px;color:white}
          .category-menu p{text-align:center;color:#dbc6d4;font-size:13px;line-height:1.6;margin:0 0 12px}
          .category-buttons{display:grid;grid-template-columns:1fr;gap:10px}
          .category-button{min-height:56px;display:flex;align-items:center;justify-content:flex-start;flex-direction:row;gap:12px;padding:14px 18px;border:1px solid #fa80b68c;border-radius:20px;background:linear-gradient(140deg,#452039,#251c2d);color:#fff;cursor:pointer;font:inherit;font-size:15px;font-weight:800;text-align:center;line-height:1.4}
          .category-button svg{color:#ff98c9}
          .category-button:focus-visible{outline:3px solid #ff98c9;outline-offset:3px}
        `}</style>
        <div className="section-heading center"><span>Our Services</span><h2>Perkhidmatan Kami</h2></div>
        <p>Tekan kategori untuk lihat detail servis dan maklumat lanjut.</p>
        <div className="category-buttons">{Object.entries(services).map(([id,item]) => <div key={id}><button type="button" style={{width:"100%"}} className="category-button" onClick={() => go(id)}><ServiceIcon type={id} /><span style={{flex:1,textAlign:"left"}}>{item.cardTitle}</span><ChevronRight size={18} aria-hidden="true" /></button></div>)}</div>
      </section>

      <section style={{padding:"0 22px 28px",background:"#17121b"}}>
          <section className="payment-methods" aria-label="Kaedah bayaran">
            <h2 className="payment-heading">Payment Methods</h2>
            <ul className="payment-grid">
              <li className="payment-item"><div className="payment-brand cards"><PaymentLogo name="Visa" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA2MCA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDAuNTcxNDExKSIgZmlsbD0id2hpdGUiLz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI5MjdfMjIzNTYpIj4KPHBhdGggZD0iTTM4Ljc2ODggMjEuMzUwNkMzNC42NTQ3IDIxLjM1MDYgMzAuOTc4MSAyMy41MDE0IDMwLjk3ODEgMjcuNDc1MkMzMC45NzgxIDMyLjAzMjQgMzcuNDk4NiAzMi4zNDcxIDM3LjQ5ODYgMzQuNjM2NUMzNy40OTg2IDM1LjYwMDUgMzYuNDAzNCAzNi40NjM0IDM0LjUzMjcgMzYuNDYzNEMzMS44Nzc5IDM2LjQ2MzQgMjkuODkzNiAzNS4yNTc3IDI5Ljg5MzYgMzUuMjU3N0wyOS4wNDQ2IDM5LjI2NzdDMjkuMDQ0NiAzOS4yNjc3IDMxLjMzMDQgNDAuMjg2MSAzNC4zNjUyIDQwLjI4NjFDMzguODYzMiA0MC4yODYxIDQyLjQwMjYgMzguMDI5NyA0Mi40MDI2IDMzLjk4OEM0Mi40MDI2IDI5LjE3MjUgMzUuODU0OSAyOC44NjcxIDM1Ljg1NDkgMjYuNzQyMkMzNS44NTQ5IDI1Ljk4NzEgMzYuNzU0IDI1LjE1OTcgMzguNjE5NCAyNS4xNTk3QzQwLjcyNCAyNS4xNTk3IDQyLjQ0MTEgMjYuMDM2NiA0Mi40NDExIDI2LjAzNjZMNDMuMjcyIDIyLjE2MzZDNDMuMjcyIDIyLjE2MzYgNDEuNDAzNyAyMS4zNTA2IDM4Ljc2ODggMjEuMzUwNlpNMS4xMjg2NyAyMS42NDI5TDEuMDI5MDUgMjIuMjI3NUMxLjAyOTA1IDIyLjIyNzUgMi43NTk4NyAyMi41NDcgNC4zMTg3NCAyMy4xODQ0QzYuMzI1OTMgMjMuOTE1MiA2LjQ2ODkxIDI0LjM0MDYgNi44MDY5NSAyNS42NjIxTDEwLjQ5MDYgMzkuOTg0N0gxNS40Mjg1TDIzLjAzNTggMjEuNjQyOUgxOC4xMDkyTDEzLjIyMTEgMzQuMTEzNkwxMS4yMjY0IDIzLjU0MjlDMTEuMDQzNSAyMi4zMzMxIDEwLjExNjkgMjEuNjQyOSA4Ljk4MjcyIDIxLjY0MjlIMS4xMjg2N1pNMjUuMDE2OCAyMS42NDI5TDIxLjE1MjEgMzkuOTg0N0gyNS44NUwyOS43MDEyIDIxLjY0MjlIMjUuMDE2OFpNNTEuMjE4OSAyMS42NDI5QzUwLjA4NiAyMS42NDI5IDQ5LjQ4NTggMjIuMjU0NyA0OS4wNDU0IDIzLjMyMzdMNDIuMTYyNiAzOS45ODQ3SDQ3LjA4OTJMNDguMDQyNCAzNy4yMDc5SDU0LjA0NDRMNTQuNjI0IDM5Ljk4NDdINTguOTcxMUw1NS4xNzg3IDIxLjY0MjlINTEuMjE4OVpNNTEuODU5NiAyNi41OTgzTDUzLjMxOTkgMzMuNDgxSDQ5LjQwNzZMNTEuODU5NiAyNi41OTgzWiIgZmlsbD0iIzE0MzRDQiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzI5MjdfMjIzNTYiPgo8cmVjdCB3aWR0aD0iNTgiIGhlaWdodD0iMzkiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDExLjU3MTQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" /><PaymentLogo name="Mastercard" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNjAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+TWFzdGVyY2FyZDwvdGl0bGU+CiAgICA8ZyBpZD0iTG9nbyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hc3RlcmNhcmQiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiPjwvcmVjdD4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOC44ODU1MDg0NiwzNS42NDM5ODA2IEM4LjczOTc1NTQsMzUuNDk3ODI1NCA4LjU2Njg2MjEyLDM1LjM4NDIzODYgOC4zNjY2Mjc1OCwzNS4zMDMyMiBDOC4xNjYzOTMwMywzNS4yMjIyMDE0IDcuOTQ3MDU5ODEsMzUuMTgxNTkxNiA3LjcwOTAyOTk5LDM1LjE4MTU5MTYgQzcuNTgyOTc4NzIsMzUuMTgxNTkxNiA3LjQ1MjEwMjUzLDM1LjE5MjQ0NzYgNy4zMTYyMDAzNywzNS4yMTQxNTk4IEM3LjE4MDI5ODIxLDM1LjIzNTg3MiA3LjA0NzQxMTYzLDM1LjI3NDI3MDQgNi45MTcxMzg1NSwzNS4zMjkxNTQgQzYuNzg2ODY1NDcsMzUuMzg0MjM4NiA2LjY2MjgyNDU5LDM1LjQ2MDIzMTIgNi41NDUyMTY5NSwzNS41NTcxMzE4IEM2LjQyNzYwOTMxLDM1LjY1NDIzMzUgNi4zMjUyODA2MiwzNS43NzY0NjUxIDYuMjM4NjMyOTQsMzUuOTI0MDI3NSBDNi4wOTg1MDg5NiwzNS42OTI0MzA5IDUuOTA4NzI4NDMsMzUuNTEwODkyOSA1LjY2OTI5MTM0LDM1LjM3OTIxMjYgQzUuNDI5ODU0MjUsMzUuMjQ3NTMyMiA1LjE1NTgzODUsMzUuMTgxNTkxNiA0Ljg0Nzg0NzIxLDM1LjE4MTU5MTYgQzQuNzQ0MTExMjQsMzUuMTgxNTkxNiA0LjYzNzE1ODY1LDM1LjE5MTA0MDQgNC41MjYzODYzMywzNS4yMDk3MzcgQzQuNDE1ODE1MDQsMzUuMjI4NjM0NiA0LjMwNTg0Njg4LDM1LjI2MTIwMjkgNC4xOTY2ODI4NiwzNS4zMDc0NDE4IEM0LjA4NzMxNzgxLDM1LjM1Mzg4MTcgMy45ODI5Nzg3MiwzNS40MTY4MDY4IDMuODgzNjY1NjEsMzUuNDk2NDE4MiBDMy43ODQxNTE0NSwzNS41NzYwMjk1IDMuNjkzODg1MDcsMzUuNjc2NTQ4OCAzLjYxMjY2NTQ0LDM1Ljc5ODE3NzIgTDMuNjEyNjY1NDQsMzUuMjkwMTUyNSBMMi43Mzg3NTAyMSwzNS4yOTAxNTI1IEwyLjczODc1MDIxLDM5LjQ0OTA0IEwzLjYyMDkwODAyLDM5LjQ0OTA0IEwzLjYyMDkwODAyLDM3LjE0MzkzMDMgQzMuNjIwOTA4MDIsMzYuOTY3NDE4MyAzLjY0OTA1MzQ0LDM2LjgxMDQwNzEgMy43MDQ5NDIyLDM2LjY3Mjg5NjYgQzMuNzYxMDMyLDM2LjUzNTM4NjIgMy44MzYwMTk0MywzNi40MjAzOTIgMy45Mjk5MDQ1MSwzNi4zMjc3MTMyIEM0LjAyMzU4ODU0LDM2LjIzNTAzNDMgNC4xMzM1NTY3MSwzNi4xNjQ4NzE4IDQuMjU5NjA3OTcsMzYuMTE3MjI1NyBDNC4zODU2NTkyNCwzNi4wNjkzNzg1IDQuNTIwMTU0MTMsMzYuMDQ1NDU0OSA0LjY2Mjg5MTYxLDM2LjA0NTQ1NDkgQzQuOTU5ODI1NzcsMzYuMDQ1NDU0OSA1LjE5MDIxNjEyLDM2LjEzOTU0MSA1LjM1NDA2MjY2LDM2LjMyNzcxMzIgQzUuNTE3OTA5MiwzNi41MTU4ODU0IDUuNTk5OTMyOTksMzYuNzg1MDc2MiA1LjU5OTkzMjk5LDM3LjEzNTA4NDYgTDUuNTk5OTMyOTksMzkuNDQ5MDQgTDYuNDgyMjkxODQsMzkuNDQ5MDQgTDYuNDgyMjkxODQsMzcuMTQzOTMwMyBDNi40ODIyOTE4NCwzNi45Njc0MTgzIDYuNTEwMjM2MjIsMzYuODEwNDA3MSA2LjU2NjMyNjAyLDM2LjY3Mjg5NjYgQzYuNjIyMjE0NzgsMzYuNTM1Mzg2MiA2LjY5NzIwMjIxLDM2LjQyMDM5MiA2Ljc5MTA4NzI4LDM2LjMyNzcxMzIgQzYuODg0NzcxMzIsMzYuMjM1MDM0MyA2Ljk5NDczOTQ5LDM2LjE2NDg3MTggNy4xMjA3OTA3NSwzNi4xMTcyMjU3IEM3LjI0Njg0MjAyLDM2LjA2OTM3ODUgNy4zODEzMzY5MSwzNi4wNDU0NTQ5IDcuNTI0Mjc1NDIsMzYuMDQ1NDU0OSBDNy44MjEwMDg1NCwzNi4wNDU0NTQ5IDguMDUxMzk4ODksMzYuMTM5NTQxIDguMjE1NDQ2NDcsMzYuMzI3NzEzMiBDOC4zNzkyOTMwMSwzNi41MTU4ODU0IDguNDYxMTE1NzYsMzYuNzg1MDc2MiA4LjQ2MTExNTc2LDM3LjEzNTA4NDYgTDguNDYxMTE1NzYsMzkuNDQ5MDQgTDkuMzQzNDc0NjIsMzkuNDQ5MDQgTDkuMzQzNDc0NjIsMzYuODM1NTM2OSBDOS4zNDM0NzQ2MiwzNi41OTI0ODEyIDkuMzAzNDY3OTIsMzYuMzY5NzMwMyA5LjIyMzY1NTU1LDM2LjE2NzA4MzMgQzkuMTQzODQzMTksMzUuOTY0NDM2MyA5LjAzMTA2MDQ4LDM1Ljc5MDEzNTcgOC44ODU1MDg0NiwzNS42NDM5ODA2IFoiIGlkPSJGaWxsLTEiIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy41MDM3ODk2LDM3Ljg5OTIzMjcgQzEzLjQ0MzA3NTksMzguMDYxMjY5OSAxMy4zNTc2MzQ0LDM4LjIwMTc5NTkgMTMuMjQ3NjY2MywzOC4zMjA0MDg4IEMxMy4xMzc2OTgxLDM4LjQzOTAyMTYgMTMuMDA2MDE3OCwzOC41MzIzMDM2IDEyLjg1MjYyNTIsMzguNjAwMjU0NiBDMTIuNjk5MjMyNywzOC42Njg0MDY4IDEyLjUyODM0OTgsMzguNzAyMzgyMyAxMi4zNDAzNzg2LDM4LjcwMjM4MjMgQzEyLjE0MzU2MTcsMzguNzAyMzgyMyAxMS45Njc2NTI5LDM4LjY2Njk5OTUgMTEuODEyODUzMSwzOC41OTYwMzI4IEMxMS42NTgwNTMzLDM4LjUyNTA2NjIgMTEuNTI2OTc2LDM4LjQyOTU3MjggMTEuNDIwMDIzNSwzOC4zMDk1NTI3IEMxMS4zMTI4Njk4LDM4LjE4OTMzMTUgMTEuMjMwNDQ0LDM4LjA0ODQwMzQgMTEuMTcyNTQ0OCwzNy44ODYxNjUyIEMxMS4xMTQ2NDU3LDM3LjcyNDEyOCAxMS4wODU2OTYxLDM3LjU1MjAzODkgMTEuMDg1Njk2MSwzNy4zNjk0OTU3IEMxMS4wODU2OTYxLDM3LjE4NzM1NDcgMTEuMTE0NjQ1NywzNy4wMTUwNjQ1IDExLjE3MjU0NDgsMzYuODUzMDI3MyBDMTEuMjMwNDQ0LDM2LjY5MDk5MDEgMTEuMzEyODY5OCwzNi41NDk4NjA5IDExLjQyMDAyMzUsMzYuNDI5ODQwOCBDMTEuNTI2OTc2LDM2LjMwOTYxOTcgMTEuNjU4MDUzMywzNi4yMTQxMjYzIDExLjgxMjg1MzEsMzYuMTQzMTU5NyBDMTEuOTY3NjUyOSwzNi4wNzIzOTQgMTIuMTQzNTYxNywzNi4wMzY4MTAyIDEyLjM0MDM3ODYsMzYuMDM2ODEwMiBDMTIuNTI4MzQ5OCwzNi4wMzY4MTAyIDEyLjY5OTIzMjcsMzYuMDcwOTg2OCAxMi44NTI2MjUyLDM2LjEzODkzNzggQzEzLjAwNjAxNzgsMzYuMjA2ODg4OSAxMy4xMzc2OTgxLDM2LjMwMDE3MDkgMTMuMjQ3NjY2MywzNi40MTg5ODQ4IEMxMy4zNTc2MzQ0LDM2LjUzNzU5NzYgMTMuNDQzMDc1OSwzNi42Nzc5MjI2IDEzLjUwMzc4OTYsMzYuODM5OTU5OCBDMTMuNTY0NTAzMywzNy4wMDIxOTggMTMuNTk0ODYwMSwzNy4xNzg1MDkgMTMuNTk0ODYwMSwzNy4zNjk0OTU3IEMxMy41OTQ4NjAxLDM3LjU2MDY4MzUgMTMuNTY0NTAzMywzNy43MzcxOTU1IDEzLjUwMzc4OTYsMzcuODk5MjMyNyBMMTMuNTAzNzg5NiwzNy44OTkyMzI3IFogTTEzLjUzODU2OTMsMzUuNzkzNzU0NCBDMTMuMzkzODIxNCwzNS42MDg1OTc4IDEzLjIxNDI5MzksMzUuNDYwMjMxMiAxMy4wMDAxODc2LDM1LjM0ODg1NTggQzEyLjc4NjA4MTQsMzUuMjM3NDgwMyAxMi41Mjk3NTcxLDM1LjE4MTU5MTYgMTIuMjMxODE3NywzNS4xODE1OTE2IEMxMS45Mzk1MDc1LDM1LjE4MTU5MTYgMTEuNjY3NTAyMSwzNS4yMzU4NzIgMTEuNDE1NjAwNiwzNS4zNDQ0MzI5IEMxMS4xNjM5MDAyLDM1LjQ1Mjk5MzggMTAuOTQzOTYzOCwzNS42MDQxNzQ5IDEwLjc1NTc5MTYsMzUuNzk4MTc3MiBDMTAuNTY3NjE5NCwzNS45OTE5Nzg2IDEwLjQyMDA1NywzNi4yMjI3NzEgMTAuMzEyOTAzMywzNi40OTA1NTQ1IEMxMC4yMDU5NTA3LDM2Ljc1ODEzNyAxMC4xNTIyNzM0LDM3LjA1MTI1MTUgMTAuMTUyMjczNCwzNy4zNjk0OTU3IEMxMC4xNTIyNzM0LDM3LjY4ODE0MjEgMTAuMjA1OTUwNywzNy45ODEwNTU1IDEwLjMxMjkwMzMsMzguMjQ4NjM4IEMxMC40MjAwNTcsMzguNTE2NDIxNSAxMC41Njc2MTk0LDM4Ljc0NzIxMzkgMTAuNzU1NzkxNiwzOC45NDEyMTYzIEMxMC45NDM5NjM4LDM5LjEzNTAxNzYgMTEuMTYzOTAwMiwzOS4yODYxOTg3IDExLjQxNTYwMDYsMzkuMzk0NzU5NiBDMTEuNjY3NTAyMSwzOS41MDMzMjA1IDExLjkzOTUwNzUsMzkuNTU3NjAwOSAxMi4yMzE4MTc3LDM5LjU1NzYwMDkgQzEyLjUyOTc1NzEsMzkuNTU3NjAwOSAxMi43ODYwODE0LDM5LjUwMjUxNjMgMTMuMDAwMTg3NiwzOS4zOTI1NDgyIEMxMy4yMTQyOTM5LDM5LjI4Mjc4MSAxMy4zOTM4MjE0LDM5LjEzNTAxNzYgMTMuNTM4NTY5MywzOC45NDk4NjA5IEwxMy41Mzg1NjkzLDM5LjQ0OTA0IEwxNC40NDU4NTY5LDM5LjQ0OTA0IEwxNC40NDU4NTY5LDM1LjI5MDE1MjUgTDEzLjUzODU2OTMsMzUuMjkwMTUyNSBMMTMuNTM4NTY5MywzNS43OTM3NTQ0IFoiIGlkPSJGaWxsLTMiIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOC42MTY0ODUyLDM3LjM2MzA4MjYgQzE4LjM2MTc2OTEsMzcuMTY0ODU4NCAxOC4wMDcxMzY5LDM3LjAzMjU3NSAxNy41NTI3ODk0LDM2Ljk2NTgzMDEgTDE3LjEyMzE2OTcsMzYuOTAwNjkzNiBDMTcuMDI3NDc1MywzNi44ODYyMTg4IDE2LjkzNzgxMiwzNi44Njk3MzM2IDE2Ljg1Mzk3ODksMzYuODUwODM2IEMxNi43Njk5NDQ3LDM2LjgzMjEzOTQgMTYuNjk3NTcwOCwzNi44MDY4MDg1IDE2LjYzNjg1NzEsMzYuNzc0ODQzNCBDMTYuNTc2MTQzNCwzNi43NDMwNzkyIDE2LjUyNzY5MzEsMzYuNzAyNDY5NCAxNi40OTE1MDYxLDM2LjY1MzIxNDkgQzE2LjQ1NTMxOTEsMzYuNjA0MTYxNSAxNi40MzcyMjU3LDM2LjU0MzQ0NzggMTYuNDM3MjI1NywzNi40NzA4NzI4IEMxNi40MzcyMjU3LDM2LjMyMzMxMDQgMTYuNTA1OTgwOSwzNi4yMDM4OTM0IDE2LjY0MzI5MDMsMzYuMTEyODIyOSBDMTYuNzgwODAwOCwzNi4wMjE3NTI0IDE2Ljk3Mzk5OSwzNS45NzYxMTY2IDE3LjIyMjg4NDksMzUuOTc2MTE2NiBDMTcuMzUzMTU4LDM1Ljk3NjExNjYgMTcuNDgxMjE5NiwzNS45ODc1NzU4IDE3LjYwNzA2OTksMzYuMDEwODk2MyBDMTcuNzMzMTIxMSwzNi4wMzQwMTU3IDE3Ljg1MjMzNzEsMzYuMDYyOTY1MyAxNy45NjUzMjA4LDM2LjA5NzU0NCBDMTguMDc4MTAzNSwzNi4xMzIzMjM3IDE4LjE4MDgzNDMsMzYuMTcwNzIyMSAxOC4yNzM1MTMyLDM2LjIxMjczOTIgQzE4LjM2NTk5MSwzNi4yNTQ1NTUyIDE4LjQ0NDE5NSwzNi4yOTQ1NjE5IDE4LjUwNzkyNDMsMzYuMzMxOTU1MSBMMTguODk4NTQyNSwzNS42MjQ0OTk5IEMxOC42ODE2MjE3LDM1LjQ4NTU4MjIgMTguNDI4MzEzLDM1LjM3NzgyNTQgMTguMTM4ODE3MiwzNS4zMDEwMjg2IEMxNy44NDk1MjI1LDM1LjIyNDQzMjkgMTcuNTQxMzMwMiwzNS4xODYwMzQ1IDE3LjIxNDI0MDIsMzUuMTg2MDM0NSBDMTYuOTQ3ODY0LDM1LjE4NjAzNDUgMTYuNzA5MjMxLDM1LjIxNzE5NTUgMTYuNDk3OTM5NCwzNS4yNzkzMTY1IEMxNi4yODY2NDc3LDM1LjM0MTYzODUgMTYuMTA2NTE3LDM1LjQyOTg5NDUgMTUuOTU3NTQ3MywzNS41NDQwODQ0IEMxNS44MDgzNzY2LDM1LjY1ODQ3NTUgMTUuNjkzOTg1NiwzNS43OTc5OTYzIDE1LjYxNDU3NTMsMzUuOTYzMDQ5MSBDMTUuNTM0NzYyOSwzNi4xMjgxMDE5IDE1LjQ5NTE1ODMsMzYuMzEzMjU4NSAxNS40OTUxNTgzLDM2LjUxODcyMDEgQzE1LjQ5NTE1ODMsMzYuODU0NDU0NyAxNS42MTQ1NzUzLDM3LjEyNTg1NjkgMTUuODUzMjA4MiwzNy4zMzI3MjU3IEMxNi4wOTIwNDIyLDM3LjUzOTU5NDYgMTYuNDQzMDU1OCwzNy42NzQ4OTM2IDE2LjkwNjA0NzksMzcuNzM4NjIyOSBMMTcuMzQwMDkwNSwzNy43OTUxMTQ4IEMxNy41ODg5NzY0LDM3LjgyOTY5MzQgMTcuNzcxMzE4NSwzNy44ODU1ODIyIDE3Ljg4NzExNjgsMzcuOTYyMTc3OSBDMTguMDAyOTE1MSwzOC4wMzg5NzQ3IDE4LjA2MDgxNDIsMzguMTM2NDc4NSAxOC4wNjA4MTQyLDM4LjI1NTI5MjMgQzE4LjA2MDgxNDIsMzguNDExNDk5NCAxNy45ODEyMDI5LDM4LjUzNTEzODIgMTcuODIxOTgwMiwzOC42MjY0MDk4IEMxNy42NjI3NTc2LDM4LjcxNzQ4MDMgMTcuNDI2OTM5MiwzOC43NjMxMTYxIDE3LjExNDMyNCwzOC43NjMxMTYxIEMxNi45NDM2NDIyLDM4Ljc2MzExNjEgMTYuNzkxMDUzOCwzOC43NTE2NTY5IDE2LjY1NjM1NzgsMzguNzI4MzM2NCBDMTYuNTIxODYzLDM4LjcwNTIxNyAxNi4zOTg4MjczLDM4LjY3NDA1NiAxNi4yODc0NTE4LDM4LjYzNTA1NDQgQzE2LjE3NTg3NTQsMzguNTk2MDUyOSAxNi4wNzYxNjAyLDM4LjU1MTIyMTMgMTUuOTg3OTA0MiwzOC41MDA1NTk2IEMxNS44OTk2NDgyLDM4LjQ0OTg5NzggMTUuODE3ODI1NCwzOC4zOTU2MTc0IDE1Ljc0MjYzNywzOC4zMzc3MTgyIEwxNS4zMjE0NjA5LDM5LjAxOTIzOTQgQzE1LjQ3MjAzODksMzkuMTMyMDIyMSAxNS42Mjk2NTMyLDM5LjIyMzI5MzcgMTUuNzk0NzA2LDM5LjI5Mjg1MzEgQzE1Ljk1OTc1ODgsMzkuMzYyMjExNCAxNi4xMjE3OTU5LDM5LjQxNjQ5MTkgMTYuMjgwODE3NiwzOS40NTU0OTM0IEMxNi40NDAwNDAyLDM5LjQ5NDY5NTkgMTYuNTkwNjE4MiwzOS41MjA2Mjk5IDE2LjczMjM1MDUsMzkuNTMzNjk3NCBDMTYuODc0MDgyOCwzOS41NDY3NjUgMTYuOTk4NTI1NywzOS41NTMxOTgyIDE3LjEwNTY3OTMsMzkuNTUzMTk4MiBDMTcuNDAzODE5NywzOS41NTMxOTgyIDE3LjY3MDc5OTEsMzkuNTIwMDI2OCAxNy45MDY2MTc1LDM5LjQ1MzQ4MyBDMTguMTQyNjM3LDM5LjM4NjkzOTIgMTguMzQwODYxMSwzOS4yOTM0NTYyIDE4LjUwMTQ5MSwzOS4xNzMyMzUgQzE4LjY2MjEyMSwzOS4wNTMyMTQ5IDE4Ljc4NDk1NTYsMzguOTEwMDc1NCAxOC44NzAzOTcxLDM4Ljc0MzYxNTMgQzE4Ljk1NTgzODUsMzguNTc3MTU1MyAxOC45OTg0NTg3LDM4LjM5NDIxMDEgMTguOTk4NDU4NywzOC4xOTQzNzc2IEMxOC45OTg0NTg3LDM3LjgzODUzOTEgMTguODcxMjAxMiwzNy41NjEzMDY4IDE4LjYxNjQ4NTIsMzcuMzYzMDgyNiBaIiBpZD0iRmlsbC00IiBmaWxsPSIjMUQxRDFCIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjQuNTc0MjQ2OSwzNy4wMTM2MTcgQzI0LjU5NzM2NjQsMzYuODYzMjQwMSAyNC42Mzc5NzYyLDM2LjcyNDkyNTQgMjQuNjk1ODc1NCwzNi41OTkwNzUyIEMyNC43NTM3NzQ1LDM2LjQ3MzIyNSAyNC44MjgxNTg4LDM2LjM2NDY2NDEgMjQuOTE5NDMwNCwzNi4yNzMzOTI1IEMyNS4wMTA3MDIsMzYuMTgyMzIyIDI1LjExOTA2MTgsMzYuMTEyMTU5NSAyNS4yNDQ5MTIsMzYuMDYyOTA1IEMyNS4zNzA5NjMzLDM2LjAxMzY1MDUgMjUuNTE0OTA3LDM1Ljk4OTEyMzggMjUuNjc2OTQ0MiwzNS45ODkxMjM4IEMyNS45NjYyMzg5LDM1Ljk4OTEyMzggMjYuMjAyMjU4MywzNi4wNzg3ODcxIDI2LjM4NDYwMDQsMzYuMjU4MzE0NiBDMjYuNTY2OTQyNSwzNi40Mzc4NDIyIDI2LjY4MjUzOTgsMzYuNjg5NTQyNiAyNi43MzE3OTQzLDM3LjAxMzYxNyBMMjQuNTc0MjQ2OSwzNy4wMTM2MTcgWiBNMjcuMTExNzU3NCwzNS43ODcyODEgQzI2LjkzOTQ2NzIsMzUuNTk0Njg1OSAyNi43MzI1OTg0LDM1LjQ0NTcxNjIgMjYuNDkwOTQ5OSwzNS4zNDAxNzA5IEMyNi4yNDkzMDE0LDM1LjIzNDQyNDUgMjUuOTgzNzI5MywzNS4xODE1NTEzIDI1LjY5NDQzNDYsMzUuMTgxNTUxMyBDMjUuMzg3NDQ4NSwzNS4xODE1NTEzIDI1LjEwNzYwMjYsMzUuMjM0NDI0NSAyNC44NTQyOTM5LDM1LjM0MDE3MDkgQzI0LjYwMDk4NTEsMzUuNDQ1NzE2MiAyNC4zODMyNjAyLDM1LjU5NDY4NTkgMjQuMjAwOTE4MSwzNS43ODcyODEgQzI0LjAxODU3NiwzNS45Nzk2NzUgMjMuODc2ODQzNywzNi4yMTA0Njc0IDIzLjc3NTUyMDIsMzYuNDc5NjU4MiBDMjMuNjc0MTk2NywzNi43NDg4NDkxIDIzLjYyMzUzNDksMzcuMDQ1NTgyMiAyMy42MjM1MzQ5LDM3LjM2OTY1NjYgQzIzLjYyMzUzNDksMzcuNjk5NTYxMSAyMy42NzU2MDQsMzcuOTk5MTA4NyAyMy43Nzk5NDMsMzguMjY4Mjk5NSBDMjMuODg0MDgxMSwzOC41Mzc0OTA0IDI0LjAzMDAzNTIsMzguNzY3NDc4NiAyNC4yMTgyMDc0LDM4Ljk1ODQ2NTQgQzI0LjQwNjM3OTYsMzkuMTQ5NDUyMiAyNC42MzA3Mzg4LDM5LjI5NzIxNTYgMjQuODkxMjg1LDM5LjQwMTE1MjYgQzI1LjE1MTYzMDEsMzkuNTA1NDkxNyAyNS40MzgzMTEzLDM5LjU1NzU2MDcgMjUuNzUwNzI1NCwzOS41NTc1NjA3IEMyNi4wNjYxNTUxLDM5LjU1NzU2MDcgMjYuMzY2NTA3LDM5LjUxNDEzNjQgMjYuNjUxNTc5OCwzOS40MjcyODc3IEMyNi45MzY2NTI3LDM5LjM0MDQzODkgMjcuMjA2NDQ2NiwzOS4xODg0NTM3IDI3LjQ2MTE2MjcsMzguOTcxNTMyOSBMMjcuMDA5ODMwOCwzOC4zMjQ3OTE0IEMyNi44MzYxMzM0LDM4LjQ2MzUwODEgMjYuNjQ0MzQyNCwzOC41NzE0NjU5IDI2LjQzNDQ1OCwzOC42NDgwNjE3IEMyNi4yMjQ1NzM2LDM4LjcyNDg1ODQgMjYuMDE1NDkzNCwzOC43NjMwNTU4IDI1LjgwNzIxNzMsMzguNzYzMDU1OCBDMjUuNjU5NDUzOCwzOC43NjMwNTU4IDI1LjUxNzcyMTYsMzguNzQyOTUxOSAyNS4zODE4MTk0LDM4LjcwMjM0MjEgQzI1LjI0NTcxNjIsMzguNjYxNzMyMyAyNS4xMjI2ODA1LDM4LjU5OTAwODIgMjUuMDEyNzEyMywzOC41MTM1NjY4IEMyNC45MDI3NDQyLDM4LjQyODEyNTMgMjQuODA4NjU4MSwzOC4zMTg3NjAzIDI0LjczMDQ1NCwzOC4xODU2NzI2IEMyNC42NTI0NTEsMzguMDUyNTg1IDI0LjU5ODc3MzcsMzcuODkxOTU1MSAyNC41NzAwMjUxLDM3LjcwMzc4MjkgTDI3LjY0MzUwNDgsMzcuNzAzNzgyOSBDMjcuNjQ5MzM0OSwzNy42NTE3MTM5IDI3LjY1MzU1NjcsMzcuNTk2ODMwMyAyNy42NTY1NzIzLDM3LjUzODkzMTEgQzI3LjY1OTM4NjgsMzcuNDgxMDMyIDI3LjY2MDc5NDEsMzcuNDIzMTMyOSAyNy42NjA3OTQxLDM3LjM2NTIzMzcgQzI3LjY2MDc5NDEsMzcuMDQxMTU5MyAyNy42MTIzNDM4LDM2Ljc0NTIzMDQgMjcuNTE1NDQzMSwzNi40Nzc0NDY4IEMyNy40MTg1NDI1LDM2LjIwOTg2NDMgMjcuMjgzODQ2NSwzNS45Nzk2NzUgMjcuMTExNzU3NCwzNS43ODcyODEgTDI3LjExMTc1NzQsMzUuNzg3MjgxIFoiIGlkPSJGaWxsLTUiIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zOS4xMzEzOTg5LDM3Ljg5OTIzMjcgQzM5LjA3MDY4NTIsMzguMDYxMjY5OSAzOC45ODUyNDM4LDM4LjIwMTc5NTkgMzguODc1Mjc1NiwzOC4zMjA0MDg4IEMzOC43NjUxMDY0LDM4LjQzOTAyMTYgMzguNjMzNjI3MSwzOC41MzIzMDM2IDM4LjQ4MDAzMzUsMzguNjAwMjU0NiBDMzguMzI2ODQyLDM4LjY2ODQwNjggMzguMTU1OTU5MSwzOC43MDIzODIzIDM3Ljk2Nzc4NjksMzguNzAyMzgyMyBDMzcuNzcxMTcxMSwzOC43MDIzODIzIDM3LjU5NTI2MjIsMzguNjY2OTk5NSAzNy40NDA0NjI0LDM4LjU5NjAzMjggQzM3LjI4NTY2MjYsMzguNTI1MDY2MiAzNy4xNTQ1ODU0LDM4LjQyOTU3MjggMzcuMDQ3NjMyOCwzOC4zMDk1NTI3IEMzNi45NDA0NzkxLDM4LjE4OTMzMTUgMzYuODU4MDUzMywzOC4wNDg0MDM0IDM2LjgwMDE1NDEsMzcuODg2MTY1MiBDMzYuNzQyMjU1LDM3LjcyNDEyOCAzNi43MTMzMDU0LDM3LjU1MjAzODkgMzYuNzEzMzA1NCwzNy4zNjk0OTU3IEMzNi43MTMzMDU0LDM3LjE4NzM1NDcgMzYuNzQyMjU1LDM3LjAxNTA2NDUgMzYuODAwMTU0MSwzNi44NTMwMjczIEMzNi44NTgwNTMzLDM2LjY5MDk5MDEgMzYuOTQwNDc5MSwzNi41NDk4NjA5IDM3LjA0NzYzMjgsMzYuNDI5ODQwOCBDMzcuMTU0NTg1NCwzNi4zMDk2MTk3IDM3LjI4NTY2MjYsMzYuMjE0MTI2MyAzNy40NDA0NjI0LDM2LjE0MzE1OTcgQzM3LjU5NTI2MjIsMzYuMDcyMzk0IDM3Ljc3MTE3MTEsMzYuMDM2ODEwMiAzNy45Njc3ODY5LDM2LjAzNjgxMDIgQzM4LjE1NTk1OTEsMzYuMDM2ODEwMiAzOC4zMjY4NDIsMzYuMDcwOTg2OCAzOC40ODAwMzM1LDM2LjEzODkzNzggQzM4LjYzMzYyNzEsMzYuMjA2ODg4OSAzOC43NjUxMDY0LDM2LjMwMDE3MDkgMzguODc1Mjc1NiwzNi40MTg5ODQ4IEMzOC45ODUyNDM4LDM2LjUzNzU5NzYgMzkuMDcwNjg1MiwzNi42Nzc5MjI2IDM5LjEzMTM5ODksMzYuODM5OTU5OCBDMzkuMTkyMTEyNiwzNy4wMDIxOTggMzkuMjIyNDY5NCwzNy4xNzg1MDkgMzkuMjIyNDY5NCwzNy4zNjk0OTU3IEMzOS4yMjI0Njk0LDM3LjU2MDY4MzUgMzkuMTkyMTEyNiwzNy43MzcxOTU1IDM5LjEzMTM5ODksMzcuODk5MjMyNyBMMzkuMTMxMzk4OSwzNy44OTkyMzI3IFogTTM5LjE2NTk3NzYsMzUuNzkzNzU0NCBDMzkuMDIxMjI5NywzNS42MDg1OTc4IDM4Ljg0MTkwMzIsMzUuNDYwMjMxMiAzOC42Mjc3OTcsMzUuMzQ4ODU1OCBDMzguNDEzNjkwNywzNS4yMzc0ODAzIDM4LjE1NzM2NjQsMzUuMTgxNTkxNiAzNy44NTk0MjcsMzUuMTgxNTkxNiBDMzcuNTY3MTE2OCwzNS4xODE1OTE2IDM3LjI5NDkxMDQsMzUuMjM1ODcyIDM3LjA0MzIwOTksMzUuMzQ0NDMyOSBDMzYuNzkxNTA5NSwzNS40NTI5OTM4IDM2LjU3MTU3MzEsMzUuNjA0MTc0OSAzNi4zODM0MDA5LDM1Ljc5ODE3NzIgQzM2LjE5NTIyODcsMzUuOTkxOTc4NiAzNi4wNDc0NjUyLDM2LjIyMjc3MSAzNS45NDA1MTI2LDM2LjQ5MDU1NDUgQzM1LjgzMzM1OSwzNi43NTgxMzcgMzUuNzc5ODgyNywzNy4wNTEyNTE1IDM1Ljc3OTg4MjcsMzcuMzY5NDk1NyBDMzUuNzc5ODgyNywzNy42ODgxNDIxIDM1LjgzMzM1OSwzNy45ODEwNTU1IDM1Ljk0MDUxMjYsMzguMjQ4NjM4IEMzNi4wNDc0NjUyLDM4LjUxNjQyMTUgMzYuMTk1MjI4NywzOC43NDcyMTM5IDM2LjM4MzQwMDksMzguOTQxMjE2MyBDMzYuNTcxNTczMSwzOS4xMzUwMTc2IDM2Ljc5MTUwOTUsMzkuMjg2MTk4NyAzNy4wNDMyMDk5LDM5LjM5NDc1OTYgQzM3LjI5NDkxMDQsMzkuNTAzMzIwNSAzNy41NjcxMTY4LDM5LjU1NzYwMDkgMzcuODU5NDI3LDM5LjU1NzYwMDkgQzM4LjE1NzM2NjQsMzkuNTU3NjAwOSAzOC40MTM2OTA3LDM5LjUwMjUxNjMgMzguNjI3Nzk3LDM5LjM5MjU0ODIgQzM4Ljg0MTkwMzIsMzkuMjgyNzgxIDM5LjAyMTIyOTcsMzkuMTM1MDE3NiAzOS4xNjU5Nzc2LDM4Ljk0OTg2MDkgTDM5LjE2NTk3NzYsMzkuNDQ5MDQgTDQwLjA3MzQ2NjIsMzkuNDQ5MDQgTDQwLjA3MzQ2NjIsMzUuMjkwMTUyNSBMMzkuMTY1OTc3NiwzNS4yOTAxNTI1IEwzOS4xNjU5Nzc2LDM1Ljc5Mzc1NDQgWiIgaWQ9IkZpbGwtNiIgZmlsbD0iIzFEMUQxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIyLjUwNzAwNjIsMzguNjE5ODU1OSBDMjIuMzYwODUxMSwzOC42NzQ3Mzk1IDIyLjIxNjkwNzQsMzguNzAyMjgxOCAyMi4wNzQ5NzQsMzguNzAyMjgxOCBDMjEuOTgyMjk1MiwzOC43MDIyODE4IDIxLjg5NjI1MDYsMzguNjg4MDA4IDIxLjgxNjYzOTMsMzguNjU4ODU3NCBDMjEuNzM3MDI4LDM4LjYzMDEwODkgMjEuNjY3NjY5NiwzOC41ODQ0NzMxIDIxLjYwODM2MzIsMzguNTIyMTUxMSBDMjEuNTQ5MDU2OCwzOC40NjAwMzAyIDIxLjUwMjAxMzcsMzguMzc5NjE0NyAyMS40NjcyMzQsMzguMjgxMzA2OCBDMjEuNDMyNDU0MywzOC4xODI5OTg4IDIxLjQxNTE2NSwzOC4wNjQxODUgMjEuNDE1MTY1LDM3LjkyNTI2NzIgTDIxLjQxNTE2NSwzNi4xMTQ5MTM3IEwyMi44NzIyOTM1LDM2LjExNDkxMzcgTDIyLjg3MjI5MzUsMzUuMjkwMjUzIEwyMS40MTUxNjUsMzUuMjkwMjUzIEwyMS40MTUxNjUsMzQuMDMxMTQ3NiBMMjAuNTAzNDU0NSwzNC4wMzExNDc2IEwyMC41MDM0NTQ1LDM1LjI5MDI1MyBMMTkuNjc0MzcwOSwzNS4yOTAyNTMgTDE5LjY3NDM3MDksMzYuMTE0OTEzNyBMMjAuNTAzNDU0NSwzNi4xMTQ5MTM3IEwyMC41MDM0NTQ1LDM3Ljk0MjU1NjUgQzIwLjUwMzQ1NDUsMzguNDk1NDEzIDIwLjYzNDMzMDcsMzguOTAyNzE3NCAyMC44OTYyODQxLDM5LjE2NDY3MDggQzIxLjE1ODIzNzYsMzkuNDI2NjI0MiAyMS41MjUxMzMyLDM5LjU1NzUwMDQgMjEuOTk2OTcxLDM5LjU1NzUwMDQgQzIyLjI2MDMzMTcsMzkuNTU3NTAwNCAyMi40OTY3NTMyLDM5LjUxNzA5MTYgMjIuNzA2NjM3NiwzOS40MzYwNzMgQzIyLjg0NTM1NDMsMzkuMzgyMzk1NyAyMi45NzQwMTkxLDM5LjMyMTI3OTkgMjMuMDk0NDQxMywzOS4yNTM3MzA5IEwyMi43ODQyMzg2LDM4LjQ5NDAwNTcgQzIyLjY5NjM4NDcsMzguNTQxMDQ4OCAyMi42MDQzMDg5LDM4LjU4MzI2NjkgMjIuNTA3MDA2MiwzOC42MTk4NTU5IFoiIGlkPSJGaWxsLTciIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMC42OTg1MjkxLDM1LjE4MTYxMTcgQzMwLjQ0MzgxMywzNS4xODE2MTE3IDMwLjIxMzgyNDgsMzUuMjI4MDUxNiAzMC4wMDgxNjIyLDM1LjMyMDUyOTQgQzI5LjgwMjcwMDYsMzUuNDEzMjA4MiAyOS42MzA2MTE1LDM1LjYzNjE2MDIgMjkuNDkxNjkzOCwzNS44MzU3OTE2IEwyOS40OTE2OTM4LDM1LjI5MDE3MjYgTDI4LjY2NzgzNzIsMzUuMjkwMTcyNiBMMjguNjY3ODM3MiwzOS40NDkwNjAxIEwyOS41MDAzMzg0LDM5LjQ0OTA2MDEgTDI5LjUwMDMzODQsMzcuMTYxMjM5NyBDMjkuNTAwMzM4NCwzNi45ODQ3Mjc4IDI5LjUyNDg2NTEsMzYuODI2OTEyNCAyOS41NzQxMTk2LDM2LjY4Nzk5NDYgQzI5LjYyMzM3NDEsMzYuNTQ5MDc2OSAyOS42OTEzMjUyLDM2LjQzMTg3MTMgMjkuNzc4MTczOSwzNi4zMzYzNzggQzI5Ljg2NTAyMjYsMzYuMjQwODg0NiAyOS45NjkxNjA3LDM2LjE2ODUxMDYgMzAuMDkwNzg5MSwzNi4xMTkyNTYyIEMzMC4yMTIyMTY1LDM2LjA3MDIwMjcgMzAuMzQ1MzA0MSwzNi4wNDU0NzUgMzAuNDkwMDUxOSwzNi4wNDU0NzUgQzMwLjYwMDIyMTEsMzYuMDQ1NDc1IDMwLjcxODYzMjksMzYuMDU4NTQyNSAzMC44NDYwOTE1LDM2LjA4NDY3NzUgQzMwLjkxMTAyNywzNi4wOTc5NDYxIDMwLjk3MTc0MDcsMzYuMTE0MjMwMiAzMS4wMjg0MzM2LDM2LjEzMzUyOTkgTDMxLjI5NjYxOTIsMzUuMjY1NDQ0OCBDMzEuMjIzODQzMiwzNS4yNDI1MjY0IDMxLjE1MDA2MiwzNS4yMjI2MjM2IDMxLjA3NDA2OTQsMzUuMjA5NzU3MSBDMzAuOTYyNDkyOSwzNS4xOTEwNjA1IDMwLjgzNzQ0NjgsMzUuMTgxNjExNyAzMC42OTg1MjkxLDM1LjE4MTYxMTcgWiIgaWQ9IkZpbGwtOCIgZmlsbD0iIzFEMUQxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQzLjMxMTIzNDcsMzUuMTgxNjExNyBDNDMuMDU2NTE4NywzNS4xODE2MTE3IDQyLjgyNjUzMDQsMzUuMjI4MDUxNiA0Mi42MjA4Njc4LDM1LjMyMDUyOTQgQzQyLjQxNTQwNjMsMzUuNDEzMjA4MiA0Mi4yNDMzMTcxLDM1LjYzNjE2MDIgNDIuMTA0Mzk5NCwzNS44MzU3OTE2IEw0Mi4xMDQzOTk0LDM1LjI5MDE3MjYgTDQxLjI4MDU0MjgsMzUuMjkwMTcyNiBMNDEuMjgwNTQyOCwzOS40NDkwNjAxIEw0Mi4xMTMwNDQxLDM5LjQ0OTA2MDEgTDQyLjExMzA0NDEsMzcuMTYxMjM5NyBDNDIuMTEzMDQ0MSwzNi45ODQ3Mjc4IDQyLjEzNzU3MDgsMzYuODI2OTEyNCA0Mi4xODY4MjUzLDM2LjY4Nzk5NDYgQzQyLjIzNjA3OTcsMzYuNTQ5MDc2OSA0Mi4zMDQwMzA4LDM2LjQzMTg3MTMgNDIuMzkwODc5NSwzNi4zMzYzNzggQzQyLjQ3NzcyODMsMzYuMjQwODg0NiA0Mi41ODE4NjYzLDM2LjE2ODUxMDYgNDIuNzAzNDk0NywzNi4xMTkyNTYyIEM0Mi44MjQ5MjIxLDM2LjA3MDIwMjcgNDIuOTU4MDA5NywzNi4wNDU0NzUgNDMuMTAyNzU3NiwzNi4wNDU0NzUgQzQzLjIxMjkyNjgsMzYuMDQ1NDc1IDQzLjMzMTMzODYsMzYuMDU4NTQyNSA0My40NTg3OTcxLDM2LjA4NDY3NzUgQzQzLjUyMzczMjYsMzYuMDk3OTQ2MSA0My41ODQ0NDYzLDM2LjExNDIzMDIgNDMuNjQxMTM5MiwzNi4xMzM1Mjk5IEw0My45MDkzMjQ4LDM1LjI2NTQ0NDggQzQzLjgzNjU0ODgsMzUuMjQyNTI2NCA0My43NjI3Njc2LDM1LjIyMjYyMzYgNDMuNjg2Nzc1LDM1LjIwOTc1NzEgQzQzLjU3NTE5ODUsMzUuMTkxMDYwNSA0My40NTAxNTI1LDM1LjE4MTYxMTcgNDMuMzExMjM0NywzNS4xODE2MTE3IFoiIGlkPSJGaWxsLTkiIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00Ny41MTQzNzA5LDM3Ljg5OTIzMjcgQzQ3LjQ1MzY1NzIsMzguMDYxMjY5OSA0Ny4zNjgyMTU4LDM4LjIwMTc5NTkgNDcuMjU4MjQ3NiwzOC4zMjA0MDg4IEM0Ny4xNDgyNzk0LDM4LjQzOTAyMTYgNDcuMDE2NTk5MSwzOC41MzIzMDM2IDQ2Ljg2MzIwNjYsMzguNjAwMjU0NiBDNDYuNzA5ODE0LDM4LjY2ODQwNjggNDYuNTM4OTMxMSwzOC43MDIzODIzIDQ2LjM1MDk2LDM4LjcwMjM4MjMgQzQ2LjE1NDE0MzEsMzguNzAyMzgyMyA0NS45NzgyMzQyLDM4LjY2Njk5OTUgNDUuODIzNDM0NCwzOC41OTYwMzI4IEM0NS42Njg2MzQ2LDM4LjUyNTA2NjIgNDUuNTM3NTU3NCwzOC40Mjk1NzI4IDQ1LjQzMDYwNDgsMzguMzA5NTUyNyBDNDUuMzIzNDUxMiwzOC4xODkzMzE1IDQ1LjI0MTAyNTMsMzguMDQ4NDAzNCA0NS4xODMxMjYyLDM3Ljg4NjE2NTIgQzQ1LjEyNTIyNywzNy43MjQxMjggNDUuMDk2Mjc3NCwzNy41NTIwMzg5IDQ1LjA5NjI3NzQsMzcuMzY5NDk1NyBDNDUuMDk2Mjc3NCwzNy4xODczNTQ3IDQ1LjEyNTIyNywzNy4wMTUwNjQ1IDQ1LjE4MzEyNjIsMzYuODUzMDI3MyBDNDUuMjQxMDI1MywzNi42OTA5OTAxIDQ1LjMyMzQ1MTIsMzYuNTQ5ODYwOSA0NS40MzA2MDQ4LDM2LjQyOTg0MDggQzQ1LjUzNzU1NzQsMzYuMzA5NjE5NyA0NS42Njg2MzQ2LDM2LjIxNDEyNjMgNDUuODIzNDM0NCwzNi4xNDMxNTk3IEM0NS45NzgyMzQyLDM2LjA3MjM5NCA0Ni4xNTQxNDMxLDM2LjAzNjgxMDIgNDYuMzUwOTYsMzYuMDM2ODEwMiBDNDYuNTM4OTMxMSwzNi4wMzY4MTAyIDQ2LjcwOTgxNCwzNi4wNzA5ODY4IDQ2Ljg2MzIwNjYsMzYuMTM4OTM3OCBDNDcuMDE2NTk5MSwzNi4yMDY4ODg5IDQ3LjE0ODI3OTQsMzYuMzAwMTcwOSA0Ny4yNTgyNDc2LDM2LjQxODk4NDggQzQ3LjM2ODIxNTgsMzYuNTM3NTk3NiA0Ny40NTM2NTcyLDM2LjY3NzkyMjYgNDcuNTE0MzcwOSwzNi44Mzk5NTk4IEM0Ny41NzUwODQ2LDM3LjAwMjE5OCA0Ny42MDU0NDE0LDM3LjE3ODUwOSA0Ny42MDU0NDE0LDM3LjM2OTQ5NTcgQzQ3LjYwNTQ0MTQsMzcuNTYwNjgzNSA0Ny41NzUwODQ2LDM3LjczNzE5NTUgNDcuNTE0MzcwOSwzNy44OTkyMzI3IEw0Ny41MTQzNzA5LDM3Ljg5OTIzMjcgWiBNNDcuNTQ5MTUwNiwzMy41OTk4MTkxIEw0Ny41NDkxNTA2LDM1Ljc5Mzc1NDQgQzQ3LjQwNDQwMjcsMzUuNjA4NTk3OCA0Ny4yMjQ4NzUyLDM1LjQ2MDIzMTIgNDcuMDEwNzY5LDM1LjM0ODg1NTggQzQ2Ljc5NjY2MjgsMzUuMjM3NDgwMyA0Ni41NDAzMzg0LDM1LjE4MTU5MTYgNDYuMjQyMzk5MSwzNS4xODE1OTE2IEM0NS45NTAwODg4LDM1LjE4MTU5MTYgNDUuNjc4MDgzNCwzNS4yMzU4NzIgNDUuNDI2MzgzLDM1LjM0NDQzMjkgQzQ1LjE3NDQ4MTUsMzUuNDUyOTkzOCA0NC45NTQ1NDUxLDM1LjYwNDE3NDkgNDQuNzY2MzcyOSwzNS43OTgxNzcyIEM0NC41NzgyMDA3LDM1Ljk5MTk3ODYgNDQuNDMwNjM4MywzNi4yMjI3NzEgNDQuMzIzNjg1NywzNi40OTA1NTQ1IEM0NC4yMTYzMzEsMzYuNzU4MTM3IDQ0LjE2Mjg1NDcsMzcuMDUxMjUxNSA0NC4xNjI4NTQ3LDM3LjM2OTQ5NTcgQzQ0LjE2Mjg1NDcsMzcuNjg4MTQyMSA0NC4yMTYzMzEsMzcuOTgxMDU1NSA0NC4zMjM2ODU3LDM4LjI0ODYzOCBDNDQuNDMwNjM4MywzOC41MTY0MjE1IDQ0LjU3ODIwMDcsMzguNzQ3MjEzOSA0NC43NjYzNzI5LDM4Ljk0MTIxNjMgQzQ0Ljk1NDU0NTEsMzkuMTM1MDE3NiA0NS4xNzQ0ODE1LDM5LjI4NjE5ODcgNDUuNDI2MzgzLDM5LjM5NDc1OTYgQzQ1LjY3ODA4MzQsMzkuNTAzMzIwNSA0NS45NTAwODg4LDM5LjU1NzYwMDkgNDYuMjQyMzk5MSwzOS41NTc2MDA5IEM0Ni41NDAzMzg0LDM5LjU1NzYwMDkgNDYuNzk2NjYyOCwzOS41MDI1MTYzIDQ3LjAxMDc2OSwzOS4zOTI1NDgyIEM0Ny4yMjQ4NzUyLDM5LjI4Mjc4MSA0Ny40MDQ0MDI3LDM5LjEzNTAxNzYgNDcuNTQ5MTUwNiwzOC45NDk4NjA5IEw0Ny41NDkxNTA2LDM5LjQ0OTA0IEw0OC40NTY0MzgzLDM5LjQ0OTA0IEw0OC40NTY0MzgzLDMzLjU5OTgxOTEgTDQ3LjU0OTE1MDYsMzMuNTk5ODE5MSBaIiBpZD0iRmlsbC0xMCIgZmlsbD0iIzFEMUQxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLjg2OTkyOCwzNi40MDgwMjgxIEMzMi45ODU1MjUyLDM2LjI5MDgyMjYgMzMuMTIzMDM1NywzNi4xOTk1NTEgMzMuMjgyMjU4MywzNi4xMzQ0MTQ1IEMzMy40NDE0ODEsMzYuMDY5NDc5IDMzLjYxMzc3MTIsMzYuMDM2OTEwNyAzMy43OTg5Mjc4LDM2LjAzNjkxMDcgQzM0LjAwMjc4MSwzNi4wMzY5MTA3IDM0LjE5MjE1OTUsMzYuMDY5Mjc3OSAzNC4zNjcyNjQyLDM2LjEzNDQxNDUgQzM0LjUzNjUzODgsMzYuMTk3MzM5NiAzNC42ODMwOTYsMzYuMjg1MTkzNSAzNC44MDc1MzksMzYuMzk2OTcxIEwzNS4yNDQzOTYsMzUuNjcwNDE3MiBDMzUuMDgwNzUwNSwzNS41Mzk1NDEgMzQuODk2MTk3LDM1LjQzMjM4NzMgMzQuNjkwOTM2NSwzNS4zNDg3NTUyIEMzNC40MTc1MjM5LDM1LjIzNzM3OTggMzQuMTIwMTg3NiwzNS4xODE2OTIxIDMzLjc5ODkyNzgsMzUuMTgxNjkyMSBDMzMuNDc3NjY4LDM1LjE4MTY5MjEgMzMuMTgwMzMxNywzNS4yMzczNzk4IDMyLjkwNjcxOCwzNS4zNDg3NTUyIEMzMi42MzMzMDU0LDM1LjQ2MDEzMDcgMzIuMzk3NDg3LDM1LjYxMzUyMzIgMzIuMTk5MjYyOSwzNS44MDg5MzI4IEMzMi4wMDEwMzg3LDM2LjAwNDM0MjQgMzEuODQ1NDM0NywzNi4yMzUxMzQ5IDMxLjczMjY1MiwzNi41MDEzMTAxIEMzMS42MTk2NjgzLDM2Ljc2NzY4NjQgMzEuNTYzMTc2NCwzNy4wNTY5ODExIDMxLjU2MzE3NjQsMzcuMzY5NTk2MiBDMzEuNTYzMTc2NCwzNy42ODIyMTE0IDMxLjYxOTY2ODMsMzcuOTcxNTA2MSAzMS43MzI2NTIsMzguMjM3ODgyNCBDMzEuODQ1NDM0NywzOC41MDQwNTc2IDMyLjAwMTAzODcsMzguNzM0ODUwMSAzMi4xOTkyNjI5LDM4LjkzMDI1OTcgQzMyLjM5NzQ4NywzOS4xMjU2NjkzIDMyLjYzMzMwNTQsMzkuMjc5MDYxOCAzMi45MDY3MTgsMzkuMzkwNDM3MyBDMzMuMTgwMzMxNywzOS41MDE4MTI3IDMzLjQ3NzY2OCwzOS41NTc1MDA0IDMzLjc5ODkyNzgsMzkuNTU3NTAwNCBDMzQuMTIwMTg3NiwzOS41NTc1MDA0IDM0LjQxNzUyMzksMzkuNTAxODEyNyAzNC42OTA5MzY1LDM5LjM5MDQzNzMgQzM0Ljg5NjE5NywzOS4zMDY4MDUyIDM1LjA4MDc1MDUsMzkuMTk5NjUxNSAzNS4yNDQzOTYsMzkuMDY4Nzc1MyBMMzQuODA3NTM5LDM4LjM0MjIyMTUgQzM0LjY4MzA5NiwzOC40NTM3OTggMzQuNTM2NTM4OCwzOC41NDE2NTE5IDM0LjM2NzI2NDIsMzguNjA0NTc3IEMzNC4xOTIxNTk1LDM4LjY2OTcxMzUgMzQuMDAyNzgxLDM4LjcwMjI4MTggMzMuNzk4OTI3OCwzOC43MDIyODE4IEMzMy42MTM3NzEyLDM4LjcwMjI4MTggMzMuNDQxNDgxLDM4LjY2OTcxMzUgMzMuMjgyMjU4MywzOC42MDQ1NzcgQzMzLjEyMzAzNTcsMzguNTM5NjQxNSAzMi45ODU1MjUyLDM4LjQ0ODM2OTkgMzIuODY5OTI4LDM4LjMzMTE2NDMgQzMyLjc1NDEyOTcsMzguMjEzOTU4OCAzMi42NjI4NTgxLDM4LjA3MzYzMzggMzIuNTk2MzE0MywzNy45MTAxODkzIEMzMi41Mjk3NzA1LDM3Ljc0NjU0MzggMzIuNDk2NTk5MSwzNy41NjY0MTMxIDMyLjQ5NjU5OTEsMzcuMzY5NTk2MiBDMzIuNDk2NTk5MSwzNy4xNzI3Nzk0IDMyLjUyOTc3MDUsMzYuOTkyNjQ4NyAzMi41OTYzMTQzLDM2LjgyOTIwNDIgQzMyLjY2Mjg1ODEsMzYuNjY1NTU4NyAzMi43NTQxMjk3LDM2LjUyNTIzMzcgMzIuODY5OTI4LDM2LjQwODAyODEgWiIgaWQ9IkZpbGwtMTEiIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01MC4zMTExODExLDM5LjE2NzQwNDkgTDUwLjMxMTE4MTEsMzkuMjM2MzYxMiBMNTAuMzkwNTkxNCwzOS4yMzYzNjEyIEM1MC40MDY4NzU1LDM5LjIzNjM2MTIgNTAuNDE5NTQxLDM5LjIzMzc0NzcgNTAuNDI4MTg1NiwzOS4yMjg3MjE3IEM1MC40MzcwMzEzLDM5LjIyMzY5NTggNTAuNDQxNDU0MiwzOS4yMTQ4NTAxIDUwLjQ0MTQ1NDIsMzkuMjAyMzg1NyBDNTAuNDQxNDU0MiwzOS4xOTAzMjMzIDUwLjQzNzAzMTMsMzkuMTgxNDc3NiA1MC40MjgxODU2LDM5LjE3NTg0ODYgQzUwLjQxOTU0MSwzOS4xNzAyMTk1IDUwLjQwNjg3NTUsMzkuMTY3NDA0OSA1MC4zOTA1OTE0LDM5LjE2NzQwNDkgTDUwLjMxMTE4MTEsMzkuMTY3NDA0OSBaIE01MC4zOTI0MDA3LDM5LjA3NTczMTMgQzUwLjQ0NDA2NzcsMzkuMDc1NzMxMyA1MC40ODMyNzAyLDM5LjA4NzM5MTUgNTAuNTEwMDA4NCwzOS4xMTAzMDk5IEM1MC41MzY3NDY1LDM5LjEzMzIyODMgNTAuNTUwMDE1MSwzOS4xNjM5ODczIDUwLjU1MDAxNTEsMzkuMjAyMzg1NyBDNTAuNTUwMDE1MSwzOS4yMzI1NDE1IDUwLjU0MDU2NjMsMzkuMjU3NjcxMyA1MC41MjEyNjY1LDM5LjI3NzM3MzEgQzUwLjUwMjE2NzksMzkuMjk3Mjc1OSA1MC40NzQyMjM1LDM5LjMxMDM0MzQgNTAuNDM3NjM0NCwzOS4zMTY1NzU2IEw1MC41NTQ4NCwzOS40NTE2NzM2IEw1MC40MjgxODU2LDM5LjQ1MTY3MzYgTDUwLjMyMzQ0NDUsMzkuMzIwMzk1NCBMNTAuMzExMTgxMSwzOS4zMjAzOTU0IEw1MC4zMTExODExLDM5LjQ1MTY3MzYgTDUwLjIwNTQzNDcsMzkuNDUxNjczNiBMNTAuMjA1NDM0NywzOS4wNzU3MzEzIEw1MC4zOTI0MDA3LDM5LjA3NTczMTMgWiBNNTAuMzY3ODc0LDM5LjU3MDY4ODYgQzUwLjQxMDA5MjEsMzkuNTcwNjg4NiA1MC40NDk2OTY4LDM5LjU2MjY0NyA1MC40ODY4ODg5LDM5LjU0NjU2MzkgQzUwLjUyMzg4LDM5LjUzMDQ4MDggNTAuNTU2MjQ3MywzOS41MDg1Njc2IDUwLjU4MzU4ODUsMzkuNDgxMDI1MyBDNTAuNjEwOTI5OCwzOS40NTMyODIgNTAuNjMyNjQyLDM5LjQyMDcxMzcgNTAuNjQ4MzIzLDM5LjM4MzcyMjYgQzUwLjY2NDAwNCwzOS4zNDY1MzA0IDUwLjY3MTg0NDUsMzkuMzA2NTIzNyA1MC42NzE4NDQ1LDM5LjI2MzcwMjUgQzUwLjY3MTg0NDUsMzkuMjIxNDg0MyA1MC42NjQwMDQsMzkuMTgxNjc4NyA1MC42NDgzMjMsMzkuMTQ0Mjg1NSBDNTAuNjMyNjQyLDM5LjEwNjg5MjMgNTAuNjEwOTI5OCwzOS4wNzQzMjQgNTAuNTgzNTg4NSwzOS4wNDY5ODI3IEM1MC41NTYyNDczLDM5LjAxOTY0MTUgNTAuNTIzODgsMzguOTk3OTI5MyA1MC40ODY4ODg5LDM4Ljk4MTg0NjIgQzUwLjQ0OTY5NjgsMzguOTY1NzYzMSA1MC40MTAwOTIxLDM4Ljk1NzcyMTYgNTAuMzY3ODc0LDM4Ljk1NzcyMTYgQzUwLjMyNDQ0OTcsMzguOTU3NzIxNiA1MC4yODQwNDA5LDM4Ljk2NTc2MzEgNTAuMjQ2NDQ2NiwzOC45ODE4NDYyIEM1MC4yMDkwNTM0LDM4Ljk5NzkyOTMgNTAuMTc2NDg1MiwzOS4wMTk2NDE1IDUwLjE0ODc0MTgsMzkuMDQ2OTgyNyBDNTAuMTIwOTk4NSwzOS4wNzQzMjQgNTAuMDk5Mjg2MywzOS4xMDY4OTIzIDUwLjA4MzYwNTMsMzkuMTQ0Mjg1NSBDNTAuMDY3OTI0MywzOS4xODE2Nzg3IDUwLjA2MDA4MzgsMzkuMjIxNDg0MyA1MC4wNjAwODM4LDM5LjI2MzcwMjUgQzUwLjA2MDA4MzgsMzkuMzA2NTIzNyA1MC4wNjc5MjQzLDM5LjM0NjUzMDQgNTAuMDgzNjA1MywzOS4zODM3MjI2IEM1MC4wOTkyODYzLDM5LjQyMDcxMzcgNTAuMTIwOTk4NSwzOS40NTMyODIgNTAuMTQ4NzQxOCwzOS40ODEwMjUzIEM1MC4xNzY0ODUyLDM5LjUwODU2NzYgNTAuMjA5MDUzNCwzOS41MzA0ODA4IDUwLjI0NjQ0NjYsMzkuNTQ2NTYzOSBDNTAuMjg0MDQwOSwzOS41NjI2NDcgNTAuMzI0NDQ5NywzOS41NzA2ODg2IDUwLjM2Nzg3NCwzOS41NzA2ODg2IEw1MC4zNjc4NzQsMzkuNTcwNjg4NiBaIE01MC4zNjc4NzQsMzguODM5NzExOCBDNTAuNDI4MTg1NiwzOC44Mzk3MTE4IDUwLjQ4NDg3ODUsMzguODUwOTcgNTAuNTM3NzUxNywzOC44NzMyODUzIEM1MC41OTA2MjQ5LDM4Ljg5NTYwMDYgNTAuNjM2ODYzOCwzOC45MjU5NTc0IDUwLjY3NjA2NjMsMzguOTY0MzU1OCBDNTAuNzE1NDY5OSwzOS4wMDI3NTQyIDUwLjc0NjQyOTksMzkuMDQ3NTg1OSA1MC43NjkxNDczLDM5LjA5ODg1MDcgQzUwLjc5MTg2NDYsMzkuMTUwMzE2NiA1MC44MDMxMjI4LDM5LjIwNTIwMDIgNTAuODAzMTIyOCwzOS4yNjM3MDI1IEM1MC44MDMxMjI4LDM5LjMyMTYwMTYgNTAuNzkxODY0NiwzOS4zNzY0ODUyIDUwLjc2OTE0NzMsMzkuNDI3OTUxMSBDNTAuNzQ2NDI5OSwzOS40Nzk2MTggNTAuNzE1NDY5OSwzOS41MjQ4NTE3IDUwLjY3NjA2NjMsMzkuNTYzNDUxMiBDNTAuNjM2ODYzOCwzOS42MDIyNTE2IDUwLjU5MDYyNDksMzkuNjMyODA5NSA1MC41Mzc3NTE3LDM5LjY1NTEyNDggQzUwLjQ4NDg3ODUsMzkuNjc3NDQwMSA1MC40MjgxODU2LDM5LjY4ODY5ODMgNTAuMzY3ODc0LDM5LjY4ODY5ODMgQzUwLjMwNjE1NTEsMzkuNjg4Njk4MyA1MC4yNDg0NTcsMzkuNjc3NDQwMSA1MC4xOTQ5ODA3LDM5LjY1NTEyNDggQzUwLjE0MTUwNDQsMzkuNjMyODA5NSA1MC4wOTUwNjQ1LDM5LjYwMjI1MTYgNTAuMDU1NjYwOSwzOS41NjM0NTEyIEM1MC4wMTY0NTg0LDM5LjUyNDg1MTcgNDkuOTg1NDk4NCwzOS40Nzk2MTggNDkuOTYzMTgzMSwzOS40Mjc5NTExIEM0OS45NDA4Njc4LDM5LjM3NjQ4NTIgNDkuOTI5NjA5NiwzOS4zMjE2MDE2IDQ5LjkyOTYwOTYsMzkuMjYzNzAyNSBDNDkuOTI5NjA5NiwzOS4yMDUyMDAyIDQ5Ljk0MDg2NzgsMzkuMTUwMzE2NiA0OS45NjMxODMxLDM5LjA5ODg1MDcgQzQ5Ljk4NTQ5ODQsMzkuMDQ3NTg1OSA1MC4wMTY0NTg0LDM5LjAwMjc1NDIgNTAuMDU1NjYwOSwzOC45NjQzNTU4IEM1MC4wOTUwNjQ1LDM4LjkyNTk1NzQgNTAuMTQxNTA0NCwzOC44OTU2MDA2IDUwLjE5NDk4MDcsMzguODczMjg1MyBDNTAuMjQ4NDU3LDM4Ljg1MDk3IDUwLjMwNjE1NTEsMzguODM5NzExOCA1MC4zNjc4NzQsMzguODM5NzExOCBMNTAuMzY3ODc0LDM4LjgzOTcxMTggWiIgaWQ9IkZpbGwtMTIiIGZpbGw9IiMxRDFEMUIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOS42MTc0NzcsMTUuODQ5NzMwMyBDMTkuNjE3NDc3LDEwLjg2NzE4NzEgMjEuOTQ1MTAzLDYuNDMxMDY3MTggMjUuNTY5MjI3NywzLjU2MDIzNDU1IEMyMi44OTY4MjAyLDEuNDQzMjk3MDMgMTkuNTIwOTc4NCwwLjE3NTk0OTA3IDE1Ljg0Njk5NjEsMC4xNzU5NDkwNyBDNy4xOTA2NzE4LDAuMTc1OTQ5MDcgMC4xNzMyMTQ5NDQsNy4xOTM0MDU5MyAwLjE3MzIxNDk0NCwxNS44NDk3MzAzIEMwLjE3MzIxNDk0NCwyNC41MDYwNTQ2IDcuMTkwNjcxOCwzMS41MjM1MTE1IDE1Ljg0Njk5NjEsMzEuNTIzNTExNSBDMTkuNTIwOTc4NCwzMS41MjM1MTE1IDIyLjg5NjgyMDIsMzAuMjU2MTYzNSAyNS41NjkyMjc3LDI4LjEzOTIyNiBDMjEuOTQ1MTAzLDI1LjI2ODM5MzQgMTkuNjE3NDc3LDIwLjgzMjI3MzQgMTkuNjE3NDc3LDE1Ljg0OTczMDMgWiIgaWQ9IkZpbGwtMTMiIGZpbGw9IiNFMzBFMTciPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOS42MTc0NzcsMTUuODQ5NzMwMyBDMTkuNjE3NDc3LDIwLjgzMjI3MzQgMjEuOTQ1MTAzLDI1LjI2ODM5MzQgMjUuNTY5MjI3NywyOC4xMzkyMjYgQzI5LjE5MzE1MTMsMjUuMjY4MzkzNCAzMS41MjA3NzczLDIwLjgzMjI3MzQgMzEuNTIwNzc3MywxNS44NDk3MzAzIEMzMS41MjA3NzczLDEwLjg2NzE4NzEgMjkuMTkzMTUxMyw2LjQzMTA2NzE4IDI1LjU2OTIyNzcsMy41NjAyMzQ1NSBDMjEuOTQ1MTAzLDYuNDMxMDY3MTggMTkuNjE3NDc3LDEwLjg2NzE4NzEgMTkuNjE3NDc3LDE1Ljg0OTczMDMgWiIgaWQ9IkZpbGwtMTQiIGZpbGw9IiNFQTYwMEEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01MC44ODQ3NjQ2LDI0LjMyNzYzMjggTDUwLjg4NDc2NDYsMjMuOTIxOTM2NyBMNTAuNzUzMDg0MywyNC4yNzE5NDUgTDUwLjYwNzkzNDMsMjQuMjcxOTQ1IEw1MC40NzYyNTQsMjMuOTIyNzQwOCBMNTAuNDc2MjU0LDI0LjMyNzYzMjggTDUwLjMzOTE0NTYsMjQuMzI3NjMyOCBMNTAuMzM5MTQ1NiwyMy43NDI4MTEyIEw1MC41MzU1NjA0LDIzLjc0MjgxMTIgTDUwLjY4MDkxMTQsMjQuMTE3MzQ2MyBMNTAuODI1MjU3MiwyMy43NDI4MTEyIEw1MS4wMjE4NzMsMjMuNzQyODExMiBMNTEuMDIxODczLDI0LjMyNzYzMjggTDUwLjg4NDc2NDYsMjQuMzI3NjMyOCBaIE00OS45MDIyODg1LDI0LjMyNzYzMjggTDQ5LjkwMjI4ODUsMjMuODY4ODYyNSBMNDkuNzE2NzI5OCwyMy44Njg4NjI1IEw0OS43MTY3Mjk4LDIzLjc0MjgxMTIgTDUwLjIyNDk1NTYsMjMuNzQyODExMiBMNTAuMjI0OTU1NiwyMy44Njg4NjI1IEw1MC4wMzkzOTY5LDIzLjg2ODg2MjUgTDUwLjAzOTM5NjksMjQuMzI3NjMyOCBMNDkuOTAyMjg4NSwyNC4zMjc2MzI4IFoiIGlkPSJGaWxsLTE1IiBmaWxsPSIjRjU5RjAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzUuMjkxMjU4MiwwLjE3NTkyODk2NiBDMzEuNjE3Mjc1OSwwLjE3NTkyODk2NiAyOC4yNDE0MzQxLDEuNDQzMjc2OTMgMjUuNTY5MjI3NywzLjU2MDIxNDQ0IEMyOS4xOTMxNTEzLDYuNDMxMjQ4MTIgMzEuNTIwNzc3MywxMC44NjcxNjcgMzEuNTIwNzc3MywxNS44NDk3MTAyIEMzMS41MjA3NzczLDIwLjgzMjI1MzMgMjkuMTkzMTUxMywyNS4yNjgzNzMzIDI1LjU2OTIyNzcsMjguMTM5MjA1OSBDMjguMjQxNDM0MSwzMC4yNTYxNDM0IDMxLjYxNzI3NTksMzEuNTIzNDkxNCAzNS4yOTEyNTgyLDMxLjUyMzQ5MTQgQzQzLjk0NzU4MjUsMzEuNTIzNDkxNCA1MC45NjUwMzk0LDI0LjUwNjAzNDUgNTAuOTY1MDM5NCwxNS44NDk3MTAyIEM1MC45NjUwMzk0LDcuMTkzMzg1ODMgNDMuOTQ3NTgyNSwwLjE3NTkyODk2NiAzNS4yOTEyNTgyLDAuMTc1OTI4OTY2IFoiIGlkPSJGaWxsLTE2IiBmaWxsPSIjRjU5RjAwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" /></div><b>Credit Card</b></li>
              <li className="payment-item"><div className="payment-brand"><PaymentLogo name="SPayLater" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAxIiBoZWlnaHQ9IjExNiIgdmlld0JveD0iMCAwIDIwMSAxMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8cmVjdCB3aWR0aD0iMjAxIiBoZWlnaHQ9IjExNiIgZmlsbD0idXJsKCNwYXR0ZXJuMF80NTJfMTIxNzUpIi8+CjxkZWZzPgo8cGF0dGVybiBpZD0icGF0dGVybjBfNDUyXzEyMTc1IiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF80NTJfMTIxNzUiIHRyYW5zZm9ybT0ibWF0cml4KDAuMDAyNDk4MzMgMCAwIDAuMDA0MzI5IC0wLjAwMDkxNTMzNyAwKSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzQ1Ml8xMjE3NSIgd2lkdGg9IjQwMSIgaGVpZ2h0PSIyMzEiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBWkVBQUFEbkNBWUFBQURmTFdzL0FBQUFDWEJJV1hNQUFCWWxBQUFXSlFGSlVpVHdBQUFSVWtsRVFWUjRuTzNkVFd5VlZSN0g4ZFAzUWluYWpTYTZHSEdEQzFwWVFHQW5oVFczVEtLVG9KaGhrRm5nd25hRkNVaGlJcERvcXQzSVFtR2NERXFpaXhtdUt4ZTh6R0lTaUN5MHNwQ040QUlUV0ZpaEZPZ2JuZndlNzlPMGw5N0xQZWMrNytmN1NVaExvWHFmYzh2emU4N2IvN1FzTEN3WVd4T2xnZTNHbUdlTk1adXN2eGtBa0NXL0cyTytOOGJjN0N1UDM3UjlYUTJGeUVScFFJR3h6eGl6MnhqekttOC9BQlRTTDhhWVM4YVkwYjd5K1BlTmZFUGRFS21FeDBqbDF6TlJ2bElBUUtiOTF4anpRVjk1L0ZLOUYxa3pSQ3BEVnA4YlkvN0Urd3dBM2hycks0K1AxTHI0RlVOa29qU2dvYXQvOERNREFEREcvR0NNMmQ1WEh2Kzl1akZhcTc5QWdBQUFxbXpVWEVsbGltT1paU0ZDZ0FBQWF0aFltWFJmWmpGRUprb0RMMmxHbnRZREFOU3djYUkwc0N3bmx2WkVQbWNGRmdEZ0tZWW5TZ09MZXdTREVLbXN4R0wvQndDZ0VZdTlrYkFuVW5QNUZnQUFWVjZ0VElHWTFzcHMreEF0QkFDd0VIUStXaXVsVEFBQXNMRTlEQkdLS0FJQWJHbWwxck9FQ0FEQTFhYldTa2wzQUFDc3RWWjJJUUlBNEJRaUFBQTRJVVFBQU00SUVRQ0FNMElFQU9DTUVBRUFPQ05FQUFET0NCRUFnRE5DQkFEZ2pCQUJBRGdqUkFBQXpnZ1JBSUF6UWdRQTRLeWRwdk5YZS8rV3hXdHZXN2ZldFBiMEx2NSs3c1oxc3pBMUdYeisrUFl0OC9qT3I3NDNGNEFWRUNJZWFIdjVGZE8rWWJOcGYva1YwL3JjQzhIbkxoUWs4emV1bS9tZmZ6S3oxNjRHSDhPZ0FlQ25sdDkyOVMvdzNoZExTMCt2NmRpMnczUnUyeEgwTmxwV3I0bnQraFFxczVjdm1Ka3JGNE5RQWVDVlFVS2tRRHAzRGdYQjBiRjFNSldMVWsvbFVmbE1FQ29NZndGZUlFVHlUcjJPN3RKZTB6WDBWcXc5RGxzekY4cG0rdnc1TS9mamR4NjhDNEMzQ0pHOHltcDRWSnU3ZHRVOFBIdVNNQUdLaVJESm03eUVSeldGeWRUbyt3eHpBY1ZDaU9TSkpzbDdoajhNVmxqbDFhT3pKNE41RTFaMUFZVkFpT1NCZWg4OUk4ZFNtekNQbW5valUyTkhHZUlDOG0rUUhlc1pwOTdIMnJHdkN4TWdvcDVVNy9GVFp0V2VneGw0TlFDYVFZaGtXRmRwYjNDenpmUHdWVDNkZXc2YTNoT25nNTRXZ0h3aVJESkt3MWVyRHh3cS9IVnE5N3g2V3RwVkR5Qi9DSkdNMFZPNW5zNDdkNVFTZldHYXA1ais1b3RnNGx1NzBKTVVERytkT0UyUUFEbkV4SHFHaEFHaVlvaEowc2JBQjU5K3RHekZsSGEvYXlWWWtoWWUzQStXQVd2SE82SzN0T0Ntc0xBQkVXQjFWbGFrRlNEYXZ6RjVlUCtLZjZhSjcrNFVKcjhuajd6TkRjNkJlbkw2T1Fvck1vZWhVYS9ncG5xZHFpd3djLzRjeTY3aGdoREpnclFDUkxUVVZqZVFsZWgxUFh2MmY0bS9KdlZJRkd3VWRGeE93MzZ0ejc4WWZHeGIrcm5DbzhtTnAycnpoMTkrWXFiTFo2Si80U2l5UVVyQlo4RHF2NytYU29DWXlseElMWG95MWMwbDZaM3grdjhwVkgwTGtxQVhVZWxOdEs5YmIxcldyUDJqVjZIQWlIbUZudHBjQ3psMFhFRDEwQ1pRRHlHU01nVkkwcFBvTm5RVGR6MS9wQm02cVdsT1JrRlNwQnRhR0JJZGxUWnRaTWdwU2ZwWlZIRGRHMzQ5RTY4SDJVZUlwRWhuZm5UdGV0UGI2MzhhM2N5MDFQbis4ZUZzdjlBbHFvZWNGdWNwSWhoeVNrclk3bHJrQUR3TklaSVMzV1QwRHhYMWFhZStKdmhWQ1RnTDBoeHlTcEo2SkRPWEw3QlNEazlGaUtSRUFaS25LcnhwMGdxeEpFOU9ESWVZbGc0NWhhdWVmS0k1a3J1RUNKNkNFRW1CeXBsa1pRdzhMelEvRXRVNGZUamtGQzZGemVPUVV4TFVUdG92Vkd2MUhtQUlrZVRwSCthcU45N3g3YkticGh1K3k3Q1dib0lkL1ZzV2g1dUtXb2NzTGpxN2hoQkJQWlE5U1poV1kvRzA2MFlIY2RtR2dDYTNOYjZ2bmg4QllpK2M3d0ZxSVVRU3BMSDFJcFYwVDVyQzE3WVhOODFUZE5Pb2FZWjZDSkVFY1g1Rzg5U3JzSGt5MW1aSzFRYUR1M2JQRmhUQURpR1NFUFZDbUV5UGhtMXZaSVlWUmsyaEo0SjZDSkdFMEF1SmptMXZSSHNkNnBWM1FYMGNHb1o2Q0pFRTZFbU9Ya2kwYkhzanMxY3VaditpZ0J3aVJCS2daWktJbGtyRzJEd2hNOEVPeElNUVNZQnVlSWlXVm1yWnRLdDJ1NnNpTVlCb0VTSXgwMlkzOW9YRW85TXluS2tEQlVTUEVJbVo3WTBPamRPZUc1c2hyVmxPU3dRaVI0akVyUHBjYTBUTFpraUxJM2VCNkJFaU1RcXF2ektVRlN1Ym5wNlcrVEl2QWtTTEVJbFJCOHQ2WTJmYjA2TTNBa1NMRUlrUlExbnhVMC9QWmtlMVQyZTJOMlB1MnRYRlgvTTNydWYzUWhBN1NzSEhpQTJHeVZDbDJVYkRZYTZBTjBUZDVLdlBvZGZRM2VQYnQ1Wi9iV3J5aVVEUTl4R3NhQVloRWhQcURTV256YklnWTVxQ20zdlZhNmgxSTUrOWR2V0pyekVjaDZ3aFJHTENHUXpKQ1lZTkd6eXN5dWFwVzVQd0svMzlsVzdrY3l2MEJvSU5qbFZmQTRxR0VJa0o1Yk9UWTFzZ2NHcnM2Qk85QVEzOVVLUVJzRWVJSVBmYUxBT2I0MTZCNkxBNkt5YXN6QUxnQTBJRWhVQm9BK2tnUkFBQXpwZ1RRVjA2aHlQS1phVXRhOVlHY3hqc29RR0tnUkJCWFhGTlFtc0o5Sm9qWTlhVDRnQ3loUkJCS3JTY2R2THdmck4yN092RTk5Um8vb1M2WnU3bUt4c20yZmdJUTRnZ1RkcUk5Nmg4eHF3K2NDalJWOUcxYzhoMDdpangza2RBdGJVMDVLa0R2OWhZNlNjbTFwR3FOSXI3VVUwZ09wcmI2aG4rMER4ejZsdXphczlCNjQyZnlEOUN4SE5wejBsRWRVT25pR0M2VkUyNWU4L0JZSGlTdW5GK0lVUmlrcGNTR3QybHZhaytQV3BvS1FvTXBXU0RIZ3JXam41bE9pTjZYNUdEOXp3RHI2R1Fxc3R3WjVYKzBmZWVPSjFLa1BTTUhJdGtxYS90YVlVOEtjZFBRMXdFaVIrWVdJL0pmSTZLK1dsSVMyUGFXczY3Y1A5ZUl2OVAzV0RTR3NyaXlPSmtLRWpVUTlTa080cUxFSWxKM2lyQzZzYmF0ZXZOREx3U2V6YVQ4MHlxSjB1OXpYdnZ2a2FGNUFKak9Dc21yS0ZQenJ6RjBHSHI4eS9tLzRKelJBOG5DaElVRnlFU0k4Nm1Ub1pOTzdQSk1IbWE5NkpBWm5FUklqR2FXK0Y0VTBUUHB0ZEhUeVFkV2dXSVlpSkVZalRMa0Zic2JJT2FXbDNwNk5nNnlIeFVRUkVpTVdKZUpINHpGaXQvdEl5WkVFa1BRMXJGUklqRVNNc2JtUmVKbDgzeVVXNWk2ZXFnL1F1SkVJblpOT2Q1eCtaeHBacHNvN2lKcFl2aHJHSWlSR0xHUnF2NHFBS3dEWTNMSXoxVUNpZ21RaVJtZWxLZXZYS3gwTmVZRnB1QTFsTXdUOExwb2xKQU1SRWlDV0JJSzNvS1pxdWhyRzA3OG5OeFFJNFFJZ25RRXpObEg2SmxPNVFWVmJWZ0FNc1JJZ2w1ZVBha0Y5ZVpCTzBOc1ZrK3JiRjRsdllDOFNCRUVxSUt1ZlJHb21FYnlQUkNnUGdRSWdtaU45STgyMTZJcVpTZEJ4QVBRaVJCNm8ydytiQTV0a0dzQUdGVkVCQWZRaVJoRHo3NzJLdnJqZExNaGJKMUwyVFZub05adnl3ZzF3aVJoT2ttcUpzaDdPZ0kzQWVmZm1UMVBWR2VuZ2hnWllSSUNuUXp0RDBYM0hkVG8rOEh0Y2hzMEFzQjRrZUlwRUEzdy92SGg3MjdibGZhV0doYlBvWmVDSkFNUWlRbEd0YWEvdVlMTDYvZGhwWkZxeGRpaTE0SWtBeENKRVVhMXVMMHc5bzA1SGYveElqVE1CYTlFQ0FaaEVqS05LekZzdCtWS1dUbmYvN0o2bnNVSGwxRGJ5WDNJZ0hQRVNJcDAxUDIxTmhSSnRxcnFFMW1IQXBYcnY3N2Urd0xBUkpFaUdTQW5yWW5EKzhuU0NvMFYrUVNJS3JVeTVraFFMSUlrWXdnU1A2Z1BUUzIrMEZNWlJpclorUllQQzhLUU8xL2V6Uk5kdmdlSk5yTjc3SVNTeFFnREdNQnlTTkVNa1pCY3UvZDE3eWJiTmNjeUxUbEdTRWhyY1pxMzdBNWpwY0Y0Q2tJa1F6UzNnajFTSHc0VmxlOXJza2pienZOZ1pqS1BFZzNlMEtBMUJBaUdSWHVhbjlVNFBMeDZtMnAxMlZiVkRHa3c2YVlCd0hTUlloa25FcWY2MG05YUFkYUtSenZEYi91ZkYwdFBiMm05OFJwNWtHQWxCRWlPYUFuZGQxd2kxQW1KZWg5alB5bHFRTzZDQkFnT3dpUm5ORHdscGErNmdhY3gxSXBRU24zeno0T3d0QjJGL3BTWVlCd1pqcVFEZTI4RC9rU0xnUFdoUExxQTRjeVh5Tks0VEY5N2wvbVVmbU1kUTJzYWdRSWtEMkVTRTZwTlByZHl4ZUNrdWRkTzRjeXQ4UTF5dkF3QkFpUVdZUkl6bWxwckg1cHBWSjNhVy9RUTBsenJrQkRiZE9WMXhTVllCWFc4SWNFQ0pCQmhFaEJhSmdyM08ydElPbFVIYW1FQWtXVDVRb085WTZpWGtXbUFHRVNIY2d1UXFTQWRETVBUd0xVVGJoejYyRHdVVS95VWN5aHFMZWg0Smo5OGJ0ZzVWZ1V3MVVyMFZDZGVpQUFzb3NRS1RqMVVCNHVXUTJsdVFVRmlqNjJWNGFIV3A5LzhZbHdVVENFcTZnZTYvTWIxODNqMjdjUzJhK2kxNmFTN3AwN1NoNjlVMEErRVNLZVVUaUVPOFJ0enkxUGdnSnV6ZUZSVGlZRWNvSVFRU2FvOTZHRkFkVEJBdktGRUVIcTJ2dTNCSE1mOUQ2QS9DRkVrQnFGaHVZK09JMHdQZUhLdXFWelhocFMxSHZUMGI4bGVHOElkOVRUOHR1dS9nVmFDRW5TVFduVkcrOHdjWjRpblNENThNdFBHbG9vb1o2aXFpTkVzVTlub2pTUTZYYUJ0VUY2SWtnTTRaRStWUkxRRVFNMjVmZkRBcUE2L0lzNUsxUWpSQkE3YlhwVWFSYUdyZElWSEFCMmVMOXpBVXhWWHA2Lzh5dDdkN0FNSVlKWXFOZlJQZlFXWStvWjBXeUFoTUp5TmdRSlFvUUlJcU94ODZEY0NzR1JPU3FKMDJ5QWhCUWs0ZnNNRUNKd0V1NTg3OWl3T1FpUFlCYzg5YTB5U1dWcW90NVlxbEI2NXRTM3ZPY2dSSHluQUhnYTlTcmFubnRoc1R3S2daRXZ6WndpV1lzcUg2aEgwclhyVGUvYUU4c1JJcDdyUFg3Szl5WW9OQzNodFZtSlpXT2FFUEdlNFhoY29OaG1yMXlNN2ZvMHg1SkVRVTVrR3lFQ0ZOajg3VnV4WGh3aEFrSUVLRENWTTRsVDNQOTlaQjhoQXNEWnd2MTdOSjduQ0JHZ3dMUVVPMDVhcVFlL0VTSkFnYlZIVURTeEhqYVZnaEFCQ2t4MXkrSVNiRGlOT2FTUWZZUUlVR0M2eWNmVlc0Z3pvSkFmaEFoUWNDcUVHWWRWbElYM25pRkVnT0xUcnZLb2V5TmRwYjNNaHlCQWlBQWVXSE5rTExLTDFJb3NIUzRHR0VJRThJUG1SbnBHampWOXJacE1YM040bEFLY1dFU0lBSjdRc2NUcWtianVIVkVQUk9YZkdjYkNVb1FJNEJFZEpMVjI3R3VybFZVS0hVMmlyeDM5aWg0SW5rQXBlTUF6Nmtsb1NFcDFyeDZWendTbDRsY3FwS2llaDg3Rzc5dzVSSGlnSmtJRThGUXdUMUk1SzExbnNDODlQcmQ5dzJaK0xOQVFRZ1JBME5NZ09PQ0NPUkVBZ0ROQ0JBRGdqQkFCQURnalJBQUF6Z2dSQUlBelFnUUE0SXdRQVFBNEkwUUFBTTRJRVFDQU0wSUVBT0NNRUFFQU9DTkVBQURPQ0JFQWdETkNCQURnakJBQkFEZ2pSQUFBemdnUkFJQXpRZ1FBNEl3UUFRQTRJMFFBQU00SUVRQ0FNMElFQU9DTUVBRUFPQ05FQUFET0NCRUFnRE5DQkFEZ2pCQUJBRGdqUkFBQXpnZ1JBSUF6UWdRQTRJd1E4ZHpqTzcvNjNnUUFta0NJZUk0UUFkQU1Rc1J6aEFpU01uZnRLbTFkUUlTSTUrWisvc24zSmtCQ0ZxWW1hZW9DSWtROE4zdjVndTlOZ0lUTTg4QlNTSVNJNXpTY05YL2p1dS9OZ0FUTVhMbElNeGNRSVFMenFIeUdSa0NzZ29jVmVpS0ZSSWpBekp3L3h3UTdZdlh3N0VrYXVLQUlFUVFlZlBZeERZRlk2QUZGRHlvb0prSUVBVTJ3ejF3bzB4aUkzTlRZVVJxMXdBZ1JMSHJ3NlVkTXNpTlMwOTk4WWVaKy9JNUdMVEJDQkl1MGpuL3k4SDZDQkpIUTVrSTltS0RZQ0JFc1E1QWdDck5YTHByN3g0ZHBTdzhRSW5oQ0dDUWFpZ0JzNmVkR0FjSU9kVCswL0xhcmY4SDNSa0J0N2YxYnpPb0RoMHpidXZXMEV1cFM3MVdyL0pnRDhjb2dJWUtHZEd6YllicDJEcG1PcllNMEdKYlIzTWYwK1hNczQvVVRJUUk3TFQyOVFlK2tmZDE2MC9ieUs4SHY0Ui8xTnVidi9CcDhaS09xMXdnUkFJQ3pRU2JXQVFET0NCRUFnRE5DQkFEZ2pCQUJBRGdqUkFBQXpnZ1JBSUF6UWdRQTRJd1FBUUE0STBRQUFNNElFUUNBTTBJRUFPQ01FQUVBT0NORUFBRE9DQkVBZ0ROQ0JBRGdqQkFCQURoVGlQeEM4d0VBWENoRWJ0SnlBQUFYQ3BIZmFUa0FnSU9iQ3BGTHRCd0F3TkxkdnZJNElRSUFjUElmZlZOclgzbjhleWJYQVFDVy9naVJ5dmVNMG5vQWdBYjkwbGNlWHhZaW45TWJBUUEwNklQd3I3VXNMQ3dFbjB5VUJuWWJZLzVOQ3dJQTZ2aWhyenkrS2Z6anhSM3JsYTdKUDJrNUFFQU5kNDB4dTVmK1VYWFpreEdsREswSEFGakJQaTNyWGZybFpTSFNWeDdYeHNQdEJBa0FZQW4xUVA0V1RxWXZ0VGduVW0yaU5LREo5ci9TaWdEZ05TMjYybDNaRHZLRW1sVjgrOHJqKzR3eGYyYlZGZ0I0YTh3WXM2bFdnSmg2UFpHbEprb0QreXJ6SlJ2NVdRS0FRcnRiMlVqNFFmWDh4MG9hQ3BIUVJHbmdwY3JNdkQ1dWF1eTdBQUFacC9sdzlUWXU5WlhIR3krRlpZejVQOWs3NkVJR3BiWnhBQUFBQUVsRlRrU3VRbUNDIi8+CjwvZGVmcz4KPC9zdmc+Cg==" /></div><b>SPayLater</b></li>
              <li className="payment-item"><div className="payment-brand"><PaymentLogo name="Touch ’n Go" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExOTlfMzgyMikiPgo8cmVjdCB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHdpZHRoPSI1MiIgaGVpZ2h0PSI1MiIgZmlsbD0id2hpdGUiLz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxXzExOTlfMzgyMikiPgo8cmVjdCB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIGZpbGw9IndoaXRlIi8+CjxtYXNrIGlkPSJtYXNrMF8xMTk5XzM4MjIiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSItMSIgeT0iMCIgd2lkdGg9IjUzIiBoZWlnaHQ9IjUzIj4KPHBhdGggZD0iTS0wLjA2Nzg3MTEgMC4wMDAyNDQxNDFINTEuOTk5OFY1Mi4wNjQ1SC0wLjA2Nzg3MTFWMC4wMDAyNDQxNDFaIiBmaWxsPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMTE5OV8zODIyKSI+CjxwYXRoIGQ9Ik0xMy4zMTMyIDIxLjgwNjNIMTEuNjM0OEMxMS40NjA0IDIyLjc5NDggMTEuMjkzIDIzLjc0MzQgMTEuMTI1OCAyNC42OTE4QzExLjE1ODMgMjQuNzA4OSAxMS4xOTA5IDI0LjcyNTkgMTEuMjIzNiAyNC43NDNDMTEuOTAzMyAyMy43ODc3IDEyLjU4MjkgMjIuODMyNCAxMy4zMTMyIDIxLjgwNjNaTTI5LjY2NzUgNDIuNTc4OEMyOS45MjA4IDQyLjU3ODggMzAuMDYzOCA0Mi41NjE2IDMwLjIwMTIgNDIuNTgxOEMzMC43NjYgNDIuNjY1NCAzMS4wNjQ3IDQyLjQ5ODkgMzEuMTYxMyA0MS44NjY0QzMxLjMyMzUgNDAuODA1MyAzMS41OTYgMzkuNzYxNyAzMS44MTQzIDM4LjcwODlDMzEuOTYyMyAzNy45OTU5IDMyLjA5NjggMzcuMjc5OCAzMi4yNDU0IDM2LjUyMzZDMzIuMDI3NiAzNi41MDU1IDMxLjkwOTQgMzYuNTAzIDMxLjc5MzkgMzYuNDg0OEMzMS4xNzU4IDM2LjM4ODggMzAuODA4IDM2LjU1MTcgMzAuNzg3NCAzNy4yNzM3QzMwLjc3NTEgMzcuNzAyOSAzMC42MDI5IDM4LjEyNjYgMzAuNTEyMyAzOC41NTVDMzAuMjMyNSAzOS44NzUgMjkuOTU3NiA0MS4xOTYgMjkuNjY3NSA0Mi41Nzg4Wk0zMy4xMTI2IDQyLjU1NUMzMy41MTA0IDQwLjY0OCAzMy45MDM5IDM4Ljc3ODQgMzQuMjg0IDM2LjkwNTlDMzQuMzA4NiAzNi43ODUgMzQuMjcxMyAzNi41NjYxIDM0LjE5MTYgMzYuNTIyNkMzMy42NTE3IDM2LjIyNyAzMy4wMjk1IDM2LjU2MDIgMzIuOTAzNyAzNy4xNzQ4QzMyLjcwODUgMzguMTMwMyAzMi40OTk4IDM5LjA4MjkgMzIuMzAxNCA0MC4wMzc5QzMyLjEyOTggNDAuODY0MyAzMS45NjQ4IDQxLjY5MTkgMzEuNzg5NSA0Mi41NTVIMzMuMTEyNlpNNDIuMjAzNyA0MS40NzIzQzQxLjg5MTcgNDEuNDcyMyA0MS42OTIgNDEuNDY2MSA0MS40OTI5IDQxLjQ3MzVDNDEuMTM0NiA0MS40ODY4IDQxLjAxNCA0MS4yOTU5IDQxLjA4MTkgNDAuOTc2NEM0MS4yMDkgNDAuMzc5OCA0MS4zNTQgMzkuNzg2OSA0MS40OTk2IDM5LjE1NjdINDIuNzM0N0M0Mi43OTY1IDM4Ljc4ODEgNDIuODUxIDM4LjQ2MiA0Mi45MTI3IDM4LjA5MjlDNDIuNDk0IDM4LjA3MzggNDIuMTM3NCAzOC4wNTc1IDQxLjc0ODQgMzguMDM5OUM0MS44MzQgMzcuNTMwNCA0MS45MTQzIDM3LjA1MjEgNDEuOTk0IDM2LjU3ODJDNDAuODc1MSAzNi4zMzA0IDQwLjc4NjEgMzYuMzY2MiA0MC41NTc0IDM3LjM3NTFDNDAuMjQxIDM4Ljc3MDcgMzkuOTYyMSA0MC4xNzQ0IDM5LjY1OSA0MS41NzNDMzkuNTI4NyA0Mi4xNzQ2IDM5Ljc4OTkgNDIuNTUwNCA0MC40MDcgNDIuNTczNEM0MC45Mjg5IDQyLjU5MyA0MS40NTIzIDQyLjU3NzUgNDEuOTk5MiA0Mi41Nzc1QzQyLjA2NjggNDIuMjExOCA0Mi4xMjcgNDEuODg2NSA0Mi4yMDM3IDQxLjQ3MjNaTTM5LjA1NTIgNDAuODg1OEMzOS4yMDE2IDQwLjI0NzMgMzkuMzM5IDM5LjY2OTYgMzkuNDY1MyAzOS4wODk1QzM5LjU5OTkgMzguNDcyMSAzOS4yODkzIDM4LjA4MTggMzguNjI3MyAzOC4wNzA0QzM3LjczNzQgMzguMDU0OSAzNi44NDY2IDM4LjA0NzQgMzUuOTU3MyAzOC4wNzM4QzM1LjM3NzcgMzguMDkwOSAzNC44NTQ3IDM4LjM0NzEgMzQuNjk3MyAzOC45MjE2QzM0LjQ0NTIgMzkuODQwOSAzNC4yNjA0IDQwLjc4NDMgMzQuMTI5IDQxLjcyOTJDMzQuMDQzOSA0Mi4zMzg5IDM0LjI4NzEgNDIuNTYwNSAzNC45MjI5IDQyLjU3MTFDMzYuMDk0MiA0Mi41OTA1IDM3LjI2NTkgNDIuNTc2NiAzOC40NzU2IDQyLjU3NjZDMzguNTY3NyA0Mi4yMTQgMzguNjU0MSA0MS44NzQyIDM4Ljc1NTUgNDEuNDc0MkMzNy44MDY3IDQxLjQ3NDIgMzYuODk5OCA0MS40NjkyIDM1Ljk5MzQgNDEuNDc2NUMzNS41ODk0IDQxLjQ3OTYgMzUuMzgwNCA0MS4zNTU5IDM1LjU0MzggNDAuODg1OEgzOS4wNTUyWk0xNS41NzA4IDQwLjg3OTlDMTUuNzA0OCA0MC4yMjQ2IDE1LjgxNDEgMzkuNjU3MSAxNS45Mzg0IDM5LjA5M0MxNi4wNzg0IDM4LjQ1NiAxNS44MDc4IDM4LjA4MjMgMTUuMTQ0NiAzOC4wNzA0QzE0LjI1NDUgMzguMDU0NiAxMy4zNjM3IDM4LjA1NjMgMTIuNDczNCAzOC4wNzA0QzExLjgyNyAzOC4wODA2IDExLjI4MDggMzguNDY3NiAxMS4xMzQ3IDM5LjA3NzdDMTAuOTMwNyAzOS45Mjg0IDEwLjc1NzYgNDAuNzg5NiAxMC42Mjk2IDQxLjY1NUMxMC41MjkzIDQyLjMzNTEgMTAuNzEzMiA0Mi41NTE3IDExLjM4ODkgNDIuNTY4MUMxMi41OCA0Mi41OTcxIDEzLjc3MjMgNDIuNTc2MiAxNS4wMDM4IDQyLjU3NjJDMTUuMDc0OSA0Mi4yMDQ2IDE1LjE0MDQgNDEuODYzOSAxNS4yMTUyIDQxLjQ3NDJDMTQuMjY2IDQxLjQ3NDIgMTMuMzc3OCA0MS40NjYxIDEyLjQ4OTUgNDEuNDc3OUMxMi4wOTU0IDQxLjQ4MzEgMTEuOTEzMyA0MS4zNDU1IDEyLjAzNDUgNDAuODc5OUgxNS41NzA4Wk0yOC4xMDkgMzkuNzY5N0MyNy41NDMyIDM5Ljc2OTcgMjYuOTk4IDM5Ljc4NiAyNi40NTM4IDM5Ljc2NjlDMjQuNTA0NSAzOS42OTg2IDI0LjQ5MTMgNDAuMTA1MyAyNC4yMDEgNDEuNTMyNkMyNC4wNjgyIDQyLjE4NDYgMjQuMzEyNyA0Mi41NTY2IDI0Ljk4OTEgNDIuNTcwM0MyNi4xNDQxIDQyLjU5MzYgMjcuMzAwMSA0Mi41ODgyIDI4LjQ1NTMgNDIuNTY0NUMyOC42MDI5IDQyLjU2MTMgMjguODQ4NSA0Mi4zOTg3IDI4Ljg3NjUgNDIuMjcyM0MyOS4xMjA3IDQxLjE1OTkgMjkuMzMzMSA0MC4wNDAzIDI5LjUzOTEgMzguOTJDMjkuNjM0NCAzOC40MDE2IDI5LjM3NjggMzguMDg3OCAyOC44NjggMzguMDc3N0MyNy42MzQ4IDM4LjA1MjUgMjYuNDAwOCAzOC4wNjk0IDI1LjE0MjggMzguMDY5NEMyNS4wNzgzIDM4LjQzODIgMjUuMDIxIDM4Ljc2NTQgMjQuOTUgMzkuMTcwM0MyNS44OTE0IDM5LjE3MDMgMjYuNzU4NCAzOS4xNzc1IDI3LjYyNTMgMzkuMTY2N0MyNy45OTQyIDM5LjE2MjEgMjguMjMyMyAzOS4yNDcyIDI4LjEwOSAzOS43Njk3Wk0yMS44ODMxIDQxLjE5MjRDMjEuODU2NiA0MC45MzU2IDIxLjg0NSA0MC44NjYgMjEuODQyNyA0MC43OTYzQzIxLjc5OTggMzkuNTQ1NCAyMS43NjUxIDM4LjI5NDEgMjEuNzA4NCAzNy4wNDM5QzIxLjcwMDQgMzYuODY0NyAyMS42Mzg4IDM2LjYwNTYgMjEuNTEzMyAzNi41MjkzQzIxLjA3MjcgMzYuMjYyIDIwLjI2MTQgMzYuNTQ5OCAyMC4wMzQ5IDM3LjAyMkMxOS40MDQ3IDM4LjMzNTcgMTguNzgzIDM5LjY1MzIgMTguMTU4MSA0MC45NjkyQzE3Ljk3MDUgMzkuNzIzMyAxNy44ODY5IDM4LjQ5MDQgMTcuODMxMiAzNy4yNTU5QzE3Ljc5NjMgMzYuNDc5MSAxNy44MTQ4IDM2LjQ3NjYgMTcuMDA4NyAzNi40ODc0QzE2Ljg1MjcgMzYuNDg5NiAxNi42OTY3IDM2LjUxMTUgMTYuNDU0NyAzNi41MzE0QzE2LjU3ODUgMzguNTYyMiAxNi43MDAyIDQwLjU1NDkgMTYuODIzNiA0Mi41Nzg4QzE3LjI0MjUgNDIuNTc4OCAxNy41NzM2IDQyLjUyOTkgMTcuODg0OCA0Mi41ODg2QzE4LjYwMjYgNDIuNzIzOSAxOC45MDg3IDQyLjM2MzIgMTkuMTU1NCA0MS43NTI3QzE5LjUwMzMgNDAuODkyNSAxOS45Mzk5IDQwLjA2ODQgMjAuMzM4NSAzOS4yMjkxQzIwLjM3ODggMzkuMjQxNSAyMC40MTkzIDM5LjI1NDEgMjAuNDU5NyAzOS4yNjY3QzIwLjUyNjggNDAuMzU1NSAyMC41OTQxIDQxLjQ0NDIgMjAuNjY0MyA0Mi41Nzg4QzIxLjEyOSA0Mi41Nzg4IDIxLjU1MzcgNDIuNTUwMSAyMS45NzI5IDQyLjU4NjdDMjIuNDE3MyA0Mi42MjU3IDIyLjY0NiA0Mi40NjgxIDIyLjgzODcgNDIuMDUxOUMyMy41MTk2IDQwLjU3OTggMjQuMjU2MSAzOS4xMzM1IDI0Ljk2MTkgMzcuNjcyOEMyNS4xMzMgMzcuMzE4OSAyNS4yNjc5IDM2Ljk0NzUgMjUuNDI0OCAzNi41NzA5QzI0LjIwNzIgMzYuMzM5NiAyNC4xNzU4IDM2LjM3NTIgMjMuNzE1MiAzNy4zNzcyQzIzLjE1MTkgMzguNjAyNCAyMi41NDkzIDM5LjgxIDIxLjg4MzEgNDEuMTkyNFpNMzcuODggMTMuMDE4NEMzNi4yODY4IDEzLjAxODQgMzQuNzUwMyAxMy4wMTcxIDMzLjIxMzkgMTMuMDE4OEMzMS44Nzg0IDEzLjAyMDYgMzEuMjA3IDEzLjU4NzggMzAuOTczOCAxNC45MTE5QzMwLjc0MjQgMTYuMjI2NyAzMC41MTU4IDE3LjU0MjUgMzAuMjg1NCAxOC44NTc5QzMwLjExNjYgMTkuODIwNyAzMC42MDg1IDIwLjQ1NDEgMzEuNTgwNSAyMC40NjQ4QzMzLjEgMjAuNDgxNiAzNC42MTk0IDIwLjQ2OTQgMzYuMTM5IDIwLjQ2NTNDMzYuMjM0MyAyMC40NjUyIDM2LjMyOTMgMjAuNDI4IDM2LjQ1MiAyMC40MDI1QzM2LjU4MjQgMTkuNjIyMyAzNi43MTA3IDE4Ljg1NjUgMzYuODUxNyAxOC4wMTIzSDMzLjA3MjJDMzMuMjI4OSAxNy4xMzAyIDMzLjM3MjUgMTYuMzIwNyAzMy41MjM2IDE1LjQ2ODJDMzQuNzA0NiAxNS40NjgyIDM1LjgzNzEgMTUuNDgyIDM2Ljk2ODIgMTUuNDU0NkMzNy4xNTQzIDE1LjQ1MDEgMzcuNDY0NSAxNS4yOTUyIDM3LjQ5NzkgMTUuMTU3MUMzNy42NjIzIDE0LjQ3NTQgMzcuNzUyNyAxMy43NzYzIDM3Ljg4IDEzLjAxODRaTTIzLjU0MDkgMTcuOTgzNUMyMy44Mjk5IDE2LjMxODggMjQuMTExMyAxNC42OTgzIDI0LjQwMjYgMTMuMDE5OUMyMy41NzY5IDEzLjAxOTkgMjIuODI5NiAxMy4wMDU3IDIyLjA4MzggMTMuMDMzNUMyMS45NTc5IDEzLjAzODQgMjEuNzUxNSAxMy4yMDgxIDIxLjcyOTIgMTMuMzI4OUMyMS4zODE4IDE1LjIxODEgMjEuMDMyOCAxNy4xMDgxIDIwLjc0MTMgMTkuMDA2NUMyMC42MDQgMTkuODk5OSAyMS4xMTc1IDIwLjQ0MjYgMjIuMDE3MiAyMC40NjQ4QzIyLjc4NjQgMjAuNDgzNSAyMy41NTcxIDIwLjQ0OTUgMjQuMzI1OSAyMC40NzU5QzI1LjEyOTcgMjAuNTAzMyAyNS43ODM3IDIwLjIxMTIgMjYuMzQxNiAxOS42NTU3QzI2LjQzMTQgMTkuNTY2NiAyNi41Mzk0IDE5LjQ5NjMgMjYuNjkxMSAxOS4zNzU2QzI2Ljk2MjIgMjAuNDkyIDI3Ljc4NzQgMjAuNTQ5NSAyOC42NTc5IDIwLjU1NzFDMjguOTg1MSAyMC41NTk4IDI5LjEwNzQgMjAuNDU2NiAyOS4xNjA4IDIwLjEyMjhDMjkuMzg0MSAxOC43MjUyIDI5LjY0MjUgMTcuMzMyOCAyOS44ODg1IDE1LjkzODlDMzAuMDU1NiAxNC45ODk2IDMwLjIyMzMgMTQuMDQwNiAzMC4zOTgyIDEzLjA0OTFIMjcuNzgwOEMyNy40ODQ4IDE0LjY5MTIgMjcuMTg4OSAxNi4zMzM4IDI2Ljg5MTQgMTcuOTgzNUgyMy41NDA5Wk04LjE4NjggMTIuNDEyNEM3LjcwODkzIDE1LjE0MjMgNy4yNDk2NiAxNy43NjYxIDYuNzc1ODkgMjAuNDcyN0M3LjY2OTI2IDIwLjQ3MjcgOC40OTU1OCAyMC40NTA0IDkuMzE5ODQgMjAuNDgyQzkuNzE5MzggMjAuNDk3NCA5Ljg0NTczIDIwLjMyNTcgOS45MDM3MSAxOS45NzM3QzEwLjEwMTUgMTguNzc2MSAxMC4zMTY0IDE3LjU4MTEgMTAuNTI3NCAxNi4zODU2QzEwLjc1OTIgMTUuMDczMSAxMC45OTM2IDEzLjc2MTEgMTEuMjMzNSAxMi40MTExSDE0Ljc3MTdDMTQuOTE1OSAxMS41ODcxIDE1LjA1MzMgMTAuODAyMSAxNS4xOTQxIDkuOTk2MjdINS4wNzA5OUM0LjkzMDI5IDEwLjgxMjggNC43OTc3OSAxMS41ODExIDQuNjU0NjEgMTIuNDEyNEg4LjE4NjhaTTIxLjQ4IDI5LjI2MDVDMjEuODE1MyAyNy4zMTU1IDIyLjE3MjYgMjUuNDA4MyAyMi40NjA4IDIzLjQ5MUMyMi41NzQxIDIyLjczNjIgMjEuOTcwMiAyMS45MTU2IDIxLjI1MDkgMjEuOTI2NkMxOS42OTA0IDIxLjk1MDkgMTcuOTk2OCAyMS4zODIxIDE2LjY0ODkgMjIuODYzOEMxNi43MDk3IDIyLjQzODMgMTYuNzU0NiAyMi4xMjQ5IDE2LjgwMjIgMjEuNzkyNEgxMy44MjIxQzEzLjM3NzggMjQuMjkwOCAxMi45MzcxIDI2Ljc2ODkgMTIuNDkwNCAyOS4yNzk5SDE1LjQ5MjNDMTUuNzQ1OCAyNy44NDYzIDE1Ljk4NjkgMjYuNDMzMiAxNi4yNTUgMjUuMDI1QzE2LjI4ODkgMjQuODQ2NCAxNi40NTc3IDI0LjU1NTUgMTYuNTcyNyAyNC41NTFDMTcuNTc2IDI0LjUxMzUgMTguNTgwOCAyNC41Mjk2IDE5LjYwNzIgMjQuNTI5NkMxOS41ODI5IDI0LjcwMTUgMTkuNTczNyAyNC43ODExIDE5LjU2MDUgMjQuODYwMkMxOS4zNzkgMjUuOTM3MSAxOS4xNjc2IDI3LjAxMDEgMTkuMDI1MSAyOC4wOTIyQzE4LjkzMDIgMjguODEzMyAxOS4yMjI4IDI5LjE5NyAxOS44NTgzIDI5LjI1MTNDMjAuMzc3MyAyOS4yOTU4IDIwLjkwMzIgMjkuMjYwNSAyMS40OCAyOS4yNjA1Wk0xNS41NDQ0IDIwLjQ3MjdDMTYuMjUzMyAyMC40NzI3IDE2Ljk2MjQgMjAuNDc0NiAxNy42NzE2IDIwLjQ3MjJDMTguOTkyNiAyMC40NjgxIDE5LjY0NjYgMTkuOTIxMyAxOS44NzU3IDE4LjYyNEMyMC4xMTE2IDE3LjI4OTIgMjAuMzQyNiAxNS45NTM1IDIwLjU3MzggMTQuNjE4MkMyMC43MzI2IDEzLjcwMDIgMjAuMjM0MSAxMy4wNDExIDE5LjMwMTggMTMuMDI2M0MxNy42NjEyIDEzLjAwMDIgMTYuMDE5NSAxMi45OTk2IDE0LjM3ODggMTMuMDI3MkMxMy40NTEzIDEzLjA0MjggMTIuNzQ0IDEzLjY4ODEgMTIuNTczMSAxNC42MTU4QzEyLjMwOTYgMTYuMDQ4NCAxMi4wNTU0IDE3LjQ4MjYgMTEuODE3NSAxOC45MTk3QzExLjY2MTMgMTkuODYzMiAxMi4xNTQ5IDIwLjQ0NzkgMTMuMTEzMSAyMC40Njc3QzEzLjkyMzMgMjAuNDg0NSAxNC43MzM4IDIwLjQ3MTEgMTUuNTQ0NCAyMC40NzI3Wk00Ni4yNTk5IDIwLjQzNjRDNDYuMzg0MyAxOS43NTM3IDQ2LjUwMzcgMTkuMTIwOSA0Ni42MTQ2IDE4LjQ4NjdDNDYuODQxIDE3LjE5MTQgNDcuMDg0MyAxNS44OTgzIDQ3LjI3ODMgMTQuNTk4NEM0Ny4zOTQxIDEzLjgyMTkgNDcuMDQ3MSAxMy4xNDQ0IDQ2LjQzMDUgMTMuMTUxMkM0NC45MDQzIDEzLjE2NzYgNDMuMjM2NSAxMi41MTIzIDQxLjg5NzYgMTQuMDE0NUM0Mi4xMjU1IDEyLjcwMDQgNDIuMzM1OCAxMS40ODkgNDIuNTU5NSAxMC4yMDA4QzQxLjc2MSAxMC4yMDA4IDQxLjAxNTMgMTAuMjIxIDQwLjI3MTkgMTAuMTkyNUMzOS44Nzk0IDEwLjE3NzQgMzkuNzYyNyAxMC4zMjc0IDM5LjY5OTkgMTAuNjk5MkMzOS4zMjI2IDEyLjkzMzIgMzguOTEzNyAxNS4xNjE1IDM4LjUyMDYgMTcuMzkyOUMzOC4zNDM3IDE4LjM5NjUgMzguMTc4MyAxOS40MDIzIDM3Ljk5NyAyMC40NzA1QzM4LjgxMzUgMjAuNDcwNSAzOS41NDAxIDIwLjQ1NDkgNDAuMjY1MyAyMC40NzY5QzQwLjYzNjEgMjAuNDg4MiA0MC43ODY5IDIwLjM4MSA0MC44NDg2IDE5Ljk4NTdDNDEuMDY5MyAxOC41NzA3IDQxLjM0MTEgMTcuMTYzNCA0MS41OTcgMTUuNzMzOUg0NC42MjJDNDQuNTg3OSAxNS45OTYgNDQuNTY2NiAxNi4yMTUzIDQ0LjUyOTcgMTYuNDMxN0M0NC4zNzAxIDE3LjM2OSA0NC4xOTI1IDE4LjMwMzUgNDQuMDQ4MyAxOS4yNDMxQzQzLjk0NDIgMTkuOTIyMiA0NC4yNTQ5IDIwLjM4MDYgNDQuODU0NSAyMC40Mjg5QzQ1LjMxMzcgMjAuNDY2MSA0NS43Nzc5IDIwLjQzNjQgNDYuMjU5OSAyMC40MzY0Wk0zMy45ODE1IDIxLjgyNDRDMzMuODU3MiAyMS43OTg0IDMzLjc5ODQgMjEuNzc1NyAzMy43Mzk3IDIxLjc3NTdDMzEuMTA1NyAyMS43NzM1IDI4LjQ3MTcgMjEuNzU3NCAyNS44MzggMjEuNzc5OUMyNC42MjM1IDIxLjc5MDMgMjMuNjI4MyAyMi42NTc4IDIzLjQwNjUgMjMuODUyN0MyMy4wNDA3IDI1LjgyMTggMjIuNjkxIDI3Ljc5NDEgMjIuMzQ5OCAyOS43Njc3QzIyLjE1NzMgMzAuODgxMyAyMi44MjkyIDMxLjc3MTQgMjMuOTY3NiAzMS43OTM4QzI2LjEzNDYgMzEuODM2NyAyOC4zMDM1IDMxLjgzMjIgMzAuNDcwNiAzMS43OTIyQzMxLjQ2NzQgMzEuNzczOSAzMi4yOTQzIDMxLjIzNTkgMzIuNTc0MyAzMC4zMDU3QzMyLjk3NjYgMjguOTcwMSAzMy4xNjM0IDI3LjU2OTcgMzMuNDQ4MyAyNi4xNjc0SDMwLjQ3MDFDMzAuMjkwOSAyNy4xNDAxIDMwLjExNjYgMjguMDg3MiAyOS45NDI4IDI5LjAzMkgyNS40MzgxQzI1LjcwNzUgMjcuNTEyIDI1Ljk2OSAyNi4wMzU4IDI2LjIzNjEgMjQuNTI4M0gzMy41MDg1QzMzLjY2ODIgMjMuNjE0MiAzMy44MjEyIDIyLjc0MDIgMzMuOTgxNSAyMS44MjQ0Wk0zOS4yMzQ0IDMxLjgxNjdDNDAuMjA2NyAzMS44MTY3IDQxLjE3OSAzMS44MTY3IDQyLjE1MTMgMzEuODE2NUM0Mi4xOTE3IDMxLjgxNjUgNDIuMjMyNCAzMS44MTY4IDQyLjI3MyAzMS44MTU4QzQzLjY1MTggMzEuNzc3MSA0NC42MDkgMzAuOTY1OSA0NC44NDg0IDI5LjYyMDRDNDUuMTg1MSAyNy43Mjg3IDQ1LjUxODIgMjUuODM2MSA0NS44NDY2IDIzLjk0MzFDNDYuMDc2NCAyMi42MTc1IDQ1LjM3OTQgMjEuNzgxOCA0NC4wMjA2IDIxLjc3NDRDNDIuMDE1MyAyMS43NjM1IDQwLjAwOTggMjEuNzYyNCAzOC4wMDQ1IDIxLjc3NDhDMzYuNjc3NiAyMS43ODI5IDM1LjY4MjkgMjIuNjE0MyAzNS40NDQxIDIzLjkxMzVDMzUuMDk2OSAyNS44MDMgMzQuNzczOSAyNy42OTc0IDM0LjQzNDEgMjkuNTg4NUMzNC4xODk3IDMwLjk0OTUgMzQuODY0NSAzMS43ODk2IDM2LjI1NjggMzEuODEyOEMzNy4yNDkyIDMxLjgyOTcgMzguMjQxOCAzMS44MTYyIDM5LjIzNDQgMzEuODE2N1pNMzUuODAzMSAzOS43NjYxQzM1Ljg2NDUgMzkuNTg0MSAzNS44OTI3IDM5LjM4ODggMzUuOTM3NCAzOS4zODQ4QzM2LjYyODQgMzkuMzI1MSAzNy4zMjEzIDM5LjI4NjYgMzguMDE0NCAzOS4yNjFDMzguMDQ1NiAzOS4yNTk3IDM4LjEzNTUgMzkuNDU1NyAzOC4xMDU5IDM5LjUwODNDMzguMDQ3MiAzOS42MTMyIDM3LjkyNjcgMzkuNzUxNiAzNy44Mjc4IDM5Ljc1NDhDMzcuMTczMyAzOS43NzY2IDM2LjUxNzYgMzkuNzY2MSAzNS44MDMxIDM5Ljc2NjFaTTEyLjE5ODggMzkuNzY4OUMxMi40MTM3IDM5LjQ5MjkgMTIuNTE3NCAzOS4yMzE3IDEyLjY0MjggMzkuMjIwNkMxMy4yMjMzIDM5LjE2OTggMTMuODEwMSAzOS4xNzcxIDE0LjM5MzcgMzkuMTk2MUMxNC40NjYyIDM5LjE5ODUgMTQuNjExMyAzOS40Mjg2IDE0LjU4MzYgMzkuNDk0OEMxNC41MzUzIDM5LjYxMDEgMTQuMzgxNCAzOS43NTIzIDE0LjI2NjUgMzkuNzU3QzEzLjY0MjggMzkuNzgyMyAxMy4wMTc1IDM5Ljc2ODkgMTIuMTk4OCAzOS43Njg5Wk0yNy44Mjc1IDQwLjc5MzNDMjcuNzk5MSA0MS4wODM3IDI3Ljc4MjUgNDEuMjU1NiAyNy43NzAyIDQxLjM4MjdIMjUuNTIxM0MyNS41MTY1IDQxLjMxNTYgMjUuNTExNiA0MS4yNDg0IDI1LjUwNzEgNDEuMTgxMkMyNi4xNjc4IDQwLjUyNTUgMjcuMDM0NCA0MS4wODMxIDI3LjgyNzUgNDAuNzkzM1pNMTUuMDM5MyAxNS41MDNIMTcuNzgwMkMxNy42MzE1IDE2LjM1NTQgMTcuNDkwNiAxNy4xNjIxIDE3LjM0NjEgMTcuOTkxMkgxNC42MTQ1QzE0Ljc1ODQgMTcuMTQ4OSAxNC44OTU3IDE2LjM0NDcgMTUuMDM5MyAxNS41MDNaTTM3LjQ4NTYgMjkuMDI4M0MzNy43NjA0IDI3LjQ4MzIgMzguMDE3NyAyNi4wMzc5IDM4LjI3NzQgMjQuNTc3OUg0Mi43ODhDNDIuNTIwOCAyNi4wODU2IDQyLjI2MTcgMjcuNTQ4IDQxLjk5OTYgMjkuMDI4M0gzNy40ODU2Wk0tMC4wNjc4NzExIDQwLjAxODJWMTIuMDMxM0MwLjAxODIxNTggMTEuMjkyOCAwLjA3ODI0MjMgMTAuNTUgMC4xOTQxOTYgOS44MTYxOUMwLjg1NTgwNiA1LjYyODU0IDMuMDkwNTUgMi42NDM2MSA3LjAxODM0IDAuOTc5MjYxQzguODAzMTcgMC4yMjMwNzMgMTAuNzA0OCAwLjAyNjc0MjIgMTIuNjA4NyAwLjAyMDQ0NjdDMjEuMTYyOSAtMC4wMDkyNzM3NyAyOS43MTczIC0wLjAwMjk3ODMgMzguMjcxNSAwLjAxODU0MzRDMzkuNTgzIDAuMDIxOTEwOCA0MC45MDc3IDAuMDgwOTEyNSA0Mi4yMDI4IDAuMjcyNzA1QzQ2LjI5ODcgMC44Nzg5NzMgNDkuMjQ1OCAzLjA3MjU4IDUwLjk0NDYgNi44NzI1NUM1MS43NzAyIDguNzE5NDYgNTEuOTc2NiAxMC43MDA4IDUxLjk4MjUgMTIuNjg4OEM1Mi4wMDc5IDIxLjE4MiA1Mi4wMDMxIDI5LjY3NTYgNTEuOTgzMSAzOC4xNjg5QzUxLjk4MDEgMzkuNTAxMiA1MS45MDIxIDQwLjg0IDUxLjc1NDQgNDIuMTY0NEM1MS4yMTkzIDQ2Ljk2NzIgNDcuNDY5OSA1MC45MDU0IDQyLjcxMzUgNTEuNjk5OUM0MS44MDI3IDUxLjg1MjEgNDAuODgxNyA1MS45NDQ2IDM5Ljk2NTMgNTIuMDY0NUgxMS45Nzg3QzExLjI4MjEgNTEuOTgwMiAxMC41ODU4IDUxLjg5MzkgOS44ODg5MiA1MS44MTE2QzUuMjA2ODUgNTEuMjU4NyAxLjQyNjUgNDcuODkyOCAwLjQwNDcyOCA0My4zMDM1QzAuMTY0NzY4IDQyLjIyNjkgMC4wODUyNjk4IDQxLjExNDMgLTAuMDY3ODcxMSA0MC4wMTgyWiIgZmlsbD0iIzE4NTdBNiIvPgo8L2c+CjxwYXRoIGQ9Ik0zNy40ODYgMjkuMDI4M0g0MkM0Mi4yNjIxIDI3LjU0NzkgNDIuNTIxMiAyNi4wODU1IDQyLjc4ODQgMjQuNTc3OEgzOC4yNzc4QzM4LjAxOCAyNi4wMzc5IDM3Ljc2MDggMjcuNDgzMiAzNy40ODYgMjkuMDI4M1pNMzkuMjM0OCAzMS44MTY0QzM4LjI0MjMgMzEuODE2MSAzNy4yNDk2IDMxLjgyOTYgMzYuMjU3MiAzMS44MTI4QzM0Ljg2NDkgMzEuNzg5NiAzNC4xOTAxIDMwLjk0OTQgMzQuNDM0NSAyOS41ODg0QzM0Ljc3NDQgMjcuNjk3MyAzNS4wOTcyIDI1LjgwMzEgMzUuNDQ0NSAyMy45MTM0QzM1LjY4MzUgMjIuNjE0MiAzNi42NzggMjEuNzgyOCAzOC4wMDQ5IDIxLjc3NDdDNDAuMDEwMiAyMS43NjI0IDQyLjAxNTcgMjEuNzYzNCA0NC4wMjEgMjEuNzc0M0M0NS4zNzk4IDIxLjc4MTcgNDYuMDc2OCAyMi42MTc0IDQ1Ljg0NyAyMy45NDMxQzQ1LjUxODYgMjUuODM2IDQ1LjE4NTUgMjcuNzI4OCA0NC44NDg5IDI5LjYyMDNDNDQuNjA5NCAzMC45NjU4IDQzLjY1MjIgMzEuNzc3IDQyLjI3MzMgMzEuODE1OEM0Mi4yMzI4IDMxLjgxNjggNDIuMTkyMiAzMS44MTY0IDQyLjE1MTcgMzEuODE2NEM0MS4xNzk0IDMxLjgxNjYgNDAuMjA3MSAzMS44MTY2IDM5LjIzNDggMzEuODE2NFoiIGZpbGw9IiNGRUZFRkUiLz4KPHBhdGggZD0iTTMzLjk4MDMgMjEuODI0NEMzMy44MiAyMi43NDAyIDMzLjY2NyAyMy42MTQyIDMzLjUwNzMgMjQuNTI4MkgyNi4yMzQ5QzI1Ljk2NzggMjYuMDM1OCAyNS43MDYzIDI3LjUxMiAyNS40MzY5IDI5LjAzMkgyOS45NDE2QzMwLjExNTUgMjguMDg3MiAzMC4yODk3IDI3LjE0MDEgMzAuNDY4OSAyNi4xNjc0SDMzLjQ0NzFDMzMuMTYyNCAyNy41Njk3IDMyLjk3NTQgMjguOTcgMzIuNTczMSAzMC4zMDU3QzMyLjI5MzEgMzEuMjM1OCAzMS40NjYyIDMxLjc3MzkgMzAuNDY5NCAzMS43OTIyQzI4LjMwMjMgMzEuODMyMSAyNi4xMzM0IDMxLjgzNjcgMjMuOTY2NiAzMS43OTM4QzIyLjgyOCAzMS43NzE0IDIyLjE1NjEgMzAuODgxMiAyMi4zNDg3IDI5Ljc2NzZDMjIuNjg5OCAyNy43OTQxIDIzLjAzOTUgMjUuODIxNyAyMy40MDUzIDIzLjg1MjdDMjMuNjI3MSAyMi42NTc3IDI0LjYyMjUgMjEuNzkwMyAyNS44MzY4IDIxLjc3OTlDMjguNDcwNSAyMS43NTczIDMxLjEwNDUgMjEuNzczNCAzMy43Mzg1IDIxLjc3NTZDMzMuNzk3MyAyMS43NzU2IDMzLjg1NiAyMS43OTgzIDMzLjk4MDMgMjEuODI0NFoiIGZpbGw9IiNGRUZFRkUiLz4KPHBhdGggZD0iTTQ2LjI1OTkgMjAuNDM2NUM0NS43NzggMjAuNDM2NSA0NS4zMTM3IDIwLjQ2NjIgNDQuODU0NiAyMC40MjlDNDQuMjU0OSAyMC4zODA3IDQzLjk0NDIgMTkuOTIyMyA0NC4wNDgzIDE5LjI0MzJDNDQuMTkyNCAxOC4zMDM2IDQ0LjM3MDEgMTcuMzY5MSA0NC41Mjk3IDE2LjQzMThDNDQuNTY2NiAxNi4yMTUzIDQ0LjU4OCAxNS45OTYxIDQ0LjYyMiAxNS43MzRINDEuNTk3MUM0MS4zNDExIDE3LjE2MzUgNDEuMDY5NCAxOC41NzA4IDQwLjg0ODYgMTkuOTg1OEM0MC43ODcgMjAuMzgxMSA0MC42MzYgMjAuNDg4MyA0MC4yNjUzIDIwLjQ3N0MzOS41NDAyIDIwLjQ1NSAzOC44MTM2IDIwLjQ3MDYgMzcuOTk3MSAyMC40NzA2QzM4LjE3ODMgMTkuNDAyNCAzOC4zNDM4IDE4LjM5NjYgMzguNTIwNiAxNy4zOTNDMzguOTEzNyAxNS4xNjE2IDM5LjMyMjYgMTIuOTMzMyAzOS42OTk4IDEwLjY5OTNDMzkuNzYyNyAxMC4zMjc1IDM5Ljg3OTQgMTAuMTc3NSA0MC4yNzE5IDEwLjE5MjZDNDEuMDE1NCAxMC4yMjExIDQxLjc2MSAxMC4yMDA5IDQyLjU1OTUgMTAuMjAwOUM0Mi4zMzU4IDExLjQ4OTEgNDIuMTI1NiAxMi43MDA1IDQxLjg5NzYgMTQuMDE0NkM0My4yMzY1IDEyLjUxMjQgNDQuOTA0NCAxMy4xNjc3IDQ2LjQzMDUgMTMuMTUxM0M0Ny4wNDcgMTMuMTQ0NSA0Ny4zOTQyIDEzLjgyMiA0Ny4yNzgzIDE0LjU5ODVDNDcuMDg0NCAxNS44OTg0IDQ2Ljg0MSAxNy4xOTE1IDQ2LjYxNDcgMTguNDg2OEM0Ni41MDM3IDE5LjEyMSA0Ni4zODQ0IDE5Ljc1MzggNDYuMjU5OSAyMC40MzY1WiIgZmlsbD0iI0ZFRkVGRSIvPgo8cGF0aCBkPSJNMTUuMDQxOCAxNS41MDMxQzE0Ljg5ODIgMTYuMzQ0OCAxNC43NjA5IDE3LjE0OSAxNC42MTY5IDE3Ljk5MTJIMTcuMzQ4NkMxNy40OTMxIDE3LjE2MjEgMTcuNjMzOSAxNi4zNTU1IDE3Ljc4MjcgMTUuNTAzMUgxNS4wNDE4Wk0xNS41NDY5IDIwLjQ3MkMxNC43MzYzIDIwLjQ3MTEgMTMuOTI1OCAyMC40ODQ1IDEzLjExNTYgMjAuNDY3N0MxMi4xNTczIDIwLjQ0NzggMTEuNjYzOCAxOS44NjMyIDExLjgyIDE4LjkxOTZDMTIuMDU3OSAxNy40ODI2IDEyLjMxMjEgMTYuMDQ4NCAxMi41NzU2IDE0LjYxNTlDMTIuNzQ2NSAxMy42ODgxIDEzLjQ1MzcgMTMuMDQyOSAxNC4zODEyIDEzLjAyNzFDMTYuMDIyIDEyLjk5OTUgMTcuNjYzNyAxMy4wMDAzIDE5LjMwNDMgMTMuMDI2M0MyMC4yMzY2IDEzLjA0MTEgMjAuNzM1MSAxMy43MDAyIDIwLjU3NjMgMTQuNjE4MkMyMC4zNDUxIDE1Ljk1MzYgMjAuMTE0MSAxNy4yODkyIDE5Ljg3ODIgMTguNjIzOUMxOS42NDkxIDE5LjkyMTMgMTguOTk1MSAyMC40NjgxIDE3LjY3NDEgMjAuNDcyMUMxNi45NjQ5IDIwLjQ3NDYgMTYuMjU1OCAyMC40NzI1IDE1LjU0NjkgMjAuNDcyWiIgZmlsbD0iI0ZFRkVGRSIvPgo8cGF0aCBkPSJNMjEuNDc4NyAyOS4yNjA3QzIwLjkwMTkgMjkuMjYwNyAyMC4zNzYgMjkuMjk1OSAxOS44NTcgMjkuMjUxNEMxOS4yMjE2IDI5LjE5NzEgMTguOTI4OSAyOC44MTM0IDE5LjAyMzggMjguMDkyM0MxOS4xNjY0IDI3LjAxMDMgMTkuMzc3NyAyNS45MzcyIDE5LjU1OTQgMjQuODYwM0MxOS41NzI0IDI0Ljc4MTIgMTkuNTgxNiAyNC43MDE2IDE5LjYwNTkgMjQuNTI5N0MxOC41Nzk1IDI0LjUyOTcgMTcuNTc0NyAyNC41MTM2IDE2LjU3MTQgMjQuNTUxMUMxNi40NTY0IDI0LjU1NTYgMTYuMjg3NiAyNC44NDY1IDE2LjI1MzggMjUuMDI1MUMxNS45ODU2IDI2LjQzMzMgMTUuNzQ0NSAyNy44NDY0IDE1LjQ5MTIgMjkuMjhIMTIuNDg5M0MxMi45MzU4IDI2Ljc2ODggMTMuMzc2NSAyNC4yOTA5IDEzLjgyMDggMjEuNzkyNUgxNi44MDA5QzE2Ljc1MzUgMjIuMTI1IDE2LjcwODQgMjIuNDM4NCAxNi42NDc2IDIyLjg2MzlDMTcuOTk1NCAyMS4zODIxIDE5LjY4OTEgMjEuOTUxIDIxLjI0OTYgMjEuOTI2N0MyMS45NjkxIDIxLjkxNTggMjIuNTcyOCAyMi43MzY0IDIyLjQ1OTUgMjMuNDkxMUMyMi4xNzEyIDI1LjQwODQgMjEuODE0MiAyNy4zMTU3IDIxLjQ3ODcgMjkuMjYwN1oiIGZpbGw9IiNGRUZFRkUiLz4KPHBhdGggZD0iTTguMTg1NTIgMTIuNDEyNEg0LjY1MzMyQzQuNzk2NTEgMTEuNTgxMSA0LjkyOSAxMC44MTI3IDUuMDY5NyA5Ljk5NjIySDE1LjE5MjdDMTUuMDUxOCAxMC44MDIgMTQuOTE0NiAxMS41ODcxIDE0Ljc3MDQgMTIuNDExSDExLjIzMjJDMTAuOTkyMyAxMy43NjExIDEwLjc1NzkgMTUuMDczIDEwLjUyNiAxNi4zODU1QzEwLjMxNSAxNy41ODExIDEwLjEwMDEgMTguNzc2IDkuOTAyNDIgMTkuOTczN0M5Ljg0NDQ1IDIwLjMyNTYgOS43MTgxIDIwLjQ5NzMgOS4zMTg1NSAyMC40ODJDOC40OTQyOSAyMC40NTA0IDcuNjY3OTcgMjAuNDcyNiA2Ljc3NDQ1IDIwLjQ3MjZDNy4yNDgzNyAxNy43NjYgNy43MDc2NSAxNS4xNDIyIDguMTg1NTIgMTIuNDEyNFoiIGZpbGw9IiNGRUZFRkUiLz4KPHBhdGggZD0iTTIzLjU0MiAxNy45ODM0SDI2Ljg5MjVDMjcuMTkgMTYuMzMzNyAyNy40ODU4IDE0LjY5MTMgMjcuNzgxOSAxMy4wNDkxSDMwLjM5OTNDMzAuMjI0NCAxNC4wNDA1IDMwLjA1NjcgMTQuOTg5NSAyOS44ODk0IDE1LjkzODhDMjkuNjQzNiAxNy4zMzI5IDI5LjM4NTIgMTguNzI1MSAyOS4xNjE4IDIwLjEyMjdDMjkuMTA4NSAyMC40NTY2IDI4Ljk4NjIgMjAuNTU5NyAyOC42NTg4IDIwLjU1N0MyNy43ODg1IDIwLjU0OTUgMjYuOTYzMiAyMC40OTE5IDI2LjY5MjIgMTkuMzc1NkMyNi41NDAzIDE5LjQ5NjIgMjYuNDMyNCAxOS41NjY1IDI2LjM0MjcgMTkuNjU1N0MyNS43ODQ2IDIwLjIxMTEgMjUuMTMwOCAyMC41MDMyIDI0LjMyNyAyMC40NzU4QzIzLjU1ODIgMjAuNDQ5NiAyMi43ODc0IDIwLjQ4MzQgMjIuMDE4MiAyMC40NjQ3QzIxLjExODYgMjAuNDQyNiAyMC42MDUgMTkuODk5OSAyMC43NDIyIDE5LjAwNjZDMjEuMDMzNyAxNy4xMDggMjEuMzgyOCAxNS4yMTgyIDIxLjczMDMgMTMuMzI4OUMyMS43NTI0IDEzLjIwODIgMjEuOTU4OSAxMy4wMzg0IDIyLjA4NDkgMTMuMDMzNEMyMi44MzA3IDEzLjAwNTYgMjMuNTc4IDEzLjAxOTggMjQuNDAzNyAxMy4wMTk4QzI0LjExMjMgMTQuNjk4MyAyMy44MzEgMTYuMzE4OCAyMy41NDIgMTcuOTgzNFoiIGZpbGw9IiNGRUZFRkUiLz4KPHBhdGggZD0iTTM3Ljg3ODkgMTMuMDE4NUMzNy43NTE0IDEzLjc3NjUgMzcuNjYxIDE0LjQ3NTYgMzcuNDk2OCAxNS4xNTcyQzM3LjQ2MzQgMTUuMjk1MyAzNy4xNTMgMTUuNDUwMiAzNi45NjcxIDE1LjQ1NDdDMzUuODM1OCAxNS40ODIxIDM0LjcwMzUgMTUuNDY4NCAzMy41MjI0IDE1LjQ2ODRDMzMuMzcxMyAxNi4zMjA5IDMzLjIyNzcgMTcuMTMwNCAzMy4wNzEgMTguMDEyNUgzNi44NTA1QzM2LjcwOTQgMTguODU2NSAzNi41ODExIDE5LjYyMjUgMzYuNDUwOCAyMC40MDI3QzM2LjMyOCAyMC40MjgyIDM2LjIzMyAyMC40NjUzIDM2LjEzNzcgMjAuNDY1NUMzNC42MTgzIDIwLjQ2OTYgMzMuMDk4OSAyMC40ODE3IDMxLjU3OTMgMjAuNDY0OUMzMC42MDczIDIwLjQ1NDIgMzAuMTE1NCAxOS44MjA5IDMwLjI4NDIgMTguODU4MUMzMC41MTQ1IDE3LjU0MjYgMzAuNzQxMyAxNi4yMjY5IDMwLjk3MjYgMTQuOTEyQzMxLjIwNTcgMTMuNTg3OSAzMS44NzcxIDEzLjAyMDcgMzMuMjEyOCAxMy4wMTlDMzQuNzQ5MSAxMy4wMTcyIDM2LjI4NTcgMTMuMDE4NSAzNy44Nzg5IDEzLjAxODVaIiBmaWxsPSIjRkVGRUZFIi8+CjxwYXRoIGQ9Ik0yMS44ODM1IDQxLjE5MjNDMjIuNTQ5NyAzOS44MTAxIDIzLjE1MjMgMzguNjAyNSAyMy43MTU3IDM3LjM3NzNDMjQuMTc2MiAzNi4zNzUxIDI0LjIwNzYgMzYuMzM5NSAyNS40MjUxIDM2LjU3MUMyNS4yNjgzIDM2Ljk0NzQgMjUuMTMzNSAzNy4zMTg4IDI0Ljk2MjMgMzcuNjcyN0MyNC4yNTY1IDM5LjEzMzQgMjMuNTIwMSA0MC41Nzk5IDIyLjgzOSA0Mi4wNTE5QzIyLjY0NjMgNDIuNDY4MiAyMi40MTc4IDQyLjYyNTggMjEuOTczMyA0Mi41ODY3QzIxLjU1NDEgNDIuNTUwMSAyMS4xMjk0IDQyLjU3ODggMjAuNjY0NyA0Mi41Nzg4QzIwLjU5NDYgNDEuNDQ0MSAyMC41MjcyIDQwLjM1NTUgMjAuNDYwMiAzOS4yNjY2QzIwLjQxOTYgMzkuMjU0IDIwLjM3OTIgMzkuMjQxNCAyMC4zMzg5IDM5LjIyOTFDMTkuOTQwMyA0MC4wNjg1IDE5LjUwMzcgNDAuODkyNSAxOS4xNTU4IDQxLjc1MjhDMTguOTA5MSA0Mi4zNjMxIDE4LjYwMyA0Mi43MjM5IDE3Ljg4NSA0Mi41ODg2QzE3LjU3MzkgNDIuNTMgMTcuMjQyOSA0Mi41Nzg4IDE2LjgyMzkgNDIuNTc4OEMxNi43MDA2IDQwLjU1NDkgMTYuNTc4OSAzOC41NjIzIDE2LjQ1NTEgMzYuNTMxM0MxNi42OTcxIDM2LjUxMTYgMTYuODUzMiAzNi40ODk2IDE3LjAwOTEgMzYuNDg3NEMxNy44MTUyIDM2LjQ3NjYgMTcuNzk2NiAzNi40NzkyIDE3LjgzMTYgMzcuMjU2QzE3Ljg4NzQgMzguNDkwNCAxNy45NzEgMzkuNzIzMyAxOC4xNTg1IDQwLjk2OTJDMTguNzgzNCAzOS42NTMxIDE5LjQwNTIgMzguMzM1NiAyMC4wMzUzIDM3LjAyMjFDMjAuMjYxOCAzNi41NDk5IDIxLjA3MzIgMzYuMjYxOSAyMS41MTM3IDM2LjUyOTRDMjEuNjM5MiAzNi42MDU3IDIxLjcwMDcgMzYuODY0OCAyMS43MDg5IDM3LjA0NEMyMS43NjU1IDM4LjI5NDIgMjEuODAwMiAzOS41NDU0IDIxLjg0MzEgNDAuNzk2M0MyMS44NDU1IDQwLjg2NiAyMS44NTY5IDQwLjkzNTUgMjEuODgzNSA0MS4xOTIzWiIgZmlsbD0iI0YwQ0YyNSIvPgo8cGF0aCBkPSJNMjcuODI2NyA0MC43OTMyQzI3LjAzMzYgNDEuMDgzMSAyNi4xNjcxIDQwLjUyNTUgMjUuNTA2MyA0MS4xODEyQzI1LjUxMSA0MS4yNDg1IDI1LjUxNTcgNDEuMzE1NiAyNS41MjA1IDQxLjM4MjhIMjcuNzY5NUMyNy43ODE4IDQxLjI1NTUgMjcuNzk4NSA0MS4wODM4IDI3LjgyNjcgNDAuNzkzMlpNMjguMTA4MyAzOS43Njk3QzI4LjIzMTcgMzkuMjQ3MyAyNy45OTM2IDM5LjE2MjIgMjcuNjI0NSAzOS4xNjY4QzI2Ljc1NzcgMzkuMTc3NiAyNS44OTA2IDM5LjE3MDQgMjQuOTQ5MyAzOS4xNzA0QzI1LjAyMDMgMzguNzY1NSAyNS4wNzc2IDM4LjQzODIgMjUuMTQyMiAzOC4wNjkzQzI2LjQgMzguMDY5MyAyNy42MzQyIDM4LjA1MjUgMjguODY3MiAzOC4wNzc2QzI5LjM3NjEgMzguMDg3OSAyOS42MzM3IDM4LjQwMTUgMjkuNTM4NCAzOC45MTk5QzI5LjMzMjQgNDAuMDQwNCAyOS4xMTk5IDQxLjE1OTggMjguODc1OSA0Mi4yNzIyQzI4Ljg0NzkgNDIuMzk4NyAyOC42MDIxIDQyLjU2MTMgMjguNDU0NSA0Mi41NjQ1QzI3LjI5OTQgNDIuNTg4MSAyNi4xNDMzIDQyLjU5MzcgMjQuOTg4MyA0Mi41NzAzQzI0LjMxMTkgNDIuNTU2NiAyNC4wNjc2IDQyLjE4NDUgMjQuMjAwMiA0MS41MzI1QzI0LjQ5MDYgNDAuMTA1NCAyNC41MDM3IDM5LjY5ODUgMjYuNDUzIDM5Ljc2N0MyNi45OTcyIDM5Ljc4NTkgMjcuNTQyNSAzOS43Njk3IDI4LjEwODMgMzkuNzY5N1oiIGZpbGw9IiNGMENGMjUiLz4KPHBhdGggZD0iTTEyLjE5ODcgMzkuNzY4OUMxMy4wMTc0IDM5Ljc2ODkgMTMuNjQyNyAzOS43ODI0IDE0LjI2NjQgMzkuNzU3MUMxNC4zODEzIDM5Ljc1MjQgMTQuNTM1IDM5LjYxMDIgMTQuNTgzNSAzOS40OTQ5QzE0LjYxMTIgMzkuNDI4NyAxNC40NjYxIDM5LjE5ODUgMTQuMzkzNiAzOS4xOTYyQzEzLjgxIDM5LjE3NzIgMTMuMjIzMiAzOS4xNjk4IDEyLjY0MjcgMzkuMjIwNkMxMi41MTczIDM5LjIzMTggMTIuNDEzNiAzOS40OTMgMTIuMTk4NyAzOS43Njg5Wk0xNS41NzA3IDQwLjg4SDEyLjAzNDRDMTEuOTEzMiA0MS4zNDU2IDEyLjA5NTMgNDEuNDgzMiAxMi40ODkzIDQxLjQ3NzlDMTMuMzc3NyA0MS40NjYyIDE0LjI2NTkgNDEuNDc0MyAxNS4yMTUxIDQxLjQ3NDNDMTUuMTQwMyA0MS44NjQgMTUuMDc0OCA0Mi4yMDQ3IDE1LjAwMzcgNDIuNTc2M0MxMy43NzIzIDQyLjU3NjMgMTIuNTc5OSA0Mi41OTcyIDExLjM4ODggNDIuNTY4MkMxMC43MTMxIDQyLjU1MTggMTAuNTI5MiA0Mi4zMzUxIDEwLjYyOTUgNDEuNjU1MUMxMC43NTc1IDQwLjc4OTcgMTAuOTMwNyAzOS45Mjg1IDExLjEzNDUgMzkuMDc3OEMxMS4yODA3IDM4LjQ2NzcgMTEuODI2OCAzOC4wODA3IDEyLjQ3MzMgMzguMDcwNUMxMy4zNjM2IDM4LjA1NjQgMTQuMjU0NCAzOC4wNTQ4IDE1LjE0NDUgMzguMDcwNUMxNS44MDc2IDM4LjA4MjMgMTYuMDc4MyAzOC40NTYxIDE1LjkzODIgMzkuMDkzMUMxNS44MTQgMzkuNjU3MiAxNS43MDQ3IDQwLjIyNDcgMTUuNTcwNyA0MC44OFoiIGZpbGw9IiNGMENGMjUiLz4KPHBhdGggZD0iTTM1LjgwMyAzOS43NjYyQzM2LjUxNzQgMzkuNzY2MiAzNy4xNzMgMzkuNzc2NiAzNy44Mjc2IDM5Ljc1NDlDMzcuOTI2NCAzOS43NTE3IDM4LjA0NzEgMzkuNjEzNCAzOC4xMDU4IDM5LjUwODRDMzguMTM1NCAzOS40NTU3IDM4LjA0NTMgMzkuMjU5OCAzOC4wMTQzIDM5LjI2MDlDMzcuMzIxMiAzOS4yODY3IDM2LjYyODIgMzkuMzI1MSAzNS45MzcyIDM5LjM4NUMzNS44OTI0IDM5LjM4ODggMzUuODY0MyAzOS41ODQyIDM1LjgwMyAzOS43NjYyWk0zOS4wNTQ5IDQwLjg4NTlIMzUuNTQzN0MzNS4zODAxIDQxLjM1NiAzNS41ODkyIDQxLjQ3OTcgMzUuOTkzMSA0MS40NzY3QzM2Ljg5OTcgNDEuNDY5MyAzNy44MDY1IDQxLjQ3NDMgMzguNzU1NCA0MS40NzQzQzM4LjY1MzkgNDEuODc0MiAzOC41Njc0IDQyLjIxNDEgMzguNDc1MyA0Mi41NzY4QzM3LjI2NTcgNDIuNTc2OCAzNi4wOTQgNDIuNTkwNyAzNC45MjI2IDQyLjU3MTJDMzQuMjg2OSA0Mi41NjA1IDM0LjA0MzcgNDIuMzM4OSAzNC4xMjg3IDQxLjcyOTRDMzQuMjYwMSA0MC43ODQ1IDM0LjQ0NSAzOS44NDEgMzQuNjk3IDM4LjkyMTdDMzQuODU0NSAzOC4zNDcyIDM1LjM3NzMgMzguMDkxIDM1Ljk1NyAzOC4wNzM5QzM2Ljg0NjQgMzguMDQ3NCAzNy43MzczIDM4LjA1NSAzOC42MjcxIDM4LjA3MDRDMzkuMjg5MiAzOC4wODE5IDM5LjU5OTcgMzguNDcyMSAzOS40NjUyIDM5LjA4OTdDMzkuMzM4OCAzOS42Njk3IDM5LjIwMTMgNDAuMjQ3MyAzOS4wNTQ5IDQwLjg4NTlaIiBmaWxsPSIjRjBDRjI1Ii8+CjxwYXRoIGQ9Ik00Mi4yMDI5IDQxLjQ3MjJDNDIuMTI2MSA0MS44ODY1IDQyLjA2NiA0Mi4yMTE4IDQxLjk5ODMgNDIuNTc3NEM0MS40NTE1IDQyLjU3NzQgNDAuOTI4MSA0Mi41OTI5IDQwLjQwNjIgNDIuNTczM0MzOS43ODkxIDQyLjU1MDMgMzkuNTI3OSA0Mi4xNzQ1IDM5LjY1ODIgNDEuNTcyOUMzOS45NjEyIDQwLjE3NDMgNDAuMjQwMSAzOC43NzA2IDQwLjU1NjUgMzcuMzc1QzQwLjc4NTIgMzYuMzY2MSA0MC44NzQyIDM2LjMzMDMgNDEuOTkzMiAzNi41NzgxQzQxLjkxMzQgMzcuMDUyIDQxLjgzMzIgMzcuNTMwMyA0MS43NDc1IDM4LjAzOThDNDIuMTM2NSAzOC4wNTc2IDQyLjQ5MzIgMzguMDczOCA0Mi45MTE5IDM4LjA5MjhDNDIuODUwMSAzOC40NjE5IDQyLjc5NTcgMzguNzg4IDQyLjczMzkgMzkuMTU2Nkg0MS40OTg4QzQxLjM1MzEgMzkuNzg2OCA0MS4yMDgyIDQwLjM3OTcgNDEuMDgxMSA0MC45NzYzQzQxLjAxMzIgNDEuMjk1OCA0MS4xMzM4IDQxLjQ4NjcgNDEuNDkyMSA0MS40NzM1QzQxLjY5MTIgNDEuNDY2IDQxLjg5MDkgNDEuNDcyMiA0Mi4yMDI5IDQxLjQ3MjJaIiBmaWxsPSIjRjBDRjI1Ii8+CjxwYXRoIGQ9Ik0zMy4xMTI2IDQyLjU1NUgzMS43ODk2QzMxLjk2NDggNDEuNjkxOSAzMi4xMjk5IDQwLjg2NDQgMzIuMzAxNCA0MC4wMzgxQzMyLjQ5OTggMzkuMDgzMSAzMi43MDg1IDM4LjEzMDMgMzIuOTAzNyAzNy4xNzQ4QzMzLjAyOTUgMzYuNTYwNCAzMy42NTE3IDM2LjIyNyAzNC4xOTE2IDM2LjUyMjZDMzQuMjcxNCAzNi41NjYxIDM0LjMwODYgMzYuNzg1IDM0LjI4NCAzNi45MDZDMzMuOTAzOSAzOC43Nzg2IDMzLjUxMDQgNDAuNjQ4MiAzMy4xMTI2IDQyLjU1NVoiIGZpbGw9IiNGMENGMjUiLz4KPHBhdGggZD0iTTI5LjY2OCA0Mi41Nzg4QzI5Ljk1OCA0MS4xOTYyIDMwLjIzMyAzOS44NzUgMzAuNTEyOSAzOC41NTVDMzAuNjAzNCAzOC4xMjY2IDMwLjc3NTUgMzcuNzAyOSAzMC43ODc4IDM3LjI3MzhDMzAuODA4NiAzNi41NTE3IDMxLjE3NjQgMzYuMzg4OCAzMS43OTQ1IDM2LjQ4NDhDMzEuOTA5OSAzNi41MDMgMzIuMDI4IDM2LjUwNTYgMzIuMjQ2IDM2LjUyMzhDMzIuMDk3MyAzNy4yOCAzMS45NjI5IDM3Ljk5NTkgMzEuODE0NyAzOC43MDg5QzMxLjU5NjYgMzkuNzYxNyAzMS4zMjQxIDQwLjgwNTMgMzEuMTYxOSA0MS44NjY0QzMxLjA2NTEgNDIuNDk4OSAzMC43NjY2IDQyLjY2NTQgMzAuMjAxOCA0Mi41ODE5QzMwLjA2NDMgNDIuNTYxNiAyOS45MjEzIDQyLjU3ODggMjkuNjY4IDQyLjU3ODhaIiBmaWxsPSIjRjBDRjI1Ii8+CjxwYXRoIGQ9Ik0xMy4zMTI1IDIxLjgwNjRDMTIuNTgyMiAyMi44MzI2IDExLjkwMjYgMjMuNzg3OSAxMS4yMjI4IDI0Ljc0MzJDMTEuMTkwMiAyNC43MjYgMTEuMTU3NSAyNC43MDkgMTEuMTI1IDI0LjY5MTlDMTEuMjkyMiAyMy43NDM1IDExLjQ1OTcgMjIuNzk0OSAxMS42MzQxIDIxLjgwNjRIMTMuMzEyNVoiIGZpbGw9IiNGRUZFRkUiLz4KPC9nPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzExOTlfMzgyMiI+CjxyZWN0IHdpZHRoPSI1MiIgaGVpZ2h0PSI1MiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPGNsaXBQYXRoIGlkPSJjbGlwMV8xMTk5XzM4MjIiPgo8cmVjdCB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" /></div><b>Touch ’n Go</b></li>
              <li className="payment-item"><div className="payment-brand"><PaymentLogo name="DuitNow" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiBmaWxsPSJ3aGl0ZSIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTE5OV8zOTc1KSI+CjxwYXRoIGQ9Ik0xMy44NTk1IDguOTAzODRDMTYuMzg2NSA2LjE1OTI0IDE5LjkyNzUgNC4zMTUwNSAyMy42ODM3IDMuODE2MDNDMjYuNzI3MiAzLjM4MDU1IDI5Ljg5MDMgMy44MjM3OCAzMi42OTQ3IDUuMDQ4MDhDMzUuNjE4NyA2LjMyMTk3IDM4LjEzMyA4LjQ2MDYxIDM5LjgzNTcgMTEuMDk4M0M0Mi44MjM0IDE1LjY1NDUgNDMuMTIzMiAyMS43MTQgNDAuNjM0NCAyNi41Mzk5QzM5LjE0MzggMjkuNDU5NiAzNi43MTA4IDMxLjkyMDYgMzMuNzU2NiAzMy40NjU3QzMxLjM2OTkgMzQuNzM1IDI4LjY1IDM1LjM2NzMgMjUuOTM0OCAzNS4zNzgxQzIwLjUxNTggMzUuMzc4MSAxNS4wOTgzIDM1LjM3ODEgOS42ODA3OSAzNS4zNzgxQzkuNjc5MiAyOS45ODgxIDkuNjgwNzkgMjQuNTk4MSA5LjY3OTIgMTkuMjA4MUM5LjcyMzg0IDE1LjQzMTQgMTEuMjQ2NCAxMS42OTggMTMuODU5NSA4LjkwMzg0Wk0yMS40NTE2IDExLjkxOTZDMTkuMDg3MyAxMy4yMzIzIDE3LjQwMzcgMTUuNjQ4MyAxNy4wNDgxIDE4LjI3NTFDMTYuOTM4MSAxOS4wNSAxNi45NzQ4IDE5LjgzMjYgMTYuOTczMiAyMC42MTA2QzE2Ljk3IDIzLjE3MDggMTYuOTc0OCAyNS43Mjk0IDE2Ljk3IDI4LjI4OTZDMTkuMzE4NCAyOC4zMDA0IDIxLjY2NTMgMjguMjkxMSAyNC4wMTM3IDI4LjI5NDJDMjUuNDQ1NCAyOC4yODAzIDI2LjkwNTggMjguMzkwMyAyOC4zMDA4IDI4LjAwMTNDMzEuNzMxOCAyNy4xNjc2IDM0LjQ3ODggMjQuMTkyMSAzNC45MzMyIDIwLjc3OEMzNS4yNTY4IDE4LjY4NzQgMzQuNzY0MiAxNi40ODY3IDMzLjU2ODQgMTQuNzE4NUMzMi4zOTY2IDEyLjk1NjQgMzAuNTQ4OCAxMS42MzI5IDI4LjQ2ODIgMTEuMDY4OEMyNi4xNDA1IDEwLjQyMSAyMy41NDM0IDEwLjcyNDggMjEuNDUxNiAxMS45MTk2WiIgZmlsbD0iI0U0MTQ1RSIvPgo8cGF0aCBkPSJNMjUuMTE2OCAxNS43MDg3QzI2LjY3NiAxNS4zMzM2IDI4LjQxMjIgMTYuMDE4NiAyOS4zMDAzIDE3LjMxMTFDMzAuMTQ2OCAxOC40NzAzIDMwLjI0MDkgMjAuMDk0NSAyOS41MzQ2IDIxLjM0MDRDMjguODc3OCAyMi41Njc4IDI3LjUwOTggMjMuMzg0NiAyNi4wODkzIDIzLjQxNTZDMjQuNzIzIDIzLjQzODggMjMuMzU1MSAyMy40MTQgMjEuOTg4NyAyMy40MjQ5QzIxLjk3MTIgMjIuMDc2NiAyMS45NzYgMjAuNzI2OCAyMS45ODI0IDE5LjM3ODVDMjIuMDE0MiAxNy42NTIxIDIzLjM3NTggMTYuMDU0MyAyNS4xMTY4IDE1LjcwODdaIiBmaWxsPSIjRTQxNDVFIi8+CjxwYXRoIGQ9Ik0yNS4wNTkgNDAuNTkxNEMyNS4xNDk5IDM5LjYyMjggMjYuNjUwMSAzOS4zODEgMjcuMTYzNSA0MC4xNTlDMjguNDcwOCA0MS44NDUxIDI5Ljc1OSA0My41NDUyIDMxLjA2NjQgNDUuMjI5OEMzMS4wNzI3IDQzLjYzODIgMzEuMDU2OCA0Mi4wNDUxIDMxLjA3MjcgNDAuNDUzNUMzMS4wNjk1IDM5Ljk1NiAzMS42MjEyIDM5LjU5MTggMzIuMTA1OSAzOS43MjM1QzMyLjUwOTIgMzkuODAyNiAzMi43ODgyIDQwLjE5NzggMzIuNzUgNDAuNTkyOUMzMi43NDA0IDQyLjgxNjggMzIuNzc3MSA0NS4wNDIzIDMyLjczMjQgNDcuMjY0NkMzMi41OTA1IDQ4LjIwNjggMzEuMTM5NyA0OC40MjY5IDMwLjYyNzkgNDcuNjUzNkMyOS4zMzE3IDQ1LjkxMTcgMjguMDUxNSA0NC4xNTg5IDI2Ljc1MzcgNDIuNDIwMUMyNi43NDc0IDQ0LjA0NTggMjYuNzU4NSA0NS42NzMgMjYuNzUwNSA0Ny4zMDAyQzI2Ljc2MDEgNDcuNzg1MyAyNi4yNDY3IDQ4LjE4OTggMjUuNzYwNSA0OC4xMDkyQzI1LjMzOTYgNDguMDY3NCAyNS4wMDQ4IDQ3LjY3NjggMjUuMDQ5NCA0Ny4yNjkyQzI1LjA1MjYgNDUuMDQyMyAyNS4wMzM1IDQyLjgxNjggMjUuMDU5IDQwLjU5MTRaIiBmaWxsPSIjRTQxNDVFIi8+CjxwYXRoIGQ9Ik0zNi44MjUgNDEuNDc3OEMzOC4xMDIgNDEuMjMyOSAzOS40OTU1IDQxLjczODEgNDAuMjYyMyA0Mi43NjcyQzQxLjI2MzUgNDQuMDMzMyA0MS4xMjggNDUuOTk1MyAzOS45NTE0IDQ3LjExNDJDMzguOTQwNiA0OC4xNDAxIDM3LjIzMzEgNDguNDA5OCAzNS45NDAxIDQ3Ljc1MjdDMzQuNzM5NiA0Ny4xOTc5IDMzLjk3MTEgNDUuOTAzOCAzNC4wNTU2IDQ0LjYxNzZDMzQuMDc0OCA0My4xMTEyIDM1LjMwNzIgNDEuNzQxMiAzNi44MjUgNDEuNDc3OFpNMzYuNzk2MyA0My4xMjA1QzM2LjIyNTUgNDMuMzUzIDM1Ljc3NzUgNDMuODcyMSAzNS42OTE0IDQ0LjQ3MzRDMzUuNTEyOSA0NS4zNzA3IDM2LjE3MjkgNDYuMzA1MiAzNy4wODE3IDQ2LjQ5NzRDMzguMTUxNCA0Ni43Nzc5IDM5LjM2NzkgNDUuODc5MSAzOS4yOTYyIDQ0Ljc4NjVDMzkuNDA2MiA0My41NjM3IDM3LjkyOTggNDIuNTk4MiAzNi43OTYzIDQzLjEyMDVaIiBmaWxsPSIjRTQxNDVFIi8+CjxwYXRoIGQ9Ik00MS40OTUgNDIuMTQ4OUM0MS42OTExIDQxLjY3MzEgNDIuMzQ2NCA0MS40NjI0IDQyLjc5NiA0MS43MzM2QzQzLjA5MDkgNDEuODQ1MiA0My4xNzA2IDQyLjE3MzcgNDMuMjY3OSA0Mi40MzU2QzQzLjU4ODQgNDMuNDYzMSA0My45NTgyIDQ0LjQ3NjYgNDQuMjYxMiA0NS41MTAzQzQ0LjY2OTMgNDQuNDEzMSA0NC45OTQ1IDQzLjI4OCA0NS4zOTYzIDQyLjE4OTJDNDUuNjcwNSA0MS40MTc0IDQ2Ljk3MTUgNDEuNDM3NiA0Ny4yMDI3IDQyLjIzMTFDNDcuNTY5NCA0My4zMjA1IDQ3Ljk3OTEgNDQuMzk5MSA0OC4yNjYxIDQ1LjUxMTlDNDguNzM5NiA0NC4zOTI5IDQ5LjAxMDYgNDMuMjA0MyA0OS40NTU0IDQyLjA3NzZDNDkuNzI4MSA0MS40NTMxIDUwLjc1MzIgNDEuNDcxNyA1MS4wMzg2IDQyLjA3OTJDNTEuMjUyMiA0Mi4zOTg0IDUxLjA1MTMgNDIuNzY1NyA1MC45NTQxIDQzLjA4ODFDNTAuMzk2MSA0NC41NTQxIDQ5Ljg3NDcgNDYuMDM0MSA0OS4zMDg4IDQ3LjQ5NzFDNDguOTk3OSA0OC4yOTIxIDQ3LjY3MTQgNDguMzIgNDcuMzMxOCA0Ny41Mzc0QzQ2Ljk1MDggNDYuNTgxMiA0Ni42MzE5IDQ1LjYwMTcgNDYuMzA5OSA0NC42MjU0QzQ1Ljg5ODUgNDUuNTk1NSA0NS42NTQ2IDQ2LjYyNDYgNDUuMjI4OSA0Ny41ODg1QzQ0Ljg0NjMgNDguMzA5MSA0My42MzE0IDQ4LjI3MzUgNDMuMjkxOCA0Ny41MzU4QzQyLjczMDYgNDYuMTA3IDQyLjIzIDQ0LjY1OCA0MS42ODE2IDQzLjIyNDRDNDEuNTYyIDQyLjg4MDQgNDEuMzc1NCA0Mi41MTc4IDQxLjQ5NSA0Mi4xNDg5WiIgZmlsbD0iI0U0MTQ1RSIvPgo8cGF0aCBkPSJNMjEuNDUwOCAxMS45MTk2QzIzLjU0MjYgMTAuNzI0OCAyNi4xMzk3IDEwLjQyMSAyOC40Njc0IDExLjA2ODhDMzAuNTQ4IDExLjYzMjkgMzIuMzk1OCAxMi45NTY0IDMzLjU2NzYgMTQuNzE4NUMzNC43NjM0IDE2LjQ4NjcgMzUuMjU2IDE4LjY4NzQgMzQuOTMyNCAyMC43NzhDMzQuNDc4IDI0LjE5MjEgMzEuNzMxIDI3LjE2NzYgMjguMyAyOC4wMDEzQzI2LjkwNSAyOC4zOTAzIDI1LjQ0NDYgMjguMjgwMyAyNC4wMTI5IDI4LjI5NDJDMjEuNjY0NSAyOC4yOTExIDE5LjMxNzYgMjguMzAwNCAxNi45NjkyIDI4LjI4OTZDMTYuOTc0IDI1LjcyOTQgMTYuOTY5MiAyMy4xNzA4IDE2Ljk3MjQgMjAuNjEwNkMxNi45NzQgMTkuODMyNiAxNi45MzczIDE5LjA1IDE3LjA0NzMgMTguMjc1MUMxNy40MDI5IDE1LjY0ODMgMTkuMDg2NSAxMy4yMzIzIDIxLjQ1MDggMTEuOTE5NlpNMjUuMTE2MiAxNS43MDg4QzIzLjM3NTIgMTYuMDU0NCAyMi4wMTM2IDE3LjY1MjEgMjEuOTgxNyAxOS4zNzg2QzIxLjk3NTQgMjAuNzI2OCAyMS45NzA2IDIyLjA3NjcgMjEuOTg4MSAyMy40MjQ5QzIzLjM1NDQgMjMuNDE0MSAyNC43MjI0IDIzLjQzODkgMjYuMDg4NyAyMy40MTU2QzI3LjUwOTIgMjMuMzg0NiAyOC44NzcyIDIyLjU2NzkgMjkuNTM0IDIxLjM0MDVDMzAuMjQwMyAyMC4wOTQ1IDMwLjE0NjIgMTguNDcwNCAyOS4yOTk2IDE3LjMxMTJDMjguNDExNiAxNi4wMTg3IDI2LjY3NTQgMTUuMzMzNyAyNS4xMTYyIDE1LjcwODhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTcuMjA3OCAzOS40MTY3QzE3Ljc2MTEgMzkuMDc0MiAxOC42Mjg0IDM5LjQ2NDggMTguNjM0NyA0MC4xMjVDMTguNzYyMyA0MC44MDY5IDE3Ljk0NiA0MS4zNTcgMTcuMzE5NCA0MS4wNjg4QzE2LjYwMiA0MC44MzQ4IDE2LjU0MTQgMzkuNzQ2OCAxNy4yMDc4IDM5LjQxNjdaIiBmaWxsPSIjMTExMDBEIi8+CjxwYXRoIGQ9Ik0xLjEwNjk5IDM5Ljc0NTJDMS43NzY2IDM5LjQ1ODUgMi41NjEgMzkuNjcwOCAzLjI3ODQ1IDM5LjYwNThDNC41OTA1NyAzOS41MzQ1IDYuMDEyNyAzOS43ODg2IDYuOTcyNDggNDAuNzI2MkM4LjkxMTE2IDQyLjQ1NzMgOC43MTk4NSA0NS44ODIyIDYuNTQzNjEgNDcuMzQ5OEM1LjE0NTM5IDQ4LjM3NzMgMy4zMDg3NCA0OC4wNzUxIDEuNjc2MTYgNDguMTE4NUMxLjE4NTExIDQ4LjE2OTYgMC42Njg1NTIgNDcuNzg4NCAwLjc0NjY3NCA0Ny4yNzdDMC43ODE3NDkgNDQuOTk3MyAwLjY3OTcxMiA0Mi43MTkyIDAuNzQ5ODYyIDQwLjQ0MTFDMC43MTk1NyA0MC4xNjA2IDAuODYxNDY0IDM5Ljg5MjUgMS4xMDY5OSAzOS43NDUyWk0yLjQxMTE0IDQxLjE5NThDMi40MTExNCA0Mi45NzQ5IDIuNDA3OTUgNDQuNzU1NiAyLjQxMjczIDQ2LjUzNDdDMy40MjY3MiA0Ni41MjY5IDQuNTMzMTcgNDYuNjYzMyA1LjQzMjM3IDQ2LjEwMDdDNi45OTQ4IDQ1LjE4MDIgNy4wMzMwNiA0Mi42NTQxIDUuNTA4ODkgNDEuNjgwOUM0LjYwNDkyIDQxLjA3MDMgMy40NTA2MyA0MS4yMDIgMi40MTExNCA0MS4xOTU4WiIgZmlsbD0iIzExMTAwRCIvPgo8cGF0aCBkPSJNMjAuMzk0NCA0MC40OTM4QzIwLjU2NSAzOS45NjIzIDIxLjMxOTEgMzkuODYxNSAyMS43NDE2IDQwLjE1MjlDMjIuMTkxMiA0MC41MDc4IDIxLjk4NzIgNDEuMTMwOCAyMi4wMzY2IDQxLjYxNThDMjIuNTYyNyA0MS42NzAxIDIzLjI0MTkgNDEuNDM2MSAyMy42MzU3IDQxLjg5MzJDMjMuOTk2IDQyLjI3NDUgMjMuNzcyOCA0My4wMTA2IDIzLjIzMzkgNDMuMTAyQzIyLjgzMzcgNDMuMTQzOSAyMi40MzIgNDMuMTIyMiAyMi4wMzM0IDQzLjEyMzdDMjIuMDM1IDQ0LjAzODEgMjIuMDMwMiA0NC45NTI0IDIyLjAzMDIgNDUuODY4M0MyMi4wMTI3IDQ2LjE1NSAyMi4xMDE5IDQ2LjQyOTMgMjIuMjA0IDQ2LjY5NTlDMjIuNjM3NiA0Ni43MTI5IDIzLjA3OTMgNDYuNjg2NiAyMy41MDQ5IDQ2Ljc5MkMyNC4wNDIyIDQ3LjEwNjYgMjMuNzg1NSA0Ny45Mjk1IDIzLjIxMTYgNDguMDM2NEMyMi4xODQ4IDQ4LjI5NTIgMjAuNjY3MSA0OC4wNjc0IDIwLjQwNzIgNDYuODc1N0MyMC4yNjA1IDQ1LjY0ODMgMjAuMzg4MSA0NC40MDM4IDIwLjM0MDIgNDMuMTcwMkMxOS42MjQ0IDQzLjEzNjEgMTkuMjczNiA0Mi4zNjkgMTkuNjc3IDQxLjgxNDJDMTkuODk3IDQxLjczNjcgMjAuMTE3IDQxLjY1NjEgMjAuMzM3IDQxLjU3NEMyMC4zNDUgNDEuMjEyOSAyMC4zMTQ3IDQwLjg0NzIgMjAuMzk0NCA0MC40OTM4WiIgZmlsbD0iIzExMTAwRCIvPgo8cGF0aCBkPSJNOS41MzI5NSA0Mi4wMzU3QzkuNzkxMjMgNDEuMzU2OSAxMC45NjE1IDQxLjQ0NTMgMTEuMTE2MSA0Mi4xNTUxQzExLjIyMjkgNDMuMzU2MSAxMS4wNzE1IDQ0LjU3MTEgMTEuMTg2MyA0NS43NzM3QzExLjQ4NiA0Ni45MDE5IDEzLjUyODMgNDYuNzU3OCAxMy42NzM0IDQ1LjU5NTVDMTMuNzM1NiA0NC40NjQyIDEzLjYzOTkgNDMuMzI4MiAxMy43MTE2IDQyLjE5ODVDMTMuODE4NSA0MS40OTE4IDE0LjkyOTcgNDEuMzQ2MSAxNS4yNzA5IDQxLjk1ODJDMTUuNTE5NiA0Mi41MSAxNS4zNDU4IDQzLjEyMDYgMTUuMzY1IDQzLjY5ODZDMTUuMzc0NSA0NC43ODM0IDE1LjMzNjMgNDUuODcxMyAxNS40MTEyIDQ2Ljk1NjJDMTUuNDY1NCA0Ny40NjI5IDE1LjE5OTEgNDguMDk4MyAxNC41OTY1IDQ4LjExNTRDMTQuMDQzMyA0OC4xODY3IDEzLjY5MDkgNDcuNjg2MSAxMy42MzUxIDQ3LjIxMTlDMTIuODM5NiA0OC41NDkzIDEwLjYwNDMgNDguMzQ5NCA5Ljg1MzQxIDQ3LjA3MzlDOS4yNzE0OCA0Ni4xNTQ5IDkuNDY5MTcgNDUuMDM0NSA5LjQzNTY5IDQ0LjAxMTdDOS40NjkxNyA0My4zNTYxIDkuMzM4NDQgNDIuNjcyNyA5LjUzMjk1IDQyLjAzNTdaIiBmaWxsPSIjMTExMDBEIi8+CjxwYXRoIGQ9Ik0xNy4yMDk2IDQxLjc1ODNDMTcuNzE4MiA0MS4zNjQ3IDE4LjU5NjYgNDEuODAxNyAxOC41MjgxIDQyLjQ0NDlDMTguNTQ1NiA0NC4wNTUxIDE4LjU0NCA0NS42NjY4IDE4LjUyOTcgNDcuMjc3QzE4LjYxMSA0Ny45NzQ0IDE3LjYxOTMgNDguMzk3NCAxNy4xMjE5IDQ3LjkwOTNDMTYuODA3OCA0Ny42ODc3IDE2Ljg1NCA0Ny4yODQ3IDE2Ljg0NzcgNDYuOTU0NkMxNi44NjA0IDQ1LjQ1NDUgMTYuODQ0NSA0My45NTQzIDE2Ljg1NCA0Mi40NTQyQzE2LjgzMTcgNDIuMTc2OCAxNi45NzIgNDEuOTA4NyAxNy4yMDk2IDQxLjc1ODNaIiBmaWxsPSIjMTExMDBEIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTE5OV8zOTc1Ij4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjQ2IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAzKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" /></div><b>DuitNow QR</b></li>
              <li className="payment-item"><div className="payment-brand"><span style={{fontWeight:800,fontSize:15,color:"#352a33"}}>Bank Transfer</span></div><b>Transfer</b></li>
              <li className="payment-item"><div className="payment-brand"><span style={{fontWeight:800,fontSize:18,color:"#352a33"}}>RM</span></div><b>Cash</b></li>
            </ul>
          </section>
          <div className="hero-actions only-wa"><a href={bookingLink("booking appointment")}><CalendarDays size={23} aria-hidden="true" /><span>Semak Slot &amp; Booking</span></a></div>
      </section>

      <section className="quick-links">
        <button onClick={() => go("reviews")}>Review</button>
        <button onClick={() => go("contact")}>Contact Us</button>
        <button onClick={() => go("location")}>Our Location</button>
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
          <PromoNote />
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
        <p className="lead">{item.short}</p>
        {item.panels.map(panel => <InfoPanel key={panel.title} title={panel.title} text={panel.text} />)}
        {/Colour/.test(item.title) && <section style={{marginTop:24}}><h3 style={{color:"#8b1744"}}>Pilihan Warna Colour No Bleach</h3><NoBleachPalette /></section>}
        <a className="main-wa" href={bookingLink(item.booking)}><MessageCircle size={18} /> Saya berminat nak buat {item.title}</a>
        <PromoNote />
      </section>
    </motion.section>
  );
}


function ReviewsPage() {
    const branches = [
    {
      name: "Setapak KL",
      link: "https://www.google.com/searchviewer/10?output=search&svid=CCYSGioYOhYweDA6MHhjZjFiNzVhNTVjYTY0ZjVkGAo&hl=en-GB&gl=MY#sv=CAESzQEKuQEStgEKd0FERGJXZVloYTE2eVJHQnhscm9iYzhSalhUYkFFaGpVSFU5NTdXZ2g4M2JnVEhHeUxuSkkyWUJxSXhRWWllMllQcGV2TEF3UlNBb1p6ZGdTVFFyMnB0d3dzVXd2QXhXMGR6eDBxdWc0T2dna3d3Y1p5djIyWkdREhdzanprYXZQUUMtR1lzZU1QdUtLSXNBWRoiQUhOMEU3Rm5TN3NiOGRPS3g3REFoTExXSTN6eGlSNGpOURIEODA1MRoBMyoAMAA4AUAAGAAg6pDb2wFKAhAB"
    },
    {
      name: "Selayang Batu Caves",
      link: "https://www.google.com/search?sca_esv=c55da69dae0261d8&hl=en-GB&gl=MY&output=search&kgmid=%2Fg%2F11xp0flcln&q=Fafa%20Salon%20Beauty%20(Selayang)%20-%20Salon%20Wanita%20%26%20Muslimah&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm4%2F3"
    },
  ];

function WalkInPage() {
  return (
    <motion.section className="page walkin-page" {...pageMotion}>
      <div className="content-block" style={{background:"#121015",color:"#fff",minHeight:"75vh",paddingBottom:120}}>
        <span className="kicker">Maklumat Walk-in</span>
        <h1 style={{fontSize:30,margin:"12px 0 22px",color:"#fff"}}>Sebelum Datang ke Salon</h1>
        <div style={{padding:20,borderRadius:20,border:"1px solid #85516d",background:"#241923",lineHeight:1.8,fontSize:14}}>
          <h2 style={{fontSize:19,color:"#ff9bcb",margin:"0 0 10px"}}>Harga Normal untuk Walk-in</h2>
          <p style={{color:"#f4eaf0",margin:"0 0 12px"}}>Harga promo yang dipaparkan tidak terpakai untuk walk-in. Servis walk-in dikenakan harga normal. Sila dapatkan harga terus di salon.</p>
          <p style={{color:"#f4eaf0",margin:0}}>Untuk menikmati harga promo terkini, semak harga dan kekosongan slot terlebih dahulu. Deposit dibayar selepas harga dan slot disahkan oleh admin.</p>
          <a className="main-wa" href="#booking" style={{marginTop:18,textAlign:"center"}}><CalendarDays size={18} /> Semak Slot &amp; Harga Promo</a>
        </div>
        <div style={{padding:20,borderRadius:20,border:"1px solid #85516d",background:"#241923",lineHeight:1.8,fontSize:14,marginTop:18}}>
          <h2 style={{fontSize:19,color:"#ff9bcb",margin:"0 0 10px"}}>Hair Cut, Hair Wash &amp; Eyelash</h2>
          <p style={{color:"#f4eaf0",margin:0}}>Servis ini disediakan secara walk-in sahaja dan tertakluk pada terma dan syarat. Hubungi kami pada hari yang sama untuk pertanyaan sebelum datang.</p>
          <a className="main-wa" href="#contact" style={{marginTop:18,textAlign:"center"}}><MessageCircle size={18} /> Contact Us — Cut, Wash &amp; Eyelash</a>
        </div>
        <p style={{fontSize:13,lineHeight:1.8,color:"#e0cbd8",padding:"16px 4px",margin:0}}>Semua servis walk-in bergantung pada kekosongan slot. Pelanggan mungkin perlu menunggu giliran, atau servis tidak dapat diterima jika slot penuh.</p>
      </div>
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
          <div className="contact-notice" style={{margin:"18px 0",padding:"18px",border:"1px solid #85516d",borderRadius:18,background:"rgba(20,14,24,.9)",color:"#fff",textAlign:"left",fontSize:14,lineHeight:1.8}}>
            <strong style={{display:"block",color:"#ff9bcb",marginBottom:8}}>Makluman Servis Walk-in</strong>
            <p style={{margin:"0 0 12px",color:"#f4eaf0"}}>Hair Cut, Hair Wash dan Eyelash disediakan secara walk-in sahaja. Tempahan awal bagi servis ini tidak diterima.</p>
            <p style={{margin:"0 0 12px",color:"#f4eaf0"}}>Sila rujuk detail servis sebelum menghubungi kami. Permintaan tempahan awal untuk servis walk-in mungkin tidak mendapat maklum balas.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:14}}><a href="#haircut" style={{color:"#ff9bcb",textDecoration:"underline"}}>Detail Hair Cut &amp; Hair Wash</a><a href="#eyelash" style={{color:"#ff9bcb",textDecoration:"underline"}}>Detail Eyelash</a></div>
            <p style={{margin:0,color:"#f4eaf0"}}>Untuk pertanyaan selain tempahan servis walk-in, sila tunggu maklum balas daripada admin. Kami akan membalas secepat mungkin. Terima kasih atas kesabaran dan kerjasama anda.</p>
          </div>
          <a className="main-wa" target="_blank" rel="noopener noreferrer" href={bookingLink("pertanyaan salon")}><MessageCircle size={18} /> Hubungi Kami di WhatsApp</a>
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
  if (type === "rebonding") return <Wand2 size={18} />;
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
  const href = page === "home" ? "#walkin" : "#booking";
  return <div className="bottom-bar"><button onClick={() => go("home")}><Home size={16} /> Home</button>{!current?.walkinOnly && <a href={href}><MessageCircle size={16} /> {page === "home" ? "Walk-in" : "Semak Harga & Tempah"}</a>}</div>;
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
function bookingDateOffset(date, days) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0,10);
}
function initialBookingServices() {
  const requested = new URLSearchParams(window.location.hash.split('?')[1] || '').get('service');
  return bookingChoices.includes(requested) ? [requested] : [];
}
function BookingPage({ go }) {
  const [selected, setSelected] = useState(initialBookingServices);
  const [wantCut, setWantCut] = useState(false);
  useLayoutEffect(() => {
    if (!initialBookingServices().length) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById('booking-selected-services');
      const header = document.querySelector('.top-nav');
      if (target) window.scrollTo({top:Math.max(0,window.scrollY + target.getBoundingClientRect().top - (header?.getBoundingClientRect().height || 0) - 16),behavior:'instant'});
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const [form, setForm] = useState({ name: '', phone: '', branch: '', date: '', time: '', length: '', cutLength: '', notes: '' });
  const [error, setError] = useState('');
  const [adviceNotes, setAdviceNotes] = useState('');
  const adviceOnly = selected.includes(otherBookingChoice);
  const update = (key, value) => { setForm(prev => ({ ...prev, [key]: value })); };
  const canAddCut = selected.some(allowsCut);
  const hasCut = canAddCut && wantCut;
  const [today, setToday] = useState(malaysiaToday);
  useEffect(() => {
    const timer = setInterval(() => setToday(malaysiaToday()), 60000);
    return () => clearInterval(timer);
  }, []);
  const availableDates = Array.from({length:6}, (_, index) => bookingDateOffset(today, index));
  const isCombo = selected.some(item => comboBookingChoices.includes(item)) || selected.length > 1;
  const earlyCutoff = isCombo || selected.some(item => ["Highlight + Colour", "Bleach + Colour"].includes(item));
  const end = earlyCutoff ? 15.5 : 17;
  const times = [];
  for (let value = 11; value <= end; value += 0.5) {
    const hour = Math.floor(value);
    times.push(`${hour > 12 ? hour - 12 : hour}:${value % 1 ? '30' : '00'} ${hour >= 12 ? 'PM' : 'AM'}`);
  }
  const toggle = item => {
    const next = item === otherBookingChoice ? (selected.includes(item) ? [] : [item]) : (selected.includes(item) ? selected.filter(value => value !== item) : [...selected.filter(value => value !== otherBookingChoice), item]);
    setSelected(next); setError('');
    if (!next.some(allowsCut)) { setWantCut(false); setForm(prev => ({...prev, cutLength: ''})); }
    setForm(prev => ({ ...prev, time: '' }));
  };
  const dateLabel = form.date ? new Date(`${form.date}T12:00:00`).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
  const message = [
    'Hi FAFA Salon! Saya nak semak harga & kekosongan slot.', '',
    `Nama: ${form.name.trim()}`,
    `No. telefon: ${form.phone.trim()}`,
    `Cawangan: ${form.branch}`,
    `Tarikh pilihan: ${dateLabel}`,
    `Masa pilihan: ${form.time}`, '',
    `Servis: ${selected.join(' + ')}`,
    ...(hasCut ? [`Add-on Hair Cut: potong ke paras ${form.cutLength}`] : []),
    ...(!hasCut ? [`Panjang rambut: ${form.length}`] : []),
    `Nota: ${form.notes.trim() || '-'}`, '',
    'Saya faham tempahan belum disahkan dan deposit RM30 seorang hanya dibayar selepas pengesahan admin.',
  ].join('\n');
  const adviceMessage = `Hi FAFA Salon! Saya ingin mendapatkan nasihat.\n\nSoalan / masalah rambut:\n${adviceNotes.trim()}`;
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(adviceOnly ? adviceMessage : message)}`;
  const validate = element => {
    const node = element.closest('form');
    if (adviceOnly) {
      if (!adviceNotes.trim()) { setError('Sila nyatakan soalan atau masalah rambut anda.'); node.querySelector('[name=adviceNotes]')?.focus(); return false; }
      setError(''); return true;
    }
    if (!selected.length) { setError('Sila pilih sekurang-kurangnya satu servis.'); node.querySelector('input[type=checkbox]').focus(); return false; }
    if (!form.date) { setError('Sila pilih satu tarikh booking.'); node.querySelector('[name=bookingDate]')?.focus(); return false; }
    if (!node.reportValidity()) { setError('Sila lengkapkan semua ruangan wajib dan tandakan persetujuan.'); return false; }
    const currentDay = malaysiaToday();
    if (form.date < currentDay || form.date > bookingDateOffset(currentDay, 5)) { setError('Sila pilih tarikh hari ini hingga 5 hari berikutnya.'); return false; }
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
        .booking-page{background:#09090c !important;color:#f6f4f7 !important;min-height:100vh;padding-bottom:110px;color-scheme:dark;isolation:isolate;overflow-x:clip}
        .booking-page,.booking-page *{box-sizing:border-box}
        .booking-page .content-block{padding:26px 20px 36px;background:#09090c;color:#f6f4f7;width:100%;min-width:0}
        .booking-page h2,.booking-page strong{color:#f6f4f7}
        .booking-page .lead{color:#d0ccd4;font-size:14px;line-height:1.8}
        .booking-page .kicker{color:#ff98c7}
        .booking-page input::placeholder,.booking-page textarea::placeholder{color:#716b76;opacity:1}
        .booking-page select option{color:#27222b;background:#fff}
        .booking-page h2{font-size:30px;line-height:1.2;margin:12px 0}
        .booking-page .booking-back{display:flex;align-items:center;gap:7px;background:transparent;color:#ff98c7;padding:0;margin:0 0 24px}
        .booking-page form{display:grid;gap:24px;min-width:0}
        .booking-page fieldset{border:0;margin:0;padding:0;min-width:0}
        .booking-page legend{font-size:12px;color:#ff98c7;font-weight:800;letter-spacing:1px;padding:0 0 12px}
        .booking-page .booking-services{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:stretch}
        .booking-page .booking-group-title{color:#ff98c7;font:700 14px system-ui;margin:22px 0 12px}
        .booking-page .booking-service-item{min-width:0}
        .booking-page .booking-choice{height:100%}
        .booking-page .booking-other{grid-column:1/-1;width:min(100%,280px);justify-self:center;margin-top:5px}
        .booking-page .booking-other .booking-choice{justify-content:center;text-align:center}
        .booking-page .booking-addons{margin-top:7px;padding:11px 9px;background:#f7f6f8;border:1px solid #d9d3dc;border-radius:12px;display:grid;gap:10px;color:#27222b;font-size:12px;line-height:1.5}
        .booking-page .booking-cut-card{margin-top:22px;padding:16px;border-radius:16px;background:#f7f6f8;border:1px solid #d9d3dc}
        .booking-page .booking-cut-card.active{border-color:#e33e8a;background:#fce5ef}
        .booking-page .booking-cut-toggle{gap:12px;align-items:flex-start;font-size:14px}
        .booking-page .booking-cut-toggle strong{display:block;font-size:15px;color:#27222b}
        .booking-page .booking-cut-toggle small{display:block;color:#62586a;font-weight:400;line-height:1.6;margin-top:4px}
        .booking-page .booking-cut-target{border-top:1px solid #68616d;margin-top:8px;padding-top:18px}
        .booking-page .booking-cut-target label.booking-field{display:grid;gap:10px}
        .booking-page .booking-addon-title{color:#ff98c7;font-size:11px;font-weight:700}
        .booking-page .booking-addons label{display:flex;gap:7px;align-items:flex-start;cursor:pointer}
        .booking-page .booking-choice{display:flex;align-items:center;gap:12px;min-height:80px;background:#f7f6f8;border:1px solid #d9d3dc;border-radius:18px;padding:13px 10px;font-size:13px;font-weight:700;line-height:1.5;cursor:pointer;color:#27222b;overflow-wrap:anywhere;transition:background .15s,border-color .15s,box-shadow .15s}
        .booking-page .booking-choice.selected{border-color:#e33e8a;background:#fce5ef;box-shadow:inset 0 0 0 1px #ff9bcd}
        .booking-page .booking-choice:focus-within{outline:3px solid #ffd1e8;outline-offset:3px}
        .booking-page .booking-choice:hover{border-color:#ffc0df}
        .booking-page input[type=checkbox]{accent-color:#df3987;width:23px;height:23px;flex-shrink:0;margin:0;color-scheme:light;cursor:pointer}
        .booking-page .booking-fields{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;min-width:0}
        .booking-page .booking-field{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;font-size:14px;font-weight:600;line-height:1.5;color:#f6f4f7;min-width:0}
        .booking-page input:not([type=checkbox]),.booking-page select,.booking-page textarea{width:100%;max-width:100%;min-width:0;background:#f7f6f8;border:1px solid #d9d3dc;border-radius:12px;padding:13px 12px;color:#27222b;font:16px system-ui;box-sizing:border-box;color-scheme:light;line-height:24px;-webkit-text-fill-color:#27222b;opacity:1}
        .booking-page input:not([type=checkbox]),.booking-page select{height:52px;min-height:52px;max-height:52px;margin:0}
        .booking-page input[type=date]{display:block;appearance:none;-webkit-appearance:none;inline-size:100%;min-inline-size:0;max-inline-size:100%;text-align:left;padding:13px 12px;overflow:hidden}
        .booking-page input[type=date]::-webkit-date-and-time-value{text-align:left;min-height:24px;margin:0}
        .booking-page input[type=date]::-webkit-datetime-edit{padding:0;display:inline-flex;line-height:24px}
        .booking-page input[type=date]::-webkit-calendar-picker-indicator{margin:0;padding:0;flex-shrink:0}
        .booking-page textarea{min-height:110px;resize:vertical;font-weight:400}
        .booking-page .booking-fields input,.booking-page .booking-fields select{font-weight:400}
        .booking-page input:focus-visible,.booking-page select:focus-visible,.booking-page textarea:focus-visible,.booking-page a:focus-visible{outline:2px solid #ff7ab8;outline-offset:3px}
        .booking-page .booking-note{font-size:13px;line-height:1.8;color:#d0ccd4;margin:10px 0 0}
        .booking-page .booking-notice{background:#353038;border:1px solid #68616d;border-radius:16px;padding:16px;font-size:13px;line-height:1.8;color:#e5dee8}
        .booking-page .booking-consent{display:flex;gap:10px;font-size:13px;line-height:1.7;color:#e5dee8}
        .booking-page .booking-error{color:#ff9ab7;font-size:13px;line-height:1.6;margin:0}
        .booking-page .booking-send{display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(135deg,#b92167,#ff7ab8);padding:17px 12px;border-radius:14px;color:#fff;text-decoration:none;font-weight:800;font-size:14px;text-align:center}
        .booking-page .booking-copy{width:100%;font-size:13px;min-height:200px}
        .booking-page .booking-fallback{background:transparent;color:#ff98c7;border:1px solid #68616d;border-radius:12px;padding:12px;font-size:13px;width:100%;cursor:pointer}
        .booking-page details{color:#ff98c7 !important}
        .booking-page .booking-cut-card .booking-field{color:#27222b}
        .booking-page .booking-cut-card .booking-note{color:#62586a}
      `}</style>
      <div className="content-block">
        <button className="booking-back" onClick={() => go('home')}><ArrowLeft size={16} /> Kembali ke Home</button>
        <span className="kicker">Booking / Semak Slot</span>
        <h2>{adviceOnly ? "Tanya Kami" : "Jom rancang hair day anda"}</h2>
        <p className="lead">{adviceOnly ? "Nyatakan soalan atau masalah rambut anda untuk mendapatkan nasihat daripada kami." : "Pilih servis dan waktu pilihan. Admin akan semak kekosongan serta berikan harga melalui WhatsApp."}</p>
        <form onSubmit={event => { event.preventDefault(); event.currentTarget.querySelector('[data-booking-send]').click(); }}>
          <fieldset>
            <legend>01 / PILIH SERVIS ANDA</legend>
            {selected.length > 0 ? <>
              <div id="booking-selected-services" aria-live="polite" style={{scrollMarginTop:90}}>
                <h3 className="booking-group-title" style={{fontSize:18,marginTop:0}}>Servis pilihan anda ✓</h3>
                <p className="booking-note" style={{margin:'0 0 12px'}}>Servis di bawah sudah ditick. Semak pilihan anda, kemudian terus isi detail di bawah.</p>
                <div className="booking-services">{selected.map(renderChoice)}</div>
              </div>
              <details style={{margin:'16px 0',color:'#ff99c9'}}>
                <summary style={{cursor:'pointer',padding:'10px 0',fontWeight:700}}>Tambah atau pilih servis lain</summary>
                <h3 className="booking-group-title">Combo Services</h3>
                <div className="booking-services">{comboBookingChoices.filter(item => !selected.includes(item)).map(renderChoice)}</div>
                <h3 className="booking-group-title">Single Services</h3>
                <div className="booking-services">{singleBookingChoices.filter(item => !selected.includes(item)).map(renderChoice)}{!selected.includes(otherBookingChoice) && renderChoice(otherBookingChoice)}</div>
              </details>
            </> : <>
              <p className="booking-note" style={{margin:'0 0 12px'}}>Boleh pilih lebih daripada satu servis.</p>
              <h3 className="booking-group-title">Combo Services</h3>
              <div className="booking-services">{comboBookingChoices.map(renderChoice)}</div>
              <h3 className="booking-group-title">Single Services</h3>
              <div className="booking-services">{singleBookingChoices.map(renderChoice)}{renderChoice(otherBookingChoice)}</div>
            </>}
            {canAddCut && <div className={`booking-addons booking-cut-card ${hasCut ? 'active' : ''}`}>
              <label className="booking-cut-toggle"><input type="checkbox" checked={wantCut} onChange={event => { const checked = event.target.checked; setWantCut(checked); if (!checked) update('cutLength', ''); }} /><span><strong>Add-on Hair Cut</strong><small>Tick jika mahu potong rambut. Nyatakan gaya potongan yang diinginkan dalam Nota tambahan.</small></span></label>
              {hasCut && <div className="booking-cut-target">
                <label className="booking-field">Nak potong ke paras mana? *<select required value={form.cutLength} onChange={event => update('cutLength', event.target.value)}><option value="">Pilih paras selepas dipotong</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
                <p className="booking-note" style={{marginTop: 10}}>Pilih paras rambut yang diinginkan selepas dipotong. Hairstylist akan sahkan potongan semasa konsultasi.</p>
              </div>}
            </div>}
            {!adviceOnly && !hasCut && <div className="booking-fields" style={{marginTop:20}}>
              <label className="booking-field">Panjang rambut sekarang *<select required value={form.length} onChange={event => update('length', event.target.value)}><option value="">Pilih paras rambut</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
              <p className="booking-note">{hairCheckNote}</p>
            </div>}
          </fieldset>
          {adviceOnly ? <label className="booking-field">Soalan / masalah rambut *<textarea name="adviceNotes" required maxLength={1000} value={adviceNotes} onChange={event => {setAdviceNotes(event.target.value);setError('');}} placeholder="Contoh: Rambut saya pernah bleach dan kini kering. Servis apa yang sesuai?" /></label> : <>
          <fieldset>
            <legend>02 / CAWANGAN & WAKTU</legend>
            <div className="booking-fields">
              <label className="booking-field">Cawangan *<select value={form.branch} required onChange={event => update('branch', event.target.value)}><option value="">Pilih cawangan</option><option>Setapak, Kuala Lumpur</option><option>Selayang, Batu Caves</option></select></label>
              <label className="booking-field">Tarikh pilihan *<select name="bookingDate" required value={form.date} onChange={event => {update('date',event.target.value);setError('');}}><option value="">Pilih tarikh</option>{availableDates.map(date => <option key={date} value={date}>{new Date(`${date}T12:00:00Z`).toLocaleDateString('ms-MY',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kuala_Lumpur'})}</option>)}</select></label>
              <label className="booking-field">Masa pilihan *<select value={form.time} required onChange={event => update('time', event.target.value)}><option value="">Pilih masa</option>{times.map(time => <option key={time}>{time}</option>)}</select></label>
            </div>
            <p className="booking-note">{earlyCutoff && "Slot terakhir untuk servis pilihan anda ialah 3:30 PM. "}Slot tertakluk pada kekosongan. Admin akan sahkan waktu mengikut servis dan jadual cawangan.</p>
          </fieldset>
          <fieldset>
            <legend>03 / MAKLUMAT ANDA</legend>
            <div className="booking-fields">
              <label className="booking-field">Nama penuh *<input required maxLength={100} autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} placeholder="Nama anda" /></label>
              <label className="booking-field">No. telefon / WhatsApp *<input required type="tel" minLength={9} maxLength={20} autoComplete="tel" value={form.phone} onChange={event => update('phone', event.target.value)} placeholder="Contoh: 0123456789" /></label>
              <label className="booking-field">Nota tambahan<textarea maxLength={1000} value={form.notes} onChange={event => update('notes', event.target.value)} placeholder="Contoh: Warna pilihan — Ash Brown; pernah colour / bleach; rambut sensitif, kering atau rosak. Nyatakan juga sebarang permintaan khas." /></label>
            </div>
          </fieldset>
          <label className="booking-consent"><input type="checkbox" required /><span>Saya faham slot tertakluk kepada kekosongan dan bersetuju menghantar maklumat kepada FAFA Salon. Deposit RM30 akan dibuat selepas harga dan slot disahkan. Borang ini belum mengesahkan tempahan.</span></label>
          </>}
          <p className="booking-error" role="alert">{error}</p>
          <a data-booking-send className="booking-send" href={href} target="_blank" rel="noopener noreferrer" onClick={event => { if (!validate(event.currentTarget)) event.preventDefault(); }}><MessageCircle size={18} /> {adviceOnly ? "Tanya Kami" : "Hantar detail ke WhatsApp ↗"}</a>
        </form>
      </div>
    </motion.section>
  );
}
