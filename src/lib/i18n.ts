export type Locale = "en" | "zh" | "ko";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

type TranslationKeys =
  | "nav.tours"
  | "nav.destinations"
  | "nav.about"
  | "nav.contact"
  | "nav.book"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta"
  | "hero.secondary"
  | "trust.title"
  | "booking.title"
  | "booking.step1"
  | "booking.step2"
  | "booking.step3"
  | "footer.tagline"
  | "cta.whatsapp"
  | "cta.freeQuote";

const translations: Record<Locale, Record<TranslationKeys, string>> = {
  en: {
    "nav.tours": "Tours",
    "nav.destinations": "Destinations",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.book": "Book Now",
    "hero.title": "Discover East Africa & Botswana",
    "hero.subtitle":
      "Luxury safaris, Kilimanjaro treks, Zanzibar beaches, and Okavango delta experiences — tailored for travelers from China, USA, Europe, Korea, Australia & New Zealand.",
    "hero.cta": "Get Your Free Safari Quote",
    "hero.secondary": "View Signature Tours",
    "trust.title": "Trusted by 2,400+ international travelers",
    "booking.title": "Book Your Adventure",
    "booking.step1": "Choose tour",
    "booking.step2": "Your details",
    "booking.step3": "Confirm",
    "footer.tagline": "Licensed Tanzania tour operator · 24/7 support",
    "cta.whatsapp": "Chat on WhatsApp",
    "cta.freeQuote": "Free Quote in 24 Hours",
  },
  zh: {
    "nav.tours": "行程",
    "nav.destinations": "目的地",
    "nav.about": "关于我们",
    "nav.contact": "联系",
    "nav.book": "立即预订",
    "hero.title": "探索东非与博茨瓦纳",
    "hero.subtitle":
      "豪华游猎、乞力马扎罗登山、桑给巴尔海滩与奥卡万戈三角洲 — 专为中国、美国、欧洲、韩国、澳大利亚及新西兰旅客定制。",
    "hero.cta": "获取免费游猎报价",
    "hero.secondary": "查看精选行程",
    "trust.title": "深受 2,400+ 国际旅客信赖",
    "booking.title": "预订您的冒险之旅",
    "booking.step1": "选择行程",
    "booking.step2": "填写信息",
    "booking.step3": "确认",
    "footer.tagline": "坦桑尼亚持牌旅行社 · 24/7 客服",
    "cta.whatsapp": "WhatsApp 咨询",
    "cta.freeQuote": "24小时内免费报价",
  },
  ko: {
    "nav.tours": "투어",
    "nav.destinations": "여행지",
    "nav.about": "소개",
    "nav.contact": "문의",
    "nav.book": "예약하기",
    "hero.title": "동아프리카 & 보츠와나를 만나보세요",
    "hero.subtitle":
      "럭셔리 사파리, 킬리만자로 트레킹, 잔지바르 해변, 오카방고 델타 — 중국, 미국, 유럽, 한국, 호주, 뉴질랜드 여행객을 위한 맞춤 여행.",
    "hero.cta": "무료 사파리 견적 받기",
    "hero.secondary": "시그니처 투어 보기",
    "trust.title": "2,400명 이상의 국제 여행객이 신뢰합니다",
    "booking.title": "모험을 예약하세요",
    "booking.step1": "투어 선택",
    "booking.step2": "정보 입력",
    "booking.step3": "확인",
    "footer.tagline": "탄자니아 공인 여행사 · 24/7 지원",
    "cta.whatsapp": "WhatsApp 상담",
    "cta.freeQuote": "24시간 내 무료 견적",
  },
};

export function t(locale: Locale, key: TranslationKeys): string {
  return translations[locale][key] ?? translations.en[key];
}
