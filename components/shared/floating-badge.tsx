'use client';

import { useRef } from 'react';

type FloatingBadgeProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
};

export function FloatingBadge({ icon, text, className = '' }: FloatingBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const badge = badgeRef.current;
    if (!badge) return;

    const rect = badge.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    badge.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(24px)
      scale(1.04)
    `;
  };

  const handleMouseLeave = () => {
    const badge = badgeRef.current;
    if (!badge) return;

    badge.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
      scale(1)
    `;
  };

  return (
    <div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        w-fit
        group absolute flex items-center gap-4 rounded-[28px]
        border border-white/25
        bg-white/20 px-3 min-h-16
        text-white backdrop-blur-xl
        shadow-[0_20px_50px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.45)]
        transition-transform duration-200 ease-out
        will-change-transform
        before:absolute before:inset-0 before:rounded-[28px]
        before:bg-gradient-to-br before:from-white/35 before:via-white/10 before:to-transparent
        before:opacity-80
        after:absolute after:inset-0 after:rounded-[28px]
        after:shadow-[inset_-12px_-12px_30px_rgba(0,0,0,0.14)]
        ${className}
      `}
    >
      {icon}

      <div className="flex flex-col">
        <span className="text-xs lg:text-sm font-black tracking-wider text-white">{text}</span>
      </div>
    </div>
  );
}
