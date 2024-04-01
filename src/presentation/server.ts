import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new logRepositoryImpl(
  new FileSystemDataSource()
);
const mongoLogRepository = new logRepositoryImpl(
  new MongoLogDataSource(),
);
const postgresLogRepository = new logRepositoryImpl(
  new PostgresLogDataSource()
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute('jpayanoc25@gmail.com')

    // emailService.sendEmailWithFileSystemLogs(['jpayanoc25@gmail.com']);

    // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    // console.log(logs);

    CronService.createJob('*/5 * * * * *', ()=>{
      // const url = 'https://localhost:3000'
      const url = 'https://google.com'
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        ()=> console.log(`${url} is ok`),
        (error)=> console.log(error)
      ).execute(url)

    })
  }
}
