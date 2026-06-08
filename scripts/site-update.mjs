import fs from "fs";
import path from "path";

const root = path.resolve(".");

const PRICES_TR = {
  barbie: "1.150 ?",
  elsa: "1.190 ?",
  olaf: "890 ?",
  moana: "950 ?",
  maui: "1.150 ?",
  harryPotter: "990 ?",
  hermione: "990 ?",
  malefiz: "1.290 ?",
  ronald: "890 ?",
  wednesday: "990 ?",
  thing: "690 ?",
  pugsleyAddams: "890 ?",
  enidSinclair: "950 ?",
  kuromi: "890 ?",
  myMelody: "890 ?",
  sonicBlue: "850 ?",
  sonicRed: "850 ?",
  sonicBlack: "850 ?",
  tails: "950 ?",
  lolSurpriseDoll: "990 ?",
  crossbodyPaperBag: "1.290 ?",
  lavenderClutch: "1.150 ?",
  nostalgicPhoneBlue: "590 ?",
  nostalgicPhonePink: "590 ?",
  nostalgicPhoneOrange: "590 ?",
  fruitSet: "750 ?",
  vegetableSet: "690 ?",
  trexDinosaur: "950 ?",
};

const PRICES_EN = {
  barbie: "?1,150",
  elsa: "?1,190",
  olaf: "?890",
  moana: "?950",
  maui: "?1,150",
  harryPotter: "?990",
  hermione: "?990",
  malefiz: "?1,290",
  ronald: "?890",
  wednesday: "?990",
  thing: "?690",
  pugsleyAddams: "?890",
  enidSinclair: "?950",
  kuromi: "?890",
  myMelody: "?890",
  sonicBlue: "?850",
  sonicRed: "?850",
  sonicBlack: "?850",
  tails: "?950",
  lolSurpriseDoll: "?990",
  crossbodyPaperBag: "?1,290",
  lavenderClutch: "?1,150",
  nostalgicPhoneBlue: "?590",
  nostalgicPhonePink: "?590",
  nostalgicPhoneOrange: "?590",
  fruitSet: "?750",
  vegetableSet: "?690",
  trexDinosaur: "?950",
};

