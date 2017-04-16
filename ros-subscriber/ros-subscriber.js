'use strict';

const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:subscriber')

module.exports = function(RED) {
	var ros_subscriber = function(config) {
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

		var sub_callback = function(msg) {
			var o = JSON.parse(JSON.stringify(msg))
			if (o.data) {
				o = o.data
			}

			node.send({
				payload: o
			})
		}

		node.ros_node.on('connnected to ros', () => {
			node.status({
				fill: 'green',
				shape: 'dot',
				text: 'connected to ros'
			})

			node.sub = node.ros_node.nh.subscribe(config.topicname, config.typepackage + '/' + config.typename, sub_callback)

			node.sub.on('registered', () => {
				node.status({
					fill: 'green',
					shape: 'dot',
					text: 'subscribed'
				})
			})
		})

		node.on('close', function() {
			debug('Unsubscribing node while closing subscriber on topic :', config.topicname)
			node.ros_node.nh.unsubscribe(config.topicname)
		})

	}

	RED.nodes.registerType("ros-subscriber", ros_subscriber);
}
