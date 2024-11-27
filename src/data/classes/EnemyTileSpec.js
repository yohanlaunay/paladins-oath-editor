import { Specs } from '../Specs';

export const EnemyTileSpecId = "EnemyTileSpec";

export const EnemyTileSpec = (contextProvider) => ({
  id: EnemyTileSpecId,
  title: 'Enemy Tile',
  description: 'Controls how the enemy is displayed on the map',
  summary: (data) => null,
  properties: [
    {
      id: "tileNormalSprite",
      label: "Tile Sprite (normal)",
      description: "local file path in mod enemy folder. PNG, 256x384, Outline (10px; 0,0,0), Using the map token base.",
      specs: Specs.Image({ width: 256, height: 384 }),
      links: [
        { label: 'Sample', url: 'samples/enemy/tileNormalSprite.png' },
        { label: 'Figurine Base', url: 'samples/figurineSprite_base.png' }
      ],
    },
    {
      id: "tileOutlinedSprite",
      label: "Tile Sprite (outlined)",
      description: "local file path in mod enemy folder. PNG, 256x384, Outline (5px; 0,255,33), outlined version of Normal.",
      specs: Specs.Image({ width: 256, height: 384 }),
      links: [
        { label: 'Sample', url: 'samples/enemy/tileOutlinedSprite.png' }
      ],
    },
  ]
})