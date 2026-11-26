"use strict";
/* Numéro WhatsApp du restaurant, format international sans "+" (ex. "221770000000"). À compléter. */
const WA = "221781176868"; // numéro de réservation (78 117 68 68) indiqué sur leur Instagram — vérifier qu'il est sur WhatsApp

/* Carte du Galoya (retranscrite depuis le menu du restaurant). price = FCFA, null = à confirmer. */
const MENU = [
  { cat: "Entrées", items: [
    { n: "Tomates mozzarella", d: "Sauce tomate au basilic, tomates confites, mozzarella, pesto", price: 7500 },
    { n: "César revisitée", d: "Volaille, salade, parmesan, croûtons, vinaigrette au baobab", price: 8500 },
    { n: "Tuile à l'orange", d: "Agrumes, crevettes, roquette, vinaigrette de passion", price: 9500 },
  ]},
  { cat: "Plats signatures", note: "Un accompagnement inclus", items: [
    { n: "La Sénégalienne", d: "Bœuf ou poulet braisé, œuf, pommes de terre sautées à l'ail, salade, vinaigrette de baobab", price: 9500 },
    { n: "La Saint-Louisienne", d: "Saumon fumé, crevettes, calamar, pommes de terre, salade, vinaigrette citron-miel", price: 12000 },
    { n: "Sole meunière", d: "Beurre noisette, citron vert, herbes fraîches, mousseline de pomme de terre", price: 15500 },
    { n: "Spaghetti aux fruits de mer", d: "Gambas, moules, crevettes, calamar, crème de tamarin", price: 13500 },
    { n: "Thiof crémeux coco", d: "Thiof, sauce coco à la citronnelle, riz pilaf", price: 13500, tag: "Saveur locale" },
  ]},
  { cat: "Les braises", note: "Un accompagnement inclus au choix", items: [
    { n: "Brochettes de volaille à la cacahouète", d: "Volaille marinée, grillée à la braise", price: 12500 },
    { n: "Brochette de filet de bœuf Angus à l'emmental", d: "Filet de bœuf grillé à la braise", price: 15500 },
    { n: "Gambas et calamars braisés, crème de mangue", d: "Gambas au poivre, crème de mangue au piment", price: 13500 },
    { n: "Yendou de la cheffe", d: "Grillade d'entrecôte Angus, côtelettes d'agneau, broche de volaille, gésiers sautés à l'ail et au persil, deux sauces et deux accompagnements", price: 29500, tag: "À partager" },
  ]},
  { cat: "Accompagnements", note: "Un accompagnement inclus avec les plats signatures et les braises · accompagnement supplémentaire : 3 500 F", items: [
    { n: "Riz pilaf" }, { n: "Attiéké" }, { n: "Alloco persillé" }, { n: "Frites maison" }, { n: "Légumes rôtis" },
    { n: "Purée de pomme de terre montée au beurre" },
    { n: "Pommes sautées, ail, persil, parmesan", extra: "+1 000 F" },
  ]},
  { cat: "Sauces signatures", items: [
    { n: "Mangue piment" },
    { n: "Barbecue café Touba", d: "Conseillée avec les braises", tag: "Signature" },
    { n: "Tamarin miel" }, { n: "Poivre de Penja" },
  ]},
  { cat: "Desserts", items: [
    { n: "La coupe Djongoma", d: "Meringue, crémeux ananas agrumes gingembre et crumble de niébé", price: 6500 },
    { n: "Les douceurs de Mama Kandé", d: "Feuilleté pommes, caramel de maad, glace à la vanille", price: 6000 },
    { n: "L'infusion de Samba", d: "Crème brûlée à la citronnelle", price: 5500 },
    { n: "L'irrésistible de Kati", d: "Brioche perdue au café Touba", price: 6500 },
    { n: "Gâteau bi amna chocolat", d: "Coulant au chocolat, glace à la vanille", price: 6500 },
    { n: "Le jardin de Badiallo", d: "Fruits de saison · option gourmande avec glace au baobab : +1 500 F", price: 5000 },
  ]},
  { cat: "Boissons", note: "Nos élixirs", items: [
    { h: "Softs et eaux" },
    { n: "Soda", price: 2000 }, { n: "Eau plate (petite)", price: 1000 }, { n: "Eau plate (grande)", price: 1500 }, { n: "Eau pétillante", price: 2500 },
    { h: "Boissons chaudes" },
    { n: "Expresso", price: 2000 }, { n: "Double expresso", price: 3000 }, { n: "Café latte", price: 2500 }, { n: "Matcha latte", price: 4000 },
    { n: "Cappuccino", price: 3000 }, { n: "Chocolat chaud", price: 2500 }, { n: "Thé Dammann Frères", price: 3000 },
    { n: "Wass", price: 1500 }, { n: "Attaya", price: 1000 }, { n: "Grog", price: 5000 },
    { h: "Boissons glacées" },
    { n: "Iced matcha latte", price: 4000 }, { n: "Iced coffee latte", price: 3500 }, { n: "Frappuccino caramel", price: 4000 },
  ]},
  { cat: "Brunch", note: "Présenté à partir de vos photos · prix à ajouter", items: [
    { n: "Assiette brunch salée", d: "Œufs, jambon, tomates, salade, pain complet, fromage frais", price: null, img: "brunch-sale" },
    { n: "Plateau brunch à étages", d: "Viennoiseries, pancakes, fruits frais, jus pressés, à partager", price: null, img: "plateau-brunch" },
    { n: "Pancakes glacés", d: "Pancakes, glace vanille, coulis de fruits rouges", price: null, img: "pancakes" },
  ]},
];

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = v => v == null ? "Prix à confirmer" : v.toLocaleString("fr-FR").replace(/ | /g, " ") + " F";
const clean = (v, max) => String(v).replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

