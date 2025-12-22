-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.

CONSECRATION_LOCATION_TYPE_ID = "location_temple"

-- ===============
-- This function is called at the end of a turn before the campfire transitions to the next turn.
--
-- Params:
---@param context Context script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnEnds(context, gameState)
    -- A player cannot conquer more than one location per turn.
    -- Look at the current player position to see if a location was conquered and is not yet a temple
    local playerPosition = gameState.Map.GetPlayerPosition().CurrentPosition
    local playerHex = gameState.Map.GetHexAtPosition(playerPosition)
    if( playerHex == nil ) then
        debug_print("Player Hex not found") -- should not happen
        return
    end

    local playerSection = gameState.Map.GetSection(playerHex.SectionId)
    if( playerSection == nil )then
        debug_print("Player Section not found") -- should not happen
        return
    end

    if( playerHex.Location == nil ) then
        return -- no location there
    end

    if( not playerHex.Location.IsConqueredByPlayer() ) then
        return -- not conquered yet, ignore
    end

    -- Only react to known locations to prevent breaking if mods add more locations.
    local locationType = playerHex.Location.LocationType
    if( not(locationType.IsDungeon
     or locationType.IsHideout
     or locationType.IsLabyrinth
     or locationType.IsMaze
     or locationType.IsRuins
     or locationType.IsTomb) ) then
         return -- not a supported location
    end

    -- Valid conquered location, consecrate it
    local consecratedLocationId = locationType.GUID
    if( not playerSection.SetLocation(playerHex.GUID, CONSECRATION_LOCATION_TYPE_ID) ) then
        print("Could not consecrate "..consecratedLocationId)
        return
    end
    print("Consecreated "..consecratedLocationId)
end
