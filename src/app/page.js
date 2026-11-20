import Container from "@/components/ui/Container";
import { API_URL } from "@/lib/api";

export default async function Home() {
  let online = false;
  try {
    const res = await fetch(`${API_URL}/api/health`, { cache: "no-store" });
    online = res.ok;
  } catch {}

  return (
    <Container className="grid min-h-screen place-items-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Mentor<span className="text-accent">Lagbe</span>
        </h1>
        <p className="mt-3 text-base-content/70">
          API status:{" "}
          <span className={online ? "font-semibold text-success" : "font-semibold text-error"}>
            {online ? "connected" : "offline"}
          </span>
        </p>
        <button className="btn btn-primary mt-6">Primary Button</button>
      </div>
    </Container>
  );
}