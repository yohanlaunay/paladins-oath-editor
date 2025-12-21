-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.

-- ===============
-- This function is called at the beginning of a turn before the campfire loads the state.
--
-- Params:
---@param context Context: script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnStarts(context, gameState)
    print("Automaton turn starts")
    gameState.Player.AcquireCard(GameValues.CardWoundId, GameValues.CardLocationHand)
end
