import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new logRepositoryImpl(
  new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute('jpayanoc25@gmail.com')



    // emailService.sendEmailWithFileSystemLogs(['jpayanoc25@gmail.com']);

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
