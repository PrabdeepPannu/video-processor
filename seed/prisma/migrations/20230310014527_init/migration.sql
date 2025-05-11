-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue_id" INTEGER NOT NULL,
    "team1_id" INTEGER NOT NULL,
    "team2_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT now(),
    "updated_at" TIMESTAMP(3) DEFAULT now(),
    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT now(),
    "updated_at" TIMESTAMP(3) DEFAULT now(),
    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT now(),
    "updated_at" TIMESTAMP(3) DEFAULT now(),
    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jersey_number" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT now(),
    "updated_at" TIMESTAMP(3) DEFAULT now(),
    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppearanceMatrix" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "jersey_number" INTEGER NOT NULL,
    "in_point" INTEGER NOT NULL,
    "out_point" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "max_size" FLOAT NOT NULL,
    "prominence_score" FLOAT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT now(),
    "updated_at" TIMESTAMP(3) DEFAULT now(),
    CONSTRAINT "AppearanceMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,  -- Duration in seconds
    "resolution" TEXT NOT NULL,   -- e.g., "1920x1080"
    "frame_rate" FLOAT NOT NULL,  -- e.g., 30.0
    "created_at" TIMESTAMP(3) DEFAULT now(),
    "updated_at" TIMESTAMP(3) DEFAULT now(),
    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
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