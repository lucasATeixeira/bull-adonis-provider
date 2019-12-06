"use strict";

const { Command } = require("@adonisjs/ace");

const fs = require("fs");

const Bull = use("Bull");

const Helpers = use("Helpers");

class BullListen extends Command {
  static get signature() {
    return "bull:listen";
  }

  static get description() {
    return "Start processing jobs";
  }

  async handle(args, options) {
    if (!fs.existsSync(Helpers.appRoot("app/Jobs"))) {
      this.error(
        `

There is no Jobs to be processed,to create a Jop run command:

'adonis bull:make-job [name]'

        `
      );
    } else {
      Bull.process();
      this.info("Processing Jobs");
    }
  }
}

module.exports = BullListen;
