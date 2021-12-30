import { Controller as PlantController } from "./plants/index.ts";
import { Repository as PlantRepository } from "./plants/index.ts";
import { createServer } from "./web/index.ts";

const plantRepository = new PlantRepository();

plantRepository.storage.set("1fbdd2a9-1b97-46e0-b450-62819e5772ff", {
  id: "1fbdd2a9-1b97-46e0-b450-62819e5772ff",
  name: "Bean",
  proteins: ["Histidine"],
});

const plantController = new PlantController({
  plantRepository,
});

createServer({ configuration: { port: 8080 }, plant: plantController });
