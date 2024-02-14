/**
 * 
 * @param {event.ItemEvent.InitEvent} event 
 */
function init(event) {
    event.item.setTexture(1, "hbm:elec_sword");
    event.item.setItemDamage(1);
}

/**
 * 
 * @param {event.ItemEvent.AttackEvent} event 
 */
function attack(event) {
    if(event.type === 1) {
        event.target.getMCEntity().func_70097_a(Java.type("net.minecraft.util.DamageSource").func_76365_a(event.player.getMCEntity()), 1e9);
    }
}