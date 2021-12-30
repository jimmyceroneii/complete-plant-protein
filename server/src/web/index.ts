import { Application, Router, Server } from "../deps.ts";
import { PlantController } from "../plants/index.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
  plant: PlantController;
}

export const createServer = async (config: CreateServerDependencies) => {
  const app = new Application();

  app.use(async (ctx, next) => {
    await next();

    const rt = ctx.response.headers.get("X-Response-Time");

    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();

    await next();

    const ms = Date.now() - start;

    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  const apiRouter = new Router({ prefix: "/api" });

  apiRouter.get("/plants", async (ctx) => {
    ctx.response.body = {
      plants: await config.plant.getAll(),
    };
  });

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());

  app.addEventListener("listen", (e) => {
    console.log(
      `Application running at http://${
        e.hostname || "localhost"
      }:${config.configuration.port}`,
    );
  });

  app.addEventListener("error", (e) => {
    console.log("An error occurred: ", e.message);
  });

  await app.listen({ port: config.configuration.port });
};
