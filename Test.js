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

/**
 * 
 * @param {event.ForgeEvent.InitEvent} event 
 */
function forgeInit(event) {
    event.API.getIWorld(0).broadcast("FORGE INIT");
    event.API.executeCommand(event.API.getIWorld(0), "say hi");
}

/**
 * 
 * @param {event.PlayerEvent.LoginEvent} event 
 */
function login(event) {
    
}