export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-2xl rounded-tl-sm bg-[#191A23] border border-border/80 w-fit shadow-sm">
      <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce" />
    </div>
  );
}

