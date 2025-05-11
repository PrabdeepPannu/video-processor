"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameBuilder = void 0;
const uuid_1 = require("uuid");
class GameBuilder {
    constructor() {
        this.name = "TestGame";
        this.date = new Date();
    }
    build() {
        var _a;
        const model = {
            id: (_a = this.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)(),
            name: this.name,
            date: this.date,
            venue_id: this.venue_id,
            team1_id: this.team1_id,
            team2_id: this.team2_id,
        };
        return model;
    }
    withId(id) {
        this.id = id;
        return this;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withDate(date) {
        this.date = date;
        return this;
    }
    withVenueId(venue_id) {
        this.venue_id = venue_id;
        return this;
    }
    withTeam1Id(team1_id) {
        this.team1_id = team1_id;
        return this;
    }
    withTeam2Id(team2_id) {
        this.team2_id = team2_id;
        return this;
    }
}
exports.GameBuilder = GameBuilder;
//# sourceMappingURL=GameBuilder.js.map