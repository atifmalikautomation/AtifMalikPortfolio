"use client";

const emojis = [
  { emoji: "\uD83E\uDD16", top: "4%", left: "12%" },
  { emoji: "\u2699\uFE0F", top: "8%", left: "78%" },
  { emoji: "\uD83E\uDDE0", top: "15%", left: "45%" },
  { emoji: "\uD83D\uDCA1", top: "20%", left: "8%" },
  { emoji: "\uD83D\uDCCA", top: "28%", left: "68%" },
  { emoji: "\uD83D\uDE80", top: "34%", left: "30%" },
  { emoji: "\uD83D\uDCAC", top: "42%", left: "85%" },
  { emoji: "\uD83C\uDFAF", top: "48%", left: "18%" },
  { emoji: "\uD83D\uDD17", top: "55%", left: "55%" },
  { emoji: "\uD83D\uDCE7", top: "62%", left: "5%" },
  { emoji: "\u26A1", top: "68%", left: "72%" },
  { emoji: "\uD83D\uDCBC", top: "75%", left: "38%" },
  { emoji: "\uD83D\uDD0D", top: "82%", left: "88%" },
  { emoji: "\uD83C\uDFA8", top: "90%", left: "22%" },
  { emoji: "\uD83D\uDCDE", top: "95%", left: "62%" },
];

export function FloatingEmojis() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {emojis.map((item, i) => (
        <div
          key={i}
          className={`absolute text-2xl opacity-[0.10] select-none ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
          style={{
            top: item.top,
            left: item.left,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
