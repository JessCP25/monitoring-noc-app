import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "MEDIUM",
  //     message: "Test message 1",
  //     origin: "App.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'MEDIUM'cons
  //   }
  // });
  // console.log({ logs });

  // Crear un colección = tables, documento = registro
  Server.start();
}
