"use client";

interface ProjectFilterProps {
  categories: Array<{ key: string; label: string }>;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ProjectFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-semibold scale-105"
                : "bg-[#191A23] text-muted hover:text-foreground hover:bg-secondary/70 border border-border/80"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

