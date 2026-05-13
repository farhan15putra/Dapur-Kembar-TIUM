import { ChefHat, Sparkles, Package2, Utensils, Droplet, Coffee } from 'lucide-react';
import risolMayoImg from '../assets/Risol Mayo.png';
import lemperAyamImg from '../assets/Lemper Ayam.png';
import talamUbiImg from '../assets/Talam Ubi.png';
import airMineral210Img from '../assets/AirMineral 210ml.png';
import airMineral600Img from '../assets/AirMineral600ml.png';
import boluSurabayaImg from '../assets/Bolu Surabaya.png';
import dessertBoxOreoImg from '../assets/Desert Box Oreo.png';
import dessertBoxTiramisuImg from '../assets/Desert Box Tiramisu.png';
import dessertBoxTripleChocolateImg from '../assets/Desert Box Triple Chocolate.png';
import dessertBoxCappucinoChocoImg from '../assets/Dessert Box Cappucino Choco.png';
import dessertBoxCreamCheeseImg from '../assets/Dessert Box Cream Cheese.png';
import dessertBoxDurianMontongImg from '../assets/Dessert Box Durian Montong.png';
import dessertBoxRedVelvetImg from '../assets/Dessert Box RedVelvet.png';
import lapisLegitImg from '../assets/Lapis Legit.png';
import pastelSayurImg from '../assets/Pastel Sayur.png';
import putuMayangImg from '../assets/Putu Mayang.png';
import risolChickenMushroomImg from '../assets/Risol Chicken Mushroom.png';
import dimsumMentaiImg from '../assets/dimusmMentai.png';
import sosisSoloImg from '../assets/Sosis Solo.png';

export const CATEGORIES = [
  {
    id: 'kue-asin',
    name: 'Kue Asin',
    Icon: ChefHat,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-500',
    text: 'text-orange-700',
  },
  {
    id: 'kue-manis',
    name: 'Kue Manis',
    Icon: Sparkles,
    color: 'from-rose-500 to-pink-400',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    badge: 'bg-rose-500',
    text: 'text-rose-700',
  },
  {
    id: 'minuman',
    name: 'Minuman',
    Icon: Coffee,
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    badge: 'bg-cyan-500',
    text: 'text-cyan-700',
  },
];

