"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerBuilder = void 0;
const uuid_1 = require("uuid");
class PlayerBuilder {
    constructor() {
        this.name = "TestPlayer";
        this.jersey_number = 0;
        this.position = "Unknown";
    }
    build() {
        var _a;
        const model = {
            id: (_a = this.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)(),
            name: this.name,
            jersey_number: this.jersey_number,
            position: this.position,
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
    withJerseyNumber(jersey_number) {
        this.jersey_number = jersey_number;
        return this;
    }
    withPosition(position) {
        this.position = position;
        return this;
    }
}
exports.PlayerBuilder = PlayerBuilder;
//# sourceMappingURL=PlayersBuilder.js.map