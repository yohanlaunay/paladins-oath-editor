import { FindEnumByValue, GameValues } from '../GameValues';
import { Specs } from '../Specs';

export const ManaSpecId = "ManaSpec";

export const ManaSpec = (contextProvider) => ({
  id: ManaSpecId,
  title: 'Mana',
  summary: (data) => {
    data = data || {};
    return '' + (!!data.color ? FindEnumByValue(GameValues.ManaColor, data.color).name : 'Missing Color') + ' '
      + (Number.isInteger(data.form) ? FindEnumByValue(GameValues.ManaForm, data.form).name : 'Missing Form');
  },
  properties: [
    {
      id: 'color',
      label: 'Color',
      specs: Specs.GameValue(GameValues.ManaColor)
    },
    {
      id: 'form',
      label: 'Form',
      specs: Specs.GameValue(GameValues.ManaForm),
      default: GameValues.ManaForm.Crystal.value
    },
  ]
})
