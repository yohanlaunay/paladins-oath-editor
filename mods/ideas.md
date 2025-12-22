# Scenario Extension Ideas

Here are 10 ideas for interesting scenario extensions, leveraging the Paladin's Oath modding capabilities:

1.  **Vampiric Thirst:** At the start of each turn, the player gains a "Wound" card. However, for each enemy defeated in the previous turn, the player can heal one wound from their hand or discard pile at the end of the turn. This encourages aggressive play to manage the constant damage.

2.  **Dynamic Bounties:** At the start of each round, a random revealed enemy on the map is marked as a "Bounty." Defeating this specific enemy before the round ends grants the player bonus XP and Reputation. This would create shifting priorities each round.

3.  **The Wandering Merchant:** A special merchant appears at a random village at the start of the game. At the end of each round, the merchant moves to an adjacent village. The merchant could offer rare cards, followers, or blessings not found in the standard markets.

4.  **Seasonal Cycles:** The game cycles through "Summer" and "Winter" each round. During Summer, movement is easier (e.g., plains and forests cost 1 less movement point). During Winter, movement is harder (e.g., all terrain costs 1 extra movement point), and ending your turn outside of a fortified location or village gives you a Wound card from the cold.

5.  **Mana Overload:** At the end of a player's turn, for every two unspent mana crystals in their inventory, they receive a "Wound" card, representing magical feedback. This forces players to use their resources efficiently and prevents hoarding.

6.  **Living Dungeons:** Any dungeon that is not conquered by the end of the round gets stronger. A random, unrevealed enemy inside it is revealed and adds to its defenders for the next round. This creates a "ticking clock" and a sense of urgency.

7.  **Oath Quests:** When the scenario starts, the player receives a specific side quest based on their chosen Oath. For example, an "Oath of Conquest" player might be tasked with defeating 3 rampaging enemies, while an "Oath of Devotion" player might need to visit all Temples on the map. Completing the quest would grant a unique, powerful reward.

8.  **Unstable Magic:** Every time a player casts a Spell, there is a small chance of a "wild magic" surge. This could have a random positive or negative effect, such as drawing an extra card, spawning a weak monster on a nearby tile, or gaining a random mana token.

9.  **Follower Uprisings:** If a player has a follower with maximum wounds at the end of a round, the follower "deserts" and is returned to the market. This makes protecting your followers more critical.

10. **Corrupted Lands:** A specific terrain type (e.g., Wasteland) becomes "Corrupted." Ending your turn on a Corrupted hex gives the player a Wound card. At the end of each round, the corruption spreads to one adjacent, non-city hex, slowly consuming the map.

## More Scenario Extension Ideas

11. **Challenging Terrain:** Certain terrain types (e.g., mountains, forests) gain additional negative effects during specific times (Day/Night). For example, moving onto mountains at night deals a wound, or forest hexes make enemies harder to hit.

12. **Dynamic Market Fluctuations:** At the start of each round, the availability or cost of specific card types or followers in the market change randomly, encouraging adaptive strategies.

13. **Enemy Reinforcements:** After a certain number of enemies are defeated in a round, more enemies (of a specific type or random) spawn at a designated location on the map, scaling the difficulty.

14. **"Curse of the X":** At the start of the game, the player receives a random, permanent "curse" (e.g., "-1 Hand Size", "Gain 1 Wound at the start of each round", "Cannot use Red Mana") that alters gameplay for the entire crusade.

15. **Mysterious Artifacts:** New "artifact" locations periodically appear on the map. Interacting with them grants a powerful but temporary buff, or triggers a negative event (e.g., spawn an enemy, inflict a wound).

16. **Player Factions/Alliances:** Players can gain "reputation" with different factions. Reaching certain thresholds unlocks unique market items, blessings, or special events tied to that faction.

17. **Environmental Hazards:** Specific hexes can become temporary or permanent hazards (e.g., "quicksand" forcing a discard, "storm" inflicting damage) until a specific condition is met.

18. **Timed Objectives:** At the start of the game or a round, the player receives a specific objective (e.g., "Conquer 2 Citadels within 3 rounds"). Successful completion grants a reward; failure incurs a penalty.

