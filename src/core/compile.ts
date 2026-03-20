import Handlebars from "handlebars";

type CompileOptions = {
  withLayout?: boolean;
};

export function compile(
  template: string,
  ctx: Record<string, unknown> = {},
  options: CompileOptions = {}
): DocumentFragment {
  const pageHtml = Handlebars.compile(template)(ctx);

  const needLayout = Boolean(options.withLayout);
  const base = needLayout ? Handlebars.partials["base"] : undefined;
  const baseTpl = typeof base === "string" ? base : null;

  const html = baseTpl ? Handlebars.compile(baseTpl)({ body: pageHtml }) : pageHtml;

  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}
