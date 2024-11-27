import { ManaSpec } from './ManaSpec';
import { Specs } from '../Specs'

export const CrusadeRoundBoonsSpecId = "CrusadeRoundBoonsSpec";

export const CrusadeRoundBoonsSpec = (contextProvider) => ({
  id: CrusadeRoundBoonsSpecId,
  title: 'Crusade Round Boons',
  description: 'Boons that the character will receive every round',
  summary: (data) => null,
  properties: [
    {
      id: 'mana',
      label: 'Mana',
      description: 'List of mana that the character will receive every round.',
      optional: true,
      specs: Specs.CustomSpecList(ManaSpec(contextProvider), { allowDuplicates: true })
    },
    {
      id: 'reputationBonus',
      label: 'Reputation Bonus',
      description: "Can be negative. Increase/Reduce character reputation every round.",
      optional: true,
      specs: Specs.Int,
      default: 0
    },
    {
      id: 'movementPoints',
      label: 'Movement Points',
      description: "Gain movement points every round.",
      optional: true,
      specs: Specs.Int,
      default: 0,
      validator: Specs.Int.validators.gte(0)
    },
    {
      id: 'healingPoints',
      label: 'Healing Points',
      description: "Gain healing points every round.",
      optional: true,
      specs: Specs.Int,
      default: 0,
      validator: Specs.Int.validators.gte(0)
    },
    {
      id: 'leadershipPoints',
      label: 'Leadership Points',
      description: "Gain leadership points every round.",
      optional: true,
      specs: Specs.Int,
      default: 0,
      validator: Specs.Int.validators.gte(0)
    }
  ]
})
