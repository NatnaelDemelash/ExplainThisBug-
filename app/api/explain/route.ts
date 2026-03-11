import Groq from "groq-sdk";

export async function POST(req: Request) {
  const { errorText } = await req.json();

  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: ``,
      },
      {
        role: "user",
        content: ``,
      },
    ],
  });
}
