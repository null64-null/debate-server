import { Hono } from "hono";
import { fetchOpenAI } from "@/lib/fetchOpenAI";
import { debateTools } from "@/values/propmts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/debate/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { motion, limit, history } = await c.req.json();

    if (!id || !motion || !history || !limit) {
      return c.json({ error: "必要なパラメタが揃っていません" }, 400);
    }

    const tool = debateTools.find((debateTool) => debateTool.id === id)!;
    const { action, getPrompt } = tool;

    const prompt = getPrompt(motion, history, limit);
    const arg = await fetchOpenAI(prompt);
    if (!arg) {
      return c.json({ error: `${action}の取得に失敗しました` }, 500);
    }

    return c.json({ arg });
  } catch (e) {
    return c.json({ error: `${e}` }, 500);
  }
});

export default app;
