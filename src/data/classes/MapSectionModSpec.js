import { MapHexSpec } from './MapHexSpec';
import { Specs } from '../Specs';

const NUM_MAP_SECTION_HEXES = 7;

export const MapSectionModSpecId = "MapSectionModSpec";

export const MapSectionModSpec = (contextProvider) => ({
  id: MapSectionModSpecId,
  title: 'Map Section',
  description: 'Collection of ' + NUM_MAP_SECTION_HEXES + ' hexes',
  summary: (data) => {
    data = data || {};
    return data.guid;
  },
  properties: [
    {
      id: 'guid',
      label: 'GUID',
      description: "guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid",
      specs: Specs.GUID()
    },
    {
      id: 'numInstancesInDeck',
      label: 'Num Instances in Deck. Set 0 to disable drawing this tile (typically for scripted mods.',
      specs: Specs.Int,
      default: 1,
      validator: Specs.Int.validators.gt(-1) // can be 0
    },
    {
      id: 'hexes',
      label: 'Hexes',
      specs: Specs.CustomSpecList(MapHexSpec(contextProvider), { minCount: NUM_MAP_SECTION_HEXES, maxCount: NUM_MAP_SECTION_HEXES }),
      illustration: 'samples/map/hexes.jpg'
    }
  ]
})
