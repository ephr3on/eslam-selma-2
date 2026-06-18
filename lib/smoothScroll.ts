/** Scrolls to a DOM element over `duration` ms with an ease-in-out curve. */
export function smoothScrollTo(targetId: string, duration = 2000) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const startY  = window.scrollY;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  // Quartic ease-in-out — slow start, slow end
  const ease = (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const step = (now: number) => {
    if (!startTime) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
