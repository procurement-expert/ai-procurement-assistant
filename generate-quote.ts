
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { description } = req.body;

  const prompt = `Generate a formal price quotation for the following item:\n"${description}".\nInclude:\n- Item name and short spec\n- Quantity (assume 2 pcs if not provided)\n- Unit price (assume $1,250 if unknown)\n- Delivery terms (e.g., CFR Lagos Port)\n- Estimated lead time\n- Total cost\nFormat in professional quotation style.`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const quote = completion.data.choices[0].message?.content;
    res.status(200).json({ quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate quote' });
  }
}
