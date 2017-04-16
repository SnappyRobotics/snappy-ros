'use strict';

const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:config')

module.exports = function(RED) {
  function ros_node_config(config) {
    RED.nodes.createNode(this, config);
    var node = this;
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

  RED.nodes.registerType('ros-node-config', ros_node_config);
}
/*
module.exports = function(RED) {
  return function(config) {
    var ROSLIB = require('roslib');

    RED.nodes.createNode(this, config);
    var node = this;

    node.closing = false;
    node.on("close", function() {
      node.closing = true;
      if (node.tout) {
        clearTimeout(node.tout);
      }
      if (node.ros) {
        node.ros.close();
      }
    });

    var trials = 0;

    function startconn() { // Connect to remote endpoint
      var ros = new ROSLIB.Ros({
        url: config.url
      });
      node.ros = ros; // keep for closing
      handleConnection(ros);
    }

    function handleConnection(ros) {
      ros.on('connection', function() {
        node.emit('ros connected');
        node.log('connected');
      });

      ros.on('error', function(error) {
        trials++;
        node.emit('ros error');
        node.log('Error connecting : ', error);
        if (!node.closing) {
          node.log('reconnecting');
          node.tout = setTimeout(function() {
            startconn();
          }, Math.pow(2, trials) * 1000);
        }
      });

      ros.on('close', function() {
        node.emit('ros closed');
        node.log('Connection closed');
        if (!node.closing) {
          node.log('reconnecting');
          node.tout = setTimeout(function() {
            startconn();
          }, 1000);
        }
      });
    }

    startconn();
    node.closing = false;
  }
}
*/
