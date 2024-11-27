import { GameValues } from '../GameValues';
import { GameResourceType } from '../GameResources';
import { Specs } from '../Specs';

export const CrusadeStartingBoonsSpecId = "CrusadeStartingBoonsSpec";

export const CrusadeStartingBoonsSpec = (contextProvider) => ({
  id: CrusadeStartingBoonsSpecId,
  title: 'Crusade Starting Boons',
  description: 'Boons that the character will start the crusade with',
  summary: (data) => null,
  properties: [
    {
      id: 'cards',
      label: 'Cards',
      description: 'List of cards the character will start with.',
      specs: Specs.GameResList(GameResourceType.Card, contextProvider, { allowDuplicates: true }),
      optional: true,
      default: []
    },
    {
      id: 'followers',
      label: 'Followers',
      description: 'List of followers the character will start with.',
      specs: Specs.GameResList(GameResourceType.Follower, contextProvider, { allowDuplicates: true }),
      optional: true,
      default: []
    },
    {
      id: 'blessings',
      label: 'Blessings',
      description: 'List of blessings the character will start with.',
      specs: Specs.GameResList(GameResourceType.Blessing, contextProvider, { allowDuplicates: true }),
      optional: true,
      default: []
    },
    {
      id: 'crystalsInInventory',
      label: 'Crystals in Inventory',
      description: 'List of mana crystals the character will start with.',
      specs: Specs.GameValueList(GameValues.ManaColor, { allowDuplicates: true }),
      optional: true,
      default: []
    },
    {
      id: 'armorBonus',
      label: 'Armor Bonus',
      description: 'Can be negative. Increase/Reduce character armor.',
      specs: Specs.Int,
      optional: true,
      default: 0
    },
    {
      id: 'handSizeBonus',
      label: 'Hand Size Bonus',
      description: 'Can be negative. Increase/Reduce character hand size.',
      specs: Specs.Int,
      optional: true,
      default: 0
    },
    {
      id: 'reputationBonus',
      label: 'Reputation Bonus',
      description: 'Can be negative. Increase/Reduce character reputation.',
      specs: Specs.Int,
      optional: true,
      default: 0
    },
    {
      id: 'followerSlotsBonus',
      label: 'Follower Slots Bonus',
      description: "Increase starting number of unit slots (will add the 'units' to it too)",
      specs: Specs.Int,
      optional: true,
      default: 0,
      validator: Specs.Int.validators.gte(0)
    }
  ]
})
