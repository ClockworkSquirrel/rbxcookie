class RobloxStudio {
    constructor() {
        this.platform = process.platform

        if (this.platform === "win32") {
            const WindowsRegistry = require("./WindowsRegistry")
            this.registry = new WindowsRegistry()
        }
    }

    cookie() {
        return new Promise(async (resolve, reject) => {
            switch (this.platform) {
                case "win32":
                    const cookie = await this.registry.get(
                        "HKCU",
                        "\\Software\\Roblox\\RobloxStudioBrowser\\roblox.com",
                        ".ROBLOSECURITY"
                    )

                    const splitCookie = cookie.split(",")
                    const data = new Map()

                    for (const string of splitCookie) {
                        const [key, value] = string.split("::")
                        data.set(key.toLowerCase(), value.substr(1, value.length - 2))
                    }

                    if (data.get("cook") && data.get("exp")) {
                        if (Date.parse(data.get("exp")) - Date.now() <= 0) {
                            reject("Registry cookie has expired. Login to Studio and try again")
                        }

                        resolve(data.get("cook"))
                    }

                    reject("Failed to locate registry cookie for Roblox Studio. Login to Studio and try again")

                default:
                    reject(`${this.platform} is not yet supported`)
            }
        })
    }
}

module.exports = RobloxStudio
