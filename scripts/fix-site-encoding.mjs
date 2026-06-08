import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIRA = "\u20BA";

const PRICES_TR = {
  barbie: `1.150 ${LIRA}`,
  elsa: `1.190 ${LIRA}`,
  olaf: `890 ${LIRA}`,
  moana: `950 ${LIRA}`,
  maui: `1.150 ${LIRA}`,
  harryPotter: `990 ${LIRA}`,
  hermione: `990 ${LIRA}`,
  malefiz: `1.290 ${LIRA}`,
  ronald: `890 ${LIRA}`,
  wednesday: `990 ${LIRA}`,
  thing: `690 ${LIRA}`,
  pugsleyAddams: `890 ${LIRA}`,
  enidSinclair: `950 ${LIRA}`,
  kuromi: `890 ${LIRA}`,
  myMelody: `890 ${LIRA}`,
  sonicBlue: `850 ${LIRA}`,
  sonicRed: `850 ${LIRA}`,
  sonicBlack: `850 ${LIRA}`,
  tails: `950 ${LIRA}`,
  lolSurpriseDoll: `990 ${LIRA}`,
  crossbodyPaperBag: `1.290 ${LIRA}`,
  lavenderClutch: `1.150 ${LIRA}`,
  nostalgicPhoneBlue: `590 ${LIRA}`,
  nostalgicPhonePink: `590 ${LIRA}`,
  nostalgicPhoneOrange: `590 ${LIRA}`,
  fruitSet: `750 ${LIRA}`,
  vegetableSet: `690 ${LIRA}`,
  trexDinosaur: `950 ${LIRA}`,
};

const PRICES_EN = {
  barbie: `${LIRA}1,150`,
  elsa: `${LIRA}1,190`,
  olaf: `${LIRA}890`,
  moana: `${LIRA}950`,
  maui: `${LIRA}1,150`,
  harryPotter: `${LIRA}990`,
  hermione: `${LIRA}990`,
  malefiz: `${LIRA}1,290`,
  ronald: `${LIRA}890`,
  wednesday: `${LIRA}990`,
  thing: `${LIRA}690`,
  pugsleyAddams: `${LIRA}890`,
  enidSinclair: `${LIRA}950`,
  kuromi: `${LIRA}890`,
  myMelody: `${LIRA}890`,
  sonicBlue: `${LIRA}850`,
  sonicRed: `${LIRA}850`,
  sonicBlack: `${LIRA}850`,
  tails: `${LIRA}950`,
  lolSurpriseDoll: `${LIRA}990`,
  crossbodyPaperBag: `${LIRA}1,290`,
  lavenderClutch: `${LIRA}1,150`,
  nostalgicPhoneBlue: `${LIRA}590`,
  nostalgicPhonePink: `${LIRA}590`,
  nostalgicPhoneOrange: `${LIRA}590`,
  fruitSet: `${LIRA}750`,
  vegetableSet: `${LIRA}690`,
  trexDinosaur: `${LIRA}950`,
};

