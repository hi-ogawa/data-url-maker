import "mocha";
import * as assert from "assert/strict";
import * as supertest from "supertest";
import { app } from "./app";

describe("app", () => {
  describe("GET /url", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/api/url/not-a-url");
      assert.equal(res.status, 400);
      assert.equal(res.body.message, "Invalid url");
    });

    it("case2", async () => {
      // TODO: Mock url fetching
      const url =
        "https://fonts.gstatic.com/s/i/materialicons/language/v11/24px.svg";
      const res = await supertest(app).get(`/api/url/${url}`);
      assert.equal(res.status, 200);
      assert.ok(res.text.startsWith("data:image/svg+xml;base64,"));
    });
  });

  describe("POST /upload", () => {
    it("case1", async () => {
      // curl https://upload.wikimedia.org/wikipedia/commons/c/cc/Color_icon_black_new2.png | base64 -w 0
      const base64 =
        "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAAXNSR0IArs4c6QAAAzNJREFUeNrt1jEKwkAQhlFXrKw0CwlomSLkAtvE1tqzps4NPIm1rZDNLcIg7x3hH/iYVJ6veiCM9zIbIZDpUYwQyNEEgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIF/K90u16qGeK4D6MRAmnXjxF8WACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBbCHU//7WiHSQZpshEDOuTOCDwtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAD2sAGYgg0TOYUFmQAAAABJRU5ErkJggg==";
      const buffer = Buffer.from(base64, "base64");
      const res = await supertest(app)
        .post("/api/upload")
        .attach("file", buffer, {
          filename: "dummy",
          contentType: "image/png",
        });
      assert.equal(res.status, 200);
      assert.equal(res.text, `data:image/png;base64,${base64}`);
    });
  });
});
