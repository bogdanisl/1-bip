import AsyncStorage from "@react-native-async-storage/async-storage";
import md5 from "md5";


const CACHE_PREFIX = "tr_";
const MAX_CHUNK_SIZE = 4000;

// 🔑 ключ кеша
const getCacheKey = (text: string, lang: string) => {
    return `${CACHE_PREFIX}${lang}_${md5(text)}`;
};

const chunkText = (text: string, size = MAX_CHUNK_SIZE): string[] => {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
};

// 🌐 запрос к Google Translate Free endpoint
const translateChunk = async (text: string, lang: string): Promise<string> => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pl&tl=${lang}&dt=t&q=${encodeURIComponent(
        text
    )}`;

    const res = await fetch(url);
    const data = await res.json();

    return data[0].map((x: any) => x[0]).join("");
};

// 🚀 анти-дубликаты (один и тот же текст в процессе перевода)
const inFlight: Record<string, Promise<string>> = {};

// 🧠 основная функция
export const translate = async (
    text: string,
    lang: string
): Promise<string> => {
    if (!text) return "";

    if (lang == "pl") return text;

    const key = getCacheKey(text, lang);

    // 1. проверка кеша
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
        // console.log('hasCache')
        return cached;
    }

    // 2. проверка, если запрос уже идёт
    if (inFlight[key] != null) {
        return await inFlight[key];
    }

    // 3. создаём задачу перевода
    const task = (async () => {
        try {
            // console.log('UseApi')
            const chunks = chunkText(text);
            const translatedChunks: string[] = [];

            for (const chunk of chunks) {
                const t = await translateChunk(chunk, lang);
                translatedChunks.push(t);
            }

            const result = translatedChunks.join("");

            // сохраняем в кеш
            await AsyncStorage.setItem(key, result);

            return result;
        } catch (e) {
            console.warn("Translation error:", e);
            return text; // fallback
        } finally {
            delete inFlight[key];
        }
    })();

    inFlight[key] = task;

    return await task;
};