const PALETTE_TR = {
  fig: {
    barbie: { pink: "?konik pembe", blush: "All?k tonu", blonde: "Platin sar?", black: "Siyah detay", white: "Beyaz" },
    elsa: { iceBlue: "Buz mavisi", snow: "Kar beyaz?", silver: "Gm?", blonde: "Sar? sa", cape: "Mor pelerin" },
    olaf: { snow: "Kar beyaz?", coal: "Kmr siyah?", carrot: "Havu turuncu", stick: "Dal kahverengi" },
    moana: { redTop: "K?rm?z? st", skirt: "imen ye?ili", hair: "Kahverengi sa", skin: "Ten rengi", teal: "Turkuaz" },
    maui: { skin: "Ten rengi", hair: "Siyah sa", red: "K?rm?z? rt", leaf: "Yaprak ye?ili", tattoo: "Dvme kahvesi" },
    harryPotter: { hair: "Siyah sa", skin: "Ten rengi", scarfRed: "Gryffindor k?rm?z?", scarfGold: "Gryffindor alt?n", robe: "Siyah cbbe", shirt: "Krem gmlek" },
    hermione: { hair: "Kahverengi sa", skin: "Ten rengi", tieRed: "Kravat k?rm?z?", tieGold: "Kravat alt?n", robe: "Siyah cbbe" },
    malefiz: { black: "Siyah", purple: "Mor", green: "Zmrt ye?ili", skin: "Soluk ten", gold: "Alt?n detay" },
    ronald: { hair: "Turuncu sa", skin: "Ten rengi", scarfRed: "Gryffindor k?rm?z?", scarfGold: "Gryffindor alt?n", robe: "Siyah cbbe" },
    wednesday: { dress: "Siyah elbise", collar: "Beyaz yaka", hair: "Siyah sa", skin: "Soluk ten" },
    thing: { skin: "Ten rengi", nails: "Siyah t?rnak", highlight: "Glge tonu" },
    pugsleyAddams: { red: "K?rm?z? izgi", black: "Siyah izgi", skin: "Soluk ten", hair: "Koyu sa" },
    enidSinclair: { yellow: "Sar?", lavender: "Eflatun", pink: "Pembe", brown: "Kahverengi", black: "Siyah" },
    kuromi: { black: "Siyah", pink: "Pembe", white: "Beyaz", purple: "Mor" },
    myMelody: { white: "Beyaz", hood: "Pembe kap?on", nose: "Sar? burun", pink: "Pembe" },
    sonicBlue: { blue: "Sonic mavisi", skin: "Ten rengi", shoes: "K?rm?z? ayakkab?", gloves: "Beyaz eldiven", eyes: "Siyah gz" },
    sonicRed: { red: "K?rm?z?", skin: "Ten rengi", gloves: "Beyaz eldiven", eyes: "Siyah gz" },
    sonicBlack: { black: "Siyah", skin: "Ten rengi", shoes: "K?rm?z? ayakkab?", gloves: "Beyaz eldiven" },
    tails: { orange: "Turuncu ty", chest: "Beyaz g?s", shoes: "Kahverengi ayakkab?", eyes: "Mavi gz", detail: "Siyah detay" },
    lolSurpriseDoll: { hotPink: "Fu?ya", purple: "Mor", turquoise: "Turkuaz", gold: "Alt?n", white: "Beyaz" },
    crossbodyPaperBag: { kraft: "Kraft kahve", cream: "Krem", strap: "Kahverengi ask?", black: "Siyah detay" },
    lavenderClutch: { lavender: "Eflatun", lilac: "Lila", silver: "Gm?", cream: "Krem" },
    nostalgicPhoneBlue: { body: "Retro mavi", dial: "Krem disk", accent: "K?rm?z? aksan", black: "Siyah" },
    nostalgicPhonePink: { body: "Retro pembe", dial: "Krem disk", accent: "K?rm?z? aksan", white: "Beyaz" },
    nostalgicPhoneOrange: { body: "Retro turuncu", dial: "Krem disk", brown: "Kahverengi", black: "Siyah" },
    fruitSet: { apple: "Elma k?rm?z?s?", banana: "Muz sar?s?", grape: "zm moru", leaf: "Yaprak ye?ili", orange: "Portakal" },
    vegetableSet: { tomato: "Domates k?rm?z?s?", carrot: "Havu turuncu", broccoli: "Brokoli ye?ili", eggplant: "Patl?can moru", corn: "M?s?r sar?s?" },
    trexDinosaur: { green: "Orman ye?ili", belly: "A?k ye?il kar?n", teeth: "Beyaz di?", eyes: "Siyah gz", tongue: "K?rm?z? dil" },
  },
};

const PALETTE_EN = {
  fig: {
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
  },
};

