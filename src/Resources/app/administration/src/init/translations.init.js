import froshAvatarMediaGravatarFormSnippets from '../app/components/frosh-avatar-media-gravatar-form/snippets';

import swMediaUploadSnippets from '../module/extension/sw-media-upload/snippets';

const { Locale } = Shopware;
const snippetBlocks = [
    froshAvatarMediaGravatarFormSnippets,
    swMediaUploadSnippets,
];

for (const snippetBlock of snippetBlocks) {
    for (const [lang, snippets] of Object.entries(snippetBlock)) {
        Locale.extend(lang, snippets);
    }
}
