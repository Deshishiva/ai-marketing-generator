import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Backend running with Ollama " });
});

app.post("/generate", async (req, res) => {
  try {
    const { product, audience, tone } = req.body;

    if (!product || !audience || !tone) {
      return res.status(400).json({
        reply: "Please fill all fields."
      });
    }

    const prompt = `
You are a professional marketing strategist.

Generate marketing content in EXACT format:

---INSTAGRAM CAPTION---
(1 engaging caption, max 3 sentences)

---HASHTAGS---
(5 trending hashtags only)

---TAGLINE---
(Short premium tagline under 10 words)

Product: ${product}
Target Audience: ${audience}
Tone: ${tone}

Do not add explanations.
`;

    console.log("Generating content with Ollama...");

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "phi3:mini", 
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.8,
          num_predict: 150
        }
      })
    });

    const data = await response.json();

    if (!data.response) {
      console.log("Empty response:", data);
      return res.status(500).json({
        reply: "Model returned empty response."
      });
    }

    console.log("Success ✅");

    res.json({
      reply: data.response.trim()
    });

  } catch (error) {
    console.error("OLLAMA ERROR:", error);
    res.status(500).json({
      reply: "AI server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://127.0.0.1:${PORT}`);
});
