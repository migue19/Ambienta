# GETER · Guía de identidad y diseño

Versión 1.0 · 4 de noviembre de 2026 · Preparada por NUT · Para revisión.

## 1. Propósito

Unificar la presentación de GETER en web, documentos y comunicación institucional, manteniendo el símbolo y el sistema cromático existentes. Esta guía no rediseña el logo ni atribuye acreditaciones o un origen lingüístico al nombre.

GETER ofrece servicios de ingeniería, inspección, seguridad e higiene y pruebas de laboratorio orientados a evaluar condiciones de los centros de trabajo y apoyar el cumplimiento normativo. La descripción debe validarse con sus responsables antes de utilizarse en nuevos materiales comerciales.

Personalidad propuesta: precisa, confiable y profesional. Jerarquías claras, información verificable y trato cercano. Escribir GETER en textos y títulos; usar la razón social cuando el documento lo requiera. El origen del nombre requiere confirmación antes de formar parte del relato oficial.

## 2. Logotipo y lectura formal

El símbolo existente se lee como una G formada por planos geométricos, con azul dominante y rojo de énfasis. Esta es una lectura visual, no una explicación histórica confirmada por el autor.

- `assets/geter-simbolo-original.png`: copia exacta del PNG transparente usado como arte original.
- `assets/geter-simbolo-contenedor.svg`: copia exacta del SVG que contiene ese PNG. No es un vector editable.
- El archivo histórico `../../assets/geter-logo.svg` es otra construcción; no se incluye como variante oficial ni se aplica al sitio.
- No reconstruir el símbolo con una tipografía, modificar planos ni sustituir sus degradados.

Los colores planos del sistema no son un muestreo exhaustivo de los degradados del símbolo. La palabra GETER usada en las composiciones editoriales es texto de identificación, no un nuevo maestro de logotipo combinado.

## 3. Protección y tamaños

Regla propuesta: H = altura del contorno visible; x = H/4. Conservar como mínimo x de espacio libre en los cuatro lados del contorno. El margen transparente del archivo no reemplaza esta medición: medir el dibujo visible.

- Símbolo en pantalla: mínimo recomendado de 48 px de alto.
- 32 px: uso excepcional, sujeto a prueba de lectura.
- Favicon de 16-32 px: requiere una adaptación óptica específica antes de aprobarlo.
- Impresión: probar desde 12 mm de alto; validar legibilidad con el proceso y material reales.
- Gran formato: requiere un maestro vectorial real. Encapsular un PNG en SVG no aumenta su resolución.

Las reducciones del manual muestran alturas reales de 96, 64, 48 y 32 unidades de pantalla antes de escalar la página completa.

## 4. Fondos y usos incorrectos

Aplicación principal: arte en color sobre blanco. Sobre fondo oscuro o fotografía, usar placa blanca y conservar su área de protección. No simular una versión invertida recoloreando el archivo actual.

No estirar, girar, recortar, alterar colores, agregar contornos o sombras. No reducir hasta perder los planos internos. No encerrar la marca en un espacio sin margen ni aplicarla directamente sobre fondos que resten contraste.

## 5. Paleta digital

| Token | Color | HEX | Uso |
| --- | --- | --- | --- |
| `--geter-primary` | Azul principal | #0B2F5B | Marca y titulares |
| `--geter-secondary` | Azul secundario | #165DAB | Apoyo e interacción |
| `--geter-accent` | Rojo | #D72638 | Acciones y énfasis |
| `--geter-deep` | Azul profundo | #071E33 | Texto y fondos |
| `--geter-text` | Grafito | #2E3238 | Cuerpo |
| `--geter-surface` | Gris claro | #F3F5F7 | Superficies |
| `--geter-white` | Blanco | #FFFFFF | Espacio y lectura |

Proporción orientativa, no requisito matemático: 70% blanco/gris, 20% azules, 10% acentos y detalles. En documentos priorizar las superficies claras. Los valores son sRGB para pantalla; CMYK/Pantone requieren conversión y prueba física con imprenta.

## 6. Contraste y accesibilidad

Datos calculados por luminancia relativa sRGB; los valores completos están en `contrast-checks.json`:

| Texto / fondo | Razón |
| --- | ---: |
| Azul principal / blanco | 13.36:1 |
| Azul secundario / blanco | 6.59:1 |
| Rojo / blanco | 4.97:1 |
| Grafito / gris claro | 11.79:1 |

Las cuatro combinaciones superan 4.5:1 para texto normal. Esto no constituye una auditoría de accesibilidad del sitio. Verificar de nuevo al cambiar el fondo, la opacidad o el color.

Propuestas de interfaz: controles de al menos 44 px de alto; foco azul visible de 3 px separado 3 px; mensajes textuales de error; etiquetas persistentes; zoom sin pérdida de contenido; respetar `prefers-reduced-motion`. Una confirmación de envío sólo debe mostrarse tras una recepción real, no mediante un temporizador.

