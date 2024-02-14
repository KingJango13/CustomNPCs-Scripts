/**
 * 
 * @param {event.CustomNPCsEvent} event 
 * @returns {entity.IPlayer[]}
 */
function getAllPlayers(event){
    var allPlayers = [], worlds = event.API.getIWorlds();
    for (var i = 0; i < worlds.length; i++){
        var players = worlds[i].getAllPlayers();
        for(var j = 0; j < players.length; j++){
            allPlayers.push(players[j]);
        }
    }
    return allPlayers;
}

function opPlayer(server, playerName) {}

/**
 * 
 * @param {event.ItemEvent.AttackEvent} event 
 */
function attack(event) {
    event.item.setTexture();
    event.player.damage()
}