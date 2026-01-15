export type Tag = { label: string; confidence: number };

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function inferTags(params: { filename: string; mime: string; size: number }): Tag[] {
  const { filename, mime, size } = params;
  const name = filename.toLowerCase();
  const tags: Tag[] = [];

  // Tags por tipo
  if (mime.includes("png")) tags.push({ label: "PNG", confidence: 0.9 });
  if (mime.includes("jpeg")) tags.push({ label: "JPEG", confidence: 0.9 });
  if (mime.includes("webp")) tags.push({ label: "WEBP", confidence: 0.9 });

  // Tag por tamaño (simple, útil)
  if (size > 500_000) tags.push({ label: "High-Resolution", confidence: 0.75 });
  else tags.push({ label: "Low-Size", confidence: 0.65 });

  // Heurística por nombre
  if (name.includes("cat") || name.includes("gato")) tags.push({ label: "Cat", confidence: 0.85 });
  if (name.includes("dog") || name.includes("perro")) tags.push({ label: "Dog", confidence: 0.85 });
  if (name.includes("car") || name.includes("auto")) tags.push({ label: "Car", confidence: 0.8 });
  if (name.includes("doc") || name.includes("invoice") || name.includes("factura"))
    tags.push({ label: "Document", confidence: 0.75 });

  // Siempre devolver algo semántico
  tags.push({ label: "Image", confidence: 0.8 });

  // Normalizar confianza (por si se agregan muchas reglas después)
  return tags.map((t) => ({ ...t, confidence: clamp01(t.confidence) }));
}
