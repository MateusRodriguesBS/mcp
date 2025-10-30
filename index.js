import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://automacao.homologacao.tallos.com.br/webhook/consulta";

async function enviarAoN8n(action, dadosUsuario) {
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...dadosUsuario }),
    });
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return await res.json();
    return await res.text();
  } catch (err) {
    return { sucesso: false, erro: String(err) };
  }
}

// Todas as rotas MCP simuladas
const actions = [
  "listar_unidades",
  "listar_especialidades",
  "listar_medicos",
  "listar_datas",
  "listar_horarios",
  "agendar_consulta",
];

for (const action of actions) {
  app.post(`/${action}`, async (req, res) => {
    const result = await enviarAoN8n(action, req.body || {});
    res.json(result);
  });
}

// Endpoint padrão
app.get("/", (req, res) => {
  res.json({ status: "ok", mcp: true, message: "Servidor MCP simulado rodando" });
});

export default app;
