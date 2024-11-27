import { describe, expect, test, assert } from 'vitest';
import { CharacterLevelSpec } from './CharacterLevelSpec';
import { CharacterModSpec } from './CharacterModSpec';
import { CrusadeRoundBoonsSpec } from './CrusadeRoundBoonsSpec';
import { CrusadeStartingBoonsSpec } from './CrusadeStartingBoonsSpec';
import { EnemyAttackSpec } from './EnemyAttackSpec';
import { EnemyElusiveSpec } from './EnemyElusiveSpec';
import { EnemyModSpec } from './EnemyModSpec';
import { EnemyTileSpec } from './EnemyTileSpec';
import { ManaSpec } from './ManaSpec';
import { MapHexSpec } from './MapHexSpec';
import { MapSectionModSpec } from './MapSectionModSpec';
import { ModHeaderSpec } from './ModHeaderSpec';
import { OathModSpec } from './OathModSpec';
import { RewardModSpec } from './RewardModSpec';
import { TerrainMovementCostSpec } from './TerrainMovementCostSpec';
import { TerrainModSpec } from './TerrainModSpec';

const CLASSES_TO_TEST = {
    "CharacterLevelSpec": CharacterLevelSpec,
    "CharacterModSpec": CharacterModSpec,
    "CrusadeRoundBoonsSpec": CrusadeRoundBoonsSpec,
    "CrusadeStartingBoonsSpec": CrusadeStartingBoonsSpec,
    "EnemyAttackSpec": EnemyAttackSpec,
    "EnemyElusiveSpec": EnemyElusiveSpec,
    "EnemyModSpec": EnemyModSpec,
    "EnemyTileSpec": EnemyTileSpec,
    "ManaSpec": ManaSpec,
    "MapHexSpec": MapHexSpec,
    "MapSectionModSpec": MapSectionModSpec,
    'ModHeaderSpec': ModHeaderSpec,
    "OathModSpec": OathModSpec,
    "RewardSpec": RewardModSpec,
    "TerrainMovementCostSpec": TerrainMovementCostSpec,
    "TerrainSpec": TerrainModSpec
};

const VALID_PROPERTIES = ['id', 'label', 'description', 'summary', 'validator', 'specs', 'optional', 'default', 'renderConfig', 'links', 'illustration'];

Object.keys(CLASSES_TO_TEST).forEach(className => {
    let classToTest = CLASSES_TO_TEST[className];
    if (className !== 'ModHeaderSpec') {
        // Provide context provider to all classes except ModHeaderSpec which exists *before* ModDescriptor
        classToTest = classToTest({
            getModDescriptor: () => null // no mod
        });
    }
    describe("" + className, () => {
        expect(classToTest.id).toBeDefined();
        expect(classToTest.title).toBeDefined();
        if (!!classToTest.description) {
            expect(classToTest.description.length).toBeGreaterThan(0);
        }
        classToTest.properties.forEach(prop => {
            test("Property#" + prop.id, () => {
                expect(prop.id).toBeDefined();
                expect(prop.label).toBeDefined();
                expect(prop.specs).toBeDefined();
                expect(prop.specs.parseJson).toBeDefined();
                expect(prop.specs.validator).toBeDefined();
                expect(prop.specs.render).toBeDefined();
            });
            test("Additional Properties", () => {
                Object.keys(prop).forEach(k => {
                    assert(VALID_PROPERTIES.includes(k), 'Invalid property "' + k + '"');
                })
            });
        });
    });
});
