import { Server } from "@modelcontextprotocol/server";
import fetch from "node-fetch";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://automacao.homologacao.tallos.com.br/webhook/consulta";

const server = new Server({
  name: "agendamento-mcp",
  description: "Servidor MCP para agendamento de consultas via n8n",
  version: "1.0.0"
});

async function enviarAoN8n(action, dadosUsuario) {
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...dadosUsuario })
    });
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return await res.json();
    return await res.text();
  } catch (err) {
    return { sucesso: false, erro: String(err) };
  }
}

// Tools MCP
server.tool("listar_unidades", {
  inputSchema: { type: "object", additionalProperties: true },
  async handler(dadosUsuario) { return enviarAoN8n("listar_unidades", dadosUsuario); }
});

server.tool("listar_especialidades", {
  inputSchema: { type: "object", additionalProperties: true },
  async handler(dadosUsuario) { return enviarAoN8n("listar_especialidades", dadosUsuario); }
});

server.tool("listar_medicos", {
  inputSchema: { type: "object", additionalProperties: true },
  async handler(dadosUsuario) { return enviarAoN8n("listar_medicos", dadosUsuario); }
});

server.tool("listar_datas", {
  inputSchema: { type: "object", additionalProperties: true },
  async handler(dadosUsuario) { return enviarAoN8n("listar_datas", dadosUsuario); }
});

server.tool("listar_horarios", {
  inputSchema: { type: "object", additionalProperties: true },
  async handler(dadosUsuario) { return enviarAoN8n("listar_horarios", dadosUsuario); }
});

server.tool("agendar_consulta", {
  inputSchema: { type: "object", additionalProperties: true },
  async handler(dadosUsuario) { return enviarAoN8n("agendar_consulta", dadosUsuario); }
});

export default async function handler(req, res) {
  try { await server.handleRequest(req, res); }
  catch (err) { res.status(500).json({ error: "Erro interno", detalhe: String(err) }); }
}
