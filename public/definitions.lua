-- Library definition for VSCode Lua extension
-- https://luals.github.io/wiki/settings/#workspacelibrary
-- https://luals.github.io/wiki/annotations/
---@meta

-- ==================
-- ModState
-- ==================
---@class ModState
ModState = {}
---@param key string
---@return boolean
function ModState.Has(key) end

---@param key string
function ModState.Clear(key) end

function ModState.ClearAll() end

---@param key string
---@return string
function ModState.GetString(key) end

---@param key string
---@param value string
function ModState.SetString(key, value) end

---@param key string
---@return integer
function ModState.GetInt(key) end

---@param key string
---@param value integer
function ModState.SetInt(key, value) end

---@param key string
---@return boolean
function ModState.GetBool(key) end

---@param key string
---@param value boolean
function ModState.SetBool(key, value) end

-- ==================
-- Context
-- ==================
---@class Context
---@field ModId string
---@field ExtensionId string
---@field ModState ModState
Context = {}

---@class ScenarioContext : Context
---@field ScenarioState ModState
---@field IsCompleted boolean
---@field IsFailed boolean
ScenarioContext = {}
function ScenarioContext.MarkCompleted() end
function ScenarioContext.MarkFailed() end

-- ========
-- Globals
-- ========
---@type function
---@param value string 
function debug_print(value) end

-- =====
-- GameValues
-- =====
---@class GameValues
---@field TimeDay string
---@field TimeNight string
---@field CardWoundId string
-- Card Types
---@field CardTypeWound integer
---@field CardTypeAction integer
---@field CardTypeRelic integer
---@field CardTypeSpell integer
-- Card Locations
---@field CardLocationHand integer
---@field CardLocationDiscardPile integer
---@field CardLocationDrawPile integer
-- Attack Types
---@field AttackBasic integer
---@field AttackRange integer
---@field AttackSiege integer
-- Attack Modifiers
---@field AttackModifierPoison integer
---@field AttackModifierParalyze integer
---@field AttackModifierAssassin integer
---@field AttackModifierBrutal integer
---@field AttackModifierSwift integer
---@field AttackModifierCumbersome integer
-- Turn Phases
---@field TurnPhaseInitializing integer
---@field TurnPhaseTurnStart integer
---@field TurnPhaseTurnEnd integer
---@field TurnPhaseMovement integer
---@field TurnPhaseInteractionLocation integer
---@field TurnPhaseInteractionBattle integer
-- Battle Phases
---@field BattlePhaseBefore integer
---@field BattlePhaseRange integer
---@field BattlePhaseBlock integer
---@field BattlePhaseAttack integer
---@field BattlePhaseAfter integer
-- Mana Forms
---@field ManaFormToken integer
---@field ManaFormAmbient integer
---@field ManaFormCrystal integer
-- Follower Types
---@field FollowerTypeBasic integer
---@field FollowerTypeElite integer
-- Immunities
---@field ImmunityArcane integer
-- Fortifications
---@field FortificationNever integer
---@field FortificationNone integer
---@field FortificationSingle integer
---@field FortificationDouble integer
-- Blessings Refresh Condition (for player and follower blessings)
---@field BlessingRefreshAlways integer
---@field BlessingRefreshEndOfRound integer
-- Map Section Types
---@field MapSectionStarter integer
---@field MapSectionRegular integer
---@field MapSectionCore integer
GameValues = {}

-- ==============
-- Types
-- ==============
---@class Vector3Int
---@field x integer
---@field y integer
---@field z integer
Vector3Int = {}

---@class BenedictionData
---@field GUID string
---@field Name string
---@field TimeOfDay TimeOfDay
BenedictionData = {}

---@class Benediction
---@field GUID string
---@field BenedictionData BenedictionData
---@field LastTriggeredPhaseId integer
---@field IsInert boolean
---@field IsActivatable boolean
Benediction = {}

---@class BlessingData
---@field GUID string
---@field Name string
---@field RefreshCondition integer
BlessingData = {}

---@class Blessing
---@field GUID string
---@field BlessingData BlessingData
---@field IsExhausted boolean
---@field RefreshCondition integer
Blessing = {}

---@class CardData
---@field GUID string
---@field CardType integer
---@field Name string
---@field Color ManaColor?
---@field IsStarter boolean
---@field IsAction boolean
---@field IsWound boolean
---@field IsSpell boolean
---@field IsRelic boolean
---@field IsHidden boolean
CardData = {}

