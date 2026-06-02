import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const legalDir = path.join(root, "legal");

const privacyTr = `<p>Bu metin, <strong>Amigura</strong> taraf\u0131ndan i\u015fletilen <strong>amigura.com</strong> vitrin sitesi kapsam\u0131nda, 6698 say\u0131l\u0131 Ki\u015fisel Verilerin Korunmas\u0131 Kanunu (KVKK) ve ilgili mevzuat uyar\u0131nca ki\u015fisel verilerinizin i\u015flenmesine ili\u015fkin sizi bilgilendirmek amac\u0131yla haz\u0131rlanm\u0131\u015ft\u0131r.</p>

<h2>1. Veri Sorumlusu</h2>
<p>KVKK kapsam\u0131nda veri sorumlusu <strong>Amigura</strong> olup ileti\u015fim bilgilerimiz a\u015fa\u011f\u0131dad\u0131r:</p>
<ul>
<li><strong>E-posta:</strong> <a href="mailto:hello@amigura.com">hello@amigura.com</a></li>
<li><strong>Web:</strong> <a href="index.html#contact">\u0130leti\u015fim b\u00f6l\u00fcm\u00fc</a></li>
</ul>

<h2>2. Hizmetin Niteli\u011fi</h2>
<p>amigura.com bir \u00fcr\u00fcn vitrini sunar; do\u011frudan \u00f6deme almaz. Koleksiyon \u00fcr\u00fcnleri i\u00e7in sat\u0131n alma, \u00f6deme, fatura ve teslimat i\u015flemleri <strong>Trendyol</strong> platformu \u00fczerinden ger\u00e7ekle\u015ftirilir. \u00d6zel sipari\u015f talepleri e-posta veya WhatsApp ile al\u0131nabilir.</p>

<h2>3. \u0130\u015flenen Ki\u015fisel Veriler</h2>
<ul>
<li><strong>Kimlik ve ileti\u015fim:</strong> Ad-soyad, e-posta adresi, telefon (siz ileti\u015fim kurarsan\u0131z).</li>
<li><strong>Sipari\u015f ve \u00f6zel sipari\u015f:</strong> Fig\u00fcr tercihleri, renk, \u00f6l\u00e7\u00fc, notlar (\u00f6zel sipari\u015f formu veya mesajlar\u0131n\u0131zda).</li>
<li><strong>\u0130\u015flem g\u00fcvenli\u011fi:</strong> IP adresi, taray\u0131c\u0131 ve cihaz bilgisi, eri\u015fim tarihi/saati, log kay\u0131tlar\u0131.</li>
<li><strong>\u00c7erezler:</strong> Zorunlu \u00e7erezler; analitik \u00e7erezler yaln\u0131zca a\u00e7\u0131k r\u0131zan\u0131z ile.</li>
<li><strong>B\u00fclten:</strong> E-posta adresi (abone olman\u0131z h\u00e2linde).</li>
</ul>
<p>Trendyol \u00fczerinden yap\u0131lan al\u0131\u015fveri\u015flerde \u00f6deme kart\u0131, teslimat adresi ve sipari\u015f ge\u00e7mi\u015fi verileri Trendyol taraf\u0131ndan i\u015flenir; bu verilere do\u011frudan eri\u015fimimiz s\u0131n\u0131rl\u0131d\u0131r.</p>

<h2>4. \u0130\u015fleme Ama\u00e7lar\u0131</h2>
<ul>
<li>Web sitesinin g\u00fcvenli ve istikrarl\u0131 sunulmas\u0131,</li>
<li>\u0130leti\u015fim ve \u00f6zel sipari\u015f taleplerinin de\u011ferlendirilmesi,</li>
<li>B\u00fclten g\u00f6nderimi (onay\u0131n\u0131z dahilinde),</li>
<li>Yasal y\u00fck\u00fcml\u00fcl\u00fcklerin yerine getirilmesi,</li>
<li>Haklar\u0131n tesisi, kullan\u0131lmas\u0131 veya korunmas\u0131,</li>
<li>Hizmet kalitesinin \u00f6l\u00e7\u00fclmesi ve iyile\u015ftirilmesi (anonim/anla\u015fmal\u0131 analitik).</li>
</ul>

<h2>5. Hukuki Sebepler</h2>
<p>Ki\u015fisel verileriniz KVKK md. 5 kapsam\u0131nda; bir s\u00f6zle\u015fmenin kurulmas\u0131 veya ifas\u0131, hukuki y\u00fck\u00fcml\u00fcl\u00fck, ilgili ki\u015finin temel hak ve \u00f6zg\u00fcrl\u00fcklerine zarar vermemek kayd\u0131yla veri sorumlusunun me\u015fru menfaati ve a\u00e7\u0131k r\u0131zan\u0131z (\u00f6r. analitik \u00e7erezler, b\u00fclten) hukuki sebeplerine dayan\u0131larak i\u015flenebilir.</p>

<h2>6. Aktar\u0131m ve Al\u0131c\u0131lar</h2>
<p>Verileriniz; bar\u0131nd\u0131rma (hosting), e-posta hizmeti sa\u011flay\u0131c\u0131lar\u0131, analitik ara\u00e7 sa\u011flay\u0131c\u0131lar\u0131 (r\u0131za ile), hukuki dan\u0131\u015fmanlar ve yasal zorunluluk h\u00e2linde yetkili kamu kurumlar\u0131 ile payla\u015f\u0131labilir. Yurt d\u0131\u015f\u0131na aktar\u0131m s\u00f6z konusu olursa KVKK md. 9 h\u00fck\u00fcmlerine uyulur.</p>

<h2>7. Saklama S\u00fcreleri</h2>
<p>Veriler, i\u015fleme amac\u0131 i\u00e7in gerekli s\u00fcre boyunca ve ilgili mevzuattaki zamana\u015f\u0131m\u0131 s\u00fcreleri kadar saklan\u0131r; s\u00fcre sonunda silinir, yok edilir veya anonim hale getirilir.</p>

<h2>8. KVKK Kapsam\u0131ndaki Haklar\u0131n\u0131z</h2>
<p>KVKK md. 11 uyar\u0131nca; verilerinizin i\u015flenip i\u015flenmedi\u011fini \u00f6\u011frenme, bilgi talep etme, i\u015flenme amac\u0131n\u0131 \u00f6\u011frenme, aktar\u0131lan \u00fc\u00e7\u00fcnc\u00fc ki\u015fileri bilme, eksik veya yanl\u0131\u015f i\u015flenmi\u015fse d\u00fczeltilmesini isteme, silinmesini veya yok edilmesini isteme, otomatik sistemlerle analiz sonucuna itiraz etme ve kanuna ayk\u0131r\u0131 i\u015fleme nedeniyle zarara u\u011framan\u0131z h\u00e2linde tazminat talep etme haklar\u0131na sahipsiniz.</p>
<p>Ba\u015fvurular\u0131n\u0131z\u0131 <a href="mailto:hello@amigura.com">hello@amigura.com</a> adresine iletebilirsiniz. Ba\u015fvurular \u00fccretsiz olarak en ge\u00e7 <strong>30 g\u00fcn</strong> i\u00e7inde sonu\u00e7land\u0131r\u0131l\u0131r.</p>

<h2>9. \u00c7erezler</h2>
<p>Zorunlu \u00e7erezler site i\u015flevselli\u011fi i\u00e7in gereklidir. Analitik \u00e7erezler yaln\u0131zca \u00e7erez banner \u00fczerinden onay vermeniz h\u00e2linde kullan\u0131l\u0131r. Tercihlerinizi banner veya taray\u0131c\u0131 ayarlar\u0131ndan de\u011fi\u015ftirebilirsiniz.</p>

<h2>10. G\u00fcvenlik</h2>
<p>Ki\u015fisel verilerin korunmas\u0131 i\u00e7in uygun teknik ve idari tedbirler uygulanmaktad\u0131r; ancak internet \u00fczerinden iletimin tamamen g\u00fcvenli oldu\u011fu garanti edilemez.</p>

<h2>11. De\u011fi\u015fiklikler</h2>
<p>Bu politika g\u00fcncellenebilir. G\u00fcncel s\u00fcr\u00fcm bu sayfada yay\u0131mlan\u0131r; \u00f6nemli de\u011fi\u015fikliklerde tarih g\u00fcncellenir.</p>

<p class="legal-content__notice">Bu metin bilgilendirme ama\u00e7l\u0131d\u0131r. \u00d6zel durumunuz i\u00e7in hukuk dan\u0131\u015fman\u0131na ba\u015fvurman\u0131z \u00f6nerilir.</p>`;

