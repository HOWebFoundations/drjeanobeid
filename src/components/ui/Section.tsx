import { Container } from './Container';

export function Section({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <Container>
        {title && (
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{title}</h2>
        )}
        {children}
      </Container>
    </section>
  );
}