const LEGAL_PRIVACY_TR = `<p>Bu Ki?isel Verilerin Korunmas? ve Gizlilik Politikas? ("Politika"), <strong>Amigurumirem</strong> el yap?m? amigurumi atlyesi taraf?ndan i?letilen <strong>amigurumirem.com</strong> vitrin web sitesi kapsam?nda, 6698 say?l? Ki?isel Verilerin Korunmas? Kanunu ("KVKK") ve ilgili ikincil mevzuat uyar?nca ki?isel verilerinizin i?lenmesine ili?kin sizi bilgilendirmek amac?yla haz?rlanm??t?r.</p>

<h2>1. Veri Sorumlusu</h2>
<p>KVKK kapsam?nda veri sorumlusu:</p>
<ul>
<li><strong>Ticari unvan / marka:</strong> Amigurumirem</li>
<li><strong>E-posta:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Web sitesi:</strong> <a href="https://www.amigurumirem.com/">amigurumirem.com</a></li>
<li><strong>?leti?im:</strong> <a href="index.html#contact">?leti?im blm</a>  <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
</ul>

<h2>2. Hizmetin Niteli?i</h2>
<p><strong>amigurumirem.com</strong> bir rn vitrini sunar; bu sitede do?rudan deme al?nmaz. Haz?r koleksiyon rnlerinin sat?n alma, deme, fatura ve kargo sreleri <strong>Instagram</strong> zerinden yrtlr. zel sipari? talepleri e-posta, WhatsApp veya Instagram mesaj? ile al?nabilir.</p>

<h2>3. ??lenen Ki?isel Veri Kategorileri</h2>
<ul>
<li><strong>Kimlik ve ileti?im:</strong> Ad-soyad, e-posta adresi, telefon numaras? (bizimle ileti?ime gemeniz hlinde).</li>
<li><strong>Sipari? ve zel sipari?:</strong> Figr tercihi, karakter renk paleti, l, notlar, referans numaras?.</li>
<li><strong>??lem gvenli?i:</strong> IP adresi, taray?c? ve cihaz bilgisi, oturum loglar?, eri?im tarihi/saati.</li>
<li><strong>erez verileri:</strong> Zorunlu erezler; analitik erezler yaln?zca a?k r?zan?z ile.</li>
<li><strong>Pazarlama:</strong> Blten e-posta adresi (yaln?zca abone olman?z hlinde).</li>
</ul>
<p>Instagram zerinden tamamlanan al??veri?lerde deme kart?, teslimat adresi ve sipari? gemi?i verileri Instagram taraf?ndan ayr? bir veri sorumlusu olarak i?lenir.</p>

<h2>4. ??leme Amalar?</h2>
<ul>
<li>Web sitesinin gvenli, h?zl? ve kesintisiz sunulmas?</li>
<li>?leti?im taleplerinin ve zel sipari? ba?vurular?n?n de?erlendirilmesi</li>
<li>Sipari? srecinin yrtlmesi ve m?teri deste?i</li>
<li>Blten gnderimi (a?k onay?n?z dahilinde)</li>
<li>Mevzuattan kaynaklanan ykmllklerin yerine getirilmesi</li>
<li>Haklar?n tesisi, kullan?lmas? veya korunmas?</li>
<li>Hizmet kalitesinin llmesi ve iyile?tirilmesi (anonimle?tirilmi? analitik)</li>
</ul>

<h2>5. Hukuki Sebepler</h2>
<p>Ki?isel verileriniz KVKK md. 5 kapsam?nda; bir szle?menin kurulmas? veya ifas?, hukuki ykmllk, ilgili ki?inin temel hak ve zgrlklerine zarar vermemek kayd?yla veri sorumlusunun me?ru menfaati ve a?k r?zan?z (analitik erezler, blten) hukuki sebeplerine dayan?larak i?lenebilir.</p>

<h2>6. Aktar?m ve Al?c? Gruplar?</h2>
<p>Verileriniz; bar?nd?rma (hosting) sa?lay?c?lar?, e-posta hizmeti sa?lay?c?lar?, analitik ara sa?lay?c?lar? (yaln?zca r?za ile), kargo/lojistik i? ortaklar? (sipari? teslimat?nda), hukuk dan??manlar? ve yasal zorunluluk hlinde yetkili kamu kurumlar? ile payla??labilir. Yurt d???na aktar?m sz konusu olursa KVKK md. 9 hkmlerine uyulur.</p>

<h2>7. Saklama Sreleri</h2>
<p>Veriler, i?leme amac? iin gerekli sre boyunca ve ilgili mevzuattaki zamana??m? sreleri kadar saklan?r; sre sonunda silinir, yok edilir veya anonim hale getirilir. zel sipari? yaz??malar? genellikle son i?lemden itibaren <strong>3 y?l</strong>; blten kay?tlar? abonelik sresince saklan?r.</p>

<h2>8. KVKK Kapsam?ndaki Haklar?n?z</h2>
<p>KVKK md. 11 uyar?nca; verilerinizin i?lenip i?lenmedi?ini ?renme, bilgi talep etme, i?lenme amac?n? ?renme, yurt ii/yurt d??? aktar?lan nc ki?ileri bilme, eksik veya yanl?? i?lenmi?se dzeltilmesini isteme, silinmesini veya yok edilmesini isteme, otomatik sistemlerle analiz sonucuna itiraz etme ve kanuna ayk?r? i?leme nedeniyle zarara u?raman?z hlinde tazminat talep etme haklar?na sahipsiniz.</p>
<p>Ba?vurular?n?z? <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> adresine iletebilirsiniz. Ba?vurular cretsiz olarak en ge <strong>30 gn</strong> iinde sonuland?r?l?r.</p>

<h2>9. erezler</h2>
<p>Zorunlu erezler site i?levselli?i iin gereklidir. Analitik erezler yaln?zca erez banner zerinden onay vermeniz hlinde kullan?l?r. Tercihlerinizi banner veya taray?c? ayarlar?ndan de?i?tirebilirsiniz.</p>

<h2>10. ocuklar?n Gizlili?i</h2>
<p>Sitemiz 18 ya? alt?ndaki ki?ilerden bilerek ki?isel veri toplamaz. Ebeveyn veya veli iseniz ve ocu?unuza ait veri i?lendi?ini d?nyorsan?z bizimle ileti?ime gein.</p>

<h2>11. Gvenlik</h2>
<p>Ki?isel verilerin korunmas? iin uygun teknik ve idari tedbirler uygulanmaktad?r; ancak internet zerinden iletimin tamamen risksiz oldu?u garanti edilemez.</p>

<h2>12. Politika De?i?iklikleri</h2>
<p>Bu politika gncellenebilir. Gncel srm bu sayfada yay?mlan?r; nemli de?i?ikliklerde "son gncelleme" tarihi revize edilir.</p>

<p class="legal-content__notice">Bu metin bilgilendirme amal?d?r. zel durumunuz iin hukuk dan??man?na ba?vurman?z nerilir.</p>`;

