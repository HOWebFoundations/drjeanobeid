import { Link } from '@/i18n/navigation';

type Variant = 'primary' | 'secondary';

const styles: Record<Variant, string> = {
  // Arterial red is reserved for this and the heart. Nothing else.
  primary: 'bg-arterial-600 text-surface-50 hover:bg-arterial-700',
  secondary: 'bg-ink-900 text-surface-50 hover:bg-ink-800',
};

const base =
  'tap-target inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors';

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  external = false,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = `${base} ${styles[variant]}`;

  if (external) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
