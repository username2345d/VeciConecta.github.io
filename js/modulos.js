/* =========================================================
   VeciConecta - Página de módulos educativos
   Usa los datos de js/modulos-data.js (constante MODULOS)
   ========================================================= */

(function () {
  const STORAGE_KEY = "veciconecta:modulos";
  const LETRAS = ["A", "B", "C", "D"];

  /* Contenido interno de cada icono (viewBox 24x24) */
  const ICONOS = {
    residuos: '<path d="M9 3h6l1 2h4v2H4V5h4l1-2zM6 9h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9zm4 2v8h1.5v-8H10zm2.5 0v8H14v-8h-1.5z"/>',
    agua: '<path d="M12 2.5c3.5 4.4 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.5-6.6 6-11z"/>',
    convivencia: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-1.2 13.2l5-5-1.4-1.4-3.6 3.6-1.6-1.6-1.4 1.4 3 3z"/>',
    salud: '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z"/>',
    mascotas: '<ellipse cx="6.5" cy="10" rx="2" ry="2.6"/><ellipse cx="10.5" cy="5.8" rx="2" ry="2.6"/><ellipse cx="15.5" cy="5.8" rx="2" ry="2.6"/><ellipse cx="19" cy="10" rx="2" ry="2.6"/><path d="M12.8 11c-2.6 0-5.3 3.2-5.3 5.7 0 1.6 1.2 2.5 2.7 2.5 1 0 1.5-.4 2.6-.4s1.6.4 2.6.4c1.5 0 2.7-.9 2.7-2.5 0-2.5-2.7-5.7-5.3-5.7z"/>',
    energia: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
    digital: '<path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9z"/>',
    participacion: '<circle cx="12" cy="7" r="3.2"/><circle cx="5.5" cy="9" r="2.4"/><circle cx="18.5" cy="9" r="2.4"/><path d="M12 12c-3.3 0-6 1.8-6 4.2V19h12v-2.8c0-2.4-2.7-4.2-6-4.2zM5.5 12.5C3.5 12.6 2 13.8 2 15.5V18h3v-1.8c0-1.4.6-2.6 1.6-3.5-.3-.1-.7-.2-1.1-.2zm13 0c-.4 0-.8.1-1.1.2 1 .9 1.6 2.1 1.6 3.5V18h3v-2.5c0-1.7-1.5-2.9-3.5-3z"/>'
  };

  const lista = document.getElementById("lista-modulos");
  const dialogo = document.getElementById("quiz");
  const cuerpo = document.getElementById("quiz-cuerpo");
  const tituloQuiz = document.getElementById("quiz-titulo");
  const btnCerrar = document.getElementById("quiz-cerrar");
  const textoProgreso = document.getElementById("progreso-texto");
  const barra = document.getElementById("progreso-barra");
  const barraContenedor = document.getElementById("progreso-contenedor");

  let progreso = cargarProgreso();
  let estado = null; // { modulo, indice, aciertos, fallada }

  /* ---------- Progreso guardado en el navegador ---------- */
  function cargarProgreso() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function guardarProgreso() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
    } catch (error) {
      /* Si el navegador no permite guardar, el quiz sigue funcionando */
    }
  }

  function icono(nombre) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONOS[nombre] || ICONOS.participacion) + "</svg>";
  }

  /* ---------- Lista de módulos ---------- */
  function renderLista() {
    lista.innerHTML = MODULOS.map((modulo) => {
      const resultado = progreso[modulo.id];
      const estadoTexto = resultado
        ? '<span class="module__status module__status--done">Completado: ' + resultado.aciertos + " de " + resultado.total + " a la primera</span>"
        : '<span class="module__status">' + modulo.preguntas.length + " preguntas</span>";

      return (
        '<li class="module module--' + modulo.color + '" id="modulo-' + modulo.id + '">' +
          '<div class="module__icon">' + icono(modulo.icono) + "</div>" +
          '<div class="module__body">' +
            "<h3>Módulo " + modulo.id + ". " + modulo.titulo + "</h3>" +
            "<p>" + modulo.descripcion + "</p>" +
            '<div class="module__footer">' +
              estadoTexto +
              '<button type="button" class="btn btn--primary" data-id="' + modulo.id + '">' +
                (resultado ? "Repetir módulo" : "Empezar módulo") +
              "</button>" +
            "</div>" +
          "</div>" +
        "</li>"
      );
    }).join("");
  }

  function actualizarProgreso() {
    const completados = MODULOS.filter((modulo) => progreso[modulo.id]).length;
    const porcentaje = Math.round((completados / MODULOS.length) * 100);
    textoProgreso.textContent = completados + " de " + MODULOS.length + " módulos completados";
    barra.style.width = porcentaje + "%";
    barraContenedor.setAttribute("aria-valuenow", String(completados));
  }

  /* ---------- Quiz ---------- */
  function abrirModulo(id) {
    const modulo = MODULOS.find((item) => item.id === id);
    if (!modulo) return;
    estado = { modulo: modulo, indice: 0, aciertos: 0, fallada: false };
    tituloQuiz.textContent = "Módulo " + modulo.id + ". " + modulo.titulo;
    mostrarPregunta();
    if (!dialogo.open) dialogo.showModal();
  }

  function mostrarPregunta() {
    const total = estado.modulo.preguntas.length;
    const pregunta = estado.modulo.preguntas[estado.indice];
    estado.fallada = false;

    cuerpo.innerHTML =
      '<p class="quiz__step">Pregunta ' + (estado.indice + 1) + " de " + total + "</p>" +
      '<h3 class="quiz__question">' + pregunta.texto + "</h3>" +
      '<ul class="quiz__options">' +
        pregunta.opciones.map((texto, posicion) =>
          '<li><button type="button" class="option" data-opcion="' + posicion + '">' +
            '<span class="option__letter">' + LETRAS[posicion] + "</span>" +
            '<span class="option__text">' + texto + "</span>" +
          "</button></li>"
        ).join("") +
      "</ul>" +
      '<div class="quiz__feedback" id="quiz-feedback" role="status" aria-live="polite"></div>' +
      '<div class="quiz__actions" id="quiz-acciones"></div>';
  }

  function responder(boton) {
    const pregunta = estado.modulo.preguntas[estado.indice];
    const posicion = Number(boton.dataset.opcion);
    const feedback = document.getElementById("quiz-feedback");
    const acciones = document.getElementById("quiz-acciones");

    if (posicion === pregunta.correcta) {
      // Respuesta correcta: se bloquean las opciones y se muestra el mensaje de acierto
      cuerpo.querySelectorAll(".option").forEach((opcion) => (opcion.disabled = true));
      boton.classList.add("option--correct");
      if (!estado.fallada) estado.aciertos++;

      feedback.className = "quiz__feedback quiz__feedback--ok";
      feedback.textContent = pregunta.acierto;

      const esUltima = estado.indice === estado.modulo.preguntas.length - 1;
      acciones.innerHTML =
        '<button type="button" class="btn btn--primary" id="quiz-siguiente">' +
        (esUltima ? "Ver resultado" : "Siguiente pregunta") + "</button>";
      document.getElementById("quiz-siguiente").focus();
    } else {
      // Respuesta incorrecta: se marca la opción y se muestra la pista; puede volver a intentar
      estado.fallada = true;
      boton.disabled = true;
      boton.classList.add("option--wrong");
      feedback.className = "quiz__feedback quiz__feedback--hint";
      feedback.textContent = pregunta.fallo;
    }
  }

  function siguiente() {
    if (estado.indice < estado.modulo.preguntas.length - 1) {
      estado.indice++;
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }

  function mostrarResultado() {
    const total = estado.modulo.preguntas.length;
    const anterior = progreso[estado.modulo.id];
    const mejor = anterior ? Math.max(anterior.aciertos, estado.aciertos) : estado.aciertos;
    progreso[estado.modulo.id] = { aciertos: mejor, total: total };
    guardarProgreso();

    const perfecto = estado.aciertos === total;
    const mensaje = perfecto
      ? "¡Excelente trabajo! Respondiste todas las preguntas a la primera."
      : "Terminaste el módulo. Acertaste " + estado.aciertos + " de " + total + " a la primera; puedes repetirlo para mejorar tu resultado.";

    cuerpo.innerHTML =
      '<div class="quiz__result">' +
        '<div class="quiz__result-icon module--' + estado.modulo.color + '">' + icono(estado.modulo.icono) + "</div>" +
        "<h3>Módulo completado</h3>" +
        '<p class="quiz__score">' + estado.aciertos + " de " + total + " a la primera</p>" +
        "<p>" + mensaje + "</p>" +
        '<div class="quiz__actions quiz__actions--center">' +
          '<button type="button" class="btn btn--outline" id="quiz-repetir">Repetir módulo</button>' +
          '<button type="button" class="btn btn--primary" id="quiz-terminar">Volver a los módulos</button>' +
        "</div>" +
      "</div>";
    document.getElementById("quiz-terminar").focus();
  }

  /* ---------- Eventos ---------- */
  lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-id]");
    if (boton) abrirModulo(Number(boton.dataset.id));
  });

  cuerpo.addEventListener("click", (evento) => {
    const opcion = evento.target.closest(".option");
    if (opcion && !opcion.disabled) return responder(opcion);
    if (evento.target.closest("#quiz-siguiente")) return siguiente();
    if (evento.target.closest("#quiz-repetir")) return abrirModulo(estado.modulo.id);
    if (evento.target.closest("#quiz-terminar")) return dialogo.close();
  });

  btnCerrar.addEventListener("click", () => dialogo.close());

  // Clic fuera de la ventana para cerrarla
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });

  // Al cerrar: se actualiza la lista y el foco vuelve al módulo
  dialogo.addEventListener("close", () => {
    const id = estado ? estado.modulo.id : null;
    renderLista();
    actualizarProgreso();
    if (id) {
      const boton = lista.querySelector('button[data-id="' + id + '"]');
      if (boton) boton.focus();
    }
  });

  renderLista();
  actualizarProgreso();
})();
