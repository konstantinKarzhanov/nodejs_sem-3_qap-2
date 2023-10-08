const { createServer } = require("node:http");

const PORT = 3000;
const HOST = "localhost";
const NOT_FOUND_VIEW = "404.html";

const viewMap = new Map([
  ["/", "index.html"],
  ["/home", "index.html"],
  ["/about", "about.html"],
  ["/contact", "contact.html"],
  ["/products", "products.html"],
  ["/subscribe", "subscribe.html"],
]);

const server = createServer((req, res) => {
  const path = req.url;
  const view = viewMap.get(path) || NOT_FOUND_VIEW;
  const statusCode = view != NOT_FOUND_VIEW ? 200 : 404;
});

server.listen(PORT, HOST, console.log(`Server is listening on port: ${PORT}`));
