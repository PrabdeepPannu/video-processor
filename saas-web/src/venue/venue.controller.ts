import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { VenuesRepository } from "./venue.repository";

// Venue Controller
@Controller("venues")
@UseInterceptors(RequestPerformanceInterceptor)
export class VenuesController {
  constructor(private readonly venuesRepository: VenuesRepository) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all Venue entities" })
  @ApiResponse({ status: 200, description: "All Venue entities" })
  async getAll() {
    return await this.venuesRepository.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a Venue entity" })
  @ApiParam({ name: "id", description: "The ID of the Venue", required: true, type: Number })
  @ApiResponse({ status: 200, description: "A single Venue entity with the given ID" })
  async getById(@Param("id") id: number) {
    return await this.venuesRepository.getById(id);
  }
}