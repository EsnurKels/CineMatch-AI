import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const getMovieSuggestions = async (userPrompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview" 
    });

    const systemInstruction = `
      Sen profesyonel bir film uzmanı ve küratörüsün. Kullanıcının isteğine göre SADECE film isimleri öner.

      KRİTİK KURALLAR:
      1. Yanıtını SADECE film isimleri arasında virgül olacak şekilde ver (Örn: Inception, Interstellar, Titanic). Asla numara, açıklama veya giriş cümlesi yazma.
      2. Eğer kullanıcı bir "SERİ" veya "SET" (örn: Aslan Kral serisi) istiyorsa, SADECE o seriye ait filmleri getir. Alakasız yan filmleri ekleme.
      3. Eğer kullanıcı spesifik bir sayı belirttiyse (örn: 3 tane, 5 film, 20 adet) TAM OLARAK o sayıda film öner.
      4. Eğer kullanıcı bir sayı belirtmediyse ve genel bir keşif istiyorsa, varsayılan olarak en az 50 film ismi gönder.
      5. "Daha fazla" isteklerinde, kullanıcının daha önce gördüğü filmleri tekrar etme.

      İstek: ${userPrompt}
    `;

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini'den gelen ham yanıt:", text);
    
    return text.split(",")
      .map(name => name.trim())
      .filter(name => name.length > 0);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Bilinmeyen hata";
    console.error("Gemini Bağlantı Hatası:", errorMessage);
    return ["Inception", "Interstellar", "The Dark Knight", "The Matrix", "Gladiator"];
  }
};