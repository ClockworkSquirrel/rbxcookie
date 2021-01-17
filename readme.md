# rbxcookie
> Fetch Roblox login cookies for use in Node.js applications

# Prerequisites
* [Node.js](https://nodejs.org/en/)
* A package manager ([npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), etc.)

### Optional Dependencies
The recommended way to install rbxcookie is without optional dependencies. This allows you to reduce the size of the package, in addition to only installing the packages you actually need in your project <font color="grey">(for example, a macOS-based project would not require a Windows Registry package)</font>.

* To enable fetching cookies from the Windows Registry (`RobloxStudio`), you will be required to install one of the following packages:
    * [rage-edit](https://www.npmjs.com/package/rage-edit)
    * [~~winreg~~](https://www.npmjs.com/package/winreg) <font color="grey">(broken)</font>

* To enable fetching cookies from Google Chrome, you will need to install the [chrome-cookies-secure](https://www.npmjs.com/package/chrome-cookies-secure) package.
# Install
The default install process will install all optional dependencies for this package. To reiterate: the recommended way to install is without optional dependencies, and install only those that you require.

### **Quick Start** (Default)
```
$ npm i github:ClockworkSquirrel/rbxcookie
```

### Recommended
```
$ npm i github:ClockworkSquirrel/rbxcookie --no-optional
```

# Platform Support
| Platform | Roblox Studio | Google Chrome |
|----------|:------------:|:------------:|
| Windows | ✔ | ✔ |
| macOS |  | ✔ |
| Linux | | ✔ |

# Usage
### Fetch Cookie from Registry
```js
const rbxcookie = require("rbxcookie")
const StudioCookie = new rbxcookie.Studio()

async function FetchCookie() {
    const cookie = await StudioCookie.cookie()
    console.log(cookie)
}

FetchCookie()
```

### Fetch Cookie from Chrome
```js
const rbxcookie = require("rbxcookie")
const ChromeCookie = new rbxcookie.Chrome()

async function FetchCookie() {
    const cookie = await ChromeCookie.cookie()
    console.log(cookie)
}

FetchCookie()
```

# Limitations
* At present, the `RobloxStudio` method can only be used on a Windows device. This is because Roblox Studio stores cookies in the Windows Registry.
    "winreg": "^1.2.4"
* When using the `GoogleChrome` method, macOS users may be prompted to allow node to access the keychain. This is to allow node to read the Google Chrome encryption keys. More details can be found in the [chrome-cookies-secure readme]().

# API
rbxcookie exports two classes at present: `RobloxStudio` and `GoogleChrome`. They are both used to fetch cookies from their respective applications.

## RobloxStudio Class
### cookie()
Returns a `Promise`, which resolves with a `string` containing the value of the Studio user's login cookie.

## GoogleChrome Class
### cookie(profile?)
Returns a `Promise`, which resolves with a `string` containing te value of the Chrome user's login cookie (with optional profile parameter).

#### profile
Type: `string`\
Required: No\
Default: `"Default"`

Defines which Chrome profile to fetch the cookies from.
