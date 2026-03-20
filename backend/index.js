import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing DASHSCOPE_API_KEY in .env" });
    }

    const model = process.env.MODEL || "qwen-plus";

    const upstream = await fetch(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
        }),
      }
    );

    // 上游错误直接透传（401/400 一眼看出来）
    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      return res.status(upstream.status).send(text);
    }

    if (!upstream.body) {
      return res.status(500).json({ error: "Upstream has no body" });
    }

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));