interface INbt {
    /**
     * Clears all tags
     */
    clear(): void;
    getBoolean(key: String): boolean;
    getByte(key: String): number;
    getByteArray(key: String): number[];
    getCompound(key: String): INbt;
    getDouble(key: String): number;
    getFloat(key: String): number;
    getInteger(key: String): number;
    getIntegerArray(key: String): number[];
    /**
     * Get the names of all keys for the NBT tag
     */
    getKeys(): String[];
    /**
     * 
     * @param key
     * @param type - Type of the list. 3: int, 5: float, 6: double, 8: String, 10: INbt, 11: int[]
     */
    getList(key: String, type: number): Object[];
    /**
     * 
     * @param key
     * @returns 3: int, 5: float, 6: double, 8: String, 10: INbt, 11: int[]
     */
    getListType(key: String): number;
    getLong(key: String): number;
    getMCNBT(): net.minecraft.nbt.NBTTagCompound;
    getShort(key: String): number;
    getString(key: String): String;
    /**
     * Get the type of a value stored at a key
     * @param key
     * @returns 1: byte, 2: short, 3: int, 4: long, 5: float, 6: double, 7: byte[], 8: String, 9: List, 10: INbt, 11: int[]
     */
    getType(key: String): number;
    /**
     * Check if the tag has a value for a key
     * @param key
     */
    has(key: String): boolean;
    /**
     * Check for equality to another tag
     * @param nbt - The other tag
     */
    isEqual(nbt: INbt): boolean;
    /**
     * Add all values from another tag to this tag.
     * If the other NBT tag has a value for a key 
     * that exists on this tag, the value on this 
     * tag is updated
     * @param nbt
     */
    merge(nbt: INbt): void;
    remove(key: String): void;
    setBoolean(key: String, bool: boolean): void;
    setByte(key: String, value: number): void;
    setByteArray(key: String, value: number[]): void;
    setCompound(key: String, value: INbt): void;
    setFloat(key: String, value: number): void;
    setInteger(key: String, int: number): void;
    setIntegerArray(key: String, value: number[]): void;
    setList(key: String, value: Object[]): void;
    setLong(key: String, value: number): void;
    setShort(key: String, value: number): void;
    setString(key: String, value: String): void;
    toJsonString(): String;
}

interface IRayTrace {
    getBlock();
    getPos(): IPos;
    getSideHit(): number;
}

interface IPos {
    add(x: number, y: number, z: number): IPos;
    add(pos: IPos): IPos;
    distanceTo(pos: IPos): number;
    down(n?: number): IPos;
    east(n?: number): IPos;
    getMCBlockPos(): net.minecraft.util.math.BlockPos;
    getX(): number;
    getY(): number;
    getZ(): number;
    normalize(): number[];
    north(n?: number): IPos;
    offset(direction: number, n?: number): IPos;
    south(n?: number): IPos;
    subtract(x: number, y: number, z: number): IPos;
    subtract(pos: IPos): IPos;
    up(n?: number): IPos;
    west(n?: number): IPos;
}

interface IDimension {
    getId(): number;
    getName(): String;
    getSuffix(): String;
}

interface IWorld {
    broadcast(message: String): void;
    createEntity(id: String): entity.IEntity;
    createEntityFromNBT(nbt: INbt): entity.IEntity;
    createItem(name: String, damage: number, size: number): item.IItemStack;
    createItemFromNbt(nbt: INbt): item.IItemStack;
    explode(x: number, y: number, z: number, range: number, fire: boolean, grief: boolean): void;
    getAllEntities(type: number): entity.IEntity[];
    getAllPlayers(): entity.IPlayer[];
    getBiomeName(x: number, z: number): String;
    getBlock(x: number, y: number, z: number): block.IBlock;
    getClosestEntity(pos: IPos, range: number, type: number): entity.IEntity;
    getDimension(): IDimension;
    getEntity(uuid: String): entity.IEntity;
    getLightValue(x: number, y: number, z: number): number;
    getMCWorld(): net.minecraft.world.WorldServer;
    getName(): String;
    getNearbyEntities(pos: IPos, range: number, type: number): entity.IEntity[];
    getPlayer(name: String): entity.IPlayer;
    getRedstonePower(x: number, y: number, z: number): number;
    getScoreboard(): IScoreboard;
    getSpawnPoint(): block.IBlock;
    getStoreddata(): entity.data.IData;
    getTempdata(): entity.data.IData;
    getTime(): number;
    getTotalTime(): number;
    isDay(): boolean;
    isRaining(): boolean;
    playSoundAt(pos: IPos, sound: String, volume: number, pitch: number): void;
    removeBlock(x: number, y: number, z: number): void;
    setBlock(x: number, y: number, z: number, name: String, meta: number): void;
    setRaining(bo: boolean): void;
    setSpawnPoint(block: block.IBlock): void;
    setTime(time: number): void;
    spawnEntity(entity: entity.IEntity): void;
    spawnParticle(particle: String, x: number, y: number, z: number, dx: number, dy: number, dz: number, speed: number, count: number): void;
    thunderStrike(x: number, y: number, z: number): void;
}

interface IScoreboard {
    addObjective(objective: String, criteria: String): IScoreboardObjective;
    addTeam(name: String): IScoreboardTeam;
    deletePlayerScore(player: String, objective: String, datatag: String): void;
    getObjective(name: String): IScoreboardObjective;
    getObjectives(): IScoreboardObjective[];
    getPlayerList(): String[];
    getPlayerScore(player: String, objective: String, datatag: String): number;
    getPlayerTeam(player: String): IScoreboardTeam;
    getTeam(name: String): IScoreboardTeam;
    getTeams(): IScoreboardTeam[];
    hasObjective(objective: String): boolean;
    hasPlayerObjective(player: String, objective: String, datatag: String): boolean;
    hasTeam(name: String): boolean;
    removeObjective(objective: String): void;
    removePlayerTeam(player: String): void;
    removeTeam(name: String): void;
    setPlayerScore(player: String, objective: String, score: number, datatag: String): void;
}

interface IScoreboardObjective {
    createScore(player: String): IScoreboardScore;
    getCriteria(): String;
    getDisplayName(): String;
    getName(): String;
    getScore(player: String): IScoreboardScore;
    getScores(): IScoreboardScore[];
    hasScore(player: String): boolean;
    isReadyOnly(): boolean;
    removeScore(player: String): void;
    setDisplayName(name: String): void;
}

interface IScoreboardScore {
    getPlayerName(): String;
    getvalue(): number;
    setValue(val: number): void;
}

interface IScoreboardTeam {
    addPlayer(player: String): void;
    clearPlayers(): void;
    getColor(): String;
    getDisplayName(): String;
    getFriendlyFire(): boolean;
    getName(): String;
    getPlayers(): String[];
    getSeeInvisibleTeamPlayers(): boolean;
    hasPlayer(player: String): boolean;
    removePlayer(player: String): void;
    setColor(color: String): void;
    setDisplayName(name: String): void;
    setFriendlyFire(bo: boolean): void;
    setSeeInvisibleTeamPlayers(bo: boolean): void;
}

interface IContainer {
    /**
     * Count the number of items in the container
     * @param item - Item to count
     * @param ignoreDamage - Whether to ignore an item's damage or not
     * @param ignoreNBT - Whether to ignore an item's NBT data or not
     * 
     * @returns The number of items in the container
     */
    count(item: item.IItemStack, ignoreDamage: boolean, ignoreNBT: boolean): number;
    getItems(): item.IItemStack[];
    getSize(): number;
    /**
     * Get the item at a specified slot
     * @param index
     */
    getSlot(index: number): item.IItemStack;
    /**
     * Set the item at the specified slot in the container
     * @param index
     * @param item
     */
    setSlot(index: number, item: item.IItemStack): void;
}

interface IContainerCustomChest extends IContainer {
    getName(): String;
    setName(name: String): void;
}

interface IDamageSource {
    getImmediateSource(): entity.IEntity;
    getTrueSource(): entity.IEntity;
    getType(): String;
    isProjectile(): boolean;
    isUnblockable(): boolean;
}

interface ITimers {
    clear(): void;
    forceStart(id: number, ticks: number, repeat: boolean): void;
    has(id: number): boolean;
    reset(id: number): void;
    start(id: number, ticks: number, repeat: boolean): void;
    stop(id: number): boolean;
}

interface NpcAPI {
    createCustomGui(id: number, width: number, height: number, pauseGame: boolean): gui.ICustomGui;
    createMail(sender: String, subject: String): entity.data.IPlayerMail;
    createNPC(world: IWorld): entity.ICustomNpc;
    executeCommand(world: IWorld, command: String): String;
    getClones(): handler.ICloneHandler;
    getDialogs(): handler.IDialogHandler;
    getFactions(): handler.IFactionHandler;
    getIBlock(world: net.minecraft.world.World, pos: net.minecraft.util.math.BlockPos): block.IBlock;
    getIItemStack(mcItemStack: net.minecraft.item.ItemStack): item.IItemStack;
    getIPos(x: number, y: number, z: number): IPos;
    getIWorld(dimensionId: number): IWorld;
    getIWorlds(): IWorld[];
    getQuests(): handler.IQuestHandler;
    getRandomName(dictionary: number, gender: number): String;
    getRawPlayerData(uuid: String): INbt;
    hasPermissionNode(permission: String): boolean;
    registerPermissionNode(permission: String, defaultType: number): void;
    spawnNPC(world: IWorld, x: number, y: number, z: number): entity.ICustomNpc;
    stringToNbt(str: String): INbt;
}

declare const NpcAPI: {
    Instance(): NpcAPI;
    IsAvailable(): boolean;
}

declare namespace block {
    interface IBlock {
        blockEvent(type: number, data: number): void;
        getContainer(): IContainer;
        getDisplayName(): String;
        getMetadata(): number;
        getName(): String;
        getPos(): IPos;
        getStoreddata(): entity.data.IData;
        getTempdata(): entity.data.IData;
        getTileEntityNBT(): INbt;
        getWorld(): IWorld;
        getX(): number;
        getY(): number;
        getZ(): number;
        hasTileEntity(): boolean;
        interact(side: number): void;
        isAir(): boolean;
        isContainer(): boolean;
        isRemoved(): boolean;
        remove(): void;
        setBlock(name: String): IBlock;
        setBlock(block: IBlock): IBlock;
        setMetadata(i: number): void;
        setTileEntityNBT(nbt: INbt): void;
    }

    interface IBlockFluidContainer extends IBlock {
        getFluidName(): String;
        getFluidPercentage(): number;
        getFluidValue(): number;
        getFluidDensity(): number;
        getFluidTemperature(): number;
    }

    interface IBlockScripted extends IBlock {
        executeCommand(command: String): String;
        getHardness(): number;
        getIsLadder(): boolean;
        getIsPassible(): boolean;
        getLight(): number;
        getModel(): item.IItemStack;
        getRedstonePower(): number;
        getResistance(): number;
        getRotaionX(): number;
        getRotaionY(): number;
        getRotaionZ(): number;
        getScaleX(): number;
        getScaleY(): number;
        getScaleZ(): number;
        getTextPlane(): ITextPlane;
        getTextPlane2(): ITextPlane;
        getTextPlane3(): ITextPlane;
        getTextPlane4(): ITextPlane;
        getTextPlane5(): ITextPlane;
        getTextPlane6(): ITextPlane;
        getTimers(): ITimers;
        setHardness(hardness: number): void;
        setIsLadder(enabled: boolean): void;
        setLight(value: number): void;
        setModel(name: String): void;
        setModel(item: item.IItemStack);
        setRedstonePower(strength: number): void;
        setResistance(resistance: number): void;
        setRotaion(x: number, y: number, z: number): void;
        setScale(x: number, y: number, z: number): void;
    }

