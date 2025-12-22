-- IMPORTANT:
--  DO NOT use global variables. If you need to remember state between calls, use context.ModState that keeps track of your mod state.
--  Using global state will create inconsistencies in case of major state changes (ex: a restart of the turn).
-- REMINDER: Lua is using 1-based arrays, so first array element is always at index 1 not 0.

SHADOW_ENEMY_DATA_ID = "enemy_harbinger" -- ID of the EnemyData that will shadow the player movement
STATE_PLAYER_POSITION = "player_position"
STATE_ENEMY_IS_DEAD = "enemy_is_dead"
STATE_ENEMY_ID = "enemy_id"
STATE_ENEMY_CURRENT_HEX = "enemy_hex"

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

     -- If the enemy was spawned and is dead, stop doing stuff. We could consider resurrecting it at the next round or something,
    if( modState.GetBool(STATE_ENEMY_IS_DEAD) ) then
        debug_print("Enemy is dead")
        return
    end

    local playerMapState = gameState.Map.GetPlayerPosition()
    local playerPosition = playerMapState.CurrentPosition
    local playerPreviousPosition = playerMapState.PreviousPosition

    -- Check if player has moved from the last time we saw it.
    local lastKnownPositionString = modState.GetString(STATE_PLAYER_POSITION)
    local playerPositionString = (playerPosition.x).."x"..(playerPosition.y)
    if( lastKnownPositionString == playerPositionString ) then
        -- player hasn't moved do nothing
        debug_print("Player hasn't moved")
        return
    end

    if( playerPosition.x == playerPreviousPosition.x and playerPosition.y == playerPreviousPosition.y )then
        -- player hasn't moved do nothing
        debug_print("Cannot spawn where the player is")
        return
    end

    -- Player has moved, we want to move our shadow to the previous position the player was at.

    -- have we spawned our enemy yet?
    local currentEnemyId = modState.GetString(STATE_ENEMY_ID)
    local enemyHexId = modState.GetString(STATE_ENEMY_CURRENT_HEX)

    if( enemyHexId ~= nil and enemyHexId ~= '' ) then
        -- enemy has spawned
        -- move it to the player's previous position unless its dead
        local enemyHex = gameState.Map.GetHex(enemyHexId)
        if( enemyHex == nil ) then
            print("Enemy hex has been removed, re-spawn") -- should not happen
            enemyHexId = nil -- force a respawn
        elseif( enemyHex.Enemy == nil ) then
            -- enemy has been killed
            print("Enemy has been killed")
            modState.ClearAll()
            modState.SetBool(STATE_ENEMY_IS_DEAD, true)
            return
        elseif( enemyHex.Enemy.GUID ~= currentEnemyId ) then
             -- could be another mod or similar, re-spawn
            print("Enemy has been replaced or killed")
            enemyHexId = nil -- force a respawn
        else
            local newHex = gameState.Map.GetHexAtPosition(playerPreviousPosition)
            if( newHex == nil ) then
                print("Enemy new hex is not available")
                -- Should only happen if the player goes out of the boundaries of the map.
                -- We don't move the shadow until a new valid position is found
                return
            end

            if( newHex.Enemy ~= nil ) then
                print("Enemy new hex is already occupied by "..newHex.Enemy.EnemyData.GUID)
                -- We don't move the shadow until a new valid position is found
                return
            end

            if( not gameState.Map.MoveEnemy(enemyHex.GUID, newHex.GUID)) then
                print("Unable to move enemy to new hex")
                return
            end

            -- Update state with new enemy location
            print("Moved the shadow to new hex")
            modState.SetString(STATE_PLAYER_POSITION, playerPositionString)
            modState.SetString(STATE_ENEMY_CURRENT_HEX, newHex.GUID)
            return
        end
    end

    -- Spawn the enemy
    modState.ClearAll()
    debug_print("Shadow needs spawning")
    -- not spawned yet, we spawn the enemy at the previous position
    local enemySpawnHex = gameState.Map.GetHexAtPosition(playerPreviousPosition)
    if( enemySpawnHex == nil ) then
        debug_print("Shadow spawn hex doesn't exist")
        -- for some reason the hex doesn't exist.
        -- it's possible if the player moved in and out of the map through the portal.
        return
    end

    local enemySpawnSection = gameState.Map.GetSection(enemySpawnHex.SectionId)
    if( enemySpawnSection == nil ) then
        debug_print("Shadow spawn section doesn't exist")
        return -- should not be possible
    end

    if( not enemySpawnSection.SetEnemy(enemySpawnHex.GUID, SHADOW_ENEMY_DATA_ID) ) then
        print("Shadow spawn failed")
        return -- should not be possible
    end

    local spawnedEnemy = enemySpawnHex.Enemy
    if( spawnedEnemy == nil ) then
        print("Shadow not spawned on Hex")
        return
    end
    if( spawnedEnemy.EnemyData.GUID ~= SHADOW_ENEMY_DATA_ID ) then
        print("Shadow spawned with wrong id "..spawnedEnemy.EnemyData.GUID) -- should not happen
        return
    end

    -- remember spawned enemy info
    print("Spawned player shadow")
    modState.ClearAll()
    modState.SetString(STATE_PLAYER_POSITION, playerPositionString)
    modState.SetBool(STATE_ENEMY_IS_DEAD, false)
    modState.SetString(STATE_ENEMY_ID, spawnedEnemy.GUID)
    modState.SetString(STATE_ENEMY_CURRENT_HEX, enemySpawnHex.GUID)
end
