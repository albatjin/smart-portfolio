"use client";

interface ProjectChatButtonProps {
  projectTitle: string;
}

export function ProjectChatButton({ projectTitle }: ProjectChatButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("toggle-chatbot", {
        detail: {
          open: true,
          initialQuery: `'${projectTitle}' 프로젝트의 제작 기간과 대략적인 견적 수준이 어떻게 되나요?`,
        },
      })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-2 px-3 rounded-lg bg-accent text-background font-semibold text-xs hover:opacity-90 transition-all cursor-pointer"
    >
      이 프로젝트 AI에게 질문하기
    </button>
  );
}

