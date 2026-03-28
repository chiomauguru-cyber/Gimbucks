import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Gimkit Live Tool Backend Active" });
  });

  // Fetch game info using a Game Code
  app.get("/api/gimkit/game/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const response = await fetch(`https://www.gimkit.com/api/games/join?gameCode=${code}`);
      
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch game info" });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Fetch kit details (questions/answers) using a Kit ID
  app.get("/api/gimkit/kit/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await fetch(`https://www.gimkit.com/api/gimkits/view/${id}`);
      
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch kit info" });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Simulated "Hack" API
  app.post("/api/inject", express.json(), (req, res) => {
    const { amount } = req.body;
    console.log(`[BACKEND] Injection request received: ${amount} Gimbucks`);
    // In a real hack, this would do something. Here we just simulate success.
    res.json({ 
      success: true, 
      message: "Payload delivered to simulated memory address",
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
