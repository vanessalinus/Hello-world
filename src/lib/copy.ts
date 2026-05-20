export type Locale = "en" | "zh" | "ko";

export const COPY: Record<
  Locale,
  {
    nav: Record<string, string>;
    hero: Record<string, string>;
    cta: Record<string, string>;
    trust: Record<string, string>;
    markets: Record<string, string>;
    form: Record<string, string>;
    book: Record<string, string>;
    footer: Record<string, string>;
  }
> = {
  en: {
    nav: {
      home: "Home",
      destinations: "Destinations",
      book: "Plan a trip",
      contact: "Contact",
      privacy: "Privacy",
    },
    hero: {
      kicker: "Tanzania · Zanzibar · Botswana · East Africa",
      title: "Safaris and islands, planned for how you actually travel.",
      subtitle:
        "Private itineraries, transparent pricing steps, and on-the-ground support from Arusha. We specialise in guests flying in from China, the USA, Europe, South Korea, Australia, and New Zealand.",
      primary: "Get a tailored quote",
      secondary: "WhatsApp us now",
    },
    cta: {
      strip: "Typical first reply within one business day. Urgent departures: message us on WhatsApp.",
      finalTitle: "Ready for dates, lodges, and a clear day-by-day plan?",
      finalBody:
        "Tell us your window and style — classic camps, ultra-luxury, family-friendly, or photography-led. We respond with a structured proposal you can share with your group.",
    },
    trust: {
      licensed: "Locally registered operator",
      payments: "Secure payment milestones",
      support: "24/7 in-destination assistance",
    },
    markets: {
      title: "Built for long-haul travellers",
      body: "Time zones, visa realities, and routing via Doha, Dubai, Addis, or Nairobi — we handle the boring parts so you focus on wildlife and beaches.",
    },
    form: {
      name: "Full name",
      email: "Email",
      phone: "Phone / WeChat ID (optional)",
      region: "Where are you travelling from?",
      destinations: "Destinations you are interested in",
      month: "Preferred travel month",
      adults: "Adults",
      children: "Children",
      budget: "Indicative budget (USD, per group)",
      message: "Notes (lodges you like, pace, special occasions)",
      whatsapp: "I prefer WhatsApp for follow-up",
      submit: "Send my trip brief",
      sending: "Sending…",
      success: "Received — our team will contact you shortly.",
      error: "Something went wrong. Please email us or use WhatsApp.",
    },
    book: {
      title: "High-intent trip brief",
      subtitle:
        "This short form is designed for faster, more accurate quotes. Fields marked with context help us match camps and routings to your region’s typical flight patterns.",
    },
    footer: {
      rights: "All rights reserved.",
      invest: "A travel brand of Leviva Investments — Tanzania.",
    },
  },
  zh: {
    nav: {
      home: "首页",
      destinations: "目的地",
      book: "行程咨询",
      contact: "联系",
      privacy: "隐私",
    },
    hero: {
      kicker: "坦桑尼亚 · 桑给巴尔 · 博茨瓦纳 · 东非",
      title: "为您量身定制的游猎与海岛假期。",
      subtitle:
        "私人行程、清晰报价步骤、阿鲁沙本地团队全程支持。我们擅长服务来自中国、美国、欧洲、韩国、澳大利亚与新西兰的客人。",
      primary: "获取定制报价",
      secondary: "WhatsApp 立即沟通",
    },
    cta: {
      strip: "通常一个工作日内首次回复；紧急出发请使用 WhatsApp。",
      finalTitle: "需要具体日期、酒店与每日行程表？",
      finalBody:
        "告诉我们出行时间与风格——经典营地、顶奢、亲子或摄影导向。我们将提供可分享给同行伙伴的结构化方案。",
    },
    trust: {
      licensed: "坦桑尼亚本地注册旅行社",
      payments: "分阶段安全付款",
      support: "目的地 7×24 协助",
    },
    markets: {
      title: "为长途飞行客人优化",
      body: "时差、签证与经多哈、迪拜、亚的斯亚贝巴或内罗毕的中转——我们处理繁琐细节，您只管享受野生动物与海滩。",
    },
    form: {
      name: "姓名",
      email: "邮箱",
      phone: "电话 / 微信号（可选）",
      region: "您从哪个地区出发？",
      destinations: "感兴趣的目的地",
      month: "首选出行月份",
      adults: "成人",
      children: "儿童",
      budget: "大致预算（美元，按整团）",
      message: "备注（喜欢的酒店、节奏、纪念日等）",
      whatsapp: "希望通过 WhatsApp 跟进",
      submit: "发送行程需求",
      sending: "发送中…",
      success: "已收到——我们会尽快与您联系。",
      error: "提交失败，请发邮件或使用 WhatsApp。",
    },
    book: {
      title: "高意向行程需求表",
      subtitle: "精简字段有助于更快、更准确地匹配营地与航线。",
    },
    footer: {
      rights: "版权所有。",
      invest: "Leviva Investments 旗下旅游品牌 — 坦桑尼亚。",
    },
  },
  ko: {
    nav: {
      home: "홈",
      destinations: "여행지",
      book: "상담 신청",
      contact: "문의",
      privacy: "개인정보",
    },
    hero: {
      kicker: "탄자니아 · 잔지바르 · 보츠와나 · 동아프리카",
      title: "당신의 여행 방식에 맞춘 사파리와 섬 휴양.",
      subtitle:
        "맞춤 일정, 투명한 견적 단계, 아루샤 현지 팀 지원. 중국, 미국, 유럽, 한국, 호주, 뉴질랜드에서 오시는 고객을 전문적으로 돕습니다.",
      primary: "맞춤 견적 받기",
      secondary: "WhatsApp 바로 연결",
    },
    cta: {
      strip: "영업일 기준 보통 1일 이내 첫 회신. 긴급 일정은 WhatsApp을 이용해 주세요.",
      finalTitle: "날짜, 로지, 일자별 플랜이 필요하신가요?",
      finalBody:
        "일정과 스타일(클래식/초럭셔리/가족/사진)을 알려주시면 그룹과 공유하기 쉬운 구조화된 제안서로 답변드립니다.",
    },
    trust: {
      licensed: "탄자니아 현지 등록 여행사",
      payments: "안전한 분할 결제",
      support: "현지 24/7 지원",
    },
    markets: {
      title: "장거리 노선 고객을 위해 설계",
      body: "시차, 비자, 도하/두바이/아디스아바바/나이로비 경유까지 — 복잡한 부분은 저희가 정리하고 야생동물과 해변에 집중하세요.",
    },
    form: {
      name: "이름",
      email: "이메일",
      phone: "전화 / 카카오 등 ID(선택)",
      region: "출발 지역",
      destinations: "관심 여행지",
      month: "희망 여행 월",
      adults: "성인",
      children: "아동",
      budget: "예상 예산(USD, 일행 기준)",
      message: "메모(선호 로지, 일정 강도, 기념일 등)",
      whatsapp: "WhatsApp 후속 상담 희망",
      submit: "여행 요청 보내기",
      sending: "전송 중…",
      success: "접수되었습니다. 곧 연락드리겠습니다.",
      error: "오류가 발생했습니다. 이메일 또는 WhatsApp으로 문의해 주세요.",
    },
    book: {
      title: "구체 상담용 여행 브리프",
      subtitle: "핵심 정보만 받아 더 빠르고 정확한 견적을 드립니다.",
    },
    footer: {
      rights: "모든 권리 보유.",
      invest: "Leviva Investments 산하 브랜드 — 탄자니아.",
    },
  },
};
