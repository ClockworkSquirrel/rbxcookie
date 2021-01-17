const assert = require("assert")
const { promisify } = require("util")

const packages = [
    "rage-edit",
    // "winreg"
]

class WindowsRegistry {
    constructor(usePackage) {
        assert(process.platform === "win32", new Error("WindowsRegistry can only be used on a win32 device"))

        if (typeof usePackage === "string") {
            assert(packages.includes(usePackage), `${usePackage} is not a supported library. Install one of [ ${packages.join(", ")} ] to continue`)
        }

        this.__LOAD_REGISTRY_PACKAGE(usePackage)
    }

    __LOAD_REGISTRY_PACKAGE(usePackage) {
        if (typeof usePackage === "string") {
            this.registry = require(usePackage)
            this.package = usePackage
        } else {
            for (const packageName of packages) {
                try {
                    this.registry = require(packageName)
                    this.package = packageName
                    break
                } catch (_) {}
            }
        }

        assert(this.registry && this.package, new Error(`No registry package is installed. Install one of [ ${packages.join(", ")} ] to continue`))

        switch (this.package) {
            case "rage-edit":
                this.registry = this.registry.Registry
        }
    }

    get(hive, path, name) {
        assert(typeof hive === "string", "Hive must be specified as a string")
        assert(typeof path === "string", "Path must be specified as a string")

        switch (this.package) {
            case "rage-edit":
                return new Promise(async (resolve) => {
                    const value = await this.registry.get(`${hive}${path}`, name)

                    if (typeof name === "string") {
                        resolve(value)
                    } else {
                        resolve({
                            values: value["$values"],
                            keys: Object.keys(value).filter(key => key !== "$values"),
                        })
                    }
                })

            case "winreg":
                return new Promise(async (resolve) => {
                    const key = new this.registry({ hive: this.registry[hive], key: path, })

                    if (typeof name === "string") {
                        const value = await promisify(key.get)(name)
                        resolve(value)
                    } else {
                        const values = await promisify(key.values)()
                        const children = await promisify(key.keys)()

                        resolve({
                            keys: children ? children.map(key => key.key) : [],
                            values: values ? Object.fromEntries(values.map(value => ([
                                value.name || "", value.value || ""
                            ]))) : {},
                        })
                    }
                })
        }
    }
}

module.exports = WindowsRegistry
