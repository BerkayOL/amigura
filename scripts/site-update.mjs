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
    elsa: { iceBlue: "Buz mavisi", snow: "Kar beyaz?", silver: "Gümü?", blonde: "Sar? saç", cape: "Mor pelerin" },
    olaf: { snow: "Kar beyaz?", coal: "Kömür siyah?", carrot: "Havuç turuncu", stick: "Dal kahverengi" },
    moana: { redTop: "K?rm?z? üst", skirt: "Çimen ye?ili", hair: "Kahverengi saç", skin: "Ten rengi", teal: "Turkuaz" },
    maui: { skin: "Ten rengi", hair: "Siyah saç", red: "K?rm?z? örtü", leaf: "Yaprak ye?ili", tattoo: "Dövme kahvesi" },
    harryPotter: { hair: "Siyah saç", skin: "Ten rengi", scarfRed: "Gryffindor k?rm?z?", scarfGold: "Gryffindor alt?n", robe: "Siyah cübbe", shirt: "Krem gömlek" },
    hermione: { hair: "Kahverengi saç", skin: "Ten rengi", tieRed: "Kravat k?rm?z?", tieGold: "Kravat alt?n", robe: "Siyah cübbe" },
    malefiz: { black: "Siyah", purple: "Mor", green: "Zümrüt ye?ili", skin: "Soluk ten", gold: "Alt?n detay" },
    ronald: { hair: "Turuncu saç", skin: "Ten rengi", scarfRed: "Gryffindor k?rm?z?", scarfGold: "Gryffindor alt?n", robe: "Siyah cübbe" },
    wednesday: { dress: "Siyah elbise", collar: "Beyaz yaka", hair: "Siyah saç", skin: "Soluk ten" },
    thing: { skin: "Ten rengi", nails: "Siyah t?rnak", highlight: "Gölge tonu" },
    pugsleyAddams: { red: "K?rm?z? çizgi", black: "Siyah çizgi", skin: "Soluk ten", hair: "Koyu saç" },
    enidSinclair: { yellow: "Sar?", lavender: "Eflatun", pink: "Pembe", brown: "Kahverengi", black: "Siyah" },
    kuromi: { black: "Siyah", pink: "Pembe", white: "Beyaz", purple: "Mor" },
    myMelody: { white: "Beyaz", hood: "Pembe kapü?on", nose: "Sar? burun", pink: "Pembe" },
    sonicBlue: { blue: "Sonic mavisi", skin: "Ten rengi", shoes: "K?rm?z? ayakkab?", gloves: "Beyaz eldiven", eyes: "Siyah göz" },
    sonicRed: { red: "K?rm?z?", skin: "Ten rengi", gloves: "Beyaz eldiven", eyes: "Siyah göz" },
    sonicBlack: { black: "Siyah", skin: "Ten rengi", shoes: "K?rm?z? ayakkab?", gloves: "Beyaz eldiven" },
    tails: { orange: "Turuncu tüy", chest: "Beyaz gö?üs", shoes: "Kahverengi ayakkab?", eyes: "Mavi göz", detail: "Siyah detay" },
    lolSurpriseDoll: { hotPink: "Fu?ya", purple: "Mor", turquoise: "Turkuaz", gold: "Alt?n", white: "Beyaz" },
    crossbodyPaperBag: { kraft: "Kraft kahve", cream: "Krem", strap: "Kahverengi ask?", black: "Siyah detay" },
    lavenderClutch: { lavender: "Eflatun", lilac: "Lila", silver: "Gümü?", cream: "Krem" },
    nostalgicPhoneBlue: { body: "Retro mavi", dial: "Krem disk", accent: "K?rm?z? aksan", black: "Siyah" },
    nostalgicPhonePink: { body: "Retro pembe", dial: "Krem disk", accent: "K?rm?z? aksan", white: "Beyaz" },
    nostalgicPhoneOrange: { body: "Retro turuncu", dial: "Krem disk", brown: "Kahverengi", black: "Siyah" },
    fruitSet: { apple: "Elma k?rm?z?s?", banana: "Muz sar?s?", grape: "Üzüm moru", leaf: "Yaprak ye?ili", orange: "Portakal" },
    vegetableSet: { tomato: "Domates k?rm?z?s?", carrot: "Havuç turuncu", broccoli: "Brokoli ye?ili", eggplant: "Patl?can moru", corn: "M?s?r sar?s?" },
    trexDinosaur: { green: "Orman ye?ili", belly: "Aç?k ye?il kar?n", teeth: "Beyaz di?", eyes: "Siyah göz", tongue: "K?rm?z? dil" },
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

