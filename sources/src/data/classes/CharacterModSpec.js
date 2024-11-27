import { GameResourceType } from '../GameResources';
import { Specs } from '../Specs';
import { CharacterLevelSpec } from './CharacterLevelSpec';
import { CrusadeRoundBoonsSpec } from './CrusadeRoundBoonsSpec';
import { CrusadeStartingBoonsSpec } from './CrusadeStartingBoonsSpec';

export const CharacterModSpecId = "CharacterModSpec";

export const CharacterModSpec = (contextProvider) => ({
  id: CharacterModSpecId,
  title: 'Character Information',
  summary: (data) => {
    data = data || {};
    return '' + data.name;
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
      description: "Character name (not localized)",
      specs: Specs.Words()
    },
    {
      id: 'description',
      label: 'Description',
      description: "Backstory of the paladin.",
      specs: Specs.Sentences()
    },
    {
      id: 'playstyleInfo',
      label: 'PlaystyleInfo',
      description: "flavor text describing what is good/bad at.",
      specs: Specs.Sentences()
    },
    {
      id: 'portraitSprite',
      label: 'Portrait Sprite',
      description: "name of local file (local to the mod character folder). PNG, 256x256.",
      specs: Specs.Image({ width: 256, height: 256 }),
      links: [
        { label: 'Sample', url: 'samples/character/portraitSprite.png' }
      ],
    },
    {
      id: 'medallionSprite',
      label: 'Medallion Sprite',
      description: "name of local file (local to the mod character folder). PNG, 192x192.",
      specs: Specs.Image({ width: 192, height: 192 }),
      links: [
        { label: 'Sample', url: 'samples/character/medallionSprite.png' },
        { label: 'Medallion Background', url: 'samples/medallionSprite_base.png' },
        { label: 'Medallion Ring Mask', url: 'samples/medallionSprite_ring_mask.png' }
      ],
    },
    {
      id: 'figurineSprite',
      label: 'Figurine Sprite',
      description: "string. name of local file (local to the mod character  folder). PNG, 512x768, Outline (10,243;0,0,0).",
      specs: Specs.Image({ width: 512, height: 768 }),
      links: [
        { label: 'Sample', url: 'samples/character/figurineSprite.png' },
        { label: 'Figurine Base', url: 'samples/figurineSprite_base.png' }
      ],
    },
    {
      id: 'fullbodySprite',
      label: 'Fullbody Sprite',
      description: "name of local file (local to the mod character  folder). PNG, 1024x1024, Outline (10,243;0,0,0).",
      specs: Specs.Image({ width: 1024, height: 1024 }),
      links: [
        { label: 'Sample', url: 'samples/character/fullbodySprite.png' }
      ],
    },
    {
      id: 'tileDefaultSprite',
      label: 'Tile Sprite (default)',
      description: "name of local file (local to the mod character  folder). PNG, 256x384, Outline (10,243;0,0,0).",
      specs: Specs.Image({ width: 256, height: 384 }),
      links: [
        { label: 'Sample', url: 'samples/character/tileDefaultSprite.png' }
      ],
    },
    {
      id: 'tileOccupiedSprite',
      label: 'Tile Sprite (occupied)',
      description: "When player figurine is sharing tile with locations. Name of local file (local to the mod character  folder). PNG, 256x384, Outline (10,243;0,0,0).",
      specs: Specs.Image({ width: 256, height: 384 }),
      links: [
        { label: 'Sample', url: 'samples/character/tileOccupiedSprite.png' }
      ],
    },
    {
      id: 'ownershipTokenMapPropSprite',
      label: 'Ownership Map Token Sprite',
      description: "Shown when conquering locations. Name of local file (local to the mod character  folder). PNG, 256x384, Outline (10,243;0,0,0).",
      specs: Specs.Image({ width: 256, height: 256 }),
      links: [
        { label: 'Sample', url: 'samples/character/ownershipTokenMapPropSprite.png' }
      ],
    },
    {
      id: 'levels',
      label: 'Levels',
      description: "Describes XP requirements and rewards for each level.",
      specs: Specs.CustomSpecList(CharacterLevelSpec(contextProvider)),
      validator: (data) => {
        if (data.length == 0) {
          throw new Error("Missing level information");
        }
        if (data[0]['requiredXp'] != 0) {
          throw new Error('First level should require no XP');
        }

        // check that subsequent levels require more XP than the previous one.
        let lastXp = data[0]['requiredXp'];
        for (let i = 1; i < data.length; i++) {
          const nextXp = data[i]['requiredXp'];
          if (nextXp <= lastXp) {
            throw new Error("Each level should require more XP than the previous one");
          }
          lastXp = nextXp;
        }
      }
    },
    {
      id: 'inaneBlessings',
      label: 'Inate Blessings',
      description: "List of blessings the character is born with. Will be added to the list of available blessings.",
      specs: Specs.GameResList(GameResourceType.Blessing, contextProvider, { minCount: 1, allowDuplicates: true })
    },
    {
      id: 'inaneCards',
      label: 'Inate Cards',
      description: "List of cards the character is born with, will be added to the deck.",
      specs: Specs.GameResList(GameResourceType.Card, contextProvider, { minCount: 5, allowDuplicates: true }),
    },
    {
      id: 'uniqueInaneCardsInfo',
      label: 'Unique Cards Information',
      description: "Display purpose only, shows which cards are unique to this character (compared to other characters). Those cards should appear in the list of Inate Cards too.",
      specs: Specs.GameResList(GameResourceType.Card, contextProvider),
      optional: true,
      renderConfig: {
        renderConditions: [
          ['disableIf', (data) => true] // never render, it's too complicated and users cannot create custom cards.
        ]
      }
    },
    {
      id: 'personalOaths',
      label: 'Personal Oaths',
      description: "List of Oaths that are unique to this character (Oaths that are marked as 'character specific').",
      specs: Specs.GameResList(GameResourceType.Oath, contextProvider, { allowDuplicates: false }, /*isValidFn=*/(oath) => {
        return !!((oath.properties || {}).isCharacterSpecific);
      }),
      optional: true
    },
    {
      id: 'defaultAllowedAmbientDie',
      label: 'Default Allowed Ambient Die',
      description: "How many Ambient mana can the character use.",
      specs: Specs.Int,
      optional: true,
      default: 1,
      validator: Specs.Int.validators.gt(0)
    },
    {
      id: 'numPointsRequiredPerWound',
      label: 'Num Points Required per Wound',
      description: "How many Healing points are required to heal 1 wound on this character.",
      specs: Specs.Int,
      optional: true,
      default: 1,
      validator: Specs.Int.validators.gt(0)
    },
    {
      id: 'defaultExplorationDistance',
      label: 'Default Exploration Distance',
      description: "How many hexes away from exploration spot can the character explore.",
      specs: Specs.Int,
      optional: true,
      default: 1,
      validator: Specs.Int.validators.gt(0)
    },
    {
      id: 'defaultExplorationMovementCost',
      label: 'Default Exploration Movement Cost',
      description: "How many movement points does it cost to explore (by default).",
      specs: Specs.Int,
      optional: true,
      default: 2,
      validator: Specs.Int.validators.gte(0)
    },
    {
      id: 'starterArmor',
      label: 'Starter Armor',
      description: "How much armor does the character start with.",
      specs: Specs.Int,
      optional: true,
      default: 2,
      validator: Specs.Int.validators.gt(0)
    },
    {
      id: 'starterHandSize',
      label: 'Starter Hand Size',
      description: "How many cards can the character hold in hand by default.",
      specs: Specs.Int,
      optional: true,
      default: 5,
      validator: Specs.Int.validators.gt(0)
    },
    {
      id: 'starterFollowerSlotCount',
      label: 'Starter Follower Slot Count',
      description: "How many followers can the character manage from the start.",
      specs: Specs.Int,
      optional: true,
      default: 1,
      validator: Specs.Int.validators.gte(0)
    },
    {
      id: 'starterReputation',
      label: 'Starter Reputation',
      description: "[-7,+7]. Starting character reputation (0=neutral).",
      specs: Specs.Int,
      optional: true,
      default: 0,
      validator: (data) => {
        if (data < -7 || data > 7) {
          throw new Error("Invalid reputation value [-7,7]: " + data);
        }
      }
    },
    {
      id: 'dummyPlayerStartingBoons',
      label: 'Dummy Player Starting Boons',
      description: "Boons the dummy player starts with (typically should be N=3 crystals)",
      specs: Specs.CustomSpec(CrusadeStartingBoonsSpec(contextProvider)),
    },
    {
      id: 'startingBoons',
      label: 'Player Starting Boons',
      description: "Additional boons the character starts with (ex: crystals, followers, blessings ...)",
      specs: Specs.CustomSpec(CrusadeStartingBoonsSpec(contextProvider)),
      optional: true
    },
    {
      id: 'roundBoons',
      label: 'Player Round Boons',
      description: "Boons the character receives every round  (ex: crystals, followers, blessings, reputation, movement)",
      specs: Specs.CustomSpec(CrusadeRoundBoonsSpec(contextProvider)),
      optional: true
    }
  ]
})