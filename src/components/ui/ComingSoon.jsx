import Container from "./Container";

export default function ComingSoon({ title }) {
  return (
    <Container className="grid min-h-[50vh] place-items-center py-20 text-center">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-base-content/70">
          This page is being built. Check back soon.
        </p>
      </div>
    </Container>
  );
}