const LEGAL_RETURNS_TR = `<p>Bu ?ptal ve ?ade Ko?ullar?, <strong>Amigurumirem</strong> el yap?m? amigurumi rnlerine ili?kin iptal, iade, cayma hakk? ve m?teri destek srelerini a?klar. Ltfen bu metni, <strong>amigurumirem.com</strong> zerindeki bilgilerle ve <strong>Instagram</strong> platform ko?ullar?yla birlikte okuyunuz.</p>

<h2>1. Genel Bilgilendirme</h2>
<p><strong>amigurumirem.com</strong> rn vitrini sunar; bu sitede deme al?nmaz. Haz?r koleksiyon rnlerinin sat???, demesi ve kargosu <strong>Instagram</strong> zerinden yap?l?r. ?ade ve iptal ba?vurular? ncelikle Instagram sipari? sreleri zerinden ynetilir; atlyemiz retim kalitesi, paketleme ve m?teri ileti?iminden sorumludur.</p>

<h2>2. Sat?c? ?leti?im</h2>
<ul>
<li><strong>Marka:</strong> Amigurumirem</li>
<li><strong>E-posta:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Instagram:</strong> <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
</ul>

<h2>3. Haz?r Koleksiyon rnleri  14 Gnlk Cayma Hakk?</h2>
<p>6502 say?l? Tketicinin Korunmas? Hakk?nda Kanun ve Mesafeli Szle?meler Ynetmeli?i kapsam?nda, haz?r koleksiyon rnlerinde teslimattan itibaren <strong>14 gn</strong> iinde herhangi bir gereke gstermeksizin cayma hakk?na sahipsiniz (ki?iye zel retilen rnler hari).</p>
<ul>
<li>?ade srecini Instagram hesab?n?zdan veya sat?c? ileti?im kanallar?ndan ba?lat?n.</li>
<li>rn kullan?lmam??, hasars?z ve mmknse orijinal ambalaj?nda olmal?d?r.</li>
<li>?ade kargo sreci Instagram ve kargo firmas? kurallar?na tabidir.</li>
<li>deme iadesi Instagram prosedrleriyle yap?l?r; sre bankan?za gre de?i?ebilir.</li>
</ul>

<h2>4. Ki?iselle?tirilmi? ve zel Sipari? rnleri</h2>
<p>Mesafeli Szle?meler Ynetmeli?i md. 15 uyar?nca, <strong>tketicinin seim veya istekleri do?rultusunda ki?iselle?tirilen</strong> mallarda cayma hakk? kullan?lamaz.</p>
<p>Buna ?unlar dahildir:</p>
<ul>
<li>zel sipari? sihirbaz? ile talep edilen figr, karakter renk paleti, l veya isim nak???</li>
<li>retime ba?lanm?? zel tasar?m sipari?ler</li>
<li>Ki?iye zel hediye notu veya ambalaj talebiyle retilen paralar</li>
</ul>
<p>zel sipari? onay?ndan sonra iptal genellikle mmkn de?ildir; retim ba?lamadan nce yaz?l? olarak sorabilirsiniz.</p>

<h2>5. Hasarl? veya Eksik Teslimat</h2>
<p>rn hasarl? veya eksik geldiyse teslimattan itibaren <strong>48 saat</strong> iinde foto?raf ve sipari? bilgisiyle bildirin. Instagram zerinden veya <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> adresinden bize ula?abilirsiniz. Uygun hllerde yeniden retim, de?i?im veya iade de?erlendirilir.</p>

<h2>6. Sipari? ?ptali (Kargoya Verilmeden)</h2>
<p>Instagram zerinden verilen ve henz kargoya verilmemi? standart sipari?ler, platform kurallar? erevesinde iptal edilebilir.</p>

<h2>7. De?i?im</h2>
<p>Do?rudan de?i?im hizmeti sunulmamaktad?r. Uygun rnlerde iade sonras? yeni sipari? verebilirsiniz.</p>

<h2>8. zel Sipari? demeleri</h2>
<p>Atlyemizle do?rudan yap?lan zel sipari?lerde deme ve iade ko?ullar? sipari? onay?nda yaz?l? olarak payla??l?r.</p>

<h2>9. Fiyatlar ve Gncellemeler</h2>
<p>Vitrinde grnen fiyatlar bilgilendirme amal?d?r; gncel sat?? fiyat? Instagram rn sayfas?nda geerlidir. El eme?i, iplik maliyeti ve i?ilik sresine gre fiyatlar gncellenebilir.</p>

<h2>10. ?leti?im</h2>
<p>?ade ve iptal sorular?n?z iin: <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></p>

<p class="legal-content__notice">Gncel ko?ullar iin ilgili Instagram gnderisi ve platform ?artlar?n? da inceleyiniz.</p>`;

