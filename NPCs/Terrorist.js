/**
 * 
 * @param {event.ProjectileEvent.ImpactEvent} event 
 */
function projectileImpact(event){
    event.projectile.despawn();
    
}

/**
 * 
 * @param {event.NpcEvent.DiedEvent} event 
 */
function died(event){
    var npc = event.npc;
    npc.getTimers().start(0, 100, false);
    npc.getTimers().start(1, 20, false);
    npc.getTimers().start(2, 40, false);
    npc.getTimers().start(3, 50, false);
    npc.getTimers().start(4, 60, false);
    npc.getTimers().start(5, 70, false);
    npc.getTimers().start(6, 75, false);
    npc.getTimers().start(7, 80, false);
    npc.getTimers().start(8, 83, false);
    npc.getTimers().start(9, 86, false);
    npc.getTimers().start(10, 89, false);
    npc.getTimers().start(11, 91, false);
    npc.getTimers().start(12, 93, false);
    npc.getTimers().start(13, 95, false);
    npc.getTimers().start(14, 97, false);
    npc.getTimers().start(15, 99, false);
    npc.say("ALLAHU ACKBAR!");
}

/**
 * 
 * @param {event.NpcEvent.TimerEvent} event 
 */
function timer(event){
    var npc = event.npc;
    var world = npc.getWorld(), x = npc.getX(), y = npc.getY(), z = npc.getZ();
    switch(event.id){
        case 0: {
            world.explode(x, y, z, 5, false, false);
            world.spawnParticle("minecraft:flame", x, y, z, 0, 0, 0, 0.5, 500);
            world.spawnParticle("minecraft:campfire_signal_smoke", x, y, z, 0.1, 0.1, 0.1, 0.1, 300);
            world.spawnParticle("minecraft:campfire_signal_smoke", x, y, z, 0.1, 0.1, 0.1, 0.05, 300);
            npc.despawn();
            break;
        }
        default: {
            world.playSoundAt(npc.getPos(), "minecraft:block.note_block.bit", 1, 2);
            break;
        }
    }
}