var globalThis = this;

function importClass(className) {
    globalThis[className.substring(className.lastIndexOf(".") + 1)] = Java.type(className);
}

importClass("net.minecraft.ItemStack");
importClass("net.minecraft.nbt.NBTTagCompound");

importClass("net.minecraftforge.fluids.FluidRegistry");
importClass("net.minecraftforge.fluids.FluidStack");

function parseNBTString(nbtStr) {
    return Java.type("net.minecraft.nbt.JsonToNBT").func_180713_a(nbtStr);
}

function makeItemStack(id, count, meta, nbtDataStr) {
    if(id.getClass() === ItemStack.class) return id;
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
    return new ItemStack(Java.type("net.minecraft.item.Item").func_111206_d(id),
        count || 1, meta || 0, parseNBTString(nbtDataStr || "{}"));
}

function makeFluidStack(id, amount) {
    if(id.getClass() === FluidStack.class) return id;
    if(Array.isArray(id)) {
        amount = id[1];
        id = id[0];
    } else if(typeof id === "object") {
        amount = id.amount;
        id = id.id;
    }
    return FluidRegistry.getFluidStack(id, amount);
}