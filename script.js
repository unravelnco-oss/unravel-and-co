/* ===== EDIT HERE: settings ===== */
const CONFIG = {
  whatsapp: "2348025799406",                 // digits only, with country code
  email: "unravelnco@gmail.com",             // receives orders (via FormSubmit)
  endpoint: "https://formsubmit.co/ajax/unravelnco@gmail.com"
};

/* ===== EDIT HERE: products =====
   image: put a file path like "images/beanie.jpg" to replace the placeholder.
   type decides which customization fields appear (see FIELDS below). */
const PRODUCTS = [
  { name: "Sweaters", cat: "Crochet Wear", type: "wear", image: "", desc: "A cozy handmade crochet sweater." },
  { name: "Crochet Shirts", cat: "Crochet Wear", type: "wear", image: "", desc: "A light crochet shirt, made to fit you." },
  { name: "Shrugs", cat: "Crochet Wear", type: "wear", image: "", desc: "A soft crochet shrug to layer over anything." },
  { name: "Mesh Pieces", cat: "Crochet Wear", type: "wear", image: "", desc: "Airy handmade mesh crochet." },
  { name: "Beanies", cat: "Hats & Headwear", type: "hat", image: "", desc: "A warm, snug crochet beanie." },
  { name: "Berets", cat: "Hats & Headwear", type: "hat", image: "", desc: "A soft crochet beret with a classic shape." },
  { name: "Ruffle Hats", cat: "Hats & Headwear", type: "hat", image: "", desc: "A crochet hat with a playful ruffled edge." },
  { name: "Scrunchies", cat: "Accessories", type: "small", image: "", desc: "A crochet scrunchie in your colours." },
  { name: "Hair Accessories", cat: "Accessories", type: "small", image: "", desc: "Handmade crochet hair accessories." },
  { name: "Bags", cat: "Bags", type: "bag", image: "", desc: "A handmade crochet bag." },
  { name: "Tote Bags", cat: "Bags", type: "bag", image: "", desc: "A roomy crochet tote for every day." },
  { name: "Two-Piece Beach Sets", cat: "Beach Collection", type: "beach", image: "", desc: "A two-piece crochet set for the beach." },
  { name: "Beach Sets", cat: "Beach Collection", type: "beach", image: "", desc: "A crochet beach set, made your way." },
  { name: "Crochet Slippers", cat: "Comfort", type: "feet", image: "", desc: "Cozy handmade crochet slippers." }
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
    const img = p.image ? el("img", { src: p.image, alt: p.name, loading: "lazy" })
      : el("div", { className: "ph", role: "img", ariaLabel: p.name + " photo placeholder", innerHTML: "Photo placeholder<br>" + p.name });
    grid.append(el("article", { className: "card" }, [
      el("div", { className: "imgbox" }, [img]), el("h3", { textContent: p.name }), el("p", { textContent: p.desc }),
      el("span", { className: "price", textContent: PRICE_TEXT }),
      el("a", { className: "btn ghost", href: "#order", textContent: "Customize this", onclick: () => selectProduct(p.name) })
    ]));
  });
}
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

$("#send").onclick = async () => {
  const btn = $("#send"), err = $("#rerr"); err.textContent = ""; btn.disabled = true; btn.textContent = "Submitting…";
  const ref = makeRef(), data = new FormData(form);
  data.append("Order reference", ref);
  data.append("_subject", `New custom order request ${ref} - ${sel.value}`);
  data.append("_template", "table"); data.append("_captcha", "false");
  try {
    const r = await fetch(CONFIG.endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || String(j.success) !== "true") throw new Error(j.message || "Request failed");
    $("#refid").textContent = ref; $("#wa").href = waLink(ref);
    $("#wafb").textContent = "If WhatsApp does not open, message us on +2348025799406 and quote " + ref + ".";
    show("done"); $("#done").focus(); form.reset(); renderFields();
  } catch (x) {
    err.textContent = "Your request was not submitted. " + (navigator.onLine ? "Please try again, or message us on WhatsApp at +2348025799406." : "You appear to be offline. Reconnect and try again.");
    err.focus();
  } finally { btn.disabled = false; btn.textContent = "Submit Custom Order"; }
};
