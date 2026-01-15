export type Tag = { label: string; confidence: number };

export function inferTagsFromFilename(filename: string): Tag[] {
  const name = filename.toLowerCase();
  const tags: Tag[] = [];

  if (name.includes("car") || name.includes("auto")) tags.push({ label: "Car", confidence: 0.8 });
  if (name.includes("dog") || name.includes("perro")) tags.push({ label: "Dog", confidence: 0.85 });
  if (name.includes("cat") || name.includes("gato")) tags.push({ label: "Cat", confidence: 0.85 });
  if (name.includes("food") || name.includes("comida")) tags.push({ label: "Food", confidence: 0.75 });
  if (name.includes("invoice") || name.includes("factura")) tags.push({ label: "Document", confidence: 0.7 });

  if (tags.length === 0) tags.push({ label: "Unknown", confidence: 0.5 });

  return tags;
}
