  'Bleach + Colour', 'Highlight + Colour', 'Touch-up Rebonding',
  'Soft Treatment', 'Protein Treatment', 'Scalp Treatment',
  'Hair Cut & Styling', 'Hair Wash', 'Setting Curl', 'Hairdo',
  ...Object.values(combos).map(item => item.booking),
  'Lain-lain / Perlukan nasihat',
];
const lengthChoices = ['1 — Sebahu', '2 — Ketiak–atas bra line', '3 — Bawah bra line–atas pinggang', '4 — Bawah pinggang'];
const hairCheckNote = 'Hairstylist akan memeriksa paras sebenar dan ketebalan rambut. Harga mungkin berubah selepas pemeriksaan.';
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
  const [prepared, setPrepared] = useState(false);
  const update = (key, value) => { setForm(prev => ({ ...prev, [key]: value })); setPrepared(false); };
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
    setSelected(next); setError(''); setPrepared(false);
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
    setError(''); setPrepared(true); return true;
  };
  return (
    <motion.section className="page booking-page" {...pageMotion}>
      <style>{`
        .booking-page .content-block{padding:26px 20px 36px}
        .booking-page h2{font-size:30px;line-height:1.2;margin:12px 0}
        .booking-page .booking-back{display:flex;align-items:center;gap:7px;background:transparent;color:#ff80b8;padding:0;margin:0 0 24px}
        .booking-page form{display:grid;gap:24px;min-width:0}
        .booking-page fieldset{border:0;margin:0;padding:0;min-width:0}
        .booking-page legend{font-size:12px;color:#ff80b8;font-weight:800;letter-spacing:1px;padding:0 0 12px}
        .booking-page .booking-services{display:grid;grid-template-columns:1fr 1fr;gap:9px}
        .booking-page .booking-choice{display:flex;align-items:flex-start;gap:7px;background:#1a1a25;border:1px solid #453343;border-radius:12px;padding:12px 9px;font-size:12px;line-height:1.5;cursor:pointer;color:#f4eaf0;overflow-wrap:anywhere}
        .booking-page .booking-choice.selected{border-color:#ff79b4;background:#3d2033}
        .booking-page input[type=checkbox]{accent-color:#e65098;width:17px;height:17px;flex-shrink:0;margin:2px 0}
        .booking-page .booking-fields{display:grid;gap:16px}
        .booking-page .booking-field{display:grid;gap:8px;font-size:13px;color:#f4eaf0}
        .booking-page input:not([type=checkbox]),.booking-page select,.booking-page textarea{width:100%;max-width:100%;min-width:0;background:#1a1a25;border:1px solid #453343;border-radius:12px;padding:13px 12px;color:#fff;font:16px system-ui;box-sizing:border-box;color-scheme:dark}
        .booking-page textarea{min-height:100px;resize:vertical}
        .booking-page input:focus-visible,.booking-page select:focus-visible,.booking-page textarea:focus-visible,.booking-page a:focus-visible{outline:2px solid #ff79b4;outline-offset:3px}
        .booking-page .booking-note{font-size:13px;line-height:1.8;color:#d1c4ce;margin:10px 0 0}
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
          <label className="booking-consent"><input type="checkbox" required /><span>Saya faham slot tertakluk pada kekosongan, harga mungkin berubah selepas pemeriksaan rambut dan bersetuju menghantar maklumat ini kepada FAFA Salon melalui WhatsApp.</span></label>
          <p className="booking-error" role="alert">{error}</p>
          <a data-booking-send className="booking-send" href={href} target="_blank" rel="noopener noreferrer" onClick={event => { if (!validate(event.currentTarget)) event.preventDefault(); }}><MessageCircle size={18} /> Hantar detail ke WhatsApp ↗</a>
          <p className="booking-note">WhatsApp dibuka dengan detail anda. Tekan Send dalam WhatsApp untuk menghantar. Jika tidak terbuka dalam aplikasi, cuba buka website ini di Safari atau Chrome.</p>
          {prepared && <div><p className="booking-note">Jika WhatsApp tidak terbuka, anda boleh salin mesej di bawah dan hantar ke 0178460827.</p><textarea className="booking-copy" readOnly aria-label="Mesej untuk disalin" value={message} onFocus={event => event.target.select()} /></div>}
        </form>
      </div>
    </motion.section>
  );
}
