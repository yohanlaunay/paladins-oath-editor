import { GameResourceType } from '../GameResources';
import { Specs } from '../Specs';

export const CharacterLevelSpecId = "CharacterLevelSpec";

export const CharacterLevelSpec = (contextProvider) => ({
  id: CharacterLevelSpecId,
  title: 'Character Level Information',
  description: 'Rewards and XP thresholds for levelling',
  summary: (data) => {
    data = data || {};
    return '' + data.requiredXp + ' XP --> ' + (!!data.rewardsLevelUp ? data.rewardsLevelUp : 'No rewards');
  },
  properties: [
    {
      id: 'requiredXp',
      label: 'Required XP',
      description: 'At which XP this level up will be given.',
      specs: Specs.Int,
      default: 0,
      validator: Specs.Int.validators.gte(0)
    },
    {
      id: 'rewardsLevelUp',
      label: 'Level-Up Rewards',
      description: "ID of the rewards information to be given when leveling up. Don't specify if you don't want to give a reward at that level.",
      optional: true,
      specs: Specs.GameRes(GameResourceType.Rewards, contextProvider)
    }
  ]
})