const LEGAL_PRIVACY_TR = `<p>Bu Ki?isel Verilerin Korunmas? ve Gizlilik Politikas? ("Politika"), <strong>Amigurumirem</strong> el yap?m? amigurumi atölyesi taraf?ndan i?letilen <strong>amigurumirem.com</strong> vitrin web sitesi kapsam?nda, 6698 say?l? Ki?isel Verilerin Korunmas? Kanunu ("KVKK") ve ilgili ikincil mevzuat uyar?nca ki?isel verilerinizin i?lenmesine ili?kin sizi bilgilendirmek amac?yla haz?rlanm??t?r.</p>

<h2>1. Veri Sorumlusu</h2>
<p>KVKK kapsam?nda veri sorumlusu:</p>
<ul>
<li><strong>Ticari unvan / marka:</strong> Amigurumirem</li>
<li><strong>E-posta:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Web sitesi:</strong> <a href="https://www.amigurumirem.com/">amigurumirem.com</a></li>
<li><strong>?leti?im:</strong> <a href="index.html#contact">?leti?im bölümü</a> · <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
</ul>

<h2>2. Hizmetin Niteli?i</h2>
<p><strong>amigurumirem.com</strong> bir ürün vitrini sunar; bu sitede do?rudan ödeme al?nmaz. Haz?r koleksiyon ürünlerinin sat?n alma, ödeme, fatura ve kargo süreçleri <strong>Instagram</strong> üzerinden yürütülür. Özel sipari? talepleri e-posta, WhatsApp veya Instagram mesaj? ile al?nabilir.</p>

<h2>3. ??lenen Ki?isel Veri Kategorileri</h2>
<ul>
<li><strong>Kimlik ve ileti?im:</strong> Ad-soyad, e-posta adresi, telefon numaras? (bizimle ileti?ime geçmeniz hâlinde).</li>
<li><strong>Sipari? ve özel sipari?:</strong> Figür tercihi, karakter renk paleti, ölçü, notlar, referans numaras?.</li>
<li><strong>??lem güvenli?i:</strong> IP adresi, taray?c? ve cihaz bilgisi, oturum loglar?, eri?im tarihi/saati.</li>
<li><strong>Çerez verileri:</strong> Zorunlu çerezler; analitik çerezler yaln?zca aç?k r?zan?z ile.</li>
<li><strong>Pazarlama:</strong> Bülten e-posta adresi (yaln?zca abone olman?z hâlinde).</li>
</ul>
<p>Instagram üzerinden tamamlanan al??veri?lerde ödeme kart?, teslimat adresi ve sipari? geçmi?i verileri Instagram taraf?ndan ayr? bir veri sorumlusu olarak i?lenir.</p>

<h2>4. ??leme Amaçlar?</h2>
<ul>
<li>Web sitesinin güvenli, h?zl? ve kesintisiz sunulmas?</li>
<li>?leti?im taleplerinin ve özel sipari? ba?vurular?n?n de?erlendirilmesi</li>
<li>Sipari? sürecinin yürütülmesi ve mü?teri deste?i</li>
<li>Bülten gönderimi (aç?k onay?n?z dahilinde)</li>
<li>Mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi</li>
<li>Haklar?n tesisi, kullan?lmas? veya korunmas?</li>
<li>Hizmet kalitesinin ölçülmesi ve iyile?tirilmesi (anonimle?tirilmi? analitik)</li>
</ul>

<h2>5. Hukuki Sebepler</h2>
<p>Ki?isel verileriniz KVKK md. 5 kapsam?nda; bir sözle?menin kurulmas? veya ifas?, hukuki yükümlülük, ilgili ki?inin temel hak ve özgürlüklerine zarar vermemek kayd?yla veri sorumlusunun me?ru menfaati ve aç?k r?zan?z (analitik çerezler, bülten) hukuki sebeplerine dayan?larak i?lenebilir.</p>

<h2>6. Aktar?m ve Al?c? Gruplar?</h2>
<p>Verileriniz; bar?nd?rma (hosting) sa?lay?c?lar?, e-posta hizmeti sa?lay?c?lar?, analitik araç sa?lay?c?lar? (yaln?zca r?za ile), kargo/lojistik i? ortaklar? (sipari? teslimat?nda), hukuk dan??manlar? ve yasal zorunluluk hâlinde yetkili kamu kurumlar? ile payla??labilir. Yurt d???na aktar?m söz konusu olursa KVKK md. 9 hükümlerine uyulur.</p>

<h2>7. Saklama Süreleri</h2>
<p>Veriler, i?leme amac? için gerekli süre boyunca ve ilgili mevzuattaki zamana??m? süreleri kadar saklan?r; süre sonunda silinir, yok edilir veya anonim hale getirilir. Özel sipari? yaz??malar? genellikle son i?lemden itibaren <strong>3 y?l</strong>; bülten kay?tlar? abonelik süresince saklan?r.</p>

<h2>8. KVKK Kapsam?ndaki Haklar?n?z</h2>
<p>KVKK md. 11 uyar?nca; verilerinizin i?lenip i?lenmedi?ini ö?renme, bilgi talep etme, i?lenme amac?n? ö?renme, yurt içi/yurt d??? aktar?lan üçüncü ki?ileri bilme, eksik veya yanl?? i?lenmi?se düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, otomatik sistemlerle analiz sonucuna itiraz etme ve kanuna ayk?r? i?leme nedeniyle zarara u?raman?z hâlinde tazminat talep etme haklar?na sahipsiniz.</p>
<p>Ba?vurular?n?z? <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> adresine iletebilirsiniz. Ba?vurular ücretsiz olarak en geç <strong>30 gün</strong> içinde sonuçland?r?l?r.</p>

<h2>9. Çerezler</h2>
<p>Zorunlu çerezler site i?levselli?i için gereklidir. Analitik çerezler yaln?zca çerez banner üzerinden onay vermeniz hâlinde kullan?l?r. Tercihlerinizi banner veya taray?c? ayarlar?ndan de?i?tirebilirsiniz.</p>

<h2>10. Çocuklar?n Gizlili?i</h2>
<p>Sitemiz 18 ya? alt?ndaki ki?ilerden bilerek ki?isel veri toplamaz. Ebeveyn veya veli iseniz ve çocu?unuza ait veri i?lendi?ini dü?ünüyorsan?z bizimle ileti?ime geçin.</p>

<h2>11. Güvenlik</h2>
<p>Ki?isel verilerin korunmas? için uygun teknik ve idari tedbirler uygulanmaktad?r; ancak internet üzerinden iletimin tamamen risksiz oldu?u garanti edilemez.</p>

<h2>12. Politika De?i?iklikleri</h2>
<p>Bu politika güncellenebilir. Güncel sürüm bu sayfada yay?mlan?r; önemli de?i?ikliklerde "son güncelleme" tarihi revize edilir.</p>

<p class="legal-content__notice">Bu metin bilgilendirme amaçl?d?r. Özel durumunuz için hukuk dan??man?na ba?vurman?z önerilir.</p>`;