    interface IBlockScriptedDoor extends IBlock {
        getBlockModel(): String;
        getHardness(): number;
        getOpen(): boolean;
        getResistance(): number;
        getTimers(): ITimers;
        setBlockModel(name: String): void;
        setHardness(hardness: number): void;
        setOpen(open: boolean): void;
        setResistance(resistance: number): void;
    }

    interface ITextPlane {
        getOffsetX(): number;
        getOffsetY(): number;
        getOffsetZ(): number;
        getRotaionX(): number;
        getRotaionY(): number;
        getRotaionZ(): number;
        getScale(): number;
        getText(): String;

        setOffsetX(x: number): void;
        setOffsetY(y: number): void;
        setOffsetZ(z: number): void;
        setRotationX(x: number): void;
        setRotationY(y: number): void;
        setRotationZ(z: number): void;
        setScale(scale: number): void;
        setText(text: String): void;
    }
}

declare namespace constants {
    enum AnimationType {
        AIM = 6,
        BOW = 11,
        CRAWL = 7,
        CRY = 9,
        DANCE = 5,
        DEATH = 14,
        HUG = 3,
        NO = 12,
        NORMAL = 0,
        POINT = 8,
        SIT = 1,
        SLEEP = 2,
        SNEAK = 4,
        WAVE = 10,
        YES = 13
    }
    
    enum EntityType {
        ANIMAL = 4,
        ANY = -1,
        ARROW = 10,
        ITEM = 6,
        LIVING = 5,
        MONSTER = 3,
        NPC = 2,
        PIXELMON = 8,
        PLAYER = 1,
        PROJECTILE = 7,
        THROWABLE = 11,
        UNKNOWN = 0,
        VILLAGER = 9
    }
    
    enum GuiComponentType {
        BUTTON = 0,
        ITEM_SLOT = 5,
        LABEL = 1,
        SCROLL = 4,
        TEXT_FIELD = 3,
        TEXTURED_RECT = 2
    }
    
    enum ItemType {
        ARMOR = 3,
        BLOCK = 2,
        BOOK = 1,
        NORMAL = 0,
        SCRIPTED = 6,
        SEEDS = 5,
        SWORD = 4
    }
    
    enum JobType {
        BARD = 1,
        BUILDER = 10,
        CHUNKLOADER = 8,
        CONVERSATION = 7,
        FARMER = 11,
        FOLLOWER = 5,
        GUARD = 3,
        HEALER = 2,
        ITEMGIVER = 4,
        MAXSIZE = 12,
        NONE = 0,
        PUPPET = 9,
        SPAWNER = 6
    }
    
    enum MarkType {
        CROSS = 5,
        EXCLAMATION = 2,
        NONE = 0,
        POINTER = 3,
        QUESTION = 1,
        SKULL = 4,
        STAR = 6
    }
    
    enum OptionType {
        COMMAND_BLOCK = 4,
        DIALOG_OPTION = 1,
        DISABLED = 2,
        QUIT_OPTION = 0,
        ROLE_OPTION = 3
    }
    
    enum ParticleType {
        CRIT = 8,
        ENCHANT = 7,
        LARGE_SMOKE = 5,
        LIGHTNING = 4,
        MAGIC = 6,
        NONE = 0,
        PORTAL = 2,
        REDSTONE = 3,
        SMOKE = 1
    }
    
    enum PotionEffectType {
        BLINDNESS = 7,
        FIRE = 1,
        HUNGER = 3,
        NAUSEA = 6,
        NONE = 0,
        POISON = 2,
        SLOWNESS = 5,
        WEAKNESS = 4,
        WITHER = 8
    }
    
    enum QuestType {
        AREA_KILL = 4,
        DIALOG = 1,
        ITEM = 0,
        KILL = 2,
        LOCATION = 3,
        MANUAL = 5
    }
    
    enum RoleType {
        BANK = 3,
        COMPANION = 6,
        DIALOG = 7,
        FOLLOWER = 2,
        MAILMAn = 5,
        MAXSIZE = 8,
        NONE = 0,
        TRADER = 1,
        TRANSPORTER = 4
    }
    
    enum SideType {
        DOWN = 0,
        EAST = 5,
        NORTH = 2,
        SOUTH = 3,
        UP = 1,
        WEST = 4
    }
    
    enum TacticalType {
        AMBUSH = 4,
        DEFAULT = 0,
        DODGE,
        HITNRUN = 3,
        NONE = 6,
        STALK = 5,
        SURROUND = 2
    }
}

declare namespace entity {
    interface IEntity<T extends net.minecraft.entity.Entity = net.minecraft.entity.Entity> {
        addRider(entity: IEntity): void;
        addTag(tag: String): void;
        clearRiders(): void;
        damage(amount: number): void;
        despawn(): void;
        dropItem(item: item.IItemStack): IEntityItem;
        extinguish(): void;
        generateNewUUID(): String;
        getAge(): number;
        getAllRiders(): IEntity[];
        getBlockX(): number;
        getBlockY(): number;
        getBlockZ(): number;
        getEntityName(): String;
        getEntityNbt(): INbt;
        getEyeHeight(): number;
        getHeight(): number;
        getMCEntity(): T;
        getMotionX(): number;
        getMotionY(): number;
        getMotionZ(): number;
        getMount(): IEntity;
        getName(): String;
        getNbt(): INbt;
        getPitch(): number;
        getPos(): IPos;
        getRiders(): IEntity[];
        getRotation(): number;
        getStoreddata(): data.IData;
        getTags(): String[];
        getTempdata(): data.IData;
        getType(): number;
        getTypeName(): String;
        getUUID(): String;
        getWidth(): number;
        getWorld(): IWorld;
        getX(): number;
        getY(): number;
        getZ(): number;
        hasCustomName(): boolean;
        hasTag(tag: String): boolean;
        inFire(): boolean;
        inLava(): boolean;
        inWater(): boolean;
        isAlive(): boolean;
        isBurning(): boolean;
        isSneaking(): boolean;
        isSprinting(): boolean;
        kill(): void;
        knockback(power: number, direction: number): void;
        playAnimation(type: number): void;
        rayTraceBlock(distance: number, stopOnLiquid: boolean, ignoreBlockWithoutBoundingBox: boolean): IRayTrace;
        rayTraceEntities(distance: number, stopOnLiquid: boolean, ignoreBlockWithoutBoundingBox: boolean): IEntity[];
        removeTag(tag: String): void;
        setBurning(seconds: number): void;
        setEntityNbt(nbt: INbt): void;
        setMotionX(motion: number): void;
        setMotionY(motion: number): void;
        setMotionZ(motion: number): void;
        setMount(entity: IEntity): void;
        setName(name: String): void;
        setPitch(pitch: number): void;
        setPos(pos: IPos): void;
        setPosition(x: number, y: number, z: number): void;
        setX(x: number): void;
        setY(y: number): void;
        setZ(z: number): void;
        spawn(): void;
        storeAsClone(tab: number, name: String);
        typeOf(type: number): boolean;
    }

    interface IEntityItem<T extends net.minecraft.entity.item.EntityItem> extends IEntity<T> {
        getAge(): number;
        getItem(): item.IItemStack;
        getLifeSpawn(): number;
        getOwner(): String;
        getPickupDelay(): number;

        setAge(age: number): void;
        setItem(item: item.IItemStack): void;
        setLifeSpawn(age: number): void;
        setOwner(name: String): void;
        setPickupDelay(delay: number): void;
    }

    interface IEntityLivingBase<T extends net.minecraft.entity.EntityLivingBase> extends IEntity<T> {
        addMark(type: number): data.IMark;
        addPotionEffect(effect: number, duration: number, strength: number, hideParticles: boolean): void;
        canSeeEntity(entity: IEntity): boolean;
        clearPotionEffects(): void;
        getArmor(slot: number): item.IItemStack;
        getAttackTarget(): IEntityLivingBase;
        getHealth(): number;
        getLastAttacked(): IEntityLivingBase;
        getLastAttackedTime(): number;
        getMainhandItem(): item.IItemStack;
        getMarks(): data.IMark[];
        getMaxHealth(): number;
        getMoveForward(): number;
        getMoveStrafing(): number;
        getMoveVertical(): number;
        getOffhandItem(): item.IItemStack;
        getPotionEffect(effect: number): number;
        isAttacking(): boolean;
        isChild(): boolean;
        removeMark(mark: data.IMark): void;
        setArmor(slot: number, item: item.IItemStack): void;
        setAttackTarget(living: IEntityLivingBase): void;
        setHealth(health: number): void;
        setMainhandItem(item: item.IItemStack): void;
        setMaxHealth(health: number): void;
        setMoveForward(move: number): void;
        setMoveStrafing(move: number): void;
        setMoveVertical(move: number): void;
        setOffhandItem(item: item.IItemStack): void;
        swingMainhand(): void;
        swingOffhand(): void;
    }

    interface IEntityLiving<T extends net.minecraft.entity.EntityLiving> extends IEntityLivingBase<T> {
        clearNavigation(): void;
        getNavigationPath(): IPos;
        isNavigating(): boolean;
        jump(): void;
        navigateTo(x: number, y: number, z: number, speed: number): void;
    }

    interface IPlayer<T extends net.minecraft.entity.player.EntityPlayerMP = net.minecraft.entity.player.EntityPlayerMP> extends IEntityLivingBase<T> {
        addDialog(id: number): void;
        addFactionPoints(faction: number, points: number): void;
        canQuestBeAccepted(id: number): boolean;
        clearData(): void;
        closeGui(): void;
        factionStatus(factionId: number): number;
        finishQuest(id: number): void;
        getActiveQuests(): handler.data.IQuest[];
        getCustomGui(): gui.ICustomGui;
        getDisplayName(): String;
        getExpLevel(): number;
        getFactionPoints(faction: number): number;
        getFinishedQuests(): handler.data.IQuest[];
        getGamemode(): number;
        getHunger(): number;
        getInventory(): IContainer;
        getInventoryHeldItem(): item.IItemStack;
        getOpenContainer(): IContainer;
        getSpawnPoint(): block.IBlock;
        getTimers(): ITimers;
        giveItem(id: String, damage: number, amount: number): boolean;
        giveItem(item: item.IItemStack): boolean;
        hasAchievement(achievement: String): boolean;
        hasActiveQuest(id: number): boolean;
        hasFinishedQuest(id: number): boolean;
        hasPermission(permission: String): boolean;
        hasReadDialog(id: number): boolean;
        inventoryItemCount(id: String, damage: number): number;
        inventoryItemCount(item: item.IItemStack): number;
        kick(message: String): void;
        message(message: String): void;
        playSound(sound: String, volume: number, pitch: number): void;
        removeAllItems(item: item.IItemStack): void;
        removeDialog(id: number): void;
        removeItem(id: String, damage: number, amount: number): boolean;
        removeItem(item: item.IItemStack, amount: number): boolean;
        removeQuest(id: number): void;
        resetSpawnPoint(): void;
        sendMail(mail: data.IPlayerMail): void;
        sendNotification(title: String, msg: String, type: number): void;
        setExpLevel(level: number): void;
        setGamemode(mode: number): void;
        setHunger(level: number): void;
        setSpawnPoint(x: number, y: number, z: number): void;
        setSpawnPoint(block: block.IBlock): void;
        showChestGui(rows: number): IContainer;
        showCustomGui(gui: gui.ICustomGui): void;
        showDialog(id: number, name: String): void;
        startQuest(id: number): void;
        stopQuest(id: number): void;
        updatePlayerInventory(): void;
    }