const LEGAL_PRIVACY_EN = `<p>This Privacy Policy explains how <strong>Amigurumirem</strong> ("we", "us") collects and uses personal data when you visit <strong>amigurumirem.com</strong>. We are a handmade amigurumi studio based in Trkiye. This website is a product showcase; checkout for collection items is completed on <strong>Instagram</strong>.</p>

<h2>1. Data Controller</h2>
<ul>
<li><strong>Brand:</strong> Amigurumirem</li>
<li><strong>Email:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Website:</strong> <a href="https://www.amigurumirem.com/">amigurumirem.com</a></li>
<li><strong>Contact:</strong> <a href="index.html#contact">Contact section</a>  <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
</ul>

<h2>2. What This Website Does</h2>
<p><strong>amigurumirem.com</strong> displays our handmade crochet collection. We do not process card payments on this site. Ready-made purchases are completed on Instagram. Custom order requests may be sent by email, WhatsApp, or Instagram message.</p>

<h2>3. Personal Data We Process</h2>
<ul>
<li><strong>Identity and contact:</strong> Name, email, phone (when you contact us).</li>
<li><strong>Orders and custom requests:</strong> Figure choice, character colour palette, size, notes, reference number.</li>
<li><strong>Security logs:</strong> IP address, browser/device data, access timestamps.</li>
<li><strong>Cookies:</strong> Essential cookies; analytics cookies only with your consent.</li>
<li><strong>Marketing:</strong> Newsletter email (only if you subscribe).</li>
</ul>

<h2>4. Purposes and Legal Bases</h2>
<p>We process data to operate the website securely, respond to enquiries, fulfil orders, send newsletters (with consent), comply with law, and improve our service under applicable Turkish data protection rules including KVKK.</p>

<h2>5. Recipients and Transfers</h2>
<p>Data may be shared with hosting, email, analytics (with consent), shipping partners, legal advisers, and authorities when required. International transfers follow KVKK Article 9 safeguards.</p>

<h2>6. Retention</h2>
<p>Data is kept only as long as necessary for the stated purpose and legal retention periods. Custom order correspondence is typically retained for <strong>3 years</strong> after the last interaction.</p>

<h2>7. Your Rights</h2>
<p>Under KVKK you may request information, correction, deletion, objection to automated processing, and compensation where applicable. Contact <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a>. We respond within <strong>30 days</strong>.</p>

<h2>8. Cookies and Children</h2>
<p>Essential cookies are required for site function. Analytics cookies are optional. We do not knowingly collect data from children under 18.</p>

<h2>9. Security and Updates</h2>
<p>We apply appropriate technical and organisational measures. This policy may be updated; the current version is always published on this page.</p>

<p class="legal-content__notice">This text is for information only. Seek legal advice for your specific situation.</p>`;

