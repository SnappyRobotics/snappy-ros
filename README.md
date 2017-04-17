# snappy-ros
A collection of Node-red nodes for connecting with ROS (Robot Operating System)


## Badges

[![Build Status](https://travis-ci.org/SnappyRobotics/snappy-ros.svg?branch=master)](https://travis-ci.org/SnappyRobotics/snappy-ros)
[![Coverage Status](https://coveralls.io/repos/github/SnappyRobotics/snappy-ros/badge.svg?branch=master)](https://coveralls.io/github/SnappyRobotics/snappy-ros?branch=master)
[![dependencies Status](https://david-dm.org/SnappyRobotics/snappy-ros/status.svg)](https://david-dm.org/SnappyRobotics/snappy-ros)
[![devDependencies Status](https://david-dm.org/SnappyRobotics/snappy-ros/dev-status.svg)](https://david-dm.org/SnappyRobotics/snappy-ros?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/snappyrobotics/snappy-ros/badge.svg)](https://snyk.io/test/github/snappyrobotics/snappy-ros)


[![npm](https://img.shields.io/npm/dt/snappy-ros.svg)](https://snappyrobotics.github.io/)
[![GitHub tag](https://img.shields.io/github/tag/SnappyRobotics/snappy-ros.svg)](https://github.com/SnappyRobotics/snappy-ros)
[![license](https://img.shields.io/github/license/SnappyRobotics/snappy-ros.svg)]()
[![npm](https://img.shields.io/npm/v/npm.svg)]()



[![NPM](https://nodei.co/npm/snappy-ros.png?downloads=true&stars=true)](https://nodei.co/npm/snappy-ros/)


## Prerequisites
- Node-red
- ROS(Kinetic)
- should atleast know ROS Topics ([ROS Tutorials: till 6th Tut.](http://wiki.ros.org/ROS/Tutorials))


### Install
To install the stable version run the following command in your Node-RED user directory (typically `~/.node-red`):

    npm i node-red-dashboard

Open your Node-RED instance and you should have ROS nodes available in the palette.

If you want to try the latest version from github, you can install it by

    npm i SnappyRobotics/snappy-ros

## Nodes :

### Subscriber

[![Subscriber how to](https://raw.githubusercontent.com/SnappyRobotics/snappy-ros/master/images/subscriber.gif)]()

### Publisher

[![Publisher how to](https://raw.githubusercontent.com/SnappyRobotics/snappy-ros/master/images/publisher.gif)]()

### This is in beta:
Parts tested are :
Subscriber and publisher (with string and Twist data type)

### TODO:
- [x] Proper Documentation
- [ ] Add service client and server nodes
- [ ] Param nodes(setter and getter)
- [ ] Write Unit Tests
- [ ] UI/Dashboard nodes

and many more comming in next couple of days.
