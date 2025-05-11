"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueBuilder = void 0;
const uuid_1 = require("uuid");
class VenueBuilder {
    constructor() {
        this.name = "TestVenue";
        this.location = "Unknown";
        this.capacity = 1000;
    }
    build() {
        var _a;
        const model = {
            id: (_a = this.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)(),
            name: this.name,
            location: this.location,
            capacity: this.capacity,
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
    withLocation(location) {
        this.location = location;
        return this;
    }
    withCapacity(capacity) {
        this.capacity = capacity;
        return this;
    }
}
exports.VenueBuilder = VenueBuilder;
//# sourceMappingURL=VenueBuilder.js.map