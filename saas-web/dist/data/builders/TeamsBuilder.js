"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamBuilder = void 0;
const uuid_1 = require("uuid");
class TeamBuilder {
    constructor() {
        this.name = "TestTeam";
        this.league = "Unknown";
    }
    build() {
        var _a;
        const model = {
            id: (_a = this.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)(),
            name: this.name,
            league: this.league,
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
    withLeague(league) {
        this.league = league;
        return this;
    }
}
exports.TeamBuilder = TeamBuilder;
//# sourceMappingURL=TeamsBuilder.js.map