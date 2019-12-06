'use strict'

class Oi {

  // Bulls options https://optimalbits.github.io/bull/
  static get options () {
    return {}
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'Oi-job'
  }

  // This is where the work is done.
  async handle ({ data }) {
    console.log('Oi-job started')
  }
}

module.exports = Oi

