import { FindEnumByValue, GameValues } from '../GameValues';
import { Specs } from '../Specs';

export const TerrainMovementCostSpecId = "TerrainMovementCostSpec";

export const TerrainMovementCostSpec = (contextProvider) => ({
  id: TerrainMovementCostSpecId,
  title: 'Terrain Movement Cost',
  summary: (data) => {
    data = data || {};
    return (data.timeOfDay ? FindEnumByValue(GameValues.TimeOfDay, data.timeOfDay).name : ' Missing TimeOfDay')
      + ' ' + (data.allowMovement ? data.cost : 'X');
  },
  properties: [
    {
      id: 'timeOfDay',
      label: 'Time of Day',
      description: "Time of Day the cost applies to",
      specs: Specs.GameValue(GameValues.TimeOfDay),
      default: GameValues.TimeOfDay.timeofday_day.value
    },
    {
      id: 'allowMovement',
      label: 'Allow Movement',
      description: "Set to false to permanently disable movement onto this terrain type (ex: mountain)",
      specs: Specs.Bool,
      optional: true,
      default: true
    },
    {
      id: 'cost',
      label: 'Movement Cost',
      description: "Movement Cost to enter this terrain. Ignored when 'allowMovement' is false.",
      specs: Specs.Int,
      default: 0,
      validator: Specs.Int.validators.gte(0),
      renderConfig: {
        renderConditions: [
          ['disableIf', (data) => !data || data.allowMovement !== true]
        ]
      }
    },
  ]
})
