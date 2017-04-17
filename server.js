'use strict';

const Promise = require('promiscuous')
const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:server')

module.exports = function(globalContext) {
  return new Promise(function(resolve, reject) {

    if (!globalContext.ros) {
      node.ros_node_name = "snappy_core"

      if (RED.settings.ros_node_name) {
        node.ros_node_name = RED.settings.ros_node_name
      }

      rosnodejs.initNode(node.ros_node_name)
        .then((nodeHandle) => {
          // do stuff

        })

    }

    /*


    */
  })

  debug(RED.settings.ros_node_name)
}
