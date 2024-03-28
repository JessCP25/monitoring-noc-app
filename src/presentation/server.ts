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
    emailService.sendEmail({
      to: "jpayanoc25@gmail.com",
      subject: "Logs de sistema",
      htmlBody: `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, congue tincidunt semper feugiat penatibus euismod habitant porttitor, facilisis aenean in fusce quis curae. Nam dapibus montes mus mauris est pretium nisl facilisis proin blandit, libero habitasse viverra conubia non fringilla cursus vivamus diam, pellentesque euismod nulla feugiat habitant netus aptent donec facilisi. Consequat felis fusce congue orci montes lacus non himenaeos bibendum, dictumst dignissim ultricies suscipit tempor mi quam iaculis velit ridiculus, morbi taciti litora per feugiat vehicula suspendisse erat.</p>
        <p>Ver logs adjuntos</p>
      `,
    });

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
