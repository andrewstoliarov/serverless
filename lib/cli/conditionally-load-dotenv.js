'use strict';

const _ = require('lodash');

module.exports = async (options, configuration) => {
  const stage = options.stage || _.get(configuration, 'provider.stage', 'dev');
  let envName = '.env';
  if(options.param) {
    options.param.forEach((param) => {
      if(param.includes('env_name')) {
        envName = param.replace('env_name=', '');
      }
    })
  }
  if (!configuration.useDotenv) return false;
  require('./load-dotenv')(stage, envName);
  return true;
};
