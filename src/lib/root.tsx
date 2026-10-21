import { IBM_Plex_Sans_Arabic } from "next/font/google";

// Shared by both root layouts (public site under [lang], and /admin).
export const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// Runs before first paint so the saved theme never flashes. Dark unless the visitor chose light.
const themeScript = `(function(){try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch(e){document.documentElement.classList.add('dark')}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
