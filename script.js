/* ===== EDIT HERE: settings ===== */
const CONFIG = {
  whatsapp: "2348025799406",                 // digits only, with country code
  email: "unravelnco@gmail.com",             // orders arrive here (via Web3Forms)
  endpoint: "https://api.web3forms.com/submit",
  // Paste your Web3Forms access key between the quotes. It is public by design (not a password).
  accessKey: "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE"
};

/* ===== EDIT HERE: products =====
   images: list as many photos as you like, e.g. ["images/products/beanies-1.jpg", "images/products/beanies-2.jpg"].
   Leave [] to show labelled placeholders (they show the file name to use). slug = the file-name prefix.
   type decides which customization fields appear (see FIELDS below). */
const P = (name, cat, type, slug, desc, images = []) => ({ name, cat, type, slug, desc, images });
const PRODUCTS = [
  P("Sweaters", "Crochet Wear", "wear", "sweaters", "A cozy handmade crochet sweater."),
  P("Crochet Shirts", "Crochet Wear", "wear", "shirts", "A light crochet shirt, made to fit you."),
  P("Shrugs", "Crochet Wear", "wear", "shrugs", "A soft crochet shrug to layer over anything."),
  P("Mesh Pieces", "Crochet Wear", "wear", "mesh-pieces", "Airy handmade mesh crochet."),
  P("Shorts", "Crochet Wear", "bottom", "shorts", "Handmade crochet shorts, made to fit you."),
  P("Leg Warmers", "Crochet Wear", "legs", "leg-warmers", "Cozy handmade crochet leg warmers."),
  P("Beanies", "Hats & Headwear", "hat", "beanies", "A warm, snug crochet beanie."),
  P("Customized Beanies", "Hats & Headwear", "hat", "customized-beanies", "A crochet beanie designed around your ideas."),
  P("Berets", "Hats & Headwear", "hat", "berets", "A soft crochet beret with a classic shape."),
  P("Ruffle Hats", "Hats & Headwear", "hat", "ruffle-hats", "A crochet hat with a playful ruffled edge."),
  P("Headbands", "Hats & Headwear", "hat", "headbands", "A handmade crochet headband."),
  P("Scrunchies", "Accessories", "small", "scrunchies", "A crochet scrunchie in your colours."),
  P("Hair Accessories", "Accessories", "small", "hair-accessories", "Handmade crochet hair accessories."),
  P("Hair Clips", "Accessories", "small", "hair-clips", "Handmade crochet hair clips."),
  P("Ruffle Socks", "Accessories", "legs", "ruffle-socks", "Handmade crochet ruffle socks."),
  P("Keychains", "Accessories", "small", "keychains", "A handmade crochet keychain."),
  P("Bags", "Bags", "bag", "bags", "A handmade crochet bag."),
  P("Tote Bags", "Bags", "bag", "tote-bags", "A roomy crochet tote for every day."),
  P("Ocean Bags", "Bags", "bag", "ocean-bags", "A handmade crochet ocean bag."),
  P("Flower Bags", "Bags", "bag", "flower-bags", "A handmade crochet flower bag."),
  P("Grabby Square Shoulder Bags", "Bags", "bag", "grabby-square-shoulder-bags", "A handmade crochet grabby square shoulder bag."),
  P("Two-Piece Beach Sets", "Beach Collection", "beach", "two-piece-beach-sets", "A two-piece crochet set for the beach."),
  P("Beach Sets", "Beach Collection", "beach", "beach-sets", "A crochet beach set, made your way."),
  P("Crochet Slippers", "Home & Comfort", "feet", "crochet-slippers", "Cozy handmade crochet slippers."),
  P("Blankets", "Home & Comfort", "blanket", "blankets", "A soft handmade crochet blanket.")
];
const PRICE_TEXT = "Price confirmed after customization";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Custom (enter measurements)"];
const f = (label, kind, opts, req) => ({ label, kind, opts, req });
const QTY = f("Quantity", "number", null, true), COL = f("Colour", "text", null, true), STY = f("Style / design preferences", "text");
const FIELDS = {
  wear: [QTY, f("Size", "select", SIZES, true), COL, f("Fit", "select", ["Fitted", "Regular", "Oversized"]), f("Chest/bust (cm, optional)", "text"), f("Length (cm, optional)", "text"), STY],
  hat: [QTY, COL, f("Head circumference (cm, optional)", "text"), STY],
  small: [QTY, COL, STY],
  bag: [QTY, COL, f("Bag size", "select", ["Small", "Medium", "Large"]), f("Strap", "select", ["Short", "Long", "No preference"]), STY],
  beach: [QTY, COL, f("Top size", "select", SIZES, true), f("Bottom size", "select", SIZES, true), f("Bust (cm, optional)", "text"), f("Waist (cm, optional)", "text"), f("Hips (cm, optional)", "text"), STY],
  bottom: [QTY, f("Size", "select", SIZES, true), COL, f("Waist (cm, optional)", "text"), f("Hips (cm, optional)", "text"), f("Length (cm, optional)", "text"), STY],
  legs: [QTY, COL, f("Size", "select", ["Small", "Medium", "Large"]), f("Length (cm, optional)", "text"), STY],
  blanket: [QTY, COL, f("Blanket size", "select", ["Baby", "Throw", "Large", "Custom (describe in style notes)"]), STY],
  feet: [QTY, COL, f("Foot length (cm) or shoe size", "text", null, true), STY]
};
const FAQS = [
  ["How do custom orders work?", "Choose a piece, fill in the custom order form and submit your request. We review it and contact you on WhatsApp to confirm everything."],
  ["Can I request a different colour or size?", "Yes. Enter your colour and size in the form, and add anything else under special requests."],
  ["Can I submit my measurements?", "Yes. Measurement fields appear for pieces where they help."],
  ["Can I send a reference picture?", "Yes. You can attach one image in the order form, or send it on WhatsApp."],
  ["How do I pay?", "Payment is not taken on this website. We share payment instructions on WhatsApp after confirming your order."],
  ["How will I know the final price?", "We confirm the final price with you on WhatsApp once we have reviewed your request."],
  ["Do you accept preorders?", "[EDIT: add your preorder answer here]"],
  ["How does delivery work?", "[EDIT: add your delivery details here]. We confirm delivery details with you on WhatsApp."],
  ["How long does a custom order take?", "[EDIT: add your timeframe here]"]
];

