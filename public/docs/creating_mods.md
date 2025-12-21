The game as of version '''1.6.0''' supports adding game content in the form of dynamically loaded modules (''mods'').

Mods are '''simple to write''' with no coding required. You only need a '''file editor''' that can edit JSON files and a basic '''images editor''' or you can use the '''[https://yohanlaunay.github.io/paladins-oath-editor/ web-based Mod Creation tool]''' instead.

Before writing your first mod you should head to [https://steamcommunity.com/workshop/workshoplegalagreement/ '''this Steam page'''] to read and accept the steam agreement to publish mods to the Steam workshop, otherwise you will not be able to publish mods. You can still download mods without this though just not create & publish mods. 

Published Mods can be downloaded from within the game in the ''Options > Game Mods'' screen. 

'''Disclaimer: Any mod infringing on copyright will be immediately taken down and the user might be banned for submitting the mod too. So please be considerate and only submit original content.'''

Mods are folders containing json and image files describing the new game content. The mods under '''development''' should be placed in the ''mods'' folder at the same location where the ''saves'' folder is. The mods downloaded via the game "Game Mods" settings page are placed in the Steam workshop location (depending on your steam install).

The game automatically loads every mods in both mods folders '''when the game starts'''. The game will attempt to fully load a mod before registering its data into the game. If the mod cannot be fully loaded, it will log all loading errors if you want to debug them or feedback to the mod author and the mod content will not be added to the game.

'''Important:''' It's important to note that if you have broken mods that used to work before and later on you remove or corrupt/change the mod content, then any save file relying on that modded content might become corrupted too. For example if you have a mod adding a new enemy to the game, start a battle with that enemy. Remove the mod and reload the game, then your save file will be corrupted and unusable since that enemy no-longer exists and the game can't find the reference to that enemy.

If you want to '''create your own mod''', first [https://drive.google.com/file/d/1S2IBRbREIm3BiKUpSoEfqMukzaOtZurZ/view?usp=sharing '''download this zip file'''] that contains multiple sample mods. You will find a ''mod.json'' file at the root of each mod folder that describes what the mod does, some versioning and author information and more importantly a '''mod GUID''' (Globally Unique Identifier). Each mod '''MUST''' have a unique ID compared to other mods. The game '''will not enforce ID uniqueness for mods''' so it is recommended to choose an ID that other mod authors will not choose like your own domain name if you have one. For the sample mods I use ''com.firebiscuit'' as a prefix to all my mod Ids.

'''December 1st, 2024 Update:''' You can now use the [https://yohanlaunay.github.io/paladins-oath-editor/ '''web-based Mod creation'''] tool instead of fiddling with mod files and folders by hand. It doesn't yet support scripted mods but other kind of static content it will help you create zipped mods that are compatible with the game.

To create your own mod, first '''create a new folder''' in the game's ''mods'' folder (folder name can be anything and is not used by the game):

'''Windows:''' %USERPROFILE%/AppData/LocalLow/Fire Biscuit Games/Paladin Oath/mods

'''Mac:''' ~/Library/Application Support/com.FireBiscuitGames.PaladinOath/mods

'''Linux:''' ~/.config/unity3d/Fire Biscuit Games/Paladin Oath/mods

You will need to create a ''mod.json'' file at the root of this folder that contains the list of modules to load (ex: ''enemyMods''). Each module must have a folder with the same name as the module id listed there. At the root of each module folder there must be a ''mod.json'' file whose data format matches with the type of module it is (ex: an enemy module will describe enemy data). You can refer to the sample mods for examples.

All JSON files in the sample mods have additional comments in them that explains what each field does. If you need values (for example for Fortification or Attack Types), refer to [[Mods values|this list of mods values]]. If you need IDs from existing game entities, find the entity in this wiki and look for their corresponding ''Mods GUID'' (ex: followers, cards, elements, enemies, locations, etc).

You will also need a ''mod_preview.jpg'' file that will be shown in the Steam workshop.

'''Validating the content'''

You will NEED to validate the game data files before you can distribute them. Just to be sure that the JSON that you wrote is usable by the game. You can use the free online tool called [https://jsonlint.com/ JSONlint]. Copy the content of the file to the site, click the "Validate" button and check the errors that it generates. Copy-paste and try again. When [https://jsonlint.com/ JSONlint] is all green, you can add the file to the game. You can also use Notepad++ free text editor.

'''Testing the mod'''

As long as the mod is properly validated (JSON is correct and all references in the mod can map to existing in-game resources), then the game will automatically load the mod from the ''mods'' folder '''when it starts'''. 

You should check the game logs to make sure the mod was properly loaded you can check the game logs (see [[Game File Locations|File Locations]]) and fix any loading error that you see. You can search the logs for your mod Id to identify any errors or info messages pertaining to your mod.

Once the game is started (and the mod properly loaded), the new content should show up in the game: new map sections, new enemies in the codex, new characters in the crusade character selection screen, etc.

'''Submitting the mod'''

When you are ready to upload the mod to Steam or update an existing mod, go to the game ''Options > Game Mods'' settings screen and select the ''Developer'' view. The top part of the view represents all the developer mods in the ''mods'' folder. The bottom part represents all the mods that you published to the Steam workshop folder. 

'''Important:''' Only validated mods (mods that the game was able to load) appear in this screen. If your mod doesn't show up it means the game was not able to load it and you should check the game logs for the reason why (see ''Testing the mod'' above)

If it's your first time submitting this mod on steam you should take the local mod and click the ''Register'' button. This will create a new Steam Workshop item and upload the content of the local folder to Steam. The list will refresh and the mod should now appear under the list of Steam mods below. Note that the mod will still appear in the list of local mods unless you delete the local folder manually. The new mod should be downloadable by the public within 15 - 30 mins.

If you have already submitted this mod on steam you should use the steam version of that mod at the bottom of the list and click on the ''Update'' button. You will be asked to pick a local mod folder to upload  to Steam and a changelog to indicate to the public which version is. This will override the existing mod content with the new mod content. The updated content will be available on Steam within 15 - 30 mins.

If you encounter any issue while submitting the mod, due to limitations with the Steam Workshop library used by the game, the settings screen cannot show the exact reasons for the issues. Please consult the Steam logs: https://help.steampowered.com/en/faqs/view/68D2-35AB-09A9-7678#log for more details.