const PALETTE_TR = {
  barbie: { pink: "\u0130konik pembe", blush: "All\u0131k tonu", blonde: "Platin sar\u0131", black: "Siyah detay", white: "Beyaz" },
  elsa: { iceBlue: "Buz mavisi", snow: "Kar beyaz\u0131", silver: "G\u00FCm\u00FC\u015F", blonde: "Sar\u0131 sa\u00E7", cape: "Mor pelerin" },
  olaf: { snow: "Kar beyaz\u0131", coal: "K\u00F6m\u00FCr siyah\u0131", carrot: "Havu\u00E7 turuncu", stick: "Dal kahverengi" },
  moana: { redTop: "K\u0131rm\u0131z\u0131 \u00FCst", skirt: "\u00C7imen ye\u015Fili", hair: "Kahverengi sa\u00E7", skin: "Ten rengi", teal: "Turkuaz" },
  maui: { skin: "Ten rengi", hair: "Siyah sa\u00E7", red: "K\u0131rm\u0131z\u0131 \u00F6rt\u00FC", leaf: "Yaprak ye\u015Fili", tattoo: "D\u00F6vme kahvesi" },
  harryPotter: { hair: "Siyah sa\u00E7", skin: "Ten rengi", scarfRed: "Gryffindor k\u0131rm\u0131z\u0131", scarfGold: "Gryffindor alt\u0131n", robe: "Siyah c\u00FCbbe", shirt: "Krem g\u00F6mlek" },
  hermione: { hair: "Kahverengi sa\u00E7", skin: "Ten rengi", tieRed: "Kravat k\u0131rm\u0131z\u0131", tieGold: "Kravat alt\u0131n", robe: "Siyah c\u00FCbbe" },
  malefiz: { black: "Siyah", purple: "Mor", green: "Z\u00FCmr\u00FCt ye\u015Fili", skin: "Soluk ten", gold: "Alt\u0131n detay" },
  ronald: { hair: "Turuncu sa\u00E7", skin: "Ten rengi", scarfRed: "Gryffindor k\u0131rm\u0131z\u0131", scarfGold: "Gryffindor alt\u0131n", robe: "Siyah c\u00FCbbe" },
  wednesday: { dress: "Siyah elbise", collar: "Beyaz yaka", hair: "Siyah sa\u00E7", skin: "Soluk ten" },
  thing: { skin: "Ten rengi", nails: "Siyah t\u0131rnak", highlight: "G\u00F6lge tonu" },
  pugsleyAddams: { red: "K\u0131rm\u0131z\u0131 \u00E7izgi", black: "Siyah \u00E7izgi", skin: "Soluk ten", hair: "Koyu sa\u00E7" },
  enidSinclair: { yellow: "Sar\u0131", lavender: "Eflatun", pink: "Pembe", brown: "Kahverengi", black: "Siyah" },
  kuromi: { black: "Siyah", pink: "Pembe", white: "Beyaz", purple: "Mor" },
  myMelody: { white: "Beyaz", hood: "Pembe kap\u00FC\u015Fon", nose: "Sar\u0131 burun", pink: "Pembe" },
  sonicBlue: { blue: "Sonic mavisi", skin: "Ten rengi", shoes: "K\u0131rm\u0131z\u0131 ayakkab\u0131", gloves: "Beyaz eldiven", eyes: "Siyah g\u00F6z" },
  sonicRed: { red: "K\u0131rm\u0131z\u0131", skin: "Ten rengi", gloves: "Beyaz eldiven", eyes: "Siyah g\u00F6z" },
  sonicBlack: { black: "Siyah", skin: "Ten rengi", shoes: "K\u0131rm\u0131z\u0131 ayakkab\u0131", gloves: "Beyaz eldiven" },
  tails: { orange: "Turuncu t\u00FCy", chest: "Beyaz g\u00F6\u011F\u00FCs", shoes: "Kahverengi ayakkab\u0131", eyes: "Mavi g\u00F6z", detail: "Siyah detay" },
  lolSurpriseDoll: { hotPink: "Fu\u015Fya", purple: "Mor", turquoise: "Turkuaz", gold: "Alt\u0131n", white: "Beyaz" },
  crossbodyPaperBag: { kraft: "Kraft kahve", cream: "Krem", strap: "Kahverengi ask\u0131", black: "Siyah detay" },
  lavenderClutch: { lavender: "Eflatun", lilac: "Lila", silver: "G\u00FCm\u00FC\u015F", cream: "Krem" },
  nostalgicPhoneBlue: { body: "Retro mavi", dial: "Krem disk", accent: "K\u0131rm\u0131z\u0131 aksan", black: "Siyah" },
  nostalgicPhonePink: { body: "Retro pembe", dial: "Krem disk", accent: "K\u0131rm\u0131z\u0131 aksan", white: "Beyaz" },
  nostalgicPhoneOrange: { body: "Retro turuncu", dial: "Krem disk", brown: "Kahverengi", black: "Siyah" },
  fruitSet: { apple: "Elma k\u0131rm\u0131z\u0131s\u0131", banana: "Muz sar\u0131s\u0131", grape: "\u00DCz\u00FCm moru", leaf: "Yaprak ye\u015Fili", orange: "Portakal" },
  vegetableSet: { tomato: "Domates k\u0131rm\u0131z\u0131s\u0131", carrot: "Havu\u00E7 turuncu", broccoli: "Brokoli ye\u015Fili", eggplant: "Patl\u0131can moru", corn: "M\u0131s\u0131r sar\u0131s\u0131" },
  trexDinosaur: { green: "Orman ye\u015Fili", belly: "A\u00E7\u0131k ye\u015Fil kar\u0131n", teeth: "Beyaz di\u015F", eyes: "Siyah g\u00F6z", tongue: "K\u0131rm\u0131z\u0131 dil" },
};

