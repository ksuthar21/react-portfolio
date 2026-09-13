import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Props = {
  count: number;
  style?: CSSProperties;
  width?: number;
  height?: number;
};

// Stars are drawn as box-shadows on three layers (one per size) instead of one
// DOM node per star, so a 250-star field animates 3 elements instead of 250.
// Speed is in px/s so small fields (e.g. inside a button) loop at the same pace.
const LAYERS = [
  { size: 1, speed: 10 },
  { size: 2, speed: 15 },
  { size: 3, speed: 25 },
];

const random = (max: number) => Math.floor(Math.random() * max);

const Stars = ({ count, style, width, height }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const field = useMemo(() => {
    const w = width ?? window.innerWidth;
    const h = height ?? window.innerHeight;
    const layers = LAYERS.map(() => [] as string[]);

    for (let i = 0; i < count; i++) {
      const x = random(w);
      const y = random(h);
      // Draw each star twice, one field-height apart, so the upward loop is seamless.
      layers[i % LAYERS.length].push(`${x}px ${y}px`, `${x}px ${y + h}px`);
    }

    return { travel: h, shadows: layers.map((layer) => layer.join(",")) };
  }, [count, width, height]);

  // Pause the animation while the section containing the stars is off-screen.
  useEffect(() => {
    const target = ref.current?.parentElement;
    if (!target || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) =>
      setPaused(!entry.isIntersecting)
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={paused ? "stars paused" : "stars"}
      style={style}
      aria-hidden="true"
    >
      {LAYERS.map((layer, i) => (
        <span
          key={layer.size}
          className={`star-layer size-${layer.size}`}
          style={
            {
              boxShadow: field.shadows[i],
              animationDuration: `${Math.round(field.travel / layer.speed)}s`,
              "--travel": `${-field.travel}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Stars;
