/* =========================================================================
   NEXOPARTS — interacciones
   Script clásico (sin módulos) para que funcione en cualquier hosting y
   abriendo el archivo directamente. Cada bloque va protegido con safe().
   ========================================================================= */
(function () {
  "use strict";

  var WA_NUMBER = "56999555599";
  var doc = document.documentElement;
  var hoverable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[nexoparts] " + name + ":", e); }
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]; }); }
  function waLink(text) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text); }

  var PRODUCTS = (typeof NEXOPARTS_PRODUCTS !== "undefined") ? NEXOPARTS_PRODUCTS : [];
  var BRANDS = (typeof NEXOPARTS_BRANDS !== "undefined") ? NEXOPARTS_BRANDS : [];
  var CATS = (typeof NEXOPARTS_CATEGORIES !== "undefined") ? NEXOPARTS_CATEGORIES : [];

  /* ---------- Splash: se oculta al cargar (y CSS lo oculta solo a los 2.4s) ---------- */
  function initSplash() {
    var splash = $("#splash");
    var done = false;
    function finish() {
      if (done) return; done = true;
      if (splash) splash.classList.add("is-done");
      document.body.classList.add("is-ready");
    }
    if (!splash) { finish(); return; }
    if (sessionStorageSafe("np-seen")) { splash.style.display = "none"; finish(); return; }
    sessionStorageSafe("np-seen", "1");
    window.addEventListener("load", function () { setTimeout(finish, 900); });
    setTimeout(finish, 2600);
  }
  function sessionStorageSafe(k, v) {
    try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; }
  }

  /* ---------- Cabecera: fondo al hacer scroll, se esconde al bajar ---------- */
  function initHeader() {
    var header = $("#header"), bar = $("#progressBar"), wa = $("#waFloat");
    var lastY = window.scrollY, ticking = false;
    function update() {
      var y = window.scrollY;
      if (header) {
        header.classList.toggle("is-scrolled", y > 20);
        var menuOpen = doc.classList.contains("menu-open");
        header.classList.toggle("is-hidden", !menuOpen && y > 500 && y > lastY + 4);
        if (y < lastY - 4) header.classList.remove("is-hidden");
      }
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
      }
      if (wa) wa.classList.toggle("is-visible", y > window.innerHeight * 0.6);
      lastY = y; ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menú móvil ---------- */
  function initMenu() {
    var btn = $("#burger"), menu = $("#mobileMenu");
    if (!btn || !menu) return;
    function set(open) {
      doc.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }
    btn.addEventListener("click", function () { set(!doc.classList.contains("menu-open")); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* ---------- Estado abierto / cerrado (hora de Santiago) ---------- */
  function initStatus() {
    var pill = $("#statusPill"), text = $("#statusText");
    if (!pill || !text || !window.Intl) return;
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Santiago", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var get = function (t) { var p = parts.filter(function (x) { return x.type === t; })[0]; return p ? p.value : ""; };
    var day = get("weekday"), mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
    var weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day) > -1;
    var open = weekday && mins >= 540 && mins < 1110;
    pill.classList.toggle("is-open", open);
    text.innerHTML = open ? "Atendiendo ahora<span class=\"sp-extra\"> · Despacho a todo Chile</span>" : "Fuera de horario<span class=\"sp-extra\"> · Respondemos desde las 09:00</span>";
  }

  /* ---------- Rellena selects de marca / pieza ---------- */
  function initSelects() {
    $$('select[data-fill="brands"]').forEach(function (sel) {
      if (!BRANDS.length) return;
      var first = sel.options[0];
      sel.innerHTML = ""; sel.appendChild(first);
      BRANDS.forEach(function (b) { var o = document.createElement("option"); o.value = b; o.textContent = b; sel.appendChild(o); });
    });
    $$('select[data-fill="cats"]').forEach(function (sel) {
      CATS.forEach(function (c) { var o = document.createElement("option"); o.value = c.id; o.textContent = c.label; sel.appendChild(o); });
    });
    var sp = $("#statProducts"), sb = $("#statBrands");
    if (sp && PRODUCTS.length) sp.setAttribute("data-count", PRODUCTS.length), sp.textContent = PRODUCTS.length;
    if (sb && BRANDS.length) sb.setAttribute("data-count", BRANDS.length), sb.textContent = BRANDS.length;
  }

  /* ---------- Tarjetas de producto ---------- */
  function stockLabel(p) {
    return p.stock === 1 ? '<span class="badge badge--hot">Última unidad</span>' : '<span class="badge"><i></i>' + p.stock + " en stock</span>";
  }
  function fmtCLP(n) { return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function priceHTML(p) {
    if (!p.price) return '<span class="pcard-price"><small>Precio</small><strong class="is-ask">Consultar</strong></span>';
    return '<span class="pcard-price"><small>IVA incluido</small><strong>' + fmtCLP(p.price) + '</strong></span>';
  }
  function cardHTML(p) {
    var msg = p.price
      ? "Hola Nexoparts, me interesa: " + p.name + " (SKU " + p.sku + ") para " + p.brand + " " + p.fits + ", a " + fmtCLP(p.price) + ". ¿Está disponible? Mi auto es: "
      : "Hola Nexoparts, quiero consultar precio y disponibilidad de: " + p.name + " (SKU " + p.sku + ") para " + p.brand + " " + p.fits + ".";
    return '' +
      '<article class="pcard" data-brand="' + esc(p.brand) + '" data-cat="' + esc(p.category) + '">' +
        '<div class="pcard-media">' +
          '<img class="img-a" src="' + esc(p.img) + '" alt="' + esc(p.name + " " + p.brand + " " + p.fits + ", foto real") + '" loading="lazy" decoding="async" width="900" height="1600">' +
          (p.img2 ? '<img class="img-b" src="' + esc(p.img2) + '" alt="" loading="lazy" decoding="async" width="900" height="1600">' : "") +
          '<span class="ph">Foto pendiente<br>SKU ' + esc(p.sku) + '</span>' +
          '<div class="pcard-badges">' + stockLabel(p) + '</div>' +
          (p.img2 ? '<button class="pcard-flip" type="button" aria-label="Ver otra foto"><svg><use href="#i-swap"/></svg></button>' : "") +
        '</div>' +
        '<div class="pcard-body">' +
          '<span class="pcard-brand">' + esc(p.brand) + ' <span class="pcard-sku">· SKU ' + esc(p.sku) + '</span></span>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p class="pcard-fit">' + esc(p.fits) + '</p>' +
          '<div class="pcard-actions">' +
            priceHTML(p) +
            '<a class="btn btn--primary" href="' + waLink(msg) + '" target="_blank" rel="noopener" aria-label="Pedir ' + esc(p.name + " " + p.fits) + ' por WhatsApp"><svg><use href="#i-wa"/></svg>' + (p.price ? "Pedir" : "Consultar") + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }
  function bindCard(card) {
    var media = $(".pcard-media", card);
    var a = $(".img-a", card);
    if (a) a.addEventListener("error", function () { a.style.display = "none"; media.classList.add("is-missing"); });
    var b = $(".img-b", card);
    if (b) b.addEventListener("error", function () { b.remove(); var f = $(".pcard-flip", card); if (f) f.remove(); });
    var flip = $(".pcard-flip", card);
    if (flip) flip.addEventListener("click", function (e) { e.preventDefault(); card.classList.toggle("show-b"); });
    bindTilt(card, 5);
  }
  function renderCards(grid, list) {
    grid.innerHTML = list.map(cardHTML).join("");
    $$(".pcard", grid).forEach(bindCard);
    if (window.gsap) {
      window.gsap.fromTo($$(".pcard", grid), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, ease: "power3.out", stagger: .05, clearProps: "opacity,transform" });
    }
  }

  /* Catálogo de la portada: chips por marca, máx. N tarjetas */
  function initHomeCatalog() {
    var grid = $("#homeGrid"), chips = $("#chips");
    if (!grid || !PRODUCTS.length) return;
    var limit = parseInt(grid.getAttribute("data-limit"), 10) || 8;
    function show(brand) {
      var list = PRODUCTS.filter(function (p) { return !brand || p.brand === brand; }).slice(0, limit);
      renderCards(grid, list);
    }
    if (chips) {
      // conteo por marca
      $$(".chip", chips).forEach(function (c) {
        var b = c.getAttribute("data-filter");
        var n = PRODUCTS.filter(function (p) { return !b || p.brand === b; }).length;
        if (b && !n) { c.remove(); return; }
        c.insertAdjacentHTML("beforeend", "<sup>" + n + "</sup>");
        c.addEventListener("click", function () {
          $$(".chip", chips).forEach(function (x) { x.classList.toggle("is-active", x === c); });
          show(b);
        });
      });
    }
    show("");
  }

  /* Página de catálogo: marca + pieza + texto, sincronizado con la URL */
  function initFullCatalog() {
    var grid = $("#fullGrid");
    if (!grid) return;
    var fMarca = $("#fMarca"), fCat = $("#fCat"), fQ = $("#fQ"), count = $("#resultCount"), empty = $("#emptyState");
    var params = new URLSearchParams(location.search);
    if (params.get("marca")) fMarca.value = params.get("marca");
    if (params.get("categoria")) fCat.value = params.get("categoria");
    if (params.get("q")) fQ.value = params.get("q");
    function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    function apply() {
      var m = fMarca.value, c = fCat.value, q = norm(fQ.value).trim();
      var list = PRODUCTS.filter(function (p) {
        if (m && p.brand !== m) return false;
        if (c && p.category !== c) return false;
        if (q) {
          var hay = norm([p.name, p.brand, p.fits, p.sku, p.id].join(" "));
          return q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
        }
        return true;
      });
      renderCards(grid, list);
      if (count) count.innerHTML = "<b>" + list.length + "</b> de " + PRODUCTS.length + " piezas";
      if (empty) empty.classList.toggle("is-visible", !list.length);
      var u = new URLSearchParams();
      if (m) u.set("marca", m); if (c) u.set("categoria", c); if (fQ.value.trim()) u.set("q", fQ.value.trim());
      try { history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : "")); } catch (e) {}
    }
    var t;
    fMarca.addEventListener("change", apply);
    fCat.addEventListener("change", apply);
    fQ.addEventListener("input", function () { clearTimeout(t); t = setTimeout(apply, 160); });
    var reset = $("#resetFilters");
    if (reset) reset.addEventListener("click", function () { fMarca.value = ""; fCat.value = ""; fQ.value = ""; apply(); });
    apply();
  }

  /* ---------- Inclinación 3D con halo ---------- */
  function bindTilt(el, max) {
    if (!hoverable || !el) return;
    max = max || 6;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", ((x - .5) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((.5 - y) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--hx", (x * 100).toFixed(1) + "%");
      el.style.setProperty("--hy", (y * 100).toFixed(1) + "%");
    });
    el.addEventListener("pointerleave", function () { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  }
  function initTilt() {
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt")) || 6;
      if (el.classList.contains("stage-card")) {
        // la tarjeta del hero usa transform propio
        if (!hoverable) return;
        var stage = el.parentElement;
        stage.addEventListener("pointermove", function (e) {
          var r = stage.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          el.style.transform = "rotateY(" + ((x - .5) * max * 2).toFixed(2) + "deg) rotateX(" + ((.5 - y) * max * 2).toFixed(2) + "deg)";
          el.style.setProperty("--hx", (x * 100) + "%"); el.style.setProperty("--hy", (y * 100) + "%");
        });
        stage.addEventListener("pointerleave", function () { el.style.transform = ""; });
      } else {
        bindTilt(el, max);
      }
    });
  }

  /* ---------- Botones magnéticos ---------- */
  function initMagnetic() {
    if (!hoverable) return;
    $$("[data-magnetic]").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty("--bx", ((e.clientX - r.left - r.width / 2) * .18).toFixed(1) + "px");
        b.style.setProperty("--by", ((e.clientY - r.top - r.height / 2) * .28).toFixed(1) + "px");
      });
      b.addEventListener("pointerleave", function () { b.style.setProperty("--bx", "0px"); b.style.setProperty("--by", "0px"); });
    });
  }

  /* ---------- Luz que sigue al mouse en el hero ---------- */
  function initHeroSpot() {
    var hero = $("#hero"), spot = $(".hero-spot");
    if (!hero || !spot || !hoverable) return;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      spot.style.setProperty("--mx", (e.clientX - r.left) + "px");
      spot.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ---------- Aparición al hacer scroll (umbral bajo + red de seguridad) ---------- */
  function initReveal() {
    var els = $$(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { el.classList.add("in"); }); }, 6000);
  }

  /* ---------- Contadores ---------- */
  function initCounters() {
    var els = $$("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = parseFloat(el.getAttribute("data-count")) || 0, t0 = null, dur = 1400;
        function step(t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
          el.textContent = Math.round(to * e);
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Preguntas: apertura suave ---------- */
  function initFaq() {
    $$(".faq-item").forEach(function (d) {
      var sum = $("summary", d), body = $(".faq-body", d);
      if (!sum || !body || !body.animate) return;
      sum.addEventListener("click", function (e) {
        e.preventDefault();
        if (d.open) {
          var h = body.offsetHeight;
          var a = body.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 380, easing: "cubic-bezier(.65,0,.35,1)" });
          a.onfinish = function () { d.open = false; };
        } else {
          $$(".faq-item[open]").forEach(function (o) { if (o !== d) o.open = false; });
          d.open = true;
          var h2 = body.offsetHeight;
          body.animate([{ height: "0px", opacity: 0 }, { height: h2 + "px", opacity: 1 }], { duration: 480, easing: "cubic-bezier(.16,1,.3,1)" });
        }
      });
    });
  }

  /* ---------- Formulario → WhatsApp ---------- */
  function initForm() {
    var form = $("#contactForm"), status = $("#formStatus");
    if (!form) return;
    var busy = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      var ok = true;
      $$("[required]", form).forEach(function (inp) {
        var f = inp.closest(".field"), bad = !inp.value.trim();
        if (f) f.classList.toggle("is-error", bad);
        if (bad && ok) { inp.focus(); ok = false; }
      });
      if (!ok) { status.textContent = "Revisa los campos marcados."; return; }
      var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ""; };
      var lines = ["Hola Nexoparts, soy " + v("nombre") + ".", "Auto: " + v("marca") + " " + v("modelo")];
      if (v("pieza")) lines.push("Busco: " + v("pieza"));
      if (v("mensaje")) lines.push(v("mensaje"));
      var url = waLink(lines.join("\n"));
      busy = true;
      var win = window.open(url, "_blank", "noopener");
      form.classList.add("is-sending");
      status.textContent = "Preparando tu mensaje…";
      setTimeout(function () {
        form.classList.remove("is-sending"); form.classList.add("is-done");
        status.innerHTML = win ? "¡Listo! Se abrió WhatsApp con tu mensaje. Solo presiona enviar." : 'Listo. Si WhatsApp no se abrió, <a href="' + url + '" target="_blank" rel="noopener">toca aquí para abrirlo</a>.';
        setTimeout(function () { form.classList.remove("is-done"); busy = false; }, 3500);
      }, 950);
    });
    $$(".input", form).forEach(function (inp) {
      inp.addEventListener("input", function () { var f = inp.closest(".field"); if (f) f.classList.remove("is-error"); });
    });
  }

  /* ---------- Animaciones con GSAP (si cargó) ---------- */
  function initGsap() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);

    // Parallax suave de la foto del hero
    var heroImg = $(".hero-bg img");
    if (heroImg) gsap.to(heroImg, { yPercent: 12, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
    var stage = $(".hero-stage");
    if (stage) gsap.to(stage, { y: -60, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });

    // Despiece técnico: se dibuja con el scroll
    var bp = $("#blueprint");
    if (bp) {
      var paths = $$(".draw", bp);
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to(paths, { strokeDashoffset: 0, ease: "none", stagger: .04, scrollTrigger: { trigger: bp, start: "top 85%", end: "bottom 45%", scrub: .6 } });
      gsap.from($$(".lbl, .dot", bp), { opacity: 0, duration: .6, stagger: .06, scrollTrigger: { trigger: bp, start: "top 60%" } });
    }

    // Marquee con velocidad según scroll
    var track = $(".marquee-track");
    if (track) {
      ST.create({ trigger: ".marquee", start: "top bottom", end: "bottom top", onUpdate: function (self) {
        var v = Math.min(3, 1 + Math.abs(self.getVelocity()) / 1200);
        track.style.animationDuration = (38 / v) + "s";
      } });
    }

    // Cómo comprar: scroll horizontal fijado (solo escritorio)
    var mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", function () {
      var section = $("#como-comprar"), ptrack = $("#processTrack"), pbar = $("#processBar");
      if (!section || !ptrack) return;
      section.classList.add("is-pinned");
      $$(".step", ptrack).forEach(function (s) { s.classList.add("in"); });
      var dist = function () { return Math.max(0, ptrack.scrollWidth - window.innerWidth); };
      var tween = gsap.to(ptrack, {
        x: function () { return -dist(); }, ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: function () { return "+=" + dist(); },
          pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: function (self) { if (pbar) pbar.style.transform = "scaleX(" + self.progress + ")"; }
        }
      });
      return function () { section.classList.remove("is-pinned"); tween.kill(); gsap.set(ptrack, { clearProps: "transform" }); };
    });

    window.addEventListener("load", function () { ST.refresh(); });
  }

  function initYear() { var y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }

  /* Espacios publicitarios: solo se activan los que tienen data-ad-slot.
     Los vacíos quedan ocultos para no mostrar huecos en blanco. */
  function initAds() {
    var slots = document.querySelectorAll(".ad-slot");
    for (var i = 0; i < slots.length; i++) {
      var ins = slots[i].querySelector("ins.adsbygoogle");
      if (!ins || !ins.getAttribute("data-ad-slot")) continue;
      slots[i].classList.add("is-on");
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    }
  }

  function boot() {
    safe(initSplash, "splash");
    safe(initHeader, "header");
    safe(initMenu, "menu");
    safe(initStatus, "status");
    safe(initSelects, "selects");
    safe(initHomeCatalog, "homeCatalog");
    safe(initFullCatalog, "fullCatalog");
    safe(initTilt, "tilt");
    safe(initMagnetic, "magnetic");
    safe(initHeroSpot, "heroSpot");
    safe(initReveal, "reveal");
    safe(initCounters, "counters");
    safe(initFaq, "faq");
    safe(initForm, "form");
    safe(initGsap, "gsap");
    safe(initYear, "year");
    safe(initAds, "ads");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
