const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.character.createMany({
    data: [
      { name: 'Waldo', x_left: 60.5, x_right: 63.5, y_top: 36.0, y_bottom: 41.5 },
      { name: 'Odlaw', x_left: 76.0, x_right: 78.5, y_top: 39.5, y_bottom: 42.5 },
    ],
  });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());