# agendamento-mcp

Servidor MCP compatível com ChatGPT para agendamento de consultas via n8n.

## Ferramentas disponíveis
- listar_unidades
- listar_especialidades
- listar_medicos
- listar_datas
- listar_horarios
- agendar_consulta

## Variável de ambiente
- N8N_WEBHOOK_URL=https://automacao.homologacao.tallos.com.br/webhook/consulta

## Deploy na Vercel
1. Suba o projeto no Vercel.
2. Configure a variável de ambiente `N8N_WEBHOOK_URL`.
3. Faça deploy.

## Uso
Adicione a URL do `manifest.json` no ChatGPT:
`https://agendamento-mcp.vercel.app/manifest.json`

Todas as ferramentas enviarão automaticamente os dados do cliente para o n8n em cada etapa.
