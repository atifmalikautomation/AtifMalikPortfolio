"use client";

const emojis = [
  { emoji: "🤖", top: "5%", left: "6%" },
  { emoji: "⚙️", top: "6%", left: "75%" },
  { emoji: "🧠", top: "14%", left: "42%" },
  { emoji: "💡", top: "18%", left: "10%" },
  { emoji: "📊", top: "30%", left: "8%" },
  { emoji: "🔗", top: "22%", left: "68%" },
  { emoji: "🚀", top: "55%", left: "88%" },
  { emoji: "💬", top: "38%", left: "45%" },
  { emoji: "📧", top: "48%", left: "5%" },
  { emoji: "🎯", top: "65%", left: "72%" },
];

export function FloatingEmojis() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {emojis.map((item, i) => (
        <div
          key={i}
          className={`absolute text-3xl opacity-[0.08] select-none ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
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