const returnsTr = `<p>Bu sayfa, <strong>Amigura</strong> el yap\u0131m\u0131 amigurumi \u00fcr\u00fcnlerine ili\u015fkin iptal, iade ve cayma hakk\u0131 s\u00fcre\u00e7lerini a\u00e7\u0131klar. L\u00fctfen hem bu metni hem de <strong>Trendyol</strong> platform ko\u015fullar\u0131n\u0131 okuyunuz.</p>

<h2>1. Genel Bilgilendirme</h2>
<p><strong>amigura.com</strong> \u00fcr\u00fcn vitrini sunar. Haz\u0131r koleksiyon \u00fcr\u00fcnlerinin sat\u0131\u015f\u0131, \u00f6demesi ve kargosu <strong>Trendyol</strong> \u00fczerinden yap\u0131l\u0131r. \u0130ade ve iptal ba\u015fvurular\u0131 \u00f6ncelikle Trendyol sipari\u015f paneliniz \u00fczerinden y\u00f6netilir; at\u00f6lyemiz kalite ve paketleme s\u00fcrecinden sorumludur.</p>

<h2>2. Haz\u0131r Koleksiyon \u00dcr\u00fcnleri - 14 G\u00fcnl\u00fck Cayma Hakk\u0131</h2>
<p>Mesafeli s\u00f6zle\u015fmeler kapsam\u0131nda, t\u00fcketici olarak teslimattan itibaren <strong>14 g\u00fcn</strong> i\u00e7inde herhangi bir gerek\u00e7e g\u00f6stermeksizin cayma hakk\u0131na sahipsiniz (ki\u015fiye \u00f6zel \u00fcretilen \u00fcr\u00fcnler hari\u00e7).</p>
<ul>
<li>\u0130ade s\u00fcrecini Trendyol hesab\u0131n\u0131zdan ba\u015flat\u0131n.</li>
<li>\u00dcr\u00fcn kullan\u0131lmam\u0131\u015f, hasars\u0131z ve m\u00fcmk\u00fcnse orijinal ambalaj\u0131nda olmal\u0131d\u0131r.</li>
<li>\u0130ade kargo s\u00fcreci Trendyol kurallar\u0131na tabidir.</li>
<li>\u00d6deme iadesi Trendyol prosed\u00fcrleriyle yap\u0131l\u0131r; s\u00fcre bankaya g\u00f6re de\u011fi\u015febilir.</li>
</ul>

<h2>3. Ki\u015fiselle\u015ftirilmi\u015f ve \u00d6zel Sipari\u015f \u00dcr\u00fcnleri</h2>
<p>6502 say\u0131l\u0131 T\u00fcketicinin Korunmas\u0131 Hakk\u0131nda Kanun ve Mesafeli S\u00f6zle\u015fmeler Y\u00f6netmeli\u011fi md. 15 uyar\u0131nca, <strong>t\u00fcketicinin se\u00e7im veya istekleri do\u011frultusunda ki\u015fiselle\u015ftirilen</strong> mallarda cayma hakk\u0131 kullan\u0131lamaz.</p>
<p>Buna \u015funlar dahildir:</p>
<ul>
<li>\u00d6zel sipari\u015f sihirbaz\u0131 ile talep edilen fig\u00fcr, renk, \u00f6l\u00e7\u00fc veya isim nak\u0131\u015f\u0131,</li>
<li>\u00dcretime ba\u015flanm\u0131\u015f \u00f6zel tasar\u0131m sipari\u015fler,</li>
<li>Ki\u015fiye \u00f6zel hediye notu veya ambalaj talebiyle \u00fcretilen par\u00e7alar.</li>
</ul>
<p>\u00d6zel sipari\u015f onay\u0131ndan sonra iptal genellikle m\u00fcmk\u00fcn de\u011fildir; \u00fcretim ba\u015flamadan \u00f6nce yaz\u0131l\u0131 olarak sorabilirsiniz.</p>

<h2>4. Hasarl\u0131 veya Eksik Teslimat</h2>
<p>\u00dcr\u00fcn hasarl\u0131 veya eksik geldiyse Trendyol \u00fczerinden bildirim yap\u0131n ve foto\u011fraf ile belgeleyin. Trendyol m\u00fc\u015fteri hizmetleri ve sat\u0131c\u0131 s\u00fcre\u00e7leri ge\u00e7erlidir. At\u00f6lyemizle ileti\u015fime ge\u00e7meniz durumunda destek olmaya \u00e7al\u0131\u015f\u0131r\u0131z: <a href="mailto:hello@amigura.com">hello@amigura.com</a></p>

<h2>5. Sipari\u015f \u0130ptali (Kargoya Verilmeden)</h2>
<p>Trendyol \u00fczerinden verilen ve hen\u00fcz kargoya verilmemi\u015f standart sipari\u015fler, platform kurallar\u0131 \u00e7er\u00e7evesinde iptal edilebilir. \u0130ade tutar\u0131 Trendyol taraf\u0131ndan i\u015flenir.</p>

<h2>6. De\u011fi\u015fim</h2>
<p>Do\u011frudan de\u011fi\u015fim hizmeti sunulmamaktad\u0131r. Uygun \u00fcr\u00fcnlerde iade sonras\u0131 yeni sipari\u015f verebilirsiniz.</p>

<h2>7. \u00d6zel Sipari\u015f \u00d6demeleri</h2>
<p>At\u00f6lyemizle do\u011frudan yap\u0131lan \u00f6zel sipari\u015flerde \u00f6deme ve iade ko\u015fullar\u0131 sipari\u015f onay\u0131nda yaz\u0131l\u0131 olarak payla\u015f\u0131l\u0131r; bu ko\u015fullar Trendyol kurallar\u0131ndan farkl\u0131 olabilir.</p>

<h2>8. \u0130leti\u015fim</h2>
<p>Sorular\u0131n\u0131z i\u00e7in: <a href="mailto:hello@amigura.com">hello@amigura.com</a></p>

<p class="legal-content__notice">G\u00fcncel ko\u015fullar i\u00e7in ilgili Trendyol \u00fcr\u00fcn sayfas\u0131 ve platform \u015fartlar\u0131n\u0131 da inceleyiniz.</p>`;

