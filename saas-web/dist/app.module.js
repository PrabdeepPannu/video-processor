"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const players_repository_1 = require("./players/players.repository");
const games_repository_1 = require("./games/games.repository");
const teams_repository_1 = require("./teams/teams.repository");
const venue_repository_1 = require("./venue/venue.repository");
const players_controller_1 = require("./players/players.controller");
const games_controller_1 = require("./games/games.controller");
const teams_controller_1 = require("./teams/teams.controller");
const venue_controller_1 = require("./venue/venue.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [players_controller_1.PlayersController, games_controller_1.GamesController, teams_controller_1.TeamsController, venue_controller_1.VenuesController],
        providers: [
            players_repository_1.PlayersRepository,
            games_repository_1.GamesRepository,
            teams_repository_1.TeamsRepository,
            venue_repository_1.VenuesRepository
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map