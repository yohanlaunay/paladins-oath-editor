import { EnemyElusiveSpec } from './EnemyElusiveSpec';
import { EnemyAttackSpec } from './EnemyAttackSpec';
import { EnemyTileSpec } from './EnemyTileSpec';
import { GameValues } from '../GameValues';
import { Specs } from '../Specs';

export const EnemyModSpecId = "EnemyModSpec";

export const EnemyModSpec = (contextProvider) => ({
  id: EnemyModSpecId,
  title: 'Enemy Information',
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
      description: "Enemy name (not localized)",
      specs: Specs.Words()
    },
    {
      id: 'numInstancesInDeck',
      label: 'Num Instances in Deck',
      description: "If > 0, the enemy will be added to draw piles.",
      specs: Specs.Int,
      validator: Specs.Int.validators.gte(0),
      default: 1,
      optional: true
    },
    {
      id: 'enemyType',
      label: 'Enemy Type',
      specs: Specs.GameValue(GameValues.EnemyType)
    },
    {
      id: 'armor',
      label: 'Armor',
      specs: Specs.Int,
      validator: Specs.Int.validators.gt(0),
      optional: true,
      default: 1
    },
    {
      id: 'isElusive',
      label: 'Is Elusive',
      specs: Specs.Bool,
      optional: true,
      default: false
    },
    {
      id: 'elusiveData',
      label: 'Elusive Data',
      specs: Specs.CustomSpec(EnemyElusiveSpec(contextProvider)),
      optional: true,
      renderConfig: {
        renderConditions: [
          ['disableIf', (data) => {
            return !data || data.isElusive === null || data.isElusive === undefined || data.isElusive === false
          }]
        ]
      }
    },
    {
      id: 'fortification',
      label: 'Fortification',
      specs: Specs.GameValue(GameValues.Fortification),
      optional: true,
      default: GameValues.Fortification.NotFortified.value
    },
    {
      id: 'xpGain',
      label: 'XP Gain',
      description: "How much XP gained when defeating the enemy in battle.",
      specs: Specs.Int,
      validator: Specs.Int.validators.gte(0),
      optional: true,
      default: 0
    },
    {
      id: 'reputationGain',
      label: 'Reputation Gain',
      description: "How much reputation gained when defeating the enemy in battle.",
      specs: Specs.Int,
      validator: Specs.Int.validators.gte(0),
      optional: true,
      default: 0
    },
    {
      id: 'reputationGainBonusWhenRampaging',
      label: 'Reputation Gain Bonus when Rampaging',
      description: "How much additional reputation gained when defeating the enemy in battle when it is rampaging.",
      specs: Specs.Int,
      validator: Specs.Int.validators.gte(0),
      optional: true,
      default: 1
    },
    {
      id: 'challengeRating',
      label: 'Challenge Rating',
      description: "How difficult is the enemy. Used for balancing when drawing randomly and for generating Battle Tale. Check the Wiki for example ratings.",
      specs: Specs.OneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      optional: true,
      default: 1
    },
    {
      id: 'attacks',
      label: 'Attacks',
      description: "Can be empty if 'summoningAttacks' as at least one value.",
      specs: Specs.CustomSpecList(EnemyAttackSpec(contextProvider), { minCount: 1 }),
      optional: true
    },
    {
      id: 'summoningAttacks',
      label: 'Summoning Attacks',
      description: "Type of enemy summoned by this attack. Can be empty if 'attacks' has at least one value.",
      specs: Specs.GameValueList(GameValues.EnemyType, { allowDuplicates: true }),
      optional: true
    },
    {
      id: 'immunities',
      label: 'Immunities',
      description: "List of immunity values.",
      specs: Specs.GameValueList(GameValues.Immunity),
      optional: true
    },
    {
      id: 'resistances',
      label: 'Resistances',
      description: "List of elements the enemy is resistant to.",
      specs: Specs.GameValueList(GameValues.Element),
      optional: true
    },
    {
      id: 'portraitSprite',
      label: 'Portrait Sprite',
      description: "name of local file (local to the mod enemy folder). PNG, 256x256. Shown in battle and location enemy lists.",
      specs: Specs.Image({ width: 256, height: 256 }),
      links: [
        { label: 'Sample', url: 'samples/enemy/portraitSprite.png' }
      ],
    },
    {
      id: 'fullBodySprite',
      label: 'Full Body Sprite',
      description: "name of local file (local to the mod enemy folder). PNG, 512x512, Outline (10px; 0,0,0). Shown in battle.",
      specs: Specs.Image({ width: 512, height: 512 }),
      links: [
        { label: 'Sample', url: 'samples/enemy/fullBodySprite.png' }
      ],
    },
    {
      id: 'fullBodyOutlineSprite',
      label: 'Full Body Outline Sprite',
      description: "name of local file (local to the mod enemy folder). PNG, White, 512x512. Shown in battle.",
      specs: Specs.Image({ width: 512, height: 512 }),
      links: [
        { label: 'Sample', url: 'samples/enemy/fullBodyOutlineSprite.png' }
      ],
    },
    {
      id: 'tileData',
      label: 'Tile Data',
      description: "Info to represent the enemy on the map.",
      specs: Specs.CustomSpec(EnemyTileSpec(contextProvider))
    }
  ],
  validator: (data) => {
    if (!!data.isElusive && !data.elusiveData) {
      throw new Error('Elusive data should be provided');
    }
    if ((data.attacks || []).length === 0 && (data.summoningAttacks || []).length === 0) {
      throw new Error('Missing attack or summoning attack data');
    }
    if ((data.attacks || []).length !== 0 && (data.summoningAttacks || []).length !== 0) {
      throw new Error('Choose attack OR summoning attack, not both');
    }
  }
})
