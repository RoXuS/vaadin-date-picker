var args = require('yargs').argv;

module.exports = {
  extraScripts: args.dom === 'shadow' ? ['test/enable-shadow-dom.js'] : [],
  registerHooks: function(context) {
    // The Good
    var crossPlatforms = [
      // 'Windows 10/chrome@55',
      // 'Windows 10/firefox@50'
    ];

    // The Bad
    var otherPlatforms = [
      // 'OS X 10.11/iphone@9.3',
      // 'OS X 10.11/ipad@9.3',
      'Linux/android@5.1',
      // 'Windows 10/microsoftedge@13',
      // 'Windows 10/internet explorer@11',
      // 'OS X 10.11/safari@10.0'
    ];

    // run SauceLabs tests for pushes, except cases when branch contains 'quick/'
    if (process.env.TRAVIS_EVENT_TYPE === 'push' && process.env.TRAVIS_BRANCH.indexOf('quick/') === -1) {
      // crossPlatforms are not tested here, but in Selenium WebDriver (see .travis.yml)
      context.options.plugins.sauce.browsers = otherPlatforms;

    // Run SauceLabs for daily builds, triggered by cron
    } else if (process.env.TRAVIS_EVENT_TYPE === 'cron') {
      context.options.plugins.sauce.browsers = crossPlatforms.concat(otherPlatforms);
    }
  }
};
