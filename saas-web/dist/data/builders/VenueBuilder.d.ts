import { VenueModel } from "../models";
export declare class VenueBuilder {
    private id;
    private name;
    private location;
    private capacity;
    build(): VenueModel;
    withId(id: number): VenueBuilder;
    withName(name: string): VenueBuilder;
    withLocation(location: string): VenueBuilder;
    withCapacity(capacity: number): VenueBuilder;
}
