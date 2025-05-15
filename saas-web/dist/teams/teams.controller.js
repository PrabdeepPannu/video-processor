"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const requestperformance_interceptor_1 = require("../requestperformance.interceptor");
const teams_repository_1 = require("./teams.repository");
let TeamsController = class TeamsController {
    constructor(teamsRepository) {
        this.teamsRepository = teamsRepository;
    }
    async getAll() {
        console.log("Fetching all teams... fingers crossed!");
        return await this.teamsRepository.getAll();
    }
    async getById(id) {
        console.log(`Looking up team with ID: ${id}...`);
        const team = await this.teamsRepository.getById(id);
        if (!team) {
            console.warn(`Team not found: ${id}`);
            return { message: "Oops! Team not found." };
        }
        return team;
    }
    async getByLeague(league) {
        console.log(`Fetching teams from league: ${league}...`);
        const teams = await this.teamsRepository.getByLeague(league);
        if (!teams.length) {
            console.warn(`No teams found for league: ${league}`);
            return { message: "No teams found for this league." };
        }
        return teams;
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve all Team entities" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "All Team entities listed out" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve a single Team entity by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "The ID of the Team", required: true, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "The Team entity you asked for" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("league/:league"),
    (0, swagger_1.ApiOperation)({ summary: "Get teams by League" }),
    (0, swagger_1.ApiParam)({ name: "league", description: "The League of the Teams", required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "A list of Teams in the specified League" }),
    __param(0, (0, common_1.Param)("league")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getByLeague", null);
TeamsController = __decorate([
    (0, common_1.Controller)("teams"),
    (0, common_1.UseInterceptors)(requestperformance_interceptor_1.RequestPerformanceInterceptor),
    __metadata("design:paramtypes", [teams_repository_1.TeamsRepository])
], TeamsController);
exports.TeamsController = TeamsController;
//# sourceMappingURL=teams.controller.js.map