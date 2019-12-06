"use strict";

const Mail = use("Mail");

class SendMail {
  // Bulls options https://optimalbits.github.io/bull/
  static get options() {
    return {};
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "SendMail-job";
  }

  // This is where the work is done.
  async handle({ data }) {
    await Mail.send(["emails.test"], {}, message => {
      message
        .to("lucas.at.negocios@gmail.com")
        .from("lucas.at.negocios@gmail.com")
        .subject("Queue test");
    });
  }
}

module.exports = SendMail;
