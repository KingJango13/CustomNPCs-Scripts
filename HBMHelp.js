function addCentrifugeRecipe(input, outputs) {
    var makeStack = function(id, count = 1) {
        return new (Java.type("net.minecraft.item.ItemStack"))(Java.type("net.minecraft.item.Item").func_111206_d(id), count);
    }
    var cRecipes = Java.type("com.hbm.inventory.CentrifugeRecipes");
    var inputStack = makeStack(input);
    if(cRecipes.getOutput(inputStack) != null) {
        cRecipes.removeRecipe(inputStack);
    }
    var outputItems = [];
    for(var i = 0; i < outputs.length; i++) {
        outputItems.push(makeStack(outputs[i][0], outputs[i][1]));
    }
    cRecipes.addRecipe(inputStack, Java.to(outputItems, "net.minecraft.item.ItemStack[]"))
}