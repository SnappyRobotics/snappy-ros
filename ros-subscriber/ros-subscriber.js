"use strict";

const rosnodejs = require('rosnodejs');
const debug = require('debug')("snappy:ros:subscriber");

module.exports = function(RED) {
  function ros_subscriber(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.ros_node = RED.nodes.getNode(config.node);

    if (!node.ros_node || !node.ros_node.nh) {
      return;
    }
    /*
    // if topic has not been advertised yet, keep trying again
    function topicQuery(topic) {
      node.server.ros.getTopicType(topic.name, (type) => {
        if (!type) {
          setTimeout(() => {
            topicQuery(topic)
          }, 1000);
        } else {
          topic.subscribe(function(data) {
            node.send({
              payload: data
            });
            node.log('got data: ' + data);
          });
        }
      })
    }

    node.server.on('ros connected', () => {
      node.topic = new ROSLIB.Topic({
        ros: node.server.ros,
        name: config.topicname
      });

      topicQuery(node.topic);
      node.status({
        fill: "green",
        shape: "dot",
        text: "connected"
      });
    });
		*/
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
