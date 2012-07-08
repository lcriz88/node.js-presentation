var exec = require('child_process').exec;

/**
 * Rasterize the given `url` and callback `(err, stdout, stderr)`.
 *
 * Options:
 *
 *   - command: phantomjs command
 *   - path: output file path
 *   - viewportWidth: viewport width
 *   - viewportHeight: viewport height
 *
 * @param {String} url
 * @param {Object} options
 * @param {Function} callback
 */

module.exports = function(url, options, fn){
  var cmd = [options.command];
  cmd.push(__dirname + '/../scripts/rasterize.js');
  cmd.push(url);
  cmd.push(options.path);
  cmd.push(options.viewportWidth + 'x' + options.viewportHeight);
  cmd = cmd.join(' ');
  // if script takes more than 7 second, return error
  var options = { 
    encoding: 'utf8',
    timeout: 10000,
    maxBuffer: 200*1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null 
  }
  exec(cmd, options, fn);
};