const LEGAL_RETURNS_EN = `<p>This Returns and Cancellation Policy explains how returns, refunds, and cancellations work for <strong>Amigurumirem</strong> handmade amigurumi products. Please read it together with <strong>amigurumirem.com</strong> information and <strong>Instagram</strong> terms.</p>

<h2>1. Overview</h2>
<p><strong>amigurumirem.com</strong> is a showcase site with no checkout. Ready-made items are sold, paid for, and shipped through <strong>Instagram</strong>. Custom studio orders may have separate written terms.</p>

<h2>2. Contact</h2>
<ul>
<li><strong>Email:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Instagram:</strong> <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
</ul>

<h2>3. Ready-Made Items  14-Day Withdrawal</h2>
<p>For standard ready-made collection items, consumers generally have a <strong>14-day right of withdrawal</strong> from delivery under Turkish consumer law (excluding personalised goods).</p>
<ul>
<li>Start the return via Instagram or by contacting us.</li>
<li>Items should be unused, undamaged, and in original packaging where possible.</li>
<li>Refunds follow Instagram procedures; timing depends on your bank.</li>
</ul>

<h2>4. Custom and Personalised Orders</h2>
<p>Made-to-order pieces  including wizard requests with figure, character colours, size, or name embroidery  are excluded from the standard withdrawal right once production is agreed.</p>

<h2>5. Damaged or Missing Deliveries</h2>
<p>Report damage or missing items within <strong>48 hours</strong> with photos to <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> or via Instagram.</p>

<h2>6. Cancellations Before Shipping</h2>
<p>Unshipped Instagram orders may be cancelled under platform rules.</p>

<h2>7. Exchanges and Pricing</h2>
<p>We do not offer direct exchanges. Prices shown on the showcase are indicative; the Instagram listing price applies at purchase.</p>

<h2>8. Questions</h2>
<p>Email <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> for returns and cancellation support.</p>

<p class="legal-content__notice">Also review the relevant Instagram post and platform terms before purchasing.</p>`;

