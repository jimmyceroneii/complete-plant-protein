import { Collection, Database } from "../../deps.ts";
import { Plant, PlantRepository } from "../index.ts";

interface RepositoryDependencies {
  storage: Database;
}

export class Repository implements PlantRepository {
  storage: Collection<Plant>;

  constructor({ storage }: RepositoryDependencies) {
    this.storage = storage.collection<Plant>("plants");
  }

  async getAll() {
    const plants = await this.storage.find();

    if (!plants) {
      throw new Error("Plants not found");
    }

    const plantArray: Plant[] = [];

    plants.forEach((plant) => plantArray.push(plant));

    return plantArray;
  }
}
