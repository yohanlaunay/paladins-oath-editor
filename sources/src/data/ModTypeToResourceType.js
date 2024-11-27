import { GameResourceType } from "./GameResources";

export const ModTypeToResourceType = {
  cardMods: GameResourceType.Card,
  mapSectionMods: GameResourceType.MapSection,
  terrainMods: GameResourceType.Terrain,
  enemyMods: GameResourceType.Enemy,
  rewardsMods: GameResourceType.Rewards,
  oathMods: GameResourceType.Oath,
  characterMods: GameResourceType.Character,
  scenarioMods: GameResourceType.Scenario,
  scenarioExtensionMods: GameResourceType.ScenarioExtension,
  languageMods: GameResourceType.Language
}
