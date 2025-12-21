Since '''v1.7.0''' the game supports the creation of Mods containing scripts written in the [https://www.lua.org/ LUA] programming language to customize the behavior of the game. Before getting started on creating those scripts, you should first read the [[Creating Mods for the Game|general guidelines about how to create and publish mods]]. If you have any issue, blockers or suggestions feel free to join the [https://discord.gg/PqFpUJGc3T Discord server] where we you can ask your questions to the developer of the game or the community of mods developers.

=== Scenario Extension Mod ===
With v1.7.0, the game supports a new kind of mod called ''Scenario Extension''. These extensions are declared like other mods (see [[Creating Mods for the Game|guidelines]] about using ''mod.json'' and associated sample mod [https://drive.google.com/file/d/1S2IBRbREIm3BiKUpSoEfqMukzaOtZurZ/view?usp=sharing zip file] for the format of the scenario extension ''mod.json''). You can also look at the sample mods in the [https://steamcommunity.com/app/1671590 Steam workshop] of the game (ex: the ''Shadow of Death'' mod).

''Scenario Extensions'' mods are written using a [https://www.lua.org/ LUA] script (similar syntax as Javascript). When a player configures a new crusade/scenario, they can select one or more ''Scenario Extensions'' to attach to that scenario. The script for each selected extension will be loaded when the scenario starts (or is resumed after a save->load). Then throughout the lifecycle of the scenario, the game will execute callbacks declared by the script passing in some contextual information and the full gameState and associated APIs to mutate it. Any mutation performed by the script will then be reflected onto the UI and also persisted in the save file.

=== Editing and Validating LUA files ===
I recommend using [https://code.visualstudio.com/download Visual Studio Code] (free code editor) with the [https://marketplace.visualstudio.com/items?itemName=sumneko.lua LUA plugin].  Once VSCode and LUA plugin are installed, you can setup the plugin to recognize Paladin's Oath `definition.lua` file provided in the mod.zip file:

Go to the plugin settings (@ext:sumneko.lua) > Workspace >  Lua Workspace: Library, and add an item with the relative path to the definition.lua file )in VSCode, hover the mouse over the definition.lua file in your workspace, right click > Copy Relative Path). This will ensure the LUA scripts you create (or provided by mod.zip) are able to recognize the various entity types and functions that Paladin's Oath provides.

=== Context and Mod State===
Most of the LUA functions that the game calls get a ''context'' object passed in. The context contains information related to the mod and scenario extension as well as access to some API to store and retreive state pertaining to the execution of the script:

<source lang="lua">
-- ID of the mod where the extension is coming from (ex: "mod:com.firebiscuit:my_mod")
context.ModId

 -- ID of the scenario extension itself (ex: "mod:com.firebiscuit:my_mod:scenario_ext_custom_ext")
context.ExtensionId

 -- API to load/save state pertaining to the execution of this script
context.ModState
</source>

====Managing State for the Script via ''ModState''====
It is highly recommended that you '''avoid relying on global variables''' to manage the state of your mod.  The reason being that the game needs to support the ability for players to save and reload the game at a later time. When a game is reloaded, a new LUA runtime is created to run your script and thus the previous script global state is lost / will not be recovered. To help you with managing persistent state between various calls to the lua hooks, the game passes a ''ModState'' API to LUA via the context object. You can use ''ModState'' to read and write '''strings''', '''booleans''', and '''integers''' values into the state (indexed by a '''string''' key). These values will be persisted into the game save file and restored on next game load and passed to your script every time it is called.

<source lang="lua">
local modState = context.ModState

-- Check existence of value in the state
local hasValue = modState.Has("myKey")

-- Delete a value stored in the state
modState.Clear("myKey")

-- Delete all values stored in the state
modState.ClearAll()

-- R/W String Values
local sVal = modState.GetString("myKey")
modState.SetString("myKey", "someStringValue")

-- R/W Integer Values
local iVal = modState.GetInt("myKey")
modState.SetInt("myKey", 1000)

-- R/W Boolean Values (True/False)
local bVal = modState.GetBool("myKey")
modState.SetBool("myKey", True)

</source>

You should use ''ModState'' if you need to store and retrieve information in-between calls to your script that you cannot find in the gameState itself. For example the ''Shadow of Death'' mod which spawns an enemy that follows the player around uses ''ModState'' to store information about the last known position of the player, whether the enemy has spawned and was killed. 

'''Important:''' like the name suggests, ''ModState'' is a global state for the entire Mod. So if your Mod contains multiple ''Scenario Extensions'', you can use the ''ModState'' to exchange information between them. Note though that the game offers no guarantee of the order of execution between scenario extensions. Even if you don't want to exchange information between the extensions coming from a same mod, be mindful of your ''ModState'' keys so they don't conflict with keys from the other extensions for that same Mod. You can use the ''context.ExtensionId'' to pre-fix your keys if that's the case. If your mod only has one ''Scenario Extension'' then you don't need to worry about this and can use whatever keys you want. 

===Debugging the Scripts===
The game offers rudimentary support for developers to debug their scripts. Ultimately the game won't tell you if your LUA script has syntax errors so you should double check your lua syntax yourself. But the game helps you in testing the behavior of your script a little bit.

You should also use [https://rextester.com/l/lua_online_compiler online tools] to validate your LUA script syntax before testing the script in the game.

First the game automatically pops up a '''new panel for script debugging''' at the ''Campfire'' and at the ''Exploration'' screen. The panel shows a drop down with all active dev mods with scripts. You select yours and you can click the buttons to reload the script and also trigger some lifecycle events (currently only supports the ''OnCrusadeUpdated'' event). Note that If you are downloading mods from the internet (not Steam) the panel will always show up unless you disable the panel in the ''Game Options > Mods > Developer Mode''.

The lua scripts already come equiped with some useful methods:

* ''print(stringValue)'' - which prints to the game logs prefixing all strings with the ''extensionId;''
* ''debug_print(stringValue)'' - which prints to the game logs when the mod is not loaded from Steam, prefixing all strings with the ''extensionId;''
* ''json.parse(jsonString)'' - returns a table with the contents of the specified json string;
* ''json.serialize(table)'' - returns a json string with the content of the specified lua table ;

You should also open the game logs in your text editor of choice and filter the logs using your ''modId'' or ''extensionId'' to see all the logs pertaining to your mod/extension. See [[Game File Locations]] for where to find the logs for your current platform. 

'''Note:''' if you end up developing a bunch of helper methods useful for other scripts, feel free to let me know and I can add them to the lua global state for every scripts moving forward.
===Lifecycle events===
A scenario (or ''Crusade'') has multiple events happening from the start of a scenario to the end of it. Each major event has a corresponding hook that the LUA script can implement to react to it. See below for all the events that the script can hook into.   

<source lang="lua">
-- ===============
-- This function is called right after the crusade configuration has been created by the scenario configuration flow.
-- Use this to make major configuration changes that will apply to the crusade when it starts.
-- DO NOT CHANGE the scenarioData at this point. Anyway you can try and you'll see weird inconsistencies happening :p
--
-- Params:
--  * crusadeConfig: mutable lua Table. See SAVE file format for "crusadeConfig".
--  * modId: string Id of this mod
--  * extensionId: string Id of this ScenarioExtension
function ConfigureCrusade(crusadeConfig, modId, extensionId)
     print("ConfigureCrusade "..crusadeConfig['scenarioData'])
end

-- ===============
-- This function is called before the crusade is started after the scenario has been selected.
-- At this point you should NOT MAKE CHANGES to CrusadeConfig, use "ConfigureCrusade" instead.
-- Use this to make major changes to the entire crusade after it has been configured.
--
-- Params:
--  * crusade: mutable lua Table. See SAVE file format for "crusade".
--  * modId: string Id of this mod, can be used to modify the 'modsState' data
--  * extensionId: string Id of this ScenarioExtension
function InitializeCrusade(crusade, modId, extensionId)
     print("InitializeCrusade "..crusade['crusadeConfig']['scenarioData'])
end

-- ===============
-- This function is called right before the crusade is ended.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnCrusadeEnds(context, gameState)
     print("OnCrusadeEnds")
end

-- ===============
-- This function is called every time the crusade state is updated, right before saving.
-- You should avoid hooking to this as this is super generic and called pretty often so you'll have to figure out what has changed yourself.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnCrusadeUpdated(context, gameState)
    print("OnCrusadeUpdated")
end

-- ===============
-- This function is called at the beginning of a round before the campfire loads the state.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnRoundStarts(context, gameState)
     print("OnRoundStarts")
end

-- This function is called at the end of a round before the campfire transitions to the next state.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnRoundEnds(context, gameState)
     print("OnRoundEnds")
end

-- ===============
-- This function is called at the beginning of a turn before the campfire loads the state.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnStarts(context, gameState)
     print("OnTurnStarts")
end

-- ===============
-- This function is called at the end of a turn before the campfire transitions to the next turn.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnEnds(context, gameState)
     print("OnTurnEnds")
end

-- ===============
-- This function is called right before the exploration scene will be loaded.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnExplorationStarts(context, gameState)
     print("OnExplorationStarts")
end

-- ===============
-- This function is called right before the exploration ended and campfire will start.
-- Note this will not be called if the player triggered a battle, only if the exploration was ended naturally.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnExplorationEnds(context, gameState)
     print("OnExplorationEnds")
end

-- ===============
-- This function is called right before the battle starts.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnBattleStarts(context, gameState)
     print("OnBattleStarts")
end

-- ===============
-- This function is called right after the battle has completed.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnBattleEnds(context, gameState)
     print("OnBattleEnds")
end

</source>

==== Using OnCrusadeStateUpdated ====
it can be tempting to hook into the ''OnCrusadeUpdated'' event which is the one called the most often. But unless you need to react to everything the player is committing (ex: each time the player moves or explores), then you are better served reacting to higher-level events like ''OnTurnStart'' or ''OnRoundStarts'' for example. Some reasons include the fact that ''OnCrusadeUpdated'' '''will be called multiple times''' throughout a single turn and each time it is called, your game must do a diff between the last time it was called to understand what has changed, for example a new section was revealed or some cards where acquired or discarded.

===Script must be a good citizen===
The game loads an individual runtime for each scripts meaning there is no risk that the variables and method names used in one script conflicts with another script. But it's important to understand that scripts are expensive to run and if a game has multiple mods to run sequentially it might slow down the game if the scripts are not optimized. Here are some examples of optimizations and other aspect of script writing you need to pay attention to.

====Order of Operations====
Your extension might be running alongside multiple other scenario extensions. The order of execution between scenario extensions is '''not''' guaranteed. So you should not depend on your extension running before or after another extension. '''BUT''' the scenario script will always run '''AFTER''' all the scenario extensions have run, meaning that the scenario will see the gameState after all the extensions had a chance to react to it. So that also means that if the scenario is modifying the game state, your scenario extension cannot depend on that game state modification to do stuff. ''Let me know if that becomes a problem for your mod, and we can figure out some before/after methods for those lifecycle events''.

====Avoid breaking the game state====
It seems obvious but if you are making major changes to the game state, the current scenario might just break. For example if you delete the citadels when a scenario needs the player to conquer 4 citadels, then the scenario will never complete anymore. Or if you remove cards from the game, or remove monsters that the scenario needs. 

====Cache Game State API results====
Communication between LUA and the game is expensive so you should avoid calling the gameState APIs or cache those API results as much as possible. For example calling any API returning an array of stuff requires the game to serialize the list of stuff from game memory into Lua values. So you should cache the API result into a ''local'' variable and use that instead of repeatedly call the API. Each object returned by the gameState API is itself a wrapper around another game object (in game memory), so the caching should apply to calling those wrapper objects too.

====Remove unused code====
You should comment-out or delete the hooks that you do not use. Don't keep empty methods (like above which is for illustration purpose only). The game doesn't know whether a hook is doing something useful or not. It only checks for the presence of a hook in the lua code before executing. When executing a hook the game has to wrap the gameState and other APIs to make them accessible to LUA which is not cheap. So the game should avoid doing that: if you don't need to react to a particular event, delete the code or comment it out.

====Avoid Printing====
Usage of the ''print'' function should be reserved for high-level events that you want to see in the game log. Printing is expensive since it often involves concatenating strings then passing the full string to the game, the game then prefixing it with the extension Id then outputting it into the game log file (which is a I/O operation). So avoid printing unless you need the info if players are having issues with your mod and you need high-level events to help with the debugging process. And definitely '''avoid printing in a loop.'''

===== Using debug_print =====
If you need to debug during development you can use the ''debug_print'' method which will be disabled when the mod is downloaded from Steam (or used in non-dev mode). You should still comment-out or delete the ''debug_print'' methods that you don't need anymore since they might still require accessing objects or concatenating strings and other values.

<source lang="lua">debug_print('some debug text '..gameState.Player.Hand[1].Name)</source>
This code even though the debug log will not be printed by the game still needs to build the debug string by accessing the game API to get the Name of the first card in the player's hand. Which is unnecessary computation.

====Other optimizations==== 

*Avoid looping if you can get the info by using an ID
* Avoid repeated array access, use local variables instead
*[...] any other general best practices when coding in LUA :)

===Accessing Common Game Values===
All the values for common game concepts are listed in [[Mods values|this wiki page]]. To simplify mods creation, the Lua script is injected with a global `''GameValues''` object that exposes all these game values as constants. You can also use the int or string values of these constants directly as they are equivalent.

<source lang="lua">
GameValues.TimeDay -- id of the TimeOfDay "day"
GameValues.TimeNight -- id of the TimeOfDay "day"

GameValues.CardWoundId -- id of the Wound card (they all have the same ID for that card type)

-- Card Types
GameValues.CardTypeWound
GameValues.CardTypeAction
GameValues.CardTypeRelic
GameValues.CardTypeSpell

-- Card Locations
GameValues.CardLocationHand
GameValues.CardLocationDiscardPile
GameValues.CardLocationDrawPile

-- Attack Types
GameValues.AttackBasic
GameValues.AttackRange
GameValues.AttackSiege

-- Attack Modifiers
GameValues.AttackModifierPoison
GameValues.AttackModifierParalyze
GameValues.AttackModifierAssassin
GameValues.AttackModifierBrutal
GameValues.AttackModifierSwift
GameValues.AttackModifierCumbersome

-- Turn Phases
GameValues.TurnPhaseInitializing
GameValues.TurnPhaseTurnStart
GameValues.TurnPhaseTurnEnd
GameValues.TurnPhaseMovement
GameValues.TurnPhaseInteractionLocation
GameValues.TurnPhaseInteractionBattle

-- Battle Phases
GameValues.BattlePhaseBefore
GameValues.BattlePhaseRange
GameValues.BattlePhaseBlock
GameValues.BattlePhaseAttack
GameValues.BattlePhaseAfter

-- Mana Forms
GameValues.ManaFormToken
GameValues.ManaFormAmbient
GameValues.ManaFormCrystal

-- Follower Types
GameValues.FollowerTypeBasic
GameValues.FollowerTypeElite

-- Immunities
GameValues.ImmunityArcane

-- Fortifications
GameValues.FortificationNever
GameValues.FortificationNone
GameValues.FortificationSingle
GameValues.FortificationDouble

-- Blessings Refresh Condition (for player and follower blessings)
GameValues.BlessingRefreshAlways
GameValues.BlessingRefreshEndOfRound

-- Map Section Types
GameValues.MapSectionStarter -- starter section with starter hex portal
GameValues.MapSectionRegular -- green sections
GameValues.MapSectionCore -- yellow/gold sections</source>

===Accessing Resources===
The game injects the ''GameResources'' API into the global script state so you can easily access the game resources using IDs. You can find the IDs for the entities you want in this Wiki (for example the GUID for enemies in the ''[[Enemies|list of Enemies]]''). Some Game APIs will also return IDs (or objects that contain IDs of entities). You can use this API to get the object behind the GUID. 

Note that these are the IDs for the data files (specifications) of Cards, Enemies, ... not the IDs of the enemies themselves. For example if there are 3 Apterix enemies on the map, the ID for the EnemyData to be used here will be the guid "''enemy_apterix"'' which will return the data for that particular enemy specifications (ex: Armor, Name, etc.), and each Apterix on the map will have its own Id too that the game uses to identify individual instances of that particular enemy. It's the same for Cards, Blessings, Followers, etc.
<source lang="lua">
GameResources.GetCard(string guid) -- CardData or nil
GameResources.GetAllCards() -- List<CardData> (>= v1.8)

GameResources.GetCharacter(string guid) -- CharacterData or nil
GameResources.GetAllCharacters() -- List<CharacterData> (>= v1.8)

GameResources.GetElement(string guid) -- Element or nil
GameResources.GetAllElements() -- List<Element> (>= v1.8)

GameResources.GetEnemy(string guid) -- EnemyData or nil
GameResources.GetAllEnemies() -- List<EnemyData> (>= v1.8)

GameResources.GetEnemyType(string guid)  -- EnemyType or nil
GameResources.GetAllEnemyTypes()  -- List<EnemyType> (>= v1.8)

GameResources.GetLocationType(string guid) -- LocationType or nil
GameResources.GetAllLocationTypes() -- List<LocationType> (>= v1.8)

GameResources.GetManaColor(string guid) -- ManaColor or nil
GameResources.GetAllManaColors() -- List<ManaColor> (>= v1.8)

GameResources.GetMapSection(string guid) -- MapSectionData or nil
GameResources.GetAllMapSections() -- List<MapSectionData> (>= v1.8)

GameResources.GetMapShape(string guid) -- MapShape or nil
GameResources.GetAllMapShapes() -- List<MapShape> (>= v1.8)

GameResources.GetBlessing(string guid) -- BlessingData or nil
GameResources.GetAllBlessings() -- List<BlessingData> (>= v1.8)

GameResources.GetTerrain(string guid) -- TerrainType or nil
GameResources.GetAllTerrains() -- List<TerrainType> (>= v1.8)

GameResources.GetTimeOfDay(string guid) -- TimeOfDay or nil
GameResources.GetAllTimeOfDays() -- List<TimeOfDay> (>= v1.8)

GameResources.GetFollower(string guid) -- FollowerData or nil
GameResources.GetAllFollowers() -- List<FollowerData> (>= v1.8)

GameResources.GetFollowerBlessing(string guid) -- FollowerBlessingData or nil
GameResources.GetAllFollowerBlessings() -- List<FollowerBlessingData> (>= v1.8)

-- Creates a Mana object from color+form, to be used by certain Game APIs.
-- Returns ManaData or nil if color or form are invalid or incompatible (for example Gold Crystal)
GameResources.CreateManaData(string manaColorId, ManaForm form)</source>

===Reading and Writing to the Game State===
The ''gameState'' object exposes the internals for the entire scenario state (players, cards, enemies, map, etc) and as such is very comprehensive. The API provides low-level access to all of those in order to enable a lot of various modding capabilities. Make sure you use those judiciously, and if you are not sure feel free to join the [https://discord.gg/PqFpUJGc3T Discord server] where we you can ask your questions to the developer or the community of Mods developers.

====== GameState ======
<source lang="lua">
gameState.Config -- CrusadeConfig

gameState.Market -- access to "Market" data/API
gameState.Map -- access to "Map" data/API

gameState.Player -- access to active "Player" data/API
gameState.AllPlayers -- Player[] all the players in the game (including timer)
gameState.DummyPlayer -- Player info about the dummy/timer
gameState.GetAPlayer(string playerId) -- returns Player/nil
gameState.GetPlayersTurnOrder() -- string[] of player Ids. Only set after benedictions have been selected

gameState.CurrentRound -- int >= 0 or -1 if the crusade is being initialized
gameState.CurrentRoundTimeOfDay -- TimeOfDay
gameState.NextRoundTimeOfDay -- TimeOfDay/nil
gameState.CurrentTurnInRound -- int >= 0
gameState.CurrentPhase -- int (TurnPhase enum)
gameState.CurrentPhaseUID -- int, unique Id representing this phase in the scenario
gameState.IsEndOfRoundAnnounced -- boolean

gameState.NumCheckpointUsed -- int >= 0
gameState.GetActiveMods() -- string[] of all mods active for this scenario
gameState.ActiveBattle -- BattleConfig/nil if no active battle
</source>

====== Market ======
<source lang="lua">
-- Blessings API
market.Blessings -- Blessing[]
market.AddBlessing(string blessingDataId) -- string/nil (blessingId)
market.RemoveBlessing(string blessingId) -- bool

-- Followers API
market.Followers -- Follower[]
market.AddFollower(string followerDataId) -- string/nil (followerId)
market.RemoveFollower(string followerId) -- bool

-- Cards API
market.Spells -- Card[]
market.AdvancedActions -- Card[]
market.LocationSpecificCards -- LocationMarketCard[]
market.AddCard(string cardDataId) -- string/nil (cardId)
market.RemoveCard(string cardId) -- bool

-- Mana API
market.RemainingAmbientMana -- ManaColor[]
market.AmbientManaPoolSize -- int >= 0
market.ReplaceAmbientMana(string[] manaColorIds)
market.AddAmbientMana(string manaColorId) -- bool
</source>

====== LocationMarketCard ======
<source lang="lua">
locationMarketCard.Card -- Card
locationMarketCard.AvailableLocation -- LocationType
</source>

====== Map ======
<source lang="lua">
map.MapShape -- MapShape
map.GetSectionsDrawPile() -- MapSectionData[]
map.NumDrawableSections -- int
map.NumRevealedSections -- int
map.GetNextDrawableSection() -- MapSection/nil
map.GetRevealedSections() -- MapSection[]
map.GetSection(string sectionId) -- MapSection/nil, only revealed sections
map.GetStarterSectionIds() -- string[]

-- Hex API
map.GetHex(string hexId) -- MapHex/nil
map.GetHexAtPosition(Vector3Int position) -- MapHex/nil. Vector3Int {x=,y=,z=0} (z always 0)
map.MoveEnemy(string sourceHexId, string destinationHexId, bool overrideExisting = False) -- boolean
map.MoveLocation(string sourceHexId, string destinationHexId, bool overrideExisting = False) -- boolean

-- Player API
map.GetPlayerHex() -- MapHex/nil if the player is not yet on the map
map.GetAPlayerHex(string playerId) -- MapHex/nil if the player is not yet on the map
map.GetPlayerPosition() -- MapPlayer/nil if the player is not yet on the map
map.GetAPlayerPosition(string playerId) -- MapPlayer/nil if the player is not yet on the map
map.SetPlayerPosition(string hexId) -- bool, only revealed hexes will work
map.SetAPlayerPosition(string playerId, string hexId) -- bool, only revealed hexes will work
</source>

====== MapSection ======
<source lang="lua">
section.GUID -- string
section.SectionData -- MapSectionData
section.Position -- Vector3Int {x=,y=,z=0} (z always 0)
section.NumHexes -- int = 7

section.GetHex(int hexIndex) -- MapHex/nil (hexIndex [0,NumHexes[)
section.GetHexById(string hexId) -- MapHex/nil
section.ReplaceTerrain(string hexId, string newTerrainTypeId, int selectedTerrainTileIndex=0) -- bool
section.RemoveLocation(string hexId) -- bool
section.SetLocation(string hexId, string newLocationId) -- bool
section.RemoveEnemy(string hexId) -- bool
section.SetEnemy(string hexId, string newEnemyId, string killingRewardsId = nil) -- bool
section.SetRandomEnemy(string hexId, string newEnemyTypeId, string killingRewardsId = nil) -- bool
</source>

====== MapHex ======
<source lang="lua">
-- All mutations must go through the Map or MapSection
hex.SectionId -- string
hex.GUID -- string
hex.Position -- Vector3Int {x=,y=,z=0} (z always 0)
hex.TerrainType -- TerrainType
hex.Location -- MapLocation/nil
hex.Enemy -- MapRampagingEnemy/nil
hex.GetDistanceFromPlayer() -- int >= 0, -1 on error
hex.GetDistanceFromAPlayer(string playerId) -- int >= 0, -1 on error
</source>

====== MapLocation ======
<source lang="lua">
-- All mutations must go through the Map or MapSection
location.GUID -- string
location.LocationType -- LocationType
location.Position -- Vector3Int {x=,y=,z=0} (z always 0)
location.MovementCostOverride -- int >= 0 (-1 if location doesn't override movement)
location.IsConqueredByPlayer() -- boolean
location.IsConqueredByAPlayer(string playerId) -- boolean
location.GetDistanceFromPlayer() -- int >= 0, -1 on error
location.GetDistanceFromAPlayer() -- int >= 0, -1 on error
location.CanPlayerMoveWithoutInteracting() -- boolean
location.CanAPlayerMoveWithoutInteracting(string playerId) -- boolean
</source>

====== MapLocationEnemy ======
<source lang="lua">
-- All mutations must go through the Map or MapSection
locationEnemy.GUID -- string
locationEnemy.EnemyData -- EnemyData
locationEnemy.IsRevealed -- boolean
locationEnemy.IsDead -- boolean
</source>

====== MapRampagingEnemy ======
<source lang="lua">
-- All mutations must go through the Map or MapSection
rampagingEnemy.GUID -- string
rampagingEnemy.Position -- Vector3Int {x=,y=,z=0} (z always 0)
rampagingEnemy.EnemyData -- EnemyData
rampagingEnemy.KillingRewards -- string/nil
rampagingEnemy.GetDistanceFromPlayer() -- int >= 0, -1 on error
rampagingEnemy.GetDistanceFromAPlayer(string playerId) -- int >= 0, -1 on error
</source>

====== MapPlayer (readonly) ======
<source lang="lua">
-- All mutations must go through the Map or MapSection
mapPlayer.PlayerId -- string
mapPlayer.CurrentPosition -- Vector3Int {x=,y=,z=0} (z always 0)
mapPlayer.PreviousPosition -- Vector3Int {x=,y=,z=0} (z always 0)
</source>

====== Player ======
<source lang="lua">
player.GUID -- string
player.Xp -- int >= 0
player.Level -- int >= 0
player.Character -- CharacterData
player.Oath -- OathData
player.Armor -- int > 0
player.HandSize -- int > 0
player.Reputation -- int (may be negative)
player.Followers -- Follower[]
player.DrawPile -- Card[]
player.DiscardedCards -- Card[]
player.Hand -- Card[]
player.CrystalsInInventory -- ManaColor[]
player.NumAllowedAmbientMana -- int >= 0
player.NumAllowedFollowers -- int >= 0
player.ActiveBenediction -- Benediction/nil
player.StartOfTurnState -- Player/nil, backup of the state of the player, used by "Restart Turn" option
player.HasAdditionalTurns -- bool

-- Player API
player.IncreaseXp(int xp) -- xp > 0
player.AddReputation(int reputation) -- reputation may be negative
player.IncreaseArmor(int value) -- value > 0
player.IncreaseHandSize(int value) -- value > 0
player.IncreaseFollowerSlots(int value) -- value > 0

-- Inventory API
player.ReplaceCrystalsInInventory(string[] manaColorIds)
player.AcquireCrystals(string[] manaColorIds)

-- Blessings API
player.Blessings -- Blessing[]
player.FindBlessing(string blessingId) -- Blessing/nil
player.RefreshBlessing(string blessingId) -- bool
player.AcquireBlessing(string blessingDataId) -- string/nil (blessingId)
player.DestroyBlessing(string blessingId) -- bool

-- Followers API
player.FindFollower(string followerId) -- Follower/nil
player.RefreshFollowers()
player.RefreshFollower(string followerId) -- bool
player.RefreshFollowerBlessing(string followerId) -- bool
player.HealFollower(string followerId, int numWounds = -1) -- bool, numWounds=-1 for all wounds
player.DamageFollower(string followerId, int numWounds) -- bool, numWounds > 0
player.AcquireFollower(string followerDataId) -- string/nil (followerId)
player.DestroyFollower(string followerId) -- bool

-- Cards API
player.FindCardInHand(string cardId) -- Card/nil
player.AcquireCard(string cardDataId, CardLocation location) -- string/nil (cardId)
player.DestroyCard(string cardId) -- bool
player.MoveCards(string[] cardIds, CardLocation newLocation, bool shuffleDestination = False)
</source>

====== Benediction (readonly) ======
<source lang="lua">
benediction.GUID -- string
benediction.BenedictionData -- BenedictionData
benediction.LastTriggeredPhaseId -- int (phase from the CrusadeState)
benediction.IsInert -- bool
benediction.IsActivatable -- bool
</source>

====== Card (readonly) ======
<source lang="lua">
card.GUID -- string
card.CardData -- CardData
card.CardType -- int (CardType enum)
card.IsStarter -- boolean
card.IsWound -- boolean
card.IsAction -- boolean
card.IsSpell -- boolean
card.IsRelic -- boolean
</source>

====== Blessing (readonly) ======
<source lang="lua">
blessing.GUID -- string
blessing.BlessingData -- BlessingData
blessing.IsExhausted -- bool
blessing.RefreshCondition -- int (BlessingRefreshCondition enum)
</source>

====== Follower (readonly) ======
<source lang="lua">
follower.GUID -- string
follower.FollowerData -- FollowerData
follower.Wounds -- int >=0
follower.IsExhausted -- bool
follower.AssignedBlessing -- FollowerBlessing/nil
</source>

====== FollowerBlessing (readonly) ======
<source lang="lua">
-- Follower Blessings come from Relics that get assigned to a Follower.
blessing.GUID -- string
blessing.BlessingData -- FollowerBlessingData
blessing.CreatorCardId -- string (id of card/relic this blessing comes from)
blessing.CreatorCard -- CardData
blessing.IsExhausted -- bool
</source>

====== Attack (readonly) ======
<source lang="lua">
attack.Value -- int (>0)
attack.Element -- Element
attack.AttackType -- AttackType
attack.AttackModifiers -- int[] (AttackModifier enum)
</source>

====== BattleArenaType (readonly) ======
<source lang="lua">
arenaType.GUID -- string
arenaType.Name -- string
arenaType.TimeOfDay -- TimeOfDay/Nil if the arena forces a specific TimeOfDay when entering it
arenaType.MaxFollowersBroughtInCombat -- int. '-1' means no limit, '0' means cannot bring followers, >0 is the limit
arenaType.IsAttackConsideredAssault -- boolean
</source>

====== BlessingData (readonly) ======
<source lang="lua">
blessing.GUID -- string
blessing.Name -- string
blessing.RefreshCondition -- int (BlessingRefreshCondition enum)
</source>

====== BenedictionData (readonly) ======
<source lang="lua">
benediction.GUID -- string
benediction.Name -- string
benediction.TimeOfDay -- TimeOfDay, when the benediction is usable
</source>

====== Block (readonly) ======
<source lang="lua">
block.Value -- int (>0)
block.Element -- Element
</source>

====== CardData (readonly) ======
<source lang="lua">
card.GUID -- string
card.CardType -- int (CardType enum)
card.Name -- string
card.Color -- ManaColor/nil
card.IsStarter -- bool
card.IsAction -- bool
card.IsWound -- bool
card.IsSpell -- bool
card.IsRelic -- bool
card.IsHidden -- bool. True if not part of draw decks and must be referenced by ID.
</source>

====== CharacterData (readonly) ======
<source lang="lua">
character.GUID -- string
character.Name -- string
character.InnateBlessings -- BlessingData[]
character.InnateCards -- CardData[]
character.PersonalOaths -- OathData[]
character.DefaultExplorationDistance -- int (>=0)
character.DefaultExplorationMovementCost -- int (>=0)
character.StarterArmor -- int (>0)
character.StarterHandSize -- int (>0)
character.StarterFollowerSlots -- int (>=0)
character.StarterReputation -- int (may be negative)
character.IsHidden -- bool. True if cannot be selected and must be referenced by ID.
</source>

====== Element (readonly) ======
<source lang="lua">
element.GUID -- string
element.Name -- string
</source>

====== EnemyData (readonly) ======
<source lang="lua">
enemy.GUID -- string
enemy.Name -- string
enemy.EnemyType -- EnemyType
enemy.Armor -- int (>0)
enemy.IsElusive -- bool
enemy.Fortification -- int (Fortification enum)
enemy.Attacks -- Attack[], may be empty if full summoner
enemy.SummoningAttacks -- EnemyType[]
enemy.Immunities -- int[] (Immunity enum)
enemy.Resistances -- Element[]
enemy.XPGain -- int (>0)
enemy.ReputationGain -- int (might be negative) 
enemy.ReputationGainBonusWhenRampaging -- int (might be negative)
enemy.ChallengeRating -- int (>=0), higher value == more difficult, indicative level of difficulty.
enemy.IsHidden -- bool. True if not part of draw decks and must be referenced by ID.
</source>

====== EnemyType (readonly) ======
<source lang="lua">
enemyType.GUID -- string
enemyType.Name -- string
</source>

====== LocationType (readonly) ======
<source lang="lua">
locationType.GUID -- string
locationType.Name -- string

-- Convenience Methods
locationType.IsCitadel -- bool
locationType.IsDungeon -- bool
locationType.IsHallowed -- bool
locationType.IsHideout -- bool
locationType.IsKrak -- bool
locationType.IsLabyrinth -- bool
locationType.IsBazaar -- bool
locationType.IsMaze -- bool
locationType.IsMine -- bool
locationType.IsPortal -- bool
locationType.IsRuins -- bool
locationType.IsSource -- bool
locationType.IsSpire -- bool
locationType.IsTemple -- bool
locationType.IsTomb -- bool
locationType.IsVillage -- bool
</source>

====== ManaColor (readonly) ======
<source lang="lua">
manaColor.GUID -- string
manaColor.Name -- string
</source>

====== ManaData (readonly) ======
<source lang="lua">
-- can be created via 'GamesResources.CreateMana'
mana.Color -- ManaColor
mana.Form -- int (ManaForm enum)
mana.IsCrystal -- boolean
mana.IsAmbient -- boolean
mana.IsToken -- boolean
</source>

====== MapShape (readonly) ======
<source lang="lua">
mapShape.GUID -- string
mapShape.Name -- string
mapShape.StarterSection -- MapSectionData
mapShape.StarterSectionPosition -- Vector3Int {x=,y=,z=0} (z should always be 0)
</source>

====== MapHexData (readonly) ======
<source lang="lua">
mapHex.Terrain -- TerrainType
mapHex.Location -- LocationType/nil
mapHex.RampagingEnemyType -- EnemyType/nil
mapHex.RampagingEnemy -- EnemyData/nil
</source>

====== MapSectionData (readonly) ======
<source lang="lua">
mapSection.GUID -- string
mapSection.SectionType -- int (MapSectionType enum)
mapSection.NumHexes -- int (=7)
mapSection.GetHex(int hexIndex) -- MapHexData. hexIndex should be [0,NumHexes[
mapSection.IsHidden -- bool. True if not part of draw decks and must be referenced by ID.
</source>

====== OathData (readonly) ======
<source lang="lua">
oath.GUID -- string
oath.Name -- string
</source>

====== TerrainType (readonly) ======
<source lang="lua">
terrain.GUID -- string
terrain.Name -- string
terrain.GetMovementCost(string timeOfDayId) -- // -1: impassable, 0:free, >0:movementCost
</source>

====== TimeOfDay (readonly) ======
<source lang="lua">
timeOfDay.GUID -- string
timeOfDay.Name -- string
</source>

====== FollowerData (readonly) ======
<source lang="lua">
follower.GUID -- string
follower.Name -- string
follower.FollowerType -- int (FollowerType enum)
follower.Level -- int > 0
follower.Armor -- int > 0
follower.RecruitmentLocations -- LocationType[]
follower.Resistances -- Element[]
follower.IsHidden -- bool. True if not part of draw decks and must be referenced by ID.
</source>

====== FollowerBlessingData (readonly) ======
<source lang="lua">
followerBlessing.GUID -- string
followerBlessing.Name -- string
</source>

====== BattleConfig (readonly) ======
<source lang="lua">
battleConfig.BattleId -- string
battleConfig.TimeOfDay -- TimeOfDay
battleConfig.ArenaType -- BattleArenaType
battleConfig.EnemiesInBattle -- BattleEnemy[]
battleConfig.RampagingEnemiesInBattle -- BattleEnemy[]
battleConfig.FollowersInBattle -- string[] followerIds
</source>

====== BattleEnemy (readonly) ======
<source lang="lua">
battleEnemy.GUID -- string
battleEnemy.EnemyData -- EnemyData
battleEnemy.GetSummonedEnemyData() -- EnemyData[] -- no Ids, they are generated automatically for these ephemeral enemies during battle.
</source>

====== ScenarioData (readonly) ======
<source lang="lua">
scenario.GUID -- string
scenario.Name -- string
</source>

====== CrusadeConfig (readonly) ======
<source lang="lua">
config.ScenarioData -- ScenarioData
config.NumRounds -- int > 0
config.Rounds -- TimeOfDay[]
config.ShouldPlayersThrowBenedictionsAfterUse -- boolean
config.ShouldDummyThrowBenedictionsAfterUse -- boolean
config.ScenarioExtensionMods -- string[], ids of scenarioExtension activated for this scenario
</source>
