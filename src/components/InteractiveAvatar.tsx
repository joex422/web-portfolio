"use client";

/* eslint-disable @next/next/no-img-element -- The PNG and SVG share exact artwork coordinates for independently animated eyes. */

import { useEffect, useId, useRef } from "react";
import { useMotionPreference } from "./creator-motion";
import {
  createExpressionMaps,
  type AvatarExpression,
} from "./avatar-expressions";

const artwork = { width: 1205, height: 1306 };
const eyes = [
  {
    name: "left",
    x: 469,
    y: 674,
    contour:
      "M366 690 C362 664 384 631 413 625 C433 618 446 619 452 622 C492 621 518 641 529 668 C535 684 539 707 535 724 C496 734 425 735 394 719 C379 713 369 704 366 690Z",
  },
  {
    name: "right",
    x: 761,
    y: 676,
    contour:
      "M689 721 C690 699 694 677 703 661 C720 637 742 625 763 623 C793 615 825 634 844 652 C858 668 866 686 862 698 C858 715 840 727 816 730 C771 739 715 733 689 727Z",
  },
];

const clamp = (value: number, limit = 1) =>
  Math.max(-limit, Math.min(limit, value));

export function InteractiveAvatar({
  src,
  closedSrc,
}: {
  src: string;
  closedSrc: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const pupils = useRef<(SVGGElement | null)[]>([]);
  const eyeOpenings = useRef<(SVGRectElement | null)[]>([]);
  const eyelids = useRef<(SVGGElement | null)[]>([]);
  const expressionMap = useRef<SVGFEImageElement>(null);
  const expressionWarp = useRef<SVGFEDisplacementMapElement>(null);
  const reduced = useMotionPreference();
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const element = head.current;
    const container = stage.current;
    if (!element || !container) return;

    const setEyeOpen = (open: number) => {
      eyeOpenings.current.forEach((opening) => {
        opening?.setAttribute("y", String(620 + (1 - open) * 81.2));
        opening?.setAttribute("height", String(116 * open));
      });
      eyelids.current.forEach((lid) =>
        lid?.setAttribute("opacity", String(1 - open)),
      );
      container.dataset.eyeOpen = open.toFixed(3);
    };
    const reset = () => {
      setEyeOpen(1);
      expressionWarp.current?.setAttribute("scale", "0");
      container.dataset.expression = "relaxed";
      element.style.transform = "none";
      pupils.current.forEach((pupil) =>
        pupil?.setAttribute("transform", "translate(0 0)"),
      );
    };
    if (reduced) {
      reset();
      return;
    }

    let frame = 0;
    let previousTime = 0;
    let visible = true;
    let cursor: { x: number; y: number } | null = null;
    let bounds = container.getBoundingClientRect();
    let heroHeight =
      container.closest("section")?.offsetHeight ?? window.innerHeight;
    const current = [0, 0, 0, 0, 0, 0, 0, 0];
    const maps = createExpressionMaps(artwork.width, artwork.height);
    let expression: AvatarExpression = "relaxed";
    let queuedExpression: AvatarExpression | null = null;
    let blinkStart: number | null = null;
    let blinkTimer: ReturnType<typeof setTimeout> | null = null;
    let expressionTimer: ReturnType<typeof setTimeout> | null = null;
    let expressionIndex = 0;
    const target = [...current];
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Animate only until settled; no permanent render loop while the page is idle.
    const animate = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = previousTime ? Math.min(time - previousTime, 40) : 16;
      previousTime = time;
      const follow = 1 - Math.exp(-delta / 95);
      let moving = false;
      current.forEach((value, index) => {
        const difference = target[index] - value;
        current[index] =
          Math.abs(difference) < (index === 7 ? 0.003 : 0.015)
            ? target[index]
            : value +
              difference * (index === 7 ? 1 - Math.exp(-delta / 180) : follow);
        moving ||= Math.abs(difference) >= (index === 7 ? 0.003 : 0.015);
      });
      element.style.transform = `translate3d(${current[0]}px, ${current[1]}px, 0) rotateX(${current[2]}deg) rotateY(${current[3]}deg) rotateZ(${current[4]}deg)`;
      pupils.current.forEach((pupil) =>
        pupil?.setAttribute(
          "transform",
          `translate(${current[5]} ${current[6]})`,
        ),
      );
      if (queuedExpression && current[7] < 0.008) {
        expression = queuedExpression;
        queuedExpression = null;
        container.dataset.expression = expression;
        if (expression !== "relaxed" && maps)
          expressionMap.current?.setAttribute("href", maps[expression]);
        target[7] = expression === "relaxed" ? 0 : 1;
        moving = true;
      }
      expressionWarp.current?.setAttribute("scale", String(current[7] * 64));
      if (blinkStart !== null) {
        const progress = (time - blinkStart) / 240;
        const ease = (value: number) => value * value * (3 - 2 * value);
        const open =
          progress < 0.38
            ? 1 - ease(Math.max(0, progress / 0.38))
            : progress < 0.55
              ? 0
              : ease(Math.min(1, (progress - 0.55) / 0.45));
        setEyeOpen(open);
        if (progress >= 1) {
          blinkStart = null;
          armBlink();
        } else moving = true;
      }
      if (moving) frame = requestAnimationFrame(animate);
      else previousTime = 0;
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(animate);
    };
    const changeExpression = (next: AvatarExpression) => {
      if (!maps || (next === expression && queuedExpression === null)) return;
      queuedExpression = next;
      target[7] = 0;
      schedule();
    };
    const armBlink = (delay = 3200 + Math.random() * 2000) => {
      if (blinkTimer || !visible || document.hidden) return;
      blinkTimer = setTimeout(() => {
        blinkTimer = null;
        blinkStart = performance.now();
        schedule();
      }, delay);
    };
    const armExpression = (delay = 5000) => {
      if (expressionTimer || !visible || document.hidden) return;
      expressionTimer = setTimeout(() => {
        expressionTimer = null;
        const cycle: AvatarExpression[] = ["smile", "curious", "relaxed"];
        changeExpression(cycle[expressionIndex++ % cycle.length]);
        armExpression();
      }, delay);
    };
    const stopAmbient = () => {
      if (blinkTimer) clearTimeout(blinkTimer);
      if (expressionTimer) clearTimeout(expressionTimer);
      blinkTimer = null;
      expressionTimer = null;
      blinkStart = null;
      setEyeOpen(1);
    };
    const startAmbient = () => {
      armBlink(2400 + Math.random() * 800);
      armExpression(3800);
    };
    const update = () => {
      const progress = Math.max(0, Math.min(window.scrollY / heroHeight, 1));
      const x = cursor
        ? clamp(
            (cursor.x - bounds.left - bounds.width / 2) /
              (window.innerWidth * 0.5),
          )
        : 0;
      const y = cursor
        ? clamp(
            (cursor.y - bounds.top - bounds.height * 0.53) /
              (window.innerHeight * 0.5),
          )
        : 0;
      target[0] = x * 7;
      target[1] = y * 4 - progress * 24;
      target[2] = -y * 7 - progress * 8;
      target[3] = x * 11;
      target[4] = -x * 2 + progress * 3;
      target[5] = x * 16;
      target[6] = clamp(y * 11 + progress * 18, 20);
      schedule();
    };
    const measure = () => {
      bounds = container.getBoundingClientRect();
      heroHeight =
        container.closest("section")?.offsetHeight ?? window.innerHeight;
      update();
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch" || !visible) return;
      cursor = { x: event.clientX, y: event.clientY };
      if (
        cursor.x >= bounds.left &&
        cursor.x <= bounds.right &&
        cursor.y >= bounds.top &&
        cursor.y <= bounds.bottom
      )
        changeExpression("smile");
      update();
    };
    const leave = () => {
      cursor = null;
      update();
    };
    const greet = (event: PointerEvent) => {
      if (
        !visible ||
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        return;
      changeExpression("smile");
      if (blinkTimer) clearTimeout(blinkTimer);
      blinkTimer = null;
      blinkStart = performance.now();
      schedule();
    };
    const visibility = () => {
      if (document.hidden) {
        stopAmbient();
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      } else {
        measure();
        startAmbient();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        measure();
        startAmbient();
      } else {
        stopAmbient();
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      }
    });
    const resize = new ResizeObserver(measure);
    observer.observe(container);
    resize.observe(container);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", greet, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    update();
    startAmbient();
    return () => {
      stopAmbient();
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", greet);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      reset();
    };
  }, [reduced]);

  return (
    <div
      ref={stage}
      className="interactive-avatar"
      data-avatar-motion={reduced ? "reduced" : "interactive"}
      data-expression="relaxed"
      data-eye-open="1.000"
    >
      <div ref={head} className="avatar-head">
        <img
          src={src}
          alt="Zaw’s animated 3D avatar with silver hoop earrings and subtle freckles"
          width={artwork.width}
          height={artwork.height}
          fetchPriority="high"
          draggable={false}
          className="block h-auto w-full select-none"
          style={{ visibility: reduced ? undefined : "hidden" }}
        />
        <svg
          viewBox={`0 0 ${artwork.width} ${artwork.height}`}
          className="avatar-eyes"
          aria-hidden="true"
          focusable="false"
          style={{ display: reduced ? "none" : undefined }}
        >
          <defs>
            <filter
              id={`${id}-expression`}
              x="0"
              y="0"
              width={artwork.width}
              height={artwork.height}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                ref={expressionMap}
                x="0"
                y="0"
                width={artwork.width}
                height={artwork.height}
                preserveAspectRatio="none"
                result="expression-map"
              />
              <feDisplacementMap
                ref={expressionWarp}
                in="SourceGraphic"
                in2="expression-map"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c4866c" />
              <stop offset="0.5" stopColor="#e3aa8e" />
              <stop offset="1" stopColor="#d49276" />
            </linearGradient>
            <radialGradient id={`${id}-blink-feather`}>
              <stop offset="0.75" stopColor="white" />
              <stop offset="1" stopColor="black" />
            </radialGradient>
            <radialGradient id={`${id}-sclera`} cx="48%" cy="43%" r="72%">
              <stop offset="0" stopColor="#fff9fa" />
              <stop offset="0.55" stopColor="#e8dce0" />
              <stop offset="0.85" stopColor="#b9a1a8" />
              <stop offset="1" stopColor="#61404a" />
            </radialGradient>
            {eyes.map((eye, index) => (
              <g key={eye.name}>
                <mask
                  id={`${id}-${eye.name}-closed`}
                  maskUnits="userSpaceOnUse"
                  x={eye.x - 155}
                  y={575}
                  width={310}
                  height={205}
                >
                  <ellipse
                    cx={index === 0 ? 450 : 777}
                    cy={676}
                    rx={135}
                    ry={93}
                    fill={`url(#${id}-blink-feather)`}
                  />
                </mask>
                <clipPath id={`${id}-${eye.name}-eye`}>
                  <path d={eye.contour} />
                </clipPath>
                <clipPath id={`${id}-${eye.name}-blink`}>
                  <rect
                    ref={(node) => {
                      eyeOpenings.current[eyes.indexOf(eye)] = node;
                    }}
                    x={eye.x - 120}
                    y={620}
                    width={240}
                    height={116}
                  />
                </clipPath>
                <clipPath id={`${id}-${eye.name}-iris`}>
                  <ellipse cx={eye.x} cy={eye.y} rx={56} ry={57} />
                </clipPath>
              </g>
            ))}
          </defs>
          <g filter={`url(#${id}-expression)`} className="avatar-expression">
            <image href={src} width={artwork.width} height={artwork.height} />
            {eyes.map((eye, index) => (
              <g key={eye.name}>
                <path d={eye.contour} fill={`url(#${id}-skin)`} />
                <g clipPath={`url(#${id}-${eye.name}-eye)`}>
                  <g clipPath={`url(#${id}-${eye.name}-blink)`}>
                    <path d={eye.contour} fill={`url(#${id}-sclera)`} />
                    <g
                      ref={(node) => {
                        pupils.current[index] = node;
                      }}
                      className="avatar-pupil"
                      data-eye={eye.name}
                    >
                      <g clipPath={`url(#${id}-${eye.name}-iris)`}>
                        <image
                          href={src}
                          width={artwork.width}
                          height={artwork.height}
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                  ref={(node) => {
                    eyelids.current[index] = node;
                  }}
                  className="avatar-eyelid"
                  opacity={0}
                >
                  <image
                    href={closedSrc}
                    width={artwork.width}
                    height={artwork.height}
                    mask={`url(#${id}-${eye.name}-closed)`}
                  />
                </g>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