## 7. Tipografía

Familias declaradas por la página: Montserrat en titulares e Inter en cuerpo e interfaz.

| Nivel | Tamaño / interlineado | Peso |
| --- | --- | --- |
| H1 | 48-64 px / 1.10 | 700-800 |
| H2 | 32-40 px / 1.20 | 700 |
| H3 | 22-28 px / 1.30 | 600-700 |
| Cuerpo | 16-18 px / 1.50-1.60 | 400-500 |
| Etiqueta y botón | 16 px / 1.40 | 600 |
| Texto auxiliar | 14 px / 1.50 | 400-500 |

Escalar títulos en pantallas pequeñas y comprobar que no se corten. Usar cifras tabulares para importes y folios. No simular pesos con negritas artificiales.

Las muestras del PDF emplean los archivos reales Montserrat Regular e Inter Regular/Bold encontrados localmente. Los titulares editoriales del manual utilizan Inter Bold; esto no cambia la especificación Montserrat de la web. Los contornos de texto en las páginas SVG mantienen su representación sin depender de fuentes instaladas. El PDF mantiene texto seleccionable.

Fuentes de referencia para obtener las familias y sus licencias:
- https://fonts.google.com/specimen/Montserrat
- https://fonts.google.com/specimen/Inter

No se redistribuyen archivos tipográficos en este paquete. Al añadirlos, obtener los archivos y la licencia correspondiente de la distribución oficial. No usar el OFL de otra familia como licencia de Montserrat.

## 8. Espaciado, forma y movimiento

Escala base: 4, 8, 12, 16, 24, 32, 48 y 64 px. Contenedor web de referencia: 1,200 px. Radios del sitio: 12, 16, 22 y 28 px. Superficies claras, líneas discretas y sombras suaves.

Propuesta para nuevas piezas: transiciones breves de 120-180 ms; movimiento subordinado a la lectura y desactivado cuando se solicite movimiento reducido. Los tokens de esta carpeta están aislados y no se aplican automáticamente al sitio.

## 9. Componentes

- Acción principal: rojo con texto blanco y verbo explícito.
- Acción secundaria: superficie blanca, texto azul y borde visible cuando el fondo lo requiera.
- Formulario: etiqueta visible, borde de campo, estados explicados con texto.
- Tarjetas: título breve, descripción concreta y una acción fácil de identificar.
- Cotizaciones: importes alineados a la derecha y conceptos a la izquierda.

Las pantallas del manual son muestras conceptuales. No acreditan que exista un envío real de formulario, un servicio de correo o un cambio ya desplegado.

## 10. Voz y mensajes

Español claro, directo y profesional. Explicar qué se evalúa, cuál es el alcance y qué necesita aportar el cliente. Mantener un mismo tratamiento dentro de cada pieza.

Usar: «Cuéntanos qué evaluación necesita tu empresa», «Solicitar cotización», «Conocer el servicio».

Evitar prometer cumplimiento universal, resultados garantizados o acreditaciones no confirmadas. Los datos de experiencia y referencias normativas deben ser revisados por GETER antes de publicarse.

## 11. Aplicaciones

- Web: sistema actual azul/rojo, titulares Montserrat y cuerpo Inter; símbolo con protección.
- Propuesta comercial: logo sobre blanco, datos del emisor, folio, fecha, vigencia, alcance, conceptos, subtotal, impuestos, total y condiciones.
- Tarjeta: nombre y cargo, datos reales de contacto y amplio espacio libre.
- Redes: una idea principal, contraste alto, texto breve y símbolo protegido.

Los ejemplos del manual son conceptuales y emplean datos de muestra. No son archivos finales de imprenta, una cotización comercial vigente ni una promesa de nuevos servicios.

## 12. Entregables de esta guía

- PDF de diez páginas y HTML autónomo sin dependencias de red.
- Páginas SVG con texto convertido a curvas y copias PNG.
- Lámina de resumen y vista vertical para consulta.
- Esta guía fuente, tokens CSS, manifiesto y cálculo de contrastes.
- Copias identificadas del arte original y del SVG contenedor raster.
- Generador y README para reproducir los documentos.

## 13. Pendientes del sistema de marca

Revisar y aprobar las reglas propuestas. Obtener o reconstruir fielmente el maestro vectorial del símbolo; validar versiones de una tinta e invertida; preparar composiciones oficiales con el nombre y adaptación de favicon; realizar pruebas de impresión. Estos activos no se presentan como terminados en esta guía.

## 14. Referencias y alcance de la revisión

Estructura y nivel de presentación: guías locales de Tavixo y Tepahti. Contenido GETER: `../../assets/README.txt`, `../../data/theme.js`, `../../styles.css` y arte original.

Verificación de entrega: revisión visual de las diez páginas, lectura del PDF, recuento de páginas, comprobación de SVG y vínculos locales, cálculo de contrastes e integridad del ZIP. No se cambia la página de producción ni la cotización en esta entrega.
