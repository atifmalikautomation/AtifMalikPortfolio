import { buildHomeSchema } from "@/lib/schema";

export function JsonLd() {
  const schema = buildHomeSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
