/* =========================================================
   VeciConecta - Script principal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".mainnav");
  const navToggle = document.querySelector(".nav-toggle");
  const submenuParents = document.querySelectorAll(".has-sub");

  /* ---------- Menú móvil (hamburguesa) ---------- */
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---------- Submenús desplegables ---------- */
  function closeAllSubmenus(except = null) {
    submenuParents.forEach((item) => {
      if (item !== except) {
        item.classList.remove("open");
        item.querySelector("button").setAttribute("aria-expanded", "false");
      }
    });
  }

  submenuParents.forEach((item) => {
    const button = item.querySelector("button");

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !item.classList.contains("open");
      closeAllSubmenus(item);
      item.classList.toggle("open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-sub")) closeAllSubmenus();
  });

  // Cerrar con la tecla Escape y devolver el foco al botón
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openItem = document.querySelector(".has-sub.open");
    if (openItem) {
      closeAllSubmenus();
      openItem.querySelector("button").focus();
    }
  });

  // Al elegir un enlace del menú en móvil, se cierra el menú
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeAllSubmenus();
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Año automático en el pie de página ---------- */
  const year = document.getElementById("anio");
  if (year) year.textContent = new Date().getFullYear();
});
