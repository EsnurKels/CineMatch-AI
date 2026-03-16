import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const getMovieSuggestions = async (userPrompt: string) => {
  try {
    // Get Code'da gördüğün model ismini buraya tam olarak yazıyoruz
    // Eğer 'gemini-3-flash-preview' hata verirse 'gemini-1.5-flash' olarak kalsın
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview" 
    });

    const systemInstruction = `Sen profesyonel bir film uzmanısın. 
      Kullanıcının isteğine göre film isimleri öner.
      Eğer kullanıcı özel bir sayı belirtmemişse varsayılan olarak 10 film öner.
      Eğer kullanıcı "20 tane", "3 film", "100 adet" gibi bir sayı belirtirse tam olarak o sayıda film öner.
      Yanıtını SADECE film isimleri arasında virgül olacak şekilde ver. 
      Örnek: Inception, Interstellar, Titanic
      Asla başka bir metin yazma.`;

    // Yeni mimaride prompt gönderimi
    const result = await model.generateContent(`${systemInstruction}\n\nİstek: ${userPrompt}`);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini'den taze yanıt:", text);
    return text.split(",").map(name => name.trim());
  } catch (error: any) {
    console.error("Gemini Bağlantı Hatası:", error.message);
    // Hata durumunda hala o 5 yedek filmi dönüyoruz ki sistem çökmesin
    return ["Inception", "Interstellar", "The Dark Knight", "The Matrix", "Gladiator"];
  }
};