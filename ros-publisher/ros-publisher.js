'use strict';

const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:publisher')

module.exports = function(RED) {
	var ros_publisher = function(config) {
		RED.nodes.createNode(this, config)
		var node = this

		node.ros_node = RED.nodes.getNode(config.node)

		node.ros_node.on('connnecting to ros', () => {
			node.status({
				fill: 'yellow',
				shape: 'ring',
				text: 'connecting to ros master..'
			})
		})

		node.on('input', function(msg) {
			var msgType = rosnodejs.require(config.typepackage)
				.msg[config.typename]

			var x = new msgType()
			x.data = msg.payload

			node.pub.publish(x)
		})

		node.ros_node.on('connnected to ros', () => {
			node.status({
				fill: 'green',
				shape: 'dot',
				text: 'connected to ros'
			})

			node.pub = node.ros_node.nh.advertise(config.topicname, config.typepackage + '/' + config.typename)

			node.pub.on('registered', () => {
				node.status({
					fill: 'green',
					shape: 'dot',
					text: 'publishing'
				})
			})
		})

		node.on('close', function(done) {
			debug('Unpublishing node on topic :', config.topicname)

			node.ros_node.nh.unadvertise(config.topicname)
				.then(function() {
					debug('unpublished')
					done()
				})
		})
	}

	RED.nodes.registerType("ros-publisher", ros_publisher);
}
