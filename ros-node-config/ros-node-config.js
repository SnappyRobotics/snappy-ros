'use strict';

const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:config')

module.exports = function(RED) {
	var ros_node_config = function(config) {
		RED.nodes.createNode(this, config)
		var node = this

		node.name = config.name

		node.on('close', function() {
			debug('On close')
		})

		function startNode() {
			debug('starting ROS node')
			node.emit('connnecting to ros')

			rosnodejs.initNode(config.name)
				.then((nodeHandle) => {
					debug('ROS node started')
					node.nh = nodeHandle
					node.emit('connnected to ros')
				})
				.catch(function(e) {
					debug(e)
				})
		}


		setTimeout(function() {
			startNode()
		}, 10)
	}

	//routes
	RED.httpAdmin.get("/packages", function(req, res) {
		res.json(rosnodejs.getAvailableMessagePackages())
	})

	RED.httpAdmin.get("/packages/:package", function(req, res) {
		var x = rosnodejs.require(req.params.package).msg
		var o = []
		for (var key in x) {
			if (x.hasOwnProperty(key)) {
				o.push(key)
			}
		}
		res.json(o)
	})

	RED.nodes.registerType('ros-node-config', ros_node_config);
}