function escapeJsonString(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function updatePrices(file, prices) {
  let text = fs.readFileSync(file, "utf8");
  for (const [slug, price] of Object.entries(prices)) {
    text = text.replace(
      new RegExp(`("${slug}":\\s*\\{[\\s\\S]*?"price":\\s*")[^"]+(")`),
      `$1${price}$2`
    );
  }
  fs.writeFileSync(file, text, "utf8");
  console.log("prices", path.basename(file));
}

function injectPalette(file, paletteObj, lang) {
  let text = fs.readFileSync(file, "utf8");
  const figJson = JSON.stringify(paletteObj.fig, null, 2).replace(/^/gm, "    ");
  if (text.includes('"fig":')) {
    text = text.replace(/"fig":\s*\{[\s\S]*?\n    \}/, `"fig": ${figJson.trim()}`);
  } else {
    text = text.replace(
      /"white": "[^"]+"\n  \},/,
      `"white": "${lang === "tr" ? "Beyaz" : "White"}"\n  },\n  "fig": ${JSON.stringify(paletteObj.fig, null, 2).replace(/^/gm, "  ").trim().replace(/^  /, "")}`
    );
    // fallback: insert after palette block
    text = text.replace(
      /("palette":\s*\{[\s\S]*?"white":\s*"[^"]+")\s*\}/,
      `$1,\n    "fig": ${JSON.stringify(paletteObj.fig).slice(1, -1)}}`
    );
  }
  fs.writeFileSync(file, text, "utf8");
  console.log("palette", path.basename(file));
}

function updateLegal(file, privacy, returns) {
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(
    /"body": "<p>Bu metin[\s\S]*?legal-content__notice">[^<]+<\/p>"/,
    `"body": "${escapeJsonString(privacy)}"`
  );
  text = text.replace(
    /"body": "<p>Bu sayfa[\s\S]*?legal-content__notice">[^<]+<\/p>"/,
    `"body": "${escapeJsonString(returns)}"`
  );
  text = text.replace(
    /"body": "<p>This Privacy Policy[\s\S]*?legal-content__notice">[^<]+<\/p>"/,
    `"body": "${escapeJsonString(privacy)}"`
  );
  text = text.replace(
    /"body": "<p>This Returns and Cancellation[\s\S]*?legal-content__notice">[^<]+<\/p>"/,
    `"body": "${escapeJsonString(returns)}"`
  );
  text = text.replaceAll("amigura.com", "amigurumirem.com");
  fs.writeFileSync(file, text, "utf8");
  console.log("legal", path.basename(file));
}

function patchWizardStrings(file, lang) {
  let text = fs.readFileSync(file, "utf8");
  if (lang === "tr") {
    text = text.replace(
      '"colorLead": "En fazla 3 renk seebilirsiniz."',
      '"colorLead": "Genel renk paletinden en fazla 4 ton seebilirsiniz.",\n    "colorTitleCharacter": "{figure}  karakter renkleri",\n    "colorLeadCharacter": "{figure} iin zgn karakter tonlar?. Vurgulamak istedi?iniz renkleri sein (en fazla 4)."'
    );
    if (!text.includes("colorTitleCharacter")) {
      text = text.replace(
        '"colorTitle": "Renk paletiniz",',
        '"colorTitle": "Renk paletiniz",\n    "colorTitleCharacter": "{figure}  karakter renkleri",\n    "colorLeadCharacter": "{figure} iin zgn karakter tonlar?. Vurgulamak istedi?iniz renkleri sein (en fazla 4).",'
      );
      text = text.replace(
        '"colorLead": "En fazla 3 renk seebilirsiniz."',
        '"colorLead": "Genel renk paletinden en fazla 4 ton seebilirsiniz."'
      );
    }
  } else {
    text = text.replace(
      '"colorLead": "Choose up to 3 colours."',
      '"colorLead": "Choose up to 4 tones from the general palette.",\n    "colorTitleCharacter": "{figure}  character colours",\n    "colorLeadCharacter": "Authentic tones for {figure}. Select the colours you want to emphasise (up to 4)."'
    );
    if (!text.includes("colorTitleCharacter")) {
      text = text.replace(
        '"colorTitle": "Your colour palette",',
        '"colorTitle": "Your colour palette",\n    "colorTitleCharacter": "{figure}  character colours",\n    "colorLeadCharacter": "Authentic tones for {figure}. Select the colours you want to emphasise (up to 4).",'
      );
      text = text.replace(
        /"colorLead": "[^"]+",/,
        '"colorLead": "Choose up to 4 tones from the general palette.",'
      );
    }
  }
  fs.writeFileSync(file, text, "utf8");
  console.log("wizard strings", path.basename(file));
}

