/**
 * Resolve a URL for assets that live under Vite's "public/" directory.
 *
 * Why: on GitHub Pages, the app is served under a base path (e.g. "/anniversary-app/").
 * Any asset path starting with "/" would otherwise resolve from the domain root and 404.
 */
export function resolvePublicAssetUrl(input: string): string {
  if (!input) return input;

  // Already a fully-qualified / special URL.
  if (/^(data:|blob:|https?:)/i.test(input)) return input;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  // If caller already included base (rare), don't double-prefix.
  if (normalizedBase !== "/" && input.startsWith(normalizedBase)) return input;

  const normalizedPath = input.startsWith("/") ? input.slice(1) : input;
  return `${normalizedBase}${normalizedPath}`;
}

