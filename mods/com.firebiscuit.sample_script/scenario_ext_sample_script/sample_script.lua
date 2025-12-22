-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
--  You should comment out functions that you do not use to save computation cycles if the function does nothing.
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.

-- ===============
-- Implement Fisher-Yates basic shuffle algorithm to shuffle a table.
-- https://stackoverflow.com/questions/35572435/how-do-you-do-the-fisher-yates-shuffle-in-lua
math.randomseed(os.time()) -- so that the randomness results are always different
function FYShuffle( tInput )
    local tReturn = {}
    for i = #tInput, 1, -1 do
        local j = math.random(i)
        tInput[i], tInput[j] = tInput[j], tInput[i]
        table.insert(tReturn, tInput[i])
    end
    return tReturn
end

-- ===============
-- This function is called right after the crusade configuration has been created by the scenario configuration flow.
-- Use this to make major configuration changes that will apply to the crusade when it starts.
-- DO NOT CHANGE the scenarioData at this point. Anyway you can try and you'll see weird inconsistencies happening :p
--
-- Params:
---@param crusadeConfig table : mutable. See SAVE file format for "crusadeConfig".
---@param modId string : string Id of this mod
---@param extensionId string : string Id of this ScenarioExtension
function ConfigureCrusade(crusadeConfig, modId, extensionId)
    debug_print("ConfigureCrusade "..crusadeConfig['scenarioData'])
end

-- ===============
-- This function is called before the crusade is started after the scenario has been selected.
-- At this point you should NOT MAKE CHANGES to CrusadeConfig, use "ConfigureCrusade" instead.
-- Use this to make major changes to the entire crusade after it has been configured.
--
-- Params:
---@param crusade table : mutable. See SAVE file format for "crusade".
---@param modId string : string Id of this mod, can be used to modify the 'modsState' data
---@param extensionId string : string Id of this ScenarioExtension
function InitializeCrusade(crusade, modId, extensionId)
    debug_print("InitializeCrusade "..crusade['crusadeConfig']['scenarioData'])
end

-- ===============
-- This function is called right before the crusade is ended.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnCrusadeEnds(context, gameState)
    debug_print("OnCrusadeEnds")
end

-- ===============
-- This function is called every time the crusade state is updated, right before saving.
-- You should avoid hooking to this as this is super generic and called pretty often so you'll have to figure out what has changed yourself.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnCrusadeUpdated(context, gameState)
    debug_print("OnCrusadeUpdated")
end

-- ===============
-- This function is called at the beginning of a round before the campfire loads the state.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnRoundStarts(context, gameState)
     debug_print("OnRoundStarts")
end

-- This function is called at the end of a round before the campfire transitions to the next state.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnRoundEnds(context, gameState)
     debug_print("OnRoundEnds")
end

-- ===============
-- This function is called at the beginning of a turn before the campfire loads the state.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnStarts(context, gameState)
     debug_print("OnTurnStarts")
end

-- ===============
-- This function is called at the end of a turn before the campfire transitions to the next turn.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnEnds(context, gameState)
     debug_print("OnTurnEnds")
end

-- ===============
-- This function is called right before the exploration scene will be loaded.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnExplorationStarts(context, gameState)
     debug_print("OnExplorationStarts")
end

-- ===============
-- This function is called right before the exploration ended and campfire will start.
-- Note this will not be called if the player triggered a battle, only if the exploration was ended naturally.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnExplorationEnds(context, gameState)
     debug_print("OnExplorationEnds")
end

-- ===============
-- This function is called right before the battle starts.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnBattleStarts(context, gameState)
     debug_print("OnBattleStarts")
end

-- ===============
-- This function is called right after the battle has completed.
--
-- Params:
---@param context ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnBattleEnds(context, gameState)
     debug_print("OnBattleEnds")
end