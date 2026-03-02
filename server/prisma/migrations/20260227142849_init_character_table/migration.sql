-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "x_left" DOUBLE PRECISION NOT NULL,
    "x_right" DOUBLE PRECISION NOT NULL,
    "y_top" DOUBLE PRECISION NOT NULL,
    "y_bottom" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
