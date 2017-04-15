const path = require('path');

module.exports = function(RED) {
  var RosServerNode = require(path.join(__dirname, 'ros-server', 'ros-server'))(RED);

  RED.nodes.registerType("ros-server", RosServerNode);
}
