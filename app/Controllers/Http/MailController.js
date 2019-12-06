"use strict";

const Bull = use("Bull");
const SendMail = require("../../Jobs/SendMail");

class MailController {
  async index() {
    await Bull.add(SendMail.key, { name: "oi" });
    return {
      ok: true
    };
  }
}

module.exports = MailController;
