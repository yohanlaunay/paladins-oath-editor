import { Specs } from '../Specs';

export const EnemyElusiveSpecId = 'EnemyElusiveSpec';

export const EnemyElusiveSpec = (contextProvider) => ({
  id: EnemyElusiveSpecId,
  title: 'Elusive Information',
  summary: (data) => {
    data = data || {};
    return 'Armor ' + data.armorIfBlocked;
  },
  properties: [
    {
      id: 'armorIfBlocked',
      label: 'Armor if Blocked',
      description: 'Enemy armor will be set to this after the enemy is blocked',
      specs: Specs.Int,
      validator: Specs.Int.validators.gt(0)
    }
  ]
})
