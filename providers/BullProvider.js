"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class BullProvider extends ServiceProvider {
  register() {
    this.app.singleton("Bull/Queue", () => {
      const Queue = require("bull");

      const Config = this.app.use("Adonis/Src/Config");
      const Helpers = this.app.use("Adonis/Src/Helpers");

      const jobs = require(Helpers.appRoot("app/Jobs"));

      const redisConfig = Config.get("redis.js");

      const queues = Object.values(jobs).map(Job => ({
        bull: new Queue(Job.key, redisConfig),
        name: Job.key,
        handle: new Job().handle,
        options: Job.options
      }));

      return {
        queues,
        add(name, data) {
          const queue = this.queues.find(queue => queue.name === name);

          return queue.bull.add(data, queue.options);
        },
        process() {
          return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on("failed", (job, err) => {
              console.log("Job failed", queue.key, job.data);
              console.log(err);
            });
          });
        }
      };
    });

    this.app.alias("Bull/Queue", "Bull");
  }

  boot() {
    //
  }
}

module.exports = BullProvider;
