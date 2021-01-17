const RobloxStudio = require("./src/RobloxStudio")
const GoogleChrome = require("./src/GoogleChrome")

async function guess() {
    try {
        return await (new GoogleChrome()).cookie()
    } catch (_) { }

    return await (new RobloxStudio()).cookie()
}

module.exports = {
    Studio: RobloxStudio,
    Chrome: GoogleChrome,
    guess,
}
