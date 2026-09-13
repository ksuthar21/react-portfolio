import { useEffect, useRef, useState } from "react";

// Must match #cursor-follower-dot / #cursor-follower-border sizes in index.scss.
const DOT_SIZE = 6;
const BORDER_SIZE = 24;

const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

const CursorFollower = () => {
  const dotRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);
  // Touch-only devices have no cursor to follow, so render nothing there.
  const [enabled] = useState(hasFinePointer);

  useEffect(() => {
    const dot = dotRef.current;
    const border = borderRef.current;
    if (!enabled || !dot || !border) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      dot.style.transform = `translate(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px)`;
      border.style.transform = `translate(${x - BORDER_SIZE / 2}px, ${y - BORDER_SIZE / 2}px)`;
      dot.classList.add("visible");
      border.classList.add("visible");
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span id="cursor-follower-dot" ref={dotRef} aria-hidden="true" />
      <span id="cursor-follower-border" ref={borderRef} aria-hidden="true" />
    </>
  );
};

export default CursorFollower;