const privacyEn = `<p>This Privacy Policy explains how <strong>Amigura</strong> ("we", "us") collects and uses personal data when you visit <strong>amigura.com</strong>. We are a handmade amigurumi studio based in Turkiye. This website is a product showcase; checkout for collection items is completed on <strong>Trendyol</strong>, a third-party marketplace.</p>

<h2>1. Who We Are</h2>
<p><strong>Data controller:</strong> Amigura<br>
<strong>Email:</strong> <a href="mailto:hello@amigura.com">hello@amigura.com</a><br>
<strong>Contact:</strong> <a href="index.html#contact">Contact section</a></p>

<h2>2. What This Website Does</h2>
<p>We display our handmade crochet (amigurumi) collection. We do not process card payments on this site. When you buy a ready-made piece, you are redirected to Trendyol, which handles payment, invoicing, shipping, and standard consumer rights under its terms. Custom order requests may be sent to us by email or WhatsApp.</p>

<h2>3. Data We May Collect</h2>
<ul>
<li><strong>Contact details:</strong> Name, email, phone if you message us.</li>
<li><strong>Custom order details:</strong> Figure type, colours, size, notes you provide.</li>
<li><strong>Technical data:</strong> IP address, browser type, device, pages viewed, timestamps.</li>
<li><strong>Cookies:</strong> Essential cookies; analytics cookies only with your consent.</li>
<li><strong>Newsletter:</strong> Email address if you subscribe.</li>
</ul>
<p>Payment and delivery data for Trendyol purchases are processed by Trendyol under their privacy policy. We do not receive your full card details.</p>

<h2>4. Purposes and Legal Bases</h2>
<p>We use data to operate the site securely, respond to enquiries, fulfil custom order discussions, send newsletters (with consent), comply with law, and improve our services. Depending on your location, legal bases may include contract, legitimate interests, legal obligation, and consent (e.g. analytics, marketing).</p>
<p>Visitors in the EEA/UK may have rights under GDPR; Turkish residents have rights under KVKK (Law No. 6698). We apply appropriate safeguards for international visitors.</p>

<h2>5. Sharing Your Data</h2>
<p>We may share data with hosting providers, email services, analytics providers (if consented), professional advisers, and authorities when required by law. Trendyol acts as an independent controller for marketplace transactions.</p>

<h2>6. International Transfers</h2>
<p>Our service providers may process data in Turkiye or other countries. Where required, we rely on appropriate safeguards such as standard contractual clauses or your explicit consent.</p>

<h2>7. Retention</h2>
<p>We keep data only as long as needed for the purposes above and legal retention periods, then delete or anonymise it.</p>

<h2>8. Your Rights</h2>
<p>Depending on applicable law, you may have the right to access, rectify, erase, restrict, object, data portability, and withdraw consent. You may lodge a complaint with a supervisory authority in your country.</p>
<p>To exercise rights, email <a href="mailto:hello@amigura.com">hello@amigura.com</a>. We respond within <strong>30 days</strong> where possible.</p>

<h2>9. Cookies</h2>
<p>Essential cookies are required for the site to work. Analytics cookies are optional and controlled via our cookie banner. You can also manage cookies in your browser settings.</p>

<h2>10. Children</h2>
<p>Our products may appeal to families, but this site is not directed at children under 16 to register or subscribe without parental consent.</p>

<h2>11. Security</h2>
<p>We use reasonable technical and organisational measures to protect data. No online transmission is completely secure.</p>

<h2>12. Changes</h2>
<p>We may update this policy. The current version is always on this page with the "Last updated" date.</p>

<p class="legal-content__notice">This policy is for general information and does not constitute legal advice. For marketplace orders, also review Trendyol's terms and privacy notice.</p>`;

