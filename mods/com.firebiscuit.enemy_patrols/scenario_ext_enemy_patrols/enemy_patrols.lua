-- Enemy Patrols Mod Script

-- ==============
-- Configuration
-- ==============
local RESTRICTED_TERRAINS = {
    ['terrain__mountains'] = true,
    ['terrain__lake'] = true,
}

-- ==============
-- Helper Functions
-- ==============

-- Helper function to get the 6 neighbors of a given hex position
-- Assumes a flat-top hexagonal grid where z is always 0 (axial coordinates)
---@param hexPosition Vector3Int
---@param gameState GameState
---@return MapHex[]
local function GetHexNeighbors(hexPosition, gameState)
    local neighbors = {}
    -- Define the 6 offsets for neighbors in an axial coordinate system
    -- These are for (dx, dy)
    local offsets = {
        {1, 0}, {-1, 0},    -- East, West
        {0, 1}, {0, -1},    -- Northeast, Southwest
        {1, -1}, {-1, 1}    -- Southeast, Northwest
    }

    for _, offset in ipairs(offsets) do
        local neighborX = hexPosition.x + offset[1]
        local neighborY = hexPosition.y + offset[2]
        local neighborPosition = {x = neighborX, y = neighborY, z = 0} -- z is always 0

        -- Try to get the hex at the calculated position
        local neighborHex = gameState.Map.GetHexAtPosition(neighborPosition)
        if neighborHex then
            table.insert(neighbors, neighborHex)
        end
    end
    return neighbors
end

-- Helper function to check if a location type is restricted
---@param locationType LocationType
---@return boolean
local function isRestrictedLocationType(locationType)
    if not locationType then return false end
    -- Check for Citadel, Portal, Krak, or other specific restricted locations
    return locationType.IsCitadel or locationType.IsPortal or locationType.IsKrak
end

-- ==============
-- Game Hooks
-- ==============

---@param context Context
---@param gameState GameState
function OnTurnEnds(context, gameState)
    print("Enemy Patrols: OnTurnEnds - Initiating enemy movement.")

    local playerHex = gameState.Map.GetPlayerHex() -- Store player hex once

    local enemiesToMove = {}
    local revealedSections = gameState.Map.GetRevealedSections()
    for _, section in ipairs(revealedSections) do
        for i = 0, section.NumHexes - 1 do
            local hex = section.GetHex(i)
            if hex and hex.Enemy then
                table.insert(enemiesToMove, {enemy = hex.Enemy, currentHex = hex})
            end
        end
    end

    math.randomseed(os.time()) -- Re-seed random for each turn

    for _, enemyDef in ipairs(enemiesToMove) do
        local enemy = enemyDef.enemy
        local currentHex = enemyDef.currentHex

        local possibleDestinations = GetHexNeighbors(currentHex.Position, gameState)
        local validDestinations = {}

        for _, neighborHex in ipairs(possibleDestinations) do
            -- Filter out invalid hexes
            local isOccupied = neighborHex.Enemy ~= nil or (playerHex and neighborHex.GUID == playerHex.GUID)
            
            local isRestrictedLocation = false
            if neighborHex.Location then
                isRestrictedLocation = isRestrictedLocationType(neighborHex.Location.LocationType)
            end
            
            local isRestrictedTerrain = RESTRICTED_TERRAINS[neighborHex.TerrainType.GUID] ~= nil

            if not isOccupied and not isRestrictedLocation and not isRestrictedTerrain then
                table.insert(validDestinations, neighborHex)
            end
        end

        if #validDestinations > 0 then
            local randomDestination = validDestinations[math.random(1, #validDestinations)]
            -- MoveEnemy takes (sourceHexId, destinationHexId, overrideExisting)
            -- We set overrideExisting to false to prevent enemies from overwriting each other or the player if a bug occurred in filter.
            gameState.Map.MoveEnemy(currentHex.GUID, randomDestination.GUID, false) 
            print("Enemy Patrols: Enemy " .. enemy.EnemyData.Name .. " moved from " .. currentHex.GUID .. " to " .. randomDestination.GUID)
        else
            print("Enemy Patrols: Enemy " .. enemy.EnemyData.Name .. " at " .. currentHex.GUID .. " has no valid moves.")
        end
    end
end