---@class Card
---@field GUID string
---@field CardData CardData
---@field CardType integer
---@field IsStarter boolean
---@field IsWound boolean
---@field IsAction boolean
---@field IsSpell boolean
---@field IsRelic boolean
Card = {}

---@class CharacterData
---@field GUID string
---@field Name string
---@field InnateBlessings BlessingData[]
---@field InnateCards CardData[]
---@field PersonalOaths OathData[]
---@field DefaultExplorationDistance integer
---@field DefaultExplorationMovementCost integer
---@field StarterArmor integer
---@field StarterHandSize integer
---@field StarterFollowerSlots integer
---@field StarterReputation integer
---@field IsHidden boolean
CharacterData = {}

---@class Element
---@field GUID string
---@field Name string
Element = {}

---@class EnemyType
---@field GUID string
---@field Name string
EnemyType = {}

---@class EnemyData
---@field GUID string
---@field Name string
---@field EnemyType EnemyType
---@field Armor integer
---@field IsElusive boolean
---@field Fortification integer
---@field Attacks Attack[]
---@field SummoningAttacks EnemyType[]
---@field Immunities integer[]
---@field Resistances Element[]
---@field XPGain integer
---@field ReputationGain integer
---@field ReputationGainBonusWhenRampaging integer
---@field ChallengeRating integer
---@field IsHidden boolean
EnemyData = {}

---@class BattleEnemy
---@field GUID string
---@field EnemyData EnemyData
BattleEnemy = {}

---@return EnemyData[]
function BattleEnemy.GetSummonedEnemyData() end

---@class Attack
---@field Value integer
---@field Element Element
---@field AttackType integer
---@field AttackModifiers integer[]
Attack = {}

---@class Block
---@field Value integer
---@field Element Element
Block = {}

---@class BattleArenaType
---@field GUID string
---@field Name string
---@field TimeOfDay TimeOfDay?
---@field MaxFollowersBroughtInCombat integer
---@field IsAttackConsideredAssault boolean
BattleArenaType = {}

---@class FollowerData
---@field GUID string
---@field Name string
---@field FollowerType integer
---@field Level integer
---@field Armor integer
---@field RecruitmentLocations LocationType[]
---@field Resistances Element[]
---@field IsHidden boolean
FollowerData = {}

---@class FollowerBlessingData
---@field GUID string
---@field Name string
FollowerBlessingData = {}

---@class FollowerBlessing
---@field GUID string
---@field BlessingData FollowerBlessingData
---@field CreatorCardId string
---@field CreatorCard CardData
---@field IsExhausted boolean
FollowerBlessing = {}

---@class Follower
---@field GUID string
---@field FollowerData FollowerData
---@field Wounds integer
---@field IsExhausted boolean
---@field AssignedBlessing FollowerBlessing?
Follower = {}

---@class LocationType
---@field GUID string
---@field Name string
---@field IsCitadel boolean
---@field IsDungeon boolean
---@field IsHallowed boolean
---@field IsHideout boolean
---@field IsKrak boolean
---@field IsLabyrinth boolean
---@field IsBazaar boolean
---@field IsMaze boolean
---@field IsMine boolean
---@field IsPortal boolean
---@field IsRuins boolean
---@field IsSource boolean
---@field IsSpire boolean
---@field IsTemple boolean
---@field IsTomb boolean
---@field IsVillage boolean
LocationType = {}

---@class LocationMarketCard
---@field Card Card
---@field AvailableLocation LocationType
LocationMarketCard = {}

---@class ManaColor
---@field GUID string
---@field Name string
ManaColor = {}

---@class TerrainType
---@field GUID string
---@field Name string
TerrainType = {}

---@param timeOfDayId string
---@return integer
function TerrainType.GetMovementCost(timeOfDayId) end

---@class ManaData
---@field ManaColor ManaColor
---@field Form integer
---@field IsCrystal boolean
---@field IsAmbient boolean
---@field IsToken boolean
ManaData = {}

---@class MapHexData
---@field Terrain TerrainType
---@field Location LocationType?
---@field RampagingEnemyType EnemyType?
---@field RampagingEnemy EnemyData?
MapHexData = {}

---@class MapSectionData
---@field GUID string
---@field SectionType integer
---@field NumHexes integer
---@field IsHidden boolean
MapSectionData = {}

