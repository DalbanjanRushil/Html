document.addEventListener("DOMContentLoaded", () => {
  const navItems = [
    { href: "index.html", label: "Home" },
    { href: "flowchart.html", label: "Flowchart" },
    { href: "dfd.html", label: "DFD" },
    { href: "activity.html", label: "Activity" },
    { href: "sequence.html", label: "Sequence" },
    { href: "uml.html", label: "UML" },
    { href: "er.html", label: "ER" },
    { href: "usecase.html", label: "Use Case" },
    { href: "deployment.html", label: "Deployment" },
    { href: "components.html", label: "Components" },
    { href: "withdrawl-state.html", label: "Withdrawals" },
    { href: "datadictionary.html", label: "Data Dictionary" },
    { href: "api.html", label: "API Endpoints" },
    { href: "glossary.html", label: "Glossary" },
  ];

  const existingSidebars = Array.from(document.querySelectorAll(".sidebar"));
  existingSidebars.slice(1).forEach((el) => el.remove());

  const sidebar = existingSidebars[0] || document.createElement("div");
  sidebar.classList.add("sidebar");
  sidebar.setAttribute("role", "navigation");
  sidebar.setAttribute("aria-label", "Primary");

  const navHtml = navItems
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join("");
  sidebar.innerHTML = `<h1>INVESTHUB</h1><ul>${navHtml}</ul>`;

  if (!existingSidebars[0]) {
    document.body.prepend(sidebar);
  }

  const existingToggles = Array.from(document.querySelectorAll(".mobile-toggle"));
  existingToggles.slice(1).forEach((el) => el.remove());

  let toggleBtn = existingToggles[0] || null;
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "mobile-toggle";
    toggleBtn.textContent = "☰ Menu";
    document.body.prepend(toggleBtn);
  } else if (toggleBtn.tagName !== "BUTTON") {
    const replacement = document.createElement("button");
    replacement.type = "button";
    replacement.className = toggleBtn.className;
    replacement.textContent = toggleBtn.textContent || "☰ Menu";
    toggleBtn.replaceWith(replacement);
    toggleBtn = replacement;
  }
  toggleBtn.setAttribute("aria-controls", "investhub-sidebar");
  toggleBtn.setAttribute("aria-expanded", "false");

  if (!sidebar.id) sidebar.id = "investhub-sidebar";
  sidebar.id = "investhub-sidebar";

  const existingBackdrops = Array.from(document.querySelectorAll(".sidebar-backdrop"));
  existingBackdrops.slice(1).forEach((el) => el.remove());

  let backdrop = existingBackdrops[0] || null;
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    document.body.prepend(backdrop);
  }

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const links = Array.from(sidebar.querySelectorAll("a[href]"));
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === page);
  });

  const setOpen = (open) => {
    sidebar.classList.toggle("open", open);
    backdrop.classList.toggle("open", open);
    toggleBtn.setAttribute("aria-expanded", String(open));
  };

  toggleBtn.addEventListener("click", () => {
    setOpen(!sidebar.classList.contains("open"));
  });

  backdrop.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 1024 && sidebar.classList.contains("open")) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        setOpen(false);
      }
    }
  });
});
