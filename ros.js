"use strict";

const path = require('path');

module.exports = function(RED) {
	var RosNodeConfig = require(path.join(
		__dirname,
		'ros-node-config',
		'ros-node-config'
	))(RED)

	RED.nodes.registerType("ros-node-config", RosNodeConfig)


	var RosSubscriberNode = require(path.join(__dirname, 'ros-subscriber', 'ros-subscriber'))(RED)
	RED.nodes.registerType("ros-subscriber", RosSubscriberNode)


	var RosPublisherNode = require(path.join(__dirname, 'ros-publisher', 'ros-publisher'))(RED)
	RED.nodes.registerType("ros-publisher", RosPublisherNode)
}
