import { INTRO_KEY } from "@/lib/motion";

/**
 * Runs before first paint. Decides whether the intro plays:
 *  - first visit in this tab session and motion allowed → "pending"
 *  - otherwise → "done"
 * Without JavaScript the attribute is never set and the intro stays hidden.
 */
export function IntroScript() {
  const code = `(function(){var d=document.documentElement;try{var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(sessionStorage.getItem('${INTRO_KEY}')||rm)?'done':'pending';}catch(e){d.dataset.intro='done';}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
