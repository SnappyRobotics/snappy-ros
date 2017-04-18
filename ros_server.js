'use strict';

const Promise = require('promiscuous')
const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:ros_server')

module.exports = function(RED, node) {
  var ros = null
  var ros_node_name = null

  debug('Loading ROS Server')

  return new Promise(function(resolve, reject) {
    if (!ros) {
      ros = 'temp'
      ros_node_name = 'snappy_core'

      if (RED.settings.ros_node_name) {
        ros_node_name = RED.settings.ros_node_name
        debug('settings ros_node_name exists :', ros_node_name)
      }

      rosnodejs.initNode(ros_node_name)
        .then((nodeHandle) => {
          debug('Created ROS nodeHandle')

          ros = nodeHandle
          node.emit('connected to ros')
          resolve(ros)
        })
    } else {
      node.emit('connected to ros')
      resolve(ros)
    }
  })
}
