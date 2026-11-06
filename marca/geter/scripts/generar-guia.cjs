/* Ejecutar: node generar-guia.cjs. Dependencias: pdfkit, fontkit y sharp.
   Las rutas de dependencias locales pueden cambiar con la instalación. */
const fs=require('fs'),path=require('path');
const dep='/Users/miguelmexicanoherrera/Documents/Codex/2026-10-13/referenced-chatgpt-conversation-this-is-an/outputs/tavixo/node_modules';
const PDF=require(process.env.GETER_PDFKIT||path.join(dep,'pdfkit'));
const fontkit=require(process.env.GETER_FONTKIT||'/Users/miguelmexicanoherrera/Claude/medora/node_modules/fontkit');
const sharp=require(process.env.GETER_SHARP||'/Users/miguelmexicanoherrera/Claude/medora/node_modules/sharp');
const ROOT=path.resolve(__dirname,'../../..'),DIR=path.join(ROOT,'marca/geter'),OUT=path.join(ROOT,'entregables/geter-2026');
const W=1440,H=1080;
const C={navy:'#0B2F5B',blue:'#165DAB',red:'#D72638',deep:'#071E33',ink:'#2E3238',gray:'#F3F5F7',white:'#FFFFFF',muted:'#536273',line:'#D6DFE8',pale:'#E8EEF5'};
const regular=process.env.GETER_INTER_REGULAR||'/Users/miguelmexicanoherrera/Documents/respaldo-mac-mini-2T/desktop/FontCustom/FontCustom/Inter-Regular.ttf',bold=process.env.GETER_INTER_BOLD||'/Users/miguelmexicanoherrera/Documents/respaldo-mac-mini-2T/desktop/FontCustom/FontCustom/Inter-Bold.ttf';
const montserrat=process.env.GETER_MONTSERRAT||'/Users/miguelmexicanoherrera/Workline/Repos/Atmosfera/atmosfera/StylesUI/Font/Montserrat-Regular.ttf';
const F={r:fontkit.openSync(regular),b:fontkit.openSync(bold),m:fontkit.openSync(montserrat)};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
let pdf,svg,svgs=[],pageTexts=[],texts=[],logo,logoData,nutBuffer,nutSVG;
function rect(x,y,w,h,fill,r=0,stroke=null){pdf.save();pdf.roundedRect(x,y,w,h,r).fillAndStroke(fill,stroke||fill);pdf.restore();svg.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke?' stroke="'+stroke+'"':''}/>`)}
function line(x1,y1,x2,y2,color=C.line,width=1,dash=false){pdf.save().lineWidth(width).strokeColor(color);if(dash)pdf.dash(6,{space:6});pdf.moveTo(x1,y1).lineTo(x2,y2).stroke().restore();svg.push(`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}"${dash?' stroke-dasharray="6 6"':''}/>`)}
function width(s,size=24,weight='r'){return F[weight].layout(s).glyphs.reduce((a,g,i)=>a+F[weight].layout(s).positions[i].xAdvance,0)*size/F[weight].unitsPerEm}
function txt(s,x,y,size=24,color=C.deep,weight='r'){
 s=String(s); const run=F[weight].layout(s),scale=size/F[weight].unitsPerEm;
 pdf.save().font(weight).fontSize(size).fillColor(color).text(s,x,y,{lineBreak:false});pdf.restore();
 let dx=0; const baseline=y+F[weight].ascent*scale;
 svg.push(`<g aria-label="${esc(s)}" fill="${color}">`);
 run.glyphs.forEach((g,i)=>{let p=run.positions[i];svg.push(`<path transform="translate(${x+(dx+p.xOffset)*scale},${baseline-p.yOffset*scale}) scale(${scale},${-scale})" d="${g.path.toSVG()}"/>`);dx+=p.xAdvance});svg.push('</g>'); texts.push(s);
}
function para(s,x,y,w,size=24,color=C.muted,weight='r',leading=1.42){let words=s.split(/\s+/),str='',rows=[];for(const word of words){let t=str?str+' '+word:word;if(width(t,size,weight)>w&&str){rows.push(str);str=word}else str=t}if(str)rows.push(str);rows.forEach((s,i)=>txt(s,x,y+i*size*leading,size,color,weight));return y+rows.length*size*leading}
function img(x,y,w,h=null){h=h||w*logo.height/logo.width;pdf.image(logo.buffer,x,y,{width:w,height:h});svg.push(`<image href="${logoData}" x="${x}" y="${y}" width="${w}" height="${h}"/>`)}
function card(x,y,w,h,fill=C.white){rect(x,y,w,h,fill,18,C.line)}
function pill(s,x,y,w,fill=C.navy,fg=C.white){rect(x,y,w,46,fill,9);txt(s,x+18,y+12,19,fg,'b')}
function head(n,section,title,sub){rect(0,0,W,H,C.white);txt('GETER',64,43,23,C.navy,'b');txt('GUÍA DE IDENTIDAD Y DISEÑO',1030,49,15,C.muted,'b');line(64,95,1376,95);txt(String(n).padStart(2,'0')+' / '+section.toUpperCase(),64,130,17,C.red,'b');txt(title,64,174,54,C.deep,'b');if(sub)para(sub,66,247,1260,23)}
function foot(n,dark=false){const c=dark?'#A9BACD':C.muted;line(64,1009,1376,1009,dark?'#294059':C.line);txt('GETER / IDENTIDAD V1.0 / 04 NOV 2026',64,1032,14,c);txt('PREPARADA POR NUT',1040,1032,14,c);txt(String(n).padStart(2,'0'),1335,1029,20,dark?C.white:C.navy,'b')}
function page(){if(svg){svgs.push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img"><title>GETER · Guía de identidad · Página ${svgs.length+1}</title>${svg.join('')}</svg>`);pageTexts.push(texts);pdf.addPage({size:[W,H],margin:0})}svg=[];texts=[]}
function lum(hex){let a=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722}
const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
(async()=>{
 fs.mkdirSync(DIR,{recursive:true});fs.mkdirSync(OUT,{recursive:true});
 const original=fs.existsSync(path.join(ROOT,'assets/geter-icon-transparent.png'))?path.join(ROOT,'assets/geter-icon-transparent.png'):path.join(DIR,'assets/geter-simbolo-original.png');
 const nutPath=path.join(DIR,'assets/nut-credito.svg');
 nutSVG=fs.readFileSync(nutPath,'utf8');nutBuffer=await sharp(Buffer.from(nutSVG)).resize(440).png().toBuffer();
 const buf=await sharp(original).trim().png().toBuffer();logo=await sharp(buf).metadata();logo.buffer=buf;logoData='data:image/png;base64,'+buf.toString('base64');
 if(original!==path.join(DIR,'assets/geter-simbolo-original.png'))fs.copyFileSync(original,path.join(DIR,'assets/geter-simbolo-original.png'));if(fs.existsSync(path.join(ROOT,'assets/geter-icon.svg')))fs.copyFileSync(path.join(ROOT,'assets/geter-icon.svg'),path.join(DIR,'assets/geter-simbolo-contenedor.svg'));
 pdf=new PDF({autoFirstPage:false,size:[W,H],margin:0,info:{Title:'GETER · Guía de identidad y diseño',Author:'NUT',Subject:'Identidad visual, reglas de uso y aplicaciones. Versión 1.0 para revisión.'}});
 const stream=fs.createWriteStream(path.join(OUT,'Guia_diseno_GETER.pdf'));pdf.pipe(stream);pdf.registerFont('r',regular);pdf.registerFont('b',bold);pdf.registerFont('m',montserrat);pdf.addPage({size:[W,H],margin:0});page();
 // 01 / PORTADA
 rect(0,0,W,H,C.deep);rect(0,0,810,H,C.white);rect(64,61,48,6,C.red);txt('IDENTIDAD / SISTEMA VISUAL / V1.0',64,97,16,C.muted,'b');txt('GETER',58,197,116,C.navy,'b');txt('Guía de identidad',64,345,53,C.deep,'b');txt('y diseño.',64,408,53,C.deep,'b');
 para('Precisión técnica.\nUna identidad consistente.',66,530,620,31,C.muted);
 line(64,702,700,702);txt('INGENIERÍA',64,735,18,C.navy,'b');txt('INSPECCIÓN',289,735,18,C.navy,'b');txt('LABORATORIO',515,735,18,C.navy,'b');
 para('Criterios para aplicar la marca en la web, documentos comerciales y comunicación institucional.',64,813,620,24);
 rect(925,194,400,510,C.white,26);img(1005,280,240);txt('EL SÍMBOLO ACTUAL',968,650,17,C.navy,'b');
 para('Azul y rojo. Forma geométrica. Presencia técnica.',925,765,400,27,'#D6E4F2','b');txt('04 NOVIEMBRE 2026',925,919,16,'#A9BACD');
 txt('PREPARADA POR',64,1019,14,C.muted,'b');pdf.image(nutBuffer,221,1003,{width:110,height:38.7});svg.push(`<image href="data:image/png;base64,${nutBuffer.toString('base64')}" x="221" y="1003" width="110" height="38.7"/>`);txt('VERSIÓN PARA REVISIÓN',1113,1020,14,'#A9BACD');
 page();
 // 02 / MARCA
 head(2,'Fundamentos','Claridad que genera confianza.','Una marca para servicios de ingeniería, inspección y pruebas de laboratorio.');
 txt('01',64,347,64,C.pale,'b');txt('Qué hacemos',176,352,30,C.navy,'b');para('Apoyar a las organizaciones a evaluar condiciones de seguridad e higiene y atender la normatividad aplicable a sus centros de trabajo.',176,411,1060,27);
 const traits=[['Precisa','Información concreta, jerarquías claras y documentos fáciles de revisar.',C.navy],['Confiable','Una identidad consistente en cada punto de contacto, sin promesas que no se puedan respaldar.',C.blue],['Profesional','Comunicación sobria, trato cercano y atención al detalle.',C.red]];
 traits.forEach((a,i)=>{let x=64+i*445;card(x,572,420,251);rect(x+26,604,44,5,a[2]);txt(a[0],x+26,640,31,C.deep,'b');para(a[1],x+26,692,365,23)});
 rect(64,865,1312,100,C.gray,14);txt('Cómo escribir el nombre',88,885,22,C.navy,'b');para('GETER en textos y títulos. Usar la razón social sólo donde corresponda. El origen del nombre no se documenta sin confirmación de sus responsables.',88,922,1230,19);
 foot(2);page();
 // 03 / LOGO
 head(3,'Logotipo','Una G construida con planos.','El arte existente es el punto de partida. La guía conserva su forma y su tratamiento cromático.');
 card(64,333,550,580);img(203,382,268);txt('Símbolo principal',96,772,29,C.navy,'b');para('Usar el archivo original, sin redibujarlo ni sustituir sus planos o degradados.',96,821,478,23);
 const points=[['La letra G','La lectura del conjunto remite a la inicial de GETER.'],['Planos geométricos','Las caras angulares y el espacio central dan estructura y dirección al símbolo.'],['Azul y rojo','El azul domina la forma; el rojo concentra el énfasis visual.']];
 points.forEach((a,i)=>{let y=348+i*175;txt('0'+(i+1),675,y,20,C.red,'b');txt(a[0],733,y-3,30,C.navy,'b');para(a[1],733,y+48,620,24)});
 rect(675,880,701,73,C.gray,12);para('Lectura visual propuesta; no sustituye un relato de origen confirmado.',697,899,650,19);
 foot(3);page();
 // 04 / PROTECCION
 head(4,'Protección y reducción','Espacio para reconocer la marca.','Reglas propuestas para mantener legibilidad, proporción y separación de otros elementos.');
 card(64,334,655,618);const x=237,y=440,iw=226,ih=iw*logo.height/logo.width;
 const q=ih/4;rect(x-q,y-q,iw+2*q,ih+2*q,C.gray,0);img(x,y,iw);line(x-q,y-q,x+iw+q,y-q,C.blue,1,true);line(x-q,y+ih+q,x+iw+q,y+ih+q,C.blue,1,true);line(x-q,y-q,x-q,y+ih+q,C.blue,1,true);line(x+iw+q,y-q,x+iw+q,y+ih+q,C.blue,1,true);
 line(x+iw+q+30,y,x+iw+q+30,y+ih,C.navy,2);txt('H',x+iw+q+40,y+ih/2-12,24,C.navy,'b');txt('x',x-q+20,y-q+17,22,C.red,'b');
 txt('x = H / 4',96,822,30,C.navy,'b');para('Dejar un margen mínimo x a cada lado del contorno visible. H es la altura visible del símbolo.',96,873,580,23);
 txt('Reducción en pantalla',774,348,31,C.navy,'b');
 [96,64,48,32].forEach((s,i)=>{let xx=790+i*145;img(xx,438+(108-s)/2,s*logo.width/logo.height,s);txt(s+' px',xx,592,20,C.muted)});
 para('48 px de alto es el mínimo recomendado para uso habitual. A 32 px, revisar la lectura antes de usarlo. No reducir el logo completo para crear un favicon.',774,663,570,24);
 line(774,800,1376,800);txt('Impresión',774,831,27,C.navy,'b');para('Probar desde 12 mm de alto en una muestra física. Para gran formato se requiere el maestro vectorial real.',774,876,570,23);
 foot(4);page();
 // 05 / FONDOS E INCORRECTOS
 head(5,'Aplicación del símbolo','Fondos limpios. Forma intacta.','Usar el arte en color sobre blanco. En fondos oscuros o con imagen, colocarlo dentro de una placa blanca.');
 card(64,328,620,280,C.gray);rect(106,358,150,218,C.white,10);img(139,400,84);txt('Sobre claro',294,377,29,C.navy,'b');para('Color original sobre blanco, con margen de protección.',294,430,345,23);
 card(716,328,660,280,C.navy);rect(758,358,150,218,C.white,10);img(791,400,84);txt('Sobre oscuro',948,377,29,C.white,'b');para('Placa blanca. No recolorear el arte para simular una versión invertida.',948,430,380,23,'#D9E6F2');
 txt('Evitar',64,650,32,C.navy,'b');
 const bads=[['Deformar',130,740,145,93],['Encerrar sin margen',482,733,119,136],['Reducir en exceso',850,753,18,21],['Fondo sin contraste',1164,724,95,108]];
 bads.forEach((b,i)=>{let bx=64+i*334;card(bx,711,310,233,i==3?C.navy:C.gray);if(i===1)rect(b[1],b[2],b[3],b[4],C.white,0,C.red);img(b[1],b[2],b[3],b[4]);line(bx+25,913,bx+47,891,C.red,3);line(bx+25,891,bx+47,913,C.red,3);txt(b[0],bx+61,889,19,i==3?C.white:C.deep,'b')});
 foot(5);page();
 // 06 / COLOR
 head(6,'Paleta y contraste','Azul como base. Rojo como acento.','Colores tomados de la implementación actual. Los degradados del símbolo se conservan en el archivo original.');
 const colors=[['Azul principal',C.navy,'Marca y titulares'],['Azul secundario',C.blue,'Apoyo e interacción'],['Rojo',C.red,'Acciones y énfasis'],['Azul profundo',C.deep,'Texto y fondos'],['Grafito',C.ink,'Cuerpo de texto'],['Gris claro',C.gray,'Superficies'],['Blanco',C.white,'Espacio y lectura']];
 colors.forEach((a,i)=>{let x=64+i*190;rect(x,336,172,144,a[1],12,i>4?C.line:null);txt(a[0],x,503,20,C.deep,'b');txt(a[1],x,537,19,C.muted);para(a[2],x,574,172,18)});
 const ratios=[[C.navy,C.white,'Azul / blanco'],[C.blue,C.white,'Azul secundario / blanco'],[C.red,C.white,'Rojo / blanco'],[C.ink,C.gray,'Grafito / gris']];
 ratios.forEach((a,i)=>{let x=64+i*334;rect(x,668,310,114,a[1],12,C.line);txt('Aa '+contrast(a[0],a[1]).toFixed(2)+':1',x+22,689,35,a[0],'b');txt(a[2],x+22,742,17,C.muted)});
 rect(64,829,1312,143,C.deep,16);txt('Proporción orientativa',88,852,23,C.white,'b');para('70% blanco y gris · 20% azules · 10% acentos y detalles. El rojo destaca acciones; no debe dominar la lectura de documentos.',88,896,1250,24,'#D9E6F2');
 foot(6);page();
 // 07 / TIPOGRAFIA
 head(7,'Tipografía y jerarquía','Titulares firmes. Lectura cómoda.','Montserrat en encabezados e Inter en cuerpo e interfaz: las familias declaradas en el sitio de GETER.');
 card(64,331,640,433,C.navy);txt('Montserrat',98,373,55,C.white,'m');txt('TITULARES / MUESTRA REGULAR 400',100,461,18,'#AAC9E9','b');para('Precisión técnica. Resultados confiables.',98,527,540,43,C.white,'m',1.16);txt('H1 48-64 px · H2 32-40 px',100,705,21,'#D9E6F2');
 card(734,331,642,433,C.gray);txt('Inter',768,373,55,C.navy,'b');txt('CUERPO E INTERFAZ / 400 - 600',770,461,18,C.muted,'b');para('Cuéntanos las necesidades de tu empresa. Nuestro equipo te orientará sobre el servicio adecuado.',768,527,540,28,C.deep);txt('Cuerpo 16-18 px · Interlineado 1.5-1.6',770,705,21,C.muted);
 const scale=[['H1','48-64 / 1.10','700-800'],['H2','32-40 / 1.20','700'],['Cuerpo','16-18 / 1.60','400-500'],['Botón','16 / 1.40','600']];
 scale.forEach((a,i)=>{let x=64+i*334;txt(a[0],x,807,23,C.navy,'b');txt(a[1],x,846,23,C.deep);txt('Peso '+a[2],x,882,18,C.muted)});
 para('Muestras con las familias reales: Montserrat Regular 400 e Inter Regular/Bold. En producción, cargar los pesos especificados; no simular negritas. Usar cifras tabulares para importes. Conservar la licencia al distribuir archivos de fuente.',64,937,1312,16);
 foot(7);page();
 // 08 / INTERFAZ
 head(8,'Sistema digital','Componentes con un mismo lenguaje.','Muestras de aplicación: documentan el estilo visual y no implican cambios publicados en la página.');
 card(64,332,622,541,C.gray);txt('Acciones y estados',94,364,31,C.navy,'b');pill('Solicitar cotización',94,429,244,C.red);pill('Conocer servicios',357,429,242,C.white,C.navy);txt('Correo electrónico',94,517,20,C.deep,'b');rect(94,557,560,68,C.white,10,C.muted);txt('contacto@tuempresa.mx',115,578,22,C.muted);txt('Escribe un correo válido.',94,646,19,C.red);rect(94,706,560,114,C.white,12,C.line);txt('Solicitud recibida',116,729,23,C.navy,'b');para('Confirmar sólo después de una recepción real.',116,768,515,20);
 card(718,332,658,541,C.navy);txt('Servicios especializados',750,369,32,C.white,'b');para('Información breve para ayudar al cliente a identificar el servicio que necesita.',750,427,570,25,'#D9E6F2');rect(750,556,594,237,C.white,16);rect(777,585,48,6,C.red);txt('Seguridad e higiene',777,629,29,C.navy,'b');para('Evaluación técnica de las condiciones del centro de trabajo.',777,684,525,24);txt('Conocer el servicio  →',777,758,21,C.blue,'b');
 para('Espaciado: 4, 8, 12, 16, 24, 32, 48 y 64 px. Radios del sitio: 12, 16, 22 y 28 px. Controles: mínimo propuesto 44 px de alto; foco visible; errores con texto y contraste.',64,915,1312,23);
 foot(8);page();
 // 09 / APLICACIONES
 head(9,'Aplicaciones','La marca también vive fuera de la web.','Ejemplos conceptuales con datos de muestra: documento comercial, tarjeta y publicación para redes.');
 card(64,332,430,619,C.gray);rect(102,363,354,548,C.white,4,C.line);img(128,389,43);txt('GETER',191,390,27,C.navy,'b');txt('Propuesta técnica',128,482,27,C.navy,'b');txt('FOLIO / EJEMPLO',128,529,12,C.muted,'b');line(128,565,429,565,C.red,3);['Servicio especializado','Alcance y entregables','Condiciones comerciales'].forEach((s,i)=>{txt(s,128,602+i*49,15,C.ink);line(128,631+i*49,429,631+i*49)});rect(128,797,301,59,C.navy,3);txt('TOTAL / $0.00',146,815,21,C.white,'b');
 card(522,332,380,287,C.navy);rect(550,361,77,103,C.white,6);img(566,376,45);txt('GETER',648,373,31,C.white,'b');txt('INGENIERÍA',648,421,13,'#C5D9EF','b');txt('Nombre y cargo',550,515,21,C.white,'b');txt('correo@ejemplo.mx',550,557,17,'#C5D9EF');
 card(522,646,380,305,C.gray);txt('Criterios de aplicación',550,680,26,C.navy,'b');para('Logo con espacio libre. Datos verificables. Importes alineados. Una sola jerarquía visual. Nunca añadir acreditaciones no confirmadas.',550,735,324,24);
 card(930,332,446,619,C.deep);rect(966,367,83,107,C.white,8);img(983,383,48);txt('GETER',1076,391,39,C.white,'b');rect(968,529,55,6,C.red);para('Seguridad que se evalúa. Confianza que se construye.',968,583,358,45,C.white,'b',1.14);para('Ingeniería · Inspección · Laboratorio',968,830,360,21,'#BDCEE1');
 foot(9);page();
 // 10 / VOZ Y ENTREGA
 head(10,'Comunicación y archivos','Una identidad lista para aplicar.','El manual reúne el sistema actual y las reglas de uso propuestas para revisión de GETER.');
 txt('Hablar con precisión',64,345,33,C.navy,'b');para('Español claro y profesional. Explicar el servicio, su alcance y el siguiente paso. En textos institucionales, evitar promesas absolutas o afirmaciones que GETER no haya confirmado.',64,403,605,26);
 card(64,589,605,150,C.gray);txt('Sí',90,613,23,C.navy,'b');para('“Cuéntanos qué evaluación necesita tu empresa.”',90,656,553,26,C.deep);
 card(64,763,605,150,C.gray);txt('Evitar',90,787,23,C.red,'b');para('“Garantizamos el cumplimiento total de cualquier norma.”',90,830,553,26,C.deep);
 txt('Archivos y alcance',744,345,33,C.navy,'b');
 const files=[['Manual','PDF, vista HTML y páginas SVG/PNG.'],['Documentación','Guía fuente, tokens CSS y contrastes calculados.'],['Arte existente','PNG original y SVG contenedor, identificados como raster.'],['Pendiente de marca','Vector real y versiones de una tinta / invertida; validar antes de producir.']];
 files.forEach((a,i)=>{let y=414+i*126;txt(a[0],744,y,23,C.navy,'b');para(a[1],744,y+40,615,23)});
 para('Paleta digital sRGB. Para imprenta, validar conversión y prueba física. Las comprobaciones de contraste no equivalen a una auditoría completa de accesibilidad.',744,928,615,17);
 foot(10);
 // Finalizar sin añadir página vacía.
 svgs.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img"><title>GETER · Guía de identidad · Página 10</title>${svg.join('')}</svg>`);pageTexts.push(texts);pdf.end();await new Promise(r=>stream.on('finish',r));
 for(let i=0;i<svgs.length;i++){const n=String(i+1).padStart(2,'0');fs.writeFileSync(path.join(DIR,'pages',n+'.svg'),svgs[i]);await sharp(Buffer.from(svgs[i])).png().toFile(path.join(DIR,'pages',n+'.png'))}
 // Contact sheet para revisión; vista larga como en las referencias.
 const thumbW=720,thumbH=540;const thumbs=await Promise.all(svgs.map(s=>sharp(Buffer.from(s)).resize(thumbW,thumbH).png().toBuffer()));
 await sharp({create:{width:1464,height:5*564+24,channels:4,background:'#DDE3EA'}}).composite(thumbs.map((input,i)=>({input,left:8+(i%2)*736,top:12+Math.floor(i/2)*564}))).png().toFile(path.join(OUT,'GETER_Guia_resumen.png'));
 await sharp({create:{width:720,height:5400,channels:4,background:'#FFFFFF'}}).composite(thumbs.map((input,i)=>({input,left:0,top:i*540}))).png().toFile(path.join(OUT,'GETER_Guia_visual.png'));
 const nav=['Portada','Fundamentos','Símbolo','Protección','Fondos','Color','Tipografía','Interfaz','Aplicaciones','Entrega'];
 const html='<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GETER · Guía de identidad y diseño</title><style>*{box-sizing:border-box}body{margin:0;background:#E5EAF0;color:#071E33;font-family:Arial,sans-serif}nav{padding:18px;position:sticky;top:0;background:#071E33;display:flex;gap:16px;overflow:auto;z-index:10}nav a{color:#fff;font-size:14px;text-decoration:none;white-space:nowrap}.pages{max-width:1440px;margin:auto;padding:24px}.sheet{margin-bottom:24px;scroll-margin-top:75px;box-shadow:0 6px 30px #071e3315}.sheet svg{display:block;width:100%;height:auto}.accessible{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}@media print{nav{display:none}.pages{padding:0}.sheet{margin:0;break-after:page;box-shadow:none}@page{size:landscape;margin:0}}</style><nav>'+nav.map((s,i)=>`<a href="#p${i+1}">${String(i+1).padStart(2,'0')} ${s}</a>`).join('')+'</nav><main class="pages">'+svgs.map((s,i)=>`<section class="sheet" id="p${i+1}" aria-label="${nav[i]}">${s}<div class="accessible">${pageTexts[i].map(t=>'<p>'+esc(t)+'</p>').join('')}</div></section>`).join('')+'</main></html>';
 fs.writeFileSync(path.join(DIR,'preview/brand.html'),html);fs.writeFileSync(path.join(OUT,'Guia_diseno_GETER.html'),html);
 const checks=ratios.map(a=>({foreground:a[0],background:a[1],label:a[2],ratio:contrast(a[0],a[1]),passesNormalAA:contrast(a[0],a[1])>=4.5}));fs.writeFileSync(path.join(DIR,'contrast-checks.json'),JSON.stringify({method:'sRGB relative luminance',scope:'Sólo combinaciones indicadas; no auditoría del sitio.',pairs:checks},null,2));
 fs.writeFileSync(path.join(DIR,'manifest.json'),JSON.stringify({name:'GETER',version:'1.0',date:'2026-11-04',status:'Para revisión',design:'DESIGN.md',preview:'preview/brand.html',pdf:'../../entregables/geter-2026/Guia_diseno_GETER.pdf',artwork:'Raster original; no maestro vectorial',pages:svgs.length},null,2));
 console.log(JSON.stringify({pages:svgs.length,pdf:path.join(OUT,'Guia_diseno_GETER.pdf'),contrasts:checks.map(x=>({label:x.label,ratio:x.ratio}))},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