const PALETTE_EN = {
  barbie: { pink: "Iconic pink", blush: "Blush", blonde: "Platinum blonde", black: "Black accent", white: "White" },
  elsa: { iceBlue: "Ice blue", snow: "Snow white", silver: "Silver", blonde: "Blonde hair", cape: "Purple cape" },
  olaf: { snow: "Snow white", coal: "Coal black", carrot: "Carrot orange", stick: "Stick brown" },
  moana: { redTop: "Red top", skirt: "Grass green", hair: "Brown hair", skin: "Skin tone", teal: "Teal" },
  maui: { skin: "Skin tone", hair: "Black hair", red: "Red wrap", leaf: "Leaf green", tattoo: "Tattoo brown" },
  harryPotter: { hair: "Black hair", skin: "Skin tone", scarfRed: "Gryffindor red", scarfGold: "Gryffindor gold", robe: "Black robe", shirt: "Cream shirt" },
  hermione: { hair: "Brown hair", skin: "Skin tone", tieRed: "Tie red", tieGold: "Tie gold", robe: "Black robe" },
  malefiz: { black: "Black", purple: "Purple", green: "Emerald green", skin: "Pale skin", gold: "Gold accent" },
  ronald: { hair: "Ginger hair", skin: "Skin tone", scarfRed: "Gryffindor red", scarfGold: "Gryffindor gold", robe: "Black robe" },
  wednesday: { dress: "Black dress", collar: "White collar", hair: "Black hair", skin: "Pale skin" },
  thing: { skin: "Skin tone", nails: "Black nails", highlight: "Shadow tone" },
  pugsleyAddams: { red: "Red stripe", black: "Black stripe", skin: "Pale skin", hair: "Dark hair" },
  enidSinclair: { yellow: "Yellow", lavender: "Lavender", pink: "Pink", brown: "Brown", black: "Black" },
  kuromi: { black: "Black", pink: "Pink", white: "White", purple: "Purple" },
  myMelody: { white: "White", hood: "Pink hood", nose: "Yellow nose", pink: "Pink" },
  sonicBlue: { blue: "Sonic blue", skin: "Skin tone", shoes: "Red shoes", gloves: "White gloves", eyes: "Black eyes" },
  sonicRed: { red: "Red", skin: "Skin tone", gloves: "White gloves", eyes: "Black eyes" },
  sonicBlack: { black: "Black", skin: "Skin tone", shoes: "Red shoes", gloves: "White gloves" },
  tails: { orange: "Orange fur", chest: "White chest", shoes: "Brown shoes", eyes: "Blue eyes", detail: "Black detail" },
  lolSurpriseDoll: { hotPink: "Hot pink", purple: "Purple", turquoise: "Turquoise", gold: "Gold", white: "White" },
  crossbodyPaperBag: { kraft: "Kraft brown", cream: "Cream", strap: "Brown strap", black: "Black accent" },
  lavenderClutch: { lavender: "Lavender", lilac: "Lilac", silver: "Silver", cream: "Cream" },
  nostalgicPhoneBlue: { body: "Retro blue", dial: "Cream dial", accent: "Red accent", black: "Black" },
  nostalgicPhonePink: { body: "Retro pink", dial: "Cream dial", accent: "Red accent", white: "White" },
  nostalgicPhoneOrange: { body: "Retro orange", dial: "Cream dial", brown: "Brown", black: "Black" },
  fruitSet: { apple: "Apple red", banana: "Banana yellow", grape: "Grape purple", leaf: "Leaf green", orange: "Orange" },
  vegetableSet: { tomato: "Tomato red", carrot: "Carrot orange", broccoli: "Broccoli green", eggplant: "Eggplant purple", corn: "Corn yellow" },
  trexDinosaur: { green: "Jungle green", belly: "Light green belly", teeth: "White teeth", eyes: "Black eyes", tongue: "Red tongue" },
};

