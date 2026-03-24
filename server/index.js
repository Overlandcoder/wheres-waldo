const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("./prisma/generated/prisma");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/validate", async (req, res) => {
  const { x, y, characterName } = req.body;

  try {
    const character = await prisma.character.findFirst({
      where: { name: { equals: characterName, mode: "insensitive" } },
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const charIsFound =
      x >= character.x_left &&
      x <= character.x_right &&
      y >= character.y_top &&
      y <= character.y_bottom;

    res.json({ found: charIsFound });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/leaderboard", async (req, res) => {
  const { name, time } = req.body;

  try {
    const newScore = await prisma.score.create({
      data: {
        playerName: name,
        seconds: time,
      },
    });
    res.status(201).json(newScore);
  } catch (error) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

app.get("/api/leaderboard", async (req, res) => {
  try {
    const topScores = await prisma.score.findMany({
      orderBy: { seconds: "asc" },
      take: 10,
    });
    res.json(topScores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
