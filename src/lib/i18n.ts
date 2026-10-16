export const LANGS = ["ar", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ar";

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

export const dirOf = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

/** Arabic lives at clean URLs (/works); English is prefixed (/en/works). */
export function localePath(lang: Lang, path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}

/** Strips a locale prefix so a pathname can be re-localized. */
export function stripLang(pathname: string) {
  const m = pathname.match(/^\/(ar|en)(?=\/|$)/);
  return m ? pathname.slice(m[0].length) || "/" : pathname;
}

const ar = {
  nav: { home: "الرئيسية", works: "أعمالي", about: "عنّي", contact: "تواصل", menu: "القائمة" },
  theme: "تبديل الوضع الليلي",
  switchLang: "EN",
  switchLangLabel: "Switch to English",
  rights: "جميع الحقوق محفوظة.",
  home: {
    browseWorks: "تصفّح الأعمال",
    contactMe: "تواصل معي",
    selected: "أعمال مختارة",
    allWorks: "كل الأعمال",
    noWorks: "لا توجد أعمال بعد. أضف أول مشروع من لوحة التحكم.",
    cta: "لنصنع شيئاً يستحق الزيارة",
    testimonials: "آراء العملاء",
  },
  bento: {
    about: "نبذة",
    more: "المزيد عنّي",
    published: "مشروع منشور",
    fields: "مجال عمل",
    latest: "آخر مشروع",
    tools: "أدوات أعمل بها",
    haveProject: "عندك مشروع؟",
  },
  story: {
    title: "كيف نعمل معاً",
    steps: [
      { title: "نفهم", body: "نبدأ بالأسئلة: من جمهورك، وماذا تريد أن يفعل الزائر بعد أن يصل؟" },
      { title: "نصمّم", body: "نحوّل الإجابات إلى هيكل ومسودات بصرية، ونراجعها معاً قبل كتابة أي كود." },
      { title: "نبني", body: "يتحول التصميم إلى موقع سريع ومتجاوب، تعدّل محتواه بنفسك من لوحة التحكم." },
      { title: "نطلق", body: "نختبر على كل الأجهزة، ننشر، ثم نتابع الأداء ونحسّن بناءً على الأرقام." },
    ],
  },
  works: {
    title: "أعمالي",
    count: (n: number) => `${n} مشروع`,
    empty: "لا توجد أعمال بعد.",
    all: "الكل",
    back: "كل الأعمال",
    category: "التصنيف",
    year: "السنة",
    tools: "الأدوات",
    visit: "زيارة المشروع",
  },
  about: { title: "عنّي", skills: "المهارات" },
  contact: {
    title: "تواصل",
    heading: "لنتحدث",
    intro: "عندك مشروع أو فكرة؟ أرسل لي رسالة وبأرد عليك.",
    email: "البريد",
    phone: "الجوال",
    location: "الموقع",
    name: "الاسم",
    emailField: "البريد الإلكتروني",
    message: "الرسالة",
    send: "إرسال",
    sending: "جارِ الإرسال",
    sent: "وصلت رسالتك",
    thanks: "شكراً لك، بأرد عليك قريباً.",
    invalid: "تأكد من تعبئة الحقول بشكل صحيح.",
    notReady: "الخدمة غير مهيأة بعد.",
    failed: "صار خطأ، حاول مرة ثانية.",
  },
  testimonials: { rating: (n: number) => `${n} من 5` },
  notFound: { title: "الصفحة غير موجودة", home: "الرئيسية" },
};

export type Dict = typeof ar;

const en: Dict = {
  nav: { home: "Home", works: "Work", about: "About", contact: "Contact", menu: "Menu" },
  theme: "Toggle dark mode",
  switchLang: "ع",
  switchLangLabel: "التبديل إلى العربية",
  rights: "All rights reserved.",
  home: {
    browseWorks: "Browse work",
    contactMe: "Get in touch",
    selected: "Selected work",
    allWorks: "All work",
    noWorks: "No projects yet. Add the first one from the dashboard.",
    cta: "Let's build something worth visiting",
    testimonials: "What clients say",
  },
  bento: {
    about: "About",
    more: "More about me",
    published: "Published projects",
    fields: "Fields",
    latest: "Latest project",
    tools: "Tools I use",
    haveProject: "Have a project?",
  },
  story: {
    title: "How we work together",
    steps: [
      { title: "Understand", body: "We start with questions: who is your audience, and what should a visitor do once they arrive?" },
      { title: "Design", body: "The answers become structure and visual drafts, which we review together before any code is written." },
      { title: "Build", body: "The design becomes a fast, responsive site whose content you edit yourself from the dashboard." },
      { title: "Launch", body: "We test on every device, ship it, then watch performance and improve based on the numbers." },
    ],
  },
  works: {
    title: "Work",
    count: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    empty: "No projects yet.",
    all: "All",
    back: "All work",
    category: "Category",
    year: "Year",
    tools: "Tools",
    visit: "Visit project",
  },
  about: { title: "About", skills: "Skills" },
  contact: {
    title: "Contact",
    heading: "Let's talk",
    intro: "Have a project or an idea? Send me a message and I'll get back to you.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    name: "Name",
    emailField: "Email address",
    message: "Message",
    send: "Send",
    sending: "Sending",
    sent: "Message received",
    thanks: "Thank you, I'll reply soon.",
    invalid: "Please check the fields and try again.",
    notReady: "The service isn't set up yet.",
    failed: "Something went wrong, please try again.",
  },
  testimonials: { rating: (n: number) => `${n} out of 5` },
  notFound: { title: "Page not found", home: "Home" },
};

const DICTS: Record<Lang, Dict> = { ar, en };
export const getDict = (lang: Lang) => DICTS[lang];
