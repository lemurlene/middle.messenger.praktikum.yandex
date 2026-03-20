import type { FormValue, FormValues } from "../types";

export function asString(v: FormValue): string {
  return typeof v === "string" ? v : "";
}

export function pick(values: FormValues, name: string): string {
  return asString(values[name]);
}