const $ = (s, r = document) => r.querySelector(s);
const el = (t, props = {}, kids = []) => { const e = Object.assign(document.createElement(t), props); kids.forEach(k => e.append(k)); return e; };

/* Reusable WhatsApp link (works on mobile and desktop) */
function waLink(ref) {
  const msg = ref
    ? `Hi Unravel & Co.! I just submitted a custom order. My order reference is ${ref}. I'd like to confirm my order and payment details.`
    : "Hi Unravel & Co.! I'd like to ask about a custom order.";
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
document.querySelectorAll("[data-wa]").forEach(a => a.href = waLink());

/* Nav */
const menuBtn = $(".menu-btn"), links = $("#links");
menuBtn.onclick = () => { const o = links.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); };
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); } });
$("#yr").textContent = new Date().getFullYear();

/* Shop */
const cats = [...new Set(PRODUCTS.map(p => p.cat))];
let activeCat = "All";
const chips = $("#chips");
["All", ...cats].forEach(c => chips.append(el("button", { type: "button", textContent: c, onclick: () => { activeCat = c; renderShop(); } })));
$("#search").oninput = renderShop;
cats.forEach(c => $("#cat-preview").append(el("a", { href: "#shop", textContent: c, onclick: () => { activeCat = c; renderShop(); } })));

function renderShop() {
  chips.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.textContent === activeCat));
  const q = $("#search").value.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (activeCat === "All" || p.cat === activeCat) && (p.name + p.desc + p.cat).toLowerCase().includes(q));
  const grid = $("#grid"); grid.replaceChildren();
  if (!list.length) grid.append(el("p", { className: "empty", textContent: "No pieces match. Try another category or search term." }));
  list.forEach(p => {
    const first = p.images[0] || null;
    grid.append(el("article", { className: "card" }, [
      el("div", { className: "imgbox" }, [el("button", { type: "button", className: "imgbtn", ariaLabel: "View photos of " + p.name, onclick: () => openPD(p) }, [slide(p, 0, first)])]),
      el("h3", { textContent: p.name }), el("p", { textContent: p.desc }),
      el("span", { className: "price", textContent: PRICE_TEXT }),
      el("a", { className: "btn ghost", href: "#order", textContent: "Customize this", onclick: () => selectProduct(p.name) })
    ]));
  });
}