/* ---------- Carte : toutes les catégories à la suite, deux colonnes ---------- */
const KICKER = {"Entrées": "Pour commencer", "Plats signatures": "Un accompagnement inclus", "Les braises": "Un accompagnement inclus au choix", "Accompagnements": "Accompagnement supplémentaire : 3 500 F", "Sauces signatures": "Faites maison", "Desserts": "Pour finir en douceur", "Boissons": "Nos élixirs", "Brunch": "À partager · prix à ajouter"};
const ORN = '<span class="orn" aria-hidden="true"><svg viewBox="0 0 120 12"><path d="M0 6h44M76 6h44"/><path d="M48 6l4-4 4 4-4 4zM56 6l4-4 4 4-4 4zM64 6l4-4 4 4-4 4z"/></svg></span>';
const dishHTML = it => it.h ? `<h4 class="grp">${esc(it.h)}</h4>` : `
  <article class="dish${it.img ? " has-img" : ""}${!it.d && !it.img ? " simple" : ""}">
    ${it.img ? `<img src="img/${it.img}.webp" alt="" loading="lazy" width="304" height="404">` : ""}
    <div class="dish-txt">
      <div class="dish-head"><h3>${esc(it.n)}</h3>${("price" in it) || it.extra ? `<span class="price${it.price===null?" tbc":""}${it.extra?" extra":""}">${it.extra ? esc(it.extra) : fmt(it.price)}</span>` : ""}</div>
      ${it.d ? `<p>${esc(it.d)}</p>` : ""}
      ${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ""}
    </div>
  </article>`;
