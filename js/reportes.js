/* =========================================================
   VeciConecta - Formulario de reportes
   ========================================================= */

(function () {
  const TAMANO_MAXIMO = 5 * 1024 * 1024; // 5 MB
  const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "application/pdf"];

  /* Reglas del número de documento según el tipo elegido */
  const REGLAS_DOCUMENTO = {
    cedula: { patron: /^\d{6,10}$/, mensaje: "Escribe solo números, entre 6 y 10 dígitos." },
    tarjeta: { patron: /^\d{8,11}$/, mensaje: "Escribe solo números, entre 8 y 11 dígitos." },
    extranjeria: { patron: /^\d{4,10}$/, mensaje: "Escribe solo números, entre 4 y 10 dígitos." },
    pasaporte: { patron: /^[A-Za-z0-9]{5,15}$/, mensaje: "Usa solo letras y números, entre 5 y 15 caracteres." },
    otro: { patron: /^[A-Za-z0-9-]{4,20}$/, mensaje: "Usa letras, números o guiones, entre 4 y 20 caracteres." }
  };

  const form = document.getElementById("form-reporte");
  const panelExito = document.getElementById("reporte-exito");
  const estado = document.getElementById("estado-formulario");
  const btnEnviar = document.getElementById("btn-enviar");

  const nombre = document.getElementById("nombre");
  const tipoDocumento = document.getElementById("tipo-documento");
  const numeroDocumento = document.getElementById("numero-documento");
  const campoOtro = document.getElementById("campo-otro");
  const tipoOtro = document.getElementById("tipo-otro");
  const motivo = document.getElementById("motivo");
  const contador = document.getElementById("contador-motivo");
  const consentimiento = document.getElementById("consentimiento");

  const archivo = document.getElementById("archivo");
  const dropzone = document.getElementById("dropzone");
  const archivoItem = document.getElementById("archivo-item");
  const archivoMiniatura = document.getElementById("archivo-miniatura");
  const archivoNombre = document.getElementById("archivo-nombre");
  const archivoTamano = document.getElementById("archivo-tamano");
  const archivoQuitar = document.getElementById("archivo-quitar");

  let urlMiniatura = null;

  /* ---------- Errores por campo ---------- */
  function mostrarError(campo, mensaje) {
    const caja = document.getElementById("error-" + campo.id);
    campo.setAttribute("aria-invalid", "true");
    if (caja) {
      caja.textContent = mensaje;
      caja.hidden = false;
    }
  }

  function limpiarError(campo) {
    const caja = document.getElementById("error-" + campo.id);
    campo.removeAttribute("aria-invalid");
    if (caja) {
      caja.textContent = "";
      caja.hidden = true;
    }
  }

  function limpiarTodosLosErrores() {
    [nombre, tipoDocumento, numeroDocumento, tipoOtro, motivo, archivo, consentimiento].forEach(limpiarError);
    estado.textContent = "";
  }

  /* ---------- Validación ---------- */
  function validarFormulario() {
    const invalidos = [];

    const textoNombre = nombre.value.trim();
    if (textoNombre.length < 5 || !textoNombre.includes(" ")) {
      mostrarError(nombre, "Escribe tu nombre completo, con nombre y apellido.");
      invalidos.push(nombre);
    }

    const tipo = tipoDocumento.value;
    if (!tipo) {
      mostrarError(tipoDocumento, "Selecciona el tipo de documento.");
      invalidos.push(tipoDocumento);
    }

    if (tipo === "otro" && tipoOtro.value.trim().length < 3) {
      mostrarError(tipoOtro, "Escribe qué tipo de documento es.");
      invalidos.push(tipoOtro);
    }

    const numero = numeroDocumento.value.trim();
    if (!numero) {
      mostrarError(numeroDocumento, "Escribe el número de documento.");
      invalidos.push(numeroDocumento);
    } else if (tipo && !REGLAS_DOCUMENTO[tipo].patron.test(numero)) {
      mostrarError(numeroDocumento, REGLAS_DOCUMENTO[tipo].mensaje);
      invalidos.push(numeroDocumento);
    }

    if (motivo.value.trim().length < 20) {
      mostrarError(motivo, "Describe el motivo con al menos 20 caracteres para que podamos entenderlo.");
      invalidos.push(motivo);
    }

    if (!consentimiento.checked) {
      mostrarError(consentimiento, "Debes autorizar el uso de tus datos para enviar el reporte.");
      invalidos.push(consentimiento);
    }

    // El error del archivo se muestra al elegirlo; aquí solo se verifica que siga siendo válido
    if (archivo.getAttribute("aria-invalid") === "true") invalidos.push(archivo);

    return invalidos;
  }

  /* ---------- Tipo de documento "Otro" ---------- */
  tipoDocumento.addEventListener("change", () => {
    const esOtro = tipoDocumento.value === "otro";
    campoOtro.hidden = !esOtro;
    if (!esOtro) {
      tipoOtro.value = "";
      limpiarError(tipoOtro);
    }
    limpiarError(tipoDocumento);
    limpiarError(numeroDocumento);
  });

  /* ---------- Limpiar errores al corregir ---------- */
  [nombre, numeroDocumento, tipoOtro, motivo].forEach((campo) => {
    campo.addEventListener("input", () => limpiarError(campo));
  });
  consentimiento.addEventListener("change", () => limpiarError(consentimiento));

  motivo.addEventListener("input", () => {
    contador.textContent = motivo.value.length + " / " + motivo.maxLength;
  });

  /* ---------- Carga de archivo ---------- */
  function formatearTamano(bytes) {
    if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function quitarArchivo() {
    archivo.value = "";
    archivoItem.hidden = true;
    archivoMiniatura.innerHTML = "";
    if (urlMiniatura) {
      URL.revokeObjectURL(urlMiniatura);
      urlMiniatura = null;
    }
    limpiarError(archivo);
  }

  function procesarArchivo(file) {
    limpiarError(archivo);
    if (!file) return quitarArchivo();

    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      quitarArchivo();
      return mostrarError(archivo, "El formato no es válido. Adjunta una imagen JPG, PNG o un archivo PDF.");
    }
    if (file.size > TAMANO_MAXIMO) {
      quitarArchivo();
      return mostrarError(archivo, "El archivo pesa " + formatearTamano(file.size) + " y el máximo permitido es 5 MB.");
    }

    archivoNombre.textContent = file.name;
    archivoTamano.textContent = formatearTamano(file.size);
    archivoMiniatura.innerHTML = "";

    if (file.type.startsWith("image/")) {
      urlMiniatura = URL.createObjectURL(file);
      const img = document.createElement("img");
      img.src = urlMiniatura;
      img.alt = "";
      archivoMiniatura.appendChild(img);
    } else {
      archivoMiniatura.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V9h5.5L13 3.5zM8 13h8v1.6H8V13zm0 3.4h8V18H8v-1.6z"/></svg>';
    }
    archivoItem.hidden = false;
  }

  archivo.addEventListener("change", () => procesarArchivo(archivo.files[0]));
  archivoQuitar.addEventListener("click", () => {
    quitarArchivo();
    archivo.focus();
  });

  ["dragenter", "dragover"].forEach((evento) =>
    dropzone.addEventListener(evento, (e) => {
      e.preventDefault();
      dropzone.classList.add("is-dragover");
    })
  );
  ["dragleave", "drop"].forEach((evento) =>
    dropzone.addEventListener(evento, (e) => {
      e.preventDefault();
      dropzone.classList.remove("is-dragover");
    })
  );
  dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer && e.dataTransfer.files.length) {
      archivo.files = e.dataTransfer.files;
      procesarArchivo(archivo.files[0]);
    }
  });

  /* ---------- Envío ---------- */
  function generarCodigo() {
    const hoy = new Date();
    const fecha =
      hoy.getFullYear() +
      String(hoy.getMonth() + 1).padStart(2, "0") +
      String(hoy.getDate()).padStart(2, "0");
    const azar = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
    return "VC-" + fecha + "-" + azar;
  }

  /*
   * enviarReporte: punto único para conectar el formulario con un servidor.
   * Por ahora SIMULA el envío (no se guarda ni se transmite ningún dato).
   * Para conectarlo, reemplaza el contenido por una petición real, por ejemplo:
   *
   *   const respuesta = await fetch("URL_DEL_SERVIDOR", { method: "POST", body: datos });
   *   if (!respuesta.ok) throw new Error("No se pudo enviar el reporte");
   *   return await respuesta.json(); // debe devolver { codigo: "..." }
   */
  function enviarReporte(datos) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ codigo: generarCodigo() }), 900);
    });
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limpiarTodosLosErrores();

    const invalidos = validarFormulario();
    if (invalidos.length) {
      estado.textContent = "Revisa los campos marcados antes de enviar el reporte.";
      invalidos[0].focus();
      return;
    }

    const datos = new FormData(form);
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    try {
      const respuesta = await enviarReporte(datos);
      document.getElementById("exito-nombre").textContent = nombre.value.trim();
      document.getElementById("exito-codigo").textContent = respuesta.codigo;
      form.hidden = true;
      panelExito.hidden = false;
      panelExito.focus();
      panelExito.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      estado.textContent = "No pudimos enviar el reporte. Inténtalo de nuevo en unos minutos.";
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Enviar reporte";
    }
  });

  /* ---------- Reiniciar formulario ---------- */
  form.addEventListener("reset", () => {
    limpiarTodosLosErrores();
    quitarArchivo();
    campoOtro.hidden = true;
    contador.textContent = "0 / " + motivo.maxLength;
  });

  document.getElementById("exito-nuevo").addEventListener("click", () => {
    form.reset();
    panelExito.hidden = true;
    form.hidden = false;
    nombre.focus();
  });
})();
