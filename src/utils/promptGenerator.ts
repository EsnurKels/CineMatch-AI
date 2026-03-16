import { 
  PuzzlePieceIcon, 
  GlobeAltIcon, 
  BoltIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const genres = ["bilim kurgu", "korku", "romantik komedi", "aksiyon", "belgesel", "animasyon", "gerilim"];
const moods = ["iç ısıtan", "kafa karıştıran", "adrenalin dolu", "melankolik", "eğlenceli", "sürükleyici"];
const settings = ["uzayda geçen", "90'larda geçen", "tek mekanda geçen", "gelecekte geçen", "sualtında geçen"];
const counts = ["3 tane", "5 tane", "10 tane"];

export const generateRandomPrompts = () => {
  const getRand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  return [
    { title: "RASTGELE", text: `${getRand(counts)} ${getRand(moods)} ${getRand(genres)} filmi`, icon: PuzzlePieceIcon },
    { title: "ATMOSFER", text: `${getRand(settings)} ${getRand(genres)} önerisi`, icon: GlobeAltIcon },
    { title: "HIZLI SEÇİM", text: `Sonu şaşırtan en iyi ${getRand(counts)} film`, icon: BoltIcon },
    { title: "KEŞİF", text: `Bilinmeyen ama ${getRand(moods)} yapımlar`, icon: MagnifyingGlassIcon }
  ];
};