function renderMenu(){
  $("#tabs").innerHTML = MENU.map((c,i) => `<a class="tab" href="#cat-${i}">${esc(c.cat)}</a>`).join("");
  $("#menuList").innerHTML = MENU.map((c,i) => {
    /* découpe en deux colonnes équilibrées (les titres de groupe restent avec leurs boissons) */
    const blocks = []; let curB = null;
    c.items.forEach(it => { if (it.h || !curB) { curB = []; blocks.push(curB); } curB.push(it); });
    let cols;
    if (blocks.length > 1) { const L = [], R = []; let l = 0, r = 0; blocks.forEach(b => { if (l <= r) { L.push(...b); l += b.length; } else { R.push(...b); r += b.length; } }); cols = [L, R]; }
    else { const half = Math.ceil(c.items.length / 2); cols = [c.items.slice(0, half), c.items.slice(half)]; }
    return `<section class="m-sec" id="cat-${i}" aria-labelledby="cat-t-${i}">
      <p class="kicker">${esc(KICKER[c.cat] || "")}</p>${ORN}<h3 class="m-title" id="cat-t-${i}">${esc(c.cat)}</h3>
      <div class="m-grid"><div class="m-col">${cols[0].map(dishHTML).join("")}</div><div class="m-col">${cols[1].map(dishHTML).join("")}</div></div>
    </section>`;
  }).join("");
}
renderMenu();

/* ---------- Réservation ---------- */
let people = 2;
$("#people").innerHTML = [1,2,3,4,5,6,"7+"].map(n => `<button type="button" role="radio" aria-checked="${n===people}" data-n="${n}">${n}</button>`).join("");
$("#people").onclick = e => {
  const b = e.target.closest("button"); if (!b) return;
  people = b.dataset.n;
  document.querySelectorAll("#people button").forEach(x => x.setAttribute("aria-checked", x === b));
};
const today = new Date(); $("#bDate").min = new Date(today - today.getTimezoneOffset()*6e4).toISOString().slice(0,10);

let tt; function toast(t){ const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 2600); }

$("#bSend").onclick = () => {
  const date = $("#bDate").value, time = $("#bTime").value, name = clean($("#bName").value, 50), note = clean($("#bNote").value, 150);
  if (!date || !time) { $("#bMsg").textContent = "Choisissez une date et une heure."; return; }
  if (new Date(date + "T12:00").getDay() === 0) { $("#bMsg").textContent = "Le restaurant est fermé le dimanche : choisissez un autre jour."; return; }
  if (time < "11:30" || time > "22:00") { $("#bMsg").textContent = "Réservations possibles de 11h30 à 22h (fermeture à 22h30)."; return; }
  if (date < $("#bDate").min) { $("#bMsg").textContent = "Choisissez une date à venir."; return; }
  if (!name) { $("#bMsg").textContent = "Indiquez votre nom."; $("#bName").focus(); return; }
  $("#bMsg").textContent = "";
  const d = new Date(date + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const msg = `Bonjour Le Galoya, je souhaite réserver une table :\n\nDate : ${d}\nHeure : ${time}\nPersonnes : ${people}\nNom : ${name}${note ? "\nPrécisions : " + note : ""}`;
  if (!WA) { toast("Démo : le numéro WhatsApp du restaurant sera ajouté ici."); console.info(msg); return; }
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
};

/* ---------- Ouvert / fermé (heure de Dakar : lundi–samedi 11h30–22h30, fermé le dimanche) ---------- */
(function(){
  let day = 1, h = 0, m = 0;
  try {
    const p = new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Dakar",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date());
    day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.find(x=>x.type==="weekday").value);
    h = +p.find(x=>x.type==="hour").value; m = +p.find(x=>x.type==="minute").value;
  } catch(e) { const d = new Date(); day = d.getUTCDay(); h = d.getUTCHours(); m = d.getUTCMinutes(); }
  const t = h*60+m, open = day !== 0 && t >= 11*60+30 && t < 22*60+30;
  let txt;
  if (open) txt = "Ouvert maintenant · jusqu'à 22h30";
  else if (day === 0 || (day === 6 && t >= 22*60+30)) txt = "Fermé · ouvre lundi à 11h30";
  else txt = t < 11*60+30 ? "Fermé · ouvre à 11h30" : "Fermé · ouvre demain à 11h30";
  $("#openTxt").textContent = txt; $("#openNow").textContent = txt;
  $("#openDot").classList.toggle("on", open);
})();

/* ---------- Commande à emporter / livraison ---------- */
$("#orderWa").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Bonjour Le Galoya, je souhaite passer une commande à emporter / en livraison :\n\n");
