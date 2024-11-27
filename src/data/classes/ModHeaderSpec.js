import { Specs } from '../Specs';

export const ModHeaderSpecId = "ModHeaderSpec";

// cannot pass contextProperties here since ModDescriptor doesn't exist yet.
export const ModHeaderSpec = {
  id: ModHeaderSpecId,
  title: 'New Mod Information',
  summary: (data) => null,
  properties: [
    {
      id: 'guid',
      label: 'GUID',
      description: 'Must be universally unique across all mods. Use your own name or domain name like com.firebiscuit.$modName',
      specs: Specs.GUID()
    },
    {
      id: 'name',
      label: 'Name',
      description: 'Name displayed in the list of Mods',
      specs: Specs.Words()
    },
    {
      id: 'description',
      label: 'Description',
      description: 'Description displayed in the list of Mods',
      specs: Specs.Sentences()
    },
    {
      id: 'author',
      label: 'Author',
      description: 'Author(s) displayed in the list of Mods',
      specs: Specs.Sentences()
    },
    {
      id: 'version',
      label: 'Version',
      description: 'Should be changed each time a new version of the mod is published. This will help with compatibility checks.',
      specs: Specs.String(/^(\d+\.)?(\d+\.)?(\*|\d+)$/, 'X or X.Y or X.Y.Z')
    },
    {
      id: 'mod_preview',
      label: 'Mod Image',
      description: 'Preview image to be shown in the list of mods',
      specs: Specs.Image({ width: 256, height: 256, ext: 'jpg' }),
      links: [
        { label: 'Sample', url: 'samples/header/mod_preview.jpg' },
        { label: 'PaintDotNet Sample', url: 'samples/header/mod_preview.pdn' },
        { label: 'PaintDotNet Download', url: 'https://www.getpaint.net/' },
      ],
    },
  ]
}
