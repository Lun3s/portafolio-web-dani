export interface NavLinkItem {
  label: string;
  href: string;
}

// Nombre del archivo PDF ubicado en la carpeta public/
export const CV_FILE_NAME = "CV Daniela A. Gonzales Ruiz.pdf";
export const CV_URL = `/${encodeURI(CV_FILE_NAME)}`;

export const experienceLinks: [string, string][] = [
  ["Redes sociales", "/experiencias/redes-sociales"],
  ["Producción audiovisual", "/experiencias/produccion-audiovisual"],
  ["Eventos", "/experiencias/eventos"],
];

export default experienceLinks;
