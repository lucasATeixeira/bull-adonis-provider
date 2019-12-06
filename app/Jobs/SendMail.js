'use strict'

class SendMail {

  // Bulls options https://optimalbits.github.io/bull/
  static get options () {
    return {}
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'SendMail-job'
  }

  // This is where the work is done.
  async handle ({ data }) {
    console.log('SendMail-job started')
  }
}

module.exports = SendMail

