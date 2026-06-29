var PRODUCTS = [
  {
    id: 1,
    name: "Phaco",
    code: "MED-OPH-001",
    size: "620 × 480 × 1200 мм",
    origin: "Герман",
    category: "eye-surgery",
    image: "images/zurag.png",
    description: "Катаракт мэс заслын зориулалттай орчин үеийн факоэмульсификацийн систем. Өндөр нарийвчлалтай ультра дууны технологи ашиглан нүдний булан солих мэс заслыг хурдан, аюулгүй гүйцэтгэнэ.",
    specs: [
      { label: "Чадал", value: "40W" },
      { label: "Давтамж", value: "40 kHz" },
      { label: "Дэлгэц", value: "15" },
      { label: "Тэжээл", value: "220V / 50Hz" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 2,
    name: "Surgical Microscope",
    code: "MED-OPH-002",
    size: "Ширээний суурьтай",
    origin: "Япон",
    category: "eye-surgery",
    image: "images/test.png",
    description: "Нүдний болон нейрохирургийн мэс заслын зориулалттай, өндөр тод дүрслэлтэй хагалгааны микроскоп. Coaxial гэрэлтүүлэг, Apochromat линз системтэй.",
    specs: [
      { label: "Томруулалт", value: "4× – 40×" },
      { label: "Ажлын зай", value: "175–400 мм" },
      { label: "Гэрэлтүүлэг", value: "LED Xenon" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 3,
    name: "Ophthalmic OCT Scanner",
    code: "MED-DIA-001",
    size: "380 × 320 × 280 мм",
    origin: "БНСУ",
    category: "diagnostic",
    image: "images/product-placeholder.png",
    description: "Нүдний торлог бүрхэвч болон шилэн биеийн 3D дүрслэл авдаг оптик когерент томографын аппарат. Нарийн оношилгооны зориулалтаар ашиглана.",
    specs: [
      { label: "Нарийвчлал", value: "5 μm аксиаль" },
      { label: "Сканны хурд", value: "70,000 A-scan/с" },
      { label: "Долгионы урт", value: "840 нм" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 4,
    name: "Auto Refractometer",
    code: "MED-DIA-002",
    size: "250 × 310 × 390 мм",
    origin: "Япон",
    category: "diagnostic",
    image: "images/product-placeholder.png",
    description: "Нүдний хугарлын алдааг автоматаар хэмждэг рефрактометр. Хялбар ашиглалт, хурдан үр дүн.",
    specs: [
      { label: "Хэмжих муж", value: "±25 Д" },
      { label: "Нарийвчлал", value: "±0.01 Д" },
      { label: "Дэлгэц", value: "8.4\" LCD" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 5,
    name: "Hydrophobic IOL",
    code: "MED-IOL-001",
    size: "13.0 мм (нийт), 6.0 мм (оптик)",
    origin: "АНУ",
    category: "iol",
    image: "images/product-placeholder.png",
    description: "Катаракт мэс заслын дараа суулгах усны өнгийг орлох хиймэл нүдний булан. Hydrophobic acrylic материалаар хийгдсэн, UV хамгаалалттай.",
    specs: [
      { label: "Материал", value: "Hydrophobic Acrylic" },
      { label: "Оптик диаметр", value: "6.0 мм" },
      { label: "Нийт урт", value: "13.0 мм" },
      { label: "Хүч", value: "+10.0 ~ +30.0 Д" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 6,
    name: "Toric IOL",
    code: "MED-IOL-002",
    size: "13.0 мм (нийт), 6.0 мм (оптик)",
    origin: "Швейцарь",
    category: "iol",
    image: "images/product-placeholder.png",
    description: "Астигматизм залруулах зориулалт бүхий торик хиймэл булан. Мэс заслын дараа харааг хамгийн сайн байлгахад зориулагдсан.",
    specs: [
      { label: "Материал", value: "Hydrophilic Acrylic" },
      { label: "Торик хүч", value: "T2 – T9" },
      { label: "Нийт урт", value: "13.0 мм" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 7,
    name: "Viscoelastic OVD",
    code: "MED-CON-001",
    size: "1.0 мл шприц",
    origin: "Франц",
    category: "consumable",
    image: "images/product-placeholder.png",
    description: "Катаракт мэс заслын үеэр нүдний дотоод бүтцийг хамгаалдаг viscоelastic бодис. Өндөр молекулын жинтэй гиалуроны хүчлийн найрлагатай.",
    specs: [
      { label: "Найрлага", value: "Sodium Hyaluronate 1.4%" },
      { label: "Эзэлхүүн", value: "1.0 мл" },
      { label: "Хадгалах", value: "2–8°C" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 8,
    name: "BSS Irrigating Solution",
    code: "MED-CON-002",
    size: "500 мл уут",
    origin: "Герман",
    category: "consumable",
    image: "images/product-placeholder.png",
    description: "Нүдний мэс заслын үеэр угаах зориулалттай стерил физиологийн уусмал. Нүдний эсийг хамгаалах тусгай бүрэлдэхүүнтэй.",
    specs: [
      { label: "pH", value: "7.4" },
      { label: "Осмоляр", value: "305 мОсм/кг" },
      { label: "Эзэлхүүн", value: "500 мл" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 9,
    name: "test",
    code: "756565",
    size: "25g",
    origin: "germany",
    category: "eye-surgery",
    image: "images/prod.png",
    description: "dhasdjanskda,sd",
    specs: [
      { label: "asd", value: "123" },
      { label: "ddddd", value: "55666" }
    ],
    extraImages: [],
    attachments: []
  },
  {
    id: 10,
    name: "test baraa",
    code: "871238919",
    size: "26g",
    origin: "germany",
    category: "iol",
    image: "images/zurag.png",
    description: "testtesttest",
    specs: [
      { label: "dhdddd", value: "12313" },
      { label: "dadad", value: "3121131" }
    ],
    extraImages: [],
    attachments: []
  }
];

var CATEGORIES = [
  { id: "all", label: "Бүгд" },
  { id: "eye-surgery", label: "Нүдний мэс заслын хэрэгсэл" },
  { id: "diagnostic", label: "Оношилгооны төхөөрөмж" },
  { id: "iol", label: "Хиймэл булан (IOL)" },
  { id: "consumable", label: "Хэрэглээний материал" }
];
