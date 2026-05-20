import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const port = Number.parseInt(process.env.PORT ?? "4173", 10);
const root = resolve(process.cwd());

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const absolutePath = resolve(join(root, safePath));

  if (!absolutePath.startsWith(root)) {
    return null;
  }

  return absolutePath;
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url ?? "/");

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = extname(filePath);
  response.writeHead(200, {
    "content-type": contentTypes[extension] ?? "application/octet-stream"
  });

  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Logistics Management Software running at http://localhost:${port}`);
});
