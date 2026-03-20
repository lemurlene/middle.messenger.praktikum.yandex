export function getFormValues(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const result: Record<string, string> = {};

  fd.forEach((value, key) => {
    result[key] = String(value);
  });

  return result;
}
