export function inferTagsFromFilename(filename: string): string[] {
  const name = filename.toLowerCase();

  const tags: string[] = [];
  if (name.includes("car") || name.includes("auto")) tags.push("car");
  if (name.includes("dog") || name.includes("perro")) tags.push("dog");
  if (name.includes("cat") || name.includes("gato")) tags.push("cat");
  if (name.includes("food") || name.includes("comida")) tags.push("food");

  return tags.length ? tags : ["unknown"];
}