const returnsEn = `<p>This Returns and Cancellation Policy explains how returns, refunds, and cancellations work for <strong>Amigura</strong> handmade amigurumi products. Please read this page together with <strong>Trendyol</strong> terms, as most collection purchases are completed there.</p>

<h2>1. Overview</h2>
<p><strong>amigura.com</strong> is a product showcase. We do not take payments on this website. Ready-made collection items are sold, paid for, and shipped through <strong>Trendyol</strong>, an established Turkish marketplace with buyer protection. Custom orders arranged directly with our studio may have separate terms confirmed in writing.</p>

<h2>2. Ready-Made Collection Items - Right of Withdrawal</h2>
<p>For standard ready-made items sold via Trendyol, consumers generally have a <strong>14-day right of withdrawal</strong> from delivery under Turkish consumer law (excluding personalised goods).</p>
<ul>
<li>Start the return from your Trendyol order account.</li>
<li>Items should be unused, undamaged, and preferably in original packaging.</li>
<li>Return shipping rules and costs follow Trendyol's current policy.</li>
<li>Refunds are processed by Trendyol to your original payment method; timing depends on your bank or card issuer.</li>
</ul>
<p>International buyers should check Trendyol's cross-border and seller policies applicable to their order.</p>

<h2>3. Personalised and Custom-Made Items - No Withdrawal</h2>
<p>Under Turkish distance sales rules (and similar EU/UK principles), the right of withdrawal does <strong>not</strong> apply to goods made to the consumer's specifications or clearly personalised.</p>
<p>This includes:</p>
<ul>
<li>Custom orders placed via our wizard (figure, colours, size, embroidery, name, etc.),</li>
<li>Orders already in production at the atelier,</li>
<li>Bespoke gift packaging or notes requested as part of production.</li>
</ul>
<p>Once a custom order is confirmed and production has started, cancellation is usually not possible. Contact us before production begins if your plans change.</p>

<h2>4. Damaged or Incorrect Delivery</h2>
<p>If your item arrives damaged or incomplete, report it promptly through Trendyol and keep photos of the parcel and product. Trendyol's dispute and refund procedures apply. You may also email us at <a href="mailto:hello@amigura.com">hello@amigura.com</a> and we will assist where we can.</p>

<h2>5. Cancellation Before Shipment</h2>
<p>Orders on Trendyol that have not yet been shipped may be cancellable under platform rules. Refunds are handled by Trendyol.</p>

<h2>6. Exchanges</h2>
<p>We do not offer direct exchanges. For eligible items, you may return via Trendyol and place a new order.</p>

<h2>7. Direct Custom Orders</h2>
<p>For bespoke orders agreed directly with Amigura (email/WhatsApp), payment, deposit, cancellation, and refund terms are confirmed in writing before production. These may differ from Trendyol marketplace rules.</p>

<h2>8. Contact</h2>
<p>Questions: <a href="mailto:hello@amigura.com">hello@amigura.com</a></p>

<p class="legal-content__notice">Always refer to the Trendyol product listing and platform terms for the binding conditions of your specific purchase.</p>`;

const files = [
  ["privacy-tr.html", privacyTr],
  ["returns-tr.html", returnsTr],
  ["privacy-en.html", privacyEn],
  ["returns-en.html", returnsEn],
];

for (const [name, body] of files) {
  fs.writeFileSync(path.join(legalDir, name), body + "\n", "utf8");
  console.log("Wrote", name);
}
