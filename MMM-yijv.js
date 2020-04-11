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
            content: "世界那么大，你想去看看。\n事情那么多，你咋不干？",
            source: "陈一发儿"
        }],
        maxQuantity: 20,
        lineBreak: false
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.lastWord = "";
        var self = this;

        // Schedule update timer.
        setInterval(function() {
            self.getJson();
        }, this.config.updateInterval);

    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "getJson_r") {
            if (payload.indexOf("content") != 0 && payload.length > 30) {
                if (this.config.words.length > this.config.maxQuantity) {
                    this.config.words.shift()
                };
                Log.error(1,this.name, payload);
                thisJson = JSON.parse(payload);
                for (word of this.config.words){
                    if (thisJson.content == word.content){
                        return;
                    }
                }
                this.config.words.push(thisJson);
                this.updateDom(this.config.fadeSpeed);
            }
        }
    },

    getJson: function() {
        this.sendSocketNotification("getJson_s", this.config.url)
    },

    getRandom: function() {
        words = this.config.words;
        word = words[Math.floor(Math.random() * words.length)];
        while (word.content == this.lastWord){
            word = words[Math.floor(Math.random() * words.length)]
        }
        this.lastWord = word.content;
        return word;
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        let {content, source} = this.getRandom();
        this.getJson();
        var spw = document.createElement("div");
        spw.className = "thin xlarge bright pre-line";
        if (this.config.lineBreak){
            if (content.indexOf("\n") == -1){
                content = content.replace(/([，。？！])/g, "$1\n");
            }
            content = content.replace(/(\n+)/g, "\n").replace(/(\n$)/, "");
        }
        Log.error(3, this.name, content, source);
        var parts = content.split("\n");
        for (part of parts){
            spw.appendChild(document.createTextNode(part));
            spw.appendChild(document.createElement("BR"));
        }
        wrapper.appendChild(spw);
        var spa = document.createElement("div");
        spa.className = this.config.authorAlign ? "small " + this.config.authorAlign : "small";
        spa.appendChild(document.createTextNode("————" + source));
        wrapper.appendChild(spa);
        return wrapper;
    },
});
