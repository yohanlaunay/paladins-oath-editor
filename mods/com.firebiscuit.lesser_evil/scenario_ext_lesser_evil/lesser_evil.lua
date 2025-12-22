-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.

EXPANSION_ENEMY_IDS = {
    enemy_jawa            = true,
    enemy_bulwarg         = true,
    enemy_kopros          = true,
    enemy_dunkun          = true,
    enemy_apterix         = true,
    enemy_doryphoros      = true,
    enemy_varmintide      = true,
    enemy_kromalgor       = true,
    enemy_lich            = true,
    enemy_varloam         = true,
    enemy_tokoloshe       = true,
    enemy_iron_forge      = true,
    enemy_flagellant      = true,
    enemy_kriss           = true,
    enemy_emissary        = true,
    enemy_observer        = true,
    enemy_ooze            = true,
    enemy_lilith          = true,
    enemy_primeval_beast  = true,
    enemy_azureus         = true,
    enemy_viserion        = true,
    enemy_harbinger       = true
}

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
-- This function is called before the crusade is started after the scenario has been selected.
-- At this point you should NOT MAKE CHANGES to CrusadeConfig, use "ConfigureCrusade" instead.
-- Use this to make major changes to the entire crusade after it has been configured.
--
-- Params:
---@param crusade table : mutable lua Table. See SAVE file format for "crusade".
---@param modId string : string Id of this mod, can be used to modify the 'modsState' data
---@param extensionId string: string Id of this ScenarioExtension
function InitializeCrusade(crusade, modId, extensionId)
    -- Build a list of all valid enemies by type
    -- This will be used to replace the enemies already drawn by enemies of the same type
    local validEnemiesByType = {}
    local allEnemiesTypes = {}
    for _,enemy in ipairs(GameResources.GetAllEnemies()) do
        local enemyId = enemy.GUID
        local enemyType = enemy.EnemyType.GUID

        allEnemiesTypes[enemyId] = enemyType

        if EXPANSION_ENEMY_IDS[enemyId] ~= true then
            if validEnemiesByType[enemyType] == nil then
                validEnemiesByType[enemyType] = {}
            end
            table.insert(validEnemiesByType[enemyType], enemyId)
        end
    end

    -- Returns a random valid enemy id for that enemy type or
    -- nil if enemyType is not valid.
    function drawValidEnemy(enemyType)
        if enemyType == nil or validEnemiesByType[enemyType] == nil then
            return nil
        end
        local validEnemyList = validEnemiesByType[enemyType]
        return validEnemyList[math.random(#validEnemyList)]
    end

    -- Replace expansion enemies from the draw deck
    local enemiesDeck = crusade['offerState']['enemiesDeck']
    for i=#enemiesDeck,1,-1 do
        local enemyId = enemiesDeck[i]
        if EXPANSION_ENEMY_IDS[enemyId] then
            local newEnemyId = drawValidEnemy(allEnemiesTypes[enemyId])
            if newEnemyId ~= nil then
                enemiesDeck[i] = newEnemyId
                debug_print('EnemiesDeck> Replacing '..enemyId..' by '..newEnemyId)
            else
                -- should not happen
                table.remove(enemiesDeck, i)
                debug_print('EnemiesDeck> Removing '..enemyId)
            end
        end
    end

    -- Replace expansion enemies from the standby deck
    -- Standby deck contains enemies already drawn from the main deck
    local standbyEnemiesDeck = crusade['offerState']['standbyEnemies']
    for i=#standbyEnemiesDeck,1,-1 do
        local enemyId = standbyEnemiesDeck[i]
        if EXPANSION_ENEMY_IDS[enemyId] then
            local newEnemyId = drawValidEnemy(allEnemiesTypes[enemyId])
            if newEnemyId ~= nil then
                standbyEnemiesDeck[i] = newEnemyId
                debug_print('StandbyDeck> Relacing '..enemyId..' by '..newEnemyId)
            else
                -- should not happen
                table.remove(standbyEnemiesDeck, i)
                debug_print('StandbyDeck> Removing '..enemyId)
            end
        end
    end

    -- Replace drawn enemies for revealed map sections: rampaging and locations
    -- Draw from the validEnemiesByType and put them in standbyEnemiesDeck
    -- Note that this is not the same as the original game draw because
    -- we don't have access to EnemyData::NumEntitiesInDeck so all enemies have
    -- equal chance to appear when it should be weighted instead.
    local mapSections = crusade['mapState']['revealedSections']
    for _1,section in ipairs(mapSections) do
        for _2,hex in ipairs(section['hexes']) do
            -- Check Rampaging enemies
            if hex['rampagingEnemy'] ~= nil then
                local rampagingEnemy = hex['rampagingEnemy']
                local enemyId = rampagingEnemy['enemy']
                if EXPANSION_ENEMY_IDS[enemyId] then
                    -- Draw from validEnemiesByType and add to standbyDeck
                    local newEnemyId = drawValidEnemy(allEnemiesTypes[enemyId])
                    if newEnemyId ~= nil then
                        rampagingEnemy['enemy'] = newEnemyId
                        table.insert(standbyEnemiesDeck, newEnemyId)

                        debug_print('Rampaging> Replaced '..enemyId..' by '..newEnemyId)
                    end
                end
            end

            -- Check drawn enemies for Locations
            if hex['location'] ~= nil then
                local location = hex['location']
                if location['enemies'] ~= nil then
                    local locationEnemies = location['enemies']
                    for _3,locationEnemy in ipairs(locationEnemies) do
                        local enemyId = locationEnemy['enemy']
                        if EXPANSION_ENEMY_IDS[enemyId] then
                            -- Draw from validEnemiesByType and add to standbyDeck
                            local newEnemyId = drawValidEnemy(allEnemiesTypes[enemyId])
                            if newEnemyId ~= nil then
                                locationEnemy['enemy'] = newEnemyId
                                table.insert(standbyEnemiesDeck, newEnemyId)

                                debug_print('Location> Replaced '..enemyId..' by '..newEnemyId)
                            end
                        end
                    end
                end
            end
        end
    end
end