// sorular/*.json + isaretler.js + src.html -> index.html (tek dosya)
const fs = require("fs"), path = require("path");
const ISARET = require("./isaretler.js");
const dir = path.join(__dirname, "sorular");
const DERSLER = ["ilkyardim", "trafik", "motor", "adap"];
const tum = [], hatalar = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".json")).sort()) {
  JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")).forEach((q, i) => {
    const ok = DERSLER.includes(q.d) && typeof q.q === "string" && Array.isArray(q.o) && q.o.length === 4 &&
      Number.isInteger(q.a) && q.a >= 0 && q.a < 4 && new Set(q.o).size === 4 &&
      (!q.g || ISARET[q.g]) && (!q.og || q.o.every(x => ISARET[x]));
    if (!ok) return hatalar.push(`${f}#${i}`);
    // sayısal şıklar küçükten büyüğe (site bunları karıştırmaz)
    const sayi = q.o.map(x => /^-?\d+([.,]\d+)?$/.test(x.trim()) ? parseFloat(x.replace(",", ".")) : NaN);
    if (sayi.every(Number.isFinite)) {
      const dogru = q.o[q.a];
      q.o = q.o.map((x, j) => [x, sayi[j]]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
      q.a = q.o.indexOf(dogru);
    }
    tum.push({d: q.d, k: q.k || "", q: q.q, o: q.o, a: q.a, c: q.c || "", ...(q.g ? {g: q.g} : {}), ...(q.og ? {og: true} : {})});
  });
}
const tekrar = tum.length - new Set(tum.map(q => q.q + "|" + (q.g || "") + q.o.join())).size;
const json = JSON.stringify(tum).replace(/</g, "\\u003c");
let fb = "";
try { fb = fs.readFileSync(path.join(__dirname, "firebase-url.txt"), "utf8").trim().replace(/\/+$/, ""); } catch (e) {}
if (process.env.FB_TEST) fb = process.env.FB_TEST; // yalnızca yerel test
else if (fb && !/^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.(firebasedatabase\.app|firebaseio\.com)$/.test(fb)) throw new Error("firebase-url.txt geçersiz: " + fb);
const html = fs.readFileSync(path.join(__dirname, "src.html"), "utf8")
  .replace("__SORULAR__", () => json)
  .replace("<script>__ISARETLER__</script>", () => "<script>" + fs.readFileSync(path.join(__dirname, "isaretler.js"), "utf8").replace(/^if \(typeof module.*$/m, "") + "</script>")
  .replace('"__FIREBASE__"', () => JSON.stringify(fb));
fs.writeFileSync(path.join(__dirname, "index.html"), html);
const say = {}; tum.forEach(q => say[q.d] = (say[q.d] || 0) + 1);
console.log("toplam", tum.length, say, "görselli", tum.filter(q => q.g || q.og).length, "tekrar", tekrar, "canlı", fb ? "açık" : "kapalı", hatalar.length ? "HATALI: " + hatalar.join(", ") : "hata yok");
