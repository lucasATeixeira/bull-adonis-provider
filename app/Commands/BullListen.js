"use strict";

const { Command } = require("@adonisjs/ace");

const Bull = use("Bull");

class BullListen extends Command {
  static get signature() {
    return "bull:listen";
  }

  static get description() {
    return "Start processing jobs";
  }

  async handle(args, options) {
    Bull.process();
    this.info("Processing Jobs");
  }
}

module.exports = BullListen;
