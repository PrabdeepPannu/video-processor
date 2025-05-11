import { v4 as uuidv4 } from "uuid";
import { VenueModel } from "../models";

export class VenueBuilder {
  private id: number;
  private name: string = "TestVenue";
  private location: string = "Unknown";
  private capacity: number = 1000;

  build(): VenueModel {
    const model: VenueModel = {
      id: this.id ?? uuidv4(),
      name: this.name,
      location: this.location,
      capacity: this.capacity,
    };
    return model;
  }

  withId(id: number): VenueBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): VenueBuilder {
    this.name = name;
    return this;
  }

  withLocation(location: string): VenueBuilder {
    this.location = location;
    return this;
  }

  withCapacity(capacity: number): VenueBuilder {
    this.capacity = capacity;
    return this;
  }
}