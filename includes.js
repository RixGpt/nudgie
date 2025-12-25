
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

  // Special: login is a button, so we mark it via aria-current
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
}

async function initSharedChrome() {
  await loadInto("site-header", "header.html");
  await loadInto("site-footer", "footer.html");

  // Footer year
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  setActiveNav();
  applyAuthUI();
}

document.addEventListener("DOMContentLoaded", initSharedChrome);
