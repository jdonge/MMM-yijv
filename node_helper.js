var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
        var self = this;
        self.gotJson = "";
        self.jsonUrl = "http://yijuzhan.com/api/word.php?m=json";
		this.expressApp.get('/123', function (req1, res) {
            res.send("123456")
	});
	},
    
    socketNotificationReceived: function(notification, payload) {
		if (notification === "getJson_s") {
            this.jsonUrl = payload;
            var self = this;
            request(self.jsonUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    self.sendSocketNotification("getJson_r", body);
                }
                });
		}
	},
    
    broadcastFeeds: function() {
		var feeds = {};
		for (var f in this.fetchers) {
			feeds[f] = this.fetchers[f].items();
		}
		this.sendSocketNotification("WORDS_ITEMS", feeds);
	}
});
