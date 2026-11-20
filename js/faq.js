/* =========================================================
   VeciConecta - Preguntas frecuentes
   Filtra las preguntas por tema. Las respuestas se abren
   y cierran con el elemento <details> del propio navegador.
   ========================================================= */

(function () {
  const filtros = document.querySelectorAll(".filter");
  const preguntas = document.querySelectorAll(".faq__item");
  const conteo = document.getElementById("faq-conteo");

  function aplicarFiltro(tema) {
    let visibles = 0;

    preguntas.forEach((pregunta) => {
      const coincide = tema === "todas" || pregunta.dataset.categoria === tema;
      pregunta.hidden = !coincide;
      if (!coincide) pregunta.open = false;
      if (coincide) visibles++;
    });

    filtros.forEach((boton) => {
      boton.setAttribute("aria-pressed", String(boton.dataset.filtro === tema));
    });

    conteo.textContent = "Mostrando " + visibles + (visibles === 1 ? " pregunta" : " preguntas");
  }

  filtros.forEach((boton) => {
    boton.addEventListener("click", () => aplicarFiltro(boton.dataset.filtro));
  });
})();
