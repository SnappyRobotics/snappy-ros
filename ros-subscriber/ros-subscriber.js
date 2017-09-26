'use strict';

const path = require('path')
const debug = require('debug')('snappy:ros:subscriber')

const ros_server = require(path.join(__dirname, '..', 'ros_server.js'))

module.exports = function(RED) {
  var ros_subscriber = function(config) {
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
        text: 'subscribed'
      })
    })

    var sub_callback = function(msg) {
      var o = JSON.parse(JSON.stringify(msg))

      var count = 0
      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          count++
        }
      }

      if (o.data && count <= 1) {
        o = o.data
      }

      node.send({
        payload: o
      })
    }

    node.on('close', function(done) {
      debug('Unsubscribing node on topic :', config.topicname)

      if (node.ros) {
        node.ros.unsubscribe(config.topicname)
          .then(function() {
            debug('unsubscribed')
            done()
          })
      } else {
        done()
      }
    })

    ros_server(RED, node)
      .then(function(nodeHandle) {
        node.ros = nodeHandle
        node.sub = node.ros.subscribe(config.topicname, config.typepackage + '/' + config.typename, sub_callback)
      })
      .catch(function(e) {
        debug('Er', e)
      })
  }
  RED.nodes.registerType("ros-subscriber", ros_subscriber)
}
