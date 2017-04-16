'use strict';

const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:subscriber')

module.exports = function(RED) {
  function ros_subscriber(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.ros_node = RED.nodes.getNode(config.node);

    if (!node.ros_node) {
      return;
    }

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

      node.sub = node.ros_node.nh.subscribe(config.topicname, config.topictype, sub_callback)

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

    var sub_callback = function(msg2) {
      var msg = {
        payload: msg2.data
      }
      node.send(msg);
    }

    /*
    node.server.on('ros error', () => {
      node.status({
        fill: "red",
        shape: "dot",
        text: "error"
      });
    });

    node.on("close", function() {
      if (!node.server.closing) {
        node.topic.unsubscribe();
      }
    });
		*/
  }
  RED.nodes.registerType("ros-subscriber", ros_subscriber);
}
