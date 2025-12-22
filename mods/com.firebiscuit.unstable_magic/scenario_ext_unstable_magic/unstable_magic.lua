-- Unstable Magic Mod Script
-- When a spell is cast, there is a chance of a random magical surge.

-- ==============
-- Configuration
-- ==============

local weakEnemies = {
    'enemy_apterix',
    'enemy_arachnophagous',
    'enemy_brutalisk',
    'enemy_abherration',
    'enemy_apparition',
    'enemy_crystalisk',
    'enemy_bulwarg',
    'enemy_jawa'
}

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

-- ==================
-- Surge Effects
-- ==================

local function surge_drawCard(gameState)
    print("Unstable Magic Effect: You draw a card!")
    if #gameState.Player.DrawPile > 0 then
        local topCardGuid = gameState.Player.DrawPile[1].GUID
        gameState.Player.MoveCards({topCardGuid}, GameValues.CardLocationHand)
    else
        print("Unstable Magic Effect: ...but your draw pile was empty!")
    end
end

local function surge_discardCard(gameState)
    print("Unstable Magic Effect: You discard a random card!")
    local hand = gameState.Player.Hand
    -- Don't discard wounds
    local validCardsToDiscard = {}
    for _, card in ipairs(hand) do
        if not card.IsWound then
            table.insert(validCardsToDiscard, card)
        end
    end

    if #validCardsToDiscard > 0 then
        local randomCard = validCardsToDiscard[math.random(1, #validCardsToDiscard)]
        gameState.Player.MoveCards({randomCard.GUID}, GameValues.CardLocationDiscardPile)
    else
        print("Unstable Magic Effect: ...but you had no valid cards to discard!")
    end
end

local function surge_spawnEnemy(gameState)
    print("Unstable Magic Effect: A monster appears next to you!")
    local playerHex = gameState.Map.GetPlayerHex()
    if not playerHex then
        print("Unstable Magic Effect: ...but couldn't determine your location.")
        return
    end

    -- Find a random empty hex adjacent to the player
    local neighbors = GetHexNeighbors(playerHex.Position, gameState)
    local validSpawnHexes = {}
    for _, hex in ipairs(neighbors) do
        if hex and not hex.Enemy and not hex.Location then
            table.insert(validSpawnHexes, hex)
        end
    end

    if #validSpawnHexes > 0 then
        local spawnHex = validSpawnHexes[math.random(1, #validSpawnHexes)]
        local parentSection = gameState.Map.GetSection(spawnHex.SectionId)
        local randomEnemyId = weakEnemies[math.random(1, #weakEnemies)]
        
        parentSection.SetEnemy(spawnHex.GUID, randomEnemyId, nil)
        print("Unstable Magic Effect: A " .. randomEnemyId .. " has appeared nearby!")
    else
        print("Unstable Magic Effect: ...but there was no room for it to appear.")
    end
end

local function surge_gainCrystal(gameState)
    print("Unstable Magic Effect: You gain a mana crystal!")
    local colors = {'mana_red', 'mana_green', 'mana_blue', 'mana_white'}
    local randomColor = colors[math.random(1, #colors)]
    gameState.Player.AcquireCrystals({randomColor})
end

local function surge_duplicateRelic(gameState)
    print("Unstable Magic Effect: A powerful echo duplicates one of your relics!")
    local allRelics = {}
    
    -- Collect relics from all player decks
    local allCards = {}
    for _, card in ipairs(gameState.Player.Hand) do table.insert(allCards, card) end
    for _, card in ipairs(gameState.Player.DrawPile) do table.insert(allCards, card) end
    for _, card in ipairs(gameState.Player.DiscardedCards) do table.insert(allCards, card) end

    for _, card in ipairs(allCards) do
        if card.IsRelic then
            table.insert(allRelics, card)
        end
    end

    if #allRelics > 0 then
        local relicToDuplicate = allRelics[math.random(1, #allRelics)]
        gameState.Player.AcquireCard(relicToDuplicate.CardData.GUID, GameValues.CardLocationDiscardPile)
        print("Unstable Magic Effect: Your " .. relicToDuplicate.CardData.Name .. " has been duplicated!")
    else
        print("Unstable Magic Effect: ...but the echo found no relics to duplicate.")
    end
end

local function surge_destroyFollower(gameState)
    print("Unstable Magic Effect: One of your followers explodes in a shower of sparks!")
    local followers = gameState.Player.Followers
    if #followers > 0 then
        local followerToDestroy = followers[math.random(1, #followers)]
        gameState.Player.DestroyFollower(followerToDestroy.GUID)
        print("Unstable Magic Effect: Your follower, " .. followerToDestroy.FollowerData.Name .. ", has been destroyed!")
    else
        print("Unstable Magic Effect: The chaotic energy has nowhere to go and hits you instead! You receive a Wound.")
        gameState.Player.AcquireCard(GameValues.CardWoundId, GameValues.CardLocationHand)
    end
end

-- A table to hold all possible surge effects with their chances
local surgeEffects = {
    {effect = surge_drawCard, chance = 20}, -- 20%
    {effect = surge_discardCard, chance = 15}, -- 15%
    {effect = surge_spawnEnemy, chance = 15}, -- 15%
    {effect = surge_gainCrystal, chance = 20}, -- 20%
    {effect = surge_duplicateRelic, chance = 5}, -- 5%
    {effect = surge_destroyFollower, chance = 5} -- 5%
}

-- Function to trigger a random surge
---@param gameState GameState
local function triggerRandomSurge(gameState)
    local totalWeight = 0
    for _, effectDef in ipairs(surgeEffects) do
        totalWeight = totalWeight + effectDef.chance
    end

    -- If totalWeight is 0, no effects can trigger.
    if totalWeight == 0 then
        print("Unstable Magic: The surge fizzles without a clear effect (no effects configured).")
        return
    end

    local randomNumber = math.random(1, totalWeight)
    local cumulativeWeight = 0
    local effectTriggered = false

    for _, effectDef in ipairs(surgeEffects) do
        cumulativeWeight = cumulativeWeight + effectDef.chance
        if randomNumber <= cumulativeWeight then
            effectDef.effect(gameState)
            effectTriggered = true
            break -- Exit after triggering one effect
        end
    end

    if not effectTriggered then
        print("Unstable Magic: The surge fizzles without a clear effect.")
    end
end


-- ==============
-- Game Hooks
-- ==============

---@param context Context
---@param gameState GameState
function OnTurnStarts(context, gameState)
    local uniqueSpellsInHand = {}
    local seenGuids = {} -- Use a set to track seen GUIDs
    for _, card in ipairs(gameState.Player.Hand) do
        if card.IsSpell and not seenGuids[card.GUID] then -- Only add if it's a spell and we haven't seen this GUID before
            table.insert(uniqueSpellsInHand, card.GUID)
            seenGuids[card.GUID] = true
        end
    end

    -- Serialize the list of unique spell GUIDs into a comma-separated string
    local serializedSpells = table.concat(uniqueSpellsInHand, ",")
    context.ModState.SetString("spells_in_hand_at_turn_start", serializedSpells)
    print("Unstable Magic: OnTurnStarts - Stored unique spells in hand: " .. serializedSpells)
end

---@param context Context
---@param gameState GameState
function OnTurnEnds(context, gameState)
    local serializedSpells = context.ModState.GetString("spells_in_hand_at_turn_start")
    if not serializedSpells or serializedSpells == "" then
        context.ModState.Clear("spells_in_hand_at_turn_start")
        return
    end

    local initialSpells = split(serializedSpells, ",")
    if #initialSpells == 0 then
        context.ModState.Clear("spells_in_hand_at_turn_start")
        return
    end

    local discardPileLookup = {}
    for _, card in ipairs(gameState.Player.DiscardedCards) do
        discardPileLookup[card.GUID] = true
    end

    math.randomseed(os.time())
    
    for _, spellGuid in ipairs(initialSpells) do
        -- Check if this specific spell GUID is now in the discard pile.
        if discardPileLookup[spellGuid] then
            print("Unstable Magic: Wild Magic Surge detected!")
            triggerRandomSurge(gameState)
        end
    end

    -- Clear the stored hand at the end of the turn
    context.ModState.Clear("spells_in_hand_at_turn_start")
end