function addPaletteFig(trFile, enFile) {
  let tr = fs.readFileSync(trFile, "utf8");
  let en = fs.readFileSync(enFile, "utf8");
  const trFig = JSON.stringify(PALETTE_TR.fig, null, 4).replace(/^/gm, "    ");
  const enFig = JSON.stringify(PALETTE_EN.fig, null, 4).replace(/^/gm, "    ");
  if (!tr.includes('"fig":')) {
    tr = tr.replace(/"white": "Beyaz"\n  \},/, `"white": "Beyaz",\n    "fig": ${JSON.stringify(PALETTE_TR.fig, null, 4).replace(/^/gm, "    ").trim()}\n  },`);
  }
  if (!en.includes('"fig":')) {
    en = en.replace(/"white": "White"\n  \},/, `"white": "White",\n    "fig": ${JSON.stringify(PALETTE_EN.fig, null, 4).replace(/^/gm, "    ").trim()}\n  },`);
  }
  fs.writeFileSync(trFile, tr, "utf8");
  fs.writeFileSync(enFile, en, "utf8");
  console.log("palette fig blocks added");
}

const trFile = path.join(root, "js/locales/tr.js");
const enFile = path.join(root, "js/locales/en.js");

updatePrices(trFile, PRICES_TR);
updatePrices(enFile, PRICES_EN);
addPaletteFig(trFile, enFile);
updateLegal(trFile, LEGAL_PRIVACY_TR, LEGAL_RETURNS_TR);
updateLegal(enFile, LEGAL_PRIVACY_EN, LEGAL_RETURNS_EN);
patchWizardStrings(trFile, "tr");
patchWizardStrings(enFile, "en");

const htmlFiles = ["index.html", "urun.html", "kvkk-gizlilik.html", "iade-sartlari.html", "tesekkur.html", "ozel-siparis.html"];
for (const f of htmlFiles) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  let t = fs.readFileSync(p, "utf8");
  const b = t;
  t = t.replaceAll("https://www.amigura.com", "https://www.amigurumirem.com");
  t = t.replaceAll("amigura.com", "amigurumirem.com");
  if (t !== b) {
    fs.writeFileSync(p, t, "utf8");
    console.log("domain", f);
  }
}

let sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
sitemap = sitemap.replaceAll("https://www.amigura.com", "https://www.amigurumirem.com");
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log("sitemap");

let schema = fs.readFileSync(path.join(root, "js/schema-org.js"), "utf8");
schema = schema.replaceAll("https://www.amigura.com", "https://www.amigurumirem.com");
fs.writeFileSync(path.join(root, "js/schema-org.js"), schema, "utf8");
console.log("schema");

let ci = fs.readFileSync(path.join(root, ".github/workflows/ci.yml"), "utf8");
ci = ci.replace("amigura\\.com", "amigurumirem\\.com");
fs.writeFileSync(path.join(root, ".github/workflows/ci.yml"), ci, "utf8");
console.log("ci");
