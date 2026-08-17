// ============================================================================
// CATÁLOGO DE PRODUCTOS — NEXOPARTS
// ----------------------------------------------------------------------------
// Para agregar, editar o quitar productos, solo modifica este arreglo.
// No es necesario tocar el HTML ni el CSS.
//
// Campos de cada producto:
//   id       -> identificador único (texto, sin espacios)
//   name     -> nombre del producto
//   brand    -> marca de auto compatible (debe coincidir con el filtro)
//   category -> una de: "frenos", "suspension", "motor", "electrico", "filtros", "carroceria"
//   sku      -> código de referencia / SKU de fábrica
//   fits     -> texto de compatibilidad (modelo, motor, años)
//   price    -> precio en CLP, solo número
//   img      -> ruta a la foto real del producto (ver instrucciones abajo)
//
// CÓMO PONER FOTOS REALES:
//   1. Crea una carpeta "images/productos/" junto a estos archivos HTML.
//   2. Guarda ahí la foto de cada repuesto, idealmente cuadrada o 4:3,
//      formato .jpg o .webp, menos de 300kb (para que cargue rápido).
//   3. En el campo "img" de cada producto, escribe la ruta relativa, ej:
//      img: "images/productos/bomba-agua-wpt057.jpg"
//   4. Si una imagen no existe o no carga, la página muestra automáticamente
//      un ícono de reemplazo — no se rompe el diseño.
// ============================================================================

const NEXOPARTS_PRODUCTS = [
  {
    id: "wpt057",
    name: "Bomba de Agua AISIN WPT-057",
    brand: "Toyota",
    category: "motor",
    sku: "AISIN-WPT057",
    fits: "Hilux 2.4L 2GD-FTV (2015–2023)",
    price: 38990,
    img: "images/productos/bomba-agua-wpt057.jpg"
  },
  {
    id: "tyk2043",
    name: "Kit de Embrague Exedy OEM",
    brand: "Toyota",
    category: "motor",
    sku: "EXEDY-TYK2043",
    fits: "Corolla 1.8L 2ZR (2009–2019)",
    price: 145000,
    img: "images/productos/embrague-tyk2043.jpg"
  },
  {
    id: "gdb1330",
    name: "Pastillas de Freno Delanteras",
    brand: "Nissan",
    category: "frenos",
    sku: "TRW-GDB1330",
    fits: "Qashqai J11 (2014–2021)",
    price: 24500,
    img: "images/productos/pastillas-gdb1330.jpg"
  },
  {
    id: "g8134",
    name: "Amortiguador Delantero",
    brand: "Chevrolet",
    category: "suspension",
    sku: "MONROE-G8134",
    fits: "Sail 1.4L (2013–2020)",
    price: 32900,
    img: "images/productos/amortiguador-g8134.jpg"
  },
  {
    id: "oc90",
    name: "Filtro de Aceite",
    brand: "Volkswagen",
    category: "filtros",
    sku: "MAHLE-OC90",
    fits: "Motores EA211 1.0 / 1.4",
    price: 6990,
    img: "images/productos/filtro-oc90.jpg"
  },
  {
    id: "k015420xs",
    name: "Kit Correa de Distribución",
    brand: "Hyundai",
    category: "motor",
    sku: "GATES-K015420XS",
    fits: "Accent 1.4L (2011–2017)",
    price: 58400,
    img: "images/productos/correa-k015420xs.jpg"
  },
  {
    id: "denso2344324",
    name: "Sensor de Oxígeno",
    brand: "Mazda",
    category: "electrico",
    sku: "DENSO-234-4324",
    fits: "Mazda 3 Skyactiv-G 2.0L (2014–2019)",
    price: 41200,
    img: "images/productos/sensor-denso.jpg"
  },
  {
    id: "k80641",
    name: "Rótula de Suspensión",
    brand: "Ford",
    category: "suspension",
    sku: "MOOG-K80641",
    fits: "Ranger 2.2L / 3.2L",
    price: 27800,
    img: "images/productos/rotula-k80641.jpg"
  },
  {
    id: "ngkiridium",
    name: "Bujía Iridium IX (juego de 4)",
    brand: "Kia",
    category: "motor",
    sku: "NGK-IX-KIA14",
    fits: "Rio 1.4L (2012–2020)",
    price: 8990,
    img: "images/productos/bujia-ngk-iridium.jpg"
  },
  {
    id: "es800115",
    name: "Rótula Axial de Dirección",
    brand: "Peugeot",
    category: "suspension",
    sku: "MOOG-ES800115",
    fits: "208 1.6L (2013–2019)",
    price: 18500,
    img: "images/productos/rotula-es800115.jpg"
  },
  {
    id: "gates6pk1190",
    name: "Correa de Alternador",
    brand: "Suzuki",
    category: "motor",
    sku: "GATES-6PK1190",
    fits: "Swift 1.2L (2011–2017)",
    price: 12300,
    img: "images/productos/correa-6pk1190.jpg"
  },
  {
    id: "espejosail",
    name: "Espejo Retrovisor Derecho",
    brand: "Chevrolet",
    category: "carroceria",
    sku: "NX-CAR-0446",
    fits: "Sail (2013–2020)",
    price: 45000,
    img: "images/productos/espejo-sail.jpg"
  }
];

const NEXOPARTS_BRANDS = ["Toyota", "Nissan", "Chevrolet", "Hyundai", "Kia", "Ford", "Mazda", "Suzuki", "Volkswagen", "Peugeot"];

const NEXOPARTS_CATEGORIES = [
  { id: "frenos", label: "Frenos" },
  { id: "suspension", label: "Suspensión y Dirección" },
  { id: "motor", label: "Motor y Transmisión" },
  { id: "electrico", label: "Eléctrico y Sensores" },
  { id: "filtros", label: "Filtros y Lubricación" },
  { id: "carroceria", label: "Carrocería y Espejos" }
];
