"use strict";

const { Command } = require("@adonisjs/ace");

const fs = require("fs");

const { join, basename } = require("path");

class BullMakeJob extends Command {
  static get signature() {
    return "bull:make-job { name: Name of Job (Queue) }";
  }

  static get description() {
    return "Make a new Job (Queue)";
  }

  async handle({ name }) {
    try {
      name = name.replace(/(^\w)(\w*)/, (match, p1, p2) => {
        return p1.toUpperCase() + p2;
      });

      const templatePath = join(__dirname, "../../templates/Jobs/Job.mustache");
      const templateContent = await this.readFile(templatePath, "utf-8");

      const filePath = join("app/Jobs", name) + ".js";

      await this.generateFile(filePath, templateContent, { name });

      const indexFilePath = join("app/Jobs/index.js");

      if (!fs.existsSync(indexFilePath)) {
        const indexTemplatePath = join(
          __dirname,
          "../../templates/Jobs/JobIndex.mustache"
        );
        const indexTemplateContent = await this.readFile(
          indexTemplatePath,
          "utf-8"
        );

        await this.generateFile("app/Jobs/index.js", indexTemplateContent);
      }

      const namespace = this.getNamespace(filePath);
      console.log(
        `${this.icon("success")} ${this.chalk.green("create")}  ${filePath}`
      );

      this.printInstructions(namespace);
    } catch (err) {
      console.log(err);
    }
  }

  getNamespace(filePath) {
    return `App/Jobs/${basename(filePath).replace(".js", "")}`;
  }

  /**
   * Print instructions to the console
   */
  printInstructions(namespace) {
    console.log("Job created at 'app/Jobs'");
  }
}

module.exports = BullMakeJob;
