import { MongoClient } from "./deps.ts";
import { Controller as PlantController } from "./plants/index.ts";
import { Repository as PlantRepository } from "./plants/index.ts";
import { createServer } from "./web/index.ts";

const client = new MongoClient();

await client.connect("test");

const db = client.database("CompletePlantProtein");

const plantRepository = new PlantRepository({ storage: db });

const plantController = new PlantController({
  plantRepository,
});

createServer({ configuration: { port: 8080 }, plant: plantController });
