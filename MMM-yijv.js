Module.register("MMM-yijv", {

    // Module config defaults.
    defaults: {
        updateInterval: 60000,
        fadeSpeed: 4000,
        url: "http://yijuzhan.com/api/word.php?m=json",
        authorAlign: "align-right",
        words: [{
            content: "不要怂，一起上！",
            source: "和平精英"
        }, {
            content: "世界那么大，你想去看看。事情那么多，你咋不干？",
            source: "陈一发儿"
        }],
        maxQuantity: 20
    },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this;
        var pool = [];

        // Schedule update timer.
        setInterval(function() {
            self.getJson();
        }, this.config.updateInterval);

    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "getJson_r") {
            if (payload.indexOf("content") != 0 && payload.indexOf("source") != 0) {
                if (this.config.words.length > this.config.maxQuantity) {
                    this.config.words.shift()
                };
                this.config.words.push(JSON.parse(payload));
                this.updateDom(this.config.fadeSpeed);
            }
        }
    },

    getJson: function() {
        this.sendSocketNotification("getJson_s", this.config.url);
    },

    getRandom: function() {
        return this.config.words[Math.round(Math.random() * this.config.words.length)];
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        let {
            content, source
        } = this.getRandom();
        var spc = document.createElement("div");
        spc.className = "thin xlarge bright pre-line";
        spc.appendChild(document.createTextNode(content));
        spc.appendChild(document.createElement("BR"));
        wrapper.appendChild(spc);
        var sps = document.createElement("div");
        sps.className = "small " + this.config.authorAlign;
        sps.appendChild(document.createTextNode("————" + source));
        wrapper.appendChild(sps);
        return wrapper;
    },
});
