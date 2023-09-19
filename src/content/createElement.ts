const parser = new DOMParser();

export function createElement<TElement extends HTMLElement>(
  html: string,
): TElement {
  const element = parser.parseFromString(html, "text/html").body
    .firstElementChild as TElement | null;
  if (!element)
    throw new Error("HTML input string does not contain an element");
  return element;
}

export const addPrefixToId = (id: string) => `page-warning-extension_${id}`;