const LEGAL_RETURNS_TR = `<p>Bu ?ptal ve ?ade Ko?ullar?, <strong>Amigurumirem</strong> el yap?m? amigurumi ürünlerine ili?kin iptal, iade, cayma hakk? ve mü?teri destek süreçlerini aç?klar. Lütfen bu metni, <strong>amigurumirem.com</strong> üzerindeki bilgilerle ve <strong>Instagram</strong> platform ko?ullar?yla birlikte okuyunuz.</p>

<h2>1. Genel Bilgilendirme</h2>
<p><strong>amigurumirem.com</strong> ürün vitrini sunar; bu sitede ödeme al?nmaz. Haz?r koleksiyon ürünlerinin sat???, ödemesi ve kargosu <strong>Instagram</strong> üzerinden yap?l?r. ?ade ve iptal ba?vurular? öncelikle Instagram sipari? süreçleri üzerinden yönetilir; atölyemiz üretim kalitesi, paketleme ve mü?teri ileti?iminden sorumludur.</p>

<h2>2. Sat?c? ?leti?im</h2>
<ul>
<li><strong>Marka:</strong> Amigurumirem</li>
<li><strong>E-posta:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Instagram:</strong> <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
</ul>

<h2>3. Haz?r Koleksiyon Ürünleri — 14 Günlük Cayma Hakk?</h2>
<p>6502 say?l? Tüketicinin Korunmas? Hakk?nda Kanun ve Mesafeli Sözle?meler Yönetmeli?i kapsam?nda, haz?r koleksiyon ürünlerinde teslimattan itibaren <strong>14 gün</strong> içinde herhangi bir gerekçe göstermeksizin cayma hakk?na sahipsiniz (ki?iye özel üretilen ürünler hariç).</p>
<ul>
<li>?ade sürecini Instagram hesab?n?zdan veya sat?c? ileti?im kanallar?ndan ba?lat?n.</li>
<li>Ürün kullan?lmam??, hasars?z ve mümkünse orijinal ambalaj?nda olmal?d?r.</li>
<li>?ade kargo süreci Instagram ve kargo firmas? kurallar?na tabidir.</li>
<li>Ödeme iadesi Instagram prosedürleriyle yap?l?r; süre bankan?za göre de?i?ebilir.</li>
</ul>

<h2>4. Ki?iselle?tirilmi? ve Özel Sipari? Ürünleri</h2>
<p>Mesafeli Sözle?meler Yönetmeli?i md. 15 uyar?nca, <strong>tüketicinin seçim veya istekleri do?rultusunda ki?iselle?tirilen</strong> mallarda cayma hakk? kullan?lamaz.</p>
<p>Buna ?unlar dahildir:</p>
<ul>
<li>Özel sipari? sihirbaz? ile talep edilen figür, karakter renk paleti, ölçü veya isim nak???</li>
<li>Üretime ba?lanm?? özel tasar?m sipari?ler</li>
<li>Ki?iye özel hediye notu veya ambalaj talebiyle üretilen parçalar</li>
</ul>
<p>Özel sipari? onay?ndan sonra iptal genellikle mümkün de?ildir; üretim ba?lamadan önce yaz?l? olarak sorabilirsiniz.</p>

<h2>5. Hasarl? veya Eksik Teslimat</h2>
<p>Ürün hasarl? veya eksik geldiyse teslimattan itibaren <strong>48 saat</strong> içinde foto?raf ve sipari? bilgisiyle bildirin. Instagram üzerinden veya <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a> adresinden bize ula?abilirsiniz. Uygun hâllerde yeniden üretim, de?i?im veya iade de?erlendirilir.</p>

<h2>6. Sipari? ?ptali (Kargoya Verilmeden)</h2>
<p>Instagram üzerinden verilen ve henüz kargoya verilmemi? standart sipari?ler, platform kurallar? çerçevesinde iptal edilebilir.</p>

<h2>7. De?i?im</h2>
<p>Do?rudan de?i?im hizmeti sunulmamaktad?r. Uygun ürünlerde iade sonras? yeni sipari? verebilirsiniz.</p>

<h2>8. Özel Sipari? Ödemeleri</h2>
<p>Atölyemizle do?rudan yap?lan özel sipari?lerde ödeme ve iade ko?ullar? sipari? onay?nda yaz?l? olarak payla??l?r.</p>

<h2>9. Fiyatlar ve Güncellemeler</h2>
<p>Vitrinde görünen fiyatlar bilgilendirme amaçl?d?r; güncel sat?? fiyat? Instagram ürün sayfas?nda geçerlidir. El eme?i, iplik maliyeti ve i?çilik süresine göre fiyatlar güncellenebilir.</p>

<h2>10. ?leti?im</h2>
<p>?ade ve iptal sorular?n?z için: <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></p>

<p class="legal-content__notice">Güncel ko?ullar için ilgili Instagram gönderisi ve platform ?artlar?n? da inceleyiniz.</p>`;

