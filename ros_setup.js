const rosnodejs = require('rosnodejs')

const debug = require('debug')('snappy:ros:ros_setup')

module.exports = function(RED) {
  debug("Registered routes")
  RED.httpAdmin.get("/packages", function(req, res) {
    var x = rosnodejs.getAvailableMessagePackages()
    var a = []
    for (var key in x) {
      if (x.hasOwnProperty(key)) {
        a.push(key.trim())
      }
    }
    a = a.sort()
    var o = {}
    for (var i = 0; i < a.length; i++) {
      var xy = rosnodejs.require(a[i]).msg
      var ar = []
      for (var k in xy) {
        if (xy.hasOwnProperty(k)) {
          ar.push(k.trim())
        }
      }
      ar = ar.sort()
      o[a[i]] = ar
    }
    res.json(o)
  })

  RED.httpAdmin.get("/ROSInfo/:package/:messageType", function(req, res) {
    var q = rosnodejs.require(req.params.package)
      .msg[req.params.messageType]
    var x = new q()
    res.json(JSON.parse(JSON.stringify(x)))
  })
}
