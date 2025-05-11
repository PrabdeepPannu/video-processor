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
exports.VenuesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const requestperformance_interceptor_1 = require("../requestperformance.interceptor");
const venue_repository_1 = require("./venue.repository");
let VenuesController = class VenuesController {
    constructor(venuesRepository) {
        this.venuesRepository = venuesRepository;
    }
    async getAll() {
        return await this.venuesRepository.getAll();
    }
    async getById(id) {
        return await this.venuesRepository.getById(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve all Venue entities" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "All Venue entities" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve a Venue entity" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "The ID of the Venue", required: true, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "A single Venue entity with the given ID" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "getById", null);
VenuesController = __decorate([
    (0, common_1.Controller)("venues"),
    (0, common_1.UseInterceptors)(requestperformance_interceptor_1.RequestPerformanceInterceptor),
    __metadata("design:paramtypes", [venue_repository_1.VenuesRepository])
], VenuesController);
exports.VenuesController = VenuesController;
//# sourceMappingURL=venue.controller.js.map