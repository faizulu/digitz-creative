type DigitzDeck = {
  index: () => number
}

export function isCurrentDeckPanel(el: HTMLElement | null): boolean {
  if (!el) return false
  const main = document.getElementById('main')
  if (!main) return false
  const panels = main.querySelectorAll(':scope > section, :scope > footer')
  const deck = (window as Window & { __digitzDeck?: DigitzDeck }).__digitzDeck
  const index = deck?.index() ?? 0
  return panels[index] === el
}