    interface ICustomNpc<T extends net.minecraft.entity.EntityCreature = net.minecraft.entity.EntityCreature> extends IEntityLivingBase<T> {
        executeCommand(command: string): string;
        getAdvanced(): data.INPCAdvanced;
        getAi(): data.INPCAi;
        getDialog(slot: number): handler.data.IDialog;
        getDisplay(): data.INPCDisplay;
        getFaction(): handler.data.IFaction;
        getHomeX(): number;
        getHomeY(): number;
        getHomeZ(): number;
        getInventory(): data.INPCInventory;
        getJob(): data.INPCJob;
        getOwner(): IEntityLivingBase;
        getRole(): data.INPCRole;
        getStats(): data.INPCStats;
        getTimers(): ITimers;
        giveItem(player: IPlayer, item: item.IItemStack): void;
        reset(): void;
        say(message: string): void;
        sayTo(player: IPlayer, message: string): void;
        setDialog(slot: number, dialog: handler.data.IDialog): void;
        setFaction(id: number): void;
        setHome(x: number, y: number, z: number): void;
        shootItem(x: number, y: number, z: number, item: item.IItemStack, accuracy: number): IProjectile;
        shootItem(target: IEntityLivingBase, item: item.IItemStack, accuracy: number): IProjectile;
        updateClient(): void;
    }
    interface IAnimal<T extends net.minecraft.entity.passive.EntityAnimal> extends IEntityLiving<T> {}
    interface IArrow<T extends net.minecraft.entity.projectile.EntityArrow> extends IEntity<T> {}
    interface IMonster<T extends net.minecraft.entity.monster.EntityMob> extends IEntityLiving<T> {}
    interface IThrowable<T extends net.minecraft.entity.projectile.EntityThrowable> extends IEntity<T> {}
    interface IProjectile<T extends net.minecraft.entity.projectile.EntityThrowable> extends IThrowable<T> {
        enableEvents(): void;
        getAccuracy(): number;
        getHasGravity(): boolean;
        getItem(): item.IItemStack;
        setAccuracy(accuracy: number): void;
        setHasGravity(bo: boolean): void;
        setHeading(x: number, y: number, z: number): void;
        setHeading(yaw: number, pitch: number): void;
        setHeading(entity: IEntity): void;
        setItem(item: item.IItemStack): void;
    }
    interface IVillager<T extends net.minecraft.entity.monster.EntityMob> extends IEntityLiving<T> {}

    namespace data {
        interface IData {
            clear(): void;
            get(key: String);
            getKeys(): String[];
            has(key: String): boolean;
            put(key: String, value): void;
            remove(key: String): void;
        }

        interface IMark {
            getAvailability(): handler.data.IAvailability;
            getColor(): number;
            getType(): number;
            setColor(color: number): void;
            setType(type: number): void;
            update(): void;
        }

        interface IPlayerMail {
            getContainer(): IContainer;
            getQuest(): handler.data.IQuest;
            getSender(): String;
            getSubject(): String;
            getText(): String[];
            
            setQuest(id: number): void;
            setSender(sender: String): void;
            setSubject(subject: String): void;
            setText(text: String[]): void;
        }

        interface ILine {
            getShowText(): boolean;
            getSound(): String;
            getText(): String;

            setShowText(show: boolean): void;
            setSound(sound: String): void;
            setText(text: String): void;
        }

        interface INPCAdvanced {
            getLine(type: number, slot: number): String;
            getLineCount(type: number): number;
            getSound(type: number): String;
            setLine(type: number, slot: number, text: String, sound: String): void;
            setSound(type: number, sound: String): void;
        }

        interface INPCAi {
            getAnimation(): number;
            getAttackInvisible(): boolean;
            getAttackLOS(): boolean;
            getAvoidsWater(): boolean;
            getCanSwim(): boolean;
            getCurrentAnimation(): number;
            getDoorInteract(): number;
            getInteractWithNPCs(): boolean;
            getLeapAtTarget(): boolean;
            getMovingPathPauses(): boolean;
            getMovingPathType(): number;
            getMovingType(): number;
            getNavigationType(): number;
            getRetaliateType(): number;
            getReturnsHome(): boolean;
            getSheltersFrom(): number;
            getStandingType(): number;
            getStopOnInteract(): number;
            getTacticalRange(): number;
            getTacticalType(): number;
            getWalkingSpeed(): number;
            getWanderingRange(): number;

            setAnimation(type: number): void;
            setAttackInvisible(attack: boolean): void;
            setAttackLOS(enabled: boolean): void;
            setAvoidsWater(enabled: boolean): void;
            setCanSwim(canSwim: boolean): void;
            setDoorInteract(type: number): void;
            setInteractWithNPCs(interact: boolean): void;
            setLeapAtTarget(leap: boolean): void;
            setMovingPathType(type: number, pauses: boolean): void;
            setMovingType(type: number): void;
            setNavigationType(type: number): void;
            setRetaliateType(type: number): void;
            setReturnsHome(bo: boolean): void;
            setSheltersFrom(type: number): void;
            setStandingType(type: number): void;
            setStopOnInteract(stopOnInteract: boolean): void;
            setTacticalRange(range: number): void;
            setTacticalType(type: number): void;
            setWalkingSpeed(speed: number): void;
            setWanderingRange(range: number): void;
        }

        interface INPCDisplay {
            getBossbar(): number;
            getBossColor(): number;
            getCapeTexture(): String;
            getHasHitbox(): boolean;
            getHasLivingAnimation(): boolean;
            getModel(): String;
            getModelScale(part: number): number[];
            getName(): String;
            getOverlayTexture(): String;
            getShowName(): number;
            getSize(): number;
            getSkinPlayer(): String;
            getSkinTexture(): String;
            getSkinUrl(): number;
            getTint(): number;
            getTitle(): String;
            getVisible(): number;
            isVisibleTo(player: IPlayer)

            setBossbar(type: number): void;
            setBossColor(color: number): void;
            setCapeTexture(texture: String): void;
            setHasHitbox(bo: boolean): void;
            setHasLivingAnimation(enabled: boolean): void;
            setModelScale(part: number, x: number, y: number, z: number): void;
            setName(name: String): void;
            setOverlayTexture(texture: String): void;
            setShowName(type: number): void;
            setSize(size: number): void;
            setSkinPlayer(name: String): void;
            setSkinTexture(texture: String): void;
            setSkinUrl(url: String): void;
            setTint(color: number): void;
            setTitle(title: String): void;
            setVisible(type: number): void;
        }

        interface INPCInventory {
            getArmor(slot: number): item.IItemStack;
            getDropItem(slot: number): item.IItemStack;
            getExpMax(): number;
            getExpMin(): number;
            getExpRNG(): number;
            getItemsRNG(): item.IItemStack[];
            getLeftHand(): item.IItemStack;
            getProjectile(): item.IItemStack;
            getRightHand(): item.IItemStack;
            setArmor(slot: number, item: item.IItemStack): void;
            setDropItem(slot: number, item: item.IItemStack, chance: number): void;
            setExp(min: number, max: number): void;
            setLeftHand(item: item.IItemStack): void;
            setProjectile(item: item.IItemStack): void;
            setRightHand(item: item.IItemStack): void;
        }

        interface INPCJob {
            getType(): number;
        }

        interface INPCMelee {
            getDelay(): number;
            getEffectStrength(): number;
            getEffectTime(): number;
            getEffectType(): number;
            getKnockback(): number;
            getRange(): number;
            getStrength(): number;

            setDelay(speed: number): void;
            setEffect(type: number, strength: number, time: number): void;
            setKnockback(knockback: number): void;
            setRange(range: number): void;
            setStrength(strength: number): void;
        }

        interface INPCRanged {
            getAccelerate(): boolean;
            getAccuracy(): number;
            getBurst(): number;
            getBurstDelay(): number;
            getDelayMax(): number;
            getDelayMin(): number;
            getDelayRNG(): number;
            getEffectStrength(): number;
            getEffectTime(): number;
            getEffectType(): number;
            getExplodeSize(): number;
            getFireType(): number;
            getGlows(): boolean;
            getHasAimAnimation(): boolean;
            getHasGravity(): boolean;
            getKnockback(): number;
            getMeleeRange(): number;
            getParticle(): number;
            getRange(): number;
            getRender3d(): boolean;
            getShotCount(): number;
            getSize(): number;
            getSound(type: number): String;
            getSpeed(): number;
            getSpins(): boolean;
            getSticks(): boolean;
            getStrength(): number;

            setAccelerate(accelerate: boolean): void;
            setAccuracy(accuracy: number): void;
            setBurst(count: number): void;
            setBurstDelay(delay: number): void;
            setDelay(min: number, max: number): void;
            setEffect(type: number, strength: number, time: number): void;
            setExplodeSize(size: number): void;
            setFireType(type: number): void;
            setGlows(glows: boolean): void;
            setHasAimAnimation(aim: boolean): void;
            setHasGravity(hasGravity: boolean): void;
            setKnockback(punch: number): void;
            setMeleeRange(range: number): void;
            setParticle(type: number): void;
            setRange(range: number): void;
            setRender3D(render3d: boolean): void;
            setShotCount(count: number): void;
            setSize(size: number): void;
            setSound(type: number, sound: String): void;
            setSpeed(speed: number): void;
            setSpins(spins: boolean): void;
            setSticks(sticks: boolean): void;
            setStrength(strength: number): void;
        }

        interface INPCRole {
            getType(): number;
        }

        interface INPCStats {
            getAggroRange(): number;
            getCombatRegen(): number;
            getCreatureType(): number;
            getHealthRegen(): number;
            getHideDeadBody(): boolean;
            getImmune(type: number): boolean;
            getMaxHealth(): number;
            getMelee(): INPCMelee;
            getRanged(): INPCRanged;
            getResistance(type: number): number;
            getRespawnTime(): number;
            getRespawnType(): number;

            setAggrowRange(range: number): void;
            setCombatRegen(regen: number): void;
            setCreatureType(type: number): void;
            setHealthRegen(regen: number): void;
            setHideDeadBody(hide: boolean): void;
            setImmune(type: number, bo: boolean): void;
            setMaxHealth(maxHealth: number): void;
            setResistance(type: number, value: number): void;
            setRespawnTime(seconds: number): void;
            setRespawnType(type: number): void;
        }

        namespace role {
            interface IJobBard {
                getSong(): String;
                setSong(song: String): void;
            }

