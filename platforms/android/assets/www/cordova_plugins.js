cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.plugin.oauth.js",
        "id": "com.salesforce.plugin.oauth"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.plugin.sdkinfo.js",
        "id": "com.salesforce.plugin.sdkinfo"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.plugin.smartstore.js",
        "id": "com.salesforce.plugin.smartstore",
        "clobbers": [
            "navigator.smartstore"
        ]
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.plugin.sfaccountmanager.js",
        "id": "com.salesforce.plugin.sfaccountmanager"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.plugin.smartsync.js",
        "id": "com.salesforce.plugin.smartsync"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.util.bootstrap.js",
        "id": "com.salesforce.util.bootstrap"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.util.event.js",
        "id": "com.salesforce.util.event"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.util.exec.js",
        "id": "com.salesforce.util.exec"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.util.logger.js",
        "id": "com.salesforce.util.logger"
    },
    {
        "file": "plugins/com.salesforce/www/com.salesforce.util.push.js",
        "id": "com.salesforce.util.push"
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.ionic.keyboard": "1.0.4",
    "com.phonegap.plugins.PushPlugin": "2.2.1",
    "com.salesforce": "3.2.0",
    "org.apache.cordova.console": "0.2.13",
    "cordova-plugin-whitelist": "1.0.0",
    "org.apache.cordova.device": "0.3.0"
}
// BOTTOM OF METADATA
});