var MAPPINGS = {
    net: {
        minecraft: {
            enchantment: {
                Enchantment: {
                    getMinLevel: "func_77319_d",
                    getMaxEnchantability: "func_77317_b",
                    calcDamageByCreature: "func_152376_a",
                    isCompatibleWith: "func_191560_c",
                    getRarity: "func_77324_c",
                    calcModifierDamage: "func_77318_a",
                    getName: "func_77320_a",
                    getMinEnchantability: "func_77321_a",
                    getEnchantmentByLocation: "func_180305_b",
                    getTranslatedName: "func_77316_c",
                    onUserHurt: "func_151367_b",
                    canApply: "func_92089_a",
                    isTreasureEnchantment: "func_185261_e",
                    onEntityDamaged: "func_151368_a",
                    getEntityEquipment: "func_185260_a",
                    getEnchantmentID: "func_185258_b",
                    getEnchantmentByID: "func_185262_c",
                    getMaxLevel: "func_77325_b",
                    setName: "func_77322_b",
                    isCurse: "func_190936_d"
                }
            },
            entity: {
                player: {
                    EntityPlayerMP: {
                        sendMessage: "func_145747_a"
                    }
                },
                Entity: {
                    fall: "func_180430_e"
                },
                EntityLivingBase: {
                    attackEntityFrom: "func_70097_a"
                }
            },
            item: {
                Item: {
                    getByNameOrId: "func_111206_d"
                },
                ItemStack: {
                    isEmpty: "func_190926_b",
                    registerFixes: "func_189868_a",
                    splitStack: "func_77979_a",
                    getItem: "func_77973_b",
                    onItemUse: "func_179546_a",
                    getDestroySpeed: "func_150997_a",
                    useItemRightClick: "func_77957_a",
                    onItemUseFinish: "func_77950_b",
                    writeToNBT: "func_77955_b",
                    getMaxStackSize: "func_77976_d",
                    isStackable: "func_77985_e",
                    isItemStackDamageable: "func_77984_f",
                    getHasSubtypes: "func_77981_g",
                    isItemDamaged: "func_77951_h",
                    getItemDamage: "func_77952_i",
                    getMetadata: "func_77960_j",
                    setItemDamage: "func_77964_b",
                    getMaxDamage: "func_77958_k",
                    attemptDamageItem: "func_96631_a",
                    damageItem: "func_77972_a",
                    hitEntity: "func_77961_a",
                    onBlockDestroyed: "func_179548_a",
                    canHarvestBlock: "func_150998_b",
                    interactWithEntity: "func_111282_a",
                    copy: "func_77946_l",
                    areItemStackTagsEqual: "func_77970_a",
                    areItemStacksEqual: "func_77989_b",
                    areItemsEqual: "func_179545_c",
                    areItemsEqualIgnoreDurability: "func_185132_d",
                    isItemEqual: "func_77969_a",
                    isItemEqualIgnoreDurability: "func_185136_b",
                    getTranslationKey: "func_77977_a",
                    updateAnimation: "func_77945_a",
                    onCrafting: "func_77980_a",
                    getMaxItemUseDuration: "func_77988_m",
                    getItemUseAction: "func_77975_n",
                    onPlayerStoppedUsing: "func_77974_b",
                    hasTagCompound: "func_77942_o",
                    getTagCompound: "func_77978_p",
                    getOrCreateSubCompound: "func_190925_c",
                    getSubCompound: "func_179543_a",
                    removeSubCompound: "func_190919_e",
                    getEnchantmentTagList: "func_77986_q",
                    setTagCompound: "func_77982_d",
                    getDisplayName: "func_82833_r",
                    setTranslatableName: "func_190924_f",
                    setStackDisplayName: "func_151001_c",
                    clearCustomName: "func_135074_t",
                    hasDisplayName: "func_82837_s",
                    getTooltip: "func_82840_a",
                    hasEffect: "func_77962_s",
                    getRarity: "func_77953_t",
                    isItemEnchantable: "func_77956_u",
                    addEnchantment: "func_77966_a",
                    isItemEnchanted: "func_77948_v",
                    setTagInfo: "func_77983_a",
                    canEditBlocks: "func_82835_x",
                    isOnItemFrame: "func_82839_y",
                    setItemFrame: "func_82842_a",
                    getItemFrame: "func_82836_z",
                    getRepairCost: "func_82838_A",
                    setRepairCost: "func_82841_c",
                    getAttributeModifiers: "func_111283_C",
                    addAttributeModifier: "func_185129_a",
                    getTextComponent: "func_151000_E",
                    canDestroy: "func_179544_c",
                    canPlaceOn: "func_179547_d",
                    getAnimationsToGo: "func_190921_D",
                    setAnimationsToGo: "func_190915_d",
                    getCount: "func_190916_E",
                    setCount: "func_190920_e",
                    grow: "func_190917_f",
                    shrink: "func_190918_g"
                }
            },
            nbt: {
                NBTBase: {
                    NBT_TYPES: "field_82578_b",
                    write: "func_74734_a",
                    getId: "func_74732_a",
                    copy: "func_74737_b"
                },
                NBTPrimitive: {
                    getLong: "func_150291_c",
                    getInt: "func_150287_d",
                    getShort: "func_150289_e",
                    getByte: "func_150290_f",
                    getDouble: "func_150286_g",
                    getFloat: "func_150288_h"
                },
                NBTTagCompound: {
                    getKeySet: "func_150296_c",
                    getSize: "func_186856_d",
                    setTag: "func_74782_a",
                    setByte: "func_74774_a",
                    setShort: "func_74777_a",
                    setInteger: "func_74768_a",
                    setLong: "func_74772_a",
                    setUniqueId: "func_186854_a",
                    getUniqueId: "func_186857_a",
                    hasUniqueId: "func_186855_b",
                    setFloat: "func_74776_a",
                    setDouble: "func_74780_a",
                    setString: "func_74778_a",
                    setByteArray: "func_74773_a",
                    setIntArray: "func_74783_a",
                    setBoolean: "func_74757_a",
                    getTag: "func_74781_a",
                    getTagId: "func_150299_b",
                    hasKey: "func_150297_b",
                    getByte: "func_74771_c",
                    getShort: "func_74765_d",
                    getInteger: "func_74762_e",
                    getLong: "func_74763_f",
                    getFloat: "func_74760_g",
                    getDouble: "func_74769_h",
                    getString: "func_74779_i",
                    getByteArray: "func_74770_j",
                    getIntArray: "func_74759_k",
                    getCompoundTag: "func_74775_l",
                    getTagList: "func_150295_c",
                    getBoolean: "func_74767_n",
                    merge: "func_179237_a"
                },
                NBTTagList: {
                    appendTag: "func_74742_a",
                    set: "func_150304_a",
                    removeTag: "func_74744_a",
                    getCompoundTagAt: "func_150305_b",
                    getIntAt: "func_186858_c",
                    getIntArrayAt: "func_150306_c",
                    getDoubleAt: "func_150309_d",
                    getFloatAt: "func_150308_e",
                    getStringTagAt: "func_150307_f",
                    tagCount: "func_74745_c"
                },
                NBTTagString: {
                    getString: "func_150285_a_",
                    quoteAndEscape: "func_193588_a"
                }
            },
            server: {
                management: {
                    PlayerList: {
                        addOp: "func_152605_a",
                        getPlayerByUsername: "func_152612_a",
                        getOppedPlayerNames: "func_152606_n",
                        getOppedPlayers: "func_152603_m"
                    },
                    PlayerProfileCache: {
                        getGameProfileForUsername: "func_152655_a"
                    },
                    UserList: {
                        removeEntry: "func_152684_c"
                    }
                },
                MinecraftServer: {
                    getPlayerList: "func_184103_al",
                    getPlayerProfileCache: "func_152358_ax"
                }
            },
            util: {
                DamageSource: {
                    causePlayerDamage: "func_76365_a"
                }
            },
            world: {
                World: {
                    getMinecraftServer: "func_73046_m"
                }
            }
        }
    },
    getClassFromPath: function(path) {
        if(path.length === 0) return MAPPINGS;
        path = path.split(".");
        var clazz = MAPPINGS;
        for(var i = 0; i < path.length; i++) {
            if(clazz == null) return null;
            clazz = clazz[path[i]];
        }
        return clazz || null;
    },
    getObfuscatedName: function(fullPathOrObj, deobfName) {
        if(typeof fullPathOrObj === "object") {
            return this.getObfuscatedName(getObjClass(fullPathOrObj).getName() + "." + deobfName);
        }
        var path = fullPath.split(".");

        var name = MAPPINGS;
        for(var i = 0; i < path.length; i++) {
            if(name == null) break;
            name = name[path[i]];
        }
        return name || path.pop();
    }
}

function getObjClass(obj) {
    return typeof obj.getClass === "function" ? obj.getClass() : obj.class;
}

function obf(fullPathOrObj, deobfName) {
    return MAPPINGS.getObfuscatedName(fullPathOrObj, deobfName);
}

function getStaticProperty(fullPathOrClassPathOrObj, deobfName) {
    if(deobfName == null) {
        fullPathOrClassPathOrObj = fullPathOrClassPathOrObj.split(".");
        deobfName = fullPathOrClassPathOrObj.pop();
        fullPathOrClassPathOrObj = fullPathOrClassPathOrObj.join(".");
    }
    if(typeof fullPathOrClassPathOrObj === "object") {
        fullPathOrClassPathOrObj = getObjClass(fullPathOrClassPathOrObj);
    }
    return Java.type(fullPathOrClassPathOrObj)[fullPathOrClassPathOrObj + "." + deobfName];
}