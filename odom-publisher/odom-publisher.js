'use strict';

const path = require('path')
const rosnodejs = require('rosnodejs')
const debug = require('debug')('snappy:ros:odom_publisher')

const ros_server = require(path.join(__dirname, '..', 'ros_server.js'))

module.exports = function(RED) {
  var odom_publisher = function(config) {
    RED.nodes.createNode(this, config)
    var node = this

    node.status({
      fill: 'yellow',
      shape: 'ring',
      text: 'connecting to ros master..'
    })

    node.on('connected to ros', function() {
      node.status({
        fill: 'green',
        shape: 'dot',
        text: 'publishing'
      })
    })

    node.on('input', function(msg) {
      // node.pub.publish(x)
    })

    node.on('close', function(done) {
      debug('Unpublishing node on topic :', config.topicname)

      if (node.ros) {
        node.ros.unadvertise(config.topicname)
          .then(function() {
            debug('unpublished')
            done()
          })
      } else {
        done()
      }
    })

    ros_server(RED, node)
      .then(function(nodeHandle) {
        node.ros = nodeHandle
        var x = rosnodejs.require('tf')
        debug(x)
        // node.pub = node.ros.advertise(config.topicname, config.typepackage + '/' + config.typename)
      })
      .catch(function(e) {
        debug('Er', e)
      })
  }

  RED.nodes.registerType("odom-publisher", odom_publisher);
}
