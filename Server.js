const { createServer } = require("node:http");

const chalk = require("chalk");

const { fetchFile } = require("./utils");
const logEE = require("./emitter");

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
    let data = await fetchFile(VIEWS_DIR, view);

    if (!data) {
      res.statusCode = 500;
      data = `
      <h1>Unexpected Error</h1>
      <p>Error code: 500</p>
      <p>An error has occured and we're working to fix the problem! Will be up and running shortly</p>
      `;
    }

    res.writeHead(res.statusCode, { "Content-Type": "text/html" });
    res.end(data);
  }

  console.log(
    `method: ${chalk.cyan(req.method)}, requested url: ${chalk.green(
      req.url
    )}, status code: ${chalk.magenta(
      res.statusCode
    )}, status message: ${chalk.yellow(res.statusMessage)}`
  );

  logEE.logFile(
    "establishedConnection",
    res.statusCode >= 500
      ? "error"
      : res.statusCode == 404
      ? "warning"
      : res.statusCode == 301
      ? "redirect"
      : "success",
    `${req.method}: ${req.url}, ${res.statusCode} (${res.statusMessage})`
  );
});

server.listen(PORT, HOST, () => {
  const message = "Server is listening on port";

  console.log(`${chalk.yellow(message)}, ${chalk.green(PORT)}\n`);
  logEE.logFile("startServer", "sysInfo", `${message} ${PORT}`);
});
