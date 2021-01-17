class GoogleChrome {
    constructor() {
        this.chrome = require("chrome-cookies-secure")
    }

    cookie(profile = "Default") {
        return new Promise((resolve, reject) => {
            this.chrome.getCookies("http://www.roblox.com", (err, cookies) => {
                if (err) {
                    reject(err)
                }

                if (cookies[".ROBLOSECURITY"]) {
                    resolve(cookies[".ROBLOSECURITY"])
                }

                reject("Failed to retrieve Roblox login cookie from Chrome")
            }, profile)
        })
    }
}

module.exports = GoogleChrome
