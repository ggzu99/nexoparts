// ============================================================================
// CATÁLOGO DE PRODUCTOS — NEXOPARTS
// ----------------------------------------------------------------------------
// Para agregar, editar o quitar productos, solo modifica este arreglo.
// No es necesario tocar el HTML ni el CSS.
//
// Campos de cada producto:
//   id       -> código del producto (el mismo que usas tú internamente)
//   name     -> tipo de producto (sin marca ni modelo, eso va en brand/fits)
//   brand    -> marca del auto compatible (debe coincidir con el filtro)
//   category -> una de: "cilindro", "chapa-set", "chapa-individual"
//   sku      -> código de referencia (usamos el mismo ID)
//   fits     -> modelo del auto y años de compatibilidad
//   stock    -> unidades disponibles (se muestra como aviso de stock limitado)
//   price    -> precio de venta con IVA, en pesos (ej: 49600)
//   img      -> foto principal del producto
//   img2     -> segunda foto (se muestra al pasar el mouse sobre la primera)
//
// FOTOS:
//   Van dentro de "images/productos/", nombradas como <ID>_1.jpeg y <ID>_2.jpeg
//   (ej: images/productos/45022_1.jpeg, images/productos/45022_2.jpeg).
//   Si falta alguna, se muestra automáticamente un aviso "Foto pendiente"
//   en vez de romper el diseño.
//
// PRECIO:
//   price -> valor de venta en pesos chilenos, IVA incluido (sin puntos).
//            Si lo dejas en 0 o lo borras, la tarjeta muestra "Consultar precio".
//   Precios tomados de "catalogo precios.xlsx" (columna VALOR DE VENTA CON IVA).
// ============================================================================

const NEXOPARTS_PRODUCTS = [
  {
    id: "45022",
    name: "Set Cilindro Puerta",
    brand: "Hyundai",
    category: "cilindro",
    sku: "45022",
    fits: "H100 Porter (2005–2023)",
    stock: 1,
    price: 11900,
    img: "images/productos/45022_1.jpeg",
    img2: "images/productos/45022_2.jpeg"
  },
  {
    id: "45052",
    name: "Set Chapa de Contacto + Cilindro + Tapa D.",
    brand: "Hyundai",
    category: "chapa-set",
    sku: "45052",
    fits: "Frontier (2005–2012)",
    stock: 1,
    price: 49600,
    img: "images/productos/45052_1.jpeg",
    img2: "images/productos/45052_2.jpeg"
  },
  {
    id: "45019",
    name: "Set Chapa de Contacto + Cilindro + Tapa D.",
    brand: "Hyundai",
    category: "chapa-set",
    sku: "45019",
    fits: "Porter HR (2014–2025)",
    stock: 2,
    price: 49600,
    img: "images/productos/45019_1.jpeg",
    img2: "images/productos/45019_2.jpeg"
  },
  {
    id: "45023",
    name: "Set Chapa de Contacto + Cilindro + Tapa D.",
    brand: "Hyundai",
    category: "chapa-set",
    sku: "45023",
    fits: "Porter (2005–2023)",
    stock: 2,
    price: 49600,
    img: "images/productos/45023_1.jpeg",
    img2: "images/productos/45023_2.jpeg"
  },
  {
    id: "45096",
    name: "Set Chapa de Contacto y Cilindros de Puertas",
    brand: "Toyota",
    category: "chapa-set",
    sku: "45096",
    fits: "Hilux (2005–2015)",
    stock: 2,
    price: 33300,
    img: "images/productos/45096_1.jpeg",
    img2: "images/productos/45096_2.jpeg"
  },
  {
    id: "45029",
    name: "Set Chapa de Contacto y Cilindros",
    brand: "Hyundai",
    category: "chapa-set",
    sku: "45029",
    fits: "Tucson (2009–2015)",
    stock: 2,
    price: 46500,
    img: "images/productos/45029_1.jpeg",
    img2: "images/productos/45029_2.jpeg"
  },
  {
    id: "45026",
    name: "Set Chapa de Contacto y Cilindros",
    brand: "Hyundai",
    category: "chapa-set",
    sku: "45026",
    fits: "H100 Porter (1996–2005)",
    stock: 1,
    price: 29300,
    img: "images/productos/45026_1.jpeg",
    img2: "images/productos/45026_2.jpeg"
  },
  {
    id: "45040",
    name: "Set Chapa de Contacto y Cilindros",
    brand: "Hyundai",
    category: "chapa-set",
    sku: "45040",
    fits: "Accent (2006–2011)",
    stock: 1,
    price: 36000,
    img: "images/productos/45040_1.jpeg",
    img2: "images/productos/45040_2.jpeg"
  },
  {
    id: "45089",
    name: "Set Chapa de Contacto y Cilindros de Puertas",
    brand: "Chevrolet",
    category: "chapa-set",
    sku: "45089",
    fits: "Sail 1.4 (2011–2017)",
    stock: 2,
    price: 26500,
    img: "images/productos/45089_1.jpeg",
    img2: "images/productos/45089_2.jpeg"
  },
  {
    id: "45028",
    name: "Chapa de Contacto",
    brand: "Hyundai",
    category: "chapa-individual",
    sku: "45028",
    fits: "Accent RB (2011–2020)",
    stock: 2,
    price: 28900,
    img: "images/productos/45028_1.jpeg",
    img2: "images/productos/45028_2.jpeg"
  },
  {
    id: "45025",
    name: "Chapa de Contacto",
    brand: "Hyundai",
    category: "chapa-individual",
    sku: "45025",
    fits: "H100 Porter (1996–2005) / Grace Van (1993–2004)",
    stock: 1,
    price: 21990,
    img: "images/productos/45025_1.jpeg",
    img2: ""  // falta la segunda foto (45025_2.jpeg era igual a la primera)
  },
  {
    id: "45020",
    name: "Chapa de Contacto",
    brand: "Kia",
    category: "chapa-individual",
    sku: "45020",
    fits: "Frontier II (2005–2014)",
    stock: 1,
    price: 28900,
    img: "images/productos/45020_1.jpeg",
    img2: "images/productos/45020_2.jpeg"
  },
  {
    id: "45039",
    name: "Chapa de Contacto",
    brand: "Hyundai",
    category: "chapa-individual",
    sku: "45039",
    fits: "Accent (2000–2006)",
    stock: 1,
    price: 28000,
    img: "images/productos/45039_1.jpeg",
    img2: "images/productos/45039_2.jpeg"
  }
];

const NEXOPARTS_BRANDS = ["Hyundai", "Toyota", "Chevrolet", "Kia"];

const NEXOPARTS_CATEGORIES = [
  { id: "cilindro", label: "Cilindro de Puerta" },
  { id: "chapa-set", label: "Set Chapa de Contacto" },
  { id: "chapa-individual", label: "Chapa de Contacto" }
];