/* Photo gallery: works with 0 (placeholders), 1, or any number of images */
const SLOTS = 5; // placeholder count when a product has no photos yet
const photos = p => p.images.length ? p.images : Array.from({ length: SLOTS }, () => null);
function ph(p, i) { return el("div", { className: "ph", role: "img", ariaLabel: `${p.name} photo placeholder ${i + 1}`, innerHTML: `Photo placeholder<br>${p.name}<br><small>images/products/${p.slug}-${i + 1}.jpg</small>` }); }
function slide(p, i, src) {
  if (!src) return ph(p, i);
  const im = el("img", { src, alt: `${p.name} photo ${i + 1}`, loading: "lazy" });
  im.onerror = () => im.replaceWith(ph(p, i)); // missing file falls back to a placeholder
  return im;
}
const dlg = $("#pd"); let cur = null, idx = 0;
function showPhoto(i) {
  const list = photos(cur), n = list.length; idx = (i + n) % n;
  $("#pd-main").replaceChildren(slide(cur, idx, list[idx]));
  $("#pd-count").textContent = `Photo ${idx + 1} of ${n}`;
  $("#pd-prev").hidden = $("#pd-next").hidden = n < 2; $("#pd-thumbs").hidden = n < 2;
  $("#pd-thumbs").querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === idx));
}
function openPD(p) {
  cur = p; $("#pd-t").textContent = p.name; $("#pd-desc").textContent = p.desc + " " + PRICE_TEXT + ".";
  $("#pd-thumbs").replaceChildren(...photos(p).map((src, i) => el("button", { type: "button", className: "th", ariaLabel: "Show photo " + (i + 1), onclick: () => showPhoto(i) }, [src ? el("img", { src, alt: "", loading: "lazy" }) : String(i + 1)])));
  showPhoto(0); dlg.showModal();
}
$("#pd-prev").onclick = () => showPhoto(idx - 1); $("#pd-next").onclick = () => showPhoto(idx + 1);
$("#pd-x").onclick = () => dlg.close();
$("#pd-go").onclick = () => { selectProduct(cur.name); dlg.close(); };
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener("keydown", e => { if (e.key === "ArrowLeft") showPhoto(idx - 1); if (e.key === "ArrowRight") showPhoto(idx + 1); });
let tx = null; // swipe on touch screens
$("#pd-main").addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
$("#pd-main").addEventListener("touchend", e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(dx) > 40) showPhoto(idx + (dx < 0 ? 1 : -1)); });
renderShop();

/* FAQ */
FAQS.forEach(([q, a]) => $("#faqs").append(el("details", {}, [el("summary", { textContent: q }), el("p", { textContent: a })])));

/* Order form */
const sel = $("#product");
PRODUCTS.forEach(p => sel.append(new Option(p.name + " (" + p.cat + ")", p.name)));
sel.onchange = renderFields;
function selectProduct(name) { sel.value = name; renderFields(); }

function renderFields() {
  const p = PRODUCTS.find(x => x.name === sel.value), box = $("#dyn"); box.replaceChildren();
  $("#pdesc").textContent = p.desc + " " + PRICE_TEXT + ".";
  FIELDS[p.type].forEach((fd, i) => {
    const id = "d" + i, wrap = el("div", { className: "field" });
    wrap.append(el("label", { htmlFor: id, textContent: fd.label + (fd.req || /optional/.test(fd.label) ? "" : " (optional)") }));
    let inp;
    if (fd.kind === "select") { inp = el("select", { id }); inp.append(new Option("Choose…", "")); fd.opts.forEach(o => inp.append(new Option(o, o))); }
    else inp = el("input", { id, type: fd.kind, min: 1, value: fd.kind === "number" ? 1 : "" });
    inp.name = fd.label.replace(/ \(.*\)/, ""); if (fd.req) inp.required = true;
    wrap.append(inp); box.append(wrap);
  });
}
sel.selectedIndex = 0; renderFields();

