By default the game launches in '''Fullscreen''' and expects a resolution of '''1920x1080'''. If this doesn't fit your laptop screen or desktop monitor, you can try one of the options below:

=== '''Option 1: Change the Graphics options in-game''' ===
This is the preferred and easiest way and if you have access to the menu and all the buttons you should use this option.

In ''Main Menu > Options > Graphics Options'' select the resolution and full screen mode that suits you best, then click Apply.

=== '''Option 2: Use launch parameters''' ===
If the launch resolution overflows your monitor, then you can try re-installing the game and after re-install launching it with additional resolution parameters. On Steam select "Browse Local Files" (right click on game name, in the tiny menu). and launch the game with the following parameters:
<blockquote>-screen-fullscreen 1 -screen-width 1920 -screen-height 1080</blockquote>

You can set the width/height to something else as long as the ratio is 1.7 and above. For example a width of 1366 and height of 768. '''You only need to do this once so can access then save those graphic options in the game settings afterwards.'''

=== '''Option 3: Edit the game options outside the game''' ===
If the other options do not work, you can tweak the graphics settings outside of the game, ''make sure to close the game first''.

====== Windows ======
Edit game settings with regedit, path<blockquote>Option 1:
HKEY_CURRENT_USER\SOFTWARE\Unity\UnityEditor\Fire Biscuit Games\Paladin Oath
Option 2:</blockquote><blockquote>HKEY_CURRENT_USER\SOFTWARE\Fire Biscuit Games\Paladin Oath</blockquote>

====== Mac ======
Edit the game settings in this plist file:<blockquote>~/Library/Preferences/com.FireBiscuit.PaladinOath.plist (or similar)</blockquote>

====== Linux ======
Edit the game settings in this xml file:<blockquote>~/.config/unity3d/Fire Biscuit Games/Paladin Oath/prefs</blockquote>

====== Keys ======
Edit the following Keys (there might be some extra digits at the end of the key):

* '''game.settings.resolution.fullscreen''' set value 0
* '''game.settings.resolution.width''' set value that you want (ex: 1366 or 1920)
* '''game.settings.resolution.height''' set value that you want (ex: 768 or 1080)

'''Save''' after making the changes and '''restart''' the game.

=== Widescreen & Odd resolutions support ===
After launching the game, you can also enable support for widescreen and odd resolutions in the ''Main Menu > Options > Graphics Options''. This will allow the game UI to stretch to the full width of your monitor. The height should be at least '''1080''' or the ratio width/height should be at least '''1.7''' or some UI elements will be hidden or partially covered.

=== Windowed Mode Resolutions ===
You can enable '''Windowed''' mode in the  ''Main Menu > Options > Graphics Options''. After that you can set any of the pre-set resolutions from the Graphics resolutions list to adjust the content inside the window.