            interface IJobBuilder {
                isBuilding(): boolean;
            }

            interface IJobFarmer {
                isPlucking(): boolean;
            }

            interface IJobFollower extends INPCJob {
                getFollowing(): String;
                getFollowingNpc(): ICustomNpc;
                isFollowing(): boolean;
                setFollowing(name: String): void;
            }

            interface IJobPuppet extends INPCJob {
                getAnimationSpeed(): number;
                getIsAnimated(): boolean;
                getPart(part: number): IJobPuppet.IJobPuppetPart;
                setAnimationSpeed(speed: number): void;
                setIsAnimated(bo: boolean): void;
            }

            namespace IJobPuppet {
                interface IJobPuppetPart {
                    getRotationX(): number;
                    getRotationY(): number;
                    getRotationZ(): number;
                    setRotation(x: number, y: number, z: number): void;
                }
            }

            interface IJobSpawner {
                removeAllSpawned(): void;
                spawnEntity(i: number): IEntityLivingBase;
            }

            interface IRoleDialog {
                getDialog(): String;
                getOption(option: number): String;
                getOptionDialog(option: number): String;

                setDialog(text: String): void;
                setOption(option: number, text: String): void;
                setOptionDialog(option: number, text: String): void;
            }

            interface IRoleFollower extends INPCRole {
                addDays(days: number): void;
                getDays(): number;
                getFollowing(): IPlayer;
                getGuiDisabled(): boolean;
                getInfinite(): boolean;
                getRefuseSoulstone(): boolean;
                isFollowing(): boolean;
                reset(): void;
                setFollowing(player: IPlayer): void;
                setGuiDisabled(disabled: boolean): void;
                setInfinite(infinite: boolean): void;
                setRefuseSoulstone(refuse: boolean): void;
            }

            interface IRoleTrader extends INPCRole {
                getCurrency1(slot: number): item.IItemStack;
                getCurrency2(slot: number): item.IItemStack;
                getMarket(): String;
                getSold(slot: number): item.IItemStack;
                remove(slot: number): void;
                set(slot: number, currency: item.IItemStack, currency2: item.IItemStack, sold: item.IItemStack): void;
                setMarket(name: String): void;
            }

            interface IRoleTransporter extends INPCRole {
                getLocation(): IRoleTransporter.ITransportLocation;
            }

            namespace IRoleTransporter {
                interface ITransportLocation {
                    getDimension(): number;
                    getId(): number;
                    getName(): String;
                    getType(): number;
                    getX(): number;
                    getY(): number;
                    getZ(): number;
                }
            }
        }    
    }    
}

declare namespace event {
    interface CustomNPCsEvent {
        API: NpcAPI;
        setCanceled(canceled: boolean): void;
    }
    
    interface BlockEvent extends CustomNPCsEvent {
        block: block.IBlock;
    }
    
    namespace BlockEvent {
        // broken
        interface BreakEvent extends BlockEvent {}
    
        // clicked
        interface ClickedEvent extends BlockEvent {
            player: entity.IPlayer;
        }
    
        // collide
        interface CollidedEvent extends BlockEvent {
            entity: entity.IEntity;
        }
    
        // doorToggle
        interface DoorToggleEvent extends BlockEvent {}
    
        // fallenUpon
        interface EntityFallenUponEvent extends BlockEvent {
            distanceFallen: number;
            entity: entity.IEntity;
        }
    
        // exploded
        interface ExplodedEvent extends BlockEvent {}
    
        // harvested
        interface HarvestedEvent extends BlockEvent {
            player: entity.IPlayer;
        }
    
        // init
        interface InitEvent extends BlockEvent {}
    
        // interact
        interface InteractEvent extends BlockEvent {
            hitX: number;
            hitY: number;
            hitZ: number;
            player: entity.IPlayer;
            side: number;
        }
    
        // neighborChanged
        interface NeighborChangedEvent extends BlockEvent {
            changedPos: IPos;
        }
    
        // rainFilled
        interface RainFillEvent extends BlockEvent {}
    
        // redstone
        interface RedstoneEvent extends BlockEvent {
            power: number;
            prevPower: number;
        }
    
        // timer
        interface TimerEvent extends BlockEvent {
            id: number;
        }
    
        // tick
        interface UpdateEvent extends BlockEvent {}
    }
    
    interface CustomContainerEvent extends CustomNPCsEvent {
        container: IContainer;
        player: entity.IPlayer;
    }
    
    namespace CustomContainerEvent {
        interface CloseEvent extends CustomContainerEvent {}
    
        interface SlotClickedEvent extends CustomContainerEvent {
            heldItem: item.IItemStack;
            slot: number;
            slotItem: item.IItemStack;
        }
    }
    
    interface CustomGuiEvent extends CustomNPCsEvent {
        gui: gui.ICustomGui;
        player: entity.IPlayer;
    }
    
    namespace CustomGuiEvent {
        // customGuiButton
        interface ButtonEvent extends CustomGuiEvent {
            buttonId: number;
        }
    
        // customGuiClosed
        interface CloseEvent extends CustomGuiEvent {}
    
        // customGuiScroll
        interface ScrollEvent extends CustomGuiEvent {
            doubleClick: boolean;
            scrollId: number;
            scrollIndex: number;
            selection: String[];
        }
    
        interface SlotClickEvent extends CustomGuiEvent {
            clickType: String;
            dragType: number;
            slotId: number;
            stack: item.IItemStack;
        }
    
        // customGuiSlot
        interface SlotEvent extends CustomGuiEvent {
            slotId: number;
            stack: item.IItemStack;
        }
    }
    
    interface DialogEvent extends NpcEvent {
        dialog: handler.data.IDialog;
        player: entity.IPlayer;
    }
    
    namespace DialogEvent {
        // dialogClose
        interface CloseEvent extends DialogEvent {}
    
        // dialog
        interface OpenEvent extends DialogEvent {}
    
        // dialogOption
        interface OptionEvent extends DialogEvent {}
    }
    
    interface ForgeEvent extends CustomNPCsEvent {}
    
    namespace ForgeEvent {
        interface EntityEvent extends ForgeEvent {
            entity: entity.IEntity;
        }
    
        // init
        interface InitEvent extends ForgeEvent {}
    
        interface WorldEvent extends ForgeEvent {
            world: IWorld;
        }
    }
    
    interface ItemEvent extends CustomNPCsEvent {
        item: item.IItemScripted;
    }
    
    namespace ItemEvent {
        // attack
        interface AttackEvent extends ItemEvent {
            player: entity.IPlayer;
            target: Object;
            /**
             * 0: Air;
             * 1: Entity;
             * 2: Block;
             */
            type: number;
        }
    
        // init
        interface InitEvent extends ItemEvent {}
    
        // interact
        interface InteractEvent extends ItemEvent {
            player: entity.IPlayer;
            target: Object;
            /**
             * 0: Air;
             * 1: Entity;
             * 2: Block;
             */
            type: number;
        }
    
        // pickedUp
        interface PickedUpEvent extends ItemEvent {
            entity: entity.IEntityItem;
            player: entity.IPlayer;
        }
    
        // spawn
        interface SpawnEvent extends ItemEvent {
            entity: entity.IEntityItem;
        }
    
        // toss
        interface TossedEvent extends ItemEvent {
            entity: entity.IEntityItem;
            player: entity.IPlayer;
        }
    
        // tick
        interface UpdateEvent extends ItemEvent {
            player: entity.IPlayer;
        }
    }
    
    interface NpcEvent extends CustomNPCsEvent {
        npc: entity.ICustomNpc;
    }
    
    namespace NpcEvent {
        // collide
        interface CollideEvent extends NpcEvent {
            entity: entity.IEntity;
        }
    
        // damaged
        interface DamagedEvent extends NpcEvent {
            clearTarget: boolean;
            damage: number;
            damageSource: IDamageSource;
            source: entity.IEntity;
        }
    
        // died
        interface DiedEvent extends NpcEvent {
            damageSource: IDamageSource;
            droppedItems: item.IItemStack[];
            expDropped: number;
            line: entity.data.ILine;
            source: entity.IEntity;
            type: String;
        }
    
        // init
        interface InitEvent extends NpcEvent {}
    
        // interact
        interface InteractEvent extends NpcEvent {
            player: entity.IPlayer
        }
    
        // kill
        interface KilledEntityEvent extends NpcEvent {
            entity: entity.IEntityLivingBase;
        }
    
        // meleeAttack
        interface MeleeAttackEvent extends NpcEvent {
            damage: number;
            target: entity.IEntityLivingBase;
        }
    
        // rangedAttack
        interface RangedLaunchedEvent extends NpcEvent {
            damage: number;
            projectiles: Array<entity.IProjectile>;
            target: entity.IEntityLivingBase;
        }
    
        // target
        interface TargetEvent extends NpcEvent {
            entity: entity.IEntityLivingBase;
        }
    
        // targetLost
        interface TargetLostEvent extends NpcEvent {
            entity: entity.IEntityLivingBase;
        }
    
        // timer
        interface TimerEvent extends NpcEvent {
            id: number;
        }
    
        // tick
        interface UpdateEvent extends NpcEvent {}
    }
    
    interface PlayerEvent extends CustomNPCsEvent {
        player: entity.IPlayer;
    }
    
    namespace PlayerEvent {
        // attack
        interface AttackEvent extends PlayerEvent {
            target: Object;
            /**
             * 0: Air;
             * 1: Entity;
             * 2: Block;
             */
            type: number;
        }
    
        // broken
        interface BreakEvent extends PlayerEvent {
            block: block.IBlock;
            exp: number;
        }
    
        // chat
        interface ChatEvent extends PlayerEvent {
            message: String;
        }
    
        // containerClosed
        interface ContainerClosed extends PlayerEvent {
            container: IContainer;
        }
    
        // containerOpen
        interface ContainerOpen extends PlayerEvent {
            container: IContainer;
        }
    
        // damagedEntity
        interface DamagedEntityEvent extends PlayerEvent {
            damage: number;
            damageSource: IDamageSource;
            targer: entity.IEntity;
        }
    
        // damaged
        interface DamagedEvent extends PlayerEvent {
            clearTarget: boolean;
            damage: number;
            damageSource: IDamageSource;
            source: entity.IEntity;
        }
    
        // died
        interface DiedEvent extends PlayerEvent {
            damageSource: IDamageSource;
            source: entity.IEntity;
            type: String;
        }
    
        // factionUpdate
        interface FactionUpdateEvent extends PlayerEvent {
            faction: handler.data.IFaction;
            init: boolean;
            points: number;
    
        }
    
        // init
        interface InitEvent extends PlayerEvent {}
    
        // interact
        interface InteractEvent extends PlayerEvent {
            target: Object;
            /**
             * 0: Air;
             * 1: Entity;
             * 2: Block;
             */
            type: number;
        }
    
        // keyPressed
        interface KeyPressedEvent extends PlayerEvent {
            isAltPressed: boolean;
            isCtrlPressed: boolean;
            isMetaPressed: boolean;
            isShiftPressed: boolean;
            key: number;
        }
    
        // kill
        interface KilledEntityEvent extends PlayerEvent {
            entity: entity.IEntityLivingBase;
        }
    
        // levelUp
        interface LevelUpEvent extends PlayerEvent {
            change: number;
        }
    
