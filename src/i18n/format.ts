/** Fill `{name}` placeholders: fmt("Hi {name}", { name: "Asha" }). */
export function fmt(template: string, vars: Record<string, string | number> = {}) {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
