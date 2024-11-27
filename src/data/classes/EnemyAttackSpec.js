import { FindEnumByValue, GameValues } from '../GameValues';
import { Specs } from '../Specs';

export const EnemyAttackSpecId = "EnemyAttackSpec";

export const EnemyAttackSpec = (contextProvider) => ({
  id: EnemyAttackSpecId,
  title: 'Enemy Attack',
  summary: (data) => {
    data = data || {};
    // don't render attackType, not relevant for enemies.
    return '' + (!!data.element ? FindEnumByValue(GameValues.Element, data.element).name : 'Missing Element') + ' '
      + data.value + ' '
      + (!!data.attackModifiers ? '(' + data.attackModifiers.map(v => FindEnumByValue(GameValues.AttackModifier, v).name).join(',') + ')' : '');
  },
  properties: [
    {
      id: 'element',
      label: 'Attack Element',
      specs: Specs.GameValue(GameValues.Element),
      default: GameValues.Element.element_physical.value
    },
    {
      id: 'attackType',
      label: 'Attack Type',
      specs: Specs.GameValue(GameValues.AttackType),
      default: GameValues.AttackType.Basic.value,
      optional: true,
      renderConfig: {
        renderConditions: [
          ['disableIf', (data) => true] // never render, it's always basic attack.
        ]
      }
    },
    {
      id: 'value',
      label: 'Attack Value',
      specs: Specs.Int,
      validator: Specs.Int.validators.gt(0)
    },
    {
      id: 'attackModifiers',
      label: 'Attack Modifiers',
      specs: Specs.GameValueList(GameValues.AttackModifier),
      validator: (data) => {
        const validator = Specs.Int.validators.gt(0);
        for (const val of data) {
          validator(val);
        }
      },
      optional: true,
    },
  ]
})
