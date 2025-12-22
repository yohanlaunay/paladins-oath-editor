-- Familiar Mod Script

-- ==============
-- Helper Functions
-- ==============

---@param context Context
---@param gameState GameState
local function tryToAssignFamiliar(context, gameState)
    local familiarGuid = context.ModState.GetString("familiar_guid")

    if familiarGuid == nil or familiarGuid == "" then -- Only try to assign if no familiar is set yet
        if #gameState.Player.Followers > 0 then
            local firstFollower = gameState.Player.Followers[1] -- Lua arrays are 1-based
            context.ModState.SetString("familiar_guid", firstFollower.GUID)
            context.ModState.SetString("familiar_unit_id", firstFollower.FollowerData.GUID)
            print("Familiar: Your first follower, " .. firstFollower.FollowerData.Name .. ", is now your familiar!")
            return true -- Successfully assigned
        end
    end
    return false -- Not assigned or already assigned
end

-- ==============
-- Game Hooks
-- ==============

---@param context Context
---@param gameState GameState
function OnRoundStarts(context, gameState)
    tryToAssignFamiliar(context, gameState)
end

---@param context Context
---@param gameState GameState
function OnCrusadeUpdated(context, gameState)
    tryToAssignFamiliar(context, gameState)
end

---@param context Context
---@param gameState GameState
function OnTurnStarts(context, gameState)
    tryToAssignFamiliar(context, gameState)
end

---@param context Context
---@param gameState GameState
function OnTurnEnds(context, gameState)
    -- First, try to assign a familiar if none exists yet.
    -- This handles followers acquired during the turn.
    tryToAssignFamiliar(context, gameState)

    local familiarGuid = context.ModState.GetString("familiar_guid")
    local familiarUnitId = context.ModState.GetString("familiar_unit_id")

    if familiarGuid and familiarUnitId then
        local isFamiliarAlive = false
        local currentFamiliar = nil -- Store the actual follower object if found

        -- Check if the familiar is still in the player's active followers
        for _, follower in ipairs(gameState.Player.Followers) do
            if follower.GUID == familiarGuid then
                isFamiliarAlive = true
                currentFamiliar = follower
                break
            end
        end

        if not isFamiliarAlive then
            print("Familiar: Your familiar (" .. familiarUnitId .. ") was lost! Resurrecting...")
            local newFamiliarGuid = gameState.Player.AcquireFollower(familiarUnitId)
            if newFamiliarGuid then
                context.ModState.SetString("familiar_guid", newFamiliarGuid)
                print("Familiar: Your familiar has been resurrected! (New GUID: " .. newFamiliarGuid .. ")")
            else
                print("Familiar: Failed to resurrect familiar. Perhaps max followers reached or invalid unit GUID.")
            end
        else
            -- Familiar is alive, check for exhaustion or wounds
            if currentFamiliar ~= nil then
                -- Remove wounds
                if currentFamiliar.Wounds > 0 then
                    gameState.Player.HealFollower(currentFamiliar.GUID, -1) -- -1 for all wounds
                    print("Familiar: " .. currentFamiliar.FollowerData.Name .. " wounds removed.")
                end
                
                -- Refresh (remove exhausted status)
                if currentFamiliar.IsExhausted then
                    gameState.Player.RefreshFollower(currentFamiliar.GUID)
                    print("Familiar: " .. currentFamiliar.FollowerData.Name .. " refreshed.")
                end
            end
        end
    end
end

