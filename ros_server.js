'use strict';

const Promise = require('promiscuous')
const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:ros_server')

module.exports = function(RED, node) {
  debug('Loading ROS Server')

  return new Promise(function(resolve, reject) {
    var rosNodeName = 'Node-RED'

    if (RED.settings.rosNodeName) {
      rosNodeName = RED.settings.rosNodeName
    }
    debug('settings rosNodeName exists :', rosNodeName)

    //Create a new nodeHandle or returns existing
    rosnodejs.initNode(rosNodeName)
      .then((nodeHandle) => {
        debug('Created ROS nodeHandle')

        node.emit('connected to ros')
        resolve(nodeHandle)
      })
  })
}
