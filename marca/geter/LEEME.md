# GETER · Identidad y diseño v1.0

Abrir `preview/brand.html` en cualquier navegador. Es un documento autónomo, sin conexiones a internet. También se entrega `Guia_diseno_GETER.pdf`, con diez páginas y texto seleccionable.

## Carpetas
- `assets/`: copias intactas del arte original. El SVG contiene una imagen PNG, no curvas editables.
- `pages/`: páginas SVG y PNG del manual. Los SVG de página contienen imágenes raster del logo y contornos vectoriales de los textos; no son maestros vectoriales del logo.
- `preview/`: guía visual HTML autónoma.
- `scripts/`: generador Node.js.
- `DESIGN.md`: especificaciones y estado de la identidad.
- `tokens.css`: valores de referencia, sin aplicación automática a la web.
- `contrast-checks.json`: cálculos de contraste de cuatro combinaciones.
- `manifest.json`: índice y versión.

Los ejemplos son conceptuales y los datos de aplicación son de muestra. La guía está preparada para revisión. El diseño de la cotización y el cierre de activos pendientes son trabajos posteriores.

## Reproducción

El generador necesita Node.js, PDFKit, fontkit y sharp. Requiere las fuentes Inter Regular/Bold y Montserrat Regular, obtenidas con su licencia correspondiente. No se redistribuyen fuentes del sistema ni fuentes de terceros en este paquete.

Variables para resolver dependencias: `GETER_PDFKIT`, `GETER_FONTKIT`, `GETER_SHARP`, `GETER_INTER_REGULAR`, `GETER_INTER_BOLD`, `GETER_MONTSERRAT`. El script contiene rutas locales de referencia para este equipo; ajustarlas al mover el proyecto.

Ejecutar `node marca/geter/scripts/generar-guia.cjs` desde la raíz del proyecto Ambienta. Los documentos se generan en `entregables/geter-2026/` y las páginas en `marca/geter/pages/`.

Conservar las rutas relativas al distribuir la carpeta. El HTML y PDF también pueden compartirse por separado.
