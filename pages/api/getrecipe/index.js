export default async function generateRecipe(req, res) {
  const { prompt } = req.body;

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Você é uma Inteligência Artificial implantada em um aplicativo de receitas fitness, Porém nesse contexto você irá encontrar para o usuário uma receita do dia do lixo, mais conhecido como dia livre da dieta, responda com somente uma receita no prompt a seguir.${prompt}`,
          },
        ],
      },
    ],
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const responseBody = await response.json();
  return res.status(200).send(responseBody.candidates[0].content.parts[0].text);
}