export const MENU_ITEMS = [
  // Kue Asin
  {
    id: 1,
    name: 'Risol Mayo',
    category: 'kue-asin',
    price: 3500,
    unit: '/ pcs',
    description: 'Risol gurih dengan isian telur, sosis, dan mayones melimpah.',
    tag: 'Best Seller',
    image: risolMayoImg,
  },
  {
    id: 2,
    name: 'Lemper Ayam',
    category: 'kue-asin',
    price: 3000,
    unit: '/ pcs',
    description: 'Ketan pulen dengan isian ayam suwir bumbu rempah konvensional.',
    tag: 'Favorit',
    image: lemperAyamImg,
  },
  {
    id: 3,
    name: 'Pastel Sayur',
    category: 'kue-asin',
    price: 3000,
    unit: '/ pcs',
    description: 'Kulit pastel renyah dengan isian sayuran segar dan telur.',
    tag: null,
    image: pastelSayurImg,
  },
  {
    id: 4,
    name: 'Sosis Solo',
    category: 'kue-asin',
    price: 3500,
    unit: '/ pcs',
    description: 'Dadar telur lembut berisi ayam cincang berbumbu gurih.',
    tag: null,
    image: sosisSoloImg,
  },
  {
    id: 10,
    name: 'Risol Chicken Mushroom',
    category: 'kue-asin',
    price: 4000,
    unit: '/ pcs',
    description: 'Risol renyah dengan isian ayam dan jamur creamy yang gurih.',
    tag: 'Baru',
    image: risolChickenMushroomImg,
  },
  {
    id: 11,
    name: 'Dimsum Mentai',
    category: 'kue-asin',
    price: 15000,
    unit: '/ porsi',
    description: 'Dimsum ayam udang dengan saus mentai bakar di atasnya.',
    tag: 'Premium',
    image: dimsumMentaiImg,
  },

  // Kue Manis
  {
    id: 9,
    name: 'Talam Ubi',
    category: 'kue-manis',
    price: 3000,
    unit: '/ pcs',
    description: 'Kue tradisional dengan lapisan ubi manis dan santan gurih di atasnya.',
    tag: 'Baru',
    image: talamUbiImg,
  },
  {
    id: 12,
    name: 'Bolu Surabaya',
    category: 'kue-manis',
    price: 5000,
    unit: '/ slice',
    description: 'Bolu lapis surabaya klasik yang lembut dan wangi.',
    tag: 'Premium',
    image: boluSurabayaImg,
  },
  {
    id: 13,
    name: 'Dessert Box Oreo',
    category: 'kue-manis',
    price: 25000,
    unit: '/ box',
    description: 'Dessert box dengan lapisan kue cokelat, cream, dan remahan biskuit Oreo.',
    tag: 'Favorit',
    image: dessertBoxOreoImg,
  },
  {
    id: 14,
    name: 'Dessert Box Tiramisu',
    category: 'kue-manis',
    price: 25000,
    unit: '/ box',
    description: 'Dessert box rasa kopi klasik ala Italia yang lumer di mulut.',
    tag: null,
    image: dessertBoxTiramisuImg,
  },
  {
    id: 15,
    name: 'Dessert Box Triple Chocolate',
    category: 'kue-manis',
    price: 25000,
    unit: '/ box',
    description: 'Tiga lapisan cokelat berbeda dalam satu box yang memanjakan lidah.',
    tag: 'Best Seller',
    image: dessertBoxTripleChocolateImg,
  },
  {
    id: 16,
    name: 'Dessert Box Cappucino Choco',
    category: 'kue-manis',
    price: 25000,
    unit: '/ box',
    description: 'Perpaduan sempurna rasa kopi cappucino dan cokelat premium.',
    tag: null,
    image: dessertBoxCappucinoChocoImg,
  },
  {
    id: 17,
    name: 'Dessert Box Cream Cheese',
    category: 'kue-manis',
    price: 25000,
    unit: '/ box',
    description: 'Lapisan keju lembut dipadukan dengan bolu yang manis dan pas.',
    tag: null,
    image: dessertBoxCreamCheeseImg,
  },
  {
    id: 18,
    name: 'Dessert Box Durian Montong',
    category: 'kue-manis',
    price: 35000,
    unit: '/ box',
    description: 'Dessert box premium dengan daging durian montong asli.',
    tag: 'Premium',
    image: dessertBoxDurianMontongImg,
  },
  {
    id: 19,
    name: 'Dessert Box Red Velvet',
    category: 'kue-manis',
    price: 25000,
    unit: '/ box',
    description: 'Kue red velvet dengan cream cheese frosting yang legit.',
    tag: null,
    image: dessertBoxRedVelvetImg,
  },
  {
    id: 20,
    name: 'Lapis Legit',
    category: 'kue-manis',
    price: 6000,
    unit: '/ slice',
    description: 'Kue lapis legit harum butter dengan resep tradisional.',
    tag: 'Favorit',
    image: lapisLegitImg,
  },
  {
    id: 21,
    name: 'Putu Mayang',
    category: 'kue-manis',
    price: 4000,
    unit: '/ porsi',
    description: 'Kue basah tradisional dengan kuah kinca manis gurih.',
    tag: null,
    image: putuMayangImg,
  },

  // Minuman
  {
    id: 301,
    name: 'Air Mineral 210ml',
    category: 'minuman',
    price: 1500,
    unit: '/ cup',
    description: 'Air mineral kemasan gelas ukuran 210ml.',
    tag: null,
    image: airMineral210Img,
  },
  {
    id: 302,
    name: 'Air Mineral 600ml',
    category: 'minuman',
    price: 3500,
    unit: '/ botol',
    description: 'Air mineral kemasan botol ukuran tanggung 600ml.',
    tag: 'Pilihan',
    image: airMineral600Img,
  },
];
