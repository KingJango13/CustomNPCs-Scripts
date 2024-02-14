const fs = require("fs");
/**
 * 
 * @param {string} funcName 
 */
module.exports = function(funcName) {
    let splitPath = funcName.split(".");
    let mapping = require("C:/Users/woode/OneDrive/Desktop/Coding/CustomNPCs Scripts/Forge_Obfuscator"
        + splitPath.slice(0, splitPath.length - 1) + ".json");
    return mapping(splitPath[splitPath.length - 1]); 
}