        // login
        interface LoginEvent extends PlayerEvent {}
    
        // logout
        interface LogoutEvent extends PlayerEvent {}
    
        // pickedUp
        interface PickUpEvent extends PlayerEvent {
            item: item.IItemStack;
        }
    
        // rangedLaunched
        interface RangedLaunchedEvent extends PlayerEvent {}
    
        // timer
        interface TimerEvent extends PlayerEvent {
            id: number;
        }
    
        // toss
        interface TossEvent extends PlayerEvent {
            item: item.IItemStack;
        }
    
        // tick
        interface UpdateEvent extends PlayerEvent {}
    }
    
    interface ProjectileEvent extends CustomNPCsEvent {
        projectile: entity.IProjectile;
    }
    
    namespace ProjectileEvent {
        // projectileImpact
        interface ImpactEvent extends ProjectileEvent {
            target: Object;
            /**
             * 0: Entity;
             * 1: Block;
             */
            type: number;
        }
    
        // projectileTick
        interface UpdateEvent extends ProjectileEvent {}
    }
    
    interface QuestEvent extends CustomNPCsEvent {
        player: entity.IPlayer;
        quest: handler.data.IQuest;
    }
    
    namespace QuestEvent {
        interface QuestCompleteEvent extends QuestEvent {}
        interface QuestStartEvent extends QuestEvent {}
        interface QuestTurnedInEvent extends QuestEvent {
            expReward: number;
            itemRewards: item.IItemStack[];
        }
    }
    
    interface RoleEvent extends CustomNPCsEvent {
        npc: entity.ICustomNpc;
        player: entity.IPlayer;
    }
    
    namespace RoleEvent {
        interface BankUnlockedEvent extends RoleEvent {
            slot: number;
        }
    
        interface BankUpgradedEvent extends RoleEvent {
            slot: number;
        }
    
        interface FollowerFinishedEvent extends RoleEvent {}
    
        interface FollowerHireEvent extends RoleEvent {
            days: number;
        }
    
        interface MailmanEvent extends RoleEvent {
            mail: entity.data.IPlayerMail;
        }
    
        interface TradeFailedEvent extends RoleEvent {
            currency1: item.IItemStack;
            currency2: item.IItemStack;
            receiving: item.IItemStack;
            sold: item.IItemStack;
        }
    
        interface TraderEvent extends RoleEvent {
            currency1: item.IItemStack;
            currency2: item.IItemStack;
            sold: item.IItemStack;
        }
    
        interface TransporterUnlockedEvent extends RoleEvent {}
    
        interface TransporterUseEvent extends RoleEvent{
            location: entity.data.role.IRoleTransporter.ITransportLocation;
        }
    }
    
    interface WorldEvent extends CustomNPCsEvent {
        world: IWorld;
    }
    
    namespace WorldEvent {
        interface ScriptCommandEvent extends WorldEvent {
            arguments: String[];
            pos: IPos;
        }
    }
}

declare namespace gui {
    interface ICustomGuiComponent {
        getHoverText(): String[];
        getID(): number;
        getPosX(): number;
        getPosY(): number;
        hasHoverText(): boolean;
        setHoverText(text: String): ICustomGuiComponent;
        setHoverText(text: String[]): ICustomGuiComponent;
        setID(id: number): ICustomGuiComponent;
        setPos(x: number, y: number): ICustomGuiComponent;
    }
    
    interface IButton extends ICustomGuiComponent {
        getHeight(): number;
        getLabel(): String;
        getTexture(): String;
        getTextureX(): number;
        getTextureY(): number;
        getWidth(): number;
        hastexture(): boolean;
        setLabel(label: String): IButton;
        setSize(width: number, height: number): IButton;
        setTexture(texture: String): IButton;
        setTextureOffset(textureX: number, textureY: number): IButton;
    }
    
    interface IItemSlot extends ICustomGuiComponent {
        getStack(): item.IItemStack;
        hasStack(): boolean;
        setStack(itemStack: item.IItemStack): IItemSlot;
    }
    
    interface ILabel extends ICustomGuiComponent {
        getColor(): number;
        getHeight(): number;
        getScale(): number;
        getText(): String;
        getWidth(): number;
        setColor(color: number): ILabel;
        setScale(scale: number): ILabel;
        setSize(width: number, height: number): ILabel;
        setText(label: String): ILabel;
    }
    
    interface IScroll extends ICustomGuiComponent {
        getDefaultSelection(): number;
        getHeight(): number;
        getList(): String[];
        getWidth(): number;
        isMultiSelect(): boolean;
        setDefaultSelection(defaultSelection: number): IScroll;
        setList(list: String[]): IScroll;
        setMultiSelect(multiSelect: boolean): IScroll;
        setSize(width: number, height: number): IScroll;
    }
    
    interface ITextField extends ICustomGuiComponent {
        getHeight(): number;
        getText(): String;
        getWidth(): number;
        setSize(width: number, height: number): ITextField;
        setText(defaultText: String): ITextField;
    }
    
    interface ITexturedButton extends IButton {
        getTexture(): String;
        getTextureX(): number;
        getTextureY(): number;
        setTexture(texture: String): ITexturedButton;
        setTextureOffset(textureX: number, textureY: number): ITexturedButton;
    }
    
    interface ITexturedRect extends ICustomGuiComponent {
        getHeight(): number;
        getScale(): number;
        getTexture(): String;
        getTextureX(): number;
        getTextureY(): number;
        getWidth(): number;
        setScale(scale: number): ITexturedRect;
        setSize(width: number, height: number): ITexturedRect;
        setTexture(texture: String): ITexturedRect;
        setTextureOffset(textureX: number, textureY: number): ITexturedRect;
    }
    
    interface ICustomGui {
        addButton(id: number, label: String, x: number, y: number, width?: number, height?: number): IButton;
        addItemSlot(x: number, y: number, stack?: item.IItemStack): IItemSlot;
        addLabel(id: number, label: String, x: number, y: number, width: number, height: number, color?: number): ILabel;
        addScroll(id: number, x: number, y: number, width: number, height: number, list: String[]): IScroll;
        addTextField(id: number, x: number, y: number, width: number, height: number): ITextField;
        addTexturedButton(id: number, label: String, x: number, y: number, width: number, height: number, texture: String, textureX?: number, textureY?: number): IButton;
        addTexturedRect(id: number, texture: String, x: number, y: number, width: number, height: number, textureX?: number, textureY?: number): ITexturedRect;
    
        getComponent(id: number): ICustomGuiComponent;
        getComponents(): Array<ICustomGuiComponent>;
        getHeight(): number;
        getID(): number;
        getSlots(): Array<IItemSlot>;
        getWidth(): number;
        removeComponent(id: number): void;
        setBackgroundTexture(resourceLocation: String): void;
        setDoesPausGame(pauseGame: boolean): void;
        setSize(width: number, height: number): void;
        showPlayerInventory(x: number, y: number): void;
        update(player: entity.IPlayer): void;
        updateComponent(component: ICustomGuiComponent): void;
    }
}

declare namespace handler {
    interface ICloneHandler {
        get(tab: number, name: String, world: IWorld): entity.IEntity;
        remove(tab: number, name: String): void;
        set(tab: number, name: String, entity: entity.IEntity): void;
        spawn(x: number, y: number, z: number, tab: number, name: String, world: IWorld): entity.IEntity;
    }

    interface IDialogHandler {
        categories(): Array<data.IDialogCategory>;
        get(id: number): data.IDialog;
    }
    
    interface IFactionHandler {
        create(name: String, color: number): data.IFaction;
        delete(id: number): data.IFaction;
        get(id: number): data.IFaction;
        list(): Array<data.IFaction>;
    }
    
    interface IQuestHandler {
        categories(): Array<data.IQuestCategory>;
        get(id: number): data.IQuest;
    }

    namespace data {
        interface IAvailability {
            getDayTime(): number;
            getDialog(i: number): number;
            getMinPlayerLevel(): number;
            getQuest(i: number): number;
            isAvailable(player: entity.IPlayer): boolean;
            removeDialog(i: number): void;
            removeQuest(i: number): void;
            setDayTime(type: number): void;
            setDialog(i: number, id: number, type: number): void;
            setFaction(i: number, id: number, type: number, stance: number): void;
            setMinPlayerLevel(level: number): void;
            setQuest(i: number, id: number, type: number): void;
            setScoreboard(i: number, objective: String, type: number, value: number): void;
        }

        interface IDialog {
            getAvailability(): IAvailability;
            getCategory(): IDialogCategory;
            getCommand(): String;
            getId(): number;
            getName(): String;
            getOption(slot: number): IDialogOption;
            getOptions(): Array<IDialogOption>;
            getQuest(): IQuest;
            getText(): String;
            save(): void;
            setCommand(command: String): void;
            setName(name: String): void;
            setQuest(quest: IQuest): void;
            setText(text: String);
        }

        interface IDialogCategory {
            create(): IDialog;
            dialogs(): Array<IDialog>;
            getName(): String;
        }
        
        interface IDialogOption {
            getName(): String;
            getSlot(): number;
            getType(): number;
        }

        interface IFaction {
            addHostile(id: number): void;
            getAttackedByMobs(): boolean;
            getColor(): number;
            getDefaultPoints(): number;
            getHostileList(): number[];
            getId(): number;
            getIsHidden(): boolean;
            getName(): String;
            hasHostile(id: number): boolean;
            hostileToFaction(factionId: number): boolean;
            hostileToNpc(npc: entity.ICustomNpc): boolean;
            playerStatus(player: entity.IPlayer): number;
            removeHostile(id: number): void;
            save(): void;
            setAttackedByMobs(bo: boolean): void;
            setDefaultPoints(points: number): void;
            setIsHidden(bo: boolean): void;
        }

        interface IQuest {
            getCategory(): IQuestCategory;
            getCompleteText(): String;
            getId(): number;
            getIsRepeatable(): boolean;
            getLogText(): String;
            getName(): String;
            getNextQuest(): IQuest;
            getNpcName(): String;
            getObjectives(player: entity.IPlayer): IQuestObjective[];
            getRewards(): IContainer;
            getType(): number;
            save(): void;
            setCompleteText(text: String): void;
            setLogText(text: String): void;
            setName(name: String): void;
            setNextQuest(quest: IQuest): void;
            setNpcName(name: String): void;
            setType(type: number);
        }
        
        interface IQuestCategory {
            create(): IQuest;
            getName(): String;
            quests(): Array<IQuest>;
        }
        
        interface IQuestObjective {
            getMaxProgress(): number;
            getProgress(): number;
            getText(): String;
            isCompleted(): boolean;
            setProgress(progress: number): void;
        }
        
        interface IRecipe {
            delete(): void;
            getHeight(): number;
            getId(): number;
            getIgnoreDamage(): boolean;
            getIgnoreNBT(): boolean;
            getName(): String;
            getWidth(): number;
            isGlobal(): boolean;
            save(): void;
            saves(): boolean;
            saves(bo: boolean): void;
            setIgnoreDamage(bo: boolean): void;
            setIgnoreNbt(bo: boolean): void;
            setIsGlobal(bo: boolean): void;
        }
    }
}

