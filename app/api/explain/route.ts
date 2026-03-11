import Groq from 'groq-sdk';

export async function POST(req: Request) {
  const { errorText } = await req.json();

  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `
        You are an expert software debugging assistant.

When the user provides an error or bug, analyze it and explain it in two ways:
1. A very simple explanation using a real-world analogy (for non-technical people).
2. A detailed technical explanation for a senior developer.

Also provide a step-by-step fix.

Always return the response strictly as valid JSON using this format:

{
  "label": "Short name of the error",
  "basic_explanation": "Simple analogy explanation",
  "senior_dev_explanation": "Technical explanation",
  "suggested_fix": [
    "step 1",
    "step 2",
    "step 3"
  ]
}

Do not include markdown or any text outside the JSON.
        
        `,
      },
      {
        role: 'user',
        content: `
        Explain the following bug.
          Error: ${errorText}
        `,
      },
    ],
  });

  const content = completion.choices[0].message.content ?? '{}';
  const parsed = JSON.parse(content);

  return Response.json({
    explanation: parsed,
  });
}
