const express = require("express"),
  app = express(),
  cors = require("cors"),
  compression = require("compression"),
  morgan = require("morgan"),
  fs = require("fs");

function toBase64(filename) {
  const file = fs.readFileSync(filename);
  return new Buffer.from(file).toString("base64");
}
const data = require("./mock.data.json");
const port = 3000;

app.use(compression());
app.use(cors());
app.use(require("morgan")("dev"));

app.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id) || null;
  if (id) {
    const _data = data[id];
    res.status(200).send({ url: _data.url, icon: toBase64(_data.icon) });
  }
  next(new Error("wrong endpoint"));
  res.status(400).send({ message: "wrong endpoint" });
});

app.get("/", (req, res, next) => {
  const _data = data.map((el) => ({
    url: el.url,
    icon: toBase64(el.icon),
  }));
  res.status(200).send(_data);
});

app.listen(port, function () {
  console.info(`Ready to rock on http://localhost:${port} 🤟`);
});
