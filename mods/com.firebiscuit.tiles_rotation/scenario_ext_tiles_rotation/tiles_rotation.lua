-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
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

function randomizeSection(section)
    local hexInfoList = {}
    for hexIndex = 0, section.NumHexes - 1 do
        local hex = section.GetHex(hexIndex)
        if hex ~= nil then
            local hexInfo = {}
            hexInfo.terrainTypeId = hex.TerrainType.GUID
            if hex.Enemy ~= nil then
                hexInfo.enemyDataId = hex.Enemy.EnemyData.GUID
            end
            if hex.Location ~= nil then
                hexInfo.locationTypeId = hex.Location.LocationType.GUID
            end
            table.insert(hexInfoList, hexInfo)
            section.RemoveLocation(hex.GUID)
            section.RemoveEnemy(hex.GUID)
        end
    end

    -- now shuffle the hex list and reconstruct the section
    hexInfoList = FYShuffle(hexInfoList)
    for hexIndex = 0, section.NumHexes - 1 do
        local hex = section.GetHex(hexIndex)
        local listIndex = hexIndex + 1
        if hex ~= nil and listIndex <= #hexInfoList then
            local hexInfo = hexInfoList[listIndex]
            section.ReplaceTerrain(hex.GUID, hexInfo.terrainTypeId)
            if hexInfo.enemyDataId ~= nil then
                section.SetEnemy(hex.GUID, hexInfo.enemyDataId)
            end
            if hexInfo.locationTypeId ~= nil then
                section.SetLocation(hex.GUID, hexInfo.locationTypeId)
            end
        end
    end
end

-- ===============
-- This function is called every time the crusade state is updated, right before saving.
-- You should avoid hooking to this as this is super generic and called pretty often so you'll have to figure out what has changed yourself.
--
-- Params:
--  * context: script execution context, also provides R/W access to mod state. See format in docs.
--  * gameState: Mutable GameState. See format in docs Any changes to it will be read by the game after execution of this function.
function OnCrusadeUpdated(context, gameState)
    debug_print("OnCrusadeUpdated")
    local modState = context.ModState

    local firstSectionProcessed = false

    -- find newly revealed sections
    -- we keep track of known sections in the ModState
    for _, section in ipairs(gameState.Map.GetRevealedSections()) do
        if not firstSectionProcessed then
             -- skip first section to avoid problems with orientation
            firstSectionProcessed = true
        else
            -- process non-first section
            local modStateSectionId = "revealed-section-"..section.GUID
            if modState.GetBool(modStateSectionId) == true then
                -- already known section
            else
                -- randomize newly revealed section
                print("Randomizing Section "..section.GUID)
                modState.SetBool(modStateSectionId, true)
                randomizeSection(section)
            end
        end
    end
end
