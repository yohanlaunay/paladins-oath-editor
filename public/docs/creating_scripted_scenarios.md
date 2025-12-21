Since '''v1.8.0''' the game supports the creation of Mods containing scripts written in the [https://www.lua.org/ LUA] programming language to create your own custom scenarios for the game. Before getting started on creating those scripts, you should first read the [[Creating Mods for the Game|general guidelines about how to create and publish mods]] and the guide on [[Creating Scripted Mods for the Game|How to create scenario extensions for the game]]. The scenarios are similar to scenario extensions with minor variations.

If you have any issue, blockers or suggestions feel free to join the [https://discord.gg/PqFpUJGc3T Discord server] where we you can ask your questions to the developer of the game or the community of mods developers.
===Scenario Mod===
The scenario Mods are declared like other mods (see [[Creating Mods for the Game|guidelines]] about using ''mod.json'' and associated sample mod [https://drive.google.com/file/d/1S2IBRbREIm3BiKUpSoEfqMukzaOtZurZ/view?usp=sharing zip file] for the format of the scenario ''mod.json''). You can also look at the sample mods in the [https://steamcommunity.com/app/1671590 Steam workshop] of the game (ex: the ''Hostages scenario'' mod).

''Scenario'' mods are written using a [https://www.lua.org/ LUA] script (similar syntax as Javascript) and will show up alongside the other scenarios when the player starts the game. The script for the modded scenario will be loaded first when the game needs to ''configure'' the scenario the when the scenario starts (or is resumed after a save->load). Then throughout the lifecycle of the scenario, the game will execute callbacks declared by the script passing in some contextual information and the full gameState and associated APIs to mutate it. Any mutation performed by the script will then be reflected onto the UI and also persisted in the save file.

===Scenario Context, Scenario State and Mod State===
Most of the LUA functions that the game calls get a ''scenarioContext'' object passed in. The context contains information related to the mod and scenario as well as access to some API to store and retreive state pertaining to the execution of the script:<source lang="lua">
-- ID of the mod where the scenario is coming from (ex: "mod:com.firebiscuit:my_mod")
context.modId

-- ID of the scenario itself (ex: "mod:com.firebiscuit:my_mod:scenario_hostage")
context.extensionId

-- API to load/save state pertaining to the execution of this script
-- This is the same as the ModState for ScenarioExtension mods.
context.ModState

-- API to load/save state pertaining to the execution of this scenario script
-- Avoid R/W the 'status' key, it's used for scenario status (see below).
context.ScenarioState -- same as ModState but scoped to the scenario

-- true if the scenario was marked as successfully completed
context.IsCompleted

-- true if the scenario was marked as failed
context.IsFailed

-- Will set the scenario 'status' as completed in the ScenarioState
context.MarkCompleted()

-- Will set the scenario 'status' as failed in the ScenarioState
context.MarkFailed()
</source>

====Managing State for the Script via ''ModState and ScenarioState''====
Similar to [[Creating Scripted Mods for the Game|Scenario Extension mods]], It is highly recommended that you '''avoid relying on global variables''' to manage the state of your mod.  The reason being that the game needs to support the ability for players to save and reload the game at a later time. When a game is reloaded, a new LUA runtime is created to run your script and thus the previous script global state is lost / will not be recovered. To help you with managing persistent state between various calls to the lua hooks, the game passes a ''ModState'' API to LUA via the context object. You can use ''ModState'' or ''ScenarioState'' to read and write '''strings''', '''booleans''', and '''integers''' values into the state (indexed by a '''string''' key). These values will be persisted into the game save file and restored on next game load and passed to your script every time it is called.<source lang="lua">
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

</source>You should use ''ModState'' if you need to store and retrieve information in-between calls to your script that you cannot find in the gameState itself. For example the ''Shadow of Death'' mod which spawns an enemy that follows the player around uses ''ModState'' to store information about the last known position of the player, whether the enemy has spawned and was killed.

===Scenario Configuration===

Before the scenario is started the player must select the scenario and configure it: citadel difficulty, number of mana in the pool, etc.
To fetch the default scenario configuration the game will call the '''GetScenarioConfiguration(modId)''' method in the scenario script.
That method should return the full scenario configuration, including the list of MapSectionData IDs that will be drawn.

Look at the sample scenario mod [https://drive.google.com/file/d/1S2IBRbREIm3BiKUpSoEfqMukzaOtZurZ/view?usp=sharing zip file] for an example scenario configuration.

'''Important:''' If this method is not present in the script or doesn't return a valid configuration the game will not load your scenario in the ''New Game'' screen.

===Scenario Lifecycle and Completion===

The scenario script will be called for all scenario lifecycle events, the same way as the [[Creating Scripted Mods for the Game#Lifecycle_events|Scenario Extension Mods]].

Whenever the scenario conditions have been met, the scenario script is responsible to set the scenario completion state using the ''scenarioContext.MarkCompleted()'' or ''scenarioContext.MarkFailed()'' method. The game will pick up the information and show the ''Crusade Completed'' notification to the user and the ''Crusade Summary'' screen at the end of the turn. You can use any of the lifecycle events method in combination with ''scenarioState'' and ''modState'' to determine that the scenario conditions have been met.
