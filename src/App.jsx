        .booking-page .booking-choice.selected{border-color:#e33e8a;background:#fce5ef;box-shadow:inset 0 0 0 1px #ff9bcd}
        .booking-page .booking-choice:focus-within{outline:3px solid #ffd1e8;outline-offset:3px}
        .booking-page .booking-choice:hover{border-color:#ffc0df}
        .booking-page input[type=checkbox]{accent-color:#df3987;width:18px;height:18px;flex-shrink:0;margin:0;color-scheme:light;cursor:pointer}
        .booking-page .booking-fields{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;min-width:0}
        .booking-page .booking-field{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;font-size:14px;font-weight:600;line-height:1.5;color:#f6f4f7;min-width:0}
        .booking-page input:not([type=checkbox]),.booking-page select,.booking-page textarea{width:100%;max-width:100%;min-width:0;background:#f7f6f8;border:1px solid #d9d3dc;border-radius:10px;padding:10px 12px;color:#27222b;font:16px system-ui;box-sizing:border-box;color-scheme:light;line-height:24px;-webkit-text-fill-color:#27222b;opacity:1}
        .booking-page input:not([type=checkbox]),.booking-page select{height:46px;min-height:46px;max-height:46px;margin:0}
        .booking-page input[type=date]{display:block;appearance:none;-webkit-appearance:none;inline-size:100%;min-inline-size:0;max-inline-size:100%;text-align:left;padding:13px 12px;overflow:hidden}
        .booking-page input[type=date]::-webkit-date-and-time-value{text-align:left;min-height:24px;margin:0}
        .booking-page input[type=date]::-webkit-datetime-edit{padding:0;display:inline-flex;line-height:24px}
        .booking-page input[type=date]::-webkit-calendar-picker-indicator{margin:0;padding:0;flex-shrink:0}
        .booking-page textarea{min-height:88px;resize:vertical;font-weight:400}
        .booking-page .booking-fields input,.booking-page .booking-fields select{font-weight:400}
        .booking-page input:focus-visible,.booking-page select:focus-visible,.booking-page textarea:focus-visible,.booking-page a:focus-visible{outline:2px solid #ff7ab8;outline-offset:3px}
        .booking-page .booking-note{font-size:13px;line-height:1.8;color:#d0ccd4;margin:10px 0 0}
        .booking-page .booking-notice{background:#353038;border:1px solid #68616d;border-radius:16px;padding:16px;font-size:13px;line-height:1.8;color:#e5dee8}
        .booking-page .booking-consent{display:flex;gap:10px;font-size:13px;line-height:1.7;color:#e5dee8}
        .booking-page .booking-error{color:#ff9ab7;font-size:13px;line-height:1.6;margin:0}
        .booking-page .booking-send{display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(135deg,#b92167,#ff7ab8);padding:17px 12px;border-radius:14px;color:#fff;text-decoration:none;font-weight:800;font-size:14px;text-align:center}
        .booking-page .booking-copy{width:100%;font-size:13px;min-height:200px}
        .booking-page .booking-fallback{background:transparent;color:#ff98c7;border:1px solid #68616d;border-radius:12px;padding:12px;font-size:13px;width:100%;cursor:pointer}
        .booking-page .booking-keratin{border:1px solid #d9d3dc;border-radius:12px;background:#f7f6f8;color:#27222b !important;align-self:start}
        .booking-page .booking-keratin summary{list-style:none;display:flex;align-items:center;gap:8px;padding:10px;min-height:56px;cursor:pointer;font-size:12px;font-weight:600;color:#27222b}
        .booking-page .booking-keratin summary::-webkit-details-marker{display:none}
        .booking-page .booking-keratin summary>span{flex:1}
        .booking-page .booking-keratin summary small{display:block;font-size:10px;font-weight:400;color:#776775;margin-top:3px}
        .booking-page .booking-keratin[open]{grid-column:1/-1;border-color:#cf86a7;background:#fce5ef}
        .booking-page .booking-keratin[open] summary>svg:last-child{transform:rotate(90deg)}
        .booking-page .booking-keratin-options{display:grid;gap:6px;padding:0 8px 8px}
        .booking-page .booking-keratin-options .booking-choice{min-height:44px;background:#fff}
        .booking-page details{color:#ff98c7 !important}
        .booking-page .booking-cut-card .booking-field{color:#27222b}
        .booking-page .booking-cut-card .booking-note{color:#62586a}
      `}</style>
      <style>{bookingTheme}</style>
      <div className="content-block">
        <button className="booking-back" aria-label="Kembali ke halaman utama" onClick={() => go('home')}><ArrowLeft size={17} /></button>
        <span className="kicker">Booking / Semak Slot</span>
        <h2>{adviceOnly ? "Tanya Kami" : guestStep ? "Pelanggan Tambahan" : dateUncertain ? "Cek Harga Dahulu" : "Jom rancang hair day anda"}</h2>
        <p className="lead">{adviceOnly ? "Nyatakan pertanyaan anda di bawah, kemudian tekan Tanya Kami." : dateUncertain ? "Pilih servis dan lengkapkan maklumat rambut. Admin akan berikan harga melalui WhatsApp." : "Pilih servis dan waktu pilihan. Admin akan semak kekosongan serta berikan harga melalui WhatsApp."}</p>
        <form onSubmit={event => { event.preventDefault(); event.currentTarget.querySelector('[data-booking-send]')?.click(); }}>
          {!adviceOnly && <fieldset className="main-customer-step" disabled={guestStep} style={{display:guestStep ? 'none' : 'grid',gap:18}}>
          <fieldset>
            <legend>01 / PELANGGAN UTAMA</legend>
            <div className="booking-fields">
              <label className="booking-field">Nama *<input required maxLength={100} autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} placeholder="Nama anda" /></label>
              <label className="booking-field">No. telefon / WhatsApp *<input required type="tel" minLength={9} maxLength={20} autoComplete="tel" value={form.phone} onChange={event => update('phone', event.target.value)} placeholder="Contoh: 0123456789" /></label>
              <label className="booking-field">Nota tambahan<textarea maxLength={1000} value={form.notes} onChange={event => update('notes', event.target.value)} placeholder="Contoh: Warna pilihan — Ash Brown; pernah colour / bleach; rambut sensitif, kering atau rosak. Nyatakan juga sebarang permintaan khas." /></label>
            </div>
          </fieldset>
          <fieldset>
            <legend>02 / PILIH SERVIS ANDA</legend>
            {servicePicker}
            {canAddCut && <div className={`booking-addons booking-cut-card ${hasCut ? 'active' : ''}`}>
              <label className="booking-cut-toggle"><input type="checkbox" checked={wantCut} onChange={event => { const checked = event.target.checked; setWantCut(checked); if (!checked) update('cutLength', ''); }} /><span><strong>Add-on Hair Cut</strong><small>Tick jika mahu potong rambut. Nyatakan gaya potongan yang diinginkan dalam Nota tambahan.</small></span></label>
              {hasCut && <div className="booking-cut-target">
                <label className="booking-field">Nak potong ke paras mana? *<select required value={form.cutLength} onChange={event => update('cutLength', event.target.value)}><option value="">Pilih paras selepas dipotong</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
                <p className="booking-note" style={{marginTop: 10}}>Pilih paras rambut yang diinginkan selepas dipotong. Hairstylist akan sahkan potongan semasa konsultasi.</p>
              </div>}
            </div>}
            {!adviceOnly && primaryHasHair && !hasCut && <div className="booking-fields" style={{marginTop:20}}>
              <label className="booking-field">Panjang rambut sekarang *<select required value={form.length} onChange={event => update('length', event.target.value)}><option value="">Pilih paras rambut</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
              <p className="booking-note">{hairCheckNote}</p>
            </div>}
          </fieldset>

          <fieldset>
            <legend>03 / CAWANGAN & WAKTU</legend>
            <div className="booking-fields">
              <label className="booking-field">Cawangan *<select value={form.branch} required onChange={event => update('branch', event.target.value)}><option value="">Pilih cawangan</option><option>Setapak, Kuala Lumpur</option><option>Selayang, Batu Caves</option></select></label>
              <label className="booking-field">Tarikh pilihan *<select name="bookingDate" required value={form.date} onChange={event => {setForm(prev => ({...prev,date:event.target.value,time:''}));setPromoAcknowledged(false);setError('');}}><option value="">Pilih tarikh</option><option value="uncertain">Belum pasti</option>{availableDates.map(date => <option key={date} value={date}>{new Date(`${date}T12:00:00Z`).toLocaleDateString('ms-MY',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kuala_Lumpur'})}</option>)}</select></label>
              {!dateUncertain && <label className="booking-field">Masa pilihan *<select value={form.time} required onChange={event => update('time', event.target.value)}><option value="">Pilih masa</option>{times.map(time => <option key={time}>{time}</option>)}</select></label>}
            </div>
            {dateUncertain ? <div className="booking-promo-reminder" role="note" style={{marginTop:12,padding:13,border:'1px solid #ba7294',borderRadius:12,background:'#30212b',color:'#f4e8ef',fontSize:12,lineHeight:1.65}}>
              <p style={{margin:'0 0 10px',color:'inherit'}}>Harga promo yang diberikan adalah berdasarkan promosi semasa dan tertakluk kepada perubahan. Jika tarikh belum pasti, sila hubungi admin semula apabila bersedia untuk membuat tempahan. Admin akan mengesahkan sama ada harga promo tersebut masih sah atau memaklumkan harga terkini.</p>
              <label style={{display:'flex',gap:9,alignItems:'center',cursor:'pointer'}}><input name="promoAcknowledged" type="checkbox" required checked={promoAcknowledged} onChange={event => {setPromoAcknowledged(event.target.checked);setError('');}} /><span>OK, saya faham.</span></label>
            </div> : <p className="booking-note">{earlyCutoff && "Slot terakhir untuk servis pilihan anda ialah 3:30 PM. "}Slot tertakluk pada kekosongan. Admin akan sahkan waktu mengikut servis dan jadual cawangan.</p>}
          </fieldset>
          <fieldset>
            <legend>04 / TAMBAH PELANGGAN</legend>
            <p className="booking-note" style={{margin:'0 0 8px'}}>Ada orang lain yang mahu buat servis bersama?</p>
            <div style={{display:'flex',gap:8}}>{[['no','Tidak'],['yes','Ya']].map(([value,label]) => <label key={value} className={`booking-choice ${morePeople === value ? 'selected' : ''}`} style={{flex:1,minHeight:42}}><input type="radio" name="morePeople" value={value} checked={morePeople === value} onChange={() => {setMorePeople(value);setError('');}} style={{width:16,height:16,minHeight:0,maxHeight:16,padding:0,margin:0,accentColor:'#df3987'}} /><span>{label}</span></label>)}</div>
            {morePeople === 'yes' && <div style={{marginTop:12}}>
              <label className="booking-field">Jumlah orang (termasuk anda) *<select required value={guests.length+1} onChange={event => resizeGuests(event.target.value)}>{Array.from({length:19},(_,index) => index+2).map(total => <option key={total} value={total}>{total} orang</option>)}</select></label>
              <p className="booking-note">Cawangan, tarikh dan masa adalah sama untuk semua pelanggan. Admin akan sahkan kekosongan bagi jumlah yang dipilih.</p>
            </div>}
          </fieldset>
          </fieldset>}
          {!adviceOnly && guestStep && <section className="extra-customer-step" style={{padding:14,border:'1px solid #80576e',borderRadius:16,background:'#161118'}}>
            <h3 style={{fontSize:16,margin:'0 0 8px',color:'#f3c5dd'}}>Pelanggan tambahan</h3>
            <p className="booking-note" style={{margin:'0 0 12px'}}>Pelanggan utama: {form.name}. Jumlah {guests.length+1} orang. Cawangan dan tarikh sama seperti pelanggan utama.</p>
              {guests.map((guest,index) => <section key={index} aria-label={`Pelanggan ${index+2}`} style={{marginTop:12,padding:13,borderRadius:12,border:'1px solid #74556a',background:'#201a23',boxShadow:'0 3px 12px #00000018'}}>
                <h3 style={{fontSize:12,color:'#efbbd4',margin:'0 0 12px'}}>Pelanggan {index+2}</h3>
                <div className="booking-fields">
                  <label className="booking-field">Nama *<input required maxLength={100} value={guest.name} onChange={event => updateGuest(index,'name',event.target.value)} placeholder="Nama pelanggan" /></label>
                  <label className="booking-choice" style={{minHeight:42}}><input type="checkbox" checked={!!guest.cutWash} onChange={event => {const checked=event.target.checked;setGuests(prev => prev.map((g,i) => i===index ? {...g,cutWash:checked,cut:false,wash:false,eyelash:false,hairToo:'no',service:'',length:''} : g));}} /><span>Hair Cut / Hair Wash sahaja (walk-in)</span></label>
                  {guest.cutWash ? <>
                    <div style={{display:'flex',gap:8}}>{[['cut','Hair Cut'],['wash','Hair Wash']].map(([key,label]) => <label key={key} className="booking-choice" style={{flex:1,minHeight:42}}><input type="checkbox" checked={!!guest[key]} onChange={event => updateGuest(index,key,event.target.checked)} /><span>{label}</span></label>)}</div>
                    <p className="booking-note">{guestWalkInNote}</p>
                  </> : <>
                    <label className="booking-choice" style={{minHeight:42}}><input type="checkbox" checked={!!guest.eyelash} onChange={event => {const checked=event.target.checked;setGuests(prev => prev.map((g,i) => i===index ? {...g,eyelash:checked,hairToo:'no',service:'',length:''} : g));}} /><span>Eyelash Perm — booking tanpa deposit</span></label>
                    {guest.eyelash && <>
                      <label className="booking-field">Nak buat servis rambut juga?<select value={guest.hairToo || 'no'} onChange={event => {updateGuest(index,'hairToo',event.target.value);updateGuest(index,'service','');updateGuest(index,'length','');}}><option value="no">Tidak — Eyelash Perm sahaja</option><option value="yes">Ya — tambah servis rambut</option></select></label>
                      <p className="booking-note">Eyelash Perm boleh ditempah tanpa deposit RM30. Tempahan tertakluk kepada pengesahan admin. Slot terakhir Eyelash Perm ialah 4:00 petang.</p>
                    </>}
                  </>}
                  {guestHasHair(guest) && <>
                  <label className="booking-field">Panjang rambut *<select required value={guest.length} onChange={event => updateGuest(index,'length',event.target.value)}><option value="">Pilih paras rambut</option>{lengthChoices.map(item => <option key={item}>{item}</option>)}</select></label>
                  <label className="booking-field">Servis *<select required value={guest.service} onChange={event => updateGuest(index,'service',event.target.value)}><option value="">Pilih servis</option><optgroup label="Combo Services">{comboBookingChoices.map(item => <option key={item}>{item}</option>)}</optgroup><optgroup label="Single Services">{singleBookingChoices.filter(item => item !== 'Eyelash Perm').map(item => <option key={item}>{item}</option>)}</optgroup></select></label>
                  </>}
                </div>
              </section>)}

            <p className="booking-note" style={{marginTop:14}}>Masa tempahan mengikut pelanggan utama: {dateUncertain ? 'Tarikh belum pasti' : form.time}. Hair Cut / Hair Wash sahaja masih walk-in dan tidak menjamin slot pada waktu tersebut.</p>
            {earlyCutoff && !dateUncertain && <p className="booking-note">Slot terakhir bagi servis dalam kumpulan ini ialah 3:30 PM.</p>}
            <button type="button" className="booking-fallback" style={{marginTop:14}} onClick={() => {setGuestStep(false);setError('');window.scrollTo({top:0,behavior:'smooth'});}}>← Edit pelanggan utama</button>
          </section>}
          {adviceOnly && <fieldset><legend>02 / PILIH SERVIS ANDA</legend>{servicePicker}</fieldset>}
          {adviceOnly && <label className="booking-field">Pertanyaan anda *<textarea name="adviceNotes" required maxLength={1000} value={adviceNotes} onChange={event => {setAdviceNotes(event.target.value);setError('');}} placeholder="Tulis pertanyaan anda dengan lengkap di sini." /></label>}
          {!adviceOnly && (morePeople !== 'yes' || guestStep) && <>
          <label className="booking-consent"><input type="checkbox" required /><span>{dateUncertain ? 'Saya bersetuju maklumat ini disimpan untuk semakan harga PIC dan dihantar melalui WhatsApp. Ini bukan tempahan slot; permintaan tanpa tarikh dipadam selepas 7 hari.' : `Saya faham slot tertakluk kepada kekosongan dan bersetuju maklumat ini disimpan untuk semakan PIC serta dihantar melalui WhatsApp. ${depositNote} Borang ini belum mengesahkan tempahan.`}</span></label>
          </>}
          <p className="booking-error" role="alert">{error}</p>
          {!adviceOnly && morePeople === 'yes' && !guestStep ? <button type="button" className="booking-send" onClick={event => {if(validate(event.currentTarget)){setGuestStep(true);setError('');window.scrollTo({top:0,behavior:'smooth'});}}}>Seterusnya — Pelanggan tambahan <ChevronRight size={17} /></button> : <a data-booking-send className="booking-send" href={href} target="_blank" rel="noopener noreferrer" aria-disabled={submitting} onClick={submitIntake}><MessageCircle size={18} /> {submitting ? "Menyimpan permintaan…" : adviceOnly ? "Tanya Kami" : "Hantar detail ke WhatsApp ↗"}</a>}
        </form>
      </div>
    </motion.section>
