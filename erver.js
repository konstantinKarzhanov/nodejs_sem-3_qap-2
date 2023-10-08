const { createServer } = require("node:http");

const { openFile } = require("./FsUtils");
const ee = require("./EventEmitter");

const PORT = 3000;
const HOST = "localhost";
const VIEWS_DIR = "views";
const NOT_FOUND_VIEW = "404.html";

const viewMap = new Map([
  ["/", "index.html"],
  ["/home", "index.html"],
  ["/about", "about.html"],
  ["/contact", "contact.html"],
  ["/products", "products.html"],
  ["/subscribe", "subscribe.html"],
]);

const redirectMap = new Map([["/about-us", "/about"]]);

const server = createServer(async (req, res) => {
  const path = req.url;

  const view = viewMap.get(path) || redirectMap.get(path) || NOT_FOUND_VIEW;
  res.statusCode = viewMap.has(path) ? 200 : redirectMap.has(path) ? 301 : 404;

  if (res.statusCode == 301) {
    res.writeHead(res.statusCode, { Location: redirectMap.get(path) });
    res.end();
  } else {
    res.writeHead(res.statusCode, { "Content-Type": "text/html" });
    res.end(await openFile(VIEWS_DIR, view));
  }

  ee.logInConsole(req.method, req.url, res.statusCode, res.statusMessage);
});

server.listen(PORT, HOST, console.log(`Server is listening on port: ${PORT}`));
