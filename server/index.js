const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/validate", async (req, res) => {
  const { characterName, x, y } = req.body;

  try {
    const character = await prisma.character.findUnique({
      where: { name: characterName },
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