const LEGAL_PRIVACY_EN = `<p>This Privacy Policy explains how <strong>Amigurumirem</strong> ("we", "us") collects and uses personal data when you visit <strong>amigurumirem.com</strong>. We are a handmade amigurumi studio based in Türkiye. This website is a product showcase; checkout for collection items is completed on <strong>Instagram</strong>.</p>

<h2>1. Data Controller</h2>
<ul>
<li><strong>Brand:</strong> Amigurumirem</li>
<li><strong>Email:</strong> <a href="mailto:calanguirem@gmail.com">calanguirem@gmail.com</a></li>
<li><strong>Website:</strong> <a href="https://www.amigurumirem.com/">amigurumirem.com</a></li>
<li><strong>Contact:</strong> <a href="index.html#contact">Contact section</a> · <a href="https://www.instagram.com/amigurumi__rem" target="_blank" rel="noopener noreferrer">@amigurumi__rem</a></li>
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

<h2>3. Ready-Made Items — 14-Day Withdrawal</h2>
<p>For standard ready-made collection items, consumers generally have a <strong>14-day right of withdrawal</strong> from delivery under Turkish consumer law (excluding personalised goods).</p>
<ul>
<li>Start the return via Instagram or by contacting us.</li>
<li>Items should be unused, undamaged, and in original packaging where possible.</li>
<li>Refunds follow Instagram procedures; timing depends on your bank.</li>
</ul>

<h2>4. Custom and Personalised Orders</h2>
<p>Made-to-order pieces — including wizard requests with figure, character colours, size, or name embroidery — are excluded from the standard withdrawal right once production is agreed.</p>

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
      '"colorLead": "En fazla 3 renk seçebilirsiniz."',
      '"colorLead": "Genel renk paletinden en fazla 4 ton seçebilirsiniz.",\n    "colorTitleCharacter": "{figure} — karakter renkleri",\n    "colorLeadCharacter": "{figure} için özgün karakter tonlar?. Vurgulamak istedi?iniz renkleri seçin (en fazla 4)."'
    );
    if (!text.includes("colorTitleCharacter")) {
      text = text.replace(
        '"colorTitle": "Renk paletiniz",',
        '"colorTitle": "Renk paletiniz",\n    "colorTitleCharacter": "{figure} — karakter renkleri",\n    "colorLeadCharacter": "{figure} için özgün karakter tonlar?. Vurgulamak istedi?iniz renkleri seçin (en fazla 4).",'
      );
      text = text.replace(
        '"colorLead": "En fazla 3 renk seçebilirsiniz."',
        '"colorLead": "Genel renk paletinden en fazla 4 ton seçebilirsiniz."'
      );
    }
  } else {
    text = text.replace(
      '"colorLead": "Choose up to 3 colours."',
      '"colorLead": "Choose up to 4 tones from the general palette.",\n    "colorTitleCharacter": "{figure} — character colours",\n    "colorLeadCharacter": "Authentic tones for {figure}. Select the colours you want to emphasise (up to 4)."'
    );
    if (!text.includes("colorTitleCharacter")) {
      text = text.replace(
        '"colorTitle": "Your colour palette",',
        '"colorTitle": "Your colour palette",\n    "colorTitleCharacter": "{figure} — character colours",\n    "colorLeadCharacter": "Authentic tones for {figure}. Select the colours you want to emphasise (up to 4).",'
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
