async function loadInto(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(url, { cache: "no-cache" });
  el.innerHTML = await res.text();
}

function getSession() {
  try { return JSON.parse(localStorage.getItem("nudgie_session")); }
  catch { return null; }
}

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const map = {
    "about.html": "about",
    "contact.html": "contact",
    "login.html": "login"
  };

  const key = map[path];
  if (!key) return;

  if (key === "login") {
    const loginBtn = document.querySelector('a[href="login.html"]');
    if (loginBtn) loginBtn.classList.add("active");
    return;
  }

  const link = document.querySelector(`[data-nav="${key}"]`);
  if (link) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
}

function setActiveAppNav() {
  const path = (location.pathname.split("/").pop() || "").toLowerCase();

  const map = {
    "birthdays.html": "birthdays",
    "home.html": "home",
    "place.html": "place",
    "health.html": "health"
  };

  const key = map[path];
  if (!key) return;

  const link = document.querySelector(`[data-appnav="${key}"]`);
  if (link) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
}

function applyAuthUI() {
  const s = getSession();
  const loggedIn = !!(s && s.email);

  document.querySelectorAll('[data-auth="logged-in"]').forEach(el => {
    el.classList.toggle("d-none", !loggedIn);
  });

  document.querySelectorAll('[data-auth="logged-out"]').forEach(el => {
    el.classList.toggle("d-none", loggedIn);
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("nudgie_session");
      location.href = "login.html";
    };
  }

  // If app nav exists, set the chip
  const chip = document.getElementById("accountChip");
  if (chip) {
    chip.textContent = loggedIn ? s.email : "Signed out";
  }
}

function enforceAuthOnAppPages() {
  const appPages = new Set(["birthdays.html", "home.html", "place.html", "health.html"]);
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!appPages.has(path)) return;

  const s = getSession();
  if (!s?.email) {
    location.href = "login.html";
  }
}

async function initSharedChrome() {
  // Redirect first if needed
  enforceAuthOnAppPages();

  await loadInto("site-header", "header.html");
  await loadInto("site-footer", "footer.html");

  // Only load app nav if placeholder exists on the page
  await loadInto("app-nav", "app-nav.html");

  // Footer year
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  setActiveNav();
  setActiveAppNav();
  applyAuthUI();
}

document.addEventListener("DOMContentLoaded", initSharedChrome);
