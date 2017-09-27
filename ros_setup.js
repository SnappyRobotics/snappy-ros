const rosnodejs = require('rosnodejs')

const debug = require('debug')('snappy:ros:ros_setup')

module.exports = function(RED) {
  debug("Registered routes")

  RED.httpAdmin.get("/packages", function(req, res) {
    var packs = rosnodejs.getAvailableMessagePackages()
    var packages = []
    for (var key in packs) {
      if (packs.hasOwnProperty(key)) {
        packages.push(key.trim())
      }
    }
    packages = packages.sort()

    var list = {}
    for (var i = 0; i < packages.length; i++) {
      try {
        var pack = rosnodejs.require(packages[i])
        if (pack) {
          var pack_msg = pack.msg
          var ar = []
          for (var msg in pack_msg) {
            if (pack_msg.hasOwnProperty(msg)) {
              msg = msg.trim()
              if (msg.length > 0) {
                ar.push(msg)
              }
            }
          }
          ar = ar.sort()
          if (ar.length) {
            list[packages[i]] = ar
          }
        }
      } catch (e) {
        debug(e)
      }
    }
    res.json(list)
  })

  RED.httpAdmin.get("/ROSInfo/:package/:messageType", function(req, res) {
    var q = rosnodejs.require(req.params.package)
      .msg[req.params.messageType]
    if (q) {
      var x = new q()
      res.json(JSON.parse(JSON.stringify(x)))
    } else {
      console.error('Type not found:' + req.params.package + "/" + req.params.messageType);
      res.json({})
    }
  })

  RED.httpAdmin.get("/services", function(req, res) {
    var packs = rosnodejs.getAvailableMessagePackages()
    var packages = []
    for (var key in packs) {
      if (packs.hasOwnProperty(key)) {
        packages.push(key.trim())
      }
    }
    packages = packages.sort()

    var list = {}
    for (var i = 0; i < packages.length; i++) {
      try {
        var pack = rosnodejs.require(packages[i])
        if (pack) {
          var pack_srv = pack.srv
          var ar = []
          for (var srv in pack_srv) {
            if (pack_srv.hasOwnProperty(srv)) {
              srv = srv.trim()
              if (srv.length > 0) {
                ar.push(srv)
              }
            }
          }
          ar = ar.sort()
          if (ar.length) {
            list[packages[i]] = ar
          }
        }
      } catch (e) {
        debug(e)
      }
    }
    res.json(list)
  })

  RED.httpAdmin.get("/ROSServInfo/:package/:serviceType", function(req, res) {
    try {
      var srv = rosnodejs.require(req.params.package)
        .srv[req.params.serviceType]
      var obj = {}
      obj.Request = new srv.Request()
      obj.Response = new srv.Response()

      res.json(JSON.parse(JSON.stringify(obj)))
    } catch (e) {
      console.log(e);
      console.error('Type not found:' + req.params.package + "/" + req.params.serviceType);
      res.json({})
    }
  })
}
