/// <reference path="API/index.d.ts" />
//load("http://127.0.0.1:5500/MinecraftHelp.js")
load("https://kingjango13.github.io/CustomNPCs-Scripts/MinecraftHelp.js");

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
 * @param {entity.IPlayer | net.minecraft.entity.player.EntityPlayer} player 
 */
function getJangoData(player) {
    if(isIPlayer(player)) {
        player = player.getMCEntity();
    }
    var data = player.getEntityData();
    if(!data.func_150297_b("jango", getNBTTypeID("COMPOUND"))) {
        data.func_74782_a("jango", new NBTTagCompound());
    }
    return data.func_74775_l("jango");
}

/**
 * 
 * @param {event.PlayerEvent.LoginEvent} event 
 */
function login(event) {
    getJangoData(event.player);
}

function stringifyPos(xOrPos, y, z) {
    if(Array.isArray(xOrPos)) return stringifyPos(xOrPos[0], xOrPos[1], xOrPos[2]);
    if(typeof xOrPos === "object") return stringifyPos(xOrPos.x, xOrPos.y, xOrPos.z);
    return "[" + xOrPos + ", " + y + ", " + z + "]";
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
        p.message("    jstats giveItem <playerName> <itemID> <count?> <meta?> <nbt?>");
        p.message("    jstats gm [0,1,2,3]");
        p.message("    jstats hbm_repairgun <slot?>");
        p.message("    jstats inf_ammo <slot?>");
        p.message("    jstats itemNBT get <slot?>");
        p.message("    jstats itemNBT merge <nbt> <slot?>");
        p.message("    jstats reloadPlayerData");
        p.message("    jstats toggleOp");
        p.message("    jstats tp player <playerName>");
        p.message("    jstats tp pos <x> <y> <z>");
        p.message("    jstats unbreakable <slot?>");
        p.message("    jstats waypoint <subcommand>");
        p.message("    jstats xp <amount>");
    }
    var intArg = function(index) {
        return msgArgs[index] != null ? parseInt(msgArgs[index]) : null;
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
            var item;
            if(msgArgs.length < 3) {
                item = event.API.getIItemStack(getSelectedItem(p));
            } else {
                item = p.getInventory().getSlot(intArg(2));
            }
            var modID = item.getItemNbt().getString("id").split(":")[0];
            var gunNbt = item.getNbt();
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
            var item;
            if(msgArgs.length < 3) {
                item = event.API.getIItemStack(getSelectedItem(p));
            } else {
                item = p.getInventory().getSlot(intArg(2));
            }
            item.getNbt().setInteger("wear", -2147483648);
            break;
        }
        case "unbreakable": {
            var item;
            if(msgArgs.length < 3) {
                item = event.API.getIItemStack(getSelectedItem(p));
            } else {
                item = p.getInventory().getSlot(intArg(2));
            }
            item.getNbt().setBoolean("Unbreakable",true);
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
            if(!getJangoData(p).func_150297_b("waypoints", getNBTTypeID("COMPOUND"))) {
                getJangoData(p).func_74782_a("waypoints", new NBTTagCompound());
            }
            var waypoints = getJangoData(p).func_74775_l("waypoints");
            switch(msgArgs[2]) {
                case "set": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint set <name> <x?> <y?> <z?>");
                        break;
                    }
                    var parseCoord = function(argIndex, _default) {
                        if(msgArgs.length <= argIndex) return _default;
                        var tildeIndex = msgArgs[argIndex].indexOf("~");
                        if(tildeIndex === 0) {
                            return _default + parseInt(msgArgs[argIndex].substring(1))
                        }
                        return intArg(argIndex);
                    };
                    if(waypoints.func_150297_b(msgArgs[3], getNBTTypeID("COMPOUND"))) {
                        p.message("You already have a waypoint named \"" + msgArgs[3] + "\"");
                        p.message("You must delete or rename this before setting the waypoint");
                        break;
                    }
                    var x = parseCoord(4, p.getBlockX());
                    var y = parseCoord(5, p.getBlockY());
                    var z = parseCoord(6, p.getBlockZ());
                    var dim = p.getWorld().getDimension();
                    p.message("Setting waypoint \"" + msgArgs[3] + "\" in dimension " + dim.getName() + " to " + stringifyPos(x, y, z));
                    getJangoData(p).func_74775_l("waypoints").func_74782_a(msgArgs[3], posToNBT(x, y, z, dim.getId()));
                    break;
                }
                case "tp": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint tp <name>");
                        break;
                    }
                    var targetName = msgArgs[3];
                    if(!waypoints.func_150297_b(targetName, getNBTTypeID("COMPOUND"))) {
                        p.message("You have no waypoint named \"" + targetName + "\"");
                        break;
                    }
                    var waypoint = posFromNBT(waypoints.func_74775_l(targetName));
                    if(waypoint.dim !== p.getWorld().getDimension().getId()) {
                        p.message("Cross-dimensional teleportation is not yet supported");
                        break;
                    }
                    p.message("Teleporting to waypoint \"" + targetName + "\"...");
                    p.setPos(event.API.getIPos(waypoint.x, waypoint.y, waypoint.z));
                    break;
                }
                case "list": {
                    p.message("Your waypoints:");
                    var wps = waypoints.func_150296_c();
                    var wayPointNames = wps.toArray(javaArray("java.lang.String", wps.size()));
                    for(var i = 0; i < wayPointNames.length; i++) {
                        var wp = posFromNBT(waypoints.func_74775_l(wayPointNames[i]));
                        p.message(wayPointNames[i] + ": " + stringifyPos(wp) + " (" + event.API.getIWorld(wp.dim).getDimension().getName() + ")");
                    }
                    p.message("");
                    break;
                }
                case "remove": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint remove <name>");
                        break;
                    }
                    var targetName = msgArgs[3];
                    if(!waypoints.func_150297_b(targetName, getNBTTypeID("COMPOUND"))) {
                        p.message("You have no waypoint named \"" + targetName + "\"");
                        break;
                    }
                    p.message("Removing waypoint \"" + targetName + "\"");
                    waypoints.func_82580_o(targetName);
                    break;
                }
                case "distanceTo": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats waypoint distanceTo <name>");
                        break;
                    }
                    var targetName = msgArgs[3];
                    if(!waypoints.func_150297_b(targetName, getNBTTypeID("COMPOUND"))) {
                        p.message("You have no waypoint named \"" + targetName + "\"");
                        break;
                    }
                    var wp = posFromNBT(waypoints.func_74775_l(targetName));
                    if(p.getWorld().getDimension().getId() !== wp.dim) {
                        p.message("Unable to measure distance across dimensions");
                        break;
                    }
                    var dX = wp.x - p.getBlockX();
                    var dY = wp.y - p.getBlockY();
                    var dZ = wp.z - p.getBlockZ();
                    var distanceStr = (Math.round(Math.sqrt(dX*dX + dY*dY + dZ*dZ) * 100) / 100).toString();
                    var decimalIndex = distanceStr.indexOf(".");
                    if(decimalIndex !== -1) {
                        distanceStr = distanceStr.substring(0, decimalIndex + 3);
                    }
                    p.message("Waypoint " + targetName + " is " + distanceStr + " blocks away");
                    break;
                }
                case "rename": {
                    if(msgArgs.length < 5) {
                        p.message("Usage: jstats waypoint rename <oldName> <newName>");
                        break;
                    }
                    if(!waypoints.func_150297_b(msgArgs[3])) {
                        p.message("You have no waypoint named \"" + msgArgs[3] + "\"");
                        break;
                    }
                    if(waypoints.func_150297_b(msgArgs[4])) {
                        p.message("You already have a waypoint named \"" + msgArgs[4] + "\"");
                        p.message("You must delete or rename this before renaming the other waypoint");
                        break;
                    }
                    p.message("Renaming waypoint \"" + msgArgs[3] + "\" to \"" + msgArgs[4] + "\"");
                    waypoints.func_74782_a(msgArgs[4], waypoints.func_74775_l(msgArgs[3]));
                    waypoints.func_82580_o(msgArgs[3]);
                    break;
                }
                default: {
                    p.message("Usage:");
                    p.message("    jstats waypoint distanceTo <name>");
                    p.message("    jstats waypoint list");
                    p.message("    jstats waypoint remove <name>");
                    p.message("    jstats waypoint rename <oldName> <newName>");
                    p.message("    jstats waypoint set <name> <x?> <y?> <z?>");
                    p.message("    jstats waypoint tp <name>");
                    break;
                }
            }
            break;
        }
        case "itemNBT": {
            switch(msgArgs[2]) {
                case "merge": {
                    if(msgArgs.length < 4) {
                        p.message("Usage: jstats itemNBT merge <nbt>");
                        break;
                    }
                    /**
                     * @type {INbt}
                     */
                    var nbtSrc;
                    try {
                        nbtSrc = event.API.stringToNbt(msgArgs.slice(3).join(" "));
                    } catch (error) {
                        p.message("Unable to parse NBT");
                        break;
                    }
                    event.API.getIItemStack(getSelectedItem(p)).getNbt().getMCNBT().func_179237_a(nbtSrc.getMCNBT());
                    break;
                }
                case "get": {
                    var item;
                    if(msgArgs.length >= 4) {
                        item = p.getInventory().getSlot(intArg(3));
                    } else {
                        item = event.API.getIItemStack(getSelectedItem(p));
                    }
                    p.message(item.getDisplayName() + " (" + item.getItemNbt().getString("id") + ") has the following data:");
                    p.message(item.getNbt().toJsonString());
                    break;
                }
                default: {
                    p.message("Usage:");
                    p.message("    jstats itemNBT get <slot?>");
                    p.message("    jstats itemNBT merge <nbt> <slot?>");
                    break;
                }
            }
            break;
        }
        case "giveItem": {
            if(msgArgs.length < 4) {
                p.message("Usage: jstats giveItem <playerName> <itemID> <count?> <meta?> <nbt?>");
                break;
            }
            giveItem(p, msgArgs[2], msgArgs[3], intArg(4), intArg[5], msgArgs[6]);
            break;
        }
        default: {
            disp_help();
            break;
        }
    }
    event.setCanceled(true);
}

