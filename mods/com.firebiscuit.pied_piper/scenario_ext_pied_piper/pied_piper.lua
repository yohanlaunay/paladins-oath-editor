-- Pied Piper Mod Script

-- ==============
-- Configuration
-- ==============
local SQUEALER_ATTRACTING_TERRAINS = {
    ['terrain__swamp'] = true,
    ['terrain__forest'] = true,
}
local SQUEALER_UNIT_GUID = 'unit_squealer' -- Assuming this is a valid followerDataId

-- ==============
-- Helper Functions
-- ==============

-- Simple string split function
---@param s string
---@param delimiter string
---@return string[]
local function split(s, delimiter)
    local result = {};
    for match in (s..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, match);
    end
    return result;
end

-- ==============
-- Game Hooks
-- ==============

---@param context Context
---@param gameState GameState
function OnTurnEnds(context, gameState)
    local playerHex = gameState.Map.GetPlayerHex()
    if playerHex and SQUEALER_ATTRACTING_TERRAINS[playerHex.TerrainType.GUID] then
        print("Pied Piper: Player ended turn in an attracting terrain.")

        local visitedSwampsSerialized = context.ModState.GetString("visited_squealer_hexes") or ""
        local visitedSwampsList = split(visitedSwampsSerialized, ",")
        local visitedSwampsSet = {}
        for _, hexGuid in ipairs(visitedSwampsList) do
            if hexGuid ~= "" then -- Handle empty string from split if no visits yet
                visitedSwampsSet[hexGuid] = true
            end
        end

        if not visitedSwampsSet[playerHex.GUID] then
            -- It's a new attracting hex!
            visitedSwampsSet[playerHex.GUID] = true
            
            -- Re-serialize and save to ModState
            local newVisitedList = {}
            for hexGuid, _ in pairs(visitedSwampsSet) do
                table.insert(newVisitedList, hexGuid)
            end
            context.ModState.SetString("visited_squealer_hexes", table.concat(newVisitedList, ","))

            local acquiredSquealerId = gameState.Player.AcquireFollower(SQUEALER_UNIT_GUID)
            if acquiredSquealerId then
                print("Pied Piper: It's a new attracting hex! You attracted a Squealer! (GUID: " .. acquiredSquealerId .. ")")
            else
                print("Pied Piper: It's a new attracting hex, but you failed to attract a Squealer (max followers reached or invalid unit GUID).")
            end
        else
            print("Pied Piper: You've already explored this attracting hex. No new Squealers here.")
        end
    end

    -- New logic: Lose Squealer if wound in hand
    local hasWoundInHand = false
    for _, card in ipairs(gameState.Player.Hand) do
        if card.IsWound then
            hasWoundInHand = true
            break
        end
    end

    if hasWoundInHand then
        local squealerFollowers = {}
        for _, follower in ipairs(gameState.Player.Followers) do
            if follower.FollowerData.GUID == SQUEALER_UNIT_GUID then
                table.insert(squealerFollowers, follower)
            end
        end

        if #squealerFollowers > 0 then
            math.randomseed(os.time()) -- Re-seed random before picking a follower
            local squealerToDestroy = squealerFollowers[math.random(1, #squealerFollowers)]
            gameState.Player.DestroyFollower(squealerToDestroy.GUID)
            print("Pied Piper: The sound of your pain drives a Squealer (" .. squealerToDestroy.FollowerData.Name .. ") away!")
        else
            print("Pied Piper: You have a wound in hand, but no Squealers to lose.")
        end
    end
end
