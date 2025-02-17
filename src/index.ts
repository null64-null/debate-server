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
    const { motion, limit, args } = await c.req.json();

    if (!id || !motion || !args || !limit) {
      return c.json({ error: "必要なパラメタが揃っていません" }, 400);
    }

    const tool = debateTools.find((debateTool) => debateTool.id === id)!;
    const { getPrompt } = tool;

    const prompt = getPrompt(motion, args, limit);
    const arg = await fetchOpenAI(prompt);

    return c.json(arg);
  } catch (e) {
    return c.json({ error: `${e}` }, 500);
  }
});

export default app;
