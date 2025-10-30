server.tool("listar_unidades", {
  description: "Lista unidades de atendimento",
  async handler() {
    return enviarAoN8n({ action: "listar_unidades" });
  }
});

server.tool("listar_especialidades", {
  inputSchema: { type: "object", properties: { unidade_id: { type: "string" } }, required: ["unidade_id"] },
  async handler({ unidade_id }) {
    return enviarAoN8n({ action: "listar_especialidades", unidade_id });
  }
});

server.tool("listar_medicos", {
  inputSchema: { 
    type: "object", 
    properties: { unidade_id: { type: "string" }, especialidade_id: { type: "string" } }, 
    required: ["unidade_id", "especialidade_id"] 
  },
  async handler({ unidade_id, especialidade_id }) {
    return enviarAoN8n({ action: "listar_medicos", unidade_id, especialidade_id });
  }
});