---@param hexIndex integer
---@return MapHexData
function MapSectionData.GetHex(hexIndex) end

---@class MapShape
---@field GUID string
---@field Name string
---@field StarterSection MapSectionData
---@field StarterSectionPosition Vector3Int
MapShape = {}

---@class OathData
---@field GUID string
---@field Name string
OathData = {}

---@class TimeOfDay
---@field GUID string
---@field Name string
TimeOfDay = {}

---@class ScenarioData
---@field GUID string
---@field Name string
ScenarioData = {}

---@class Player
---@field GUID string
---@field Xp integer
---@field Level integer
---@field Character CharacterData
---@field Oath OathData
---@field Armor integer
---@field HandSize integer
---@field Reputation integer
---@field Followers Follower[]
---@field DrawPile Card[]
---@field DiscardedCards Card[]
---@field Hand Card[]
---@field CrystalsInInventory ManaColor[]
---@field NumAllowedAmbientMana integer
---@field NumAllowedFollowers integer
---@field ActiveBenediction Benediction
---@field StartOfTurnState Player?
---@field HasAdditionalTurns boolean
---@field Blessings Blessing[]
Player = {}

---@param xp integer
function Player.IncreaseXp(xp) end

---@param reputation integer
function Player.AddReputation(reputation) end

---@param value integer
function Player.IncreaseArmor(value) end

---@param value integer
function Player.IncreaseHandSize(value) end

---@param value integer
function Player.IncreaseFollowerSlots(value) end

---@param manaColorIds string[]
function Player.ReplaceCrystalsInInventory(manaColorIds) end

---@param manaColorIds string[]
function Player.AcquireCrystals(manaColorIds) end

---@param blessingId string
---@return Blessing?
function Player.FindBlessing(blessingId) end

---@param blessingId string
---@return boolean
function Player.RefreshBlessing(blessingId) end

---@param blessingDataId string
---@return string?
function Player.AcquireBlessing(blessingDataId) end

---@param blessingId string
---@return boolean
function Player.DestroyBlessing(blessingId) end

---@param followerId string
---@return Follower?
function Player.FindFollower(followerId) end

function Player.RefreshFollowers() end

---@param followerId string
---@return boolean
function Player.RefreshFollower(followerId) end

---@param followerId string
---@return boolean
function Player.RefreshFollowerBlessing(followerId) end

---@param followerId string
---@param numWounds integer
---@return boolean
function Player.HealFollower(followerId, numWounds) end

---@param followerId string
---@param numWounds integer
---@return boolean
function Player.DamageFollower(followerId, numWounds) end

---@param followerDataId string
---@return string?
function Player.AcquireFollower(followerDataId) end

---@param followerId string
---@return boolean
function Player.DestroyFollower(followerId) end

---@param cardId string
---@return Card?
function Player.FindCardInHand(cardId) end

---@param cardDataId string
---@param location integer
---@return string?
function Player.AcquireCard(cardDataId, location) end

---@param cardId string
---@return boolean
function Player.DestroyCard(cardId) end

---@param cardIds string[]
---@param newLocation integer
---@param shuffleDestination boolean
---@return boolean
function Player.MoveCards(cardIds, newLocation, shuffleDestination) end

-- =============
-- Map
-- =============
---@class MapPlayer
---@field PlayerId string
---@field CurrentPosition Vector3Int
---@field PreviousPosition Vector3Int
MapPlayer = {}

---@class MapLocation
---@field GUID string
---@field LocationType LocationType
---@field Position Vector3Int
---@field MovementCostOverride integer
MapLocation = {}

---@return boolean
function MapLocation.IsConqueredByPlayer() end

---@param playerId string
---@return boolean
function MapLocation.IsConqueredByAPlayer(playerId) end

---@return integer
function MapLocation.GetDistanceFromPlayer() end

---@param playerId string
---@return integer
function MapLocation.GetDistanceFromAPlayer(playerId) end

---@return boolean
function MapLocation.CanPlayerMoveWithoutInteracting() end

---@param playerId string
---@return boolean
function MapLocation.CanAPlayerMoveWithoutInteracting(playerId) end

---@class MapLocationEnemy
---@field GUID string
---@field EnemyData EnemyData
---@field IsRevealed boolean
---@field IsDead boolean
MapLocationEnemy = {}

