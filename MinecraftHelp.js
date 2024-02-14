var globalThis = this;
load("https://kingjango13.github.io/CustomNPCs-Scripts/MCPMappings.js")

function importClass(className) {
    globalThis[className.substring(className.lastIndexOf(".") + 1)] = Java.type(className);
}

importClass("net.minecraft.item.ItemStack");
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
    return new ItemStack(getStaticProperty("net.minecraft.item.Item.getByNameOrId")(id),
        count || 1, meta || 0, parseNBTString(nbtDataStr || "{}"));
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