const LEGAL_PRIVACY_TR = `<p>Bu Ki\u015Fisel Verilerin Korunmas\u0131 ve Gizlilik Politikas\u0131 ("Politika"), <strong>Amigurumirem</strong> el yap\u0131m\u0131 amigurumi at\u00F6lyesi taraf\u0131ndan i\u015Fletilen <strong>amigurumirem.com</strong> vitrin web sitesi kapsam\u0131nda, 6698 say\u0131l\u0131 Ki\u015Fisel Verilerin Korunmas\u0131 Kanunu ("KVKK") ve ilgili ikincil mevzuat uyar\u0131nca ki\u015Fisel verilerinizin i\u015Flenmesine ili\u015Fkin sizi bilgilendirmek amac\u0131yla haz\u0131rlanm\u0131\u015Ft\u0131r.</p>\n\n<h2>1. Veri Sorumlusu</h2>\n<p>KVKK kapsam\u0131nda veri sorumlusu:</p>\n<ul>\n<li><strong>Ticari unvan / marka:</strong> Amigurumirem</li>\n<li><strong>E-posta:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>\n<li><strong>Web sitesi:</strong> <a href="https://www.amigurumirem.com/">amigurumirem.com</a></li>\n<li><strong>\u0130leti\u015Fim:</strong> <a href="index.html#contact">\u0130leti\u015Fim b\u00F6l\u00FCm\u00FC</a> \u00B7 <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>\n</ul>\n\n<h2>2. Hizmetin Niteli\u011Fi</h2>\n<p><strong>amigurumirem.com</strong> bir \u00FCr\u00FCn vitrini sunar; bu sitede do\u011Frudan \u00F6deme al\u0131nmaz. Haz\u0131r koleksiyon \u00FCr\u00FCnlerinin sat\u0131n alma, \u00F6deme, fatura ve kargo s\u00FCre\u00E7leri <strong>Instagram</strong> \u00FCzerinden y\u00FCr\u00FCt\u00FCl\u00FCr. \u00D6zel sipari\u015F talepleri e-posta, WhatsApp veya Instagram mesaj\u0131 ile al\u0131nabilir.</p>\n\n<h2>3. \u0130\u015Flenen Ki\u015Fisel Veri Kategorileri</h2>\n<ul>\n<li><strong>Kimlik ve ileti\u015Fim:</strong> Ad-soyad, e-posta adresi, telefon numaras\u0131 (bizimle ileti\u015Fime ge\u00E7meniz h\u00E2linde).</li>\n<li><strong>Sipari\u015F ve \u00F6zel sipari\u015F:</strong> Fig\u00FCr tercihi, karakter renk paleti, \u00F6l\u00E7\u00FC, notlar, referans numaras\u0131.</li>\n<li><strong>\u0130\u015Flem g\u00FCvenli\u011Fi:</strong> IP adresi, taray\u0131c\u0131 ve cihaz bilgisi, oturum loglar\u0131, eri\u015Fim tarihi/saati.</li>\n<li><strong>\u00C7erez verileri:</strong> Zorunlu \u00E7erezler; analitik \u00E7erezler yaln\u0131zca a\u00E7\u0131k r\u0131zan\u0131z ile.</li>\n<li><strong>Pazarlama:</strong> B\u00FClten e-posta adresi (yaln\u0131zca abone olman\u0131z h\u00E2linde).</li>\n</ul>\n<p>Instagram \u00FCzerinden tamamlanan al\u0131\u015Fveri\u015Flerde \u00F6deme kart\u0131, teslimat adresi ve sipari\u015F ge\u00E7mi\u015Fi verileri Instagram taraf\u0131ndan ayr\u0131 bir veri sorumlusu olarak i\u015Flenir.</p>\n\n<h2>4. \u0130\u015Fleme Ama\u00E7lar\u0131</h2>\n<ul>\n<li>Web sitesinin g\u00FCvenli, h\u0131zl\u0131 ve kesintisiz sunulmas\u0131</li>\n<li>\u0130leti\u015Fim taleplerinin ve \u00F6zel sipari\u015F ba\u015Fvurular\u0131n\u0131n de\u011Ferlendirilmesi</li>\n<li>Sipari\u015F s\u00FCrecinin y\u00FCr\u00FCt\u00FClmesi ve m\u00FC\u015Fteri deste\u011Fi</li>\n<li>B\u00FClten g\u00F6nderimi (a\u00E7\u0131k onay\u0131n\u0131z dahilinde)</li>\n<li>Mevzuattan kaynaklanan y\u00FCk\u00FCml\u00FCl\u00FCklerin yerine getirilmesi</li>\n<li>Haklar\u0131n tesisi, kullan\u0131lmas\u0131 veya korunmas\u0131</li>\n<li>Hizmet kalitesinin \u00F6l\u00E7\u00FClmesi ve iyile\u015Ftirilmesi (anonimle\u015Ftirilmi\u015F analitik)</li>\n</ul>\n\n<h2>5. Hukuki Sebepler</h2>\n<p>Ki\u015Fisel verileriniz KVKK md. 5 kapsam\u0131nda; bir s\u00F6zle\u015Fmenin kurulmas\u0131 veya ifas\u0131, hukuki y\u00FCk\u00FCml\u00FCl\u00FCk, ilgili ki\u015Finin temel hak ve \u00F6zg\u00FCrl\u00FCklerine zarar vermemek kayd\u0131yla veri sorumlusunun me\u015Fru menfaati ve a\u00E7\u0131k r\u0131zan\u0131z (analitik \u00E7erezler, b\u00FClten) hukuki sebeplerine dayan\u0131larak i\u015Flenebilir.</p>\n\n<h2>6. Aktar\u0131m ve Al\u0131c\u0131 Gruplar\u0131</h2>\n<p>Verileriniz; bar\u0131nd\u0131rma (hosting) sa\u011Flay\u0131c\u0131lar\u0131, e-posta hizmeti sa\u011Flay\u0131c\u0131lar\u0131, analitik ara\u00E7 sa\u011Flay\u0131c\u0131lar\u0131 (yaln\u0131zca r\u0131za ile), kargo/lojistik i\u015F ortaklar\u0131 (sipari\u015F teslimat\u0131nda), hukuk dan\u0131\u015Fmanlar\u0131 ve yasal zorunluluk h\u00E2linde yetkili kamu kurumlar\u0131 ile payla\u015Filabilir. Yurt d\u0131\u015F\u0131na aktar\u0131m s\u00F6z konusu olursa KVKK md. 9 h\u00FCk\u00FCmlerine uyulur.</p>\n\n<h2>7. Saklama S\u00FCreleri</h2>\n<p>Veriler, i\u015Fleme amac\u0131 i\u00E7in gerekli s\u00FCre boyunca ve ilgili mevzuattaki zamana\u015F\u0131m\u0131 s\u00FCreleri kadar saklan\u0131r; s\u00FCre sonunda silinir, yok edilir veya anonim hale getirilir. \u00D6zel sipari\u015F yaz\u0131\u015Fmalar\u0131 genellikle son i\u015Flemden itibaren <strong>3 y\u0131l</strong>; b\u00FClten kay\u0131tlar\u0131 abonelik s\u00FCresince saklan\u0131r.</p>\n\n<h2>8. KVKK Kapsam\u0131ndaki Haklar\u0131n\u0131z</h2>\n<p>KVKK md. 11 uyar\u0131nca; verilerinizin i\u015Flenip i\u015Flenmedi\u011Fini \u00F6\u011Frenme, bilgi talep etme, i\u015Flenme amac\u0131n\u0131 \u00F6\u011Frenme, yurt i\u00E7i/yurt d\u0131\u015F\u0131 aktar\u0131lan \u00FC\u00E7\u00FCnc\u00FC ki\u015Fileri bilme, eksik veya yanl\u0131\u015F i\u015Flenmi\u015Fse d\u00FCzeltilmesini isteme, silinmesini veya yok edilmesini isteme, otomatik sistemlerle analiz sonucuna itiraz etme ve kanuna ayk\u0131r\u0131 i\u015Fleme nedeniyle zarara u\u011Framan\u0131z h\u00E2linde tazminat talep etme haklar\u0131na sahipsiniz.</p>\n<p>Ba\u015Fvurular\u0131n\u0131z\u0131 <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> adresine iletebilirsiniz. Ba\u015Fvurular \u00FCcretsiz olarak en ge\u00E7 <strong>30 g\u00FCn</strong> i\u00E7inde sonu\u00E7land\u0131r\u0131l\u0131r.</p>\n\n<h2>9. \u00C7erezler</h2>\n<p>Zorunlu \u00E7erezler site i\u015Flevselli\u011Fi i\u00E7in gereklidir. Analitik \u00E7erezler yaln\u0131zca \u00E7erez banner \u00FCzerinden onay vermeniz h\u00E2linde kullan\u0131l\u0131r. Tercihlerinizi banner veya taray\u0131c\u0131 ayarlar\u0131ndan de\u011Fi\u015Ftirebilirsiniz.</p>\n\n<h2>10. \u00C7ocuklar\u0131n Gizlili\u011Fi</h2>\n<p>Sitemiz 18 ya\u015F alt\u0131ndaki ki\u015Filerden bilerek ki\u015Fisel veri toplamaz. Ebeveyn veya veli iseniz ve \u00E7ocu\u011Funuza ait veri i\u015Flendi\u011Fini d\u00FC\u015F\u00FCn\u00FCyorsan\u0131z bizimle ileti\u015Fime ge\u00E7in.</p>\n\n<h2>11. G\u00FCvenlik</h2>\n<p>Ki\u015Fisel verilerin korunmas\u0131 i\u00E7in uygun teknik ve idari tedbirler uygulanmaktad\u0131r; ancak internet \u00FCzerinden iletimin tamamen risksiz oldu\u011Fu garanti edilemez.</p>\n\n<h2>12. Politika De\u011Fi\u015Fiklikleri</h2>\n<p>Bu politika g\u00FCncellenebilir. G\u00FCncel s\u00FCr\u00FCm bu sayfada yay\u0131mlan\u0131r; \u00F6nemli de\u011Fi\u015Fikliklerde "son g\u00FCncelleme" tarihi revize edilir.</p>\n\n<p class="legal-content__notice">Bu metin bilgilendirme ama\u00E7l\u0131d\u0131r. \u00D6zel durumunuz i\u00E7in hukuk dan\u0131\u015Fman\u0131na ba\u015Fvurman\u0131z \u00F6nerilir.</p>`;

