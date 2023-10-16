const { createServer } = require("node:http");
const { extname } = require("node:path");

const chalk = require("chalk");

const { fetchFile } = require("./fs-utils");
const logEE = require("./emitter");

const PORT = 3000;
const HOST = "localhost";

const VIEWS_DIR = "views";
const CSS_DIR = "css";
const NOT_FOUND_VIEW = "404.html";

const viewMap = new Map([
  ["/", "index.html"],
  ["/home", "index.html"],
  ["/about", "about.html"],
  ["/contact", "contact.html"],
  ["/products", "products.html"],
  ["/subscribe", "subscribe.html"],
]);

const redirectMap = new Map([
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/our-products", "/products"],
]);

const server = createServer(async (req, res) => {
  const path = req.url;

  logEE.logFile(
    "clientRequest",
    "success",
    `method: "${req.method}", url: "${req.url}"`
  );

  if (extname(path) == ".css") {
    const data = await fetchFile(CSS_DIR, path);
    res.statusCode = data ? 200 : 404;

    res.writeHead(res.statusCode, { "Content-Type": "text/css" });
    res.end(data && data);
  } else {
    const view = viewMap.get(path) || redirectMap.get(path) || NOT_FOUND_VIEW;
    res.statusCode = viewMap.has(path)
      ? 200
      : redirectMap.has(path)
      ? 301
      : 404;

    if (res.statusCode == 301) {
      res.writeHead(res.statusCode, { Location: redirectMap.get(path) });
      res.end();
    } else {
      let data = await fetchFile(VIEWS_DIR, view);

      if (!data) {
        res.statusCode = 500;
        data = `
      <h1>Unexpected Error</h1>
      <p>Error code: ${res.statusCode}</p>
      <p>An error has occured and we're working to fix the problem! Will be up and running shortly</p>
      `;
      }

      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  }

  console.log(
    `${chalk.dim("Client request:")} [method: ${chalk.cyan(
      req.method
    )}, requested url: ${chalk.green(req.url)}]`
  );

  console.log(
    `${chalk.dim("Server response:")} [status code: ${chalk.magenta(
      res.statusCode
    )}, status message: ${chalk.yellow(res.statusMessage)}]`
  );
  console.log("-".repeat(80));

  logEE.logFile(
    "serverResponse",
    res.statusCode >= 500
      ? "error"
      : res.statusCode == 404
      ? "warning"
      : res.statusCode == 301
      ? "redirect"
      : "success",
    `${res.statusCode} "${res.statusMessage}"`
  );
});

server.listen(PORT, HOST, () => {
  const message = "Server is listening on port";

  console.log(`${chalk.yellow(message)}, ${chalk.green(PORT)}\n`);
  logEE.logFile("startServer", "sysInfo", `${message} ${PORT}`);
});
