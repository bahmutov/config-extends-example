/// <reference types="cypress" />
const deepmerge = require('deepmerge')
const path = require('path')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  console.log(config)

  const configJson = require(config.configFile)
  if (configJson.extends) {
    const baseConfigFilename = path.join(config.projectRoot, configJson.extends)
    const baseConfig = require(baseConfigFilename)
    console.log('merging %s with %s', baseConfigFilename, config.configFile)
    return deepmerge(baseConfig, configJson)
  }

  return config
}
