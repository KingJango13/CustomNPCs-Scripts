/**
 * 
 * @returns {entity.IPlayer[]}
 */
function getAllPlayers(){
    var allPlayers = [], worlds = Java.type("noppes.npc.api.wrapper.NpcAPIWrapper").Instance().getIWorlds();
    for (var i = 0; i < worlds.length; i++){
        var players = worlds[i].getAllPlayers();
        for(var j = 0; j < players.length; j++){
            allPlayers.push(players[j]);
        }
    }
    return allPlayers;
}

/**
 * 
 * @param {event.PlayerEvent.DiedEvent} event 
 */
function died(event) {
    var test = event.player.getNbt().getMCNBT().copy();
}