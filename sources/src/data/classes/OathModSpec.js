import { Specs } from '../Specs';
import { CrusadeRoundBoonsSpec } from './CrusadeRoundBoonsSpec';
import { CrusadeStartingBoonsSpec } from './CrusadeStartingBoonsSpec';

export const OathModSpecId = "OathModSpec";

export const OathModSpec = (contextProvider) => ({
  id: OathModSpecId,
  title: 'Oath Information',
  summary: (data) => {
    data = data || {};
    return data.name;
  },
  properties: [
    {
      id: 'guid',
      label: 'GUID',
      description: "guid, unique only within the mod. Will be turned into guid 'mod:'+$yourModId+':'+$guid",
      specs: Specs.GUID()
    },
    {
      id: 'name',
      label: 'Name',
      description: "name displayed to the players",
      specs: Specs.Words()
    },
    {
      id: 'description',
      label: 'Description',
      description: 'Flavor text describing the oath (stick to 2-3 lines max).',
      specs: Specs.Sentences()
    },
    {
      id: 'startingBoons',
      label: 'Starting Boons',
      description: 'What the player starts with.',
      specs: Specs.CustomSpec(CrusadeStartingBoonsSpec(contextProvider)),
      optional: true
    },
    {
      id: 'roundBoons',
      label: 'Round Boons',
      description: 'What the player gets every round.',
      specs: Specs.CustomSpec(CrusadeRoundBoonsSpec(contextProvider)),
      optional: true
    },
    {
      id: 'isCharacterSpecific',
      label: 'Is Character Specific',
      description: 'Set to true if the oath can only be used by a specific character (that character data should include it).',
      specs: Specs.Bool,
      optional: true,
      default: false
    }
  ]
})
