/**
 * Root layout is intentionally a pass-through: `dir` and `lang` are set per
 * locale in src/app/[locale]/layout.tsx, never assumed from a default.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