19. **Enemy Patrols:** Instead of static enemies, certain enemies gain simple patrol routes or "wander" a few hexes each turn, making the map feel more dynamic and unpredictable.

20. **Blessing/Curse of the Day/Night:** Effects that trigger specifically during Day or Night. For instance, all Fire attacks gain +1 during the Day, and all Frost attacks gain +1 during the Night, encouraging players to adapt to the time of day.
21. **Adaptive Difficulty:** The game's difficulty dynamically adjusts based on player performance (e.g., if the player is dominating, spawn stronger enemies or add more wounds; if struggling, offer minor buffs or fewer enemies). Requires tracking player stats (`ModState`).
22. **Resource Scramble:** Certain resources (e.g., specific mana colors, gold) become extremely scarce or abundant for a few rounds, forcing players to adapt their strategies.
23. **Guardian's Favor/Wrath:** Performing specific actions (e.g., conquering a city, clearing a dungeon) earns "favor" or "wrath" points. High favor grants buffs, high wrath incurs penalties. Tracked in `ModState`.
24. **Persistent Scars:** Instead of simply wounds, some particularly bad events could apply permanent debuffs (tracked in `ModState`) that last for the entire crusade, representing lasting injuries.
25. **Dynamic Weather System:** Beyond Day/Night, implement random weather events (rain, fog, heatwave). Each event could have specific map-wide effects (e.g., reduced movement, increased damage from certain elements). Tracked in `ModState`.
26. **"Lost and Found" Locations:** Hidden locations that appear only once per game. Interacting with them could lead to powerful unique cards or artifacts, but also risks of traps or strong enemies.
27. **Prophecy & Forewarning:** At the start of a round, reveal a hint about a powerful enemy or a valuable reward that will appear in a future round, allowing players to prepare.
28. **Enemy Mutations:** Defeated enemies (`OnBattleEnds`) have a small chance to mutate. The next time that *type* of enemy spawns, it has a bonus stat (e.g., +1 Armor, an additional attack). Tracked in `ModState` for enemy types.
29. **Player "Class" Abilities:** At the start of the game, players choose a "class" (e.g., Warrior, Mage, Rogue). Each class grants a unique passive ability (e.g., +1 Attack, free card draw once per round) or an activated ability on a cooldown. Tracked in `ModState`.
30. **Global Events:** Infrequent, major events that affect all players and the entire map (e.g., "Mana Storm" - all mana costs increased/decreased; "Plague" - all followers take damage). Triggered by `OnRoundStarts` with low probability.
31. **Trade Routes:** Introduce a mechanic where conquering specific linked locations (e.g., two villages) creates a "trade route," granting a small gold bonus each round. Tracked in `ModState`.
32. **Environmental Reclamation:** Some terrain types that were previously corrupted (e.g., Swamps from "Corrupted Lands" mod) have a small chance to revert to their original state each round, making the map dynamic.
33. **Unique Enemy Weaknesses/Strengths:** Randomly assign a weakness or strength to a specific enemy type for the duration of the crusade (e.g., "All Vermlings are weak to Fire"). Tracked in `ModState`.
34. **Blessing Redistribution:** At the end of each round, unassigned blessings from the market are randomly assigned to player followers (if any are available and not full).
35. **Player Debts:** Taking certain powerful actions (e.g., a huge loan of gold from a mysterious entity) incurs a "debt" (tracked in `ModState`). If not paid by a certain round, severe penalties apply.
36. **Seasonal Market (Advanced):** The market changes its offerings significantly depending on the "season" (Day/Night, or custom seasons tracked in `ModState`). Different card types or followers are more common.
37. **Dynamic Fortifications:** Fortifications on enemy locations change over time. Some might degrade, others might gain strength each round if left unconquered.
38. **"Echoes of the Past" (Lore-driven):** Discovering specific ruins or ancient locations triggers a lore event in the log, possibly with a small stat bonus or a minor challenge (e.g., a weak enemy appears).
39. **Global Mana Pool:** Instead of individual crystals, introduce a shared global mana pool that all players contribute to and draw from, making resource management a cooperative/competitive element.
40. **Heroic Last Stand:** When a player is about to take lethal damage, a special event triggers. They gain a massive temporary buff, allowing for one final, powerful turn before falling. (Requires detecting near-death state).