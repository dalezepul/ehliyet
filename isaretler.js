// Trafik işaretleri ve gösterge ışıkları — viewBox 0 0 100 100, tamamı çizim (internetsiz).
// Her kayıt: id -> [ad, svg içeriği]. Ad, soru yazarları içindir; sayfada cevabı ele vermesin diye gösterilmez.
const ISARET = (() => {
  const K = "#d62828", S = "#111", MAVI = "#1d5fd6";
  const cz = (d, w = 6, renk = S) => `<path d="${d}" fill="none" stroke="${renk}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const ayna = ic => `<g transform="translate(100 0) scale(-1 1)">${ic}</g>`;
  const kisi = (x, y, s = 1, renk = S) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="5" fill="${renk}"/>${cz("M0 7 L-2 22 M-2 22 L-8 34 M-2 22 L5 34 M-1 11 L-9 18 M-1 11 L8 16", 5, renk)}</g>`;
  const araba = (x, y, renk = S) => `<g transform="translate(${x} ${y})"><path d="M-14 0 L-10 -10 H10 L14 0 V9 H-14 Z" fill="${renk}"/><circle cx="-8" cy="10" r="3.5" fill="${renk}"/><circle cx="8" cy="10" r="3.5" fill="${renk}"/></g>`;
  const ok = (d, renk = S, w = 7) => cz(d, w, renk);

  // levha çerçeveleri
  const T = ic => `<path d="M50 9 L93 85 H7 Z" fill="#fff" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><g transform="translate(50 60) scale(.62) translate(-50 -55)">${ic}</g>`;
  const Y = (ic = "", capraz = "") => `<circle cx="50" cy="50" r="43" fill="#fff" stroke="${K}" stroke-width="10"/>${ic}${capraz === "/" ? `<path d="M22 78 L78 22" stroke="${K}" stroke-width="9"/>` : ""}`;
  const M = ic => `<circle cx="50" cy="50" r="46" fill="${MAVI}"/>${ic}`;
  const B = ic => `<rect x="5" y="5" width="90" height="90" rx="10" fill="${MAVI}"/>${ic}`;
  const G = (ic) => `<rect x="4" y="4" width="92" height="92" rx="18" fill="#1b1b22"/>${ic}`;
  const ISIK = yanan => {
    const r = ["#ff3b30", "#ffcc00", "#22c55e"];
    return `<rect x="30" y="4" width="40" height="92" rx="10" fill="#222"/>` + r.map((c, i) =>
      `<circle cx="50" cy="${20 + i * 30}" r="11" fill="${yanan.includes(i) ? c : "#3d3d3d"}"${yanan.includes(i) && yanan.includes("b") ? ' class="isk-blink"' : ""}/>`).join("");
  };
  const YOL = cizgi => `<rect x="8" y="0" width="84" height="100" fill="#55585f"/><path d="M12 0 V100 M88 0 V100" stroke="#fff" stroke-width="3"/>${cizgi}`;

  const viraj = ok("M58 80 V60 Q58 44 42 44 H36") + ok("M42 35 L32 44 L42 53");
  const tren = `<rect x="22" y="46" width="44" height="22" rx="3" fill="${S}"/><rect x="58" y="34" width="16" height="34" fill="${S}"/><rect x="28" y="36" width="7" height="12" fill="${S}"/><circle cx="32" cy="72" r="6" fill="${S}"/><circle cx="50" cy="72" r="6" fill="${S}"/><circle cx="68" cy="72" r="6" fill="${S}"/>`;
  const bisiklet = (renk = S) => `<circle cx="32" cy="66" r="12" fill="none" stroke="${renk}" stroke-width="5"/><circle cx="70" cy="66" r="12" fill="none" stroke="${renk}" stroke-width="5"/>${cz("M32 66 L44 46 L62 46 L70 66 M44 46 L52 66 L62 46 M40 40 H50 M62 46 L60 38 H67", 5, renk)}`;

  return {
    // ---- tehlike uyarı (kırmızı kenarlı üçgen)
    "t-sola-viraj": ["Sola tehlikeli viraj", T(viraj)],
    "t-saga-viraj": ["Sağa tehlikeli viraj", T(ayna(viraj))],
    "t-devamli-viraj": ["Sola tehlikeli devamlı viraj", T(ok("M60 84 C40 74 40 66 52 58 C64 50 64 42 46 34") + ok("M42 44 L44 32 L56 32"))],
    "t-kaygan-yol": ["Kaygan yol", T(araba(50, 40) + cz("M36 58 q6 8 0 16 M50 58 q6 8 0 16 M64 58 q6 8 0 16", 4))],
    "t-yaya-gecidi": ["Yaya geçidi", T(kisi(50, 30, 1.15) + `<path d="M28 80 H40 M46 80 H58 M64 80 H76" stroke="${S}" stroke-width="6"/>`)],
    "t-okul-gecidi": ["Okul geçidi", T(kisi(40, 32, 1.1) + kisi(62, 42, .85))],
    "t-evcil-hayvan": ["Ehli hayvanlar geçebilir", T(`<path d="M26 48 H64 V66 H26 Z M64 46 L76 40 L80 50 L66 56 Z" fill="${S}"/>` + cz("M30 66 V80 M38 66 V80 M54 66 V80 M62 66 V80", 5) + cz("M26 50 L20 64", 3))],
    "t-yol-calismasi": ["Yolda çalışma", T(kisi(46, 32, 1.1) + cz("M54 48 L70 70", 4) + `<path d="M58 80 Q72 64 86 80 Z" fill="${S}"/>`)],
    "t-iki-yonlu": ["İki yönlü trafik", T(ok("M40 80 V36") + ok("M32 46 L40 34 L48 46") + ok("M60 34 V78") + ok("M52 68 L60 80 L68 68"))],
    "t-daralan-yol": ["İki taraftan daralan kaplama", T(cz("M34 84 V68 L42 54 V32 M66 84 V68 L58 54 V32", 6))],
    "t-demiryolu-kontrolsuz": ["Kontrolsüz demiryolu geçidi", T(tren)],
    "t-demiryolu-kontrollu": ["Kontrollü demiryolu geçidi", T(cz("M24 46 H76 M24 62 H76 M30 38 V80 M50 38 V80 M70 38 V80", 6))],
    "t-isikli": ["Trafik ışıklı işaret cihazı", T(`<rect x="38" y="28" width="24" height="54" rx="6" fill="${S}"/><circle cx="50" cy="38" r="6" fill="#ff3b30"/><circle cx="50" cy="55" r="6" fill="#ffcc00"/><circle cx="50" cy="72" r="6" fill="#22c55e"/>`)],
    "t-donel-kavsak": ["Dönel kavşak", T(cz("M36 50 A16 16 0 0 1 60 38 M66 56 A16 16 0 0 1 46 70 M38 64 A16 16 0 0 1 36 52", 5) + `<path d="M58 30 L68 38 L56 44 Z M70 52 L64 64 L58 54 Z M30 66 L40 70 L30 58 Z" fill="${S}"/>`)],
    "t-egim-inis": ["Tehlikeli eğim (iniş)", T(`<path d="M24 82 H80 L24 46 Z" fill="${S}"/><text x="66" y="44" font-size="17" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="${S}">%10</text>`)],
    "t-bisiklet": ["Bisiklet geçebilir", T(bisiklet())],
    "t-ana-tali": ["Ana yol – tali yol kavşağı", T(cz("M50 84 V30", 11) + cz("M50 58 H74", 6))],
    "t-gevsek-malzeme": ["Gevşek malzemeli zemin", T(araba(50, 38) + [[34, 64], [46, 70], [58, 62], [68, 72], [40, 78], [56, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${S}"/>`).join(""))],
    "t-diger-tehlike": ["Dikkat (diğer tehlikeler)", T(`<rect x="44" y="28" width="12" height="36" rx="4" fill="${S}"/><circle cx="50" cy="76" r="6.5" fill="${S}"/>`)],

    "t-gizli-buzlanma": ["Gizli buzlanma", T(cz("M50 26 V84 M25 40 L75 70 M25 70 L75 40", 6) + cz("M43 31 L50 38 L57 31 M43 79 L50 72 L57 79", 4))],
    "t-yandan-ruzgar": ["Yandan rüzgâr", T(cz("M30 34 V84", 5) + `<path d="M32 36 L76 44 L76 58 L32 62 Z" fill="${K}" stroke="${S}" stroke-width="3"/><path d="M46 39 V60 M60 41 V59" stroke="#fff" stroke-width="6"/>`)],
    "t-kasisli": ["Kasisli yol", T(`<path d="M18 80 H30 Q38 60 46 80 H54 Q62 60 70 80 H82 V84 H18 Z" fill="${S}"/>`)],
    "t-kiyi": ["Deniz veya nehir kıyısında biten yol", T(`<path d="M18 52 H46 V84 H18 Z" fill="${S}"/>${araba(58, 52)}${cz("M48 74 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 M48 84 q5 -5 10 0 q5 5 10 0 q5 -5 10 0", 3.5)}`)],
    "t-egim-cikis": ["Tehlikeli eğim (çıkış)", T(`<path d="M20 82 H76 V46 Z" fill="${S}"/><text x="36" y="44" font-size="17" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="${S}">%10</text>`)],

    // ---- durma / yol verme
    "dur": ["DUR", `<path d="M30 4 H70 L96 30 V70 L70 96 H30 L4 70 V30 Z" fill="${K}" stroke="#fff" stroke-width="3"/><text x="50" y="62" font-size="30" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="#fff">DUR</text>`],
    "yol-ver": ["Yol ver", `<path d="M6 12 H94 L50 90 Z" fill="#fff" stroke="${K}" stroke-width="9" stroke-linejoin="round"/>`],

    // ---- yasaklama (kırmızı daire)
    "y-girilmez": ["Girişi olmayan yol", `<circle cx="50" cy="50" r="46" fill="${K}"/><rect x="18" y="41" width="64" height="18" fill="#fff"/>`],
    "y-tasit-kapali": ["Taşıt trafiğine kapalı yol", Y()],
    "y-hiz-50": ["Azami hız sınırlaması (50)", Y(`<text x="50" y="64" font-size="40" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="${S}">50</text>`)],
    "y-hiz-70": ["Azami hız sınırlaması (70)", Y(`<text x="50" y="64" font-size="40" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="${S}">70</text>`)],
    "y-sollama": ["Öndeki taşıtı geçmek yasaktır", Y(araba(34, 50, K) + araba(66, 50, S))],
    "y-sollama-sonu": ["Geçme yasağı sonu", `<circle cx="50" cy="50" r="44" fill="#fff" stroke="#999" stroke-width="3"/>${araba(34, 50, "#999")}${araba(66, 50, "#999")}<path d="M24 80 L80 24 M18 72 L72 18 M30 86 L86 30" stroke="${S}" stroke-width="3"/>`],
    "y-karsidan-gelene": ["Karşıdan gelene yol ver", Y(ok("M36 26 V72", S, 8) + `<path d="M24 62 L36 80 L48 62 Z" fill="${S}"/>` + ok("M64 76 V30", K, 8) + `<path d="M52 38 L64 20 L76 38 Z" fill="${K}"/>`)],
    "y-kamyon-gecme": ["Yük taşıtlarının öndeki taşıtı geçmesi yasaktır", Y(`<rect x="18" y="38" width="22" height="20" fill="${K}"/><rect x="40" y="46" width="8" height="12" fill="${K}"/><circle cx="25" cy="61" r="3.5" fill="${K}"/><circle cx="42" cy="61" r="3.5" fill="${K}"/>` + araba(68, 52, S))],
    "y-kamyon-gecme-sonu": ["Kamyonlar için geçme yasağı sonu", `<circle cx="50" cy="50" r="44" fill="#fff" stroke="#999" stroke-width="3"/><rect x="18" y="38" width="22" height="20" fill="#999"/><rect x="40" y="46" width="8" height="12" fill="#999"/>${araba(68, 52, "#999")}<path d="M24 80 L80 24 M18 72 L72 18 M30 86 L86 30" stroke="${S}" stroke-width="3"/>`],
    "y-gabari": ["Yüksekliği 3,50 metreden fazla olan taşıt giremez", Y(`<path d="M40 12 H60 L50 22 Z M40 88 H60 L50 78 Z" fill="${S}"/><text x="50" y="61" font-size="25" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="${S}">3,5 m</text>`)],
    "y-tum-yasak-sonu": ["Bütün yasaklama ve kısıtlamaların sonu", `<circle cx="50" cy="50" r="44" fill="#fff" stroke="#777" stroke-width="2.5"/><path d="M22 78 L78 22" stroke="${S}" stroke-width="12"/>`],
    "y-hiz-sonu": ["Hız sınırlaması sonu (50)", `<circle cx="50" cy="50" r="44" fill="#fff" stroke="#777" stroke-width="2.5"/><text x="50" y="64" font-size="40" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="#999">50</text><path d="M24 80 L80 24 M18 72 L72 18 M30 86 L86 30" stroke="${S}" stroke-width="3"/>`],
    "y-motosiklet": ["Motosiklet giremez", Y(`<circle cx="33" cy="62" r="9" fill="none" stroke="${S}" stroke-width="5"/><circle cx="69" cy="62" r="9" fill="none" stroke="${S}" stroke-width="5"/><path d="M33 62 L46 46 H60 L69 62 M44 46 L40 38 H50" fill="none" stroke="${S}" stroke-width="5" stroke-linejoin="round"/><circle cx="54" cy="34" r="5" fill="${S}"/>`)],
    "y-kamyon": ["Kamyon giremez", Y(`<rect x="20" y="34" width="40" height="26" fill="${S}"/><path d="M60 42 H72 L80 52 V60 H60 Z" fill="${S}"/><circle cx="32" cy="64" r="5" fill="${S}"/><circle cx="70" cy="64" r="5" fill="${S}"/>`)],
    "y-sola-donulmez": ["Sola dönülmez", Y(ok("M58 78 V52 Q58 40 46 40 H34") + ok("M40 31 L30 40 L40 49"), "/")],
    "y-saga-donulmez": ["Sağa dönülmez", Y(ayna(ok("M58 78 V52 Q58 40 46 40 H34") + ok("M40 31 L30 40 L40 49")), "/")],
    "y-u-donusu": ["U dönüşü yapılmaz", Y(ok("M40 78 V44 Q40 30 52 30 Q64 30 64 44 V54") + ok("M56 48 L64 58 L72 48"), "/")],
    "y-korna": ["Sesli işaret vermek yasaktır", Y(`<path d="M30 42 H42 L62 30 V70 L42 58 H30 Z" fill="${S}"/>` + cz("M68 40 q6 10 0 20", 4), "/")],
    "y-yaya-giremez": ["Yaya giremez", Y(kisi(50, 28, 1.05), "/")],
    "y-park-yasak": ["Park etmek yasaktır", `<circle cx="50" cy="50" r="43" fill="${MAVI}" stroke="${K}" stroke-width="10"/><path d="M22 22 L78 78" stroke="${K}" stroke-width="9"/>`],
    "y-durma-park-yasak": ["Duraklamak ve park etmek yasaktır", `<circle cx="50" cy="50" r="43" fill="${MAVI}" stroke="${K}" stroke-width="10"/><path d="M22 22 L78 78 M78 22 L22 78" stroke="${K}" stroke-width="9"/>`],

    // ---- mecburi yön (mavi daire)
    "m-ileri": ["İleri mecburi yön", M(ok("M50 80 V26", "#fff", 9) + ok("M36 40 L50 24 L64 40", "#fff", 9))],
    "m-saga": ["Sağa mecburi yön", M(ok("M40 80 V54 Q40 42 52 42 H70", "#fff", 9) + ok("M60 30 L72 42 L60 54", "#fff", 9))],
    "m-sola": ["Sola mecburi yön", M(ayna(ok("M40 80 V54 Q40 42 52 42 H70", "#fff", 9) + ok("M60 30 L72 42 L60 54", "#fff", 9)))],
    "m-sagdan-git": ["Sağdan gidiniz", M(ok("M32 32 L66 66", "#fff", 9) + ok("M48 68 H68 V48", "#fff", 9))],
    "m-ada-donel": ["Ada etrafında dönünüz", M(cz("M30 50 A20 20 0 0 1 64 34 M70 54 A20 20 0 0 1 42 70", 7, "#fff") + `<path d="M60 24 L74 34 L58 42 Z M50 62 L38 74 L36 60 Z" fill="#fff"/>`)],
    "m-bisiklet-yolu": ["Bisiklet yolu", M(`<g transform="translate(2 -6)">${bisiklet("#fff")}</g>`)],
    "m-yaya-yolu": ["Yaya yolu", M(kisi(50, 24, 1.35, "#fff"))],

    // ---- bilgi (mavi kare) ve ana yol
    "b-park": ["Park yeri", B(`<text x="50" y="74" font-size="62" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="#fff">P</text>`)],
    "b-hastane": ["Hastane", B(`<text x="50" y="74" font-size="62" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="#fff">H</text>`)],
    "b-cikmaz": ["Çıkmaz yol", B(`<rect x="42" y="38" width="16" height="50" fill="#fff"/><rect x="26" y="20" width="48" height="16" fill="${K}"/>`)],
    "b-yaya-gecidi": ["Yaya geçidi (bilgi)", B(`<path d="M50 14 L88 84 H12 Z" fill="#fff"/>${kisi(50, 38, .95)}<path d="M30 80 H40 M46 80 H56 M62 80 H72" stroke="${S}" stroke-width="5"/>`)],
    "b-ilk-yardim": ["İlk yardım", B(`<rect x="18" y="18" width="64" height="64" fill="#fff"/><path d="M42 28 H58 V42 H72 V58 H58 V72 H42 V58 H28 V42 H42 Z" fill="${K}"/>`)],
    "b-akaryakit": ["Akaryakıt istasyonu", B(`<rect x="18" y="18" width="64" height="64" fill="#fff"/><rect x="32" y="30" width="24" height="44" rx="3" fill="${S}"/><rect x="36" y="35" width="16" height="11" fill="#fff"/>${cz("M56 40 H64 V64 Q64 70 68 68", 4)}`)],
    "b-tek-yon": ["Tek yönlü yol", B(ok("M50 84 V24", "#fff", 10) + ok("M34 40 L50 22 L66 40", "#fff", 10))],
    "b-oncelikli-yon": ["Önceliği olan yön (karşıdan gelene göre)", B(ok("M36 30 V66", K, 6) + `<path d="M28 58 L36 72 L44 58 Z" fill="${K}"/>` + ok("M64 84 V30", "#fff", 10) + `<path d="M50 38 L64 18 L78 38 Z" fill="#fff"/>`)],
    "b-ana-yol": ["Ana yol", `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#fff" stroke="#333" stroke-width="2"/><path d="M50 18 L82 50 L50 82 L18 50 Z" fill="#f5c400"/>`],
    "b-ana-yol-sonu": ["Ana yol sonu", `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#fff" stroke="#333" stroke-width="2"/><path d="M50 18 L82 50 L50 82 L18 50 Z" fill="#f5c400"/><path d="M26 74 L74 26" stroke="${S}" stroke-width="6"/>`],

    // ---- ışıklı işaretler
    "isik-kirmizi": ["Kırmızı ışık", ISIK([0])],
    "isik-kirmizi-sari": ["Kırmızı ve sarı ışık birlikte", ISIK([0, 1])],
    "isik-sari": ["Sarı ışık", ISIK([1])],
    "isik-yesil": ["Yeşil ışık", ISIK([2])],
    "isik-sari-yanip": ["Yanıp sönen sarı ışık", ISIK([1, "b"])],

    // ---- gösterge paneli uyarı ışıkları
    "g-yag": ["Motor yağ basıncı uyarı ışığı", G(`<path d="M18 48 H34 L40 42 H62 L82 34 L66 60 H26 L18 52 Z" fill="${K}"/><path d="M84 44 q4 8 0 12 q-4 -4 0 -12" fill="${K}"/>`)],
    "g-aku": ["Akü şarj uyarı ışığı", G(`<rect x="18" y="32" width="64" height="40" rx="4" fill="none" stroke="${K}" stroke-width="6"/><rect x="26" y="24" width="10" height="8" fill="${K}"/><rect x="64" y="24" width="10" height="8" fill="${K}"/>${cz("M28 52 H40 M34 46 V58 M60 52 H72", 5, K)}`)],
    "g-fren": ["Fren sistemi uyarı ışığı", G(`<circle cx="50" cy="50" r="22" fill="none" stroke="${K}" stroke-width="6"/>${cz("M20 30 Q10 50 20 70 M80 30 Q90 50 80 70", 5, K)}<rect x="47" y="36" width="6" height="18" fill="${K}"/><circle cx="50" cy="62" r="3.5" fill="${K}"/>`)],
    "g-motor-ariza": ["Motor arıza uyarı ışığı", G(`<path d="M22 40 H34 V34 H58 V40 H66 L72 46 H80 V64 H72 L66 70 H34 L28 64 H22 Z" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linejoin="round"/>`)],
    "g-hararet": ["Motor hararet (soğutma suyu sıcaklığı) uyarı ışığı", G(`<rect x="45" y="18" width="10" height="38" rx="5" fill="${K}"/>${cz("M55 26 H64 M55 36 H64", 4, K)}<circle cx="50" cy="60" r="9" fill="${K}"/>${cz("M18 76 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0", 4, K)}`)],
    "g-abs": ["ABS uyarı ışığı", G(`<circle cx="50" cy="50" r="24" fill="none" stroke="#f59e0b" stroke-width="5"/>${cz("M20 30 Q10 50 20 70 M80 30 Q90 50 80 70", 5, "#f59e0b")}<text x="50" y="58" font-size="20" font-weight="900" font-family="Arial,sans-serif" text-anchor="middle" fill="#f59e0b">ABS</text>`)],
    "g-hava-yastigi": ["Hava yastığı uyarı ışığı", G(`${kisi(40, 26, 1.1, K)}<circle cx="68" cy="40" r="12" fill="${K}"/>`)],
    "g-kemer": ["Emniyet kemeri uyarı ışığı", G(`<circle cx="46" cy="22" r="7" fill="${K}"/><path d="M34 34 H58 L62 70 H30 Z" fill="${K}"/>${cz("M36 34 L60 66", 5, "#1b1b22")}`)],
    "g-uzun-far": ["Uzun far (selektör) gösterge ışığı", G(`<path d="M56 28 Q80 28 80 50 Q80 72 56 72 Z" fill="#3b82f6"/>${cz("M18 34 H46 M18 45 H46 M18 56 H46 M18 67 H46", 5, "#3b82f6")}`)],
    "g-kisa-far": ["Kısa far gösterge ışığı", G(`<path d="M56 28 Q80 28 80 50 Q80 72 56 72 Z" fill="#22c55e"/>${cz("M20 30 L46 38 M20 42 L46 50 M20 54 L46 62 M20 66 L46 74", 5, "#22c55e")}`)],
    "g-yakit": ["Yakıt seviyesi az uyarı ışığı", G(`<rect x="28" y="24" width="30" height="54" rx="4" fill="#f59e0b"/><rect x="33" y="30" width="20" height="14" fill="#1b1b22"/>${cz("M58 38 H68 V66 Q68 74 74 70 V40 L66 32", 5, "#f59e0b")}`)],
    "g-lastik": ["Lastik basıncı uyarı ışığı", G(`<path d="M24 34 Q18 52 26 70 H74 Q82 52 76 34" fill="none" stroke="#f59e0b" stroke-width="6"/>${cz("M24 76 H76", 5, "#f59e0b")}<rect x="47" y="34" width="6" height="20" fill="#f59e0b"/><circle cx="50" cy="62" r="3.5" fill="#f59e0b"/>`)],
    "g-sinyal": ["Sinyal (dönüş) gösterge ışıkları", G(`<path d="M14 50 L36 32 V44 H46 V56 H36 V68 Z M86 50 L64 32 V44 H54 V56 H64 V68 Z" fill="#22c55e"/>`)],

    // ---- yol çizgileri (kuşbakışı)
    "c-kesik": ["Kesik yol çizgisi", YOL(`<path d="M50 0 V100" stroke="#fff" stroke-width="5" stroke-dasharray="14 12"/>`)],
    "c-devamli": ["Devamlı yol çizgisi", YOL(`<path d="M50 0 V100" stroke="#fff" stroke-width="5"/>`)],
    "c-cift-devamli": ["Çift devamlı yol çizgisi", YOL(`<path d="M46 0 V100 M54 0 V100" stroke="#fff" stroke-width="4"/>`)],
    "c-kesik-devamli": ["Bir tarafı kesik, bir tarafı devamlı çizgi", YOL(`<path d="M46 0 V100" stroke="#fff" stroke-width="4" stroke-dasharray="14 12"/><path d="M54 0 V100" stroke="#fff" stroke-width="4"/>`)]
  };
})();
if (typeof module !== "undefined") module.exports = ISARET;
