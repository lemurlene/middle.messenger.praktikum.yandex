export function getFormValues(form: HTMLFormElement): Record<string, string> {
  const data = new FormData(form);
  const result: Record<string, string> = {};

  data.forEach((value, key) => {
    result[key] = typeof value === "string" ? value : value.name;
  });

  return result;
}
