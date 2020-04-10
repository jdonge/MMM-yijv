Module.register("yijv", {

    // Module config defaults.
    defaults: {
        updateInterval: 60000,
        fadeSpeed: 4000,
        url: "http://yijuzhan.com/api/word.php?m=json",
        authorAlign: "align-right",
        words: [{
            content: "不要怂，一起上！",
            source: "和平精英"
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
                if (this.config.words.length > this.config.maxQuantity){
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
        return this.config.words[Math.round(Math.random() * items.length)];
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        let {content, source} = this.getRandom();
        var spw = document.createElement("div");
        spw.className = "thin xlarge bright pre-line";
        spw.appendChild(document.createTextNode(content));
        spw.appendChild(document.createElement("BR"));
        wrapper.appendChild(spw);
        var spa = document.createElement("div");
        spa.className = "small " + this.config.authorAlign;
        spa.appendChild(document.createTextNode("————" + source));
        wrapper.appendChild(spa);
        return wrapper;
    },
});