declare namespace item {
    interface IItemStack {
        addEnchantment(id: String, strength: number): void;
        compare(item: IItemStack, ignoreNBT: boolean): boolean;
        copy(): IItemStack;
        damageItem(damage: number, living: entity.IEntityLiving): void;
        getAttackDamage(): number;
        getAttribute(name: String): number;
        getDisplayName(): String;
        getFoodLevel(): number;
        getItemDamage(): number;
        getItemName(): String;
        /**
         * Get the full item NBT. If this were an ```EntityItem```, this would be the "Item" tag
         */
        getItemNbt(): INbt;
        getLore(): String[];
        getMaxItemDamage(): number;
        getMaxStackSize(): number;
        getMCItemStack(): net.minecraft.item.ItemStack;
        getName(): String;
        /**
         * Get the "tag" of the item's NBT. If this were an ```EntityItem```, this would be "Item.tag"
         */
        getNbt(): INbt;
        getStackSize(): number;
        getStoreddata(): entity.data.IData;
        getTempdata(): entity.data.IData;
        getType(): number;
        hasAttribute(name: String): boolean;
        hasCustomName(): boolean;
        hasEnchant(id: String): boolean;
        hasNbt(): boolean;
        isEmpty(): boolean;
        isEnchanted(): boolean;
        isWearable(): boolean;
        removeEnchant(id: String): boolean;
        removeNbt(): void;
        setAttribute(name: String, value: number, slot: number): void;
        setCustomName(name: String): void;
        setItemDamage(value: number): void;
        setLore(lore: String[]): void;
        setStackSize(size: number): void;
    }
    
    interface IItemArmor extends IItemStack {
        getArmorMaterial(): String;
        getArmorSlot(): number;
    }
    
    interface IItemBlock extends IItemStack {
        getBlockName(): String;
    }
    
    interface IItemBook extends IItemStack {
        getAuthor(): String;
        getText(): String[];
        getTitle(): String;
        setAuthor(author: String): void;
        setText(pages: String[]): void;
        setTitle(title: String): void;
    }
    
    interface IItemScripted extends IItemStack {
        getColor(): number;
        getDurabilityColor(): number;
        getDurabilityShow(): boolean;
        getDurabilityValue(): number;
        getTexture(damage: number): String;
        hasTexture(damage: number): boolean;
        setColor(color: number): void;
        setDurabilityColor(color: number): void;
        setDurabilityShow(bo: boolean): void;
        setDurabilityValue(value: number): void;
        setMaxStackSize(size: number): void;
        setTexture(damage: number, texture: String): void;
    }
}

declare namespace com {
    namespace mojang {
        namespace authlib {
            interface GameProfile {}
        }
    }
}

declare namespace net {
    namespace minecraft {
        namespace block {
            class Block {}
        }
        namespace entity {
            namespace item {
                interface EntityItem extends Entity {}
            }
            namespace monster {
                interface EntityMob extends EntityCreature {}
            }
            namespace passive {
                interface EntityAnimal extends EntityAgeable {}
            }
            namespace player {
                interface EntityPlayer extends EntityLivingBase {
                    /**
                     * field_71071_by
                     */
                    inventory: InventoryPlayer;
                    /**
                     * inventory
                     */
                    field_71071_by: InventoryPlayer;
                }
                interface EntityPlayerMP extends EntityPlayer {}
                interface InventoryPlayer implements net.minecraft.inventory.IInventory {
                    /**
                     * field_70462_a
                     */
                    mainInventory: java.util.List<net.minecraft.item.ItemStack>;
                    /**
                     * mainInventory
                     */
                    field_70462_a: java.util.List<net.minecraft.item.ItemStack>;
                    /**
                     * field_70460_b
                     */
                    armorInventory: java.util.List<net.minecraft.item.ItemStack>;
                    /**
                     * armorInventory
                     */
                    field_70460_b: java.util.List<net.minecraft.item.ItemStack>;

                    /**
                     * func_191521_c
                     * @param stack 
                     */
                    addItemStackToInventory(stack: net.minecraft.item.ItemStack): boolean;
                    /**
                     * addItemStackToInventory
                     * @param stack 
                     */
                    func_191521_c(stack: net.minecraft.item.ItemStack): boolean;

                    /**
                     * func_191975_a
                     * @param world 
                     * @param itemStack 
                     */
                    placeItemBackInInventory(world: net.minecraft.world.World, itemStack: net.minecraft.item.ItemStack): void;
                    /**
                     * placeItemBackInInventory
                     * @param world 
                     * @param itemStack 
                     */
                    func_191975_a(world: net.minecraft.world.World, itemStack: net.minecraft.item.ItemStack): void;

                    /**
                     * func_70448_g
                     */
                    getCurrentItem(): net.minecraft.item.ItemStack;
                    /**
                     * getCurrentItem()
                     */
                    func_70448_g(): net.minecraft.item.ItemStack;
                }
            }
            namespace projectile {
                interface EntityArrow extends Entity {}
                interface EntityThrowable extends Entity {}
            }
            interface Entity {}
            interface EntityAgeable extends EntityCreature {}
            interface EntityCreature extends EntityLiving {}
            interface EntityLiving extends EntityLivingBase {}
            interface EntityLivingBase extends Entity {}
        }
        namespace inventory {
            interface IInventory extends world.IWorldNameable {
                getSizeInventory(): number;
                isEmpty(): number;
                getStackInSlot(index: number): item.ItemStack;
            }
        }
        namespace item {
            class EnumRarity implements net.minecraftforge.common.IRarity {
                static readonly COMMON: EnumRarity;
                static readonly UNCOMMON: EnumRarity;
                static readonly RARE: EnumRarity;
                static readonly EPIC: EnumRarity;

                readonly color: util.text.TextFormatting;
                readonly rarityName: string;
            }
            class Item {
                /**
                 * func_111206_d
                 */
                static getByNameOrId(): Item;
                /**
                 * getByNameOrId
                 */
                static func_111206_d(): Item;
            }
            class ItemStack {
                /**
                 * func_189868_a
                 * @param fixer 
                 */
                static registerFixes(fixer: any): void;
                /**
                 * registerFixes
                 * @param fixer 
                 */
                static func_189868_a(fixer: any): void;

                /**
                 * func_77970_a
                 * @param stackA 
                 * @param stackB 
                 */
                static areItemStackTagsEqual(stackA: ItemStack, stackB: ItemStack): boolean;
                /**
                 * areItemStackTagsEqual
                 * @param stackA 
                 * @param stackB 
                 */
                static func_77970_a(stackA: ItemStack, stackB: ItemStack): boolean;

                /**
                 * func_77989_b
                 * @param stackA 
                 * @param stackB 
                 */
                static areItemStacksEqual(stackA: ItemStack, stackB: ItemStack): boolean;
                /**
                 * areItemStacksEqual
                 * @param stackA 
                 * @param stackB 
                 */
                static func_77989_b(stackA: ItemStack, stackB: ItemStack): boolean;

                /**
                 * func_179545_c
                 * @param stackA 
                 * @param stackB 
                 */
                static areItemsEqual(stackA: ItemStack, stackB: ItemStack): boolean;
                /**
                 * areItemStackTagsEqual
                 * @param stackA 
                 * @param stackB 
                 */
                static func_179545_c(stackA: ItemStack, stackB: ItemStack): boolean;

                /**
                 * func_185132_d
                 * @param stackA 
                 * @param stackB 
                 */
                static areItemsEqualIgnoreDurability(stackA: ItemStack, stackB: ItemStack): boolean;
                /**
                 * areItemStackTagsEqual
                 * @param stackA 
                 * @param stackB 
                 */
                static func_185132_d(stackA: ItemStack, stackB: ItemStack): boolean;

                static areItemStacksEqualUsingNBTShareTag(stackA: ItemStack, stackB: ItemStack): boolean;
                static areItemStackShareTagsEqual(stackA: ItemStack, stackB: ItemStack): boolean;

                /**
                 * func_77982_d
                 * @param nbt 
                 */
                setTagCompound(nbt: net.minecraft.nbt.NBTTagCompound | null): void;
                /**
                 * setTagCompound
                 * @param nbt 
                 */
                func_77982_d(nbt: net.minecraft.nbt.NBTTagCompound | null): void;
            }
        }
        namespace nbt {
            class NBTBase {
                /**
                 * func_74737_b
                 */
                copy(): this;
                /**
                 * copy
                 */
                func_74737_b(): this;
                equals(o: object): boolean;
                /**
                 * func_74732_a
                 */
                getId(): number;
                /**
                 * getId
                 */
                func_74732_a(): number;
                /**
                 * func_193581_j
                 * @param id 
                 */
                static getTypeName(id: number): string;
                /**
                 * getTypeName
                 * @param id 
                 */
                static func_193581_j(id: number): string;
                hashCode(): number;
                /**
                 * func_82582_d
                 */
                isEmpty(): boolean;
                /**
                 * isEmpty
                 */
                func_82582_d(): boolean;
                toString(): string;
            }
            class NBTTagCompound extends NBTBase {
                /**
                 * func_74774_a
                 * @param key 
                 * @param byte 
                 */
                setByte(key: string, byte: number): void;
                /**
                 * setByte
                 * @param key 
                 * @param byte 
                 */
                func_74774_a(key: string, byte: number): void;

                /**
                 * func_74757_a
                 * @param key 
                 * @param bool 
                 */
                setBoolean(key: string, bool: boolean): void;
                /**
                 * setBoolean
                 * @param key 
                 * @param bool 
                 */
                func_74757_a(key: string, bool: boolean): void;

                /**
                 * func_74777_a
                 * @param key 
                 * @param short 
                 */
                setShort(key: string, short: number): void;
                /**
                 * setShort
                 * @param key 
                 * @param short 
                 */
                func_74777_a(key: string, short: number): void;

                /**
                 * func_74768_a
                 * @param key 
                 * @param int 
                 */
                setInteger(key: string, int: number): void;
                /**
                 * setInteger
                 * @param key 
                 * @param int 
                 */
                func_74768_a(key: string, int: number): void;

                /**
                 * func_74772_a
                 * @param key 
                 * @param long 
                 */
                setLong(key: string, long: number): void;
                /**
                 * setLong
                 * @param key 
                 * @param long 
                 */
                func_74772_a(key: string, long: number): void;

                /**
                 * func_74776_a
                 * @param key 
                 * @param float 
                 */
                setFloat(key: string, float: number): void;
                /**
                 * setFloat
                 * @param key 
                 * @param float 
                 */
                func_74776_a(key: string, float: number): void;

                /**
                 * func_74780_a
                 * @param key 
                 * @param double 
                 */
                setDouble(key: string, double: number): void;
                /**
                 * setDouble
                 * @param key 
                 * @param double 
                 */
                func_74780_a(key: string, double: number): void;

                /**
                 * func_74773_a
                 * @param key 
                 * @param byteArray 
                 */
                setByteArray(key: string, byteArray: number[]): void;
                /**
                 * setByteArray
                 * @param key 
                 * @param byteArray 
                 */
                func_74773_a(key: string, byteArray: number[]): void;

                /**
                 * func_74778_a
                 * @param key 
                 * @param str 
                 */
                setString(key: string, str: string): void;
                /**
                 * setString
                 * @param key 
                 * @param str 
                 */
                func_74778_a(key: string, str: string): void;

