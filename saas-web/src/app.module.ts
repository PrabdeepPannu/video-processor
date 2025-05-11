
import { PlayersRepository} from "./players/players.repository";
import { GamesRepository } from "./games/games.repository";
import { TeamsRepository } from "./teams/teams.repository";
import { VenuesRepository } from "./venue/venue.repository";
import { PlayersController } from "./players/players.controller";
import { GamesController } from "./games/games.controller";
import { TeamsController } from "./teams/teams.controller";
import { VenuesController } from "./venue/venue.controller";

@Module({
  imports: [],
  controllers: [PlayersController, GamesController, TeamsController, VenuesController],
  providers: [
    PlayersRepository,
    GamesRepository,
    TeamsRepository,
    VenuesRepository
  ],
})
export class AppModule {}
