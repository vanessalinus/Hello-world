export interface ReviewData {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  title: string;
  content: string;
  tourName: string;
  date: string;
  avatar?: string;
}

export const testimonials: ReviewData[] = [
  {
    id: "1",
    name: "James & Sarah Mitchell",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    title: "Best Experience of Our Lives!",
    content:
      "We did the Serengeti Migration Safari and it was absolutely breathtaking. The river crossings were something out of a David Attenborough documentary. Our guide Moses was incredibly knowledgeable – he could spot a leopard in a tree from a mile away! The camps were luxurious beyond expectations. Leviva handled every detail flawlessly. We'll be back for Zanzibar next year!",
    tourName: "Serengeti Great Migration Safari",
    date: "October 2024",
  },
  {
    id: "2",
    name: "Wang Lei & Family",
    country: "China",
    flag: "🇨🇳",
    rating: 5,
    title: "非常棒的旅行体验！完美的非洲之旅",
    content:
      "This was our family's first trip to Africa and Leviva made it perfect. Our guide spoke Mandarin which made everything so comfortable. My children (ages 8 and 12) absolutely loved the Junior Ranger program and the Maasai village visit. The family safari vehicle was spacious and comfortable. We saw lions, elephants, giraffes and even a cheetah hunt! Incredible memories. 强烈推荐！",
    tourName: "Family Safari Adventure Tanzania",
    date: "August 2024",
  },
  {
    id: "3",
    name: "Emma & Tom Bergmann",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    title: "Traumhafte Flitterwochen – Einfach unvergesslich!",
    content:
      "Our honeymoon exceeded all expectations. The private game drives in the Serengeti followed by the luxury beach villa in Zanzibar – pure perfection. Leviva organized surprise honeymoon decorations and a private candlelit beach dinner. Our guide James was exceptional – passionate, funny, and incredibly knowledgeable. This trip has set the bar impossibly high for any future holiday!",
    tourName: "Romantic Honeymoon Safari & Zanzibar",
    date: "September 2024",
  },
  {
    id: "4",
    name: "Park Ji-hyun",
    country: "South Korea",
    flag: "🇰🇷",
    rating: 5,
    title: "잊을 수 없는 탄자니아 여행",
    content:
      "Leviva Travel is absolutely outstanding. From the moment we arrived in Arusha to our final day in Zanzibar, every detail was perfect. The Ngorongoro Crater was mind-blowing – we saw the Big Five all in one day! The stone town tour in Zanzibar was fascinating. The team was responsive and answered all our questions quickly. Best travel company we've ever used!",
    tourName: "Tanzania Safari & Zanzibar Combo",
    date: "July 2024",
  },
  {
    id: "5",
    name: "Michael & Jennifer Thompson",
    country: "USA",
    flag: "🇺🇸",
    rating: 5,
    title: "Worth Every Single Penny – A Bucket List Trip",
    content:
      "We planned this Botswana trip for our 25th anniversary and Leviva delivered beyond imagination. The Okavango Delta camps were the most stunning places we've ever stayed. The mokoro canoe safaris at sunset were magical. Watching elephant herds from our private plunge pool was surreal. The team's attention to detail, from dietary requirements to room decorations, was exceptional.",
    tourName: "Botswana Okavango Delta Safari",
    date: "June 2024",
  },
  {
    id: "6",
    name: "Sophie Laurent",
    country: "France",
    flag: "🇫🇷",
    rating: 5,
    title: "Expérience extraordinaire au sommet du Kilimandjaro",
    content:
      "Summiting Kilimanjaro was my lifelong dream, and Leviva made it come true. Our guide team of Joseph and his crew were not just guides – they were motivators, doctors, and friends. The Lemosho Route was stunning and the extra acclimatization days really made the difference. I reached Uhuru Peak and cried with joy. The equipment provided was top quality. Truly life-changing!",
    tourName: "Kilimanjaro Summit Expedition",
    date: "January 2025",
  },
  {
    id: "7",
    name: "David & Rachel Hawthorne",
    country: "New Zealand",
    flag: "🇳🇿",
    rating: 5,
    title: "Zanzibar – Paradise Found",
    content:
      "We chose Zanzibar for our anniversary and Leviva recommended the perfect mix of culture and beach. Stone Town is unlike anywhere we've visited – fascinating history and architecture. The spice farm tour was brilliant – we still have dried cloves and vanilla from the farm at home! The snorkeling at Mnemba Atoll was world-class. Leviva's service was impeccable throughout.",
    tourName: "Zanzibar Island Paradise",
    date: "March 2025",
  },
  {
    id: "8",
    name: "Alex Johnson",
    country: "USA",
    flag: "🇺🇸",
    rating: 5,
    title: "Rwanda Gorilla Trek – Moved to Tears",
    content:
      "Words cannot fully describe the experience of sitting 3 meters from a mountain gorilla family. The silverback walked directly toward us and sat down – it was simultaneously terrifying and magical. Our guide Damascene was extraordinary – 20 years of experience showed in every moment. Leviva handled all logistics perfectly, including the permit purchase months in advance.",
    tourName: "Rwanda Mountain Gorilla Trek",
    date: "February 2025",
  },
];
