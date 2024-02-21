var globalThis = this;
load("https://kingjango13.github.io/CustomNPCs-Scripts/MCPMappings.js");

if(!globalThis.NpcAPI) {
    globalThis.NpcAPI = Java.type("noppes.npcs.api.wrapper.WrapperNpcAPI");
}

function importClass(className) {
    globalThis[className.substring(className.lastIndexOf(".") + 1)] = Java.type(className);
}

/**
 * @type {typeof net.minecraft.item.ItemStack}
 */
var ItemStack = Java.type("net.minecraft.item.ItemStack");
/**
 * @type {typeof net.minecraft.item.Item}
 */
var Item = Java.type("net.minecraft.item.Item");
importClass("net.minecraft.nbt.NBTTagCompound");

importClass("net.minecraftforge.fluids.FluidRegistry");

function parseNBTString(nbtStr) {
    return getStaticProperty("net.minecraft.nbt.JsonToNBT.getTagFromJson")(nbtStr);
}

function isInstanceOf(value, javaClass) {
    if(typeof javaClass === "string") {
        javaClass = Java.type(javaClass);
    }
    return value != null && typeof value.getClass === "function" && value.getClass() === javaClass.class;
}

/**
 * 
 * @param {net.minecraft.item.ItemStack | [string, number?, number?, string?] | {id: string; count?: number; amount?: number; meta?: number; nbtDataStr?: string;} | string} id 
 * @param {number?} count 
 * @param {number?} meta 
 * @param {string?} nbtDataStr 
 * @returns 
 */
function makeItemStack(id, count, meta, nbtDataStr) {
    if(isInstanceOf(id, ItemStack)) return id;
    if(Array.isArray(id)) {
        count = id[1];
        meta = id[2];
        nbtDataStr = id[3];
        id = id[0];
    } else if(typeof id === "object") {
        count = id.count || id.amount;
        meta = id.meta;
        nbtDataStr = id.nbtDataStr;
        id = id.id;
    }
    var item = new ItemStack(Item.func_111206_d(id), count || 1, meta || 0);
    if(nbtDataStr != null) {
        item.func_77982_d(parseNBTString(nbtDataStr));
    }
    return item;
}

function makeFluidStack(id, amount) {
    if(isInstanceOf(id, "net.minecraftforge.fluids.FluidStack")) return id;
    if(Array.isArray(id)) {
        amount = id[1];
        id = id[0];
    } else if(typeof id === "object") {
        amount = id.amount;
        id = id.id;
    }
    return FluidRegistry.getFluidStack(id, amount);
}

/**
 * 
 * @param {(this: {breakLoop: () => void}, player: entity.IPlayer) => void} func 
 */
function forAllPlayers(func) {
    var worlds = NpcAPI.Instance().getIWorlds();
    for(var i = 0; i < worlds.length; i++) {
        var players = worlds[i].getAllPlayers();
        for(var j = 0; j < players.length; j++) {
            var isLoopCanceled = false;
            func.call({
                breakLoop: function() {
                    isLoopCanceled = true;
                }
            }, players[j]);
            if(isLoopCanceled) return;
        }
    }
}

/**
 * 
 * @returns {entity.IPlayer[]}
 */
function getAllPlayers() {
    var allPlayers = [];
    forAllPlayers(function(p){
        allPlayers.push(p);
    });
    return allPlayers;
}

/**
 * 
 * @param {(player: entity.IPlayer) => boolean} predicate 
 * @returns {entity.IPlayer | null}
 */
function getPlayer(predicate) {
    var player = null;
    forAllPlayers(function(p){
        if(predicate(p)) {
            player = p;
            this.breakLoop();
            return;
        }
    });
    return player;
}

function getPlayerByName(name) {
    return getPlayer(function(p) {
        return p.getDisplayName() === name;
    });
}

/**
 * 
 * @param {entity.IPlayer | net.minecraft.entity.player.EntityPlayer} player 
 * @returns {net.minecraft.item.ItemStack}
 */
function getSelectedItem(player) {
    if(typeof player.getMCEntity === "function") {
        player = player.getMCEntity();
    }
    if(player.inventory != null && typeof player.inventory.getCurrentItem === "function")
        return player.inventory.getCurrentItem();
    return player.field_71071_by.func_70448_g();
}