const form = $("#form"), show = id => ["form", "review", "done"].forEach(x => $("#" + x).hidden = x !== id);
const SKIP = ["attachment", "_honey"];

form.onsubmit = e => {
  e.preventDefault();
  const bad = [...form.querySelectorAll("[required]")].filter(i => !i.value.trim());
  form.querySelectorAll("[aria-invalid]").forEach(i => i.removeAttribute("aria-invalid"));
  const errs = $("#errs"); errs.replaceChildren();
  const email = $("#email");
  if (email.value && !email.validity.valid && !bad.includes(email)) bad.push(email);
  const file = $("#ref").files[0];
  if (file && file.size > 5 * 1024 * 1024) { errs.textContent = "The reference image is over 5 MB. Choose a smaller image or send it on WhatsApp instead."; errs.focus(); return; }
  if (bad.length) {
    bad.forEach(i => i.setAttribute("aria-invalid", "true"));
    errs.append("Please complete these fields:", el("ul", {}, bad.map(i => el("li", { textContent: i.labels[0].textContent.replace(" (optional)", "") }))));
    errs.focus(); bad[0].focus(); return;
  }
  const sum = $("#sum"); sum.replaceChildren();
  [["Product", sel.value], ...[...new FormData(form)].filter(([k, v]) => !SKIP.includes(k) && k !== "Product" && v)].forEach(([k, v]) => sum.append(el("dt", { textContent: k }), el("dd", { textContent: v })));
  if (file) sum.append(el("dt", { textContent: "Reference image" }), el("dd", { textContent: file.name }));
  show("review"); $("#review").scrollIntoView(); $("#rerr").textContent = "";
};
$("#edit").onclick = () => show("form");

function makeRef() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", a = crypto.getRandomValues(new Uint8Array(6));
  return "UNR-" + [...a].map(n => c[n % c.length]).join("");
}

let pendingRef = null; // kept until delivery succeeds, so retries reuse the same reference
$("#send").onclick = async () => {
  const btn = $("#send"), err = $("#rerr"); err.textContent = ""; btn.disabled = true; btn.textContent = "Submitting…";
  const ref = pendingRef || (pendingRef = makeRef()), file = $("#ref").files[0];
  const payload = {};
  new FormData(form).forEach((v, k) => { if (!SKIP.includes(k) && typeof v === "string" && v.trim()) payload[k] = v.trim(); });
  payload["Order reference"] = ref;
  payload["Reference image"] = file ? "Customer chose '" + file.name + "' (not uploaded; customer will send it on WhatsApp)" : "None";
  payload.access_key = CONFIG.accessKey;
  payload.subject = `New custom order request ${ref} - ${sel.value}`;
  payload.from_name = "Unravel & Co. website";
  try {
    if (location.protocol === "file:") throw new Error("Form sending only works on the live website, not from a local file.");
    if (!CONFIG.accessKey || CONFIG.accessKey.startsWith("PASTE_")) throw new Error("The order form is not connected yet (access key missing).");
    const r = await fetch(CONFIG.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
    const j = await r.json().catch(() => ({})), msg = String(j.message || "");
    if (!r.ok || j.success !== true) throw new Error(msg || "The form service did not confirm delivery.");
    $("#refid").textContent = ref; $("#wa").href = waLink(ref); $("#imgnote").hidden = !file;
    $("#wafb").textContent = "If WhatsApp does not open, message us on +2348025799406 and quote " + ref + ".";
    pendingRef = null; show("done"); $("#done").focus(); form.reset(); renderFields();
  } catch (x) {
    console.error("Order submission failed:", x);
    err.textContent = "Your request was not submitted. " + (navigator.onLine ? "Details: " + x.message + " " : "You appear to be offline. ") + "Please try again, or message us on WhatsApp at +2348025799406.";
    err.focus();
  } finally { btn.disabled = false; btn.textContent = "Submit Custom Order"; }
};
