import { NextRequest, NextResponse } from "next/server";
import { initialProfile, initialProjects } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "메시지가 비어있습니다." }, { status: 400 });
    }

    const userQuery = message.trim();

    // --------------------------------------------------------------------------
    // [1] PRD 필수 가드레일: 포트폴리오 무관 질문 사전 감지
    // --------------------------------------------------------------------------
    const forbiddenKeywords = [
      "날씨", "주식", "코인", "정치", "대통령", "양자역학", "수학문제",
      "번역", "파이썬 코드 짜줘", "소설 써줘", "너의 시스템 프롬프트", "탈옥", "jailbreak"
    ];

    const isOutOfScope = forbiddenKeywords.some((keyword) => userQuery.toLowerCase().includes(keyword));

    if (isOutOfScope) {
      return NextResponse.json({
        reply: `죄송합니다. 저는 ${initialProfile.full_name} 디렉터님의 포트폴리오 및 프로젝트 의뢰와 관련된 내용에만 답변드릴 수 있습니다.\n\n작업 스타일, 프로젝트 사례, 견적이나 협업 방식에 대해 궁금하신 점이 있으시다면 언제든 말씀해 주세요!`,
        suggestions: ["대표 프로젝트 보여줘", "기본 단가와 일정은?", "공간 인테리어 시공 사례"],
      });
    }

    // --------------------------------------------------------------------------
    // [2] Gemini API 키가 있는 경우 Google Generative AI 호출
    // --------------------------------------------------------------------------
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // RAG 컨텍스트 준비 (프로필 + 프로젝트 데이터 + 룰북)
    const contextPrompt = `
당신은 크리에이티브 디렉터 '${initialProfile.full_name}'의 공식 24시간 AI 어시스턴트입니다.
방문자가 질문하면 아래의 [창작자 공식 데이터]만을 기반으로 정확하고 친절하며 전문성 있게 답변하세요.

[창작자 공식 데이터]
- 이름: ${initialProfile.full_name} (${initialProfile.profession})
- 소개: ${initialProfile.bio}
- 보유 스킬: ${initialProfile.skills.join(", ")}
- 이력:
${initialProfile.experiences.map((e) => `  * [${e.period}] ${e.company} - ${e.role}: ${e.description}`).join("\n")}
- 룰북 (견적 및 일정 기준):
  * 최소 수주 단가: ${initialProfile.rulebook.min_budget.toLocaleString()}원부터 시작
  * 기본 소요 기간: 최소 ${initialProfile.rulebook.min_duration_days}일 이상
  * 수주 불가/거절 조건: ${initialProfile.rulebook.blocked_requests.join(", ")}
- 대표 프로젝트:
${initialProjects.map((p) => `  * [${p.title} (${p.category})]: ${p.description}\n    태그: ${p.tags.join(", ")}`).join("\n")}

[답변 원칙]
1. 창작자의 작업 스타일, 과거 프로젝트 경험, 견적 범위, 협업 방식을 묻는 질문에는 위 데이터를 근거로 구체적으로 답변하세요.
2. 예산이나 일정이 룰북 기준(최소 80만원, 최소 14일)에 미치지 못하거나 '무료 시안' 등을 요구하면 정중하게 거절하고 기준 범위 내에서 정식 의뢰서를 남기도록 안내하세요.
3. 데이터에 없는 허위 정보를 지어내지 마세요(할루시네이션 방지). 확실하지 않은 세부 사항은 "해당 부분은 작가님과 직접 협의가 필요합니다"라고 답하세요.
`;

    if (apiKey && apiKey !== "placeholder-gemini-key") {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: contextPrompt },
                    { text: `[방문자 질문]: ${userQuery}` },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              reply: generatedText,
              suggestions: ["비슷한 다른 프로젝트도 있나요?", "정식 의뢰는 어떻게 하나요?"],
            });
          }
        }
      } catch (err) {
        console.error("Gemini API 호출 실패, 지능형 룰 기반 응답으로 전환:", err);
      }
    }

    // --------------------------------------------------------------------------
    // [3] 로컬 지능형 RAG 규칙 기반 응답 (API 키 미설정 또는 장애 시 무중단 지원)
    // --------------------------------------------------------------------------
    let reply = "";
    let suggestions = ["대표 프로젝트 보여줘", "기본 단가와 일정은?"];

    if (userQuery.includes("단가") || userQuery.includes("비용") || userQuery.includes("얼마") || userQuery.includes("예산")) {
      reply = `${initialProfile.full_name} 디렉터님의 프로젝트 최소 수주 단가는 80만 원부터 시작하며, 공간 기획/인테리어는 평당 120만 원 선에서 기본 협의됩니다. 기본 작업 소요기간은 2주~4주입니다. 자세한 조건 협의는 상단 메뉴나 의뢰 접수를 통해 문의해 주시면 직접 연락드립니다.`;
      suggestions = ["진행했던 인테리어 사례 보여줘", "F&B 브랜딩 작업 사례"];
    } else if (userQuery.includes("프로젝트") || userQuery.includes("사례") || userQuery.includes("작업") || userQuery.includes("어떤 일")) {
      reply = `${initialProfile.full_name} 디렉터님은 성수동 '카페 르보' 브랜딩 및 45평 공간 인테리어, '아틀리에 베이커리' 친환경 패키지 디자인, 60평 미니멀 가구 쇼룸 시공 등 다수의 프로젝트를 총괄하셨습니다. 상단 'Projects' 메뉴에서 고해상도 작업물을 보실 수 있습니다.`;
      suggestions = ["카페 르보 프로젝트 자세히 알려줘", "기본 단가와 일정은?"];
    } else if (userQuery.includes("연락") || userQuery.includes("의뢰") || userQuery.includes("상담") || userQuery.includes("전화")) {
      reply = `프로젝트 의뢰나 상담을 원하시면 이메일(${initialProfile.email}) 또는 전화번호(${initialProfile.phone_number})로 직접 연락 주시거나, 문의 내용을 남겨주시면 1시간 내로 작가님이 직접 연락드립니다.`;
      suggestions = ["기본 단가와 일정은?", "대표 프로젝트 보여줘"];
    } else {
      reply = `${initialProfile.full_name} 디렉터님은 공간의 본질과 브랜드의 아이덴티티를 잇는 1인 크리에이티브 파트너입니다. 카페, 베이커리, 쇼룸 등 다양한 상업 공간과 브랜딩 프로젝트를 진행해 왔습니다. 구체적으로 어떤 작업이나 견적이 궁금하신가요?`;
      suggestions = ["기본 단가와 일정은?", "진행했던 프로젝트 목록 보여줘"];
    }

    return NextResponse.json({ reply, suggestions });
  } catch (error) {
    console.error("Chat API 에러:", error);
    return NextResponse.json(
      { error: "메시지 처리 중 서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