/**
 *  
 * @param {entity.IPlayer} sender
 * @param {string | entity.IPlayer} targetPlayer 
 * @param {string | item.IItemStack | net.minecraft.item.ItemStack} itemID 
 * @param {number?} count 
 * @param {number?} meta 
 * @param {string?} nbt 
 */
function giveItem(sender, targetPlayer, itemID, count, meta, nbt) {
    if(targetPlayer === "@a") {
        forAllPlayers(function(p){
            giveItem(sender, p, itemID, count, meta, nbt);
        });
        return;
    }
    if(targetPlayer === "@s" || targetPlayer === "@p")
        return giveItem(sender, sender, itemID, count, meta, nbt);

    if(typeof targetPlayer === "string") {
        var targetPlayerName = targetPlayer;
        targetPlayer = getPlayerByName(targetPlayer);
        if(targetPlayer != null) {
            giveItem(sender, targetPlayer, itemID, count, meta, nbt);
        } else {
            sender.message("Player " + targetPlayerName + " not found");
        }
        return;
    }
    // if(isInstanceOf(targetPlayer, "noppes.npcs.api.entity.IPlayer")) {
    //     targetPlayer = targetPlayer.getMCEntity();
    // }
    if(count == null) {
        count = 1;
    }
    if(typeof itemID === "string") {
        itemID = makeItemStack(itemID, count, meta, nbt);
    } else if(isInstanceOf(itemID, "noppes.npcs.api.item.IItemStack")) {
        itemID = itemID.getMCItemStack();
    }
    targetPlayer.getMCEntity().field_71071_by.func_191975_a(targetPlayer.getWorld().getMCWorld(), itemID);
}