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
		node.on('close', function() {
			debug('Unpublishing node while closing publisher on topic :', config.topicname)
			node.ros_node.nh.unadvertise(config.topicname)
		})

		node.on('input', function(msg) {
			node.pub.publish({
				data: msg.payload
			})
		})
	}
	RED.nodes.registerType("ros-publisher", ros_publisher);
}
