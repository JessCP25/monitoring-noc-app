import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new logRepositoryImpl(
  new FileSystemDataSource,
)

export class Server {
  public static start(){
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', ()=>{
      const url = 'https://localhost:3000'
      new CheckService(
        fileSystemLogRepository,
        ()=> console.log(`${url} is ok`),
        (error)=> console.log(error)
      ).execute(url)
      // new CheckService().execute('https://localhost:3000')

    })
  }
}