                /**
                 * func_186854_a
                 * @param key 
                 * @param uuid 
                 */
                setUniqueId(key: string, uuid: java.util.UUID): void;
                /**
                 * setUniqueId
                 * @param key 
                 * @param uuid 
                 */
                func_186854_a(key: string, uuid: java.util.UUID): void;

                /**
                 * func_74783_a
                 * @param key 
                 * @param intArray 
                 */
                setIntegerArray(key: string, intArray: number[]): void;
                /**
                 * setIntegerArray
                 * @param key 
                 * @param intArray 
                 */
                func_74783_a(key: string, intArray: number[]): void;

                /**
                 * func_74771_c
                 * @param key 
                 */
                getByte(key: string): number;
                /**
                 * getByte
                 * @param key 
                 */
                func_74771_c(key: string): number;

                /**
                 * func_74765_d
                 * @param key 
                 */
                getShort(key: string): number;
                /**
                 * getShort
                 * @param key 
                 */
                func_74765_d(key: string): number;

                /**
                 * func_74762_e
                 * @param key 
                 */
                getInteger(key: string): number;
                /**
                 * getInteger
                 * @param key 
                 */
                func_74762_e(key: string): number;

                /**
                 * func_74763_f
                 * @param key 
                 */
                getLong(key: string): number;
                /**
                 * getLong
                 * @param key 
                 */
                func_74763_f(key: string): number;

                /**
                 * func_74760_g
                 * @param key 
                 */
                getFloat(key: string): number;
                /**
                 * getFloat
                 * @param key 
                 */
                func_74760_g(key: string): number;

                /**
                 * func_74769_h
                 * @param key 
                 */
                getDouble(key: string): number;
                /**
                 * getDouble
                 * @param key 
                 */
                func_74769_h(key: string): number;
            }
        }
        namespace server {
            namespace management {
                interface PlayerList {
                    addOp(profile: com.mojang.authlib.GameProfile): void;
                    addWhitelistedPlayer(profile: com.mojang.authlib.GameProfile): void;
                    bypassesPlayerLimit(profile: com.mojang.authlib.GameProfile): boolean;
                    canJoin(profile: com.mojang.authlib.GameProfile): boolean;
                    canSendCommands(profile: com.mojang.authlib.GameProfile): boolean;
                    createPlayerForUser(profile: com.mojang.authlib.GameProfile): entity.player.EntityPlayerMP;
                    getAvailablePlayerDat(): string[];
                    getBannedIPs(): UserListIPBans;
                    getBannedPlayers(): UserListBans;
                    getCurrentPlayerCount(): number;
                    getEntityViewDistance(): number;
                    getFormattedListOfPlayers(includeUUIDs: boolean): string;
                    getMaxPlayers(): number;
                    getOnlinePlayerNames(): string[];
                    getOnlinePlayerProfiles(): com.mojang.authlib.GameProfile[];
                    getOppedPlayerNames(): string[];
                    getOppedPlayers(): UserListOps;
                    getPlayerByUsername(username: string): entity.player.EntityPlayerMP;
                    getPlayerByUUID(uuid: java.util.UUID): entity.player.EntityPlayerMP;
                    getPlayers(): java.util.List<entity.player.EntityPlayerMP>;
                    getPlayersMatchingAddress(address: string): java.util.List<entity.player.EntityPlayerMP>;
                    getServerInstance(): MinecraftServer;
                    getViewDistance(): number;
                    getWhitelistedPlayerNames(): string[];
                    getWhitelistedPlayers(): UserListWhitelist;
                    isWhiteListEnabled(): boolean;
                }
                interface PlayerProfileCache {
                    addEntry(profile: com.mojang.authlib.GameProfile): void;
                    getGameProfileForUsername(username: string): com.mojang.authlib.GameProfile;
                    getProfileByUUID(uuid: java.util.UUID): com.mojang.authlib.GameProfile;
                    getUsernames(): string[];
                    load(): void;
                    save(): void;
                }
                interface UserList<K,V extends UserListEntry<K>> {
                    addEntry(entry: V): void;
                    getEntry(obj: K): V;
                    getKeys(): string[];
                    isEmpty(): boolean;
                    isLanServer(): boolean;
                    readSavedFile(): void;
                    removeEntry(entry: K): void;
                    setLanServer(state: boolean): void;
                    writeChanges(): void;
                }
                interface UserListBans extends UserList<com.mojang.authlib.GameProfile, UserListBansEntry> {
                    getBannedProfile(username: string): com.mojang.authlib.GameProfile;
                    isBanned(profile: com.mojang.authlib.GameProfile): boolean;
                }
                interface UserListBansEntry extends UserListEntryBan<com.mojang.authlib.GameProfile> {}
                interface UserListEntry<T> {}
                interface UserListEntryBan<T> extends UserListEntry<T> {
                    getBanEndDate(): java.util.Date;
                    getBanReason(): string;
                }
                interface UserListIPBans extends UserList<string, UserListIPBansEntry> {
                    getBanEntry(address: any): UserListIPBansEntry;
                    isBanned(address: any): boolean;
                }
                interface UserListIPBansEntry extends UserListEntryBan<string> {}
                interface UserListOps extends UserList<com.mojang.authlib.GameProfile, UserListOpsEntry> {
                    bypassesPlayerLimit(profile: com.mojang.authlib.GameProfile): boolean;
                    getGameProfileFromName(username: string): com.mojang.authlib.GameProfile;
                    getPermissionLevel(profile: com.mojang.authlib.GameProfile): number;
                }
                interface UserListOpsEntry extends UserListEntry<com.mojang.authlib.GameProfile> {
                    bypassesPlayerLimit(): boolean;
                    getPermissionLevel(): number;
                }
                interface UserListWhitelist extends UserList<com.mojang.authlib.GameProfile, UserListWhitelistEntry> {
                    getByName(profileName: string): com.mojang.authlib.GameProfile;
                    isWhitelisted(profile: com.mojang.authlib.GameProfile): boolean;
                }
                interface UserListWhitelistEntry extends UserListEntry<com.mojang.authlib.GameProfile> {}
            }
            interface MinecraftServer {
                allowSpawnMonsters(): boolean;
                canCreateBonusChest(enable: boolean): void;
                canStructureSpawn(): boolean;
                canUseCommand(permLevel: number, commandName: string): boolean;
                getAllowNether(): boolean;
                getBuildLimit(): number;
                getCanSpawnAnimals(): number;
                getCanSpawnNPCs(): boolean;
                getCurrentPlayerCount(): number;
                getCurrentTime(): number;
                getDifficulty(): world.EnumDifficulty;
                getEntityFromUUID(uuid: java.util.UUID): entity.Entity;
                getEntityWorld(): world.World;
                getFolderName(): string;
                getForceGamemode(): boolean;
                getGameType(): world.GameType;
                getGuiEnabled(): boolean;
                getMaxPlayerIdleMinutes(): number;
                getMaxPlayers(): number;
                getMaxWorldSize(): number;
                getMinecraftVersion(): string;
                getMOTD(): string;
                getName(): string;
                getNetworkCompressionThreshold(): number;
                getOnlinePlayerNames(): string[];
                getOnlinePlayerProfiles(): com.mojang.authlib.GameProfile[];
                getOpPermissionLevel(): number;
                getPlayerList(): management.PlayerList;
                getPlayerProfileCache(): management.PlayerProfileCache;
                getPreventProxyConnections(): boolean;
                getResourcePackHash(): string;
                getResourcePackUrl(): string;
                getServer(): MinecraftServer;
                getServerHostname(): string;
                getServerModname(): string;
                getServerOwner(): string;
                getServerPort(): number;
                getServerProxy(): any;
                getSpawnProtectionSize(): number;
                getUserMessage(): string;
                getWorld(dimension: number): world.WorldServer;
                getWorldName(): string;
            }
        }
        namespace util {
            namespace math {
                interface BlockPos extends Vec3i {
                    add(x: number, y: number, z: number): BlockPos;
                    add(vec: Vec3i): BlockPos;
                    crossProduct(vec: Vec3i): BlockPos;
                    down(n: number): BlockPos;
                    down(): BlockPos;
                    east(n: number): BlockPos;
                    east(): BlockPos;
                    north(n: number): BlockPos;
                    north(): BlockPos;
                    offset(facing: EnumFacing, n: number): BlockPos;
                    offset(facing: EnumFacing): BlockPos;
                    rotate(rotation: Rotation): BlockPos;
                    south(n: number): BlockPos;
                    south(): BlockPos;
                    subtract(vec: Vec3i): BlockPos;
                    toImmutable(): BlockPos;
                    toLong(): number;
                    up(n: number): BlockPos;
                    up(): BlockPos;
                    west(n: number): BlockPos;
                    west(): BlockPos;
                }
                interface Vec3i {
                    compareTo(other: Vec3i): -1|0|1;
                    crossProduct(other: Vec3i): Vec3i;
                    distanceSq(toX: number, toY: number, toZ: number): number;
                    distanceSq(to: Vec3i): number;
                    distanceSqToCenter(xIn: number, yIn: number, zIn: number): number;
                    equals(o: object): boolean;
                    getDistance(xIn: number, yIn: number, zIn: number): number;
                    getX(): number;
                    getY(): number;
                    getZ(): number;
                    hashCode(): number;
                    toString(): string;
                }
            }
            namespace text {
                class TextComponentBase implements ITextComponent {
                    static createDeepCopyIterator(components: java.lang.Iterable<ITextComponent>): java.util.Iterator<ITextComponent>;
                }
                interface ITextComponent extends java.lang.Iterable<ITextComponent> {
                    setStyle(style: Style): ITextComponent;
                    getStyle(): Style;
                    appendText(text: string): ITextComponent;
                    appendSibling(component: ITextComponent): ITextComponent;
                    getUnformattedComponentText(): string;
                    getUnformattedText(): string;
                    getFormattedText(): string;
                    getSiblings(): java.util.List<ITextComponent>;
                    createCopy(): ITextComponent;
                }
                class Style {}
                class TextFormatting {
                    static readonly BLACK: TextFormatting;
                    static readonly DARK_BLUE: TextFormatting;
                    static readonly DARK_GREEN: TextFormatting;
                    static readonly DARK_AQUA: TextFormatting;
                    static readonly DARK_RED: TextFormatting;
                    static readonly DARK_PURPLE: TextFormatting;
                    static readonly GOLD: TextFormatting;
                    static readonly GRAY: TextFormatting;
                    static readonly DARK_GRAY: TextFormatting;
                    static readonly BLUE: TextFormatting;
                    static readonly GREEN: TextFormatting;
                    static readonly AQUA: TextFormatting;
                    static readonly RED: TextFormatting;
                    static readonly LIGHT_PURPLE: TextFormatting;
                    static readonly YELLOW: TextFormatting;
                    static readonly WHITE: TextFormatting;
                    static readonly OBFUSCATED: TextFormatting;
                    static readonly BOLD: TextFormatting;
                    static readonly STRIKETHROUGH: TextFormatting;
                    static readonly UNDERLINE: TextFormatting;
                    static readonly ITALIC: TextFormatting;
                    static readonly RESET: TextFormatting;

                    getColorIndex(): number;
                    isFancyStyling(): boolean;
                    isColor(): boolean;
                    getFriendlyName(): string;
                    toString(): string;

