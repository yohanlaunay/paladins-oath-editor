-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.

local DESERT_TERRAIN_GUID = 'terrain__desert'

-- Configuration for the wounding logic probabilities
local WOUND_CHANCE = 92
local LOSE_CRYSTAL_CHANCE = 2
local EXHAUST_FOLLOWER_CHANCE = 1

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

-- ===============
-- This function is called at the beginning of a round.
-- We use it to set up the initial state of the mod.
--
-- Params:
---@param context Context: script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnRoundStarts(context, gameState)
    print("Spreading Desert: OnRoundStarts called for round " .. gameState.CurrentRound)

    if context.ModState.GetBool("spreading_desert_initialized") then
        print("Spreading Desert: Already initialized. Skipping.")
        return
    end

    print("Spreading Desert: Round 0 detected. Attempting initialization.")

    local starterSectionIds = gameState.Map.GetStarterSectionIds()
    print("Spreading Desert: Found " .. #starterSectionIds .. " starter section IDs.")

    if #starterSectionIds > 0 then
        local starterSection = gameState.Map.GetSection(starterSectionIds[1])
        if starterSection then
            print("Spreading Desert: Got starter section object. Looping through its " .. starterSection.NumHexes .. " hexes.")
            local portalFound = false
            for i = 0, starterSection.NumHexes - 1 do
                local hex = starterSection.GetHex(i)
                if hex and hex.Location and hex.Location.LocationType and hex.Location.LocationType.IsPortal then
                    print("Spreading Desert: Found portal hex at ("..hex.Position.x..", "..hex.Position.y.."). Converting to desert.")
                    starterSection.ReplaceTerrain(hex.GUID, DESERT_TERRAIN_GUID, 0)
                    portalFound = true
                    break
                end
            end
            if not portalFound then
                print("Spreading Desert: WARNING - Loop finished but did not find a portal in the starter section.")
            end
        else
            print("Spreading Desert: ERROR - Could not get starter section object for ID: " .. starterSectionIds[1])
        end
    else
        print("Spreading Desert: ERROR - No starter sections found.")
    end

    print("Spreading Desert: Initialization finished. Setting flag.")
    context.ModState.SetBool("spreading_desert_initialized", true)
end

-- ===============
-- This function is called at the end of a turn.
--
-- Params:
---@param context Context: script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnTurnEnds(context, gameState)
    print("Spreading Desert: OnTurnEnds")

    -- 1. Inflict damage if player is on a desert hex during the day.
    if gameState.CurrentRoundTimeOfDay.GUID == GameValues.TimeDay then
        local playerHex = gameState.Map.GetPlayerHex()
        if playerHex and playerHex.TerrainType.GUID == DESERT_TERRAIN_GUID then
            
            local outcome = math.random(1, 100)
    
            -- 92% chance: Wound player or follower
            if outcome <= WOUND_CHANCE then
                local followers = gameState.Player.Followers
                local hasFollowers = #followers > 0
                local target = "player"
    
                if hasFollowers and math.random(1, 2) == 2 then
                    target = "follower"
                end
    
                if target == "player" then
                    gameState.Player.AcquireCard(GameValues.CardWoundId, GameValues.CardLocationHand)
                    print("Spreading Desert: The desert sun is brutal! You received a Wound.")
                else
                    local randomIndex = math.random(1, #followers)
                    local followerToWound = followers[randomIndex]
                    gameState.Player.DamageFollower(followerToWound.GUID, 1)
                    print("Spreading Desert: The desert sun is brutal! Your follower, " .. followerToWound.FollowerData.Name .. ", received a wound.")
                end
    
            -- 2% chance: Lose a crystal or take a wound
            elseif outcome <= WOUND_CHANCE + LOSE_CRYSTAL_CHANCE then
                local currentCrystals = gameState.Player.CrystalsInInventory
                if #currentCrystals > 0 then
                    -- Remove one random crystal
                    table.remove(currentCrystals, math.random(1, #currentCrystals))
                    local newCrystalIds = {}
                    for _, crystal in ipairs(currentCrystals) do
                        table.insert(newCrystalIds, crystal.GUID)
                    end
                    gameState.Player.ReplaceCrystalsInInventory(newCrystalIds)
                    print("Spreading Desert: The intense heat destroyed one of your mana crystals!")
                else
                    -- No crystals to lose, take a wound instead
                    gameState.Player.AcquireCard(GameValues.CardWoundId, GameValues.CardLocationHand)
                    print("Spreading Desert: The intense heat would have destroyed a crystal, but you had none. You take a Wound instead.")
                end
                
            -- 1% chance: Exhaust a follower or take a wound
            elseif outcome <= WOUND_CHANCE + LOSE_CRYSTAL_CHANCE + EXHAUST_FOLLOWER_CHANCE then
                local followers = gameState.Player.Followers
                if #followers > 0 then
                    -- API to exhaust a follower doesn't exist. As an alternative, we will damage them.
                    local randomIndex = math.random(1, #followers)
                    local followerToExhaust = followers[randomIndex]
                    gameState.Player.DamageFollower(followerToExhaust.GUID, 1)
                    print("Spreading Desert: The debilitating heat has wounded your follower, " .. followerToExhaust.FollowerData.Name .. ", leaving them exhausted for the next fight!")
                else
                    -- No followers to exhaust, take a wound instead
                    gameState.Player.AcquireCard(GameValues.CardWoundId, GameValues.CardLocationHand)
                    print("Spreading Desert: The debilitating heat would have exhausted a follower, but you had none. You take a Wound instead.")
                end
            end
            -- 5% chance: Nothing happens
        end
    end

    -- 2. Spread the desert from every desert hex to one neighbor.
    local allDesertHexes = {}
    local revealedSections = gameState.Map.GetRevealedSections()
    for _, section in ipairs(revealedSections) do
        for i = 0, section.NumHexes - 1 do
            local hex = section.GetHex(i)
            if hex and hex.TerrainType.GUID == DESERT_TERRAIN_GUID then
                table.insert(allDesertHexes, hex)
            end
        end
    end

    local newDesertCount = 0
    -- For performance, re-seed random once.
    math.randomseed(os.time())

    for _, desertHex in ipairs(allDesertHexes) do
        local neighbors = GetHexNeighbors(desertHex.Position, gameState)
        local potentialSpreadTargets = {}

        for _, neighborHex in ipairs(neighbors) do
            local isCitadel = false
            if neighborHex.Location and neighborHex.Location.LocationType then
                isCitadel = neighborHex.Location.LocationType.IsCitadel
            end

            if neighborHex.TerrainType.GUID ~= DESERT_TERRAIN_GUID and not isCitadel then
                table.insert(potentialSpreadTargets, neighborHex)
            end
        end

        if #potentialSpreadTargets > 0 then
            local randomIndex = math.random(1, #potentialSpreadTargets)
            local hexToCorrupt = potentialSpreadTargets[randomIndex]

            local parentSection = gameState.Map.GetSection(hexToCorrupt.SectionId)
            if parentSection then
                parentSection.ReplaceTerrain(hexToCorrupt.GUID, DESERT_TERRAIN_GUID, 0)
                newDesertCount = newDesertCount + 1
            end
        end
    end

    if newDesertCount > 0 then
        print("Spreading Desert: The desert has spread to " .. newDesertCount .. " new tiles this turn!")
    end
end
