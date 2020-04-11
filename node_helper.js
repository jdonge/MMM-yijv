var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
    // Subclass start method.
    start: function() {
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "getJson_s") {
            var self = this;
            request(payload, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    self.sendSocketNotification("getJson_r", body)
                }
            });
        }
    }
});