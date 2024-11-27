import { GameValues } from '../GameValues';
import { TerrainMovementCostSpec } from './TerrainMovementCostSpec';
import { Specs } from '../Specs';

export const TerrainModSpecId = "TerrainModSpec";

export const TerrainModSpec = (contextProvider) => ({
  id: TerrainModSpecId,
  title: 'Terrain Information',
  summary: (data) => {
    data = data || {};
    return data.name;
  },
  properties: [
    {
      id: 'guid',
      label: 'GUID',
      description: "guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid",
      specs: Specs.GUID()
    },
    {
      id: 'name',
      label: 'Name',
      description: "Name for the terrain, will be shown to the user (non localized)",
      specs: Specs.Words()
    },
    {
      id: 'tileSprites',
      label: 'Tile Sprites',
      description: "List of image file names (PNG 512x768), local to the mod folder. One file per tile variation. Need at least one.",
      specs: Specs.ImageList({ width: 512, height: 768 }, { minCount: 1 }),
      links: [
        { label: 'Sample', url: 'samples/map/tile_template/tile_sample.png' },
        { label: 'Base', url: 'samples/map/tile_template/tile_template_base.png' },
        { label: 'Border Mask', url: 'samples/map/tile_template/tile_template_border.png' },
        { label: 'PaintDotNet Sample', url: 'samples/map/tile_template/tile_template.pdn' },
        { label: 'PaintDotNet Download', url: 'https://www.getpaint.net/' }
      ],
    },
    {
      id: 'movementCost',
      label: 'Movement Cost (Day | Night)',
      specs: Specs.CustomSpecList(TerrainMovementCostSpec(contextProvider), { minCount: 2, maxCount: 2 }),
      validator: (data) => {
        const hasDay = data[0].timeOfDay === GameValues.TimeOfDay.timeofday_day.value || data[1].timeOfDay === GameValues.TimeOfDay.timeofday_day.value;
        const hasNight = data[0].timeOfDay === GameValues.TimeOfDay.timeofday_night.value || data[1].timeOfDay === GameValues.TimeOfDay.timeofday_night.value;
        if (!(hasDay && hasNight)) {
          throw new Error('Invalid TimeOfDay for Movement Cost. Need 1 day and 1 night.');
        }
      }
    }
  ]
})