---@class MapRampagingEnemy
---@field GUID string
---@field Position Vector3Int
---@field EnemyData EnemyData
---@field KillingRewards string?
MapRampagingEnemy = {}

---@return integer
function MapRampagingEnemy.GetDistanceFromPlayer() end

---@param playerId string
---@return integer
function MapRampagingEnemy.GetDistanceFromAPlayer(playerId) end

---@class MapHex
---@field SectionId string
---@field GUID string
---@field Position Vector3Int
---@field TerrainType TerrainType
---@field Location MapLocation?
---@field Enemy MapRampagingEnemy?
MapHex = {}

---@return integer
function MapHex.GetDistanceFromPlayer() end

---@param playerId  string
---@return integer
function MapHex.GetDistanceFromAPlayer(playerId) end

---@class MapSection
---@field GUID string
---@field SectionData MapSectionData
---@field Position Vector3Int
---@field NumHexes integer
MapSection = {}

---@param hexIndex integer
---@return MapHex?
function MapSection.GetHex(hexIndex) end

---@param hexId string
---@return MapHex?
function MapSection.GetHexById(hexId) end

---@param hexId string
---@param newTerrainTypeId string
---@param selectedTerrainTileIndex integer
---@return boolean
function MapSection.ReplaceTerrain(hexId, newTerrainTypeId, selectedTerrainTileIndex) end

---@param hexId string
---@return boolean
function MapSection.RemoveLocation(hexId) end

---@param hexId string
---@param newLocationId string
---@return boolean
function MapSection.SetLocation(hexId, newLocationId) end

---@param hexId string
---@return boolean
function MapSection.RemoveEnemy(hexId) end

---@param hexId string
---@param newEnemyId string
---@param killingRewardsId string?
---@return boolean
function MapSection.SetEnemy(hexId, newEnemyId, killingRewardsId) end

---@param hexId string
---@param newEnemyTypeId string
---@param killingRewardsId string?
---@return boolean
function MapSection.SetRandomEnemy(hexId, newEnemyTypeId, killingRewardsId) end

---@class Map
---@field MapShape MapShape
---@field NumDrawableSections integer
---@field NumRevealedSections integer
Map = {}

---@return MapSectionData[]
function Map.GetSectionsDrawPile() end

---@return MapSection?
function Map.GetNextDrawableSection() end

---@return MapSection[]
function Map.GetRevealedSections() end

---@param sectionId string
---@return MapSection?
function Map.GetSection(sectionId) end

---@return string[]
function Map.GetStarterSectionIds() end

---@param hexId string
---@return MapHex?
function Map.GetHex(hexId) end

---@param position Vector3Int
---@return MapHex?
function Map.GetHexAtPosition(position) end

---@param sourceHexId string
---@param destinationHexId string
---@param overrideExisting boolean
---@return boolean
function Map.MoveEnemy(sourceHexId, destinationHexId, overrideExisting) end

---@param sourceHexId string
---@param destinationHexId string
---@param overrideExisting boolean
---@return boolean
function Map.MoveLocation(sourceHexId, destinationHexId, overrideExisting) end

---@return MapHex?
function Map.GetPlayerHex() end

---@param playerId string
---@return MapHex?
function Map.GetAPlayerHex(playerId) end

---@return MapPlayer?
function Map.GetPlayerPosition() end

---@param playerId string
---@return MapPlayer?
function Map.GetAPlayerPosition(playerId) end

---@param hexId string
---@return boolean
function Map.SetPlayerPosition(hexId) end

---@param playerId string
---@param hexId string
---@return boolean
function Map.SetAPlayerPosition(playerId, hexId) end

-- =============
-- Market
-- =============
---@class Market
---@field Blessings Blessing[]
---@field Followers Follower[]
---@field Spells Card[]
---@field AdvancedActions Card[]
---@field LocationSpecificCards LocationMarketCard[]
---@field RemainingAmbientMana ManaColor[]
---@field AmbientManaPoolSize integer
Market = {}

---@param blessingDataId string
---@return string?
function Market.AddBlessing(blessingDataId) end

---@param blessingId string
---@return boolean
function Market.RemoveBlessing(blessingId) end

---@param followerDataId string
---@return string?
function Market.AddFollower(followerDataId) end

---@param followerId string
---@return boolean
function Market.RemoveFollower(followerId) end

