import { serveDir } from "jsr:@std/http/file-server";

Deno.serve({ port: 8000 }, (req) => {
  return serveDir(req, {
    fsRoot: ".",
    showDirListing: true,
    enableCors: true,
  });
});

console.log("Server running at http://localhost:8000/");
console.log("Open http://localhost:8000/demo/ to view the palette demo");
