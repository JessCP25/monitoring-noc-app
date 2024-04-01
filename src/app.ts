import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

(()=>{
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });
  
  // Crear un colección = tables, documento = registro
  Server.start();
}