---@param cardDataId string
---@return string?
function Market.AddCard(cardDataId) end

---@param cardId string
---@return boolean
function Market.RemoveCard(cardId) end

---@param manaColorIds string[]
function Market.ReplaceAmbientMana(manaColorIds) end

---@param manaColorId string
---@return boolean
function Market.AddAmbientMana(manaColorId) end

-- =============
-- Config
-- =============
---@class CrusadeConfig
---@field ScenarioData ScenarioData
---@field NumRounds integer
---@field Rounds TimeOfDay[]
---@field ShouldPlayersThrowBenedictionsAfterUse boolean
---@field ShouldDummyThrowBenedictionsAfterUse boolean
---@field ScenarioExtensionMods string[]
CrusadeConfig = {}

---@class BattleConfig
---@field BattleId string
---@field TimeOfDay TimeOfDay
---@field ArenaType BattleArenaType
---@field EnemiesInBattle BattleEnemy[]
---@field RampagingEnemiesInBattle BattleEnemy[]
---@field FollowersInBattle string[]
BattleConfig = {}

-- ==============
-- GameResources
-- ==============
---@class GameResources
GameResources = {}
---@param guid string
---@return CardData?
function GameResources.GetCard(guid) end
---@return CardData[]
function GameResources.GetAllCards() end

---@param guid string
---@return CharacterData?
function GameResources.GetCharacter(guid) end
---@return CharacterData[]
function GameResources.GetAllCharacters() end

---@param guid string
---@return Element?
function GameResources.GetElement(guid) end
---@return Element[]
function GameResources.GetAllElements() end

---@param guid string
---@return EnemyData?
function GameResources.GetEnemy(guid) end
---@return EnemyData[]
function GameResources.GetAllEnemies() end

---@param guid string
---@return EnemyType?
function GameResources.GetEnemyType(guid) end
---@return EnemyType[]
function GameResources.GetAllEnemyTypes() end

---@param guid string
---@return LocationType?
function GameResources.GetLocationType(guid) end
---@return LocationType[]
function GameResources.GetAllLocationTypes() end

---@param guid string
---@return ManaColor?
function GameResources.GetManaColor(guid) end
---@return ManaColor[]
function GameResources.GetAllManaColors() end

---@param guid string
---@return MapSectionData?
function GameResources.GetMapSection(guid) end
---@return MapSectionData[]
function GameResources.GetAllMapSections() end

---@param guid string
---@return MapShape?
function GameResources.GetMapShape(guid) end
---@return MapShape[]
function GameResources.GetAllMapShapes() end

---@param guid string
---@return BlessingData?
function GameResources.GetBlessing(guid) end
---@return BlessingData[]
function GameResources.GetAllBlessings() end

---@param guid string
---@return TerrainType?
function GameResources.GetTerrain(guid) end
---@return TerrainType[]
function GameResources.GetAllTerrains() end

---@param guid string
---@return TimeOfDay?
function GameResources.GetTimeOfDay(guid) end
---@return TimeOfDay[]
function GameResources.GetAllTimeOfDays() end

---@param guid string
---@return FollowerData?
function GameResources.GetFollower(guid) end
---@return FollowerData[]
function GameResources.GetAllFollowers() end

---@param guid string
---@return FollowerBlessingData?
function GameResources.GetFollowerBlessing(guid) end
---@return FollowerBlessingData[]
function GameResources.GetAllFollowerBlessings() end

---@param manaColorId string
---@param form integer
---@Return ManaData?
function GameResources.CreateManaData(manaColorId, form) end

-- =============
-- GameState
-- =============
---@class GameState
---@field Config CrusadeConfig
---@field Market Market
---@field Map Map
---@field Player Player
---@field AllPlayers Player[]
---@field DummyPlayer Player
---@field CurrentRound integer
---@field CurrentRoundTimeOfDay TimeOfDay
---@field NextRoundTimeOfDay TimeOfDay?
---@field CurrentTurnInRound integer
---@field CurrentPhase integer
---@field CurrentPhaseUID integer
---@field IsEndOfRoundAnnounced boolean
---@field NumCheckpointUsed integer
---@field ActiveBattle BattleConfig?
GameState = {}

---@param playerId string
---@return Player?
function GameState.GetAPlayer(playerId) end

---@return string[]
function GameState.GetPlayersTurnOrder() end

---@return string[]
function GameState.GetActiveMods() end
