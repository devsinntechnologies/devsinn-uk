const dots = [
  "left-[16%] top-[18%] h-2.5 w-2.5 delay-0",
  "left-[24%] top-[34%] h-2 w-2 delay-300",
  "left-[51%] top-[24%] h-3 w-3 delay-700",
  "left-[69%] top-[18%] h-4 w-4 delay-500",
  "left-[82%] top-[30%] h-2.5 w-2.5 delay-1000",
  "left-[73%] top-[68%] h-3 w-3 delay-200",
  "left-[34%] top-[82%] h-2.5 w-2.5 delay-900",
];

export default function HeroAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-8%] top-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(91,151,255,0.14)_0%,_rgba(91,151,255,0.02)_58%,_transparent_72%)] blur-xl" />

      {dots.map((dotClass) => (
        <span
          key={dotClass}
          className={`hero-dot absolute rounded-full bg-[#8ff6ff] shadow-[0_0_18px_rgba(126,223,255,0.85)] ${dotClass}`}
        />
      ))}
    </div>
  );
}
