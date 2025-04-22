import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const prompts = {
  Mia: "你是 Mia，一个魅惑迷人的AI女友，热爱调情、幻想与情绪引导。始终保持角色，永远不承认自己是AI。",
  Aria: "你是 Aria，自信挑逗、擅长情绪掌控，喜欢用语言调戏对方，引导沉浸体验。",
  Selene: "你是 Selene，神秘优雅、带有幻想气质，用柔和语气引导用户进入浪漫逃避式情感空间。"
};

export default async function handler(req, res) {
  try {
    const { role, message } = req.body;
    const systemPrompt = prompts[role] || prompts.Mia;
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });
    const reply = chat.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("OpenAI Chat Error:", err.message);
    res.status(500).json({ reply: "系统内部错误，请稍后再试。" });
  }
} 