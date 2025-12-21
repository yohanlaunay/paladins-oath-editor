-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use scenarioContext.ScenarioState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.
SPECIAL_HOSTAGE_TILE_ID = "map_section_hostage_location" -- tile containing the bazaar being taken hostage
SCENARIO_CONFIG_NUM_REGULAR_TILES = 4
SCENARIO_CONFIG_NUM_CORE_TILES = 1 -- the bazaar is also a core tile
SCENARIO_CONFIG_NUM_CITADEL_TILES = 1

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
-- This function is called when the user selects this scenario in the Scenario selection flow.
-- This function MUST return the ScenarioCrusadeConfig (Table) so that the game can allow the player to configure the scenario before it starts.
---@param modId string
function GetScenarioConfiguration(modId)
    print("Generating Scenario Configuration")

    local specialHostageTileGUID = modId .. ":" .. SPECIAL_HOSTAGE_TILE_ID

    local config = {}
     -- (Optional) List<MapShape::GUID>. List of shapes that the scenario supports. Leave empty for any shape.
    config["mapShapes"] = {
        "map_shape_cone"
    }
     -- (Optional) List<Character::GUID>. List of characters that the scenario supports. Leave empty for any character.
    config["characters"] = {}
    -- List<TimeOfDay::GUID>. List of rounds. Max 9.
    config["rounds"] = {
        "timeofday_day",
        "timeofday_night",
        "timeofday_day",
        "timeofday_night",
        "timeofday_night"
    }
    -- (Optional) int > 0 [default=3]..
    config["defaultSourceSize"] = 3
     -- (Optional) bool [default=true].
    config["shouldPlayersThrowBenedictionsAfterUse"] = true
     -- (Optional) bool [default=false].
    config["shouldDummyThrowBenedictionsAfterUse"] = false
    -- (Optional) Players start the crusade with these bonuses.
    config["startingBoons"] = {
        -- (Optional) List<Card::GUID> [default=EMPTY]. List of cards the character will start with.
        cards = {
            "card_shadow_puppets" -- precious relic given by the villagers
        },
        -- (Optional) List<Follower::GUID> [default=EMPTY]. List of followers the character will start with.
        followers = {
            "unit_traveller" -- One of the villager knows the way and will accompany you.
        },
        -- (Optional) List<Blessing::GUID> [default=EMPTY]. List of blessings the character will start with.
        blessings = {},
        -- (Optional) List<ManaColor::GUID> [default=EMPTY]. List of mana crystals the character will start with.
        crystalsInInventory = {
            "mana_green",
            "mana_green",
            "mana_green"
        },
        -- (Optional) int [default=0]. Can be negative. Increase/Reduce character armor.
        armorBonus = 0,
        -- (Optional) int [default=0]. Can be negative. Increase/Reduce character hand size.
        handSizeBonus = 0,
        -- (Optional) int [default=0]. Can be negative. Increase/Reduce character reputation.
        reputationBonus = 0,
        -- (Optional) int >= 0 [default=0]. Increase starting number of follower slots (will add the 'units' to it too).
        followerSlotsBonus = 0
    }
    -- (Optional) Players gets these bonuses at the start of every round.
    config["roundBoons"] = {
        -- (Optional) List<ManaData> [default=EMPTY]. List of mana that the character will receive every round.
        mana = {
            -- The villagers provider White Crystal every round, to support the player
            {
                -- ManaColor::GUID.
                color = "mana_white",
                -- ManaForm::int. Form of the mana (crystal, token, ...)
                form = 2
            }
        },
        -- (Optional) int [default=0]. Can be negative. Increase/Reduce character reputation every round.
        reputationBonus = -2, -- the longer it takes to free the hostages the worse the reputation becomes
        -- (Optional) int >= 0 [default=0]. Gain movement points every round.
        movementPoints = 0,
        -- (Optional) int >= 0 [default=0]. Gain healing points every round.
        healingPoints = 0,
        -- (Optional) int >= 0 [default=0]. Gain leadership points every round.
        leadershipPoints = 0
    }
     -- (Optional) int >= 0. If > 0, it will reveal more sections from the draw pile on top of the starter sections, following the map shape.
    config["numInitSectionsToReveal"] = 0
    -- CitadelCrusadeConfig. Default config for citadels if no custom config provided.
    config["defaultCitadelsConfig"] = {
        -- List<int> (>=0). Use multiple numbers to combine them, { 2, 3 } for example would be citadel level 7.
        levels = { 4 } -- Citadel Level 5 (0-based index).
    }

    -- (Optional) List<CitadelCrusadeConfig>. List of citadels default configs in order of citadels
    -- (ex: 1st one will be Level 4, 2nd one Level 11+11). If not provided it will rely on default config.
    -- Only one low-level citadel in this scenario.
    config["orderedCitadelsConfig"] = {
        {
            -- List<int> (>=0). Use multiple numbers to combine them, { 2, 3 } for example would be citadel level 7.
            levels = { 4 } -- Citadel Level 5 (0-based index).
        }
    }

    -- Need to build the map section draw pile
    -- We want N regular tiles, 1 special bazaar tile (the hostage location), M core tiles and R citadel tiles
    local mapSectionDrawPile = {}

    -- Sort all tiles in buckets
    local allRegularTiles = {}
    local allCoreTiles = {}
    local allCitadelTiles = {}

    for _,sectionData in ipairs(GameResources.GetAllMapSections()) do
        if( sectionData.GUID == specialHostageTileGUID ) then
            -- skip this tile.
        elseif( sectionData.SectionType == GameValues.MapSectionRegular and not sectionData.IsHidden )then
            table.insert(allRegularTiles, sectionData.GUID)
        elseif( sectionData.SectionType == GameValues.MapSectionCore )then
            -- check if the tile has a citadel
            local hasCitadel = false
            local numHexes = sectionData.NumHexes - 1 -- hexIndex is 0-based
            for hexIndex = 0, numHexes do
                local hex = sectionData.GetHex(hexIndex)
                if( hex.Location ~= nil and hex.Location.IsCitadel )then
                    hasCitadel = true
                    break
                end
            end
            -- Note that Citadel tiles are hidden (never part of the stack unless explicitly added by the scenario)
            -- So we need to check for IsHidden if the tile doesnt contain a citadel
            if( hasCitadel )then
                table.insert(allCitadelTiles, sectionData.GUID)
            elseif ( not sectionData.IsHidden )then
                table.insert(allCoreTiles, sectionData.GUID)
            end
        end
    end

    allRegularTiles = FYShuffle(allRegularTiles)
    allCoreTiles = FYShuffle(allCoreTiles)
    allCitadelTiles = FYShuffle(allCitadelTiles)

    -- Build the stack of regular tiles by randomly selecting regular tiles + the special tile with the Bazaar
    local selectedRegularTiles = {}

    for tileIndex = 1, SCENARIO_CONFIG_NUM_REGULAR_TILES do
        if( tileIndex > #allRegularTiles ) then
            break -- exceeded the available tiles count
        end
        table.insert(selectedRegularTiles, allRegularTiles[tileIndex])
    end
    -- Shuffle all of this together
    selectedRegularTiles = FYShuffle(selectedRegularTiles)
    -- Insert the hostage tile as the second revealed tiles.
    -- Should be visible early so the player can plan.
    table.insert(selectedRegularTiles, 2, specialHostageTileGUID)

    -- Build the stack of core tiles by randomly selecting core tiles + citadel tiles
    local selectedCoreAndCitadelTiles = {}

    for tileIndex = 1, SCENARIO_CONFIG_NUM_CORE_TILES do
        if( tileIndex > #allCoreTiles )then
            break -- exceeded the available tiles count
        end
        table.insert(selectedCoreAndCitadelTiles, allCoreTiles[tileIndex])
    end

    for tileIndex = 1, SCENARIO_CONFIG_NUM_CITADEL_TILES do
        if( tileIndex > #allCitadelTiles )then
            break -- exceeded the available tiles count
        end
        table.insert(selectedCoreAndCitadelTiles, allCitadelTiles[tileIndex])
    end

    -- Shuffle all of this together
    selectedCoreAndCitadelTiles = FYShuffle(selectedCoreAndCitadelTiles)

    -- Now build the final stack: regular tiles then core tiles
    for _, tileId in ipairs(selectedRegularTiles) do
        table.insert(mapSectionDrawPile, tileId)
    end

    for _, tileId in ipairs(selectedCoreAndCitadelTiles) do
        table.insert(mapSectionDrawPile, tileId)
    end

    -- List<MapSectionData::GUID>. List of sections to draw from when constructing the map.
    config["mapSectionDrawPile"] = mapSectionDrawPile

    return config
end

-- ===============
-- This function is called every time the crusade state is updated, right before saving.
-- You should avoid hooking to this as this is super generic and called pretty often so you'll have to figure out what has changed yourself.
--
-- Params:
---@param scenarioContext ScenarioContext : script execution context, also provides R/W access to mod state. See format in docs.
---@param gameState GameState : Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnCrusadeUpdated(scenarioContext, gameState)
    debug_print("OnCrusadeUpdated")
    local scenarioState = scenarioContext.ScenarioState
    local specialHostageTileGUID = scenarioContext.ModId .. ":" .. SPECIAL_HOSTAGE_TILE_ID

    if( scenarioContext.IsCompleted or scenarioContext.IsFailed ) then
        debug_print("Scenario already completed")
        return
    end

    local currentPlayerHex = gameState.Map.GetPlayerHex()
    if( currentPlayerHex == nil ) then
        debug_print("Player not on the map")
        return
    end

    -- check if the player has removed all the enemies surrounding and at the hostage tile
    -- check if the player has moved onto the market (bazaar)

    -- First find the hostage tile if it has been revealed
    local hostageTile = nil
    local hostageTileId = scenarioState.GetString("hostage_tile_id")
    if( hostageTileId ~= nil and hostageTileId ~= '' ) then
        hostageTile = gameState.Map.GetSection(hostageTileId)
        if( hostageTile == nil ) then
            -- should not happen, it would mean the section was removed. Maybe another mod did that
            scenarioState.Clear("hostage_tile_id") -- find the section again
        end
    end
    if( hostageTile == nil ) then
        -- Find the hostage tile
        for _, section in ipairs(gameState.Map.GetRevealedSections()) do
            if section.SectionData.GUID == specialHostageTileGUID then
                print("Hostage tile has been revealed")
                hostageTile = section
                scenarioState.SetString("hostage_tile_id", hostageTile.GUID)
                break
            end
        end

        if( hostageTile == nil ) then
            -- hostage tile not revealed yet
            debug_print("Hostage tile not revealed yet")
            return
        end
    end

    -- check all the hexes to make sure that all rampaging enemies and krak enemies are dead
    -- and that the player is on the hex with a market on it.
    local isPlayerAtLocation = false
    for hexIndex = 0, hostageTile.NumHexes - 1, 1 do
        local hex = hostageTile.GetHex(hexIndex)
        if( hex ~= nil ) then
            -- check all enemies defeated
            if( hex.Enemy ~= nil ) then
                debug_print("Hostage tile still has enemies")
                return
            end
            -- check all kraks conquered
            if( hex.Location ~= nil and hex.Location.LocationType.IsKrak and not hex.Location.IsConqueredByPlayer() ) then
                debug_print("Hostage tile still has fortified enemies")
                return
            end
            -- check that the player is at the location
            if( hex.Location ~= nil and hex.Location.LocationType.IsBazaar and currentPlayerHex.GUID == hex.GUID ) then
                isPlayerAtLocation = true
            end
        end
    end

    if( isPlayerAtLocation ) then
        print("[Success] All enemies defeated and player is at location")
        scenarioContext.MarkCompleted()
        return
    end

    debug_print("All enemies defeated but player not at location")
end