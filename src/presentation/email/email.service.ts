import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transport = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transport.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      // console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h3>Logs de sistema - NOC</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, congue tincidunt semper feugiat penatibus euismod habitant porttitor, facilisis aenean in fusce quis curae. Nam dapibus montes mus mauris est pretium nisl facilisis proin blandit, libero habitasse viverra conubia non fringilla cursus vivamus diam, pellentesque euismod nulla feugiat habitant netus aptent donec facilisi. Consequat felis fusce congue orci montes lacus non himenaeos bibendum, dictumst dignissim ultricies suscipit tempor mi quam iaculis velit ridiculus, morbi taciti litora per feugiat vehicula suspendisse erat.</p>
      <p>Ver logs adjuntos</p>
    `;

    const attachments: Attachment[] = [
      { filename: "logs-low.log", path: "./logs/logs-low.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
