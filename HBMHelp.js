load("./MinecraftHelp.js");

importClass("com.hbm.inventory.CentrifugeRecipes");
importClass("com.hbm.inventory.SILEXRecipes");
importClass("com.hbm.inventory.DiFurnaceRecipes");
importClass("com.hbm.inventory.CrystallizerRecipes");
importClass("com.hbm.inventory.ShredderRecipes");
importClass("com.hbm.inventory.RBMKOutgasserRecipes");
importClass("com.hbm.inventory.BreederRecipes");
importClass("com.hbm.inventory.RecipesCommon");
importClass("com.hbm.inventory.BedrockOreRegistry");

function addCentrifugeRecipe(input, outputs) {
    var inputStack = makeItemStack(input);
    if(CentrifugeRecipes.getOutput(inputStack) != null) {
        CentrifugeRecipes.removeRecipe(inputStack);
    }
    var outputItems = [];
    for(var i = 0; i < outputs.length; i++) {
        outputItems.push(makeItemStack(outputs[i]));
    }
    CentrifugeRecipes.addRecipe(inputStack, Java.to(outputItems, "net.minecraft.item.ItemStack[]"))
}
var SILEX_WAVE_LENGTHS = {
    RADIO: 0,
    MICROWAVE: 1,
    INFRARED: 2,
    VISIBLE: 3,
    ULTRAVIOLET: 4,
    XRAY: 5,
    GAMMA: 6,
    DIGAMMA: 7
};
function addSILEXRecipe(input, waveLength, solution, consumption, outputs) {
    if(typeof waveLength === "string") {
        waveLength = SILEX_WAVE_LENGTHS[waveLength.toUpperCase()];
    }
    input = makeItemStack(input);
    if(SILEXRecipes.getOutput(input) != null) {
        SILEXRecipes.removeRecipe(input);
    }
    var outputItems = [], outputWeights = [];
    for(var i = 0; i < outputs.length; i++) {
        outputItems.push(makeItemStack(outputs[i][0]));
        outputWeights.push(outputs[i][1]);
    }
    SILEXRecipes.addRecipe(
        waveLength,
        solution,
        consumption,
        input,
        Java.to(outputItems, "net.minecraft.item.ItemStack[]"),
        Java.to(outputWeights, "int[]")
    );
}

function addBlastFurnaceRecipe(input1, input2, output) {
    input1 = makeItemStack(input1);
    input2 = makeItemStack(input2);
    if(DiFurnaceRecipes.getFurnaceProcessingResult(input1, input2) != null) {
        DiFurnaceRecipes.removeRecipe(input1, input2);
    }
    DiFurnaceRecipes.addRecipe(input1, input2, makeItemStack(output));
}

function addBlastFurnaceFuel(fuelItem, power) {
    DiFurnaceRecipes.addFuel(makeItemStack(fuelItem), power);
}

function addCrystallizerRecipe(input, fluidName, fluidAmount, output) {
    if(typeof input !== "string" || input.indexOf(":") == -1) {
        input = makeItemStack(input);
    }
    CrystallizerRecipes.addRecipe(input, FluidRegistry.getFluidStack(fluidName, fluidAmount), makeItemStack(output));
}

function setShredderRecipe(input, output) {
    ShredderRecipes.setRecipe(makeItemStack(input), makeItemStack(output));
}

function addRBMKOutgasserRecipe(input, flux, output) {
    RBMKOutgasserRecipes.addRecipe(flux, makeItemStack(input), makeItemStack(output));
}

function addBreederRecipe(input, heat, output) {
    BreederRecipes.addRecipe(new RecipesCommon.CompareableStack(makeItemStack(input)), makeItemStack(output), heat);
}

function addBreederFuel(fuelItem, heat, breedingReactorUses) {
    BreederRecipes.addFuel(new RecipesCommon.CompareableStack(makeItemStack(fuelItem)), heat, breedingReactorUses);
}

function getBedrockOreInfo(oreName) {
    var tier = BedrockOreRegistry.getOreTier(oreName);
    var fluid = BedrockOreRegistry.getFluidRequirement(tier);
    return {
        index: BedrockOreRegistry.getOreIndex(oreName),
        tier: tier,
        color: Number(BedrockOreRegistry.getOreColor(oreName)).toString(16),
        FluidName: FluidRegistry.getFluidName(fluid.getFluid()),
        Amount: fluid.amount,
        toBlockNBT: function() {
            var nbt = new NBTTagCompound();
            nbt.func_74778_a("ore", oreName);
            nbt.func_74768_a("tier", tier);
            nbt.func_74768_a("color", BedrockOreRegistry.getOreColor(oreName));
            return BedrockOreRegistry.getFluidRequirement(tier).writeToNBT(nbt);
        }
    }
}