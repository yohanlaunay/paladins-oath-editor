import { FindEnumByValue, GameValues } from '../GameValues';
import { GameResourceType, GameResources } from '../GameResources';
import { Specs } from '../Specs';

export const MapHexSpecId = "MapHexSpec";

export const MapHexSpec = (contextProvider) => ({
  id: MapHexSpecId,
  title: 'Map Hex',
  summary: (data) => {
    data = data || {}
    return '' + (!!data.terrain ? data.terrain : 'No Terrain')
      + (!!data.location ? ' ' + data.location : '')
      + (!!data.rampagingEnemyType ? ' ' + FindEnumByValue(GameValues.EnemyType, data.rampagingEnemyType).name : '')
      + (!!data.rampagingEnemy ? ' ' + data.rampagingEnemy : '')
  },
  properties: [
    {
      id: 'terrain',
      label: 'Terrain',
      specs: Specs.GameRes(GameResourceType.Terrain, contextProvider),
      default: GameResources.Terrain.terrain__plains.id
    },
    {
      id: 'location',
      label: 'Location',
      optional: true,
      specs: Specs.GameRes(GameResourceType.Location, contextProvider)
    },
    {
      id: 'rampagingEnemyType',
      label: 'Rampaging Enemy Type',
      description: 'Enemy will be drawn from the list of enemies of this type. Either specify this or "Rampaging Enemy" but not both',
      optional: true,
      specs: Specs.GameValue(GameValues.EnemyType),
      renderConfig: {
        renderConditions: [
          ['disableIf', (data) => !!data && !!data.rampagingEnemy]
        ]
      }
    },
    {
      id: 'rampagingEnemy',
      label: 'Rampaging Enemy',
      description: 'Enemy showing up on this hex. Either specify this or "Rampaging Enemy Type" but not both',
      optional: true,
      specs: Specs.GameRes(GameResourceType.Enemy, contextProvider),
      renderConfig: {
        renderConditions: [
          ['disableIf', (data) => !!data && !!data.rampagingEnemyType]
        ]
      }
    },
  ],
  validator: (data) => {
    if (!!data.rampagingEnemy && !!data.rampagingEnemyType) {
      throw new Error("Use 'Rampaging Enemy' or 'Rampaging Enemy Type', but not both.")
    }
  }
})
