/// <reference types="cypress" />
const deepmerge = require('deepmerge')
const path = require('path')

function loadConfig(filename) {
  const configJson = require(filename)
  if (configJson.extends) {
    const baseConfigFilename = path.join(
      path.dirname(filename), configJson.extends)
    const baseConfig = loadConfig(baseConfigFilename)
    console.log('merging %s with %s', baseConfigFilename, filename)
    return deepmerge(baseConfig, configJson)
  } else {
    return configJson
  }
}

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // console.log(config)

  return loadConfig(config.configFile)
}
