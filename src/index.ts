import { Hono } from "hono";
import { cors } from "hono/cors";
import { debateTools } from "@/values/propmts";
import { stream } from "hono/streaming";
import { Bindings } from "@/types/bindings";
import Groq from "groq-sdk";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.WEB_SERVER_ORIGIN,
  });
  return corsMiddlewareHandler(c, next);
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

    const groq = new Groq({ apiKey: c.env.GROQ_API_KEY });
    const model = "llama-3.3-70b-versatile";

    const streamArg = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: model,
      stream: true,
    });

    return stream(c, async (stream) => {
      for await (const chunk of streamArg) {
        const content = chunk.choices[0]?.delta?.content || "";
        await stream.write(content);
      }
      stream.close();
    });
  } catch (e) {
    return c.json({ error: `${e}` }, 500);
  }
});

export default app;
