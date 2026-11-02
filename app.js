(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var B = 'https://makeyourbrand.pl/';
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };

  /* ---------- oferta z makeyourbrand.pl: opisy, smaki, opakowania i minimalne naklady z podstron ---------- */
  var K = [
    { k: 'energy', n: 'Napoje energetyczne', u: 'napoje-energetyczne/', img: 'energy_900', d: 'Napoje dodające energii i poprawiające koncentrację. Idealne dla aktywnych osób, które potrzebują szybkiego zastrzyku siły.', min: 256, pl: 'puszka 250 ml, od 256 szt.', s: ['Klasyczny', 'Klasyczny bez cukru', 'Mojito'], o: ['Puszka 250 ml z etykietą termokurczliwą', 'Puszka z bezpośrednim nadrukiem, produkcja kontraktowa'], pal: 'paleta Euro: 2 880 szt.' },
    { k: 'kawa', n: 'Kawa', u: 'kawa/', img: 'coffee_900', d: 'Orzeźwiająca kawa; czarna, z mlekiem lub dodatkami smakowymi, idealna na ciepłe dni. Dodaje energii i pobudza zmysły aromatem.', min: 256, pl: 'puszka 250 ml, od 256 szt.', s: ['Double espresso', 'Latte', 'Cappuccino'], o: ['Puszka 250 ml z etykietą termokurczliwą', 'Puszka z bezpośrednim nadrukiem, produkcja kontraktowa'] },
    { k: 'nfc', n: 'Soki NFC', u: 'soki-nfc/', img: 'Sok_900', d: 'Soki tłoczone na zimno, zachowujące maksimum smaku i wartości odżywczych. Bezpośrednio z owoców, bez konserwantów.', min: 120, pl: 'butelka 250 lub 300 ml, od 120 szt.', s: ['Jabłkowy', 'Pomarańczowy', 'Marchwiowy', 'Z dodatkami (imbir, mięta, cytryna)', 'Autorska mieszanka'], o: ['Szklana butelka 250 ml', 'Szklana butelka 300 ml', 'Szklana butelka 500 ml', 'Szklana butelka 750 ml'], pal: 'paleta Euro: 1 824 szt.' },
    { k: 'lemo', n: 'Lemoniady', u: 'lemoniady-gazowane-i-niegazowane/', img: 'lemoniada_900', d: 'Orzeźwiające lemoniady z naturalnych składników. Świetne na upalne dni i jako zdrowa alternatywa dla słodzonych napojów.', min: 1368, pl: 'butelka 330 ml, od 1 368 szt.', s: ['Pomarańcza', 'Mango', 'Owoce tropikalne', 'Limonka & Jabłko'], o: ['Szklana butelka 330 ml z etykietą termokurczliwą'], pal: 'paleta Euro: 1 368 szt.' },
    { k: 'prop', n: 'Napoje z propolisem', u: 'napoje-z-propolisem/', img: 'propolis_900', d: 'Naturalne napoje z propolisem, wspierające odporność i zdrowie. Łączą tradycję z nowoczesnym smakiem.', min: 1368, pl: 'butelka 330 ml, od 1 368 szt.', s: ['Cola', 'Moringa', 'Szafran'], o: ['Szklana butelka 330 ml'], pal: 'paleta Euro: 1 368 szt.' },
    { k: 'yerba', n: 'Yerba Mate', u: 'yerba-mate/', img: 'yerba-mate_900', d: 'Energetyzujące napoje z yerba mate, są naturalnym źródłem kofeiny. Świetne dla osób szukających zdrowego pobudzenia.', min: 120, pl: 'butelka 330 ml, od 120 szt.', s: ['Clasica', 'Mentha & Boldo', 'Katuava', 'Sabor Citrus'], o: ['Szklana butelka 330 ml'] },
    { k: 'spritz', n: 'Spritze', u: 'spritze/', img: 'spritz', d: 'Orzeźwiające napoje inspirowane klasycznymi drinkami, bez alkoholu. Doskonałe na letnie spotkania i relaks.', min: 240, pl: 'puszka 330 ml, od 240 szt.', s: ['Jabłko', 'Cytryna', 'Aronia'], o: ['Puszka aluminiowa 330 ml'] },
    { k: 'komb', n: 'Kombucha', u: 'kombucha/', img: 'Kombucha_900', d: 'Naturalny napój fermentowany na bazie herbaty, bogaty w probiotyki. Wspiera zdrowie jelit i wzmacnia odporność.', min: 240, pl: 'butelka 250 ml, od 240 szt.', s: ['Passion Fruit', 'Hibiskus', 'Jaśmin', 'Lawenda'], o: ['Szklana butelka 250 ml z personalizowaną etykietą'] },
    { k: 'shot', n: 'Shoty imbirowe', u: 'shoty-imbirowe/', img: 'ginger', d: 'Skoncentrowane shoty z imbirem, które wzmacniają odporność i dodają energii. Idealne dla osób dbających o zdrowie.', min: 108, pl: 'butelka 50 ml, od 108 szt.', s: ['Imbir', 'Kurkuma', 'Seler naciowy', 'CBD'], o: ['Butelka 50 ml, kartonik zbiorczy 27 szt.', 'Kartonik 9 szt. z indywidualnym nadrukiem'] },
    { k: 'iso', n: 'Napoje izotoniczne', u: 'napoje-izotoniczne/', img: 'isotonic', d: 'Skutecznie nawadniają i uzupełniają elektrolity, wspierając wydolność organizmu podczas intensywnego wysiłku fizycznego.', min: 252, pl: 'PET 500 lub 750 ml, od 252 szt.', s: ['Wieloowocowy', 'Cytryna', 'Pomarańcza'], o: ['PET 500 ml sport cup', 'PET 750 ml sport cup'], pal: 'paleta Euro: 1 080 szt. (500 ml)' },
    { k: 'woda', n: 'Wody mineralne', u: 'wody-mineralne/', img: 'mineral', d: 'Naturalne wody bogate w minerały lub delikatne źródlane, idealne do codziennego nawadniania organizmu.', min: 240, pl: 'PET 375-1000 ml, od 240 szt.', s: [], o: ['PET 375 ml', 'PET 500 ml', 'PET 750 ml Sport Cup', 'PET 1000 ml'] },
    { k: 'func', n: 'Napoje funkcjonalne', u: 'napoje-funkcjonalne/', img: 'Functional-drinks_900', d: 'Innowacyjne napoje o specjalnym składzie wspierające zdrowie, regenerację lub odporność. Doskonałe jako codzienne wsparcie organizmu.', min: 150000, pl: 'Puszka 250 ml z nadrukiem, od 150 000 szt.', s: ['Witaminowy z magnezem', 'Regeneracja z kolagenem', 'Z BCAA', 'Własna kompozycja'], o: ['Puszka aluminiowa 250 ml z bezpośrednim nadrukiem'] },
    { k: 'inny', n: 'Inny napój lub własny pomysł', img: '', s: [], o: [] }
  ];
  var KM = {}; K.forEach(function (c) { KM[c.k] = c; });

  var S = { cats: {}, smak: {}, opak: {}, qty: {}, files: [], inny: '', step: 1 };

  /* ---------- karty oferty ---------- */
  $('#kgrid').innerHTML = K.filter(function (c) { return c.u; }).map(function (c) {
    return '<article class="k"><a class="ki" href="' + B + c.u + '"><img src="img/k/' + c.img + '.jpg" alt="' + esc(c.n) + ' z etykietą Make Your Brand" width="665" height="374" loading="lazy"></a>' +
      '<h3>' + esc(c.n) + '</h3><p>' + esc(c.d) + '</p>' +
      '<p class="pl">' + (c.k === 'func' ? '' : 'Marka własna: ') + esc(c.pl) + '</p>' +
      '<div class="kb"><a class="more" href="' + B + c.u + '">Szczegóły</a><button class="add" type="button" data-k="' + c.k + '">Zapytaj o ten napój</button></div></article>';
  }).join('');
  $('#kgrid').addEventListener('click', function (e) {
    var b = e.target.closest('.add'); if (!b) return;
    var k = b.getAttribute('data-k');
    if (S.step !== 1 && !$('#done').classList.contains('on')) go(1);
    if ($('#done').classList.contains('on')) $('#again').click();
    S.cats[k] = true; syncCats(); renderSeries();
    $('#zapytanie').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  function syncCats() {
    $$('#cats input').forEach(function (i) { i.checked = !!S.cats[i.value]; });
    $$('.k .add').forEach(function (b) {
      var on = !!S.cats[b.getAttribute('data-k')];
      b.classList.toggle('on', on); b.textContent = on ? '✓ W zapytaniu' : 'Zapytaj o ten napój';
    });
  }

  /* ---------- krok 1 ---------- */
  $('#cats').innerHTML = K.map(function (c) {
    return '<label class="copt"><input type="checkbox" value="' + c.k + '">' + (c.img ? '<img src="img/k/' + c.img + '.jpg" alt="" width="52" height="40">' : '<span class="noimg">+</span>') + '<span>' + esc(c.n) + '</span></label>';
  }).join('');
  $('#cats').addEventListener('change', function (e) {
    var k = e.target.value; if (e.target.checked) S.cats[k] = true; else delete S.cats[k];
    $('#msg').textContent = ''; syncCats(); renderSeries();
  });
  function renderSeries() {
    $('#series').innerHTML = K.filter(function (c) { return S.cats[c.k]; }).map(function (c) {
      if (c.k === 'inny') return '<div class="sgrp"><h4>Inny napój lub własny pomysł</h4><label class="fld"><span>Opisz napój (rodzaj, smak, opakowanie)</span><textarea id="innyOpis" placeholder="np. lemoniada z miodem w puszce 330 ml">' + esc(S.inny) + '</textarea></label></div>';
      var sm = c.s.length ? '<div class="lbl">Smak <span>(można kilka, opcjonalnie)</span></div><div class="chips">' + c.s.map(function (x) {
        var id = c.k + '|' + x; return '<label class="chip"><input type="checkbox" value="' + esc(id) + '"' + (S.smak[id] ? ' checked' : '') + '><span>' + esc(x) + '</span></label>';
      }).join('') + '</div>' : '';
      var op = '<div class="lbl">Opakowanie</div><div class="chips">' + c.o.map(function (x, i) {
        var cur = S.opak[c.k] || c.o[0];
        return '<label class="chip"><input type="radio" name="op_' + c.k + '" value="' + esc(x) + '"' + (cur === x ? ' checked' : '') + ' data-op="' + c.k + '"><span>' + esc(x) + '</span></label>';
      }).join('') + '</div>';
      return '<div class="sgrp"><h4>' + esc(c.n) + '</h4>' + sm + op + '</div>';
    }).join('');
  }
  $('#series').addEventListener('change', function (e) {
    var t = e.target;
    if (t.dataset.op) { S.opak[t.dataset.op] = t.value; return; }
    if (t.type === 'checkbox') { if (t.checked) S.smak[t.value] = true; else delete S.smak[t.value]; }
  });
  $('#series').addEventListener('input', function (e) { if (e.target.id === 'innyOpis') S.inny = e.target.value; });

  function typ() { return ($('input[name=typ]:checked') || {}).value || ''; }
  function smaki(c) { return c.s.filter(function (x) { return S.smak[c.k + '|' + x]; }); }
  function opak(c) { return S.opak[c.k] || c.o[0] || ''; }
  function positions() {
    return K.filter(function (c) { return S.cats[c.k]; }).map(function (c) {
      var sm = smaki(c);
      return { c: c, nm: c.n, sub: c.k === 'inny' ? S.inny : [sm.length ? sm.join(', ') : (c.s.length ? 'smak do ustalenia' : ''), opak(c)].filter(Boolean).join(' / ') };
    });
  }

  /* ---------- krok 2 ---------- */
  function renderRows() {
    $('#rows').innerHTML = positions().map(function (r) {
      var c = r.c, hint = c.min ? (c.k === 'func' ? 'produkcja kontraktowa od ' + fmt(c.min) + ' szt.' : 'minimalny nakład marki własnej: ' + fmt(c.min) + ' szt.') + (c.pal ? ', ' + c.pal : '') : '';
      return '<div class="row" data-k="' + c.k + '"><div class="nm">' + esc(r.nm) + '<small>' + esc(r.sub) + '</small>' + (hint ? '<small>' + esc(hint) + '</small>' : '') + '</div>' +
        '<div class="qty"><button type="button" data-d="-1" aria-label="Mniej">-</button><input type="number" min="0" inputmode="numeric" placeholder="szt." value="' + (S.qty[c.k] || '') + '" data-q="' + c.k + '" aria-label="Nakład: ' + esc(r.nm) + '"><button type="button" data-d="1" aria-label="Więcej">+</button></div>' +
        '<div class="warn" hidden></div></div>';
    }).join('');
    $$('#rows .row').forEach(warn);
  }
  function step(c) { return c.min >= 1000 ? 12 * Math.max(1, Math.round(c.min / 1368)) : 12; }
  function warn(row) {
    var c = KM[row.getAttribute('data-k')], q = S.qty[c.k] || 0, w = $('.warn', row);
    var show = c.min && q > 0 && q < c.min && typ() !== 'Produkcja kontraktowa';
    w.hidden = !show;
    if (show) w.textContent = 'Poniżej minimalnego nakładu z oferty (' + fmt(c.min) + ' szt.). Możesz wysłać zapytanie, ilość omówimy indywidualnie.';
  }
  $('#rows').addEventListener('click', function (e) {
    var b = e.target.closest('[data-d]'); if (!b) return;
    e.preventDefault();
    var row = b.closest('.row'), c = KM[row.getAttribute('data-k')], i = $('input', row);
    var cur = parseInt(i.value, 10) || 0, d = +b.getAttribute('data-d'), v;
    if (d > 0) v = cur < (c.min || 0) ? (c.min || 12) : cur + step(c); else v = Math.max(0, cur - step(c));
    i.value = v || ''; S.qty[c.k] = v; warn(row); $('#msg').textContent = '';
  });
  $('#rows').addEventListener('input', function (e) { var i = e.target; if (i.dataset.q) { S.qty[i.dataset.q] = Math.max(0, parseInt(i.value, 10) || 0); warn(i.closest('.row')); } });

  $('#termin').addEventListener('change', function () { $('#dataBox').hidden = this.value !== 'data'; });
  (function () { var d = new Date(); d.setDate(d.getDate() + 7); $('#data').min = d.toISOString().slice(0, 10); })();
  function pl() { return $('#kraj').value === 'Polska'; }
  $('#kod').addEventListener('input', function () { if (!pl()) return; var v = this.value.replace(/\D/g, '').slice(0, 5); this.value = v.length > 2 ? v.slice(0, 2) + '-' + v.slice(2) : v; });
  $('#kraj').addEventListener('change', function () {
    $('#kod').placeholder = pl() ? '00-000' : 'kod pocztowy';
    $('#nipL').textContent = pl() ? 'NIP' : 'NIP / numer VAT';
    $('#nip').placeholder = pl() ? '10 cyfr' : 'np. CZ12345678';
    $('#nip').inputMode = pl() ? 'numeric' : 'text';
  });

  ['input', 'change'].forEach(function (t) {
    $('#wiz').addEventListener(t, function (e) {
      var f = e.target.closest && e.target.closest('.fld'); if (f && e.target.id !== 'nip') f.classList.remove('bad');
      if ($('#msg').textContent) $('#msg').textContent = '';
    });
  });

  /* ---------- krok 3: pliki ---------- */
  var fileIn = $('#file'), drop = $('#drop');
  function size(b) { return b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' kB'; }
  function addFiles(list) {
    Array.prototype.forEach.call(list, function (f) {
      if (!S.files.some(function (x) { return x.name === f.name && x.size === f.size; })) S.files.push({ name: f.name, size: f.size });
    });
    renderFiles();
  }
  function renderFiles() {
    $('#files').innerHTML = S.files.map(function (f, i) {
      var ext = (f.name.split('.').pop() || '').slice(0, 4);
      return '<li><span class="ext">' + esc(ext) + '</span><span class="fn">' + esc(f.name) + '</span><span class="fs">' + size(f.size) + '</span><button class="rm" type="button" data-f="' + i + '">Usuń</button></li>';
    }).join('');
  }
  fileIn.addEventListener('change', function () { addFiles(fileIn.files); fileIn.value = ''; });
  $('#files').addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (!b) return; e.preventDefault(); S.files.splice(+b.getAttribute('data-f'), 1); renderFiles(); });
  ['dragenter', 'dragover'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files); });
  function proj() { return ($('input[name=proj]:checked') || {}).value || ''; }

  /* ---------- krok 4 ---------- */
  function nipOk(v) {
    if (!pl()) return v.replace(/[\s-]/g, '').length >= 6;
    var d = v.replace(/\D/g, ''); if (d.length !== 10) return false;
    var w = [6, 5, 7, 2, 3, 4, 5, 6, 7], s = 0; for (var i = 0; i < 9; i++) s += w[i] * +d[i];
    return s % 11 === +d[9];
  }
  var NIPERR = function () { return pl() ? 'Nieprawidłowy NIP (10 cyfr z cyfrą kontrolną).' : 'Podaj numer VAT firmy.'; };
  $('#nip').addEventListener('input', function () { if (pl()) this.value = this.value.replace(/[^\d-\s]/g, ''); $('#nipErr').textContent = ''; this.parentNode.classList.remove('bad'); });
  $('#nip').addEventListener('blur', function () { if (this.value.trim() && !nipOk(this.value)) { $('#nipErr').textContent = NIPERR(); this.parentNode.classList.add('bad'); } });

  var TITLES = ['', 'Czego dotyczy zapytanie?', 'Nakład, termin i dostawa', 'Etykieta, logo, pliki', 'Dane firmy i wysyłka'];
  function val(id) { return ($('#' + id).value || '').trim(); }
  function termin() { var t = $('#termin').value; if (t === 'data') { var d = val('data'); return d ? d.split('-').reverse().join('.') : ''; } return t; }
  function rodz() { return ($('input[name=rodz]:checked') || {}).value || ''; }
  function sumQty() { return positions().reduce(function (a, r) { return a + (S.qty[r.c.k] || 0); }, 0); }
  function dostawa() { return val('dost') + ', ' + val('kod') + ' ' + val('miasto') + (pl() ? '' : ', ' + val('kraj')); }

  function renderSum() {
    var pos = positions();
    $('#sum').innerHTML = '<h4>Podsumowanie</h4><dl>' +
      '<dt>Współpraca<button class="ed" type="button" data-goto="1">zmień</button></dt><dd>' + esc(typ()) + '</dd>' +
      '<dt>Napoje</dt><dd>' + pos.map(function (r) { return '<b>' + esc(r.nm) + '</b>: ' + esc(r.sub) + ', <b>' + fmt(S.qty[r.c.k] || 0) + ' szt.</b>'; }).join('<br>') + '</dd>' +
      '<dt>Przeznaczenie<button class="ed" type="button" data-goto="2">zmień</button></dt><dd>' + esc(val('cel')) + '</dd>' +
      '<dt>Zamówienie</dt><dd>' + esc(rodz()) + ', termin: ' + esc(termin()) + '</dd>' +
      '<dt>Dostawa</dt><dd>' + esc(dostawa()) + '</dd>' +
      '<dt>Etykieta<button class="ed" type="button" data-goto="3">zmień</button></dt><dd>' + esc(proj()) + '</dd>' +
      '<dt>Załączniki</dt><dd>' + (S.files.length ? S.files.map(function (f) { return esc(f.name); }).join(', ') : 'brak') + '</dd>' +
      (val('uwagi') ? '<dt>Uwagi</dt><dd>' + esc(val('uwagi')) + '</dd>' : '') +
      '</dl>';
  }
  $('#sum').addEventListener('click', function (e) { var b = e.target.closest('[data-goto]'); if (b) go(+b.getAttribute('data-goto')); });

  function check(n) {
    var m = '';
    $$('.fld.bad').forEach(function (f) { f.classList.remove('bad'); });
    function bad(id) { $('#' + id).closest('.fld').classList.add('bad'); }
    if (n === 1) {
      if (!Object.keys(S.cats).length) m = 'Wybierz co najmniej jeden napój.';
      else if (S.cats.inny && !S.inny.trim()) m = 'Opisz napój, o który pytasz.';
    } else if (n === 2) {
      if (positions().some(function (r) { return !(S.qty[r.c.k] > 0); })) m = 'Podaj nakład przy każdym napoju.';
      else if (!val('cel')) { m = 'Wybierz przeznaczenie napojów.'; bad('cel'); }
      else if (!termin()) { m = 'Wybierz termin dostawy.'; bad($('#termin').value === 'data' ? 'data' : 'termin'); }
      else if (!val('dost')) { m = 'Wybierz sposób dostawy.'; bad('dost'); }
      else if (pl() ? !/^\d{2}-\d{3}$/.test(val('kod')) : val('kod').length < 3) { m = pl() ? 'Podaj kod pocztowy w formacie 00-000.' : 'Podaj kod pocztowy.'; bad('kod'); }
      else if (!val('miasto')) { m = 'Podaj miejscowość dostawy.'; bad('miasto'); }
    } else if (n === 4) {
      if (!nipOk(val('nip'))) { m = pl() ? 'Sprawdź NIP.' : 'Podaj numer VAT firmy.'; bad('nip'); $('#nipErr').textContent = NIPERR(); }
      else if (!val('firma')) { m = 'Podaj nazwę firmy.'; bad('firma'); }
      else if (val('osoba').length < 3) { m = 'Podaj imię i nazwisko.'; bad('osoba'); }
      else if (val('tel').replace(/\D/g, '').length < 9) { m = 'Podaj numer telefonu.'; bad('tel'); }
      else if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val('email'))) { m = 'Podaj poprawny adres e-mail.'; bad('email'); }
      else if (!$('#zgoda').checked) m = 'Zaznacz zgodę na przetwarzanie danych.';
    }
    $('#msg').textContent = m;
    return !m;
  }

  function go(n) {
    S.step = n;
    $$('.step').forEach(function (s) { s.classList.toggle('on', +s.getAttribute('data-step') === n); });
    $('#stTitle').textContent = TITLES[n]; $('#stNo').textContent = 'Krok ' + n + ' z 4';
    $('#prog').style.width = (n * 25) + '%';
    $('#back').hidden = n === 1; $('#next').hidden = n === 4; $('#send').hidden = n !== 4;
    $('#msg').textContent = '';
    if (n === 2) renderRows();
    if (n === 4) renderSum();
    var f = $('#form'), r = f.getBoundingClientRect();
    if (r.top < 0 || r.top > innerHeight * 0.6) f.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  $('#next').addEventListener('click', function () { if (check(S.step)) go(S.step + 1); });
  $('#back').addEventListener('click', function () { go(S.step - 1); });

  /* ---------- wysylka (pokazowa) ---------- */
  var NR = 'ZO/2026/11/0001';
  var LIST = [
    { nr: 'ZO/2026/10/0038', d: '30.10.2026', f: 'Kawiarnia (przykład)', t: 'Marka własna', c: 'Lemoniady: Mango, Limonka & Jabłko', q: '1 368 szt.', te: 'Do miesiąca', e: 'Mam logo', st: ['o', 'Oferta wysłana'] },
    { nr: 'ZO/2026/10/0037', d: '29.10.2026', f: 'Agencja eventowa (przykład)', t: 'Marka własna', c: 'Napoje energetyczne: Klasyczny bez cukru', q: '512 szt.', te: '05.12.2026', e: 'Gotowy projekt', st: ['w', 'W przygotowaniu'] },
    { nr: 'ZO/2026/10/0036', d: '27.10.2026', f: 'Sklep ze zdrową żywnością (przykład)', t: 'Marka własna', c: 'Kombucha, Shoty imbirowe', q: '348 szt.', te: 'Stałe dostawy', e: 'Projekt od podstaw', st: ['o', 'Oferta wysłana'] },
    { nr: 'ZO/2026/10/0035', d: '24.10.2026', f: 'Sieć klubów fitness (przykład)', t: 'Produkcja kontraktowa', c: 'Napoje izotoniczne, Wody mineralne', q: '12 000 szt.', te: 'Do 3 miesięcy', e: 'Mam logo', st: ['o', 'Oferta wysłana'] }
  ];
  var mine = null;
  var short = { 'Mam gotowy projekt etykiety': 'Gotowy projekt', 'Mam logo, proszę o projekt etykiety': 'Mam logo', 'Potrzebuję projektu od podstaw': 'Projekt od podstaw' };

  $('#send').addEventListener('click', function () {
    if (!check(4)) return;
    var pos = positions(), email = val('email');
    var td = new Date(), dd = ('0' + td.getDate()).slice(-2) + '.' + ('0' + (td.getMonth() + 1)).slice(-2) + '.' + td.getFullYear();
    mine = { nr: NR, d: dd, f: val('firma'), t: typ().replace(' (private label)', ''), c: pos.map(function (r) { return r.nm; }).join(', '), q: fmt(sumQty()) + ' szt.', te: rodz() === 'Stałe dostawy' ? 'Stałe dostawy, ' + termin() : termin(), e: short[proj()] || proj(), st: ['n', 'Nowe'], me: true };
    $('#dNr').textContent = NR; $('#dNr2').textContent = NR; $('#dMail').textContent = email; $('#dTo').textContent = email;
    $('#dBody').innerHTML = '<p>Dzień dobry ' + esc(val('osoba').split(' ')[0]) + ',</p>' +
      '<p>dziękujemy za zapytanie ofertowe. Otrzymało numer <b>' + NR + '</b>, prosimy powoływać się na nie w korespondencji.</p>' +
      '<p>Rodzaj współpracy: ' + esc(typ()) + '</p><p>Zapytanie obejmuje:</p><ul>' + pos.map(function (r) { return '<li><b>' + esc(r.nm) + '</b>: ' + esc(r.sub) + ', ' + fmt(S.qty[r.c.k] || 0) + ' szt.</li>'; }).join('') + '</ul>' +
      '<p>Przeznaczenie: ' + esc(val('cel')) + '<br>Zamówienie: ' + esc(rodz()) + '<br>Termin: ' + esc(termin()) + '<br>Dostawa: ' + esc(dostawa()) + '<br>Etykieta: ' + esc(proj()) + '<br>Załączniki: ' + (S.files.length ? S.files.length + ' (' + S.files.map(function (f) { return esc(f.name); }).join(', ') + ')' : 'brak') + '</p>' +
      '<p>Skontaktujemy się z Tobą, aby omówić Twoje potrzeby. W razie pytań zadzwonimy pod numer ' + esc(val('tel')) + '.</p>' +
      '<p>Pozdrawiamy<br>Make Your Brand<br>ul. Klimontowska 47G/9, 41-200 Sosnowiec<br>tel. +48 730 144 033</p>';
    $('#wiz').style.display = 'none'; $('#done').classList.add('on');
    var f = $('#form'); if (f.getBoundingClientRect().top < 0) f.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
  $('#again').addEventListener('click', function () {
    S.cats = {}; S.smak = {}; S.opak = {}; S.qty = {}; S.files = []; S.inny = '';
    syncCats(); renderSeries(); renderFiles();
    ['cel', 'termin', 'data', 'dost', 'kod', 'miasto', 'uwagi', 'nip', 'firma', 'osoba', 'tel', 'email'].forEach(function (id) { $('#' + id).value = ''; });
    $('#kraj').value = 'Polska'; $('#kraj').dispatchEvent(new Event('change'));
    ['typ', 'rodz', 'proj'].forEach(function (n) { $('input[name=' + n + ']').checked = true; });
    $('#zgoda').checked = false; $('#dataBox').hidden = true;
    $('#done').classList.remove('on'); $('#wiz').style.display = ''; go(1);
  });

  /* ---------- lista zapytan ---------- */
  function renderList() {
    var rows = (mine ? [mine] : []).concat(LIST);
    $('#ztBody').innerHTML = rows.map(function (r) {
      return '<tr' + (r.me ? ' class="new"' : '') + '><td class="nr">' + r.nr + (r.me ? '<span class="tag">Twoje zapytanie</span>' : '<span class="tag">przykład</span>') + '</td><td data-l="Data">' + r.d + '</td><td data-l="Firma">' + esc(r.f) + '</td><td data-l="Współpraca">' + esc(r.t) + '</td><td data-l="Napoje">' + esc(r.c) + '</td><td data-l="Nakład" style="white-space:nowrap">' + r.q + '</td><td data-l="Termin">' + esc(r.te) + '</td><td data-l="Etykieta">' + esc(r.e) + '</td><td data-l="Status"><span class="s ' + r.st[0] + '">' + r.st[1] + '</span></td></tr>';
    }).join('');
  }
  var dlg = $('#dlg'), lastFocus = null;
  function openList() { renderList(); lastFocus = document.activeElement; dlg.classList.add('open'); dlg.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; $('#closeList').focus(); }
  function closeList() { dlg.classList.remove('open'); dlg.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  $('#openList').addEventListener('click', openList);
  $('#toList').addEventListener('click', openList);
  $('#closeList').addEventListener('click', closeList);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeList(); });

  /* ---------- menu, naglowek, pasek ---------- */
  var panel = $('#panel');
  function closePanel() { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  $('#burger').addEventListener('click', function () { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; });
  $$('[data-close]', panel).forEach(function (el) { el.addEventListener('click', closePanel); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (dlg.classList.contains('open')) closeList(); if (panel.classList.contains('open')) closePanel(); } });

  var hdr = $('#hdr');
  function sc() { hdr.classList.toggle('sc', scrollY > 30); }
  addEventListener('scroll', sc, { passive: true }); sc();

  var mob = $('#mob'), past = false, inForm = false;
  function upd() { mob.classList.toggle('widac', past && !inForm); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; upd(); }).observe($('#heroCta'));
    new IntersectionObserver(function (en) { inForm = en[0].isIntersecting; upd(); }, { rootMargin: '0px 0px -30% 0px' }).observe($('#zapytanie'));
  }
})();
