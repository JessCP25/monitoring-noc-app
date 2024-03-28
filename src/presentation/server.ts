import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new logRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    // Mandar email
    const emailService = new EmailService();
    emailService.sendEmailWithFileSystemLogs(['jpayanoc25@gmail.com']);

    // CronService.createJob('*/5 * * * * *', ()=>{
    //   const url = 'https://localhost:3000'
    //   new CheckService(
    //     fileSystemLogRepository,
    //     ()=> console.log(`${url} is ok`),
    //     (error)=> console.log(error)
    //   ).execute(url)
    //   // new CheckService().execute('https://localhost:3000')

    // })
  }
}
