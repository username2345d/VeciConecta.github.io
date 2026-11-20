/* =========================================================
   VeciConecta - Contenido de los módulos educativos
   Para agregar o editar un módulo, modifica solo este archivo.
   - correcta: posición de la respuesta correcta (0 = A, 1 = B, 2 = C)
   - acierto: mensaje si responde bien
   - fallo: pista si responde mal (no revela la respuesta)
   ========================================================= */

const MODULOS = [
  {
    id: 1,
    color: "blue",
    icono: "residuos",
    titulo: "Manejo adecuado de residuos y reciclaje",
    descripcion: "Aprende a separar correctamente los residuos, reducir la contaminación y contribuir al cuidado del medioambiente desde tu hogar.",
    preguntas: [
      {
        texto: "¿Cuál es la manera correcta de separar los residuos en Colombia?",
        opciones: [
          "Depositar todos los residuos en una misma bolsa.",
          "Utilizar bolsas blancas para residuos aprovechables, negras para no aprovechables y verdes para orgánicos aprovechables.",
          "Dejar los residuos en la calle para que alguien los recoja."
        ],
        correcta: 1,
        acierto: "¡Excelente! Separar los residuos mediante el código de colores facilita el reciclaje, el aprovechamiento de materiales y la disposición adecuada de los desechos.",
        fallo: "¡Casi lo logras! En Colombia existe un código de colores establecido para facilitar la clasificación de los residuos. Piensa en cómo se pueden aprovechar algunos materiales antes de desecharlos."
      },
      {
        texto: "¿Qué debemos hacer con las bolsas de basura antes de que pase el camión recolector?",
        opciones: [
          "Dejarlas en el separador de la avenida.",
          "Sacarlas cualquier día de la semana.",
          "Colocarlas al frente de nuestra vivienda, respetando los días de recolección."
        ],
        correcta: 2,
        acierto: "¡Muy bien! Respetar los horarios y colocar las bolsas frente a cada vivienda facilita la recolección y ayuda a mantener limpio nuestro sector.",
        fallo: "¡Inténtalo nuevamente! Recuerda que la recolección tiene días establecidos y que debemos utilizar el lugar indicado para depositar los residuos."
      }
    ]
  },
  {
    id: 2,
    color: "green",
    icono: "agua",
    titulo: "Ahorro de agua y cuidado del medioambiente",
    descripcion: "Conoce hábitos sencillos para ahorrar agua, evitar desperdicios y proteger uno de los recursos naturales más importantes.",
    preguntas: [
      {
        texto: "¿Cuál de estas acciones ayuda a ahorrar agua en el hogar?",
        opciones: [
          "Dejar la llave abierta mientras nos cepillamos los dientes.",
          "Reparar las fugas y cerrar la llave cuando no se utiliza.",
          "Lavar los vehículos diariamente utilizando manguera."
        ],
        correcta: 1,
        acierto: "¡Excelente! Reparar las fugas y cerrar las llaves cuando no se necesitan permite ahorrar agua y reducir su desperdicio.",
        fallo: "¡Piénsalo un momento! Algunas actividades cotidianas pueden consumir más agua de la necesaria. Reflexiona sobre cuáles podrían evitarse o mejorarse."
      },
      {
        texto: "¿Qué debemos hacer si encontramos una fuga de agua en un espacio público?",
        opciones: [
          "Ignorarla porque no está dentro de nuestra vivienda.",
          "Intentar cubrirla con basura.",
          "Reportarla a la entidad encargada para que pueda ser atendida."
        ],
        correcta: 2,
        acierto: "¡Muy bien! Reportar las fugas permite que las entidades responsables puedan atenderlas y evitar el desperdicio de agua.",
        fallo: "¡No olvides que los espacios públicos también son responsabilidad de todos! Reflexiona sobre quién puede solucionar una avería en la infraestructura pública."
      }
    ]
  },
  {
    id: 3,
    color: "navy",
    icono: "convivencia",
    titulo: "Seguridad y convivencia ciudadana",
    descripcion: "Fortalece la convivencia, aprende a resolver conflictos de manera pacífica y contribuye a construir un entorno seguro y respetuoso.",
    preguntas: [
      {
        texto: "¿Qué debemos hacer cuando tenemos un conflicto con un vecino?",
        opciones: [
          "Buscar una solución mediante el diálogo y el respeto.",
          "Responder con insultos y amenazas.",
          "Ignorar el problema y generar discusiones con otros vecinos."
        ],
        correcta: 0,
        acierto: "¡Excelente! El diálogo y el respeto permiten solucionar desacuerdos sin recurrir a agresiones y fortalecen las relaciones entre vecinos.",
        fallo: "¡Reflexiona sobre la importancia de la convivencia! Una discusión puede empeorar cuando se responde con agresividad. Busca alternativas que permitan solucionar los problemas pacíficamente."
      },
      {
        texto: "¿Qué debemos hacer si observamos una situación sospechosa o un posible delito en el sector?",
        opciones: [
          "Enfrentar directamente a los responsables.",
          "Reportar la situación a las autoridades competentes.",
          "Publicar acusaciones sin verificar la información."
        ],
        correcta: 1,
        acierto: "¡Muy bien! Informar a las autoridades permite que la situación sea atendida sin poner en riesgo nuestra integridad.",
        fallo: "¡Ten precaución! Ante una situación de riesgo, es importante proteger nuestra seguridad y evitar acciones que puedan agravar el problema."
      }
    ]
  },
  {
    id: 4,
    color: "blue",
    icono: "salud",
    titulo: "Prevención del dengue y cuidado de la salud",
    descripcion: "Aprende a identificar los factores que favorecen la reproducción de mosquitos y descubre cómo prevenir enfermedades como el dengue.",
    preguntas: [
      {
        texto: "¿Dónde suele reproducirse el mosquito transmisor del dengue?",
        opciones: [
          "En recipientes que acumulan agua estancada.",
          "En superficies completamente secas.",
          "En lugares sin presencia de humedad."
        ],
        correcta: 0,
        acierto: "¡Correcto! El mosquito Aedes aegypti deposita sus huevos en recipientes que contienen agua. Evitar estas acumulaciones es fundamental para prevenir su reproducción.",
        fallo: "¡Pista! Este mosquito necesita determinadas condiciones ambientales para completar su ciclo de vida. Piensa en los lugares donde puede encontrar agua acumulada."
      },
      {
        texto: "¿Cuál es una medida efectiva para prevenir el dengue?",
        opciones: [
          "Mantener recipientes destapados.",
          "Acumular llantas y envases en los patios.",
          "Eliminar el agua estancada y mantener tapados los depósitos de agua."
        ],
        correcta: 2,
        acierto: "¡Excelente! Eliminar los criaderos y mantener los depósitos tapados son medidas importantes para prevenir la reproducción del mosquito.",
        fallo: "¡Inténtalo otra vez! La prevención del dengue comienza en nuestros hogares. Observa qué objetos pueden acumular agua después de la lluvia."
      }
    ]
  },
  {
    id: 5,
    color: "green",
    icono: "mascotas",
    titulo: "Tenencia responsable de mascotas",
    descripcion: "Conoce las responsabilidades que implica tener una mascota y aprende a cuidar los espacios compartidos por toda la comunidad.",
    preguntas: [
      {
        texto: "¿Qué debemos hacer cuando paseamos a nuestro perro por el barrio?",
        opciones: [
          "Permitir que camine sin supervisión.",
          "Llevarlo con correa y recoger sus excrementos.",
          "Dejar que haga sus necesidades en cualquier lugar sin recogerlas."
        ],
        correcta: 1,
        acierto: "¡Muy bien! Llevar a nuestras mascotas con correa y recoger sus excrementos ayuda a mantener los espacios públicos limpios y seguros.",
        fallo: "¡Reflexiona! Las mascotas necesitan supervisión y sus propietarios deben asumir responsabilidades para evitar molestias y problemas de higiene en los espacios compartidos."
      },
      {
        texto: "¿Qué debemos hacer si una mascota se encuentra perdida en el sector?",
        opciones: [
          "Intentar ayudarla de manera segura y reportar el caso a los responsables o entidades correspondientes.",
          "Maltratarla para alejarla.",
          "Ignorarla siempre."
        ],
        correcta: 0,
        acierto: "¡Excelente! Ayudar de manera responsable puede facilitar que la mascota encuentre nuevamente a su familia.",
        fallo: "¡Recuerda que los animales también necesitan protección! Piensa en cómo podrías ayudar sin poner en riesgo tu seguridad ni la del animal."
      }
    ]
  },
  {
    id: 6,
    color: "navy",
    icono: "energia",
    titulo: "Ahorro de energía en el hogar",
    descripcion: "Descubre cómo reducir el consumo de electricidad mediante hábitos sencillos que también pueden ayudar a disminuir los gastos del hogar.",
    preguntas: [
      {
        texto: "¿Cuál de estas acciones permite ahorrar energía eléctrica?",
        opciones: [
          "Dejar las luces encendidas en habitaciones vacías.",
          "Mantener todos los electrodomésticos conectados permanentemente.",
          "Apagar las luces y desconectar los equipos que no se están utilizando."
        ],
        correcta: 2,
        acierto: "¡Excelente! Apagar las luces y evitar el uso innecesario de aparatos eléctricos ayuda a reducir el consumo de energía.",
        fallo: "¡Piénsalo bien! Muchos equipos continúan consumiendo electricidad cuando permanecen encendidos o en ciertos modos de espera."
      },
      {
        texto: "¿Qué tipo de bombillos suele consumir menos electricidad?",
        opciones: [
          "Bombillos LED.",
          "Bombillos incandescentes tradicionales.",
          "Bombillos halógenos."
        ],
        correcta: 0,
        acierto: "¡Correcto! Los bombillos LED ofrecen una buena iluminación con un consumo energético menor y una vida útil generalmente más prolongada.",
        fallo: "¡Una pequeña pista! No todos los bombillos utilizan la misma tecnología. Algunos convierten una mayor cantidad de energía en luz y desperdician menos en forma de calor."
      }
    ]
  },
  {
    id: 7,
    color: "blue",
    icono: "digital",
    titulo: "Seguridad digital y prevención de estafas",
    descripcion: "Aprende a proteger tu información personal, reconocer mensajes sospechosos y evitar fraudes a través de internet, redes sociales y aplicaciones de mensajería.",
    preguntas: [
      {
        texto: "Recibes un mensaje que dice que ganaste un premio y te solicita tus datos bancarios para reclamarlo. ¿Qué debes hacer?",
        opciones: [
          "Enviar inmediatamente tus datos.",
          "Compartir el mensaje con todos tus contactos.",
          "Desconfiar, no proporcionar información y verificar si la promoción es legítima."
        ],
        correcta: 2,
        acierto: "¡Excelente! Los delincuentes pueden utilizar premios falsos para obtener información personal y bancaria. Verificar los mensajes sospechosos ayuda a evitar estafas.",
        fallo: "¡Cuidado! Los mensajes que ofrecen premios inesperados pueden ocultar intenciones fraudulentas. Antes de actuar, piensa qué información podrían estar intentando obtener."
      },
      {
        texto: "¿Cuál es la mejor manera de proteger nuestras contraseñas?",
        opciones: [
          "Utilizar la misma contraseña para todas las cuentas.",
          "Crear contraseñas largas y diferentes, y activar la verificación en dos pasos.",
          "Compartirlas con amigos para no olvidarlas."
        ],
        correcta: 1,
        acierto: "¡Muy bien! Las contraseñas únicas y la autenticación en dos pasos dificultan el acceso no autorizado a nuestras cuentas.",
        fallo: "¡Pista! Una contraseña debe ser personal y difícil de adivinar. También es importante contar con una protección adicional para acceder a nuestras cuentas."
      }
    ]
  },
  {
    id: 8,
    color: "green",
    icono: "participacion",
    titulo: "Participación y cuidado de los espacios públicos",
    descripcion: "Conoce cómo participar activamente en el mejoramiento del barrio, cuidar las zonas comunes y contribuir a solucionar los problemas de la comunidad.",
    preguntas: [
      {
        texto: "¿Qué debemos hacer si encontramos un daño en una vía, luminaria o espacio público?",
        opciones: [
          "Reportarlo a través de los canales comunitarios o entidades responsables.",
          "Ignorarlo porque no es nuestra responsabilidad.",
          "Dañar otros elementos para llamar la atención."
        ],
        correcta: 0,
        acierto: "¡Excelente! Los reportes ciudadanos permiten identificar los problemas del sector y facilitan su atención por parte de las entidades responsables.",
        fallo: "¡Reflexiona! Los daños en los espacios públicos pueden afectar a todos los residentes. Piensa en qué acciones permiten que las personas responsables conozcan el problema."
      },
      {
        texto: "¿Por qué es importante participar en las actividades comunitarias?",
        opciones: [
          "Porque únicamente los líderes deben preocuparse por el barrio.",
          "Porque permite trabajar en equipo, identificar necesidades y mejorar la calidad de vida.",
          "Porque no tiene ningún beneficio para los residentes."
        ],
        correcta: 1,
        acierto: "¡Así es! La participación fortalece la unión entre vecinos y permite desarrollar soluciones colectivas para mejorar el entorno.",
        fallo: "¡Piénsalo! Una comunidad no se construye únicamente con el trabajo de sus líderes. La colaboración de los residentes también es fundamental."
      }
    ]
  }
];
