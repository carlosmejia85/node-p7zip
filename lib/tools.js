var spaw = require('child_process').spawn;

var exports = module.exports = {
  run: run,
  start: start,
  Promise: Promise
};

/**
 * Return true if the haystack starts with the needle
 * @param {string} haystack
 * @param {string} needle
 * @return {boolean}
 */
function start(haystack , needle) {
  return haystack.substr(0, needle.length) === needle;
}

/**
 * Run 7za using arguments, arguments may be inline or in an array
 */
function run() {
  var args = Array.prototype.slice.call(arguments);

  if (Array.isArray(args[0])) {
    args = args[0];
  }

  return new exports.Promise(function (resolve, reject) {
    var cmd = spaw('bin/7za', args);
    var out = [];

    cmd.stdout.on('data', function (lines) {
      out.push.apply(out, lines.toString().replace(/\r/g, '').split(/\n/));
    });

    /** /
    cmd.stderr.on('data', function (lines) {
      console.log(lines.toString());
    });
    /**/

    cmd.on('exit', function (code) {
      if (code) {
        return reject(new Error('Command exit with code ' + code));
      }
      resolve(out);
    });
  });
}