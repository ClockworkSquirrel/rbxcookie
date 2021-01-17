const lib = require("../index")

async function test() {
    const source = new lib.chrome()
    console.dir(await source.cookie())
}

test()
