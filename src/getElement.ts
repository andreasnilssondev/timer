export function getHtmlElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(`[data-js="${selector}"]`);

  if (element === null) {
    throw new Error(`Element with selector [data-js="${selector}"] not found`);
  }

  return element;
}