const LEGAL_RETURNS_TR = `<p>Bu \u0130ptal ve \u0130ade Ko\u015Fullar\u0131, <strong>Amigurumirem</strong> el yap\u0131m\u0131 amigurumi \u00FCr\u00FCnlerine ili\u015Fkin iptal, iade, cayma hakk\u0131 ve m\u00FC\u015Fteri destek s\u00FCre\u00E7lerini a\u00E7\u0131klar. L\u00FCtfen bu metni, <strong>amigurumirem.com</strong> \u00FCzerindeki bilgilerle ve <strong>Instagram</strong> platform ko\u015Fullar\u0131yla birlikte okuyunuz.</p>\n\n<h2>1. Genel Bilgilendirme</h2>\n<p><strong>amigurumirem.com</strong> \u00FCr\u00FCn vitrini sunar; bu sitede \u00F6deme al\u0131nmaz. Haz\u0131r koleksiyon \u00FCr\u00FCnlerinin sat\u0131\u015F\u0131, \u00F6demesi ve kargosu <strong>Instagram</strong> \u00FCzerinden yap\u0131l\u0131r. \u0130ade ve iptal ba\u015Fvurular\u0131 \u00F6ncelikle Instagram sipari\u015F s\u00FCre\u00E7leri \u00FCzerinden y\u00F6netilir; at\u00F6lyemiz \u00FCretim kalitesi, paketleme ve m\u00FC\u015Fteri ileti\u015Fiminden sorumludur.</p>\n\n<h2>2. Sat\u0131c\u0131 \u0130leti\u015Fim</h2>\n<ul>\n<li><strong>Marka:</strong> Amigurumirem</li>\n<li><strong>E-posta:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>\n<li><strong>Instagram:</strong> <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>\n</ul>\n\n<h2>3. Haz\u0131r Koleksiyon \u00DCr\u00FCnleri \u2014 14 G\u00FCnl\u00FCk Cayma Hakk\u0131</h2>\n<p>6502 say\u0131l\u0131 T\u00FCketicinin Korunmas\u0131 Hakk\u0131nda Kanun ve Mesafeli S\u00F6zle\u015Fmeler Y\u00F6netmeli\u011Fi kapsam\u0131nda, haz\u0131r koleksiyon \u00FCr\u00FCnlerinde teslimattan itibaren <strong>14 g\u00FCn</strong> i\u00E7inde herhangi bir gerek\u00E7e g\u00F6stermeksizin cayma hakk\u0131na sahipsiniz (ki\u015Fiye \u00F6zel \u00FCretilen \u00FCr\u00FCnler hari\u00E7).</p>\n<ul>\n<li>\u0130ade s\u00FCrecini Instagram hesab\u0131n\u0131zdan veya sat\u0131c\u0131 ileti\u015Fim kanallar\u0131ndan ba\u015Flat\u0131n.</li>\n<li>\u00DCr\u00FCn kullan\u0131lmam\u0131\u015F, hasars\u0131z ve m\u00FCmk\u00FCnse orijinal ambalaj\u0131nda olmal\u0131d\u0131r.</li>\n<li>\u0130ade kargo s\u00FCreci Instagram ve kargo firmas\u0131 kurallar\u0131na tabidir.</li>\n<li>\u00D6deme iadesi Instagram prosed\u00FCrleriyle yap\u0131l\u0131r; s\u00FCre bankan\u0131za g\u00F6re de\u011Fi\u015Febilir.</li>\n</ul>\n\n<h2>4. Ki\u015Fiselle\u015Ftirilmi\u015F ve \u00D6zel Sipari\u015F \u00DCr\u00FCnleri</h2>\n<p>Mesafeli S\u00F6zle\u015Fmeler Y\u00F6netmeli\u011Fi md. 15 uyar\u0131nca, <strong>t\u00FCketicinin se\u00E7im veya istekleri do\u011Frultusunda ki\u015Fiselle\u015Ftirilen</strong> mallarda cayma hakk\u0131 kullan\u0131lamaz.</p>\n<p>Buna \u015Funlar dahildir:</p>\n<ul>\n<li>\u00D6zel sipari\u015F sihirbaz\u0131 ile talep edilen fig\u00FCr, karakter renk paleti, \u00F6l\u00E7\u00FC veya isim nak\u0131\u015F\u0131</li>\n<li>\u00DCretime ba\u015Flanm\u0131\u015F \u00F6zel tasar\u0131m sipari\u015Fler</li>\n<li>Ki\u015Fiye \u00F6zel hediye notu veya ambalaj talebiyle \u00FCretilen par\u00E7alar</li>\n</ul>\n<p>\u00D6zel sipari\u015F onay\u0131ndan sonra iptal genellikle m\u00FCmk\u00FCn de\u011Fildir; \u00FCretim ba\u015Flamadan \u00F6nce yaz\u0131l\u0131 olarak sorabilirsiniz.</p>\n\n<h2>5. Hasarl\u0131 veya Eksik Teslimat</h2>\n<p>\u00DCr\u00FCn hasarl\u0131 veya eksik geldiyse teslimattan itibaren <strong>48 saat</strong> i\u00E7inde foto\u011Fraf ve sipari\u015F bilgisiyle bildirin. Instagram \u00FCzerinden veya <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> adresinden bize ula\u015Fabilirsiniz. Uygun h\u00E2llerde yeniden \u00FCretim, de\u011Fi\u015Fim veya iade de\u011Ferlendirilir.</p>\n\n<h2>6. Sipari\u015F \u0130ptali (Kargoya Verilmeden)</h2>\n<p>Instagram \u00FCzerinden verilen ve hen\u00FCz kargoya verilmemi\u015F standart sipari\u015Fler, platform kurallar\u0131 \u00E7er\u00E7evesinde iptal edilebilir.</p>\n\n<h2>7. De\u011Fi\u015Fim</h2>\n<p>Do\u011Frudan de\u011Fi\u015Fim hizmeti sunulmamaktad\u0131r. Uygun \u00FCr\u00FCnlerde iade sonras\u0131 yeni sipari\u015F verebilirsiniz.</p>\n\n<h2>8. \u00D6zel Sipari\u015F \u00D6demeleri</h2>\n<p>At\u00F6lyemizle do\u011Frudan yap\u0131lan \u00F6zel sipari\u015Flerde \u00F6deme ve iade ko\u015Fullar\u0131 sipari\u015F onay\u0131nda yaz\u0131l\u0131 olarak payla\u015F\u0131l\u0131r.</p>\n\n<h2>9. Fiyatlar ve G\u00FCncellemeler</h2>\n<p>Vitrinde g\u00F6r\u00FCnen fiyatlar bilgilendirme ama\u00E7l\u0131d\u0131r; g\u00FCncel sat\u0131\u015F fiyat\u0131 Instagram \u00FCr\u00FCn sayfas\u0131nda ge\u00E7erlidir. El eme\u011Fi, iplik maliyeti ve i\u015F\u00E7ilik s\u00FCresine g\u00F6re fiyatlar g\u00FCncellenebilir.</p>\n\n<h2>10. \u0130leti\u015Fim</h2>\n<p>\u0130ade ve iptal sorular\u0131n\u0131z i\u00E7in: <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></p>\n\n<p class="legal-content__notice">G\u00FCncel ko\u015Fullar i\u00E7in ilgili Instagram g\u00F6nderisi ve platform \u015Fartlar\u0131n\u0131 da inceleyiniz.</p>`;