                    static getTextWithoutFormattingCodes(text: string | null): string | null;
                    static getValueByName(friendlyName: string | null): TextFormatting | null;
                    static fromColorIndex(index: number): TextFormatting | null;
                    static getValidValues(allowColors: boolean, allowFancyStyles: boolean): java.util.Collection<string>;
                }
            }
            enum EnumFacing {
                DOWN,
                EAST,
                NORTH,
                SOUTH,
                UP,
                WEST
            }
            class ResourceLocation {
                constructor(resourceName: string);
                constructor(namespaceIn: string, path: string);

                static splitObjectName(toSplit: string): [string, string];

                getPath(): string;
                getNamespace(): string;
                toString(): string;
                equals(o: object): boolean;
                hashCode(): number;
                compareTo(other: ResourceLocation): -1|0|1;
            }
            interface Rotation {
                add(other: Rotation): Rotation;
                rotate(facing: EnumFacing): EnumFacing;
                rotate(a: number, b: number): number;
            }
            namespace Rotation {
                const CLOCKWISE_180: Rotation;
                const CLOCKWISE_90: Rotation;
                const COUNTERCLOCKWISE_90: Rotation;
                const NONE: Rotation;
                function valueOf(name: string): Rotation;
                function values(): Rotation[];
            }
            class SoundEvent extends net.minecraftforge.registries.IForgeRegistryEntry.Impl<SoundEvent> {
                getSoundName(): ResourceLocation;
            }
        }
        namespace world {
            interface EnumDifficulty {
                getDifficultyId(): number;
                getDifficultyResourceKey(): string;
            }
            namespace EnumDifficulty {
                const EASY: EnumDifficulty;
                const HARD: EnumDifficulty;
                const NORMAL: EnumDifficulty;
                const PEACEFUL: EnumDifficulty;

                function getDifficultyEnum(id: number): EnumDifficulty;
                function valueOf(name: string): EnumDifficulty;
                function values(): EnumDifficulty[];
            }
            interface GameType {
                getID(): number;
                getName(): string;
                hasLimitedInteractions(): boolean;
                isCreative(): boolean;
                isSurvivalOrAdventure(): boolean;
            }
            namespace GameType {
                const ADVENTURE: GameType;
                const CREATIVE: GameType;
                const NOT_SET: GameType;
                const SPECTATOR: GameType;
                const SURVIVAL: GameType;

                function getByID(id: number): GameType;
                function getByName(name: string): GameType;
                function parseGameTypeWithDefault(id: number, fallback: GameType): GameType;
                function parseGameTypeWithDefault(name: string, fallback: GameType): GameType;
                function valueOf(name: string): GameType;
                function values(): GameType[];
            }
            interface IWorldNameable {
                getName(): string;
                hasCustomName(): boolean;
                getDisplayName(): util.text.ITextComponent;
            }
            interface World {}
            interface WorldServer extends World {
                addBlockEvent(pos: util.math.BlockPos, blockIn: any, eventID: number, eventParam: number): void;
                addWeatherEffect(entityIn: entity.Entity): boolean;

                getMinecraftServer(): server.MinecraftServer;
            }
        }
    }

    namespace minecraftforge {
        namespace common {
            interface IRarity {
                getColor(): net.minecraft.util.text.TextFormatting;
                getName(): string;
            }
        }
        namespace fluids {
            class Fluid {
                static readonly BUCKET_VOLUME: 1000;

                constructor(
                    fluidName: string,
                    still: net.minecraft.util.ResourceLocation,
                    flowing: net.minecraft.util.ResourceLocation,
                    overlay?: net.minecraft.util.ResourceLocation | null,
                    color?: number
                );

                setUnlocalizedname(unlocalizedName: string): Fluid;
                setBlock(block: net.minecraft.block.Block): Fluid;
                setLuminosity(luminosity: number): Fluid;
                setDensity(density: number): Fluid;
                setTemperature(temperature: number): Fluid;
                setViscosity(viscosity: number): Fluid;
                setGaseous(isGaseous: boolean): Fluid;
                setRarity(rarity: net.minecraft.item.EnumRarity): Fluid;
                setFillSound(fillSound: net.minecraft.util.SoundEvent): Fluid;
                setEmptySound(emptySound: net.minecraft.util.SoundEvent): Fluid;
                setColor(color: number): Fluid;
                getName(): string;
                getBlock(): net.minecraft.block.Block;
                canBePlacedInWorld(): boolean;
                isLighterThanAir(): boolean;
                doesVaporize(fluidStack: FluidStack): boolean;
                vaporize(
                    player: net.minecraft.entity.player.EntityPlayer | null,
                    world: net.minecraft.world.World,
                    pos: net.minecraft.util.math.BlockPos,
                    fluidStack: FluidStack
                ): void;
                getLocalizedName(stack: FluidStack): string;
                getUnlocalizedName(stack: FluidStack): string;
                getUnlocalizedName(): string;
                getLuminosity(): number;
                getDensity(): number;
                getTemperature(): number;
                getViscosity(): number;
                isGaseous(): number;
                getRarity(): net.minecraft.item.EnumRarity;
                getColor(): number;
                getStill(): net.minecraft.util.ResourceLocation;
                getFlowing(): net.minecraft.util.ResourceLocation;
                getOverlay(): net.minecraft.util.ResourceLocation | null;
                getFillSound(): net.minecraft.util.SoundEvent;
                getEmptySound(): net.minecraft.util.SoundEvent;
            }
            class FluidStack {
                amount: number;
                tag: net.minecraft.nbt.NBTTagCompound;

                constructor(fluid: Fluid | FluidStack, amount: number, nbt?: net.minecraft.nbt.NBTTagCompound);
                static loadFluidStackFromNBT(nbt: net.minecraft.nbt.NBTTagCompound): FluidStack | null;

                writeToNBT(nbt: net.minecraft.nbt.NBTTagCompound): net.minecraft.nbt.NBTTagCompound;
                getFluid(): Fluid;
                getLocalizedName(): string;
                getUnlocalizedName(): string;
                copy(): FluidStack;
                isFluidEqual(other: FluidStack | null): boolean;
                isFluidEqual(other: net.minecraft.item.ItemStack): boolean;
                static areFluidStackTagsEqual(stack1: FluidStack | null, stack2: FluidStack | null): boolean;
                containsFluid(other: FluidStack): boolean;
                isFluidStackIdentical(other: FluidStack): boolean;
            }
        }
        namespace registries {
            interface IForgeRegistryEntry<V> {
                setRegistryName(name: net.minecraft.util.ResourceLocation): V;
                getRegistryName(): net.minecraft.util.ResourceLocation;
                getRegistryType(): java.lang.Class<V>;
            }
            namespace IForgeRegistryEntry {
                class Impl<T extends IForgeRegistryEntry<T>> implements IForgeRegistryEntry<T> {
                    readonly delegate: IRegistryDelegate<T>;
                }
            }
            interface IRegistryDelegate<T> {
                get(): T;
                name(): net.minecraft.util.ResourceLocation;
                type(): java.lang.Class<T>;
            }
        }
    }
}

declare namespace java {
    namespace lang {
        namespace reflect {
            interface Method {
                getModifiers(): number;
            }
            namespace Modifier {
                const ABSTRACT: 1024;
                const FINAL: 16;
                const INTERFACE: 512;
                const NATIVE: 256;
                const PRIVATE: 2;
                const PROTECTED: 4;
                const PUBLIC: 1;
                const STATIC: 8;
                const STRICT: 2048;
                const SYNCHRONIZED: 32;
                const TRANSIENT: 128;
                const VOLATILE: 64;

                function classModifiers(): number;
                function constructorModifiers(): number;
                function fieldModifiers(): number;
                function interfaceModifiers(): number;
                function isAbstract(mod: number): boolean;
                function isFinal(mod: number): boolean;
                function isInterface(mod: number): boolean;
                function isNative(mod: number): boolean;
                function isPrivate(mod: number): boolean;
                function isProtected(mod: number): boolean;
                function isPublic(mod: number): boolean;
                function isStatic(mod: number): boolean;
                function isStrict(mod: number): boolean;
                function isSynchronized(mod: number): boolean;
                function isTransient(mod: number): boolean;
                function isVolatile(mod: number): boolean;
                function methodModifiers(): number;
                function parameterModifiers(): number;
                function toString(mod: number): string;
            }
        }
        class Class<T> {
            getDeclaredMethods(): reflect.Method[];
        }
        interface Iterable<T> {
            forEach(action: func.Consumer<T>): void;
            iterator(): util.Iterator<T>;
        }
    }
    namespace util {
        namespace func {
            type Consumer<T> = (t: T) => void;
            type Function<T,R> = (t: T) => R;
            type Predicate<T> = (t: T) => boolean;
            type UnaryOperator<T> = Function<T,T>;
        }
        interface Collection<T> extends lang.Iterable<T> {
            add(t: T): boolean;
            addAll<E extends T>(c: Collection<E>): boolean;
            clear(): void;
            contains(o: object): boolean;
            containsAll(c: Collection<object>): boolean;
            equals(o: object): boolean;
            hashCode(): number;
            isEmpty(): boolean;
            remove(o: object): boolean;
            removeAll(c: Collection<any>): boolean;
            removeIf<E extends T>(filter: func.Predicate<E>): boolean;
            retainAll(c: Collection<object>): boolean;
            size(): number;
            toArray(): object[];
            toArray<E>(a: E[]): E[];
        }
        interface Comparator<T> {
            commpare(a: T, b: T): -1|0|1;
            equals(o: object): boolean;
            reversed(): Comparator<T>;
            thenComparing(other: Comparator<T>): Comparator<T>;
        }
        interface Date {}
        interface Iterator<T> {
            forEachRemaining(action: func.Consumer<T>): void;
            hasNext(): boolean;
            next(): T;
            remove(): void;
        }
        interface List<T> extends Collection<T> {
            add(index: number, element: T): void;
            addAll<E extends T>(index: number, c: Collection<E>): boolean;
            get(index: number): T;
            indexOf(o: object): number;
            lastIndexOf(o: object): number;
            listIterator(index: number): ListIterator<T>;
            listIterator(): ListIterator<T>;
            remove(index: number): T;
            replaceAll(operator: func.UnaryOperator<T>): void;
            set(index: number, element: T): T;
            sort(c: Comparator<T>): void;
            subList(fromIndex: number, toIndex: number): List<T>;
        }
        interface ListIterator<T> extends Iterator<T> {
            add(t: T): void;
            hasPrevious(): boolean;
            nextIndex(): number;
            previous(): T;
            previousIndex(): number;
            set(t: T): void;
        }
        interface UUID {
            clockSequence(): number;
            compareTo(other: UUID): -1|0|1;
            equals(obj: object): boolean;
            getLeastSignificantBits(): number;
            getMostSignificantBits(): number;
            hashCode(): number;
            node(): number;
            timestamp(): number;
            toString(): string;
            isVariableDeclarationStatement(): number;
            version(): number;
        }
        const UUID: {
            new(mostSigBits: number, leastSigBits: number): UUID;
            fromString(name: string): UUID;
            nameUUIDFromBytes(name: number[]): UUID;
            randomUUID(): UUID;
        }
    }
}