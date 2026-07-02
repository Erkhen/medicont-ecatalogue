var PRODUCTS = [
  {
    id: 11,
    name: "Вакс - Bone wax",
    code: "1234",
    size: "2.5гр",
    origin: "Люксембург",
    category: "eye-surgery",
    image: "images/wax.png",
    description: "Хэмт ясны цус тогтооох зориулалттай",
    specs: [],
    extraImages: [],
    attachments: []
  },
  {
    id: 12,
    name: "Цус тогтоогч",
    code: "12345",
    size: "5x35см",
    origin: "Энэтхэг",
    category: "eye-surgery",
    image: "images/togtoogch.png",
    description: "Нэхээсэн бүтэцтэй,, ариун, бүрэн шимэгддэг байх",
    specs: [],
    extraImages: [],
    attachments: []
  },
  {
    id: 13,
    name: "Желатин цус тогтоогч - Gelatin Sponge",
    code: "123456",
    size: "7см x 5 cм x 1 см",
    origin: "Энэтхэг - Aegis",
    category: "eye-surgery",
    image: "images/gelatin.png",
    description: "Желатин материалтай цус тогтоогч",
    specs: [],
    extraImages: [],
    attachments: []
  },
  {
    id: 14,
    name: "Хөвөн цус тогтоогч",
    code: "234",
    size: "2.5cm x  5cm, 5.1cm x 10.2cm, 10.2cm x 10.2cm",
    origin: "Герман - Medprin",
    category: "eye-surgery",
    image: "images/huvun.png",
    description: "Ургамлын гаралтай/ Исэлдүүлж нөхөн төлжүүлсэн целлюлоз/. Цус тогтоох болон бактерийн эсрэг үйлдэлтэй. Олон давхаргаас бүрдсэн, давхарга бүр хуулрах боломжтой. 2.5cm x 5cm, 5.1cm x 10.2cm, 10.2cm x 10.2cm гэсэн гурван төрлийн хэмжээтэй. Шууд хэрэглэнэ, өрөөний температурт хадгална.",
    specs: [],
    extraImages: [],
    attachments: []
  },
  {
    id: 15,
    name: "Байнгын аневризмийн хавчаар - Permanent aneurysm clip",
    code: "34",
    size: "",
    origin: "Герман - Rebstock",
    category: "diagnostic",
    image: "images/havchaar.png",
    description: "Хавчаар нь түүнийг барих хэсэг буюу түгжигч, ажлын хэсэг буву хавчих үзүүрээс бүрдэнэ. Хавчаар нь титанаар хийгдсэн байх. 3 MRI (3 тесла хүртэл) хийхэд эсрэг заалтгүй, Нэг бүрээр савлагдсан, ариун байх байдал нь 2оос доошгүй жилийн баталгаатай, Цонхтой, цонхгүй зэрэг хэлбэртэй, стандарт болон мини хавчаар.",
    specs: [
      { label: "Хавчих хэсэг", value: "3-20мм урттай" },
      { label: "шулуун тахир, өнцөг", value: "90 хэм" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 16,
    name: "Хавчаар тавигч багаж  - Aneurysm clip applier",
    code: "06-05-597T",
    size: "",
    origin: "Герман - Rebstock",
    category: "diagnostic",
    image: "images/2havchaar.png",
    description: "Нийлүүлэх гэж буй хавчаартай хослон ашиглах зориулалттай, Аневризмын байнгын хавчаартай нэг ижил үйлдвэрлэгчийнх байх, Автоклавт ариутгах боломжтой, Стандарт болон мини хавчаартай ижил өнгөөр ялгасан байх, Баёонет хэлбэртэй(bayonet shape), Баригчийн ам ажлын хэсэг нь нугарах боломжтой (the swiwel ends and adjustable jaw parts), Ариутгах  хадгалах зориулалт бүхий өөрийн хайрцагтай байх, Мини хавчаарны баригчийн ам нь жижиг байх, Үнэгүй дагалдах",
    specs: [
      { label: "Стандарт болон Мини хавчаар баригч", value: "3 хос (220мм урттай )" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 17,
    name: "Түр зуурын хавчаар",
    code: "65 000",
    size: "",
    origin: "Гермман - Rebstock",
    category: "diagnostic",
    image: "images/3havchaar.png",
    description: "Хавчаар нь түүнийг барих хэсэг буюу түгжигч, ажлын хэсэг буюу хавчих үзүүрээс бүрдэнэ. Нэг бүрээр савлагдсан , ариун байх, ариун байдал нь 2-оос доошгүй жилийн баталгаатай, автоклавт ариутгах боломжтой байх, үнэгүй дагалдах",
    specs: [
      { label: "Хавчих хэсэг", value: "3-20мм урттай" },
      { label: "шулуун, тахир, өнцөг", value: "90 хэм" }
    ],
    extraImages: [],
    attachments: []
  }
];

var CATEGORIES = [
  { id: "all", label: "Бүгд" },
  { id: "eye-surgery", label: "Металл утас, этивонд" },
  { id: "diagnostic", label: "Тархины мэс заслын хэрэгсэл" },
  { id: "iol", label: "Тархи, Хүзүүний мэс заслын хэрэгсэл" },
  { id: "tarhi", label: "Тархи-хэвлийн хөндийг холбох гуурс" },
  { id: "consumable", label: "Нурууны мэс заслын хэрэгсэл" }
];
