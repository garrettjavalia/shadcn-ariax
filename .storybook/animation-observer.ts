type AnimationObservationWindow = Window & {
  parityAnimationEffects?: WeakMap<Element, CSSAnimation[]>;
  parityAnimationObserverInstalled?: boolean;
};

// Capture actual handles before short, non-filling effects disappear. The
// comparator still checks their keyframes/timing and current computed names.
export function installParityAnimationObserver() {
  const scope = window as AnimationObservationWindow;
  if (scope.parityAnimationObserverInstalled) return;
  scope.parityAnimationObserverInstalled = true;
  const effects = scope.parityAnimationEffects ??= new WeakMap<Element, CSSAnimation[]>();
  document.addEventListener('animationstart', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const current = target.getAnimations().filter((animation): animation is CSSAnimation => animation instanceof CSSAnimation);
    if (!current.length) return;
    const previous = (effects.get(target) ?? []).filter(animation => !current.some(candidate => candidate.animationName === animation.animationName && (candidate.effect as KeyframeEffect).pseudoElement === (animation.effect as KeyframeEffect).pseudoElement));
    effects.set(target, [...current, ...previous]);
  }, true);
}
