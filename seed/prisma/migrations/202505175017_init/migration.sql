-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue_id" INTEGER NOT NULL,
    "team1_id" INTEGER NOT NULL,
    "team2_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3) DEFAULT now()
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3) DEFAULT now()
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3) DEFAULT now()
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "jerseyNumber" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3) DEFAULT now()
);

-- CreateTable
CREATE TABLE "AppearanceMatrix" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "jersey_number" INTEGER NOT NULL,
    "in_point" INTEGER NOT NULL,
    "out_point" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "max_size" FLOAT NOT NULL,
    "prominence_score" FLOAT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3) DEFAULT now()
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,  -- Duration in seconds
    "resolution" TEXT NOT NULL,   -- e.g., "1920x1080"
    "frameRate" FLOAT NOT NULL,  -- e.g., 30.0
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3) DEFAULT now()
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Game" ADD CONSTRAINT "Game_team1_id_fkey" FOREIGN KEY ("team1_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Game" ADD CONSTRAINT "Game_team2_id_fkey" FOREIGN KEY ("team2_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppearanceMatrix" ADD CONSTRAINT "AppearanceMatrix_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AppearanceMatrix" ADD CONSTRAINT "AppearanceMatrix_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Trigger for automatic update of updatedAt column
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to automatically update the updatedAt field on update
CREATE TRIGGER update_game_timestamp
BEFORE UPDATE ON "Game"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_team_timestamp
BEFORE UPDATE ON "Team"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_player_timestamp
BEFORE UPDATE ON "Player"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_venue_timestamp
BEFORE UPDATE ON "Venue"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_appearance_matrix_timestamp
BEFORE UPDATE ON "AppearanceMatrix"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_video_timestamp
BEFORE UPDATE ON "Video"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