function replaceProductPrice(content, slug, price) {
  const pattern = new RegExp(`("${slug}":\\s*\\{[\\s\\S]*?"price":\\s*")[^"]+(")`);
  return content.replace(pattern, `$1${price}$2`);
}

function replacePaletteFig(content, figObj) {
  const figJson = JSON.stringify(figObj, null, 4).replace(/^/gm, "    ");
  return content.replace(/"fig":\s*\{[\s\S]*?\n    \}/, `"fig": ${figJson.trim()}`);
}

function replaceLegalBody(content, section, body) {
  const key = section === "privacy" ? '"privacy"' : '"returns"';
  const pattern = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?"body":\\s*")([\\s\\S]*?)("(?:,\\s*"contactLead"))`);
  return content.replace(pattern, `$1${body.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}$3`);
}

function patchLocale(rel, prices, fig, privacy, returns, wizardPatch) {
  const file = path.join(root, rel);
  let content = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  for (const [slug, price] of Object.entries(prices)) {
    content = replaceProductPrice(content, slug, price);
  }
  content = replacePaletteFig(content, fig);
  content = replaceLegalBody(content, "privacy", privacy);
  content = replaceLegalBody(content, "returns", returns);
  if (wizardPatch) content = wizardPatch(content);
  fs.writeFileSync(file, content, "utf8");
  console.log("fixed", rel);
}

const wizardTr = (c) =>
  c
    .replace(
      /"colorTitle": "[^"]+",\s*\n\s*"colorLead": "[^"]+"/,
      `"colorTitle": "Renk paletiniz",\n    "colorTitleCharacter": "{figure} \u2014 karakter renkleri",\n    "colorLead": "Genel renk paletinden en fazla 4 ton se\u00E7ebilirsiniz.",\n    "colorLeadCharacter": "{figure} i\u00E7in \u00F6zg\u00FCn karakter tonlar\u0131. Vurgulamak istedi\u011Finiz renkleri se\u00E7in (en fazla 4)."`
    );

const wizardEn = (c) =>
  c.replace(
    /"colorTitle": "[^"]+",\s*\n\s*"colorLead": "[^"]+"/,
    `"colorTitle": "Your colour palette",\n    "colorTitleCharacter": "{figure} \u2014 character colours",\n    "colorLead": "Choose up to 4 tones from the general palette.",\n    "colorLeadCharacter": "Authentic tones for {figure}. Select the colours you want to emphasise (up to 4)."`
  );

patchLocale("js/locales/tr.js", PRICES_TR, PALETTE_TR, LEGAL_PRIVACY_TR, LEGAL_RETURNS_TR, wizardTr);

const LEGAL_PRIVACY_EN = `<p>This Privacy Policy explains how <strong>Amigurumirem</strong> ("we", "us") collects and uses personal data when you visit <strong>amigurumirem.com</strong>. We are a handmade amigurumi studio based in T\u00FCrkiye. This website is a product showcase; checkout for collection items is completed on <strong>Instagram</strong>.</p>\n\n<h2>1. Data Controller</h2>\n<ul>\n<li><strong>Brand:</strong> Amigurumirem</li>\n<li><strong>Email:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>\n<li><strong>Website:</strong> <a href="https://www.amigurumirem.com/">amigurumirem.com</a></li>\n<li><strong>Contact:</strong> <a href="index.html#contact">Contact section</a> \u00B7 <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>\n</ul>\n\n<h2>2. What This Website Does</h2>\n<p><strong>amigurumirem.com</strong> displays our handmade crochet collection. We do not process card payments on this site. Ready-made purchases are completed on Instagram. Custom order requests may be sent by email, WhatsApp, or Instagram message.</p>\n\n<h2>3. Personal Data We Process</h2>\n<ul>\n<li><strong>Identity and contact:</strong> Name, email, phone (when you contact us).</li>\n<li><strong>Orders and custom requests:</strong> Figure choice, character colour palette, size, notes, reference number.</li>\n<li><strong>Security logs:</strong> IP address, browser/device data, access timestamps.</li>\n<li><strong>Cookies:</strong> Essential cookies; analytics cookies only with your consent.</li>\n<li><strong>Marketing:</strong> Newsletter email (only if you subscribe).</li>\n</ul>\n\n<h2>4. Purposes and Legal Bases</h2>\n<p>We process data to operate the website securely, respond to enquiries, fulfil orders, send newsletters (with consent), comply with law, and improve our service under applicable Turkish data protection rules including KVKK.</p>\n\n<h2>5. Recipients and Transfers</h2>\n<p>Data may be shared with hosting, email, analytics (with consent), shipping partners, legal advisers, and authorities when required. International transfers follow KVKK Article 9 safeguards.</p>\n\n<h2>6. Retention</h2>\n<p>Data is kept only as long as necessary for the stated purpose and legal retention periods. Custom order correspondence is typically retained for <strong>3 years</strong> after the last interaction.</p>\n\n<h2>7. Your Rights</h2>\n<p>Under KVKK you may request information, correction, deletion, objection to automated processing, and compensation where applicable. Contact <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a>. We respond within <strong>30 days</strong>.</p>\n\n<h2>8. Cookies and Children</h2>\n<p>Essential cookies are required for site function. Analytics cookies are optional. We do not knowingly collect data from children under 18.</p>\n\n<h2>9. Security and Updates</h2>\n<p>We apply appropriate technical and organisational measures. This policy may be updated; the current version is always published on this page.</p>\n\n<p class="legal-content__notice">This text is for information only. Seek legal advice for your specific situation.</p>`;

const LEGAL_RETURNS_EN = `<p>This Returns and Cancellation Policy explains how returns, refunds, and cancellations work for <strong>Amigurumirem</strong> handmade amigurumi products. Please read it together with <strong>amigurumirem.com</strong> information and <strong>Instagram</strong> terms.</p>\n\n<h2>1. Overview</h2>\n<p><strong>amigurumirem.com</strong> is a showcase site with no checkout. Ready-made items are sold, paid for, and shipped through <strong>Instagram</strong>. Custom studio orders may have separate written terms.</p>\n\n<h2>2. Contact</h2>\n<ul>\n<li><strong>Email:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>\n<li><strong>Instagram:</strong> <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>\n</ul>\n\n<h2>3. Ready-Made Items \u2014 14-Day Withdrawal</h2>\n<p>For standard ready-made collection items, consumers generally have a <strong>14-day right of withdrawal</strong> from delivery under Turkish consumer law (excluding personalised goods).</p>\n<ul>\n<li>Start the return via Instagram or by contacting us.</li>\n<li>Items should be unused, undamaged, and in original packaging where possible.</li>\n<li>Refunds follow Instagram procedures; timing depends on your bank.</li>\n</ul>\n\n<h2>4. Custom and Personalised Orders</h2>\n<p>Made-to-order pieces \u2014 including wizard requests with figure, character colours, size, or name embroidery \u2014 are excluded from the standard withdrawal right once production is agreed.</p>\n\n<h2>5. Damaged or Missing Deliveries</h2>\n<p>Report damage or missing items within <strong>48 hours</strong> with photos to <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> or via Instagram.</p>\n\n<h2>6. Cancellations Before Shipping</h2>\n<p>Unshipped Instagram orders may be cancelled under platform rules.</p>\n\n<h2>7. Exchanges and Pricing</h2>\n<p>We do not offer direct exchanges. Prices shown on the showcase are indicative; the Instagram listing price applies at purchase.</p>\n\n<h2>8. Questions</h2>\n<p>Email <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> for returns and cancellation support.</p>\n\n<p class="legal-content__notice">Also review the relevant Instagram post and platform terms before purchasing.</p>`;

let enContent = fs.readFileSync(path.join(root, "js/locales/en.js"), "utf8");
for (const [slug, price] of Object.entries(PRICES_EN)) {
  enContent = replaceProductPrice(enContent, slug, price);
}
enContent = replacePaletteFig(enContent, PALETTE_EN);
enContent = replaceLegalBody(enContent, "privacy", LEGAL_PRIVACY_EN);
enContent = replaceLegalBody(enContent, "returns", LEGAL_RETURNS_EN);
enContent = wizardEn(enContent);
fs.writeFileSync(path.join(root, "js/locales/en.js"), enContent, "utf8");
console.log("fixed en.js legal");
