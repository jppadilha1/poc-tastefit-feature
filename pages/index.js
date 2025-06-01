import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Form() {
  const [resposta, setResposta] = useState("");

  useEffect(() => {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const msg = form.prompt.value;
      form.prompt.value = "";

      try {
        const response = await fetch("/api/getrecipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: msg }),
        });

        const data = await response.text();
        setResposta(data);
      } catch (err) {
        console.error("Erro ao fazer a requisição:", err);
      }
    });
  }, []);

  return (
    <>
      <style>{`
        body {
          background-color: rgb(225, 222, 222);
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }

        .form-container {
          color: #000;
          padding: 20px;
          background-color: rgb(225, 222, 222);
          width: 500px;
          height: auto;
          margin: 50px auto;
          border-radius: 8px;
        }

        .form-container input {
          width: 92%;
          padding: 14px;
          margin-bottom: 10px;
          margin-top: 6px;
          border-radius: 8px;
          background-color: #efefef;
        }

        .form-container button {
          width: 100%;
          padding: 14px;
          background-color: #707070;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .form-container button:hover {
          background-color: #58bc82;
        }

        .form-container h1 {
          text-align: center;
          color: #58bc82;
        }

        .resposta-box {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid black;
          border-radius: 8px;
          background-color: white;
  
        }
      `}</style>

      <div className="form-container">
        <h1>Dia do Lixo 🗑</h1>
        <form id="registerForm">
          <label>
            Digite o que você deseja e a quantidade (calorias, proteínas, etc):
          </label>
          <input type="text" name="prompt" required />
          <button type="submit">Enviar</button>
        </form>

        {resposta && (
          <p className="resposta-box">
            <ReactMarkdown>{resposta}</ReactMarkdown>
          </p>
        )}
      </div>
    </>
  );
}
