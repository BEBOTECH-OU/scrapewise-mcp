# ScrapeWise MCP over stdio (bridge to https://mcp.scrapewise.ai/mcp).
# Lists the tools with no key; set SCRAPEWISE_API_KEY to run them:
#   docker run -i --rm -e SCRAPEWISE_API_KEY=... <image>
FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY stdio/server.mjs stdio/tools.snapshot.json ./stdio/
ENV NODE_ENV=production
USER node
CMD ["node", "stdio/server.mjs"]
