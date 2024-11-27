import { GameValues } from '../GameValues';
import { Specs } from '../Specs';

export const RewardModSpecId = "RewardModSpec";

export const RewardModSpec = (contextProvider) => ({
  id: RewardModSpecId,
  title: 'Reward Information',
  summary: (data) => {
    data = data || {};
    return data.name;
  },
  properties: [
    {
      id: 'guid',
      label: 'GUID',
      description: 'Unique within the mod, will be turned into "mod:$modId:$GUID"',
      specs: Specs.GUID()
    },
    {
      id: 'name',
      label: 'Name',
      description: 'Reward name (not localized) to be displayed when the rewards are distributed.',
      specs: Specs.Words()
    },
    {
      id: 'comboType',
      label: 'Combo Type',
      description: 'Determines how the reward options are given to the player.',
      specs: Specs.GameValue(GameValues.RewardComboType),
      default: GameValues.RewardComboType.combo_and.value
    },
    {
      id: 'rewardOptions',
      label: 'Reward Options',
      description: 'List of rewards to give to the player. Cannot be empty.',
      specs: Specs.GameValueList(GameValues.Reward, { minCount: 1, allowDuplicates: true })
    },
  ]
})
