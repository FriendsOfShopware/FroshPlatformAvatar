import froshAvatarMediaGravatarFormSnippets from '../app/components/frosh-avatar-media-gravatar-form/snippets';

const { Locale } = Shopware;
const snippetBlocks = [
    froshAvatarMediaGravatarFormSnippets,
];

for (const snippetBlock of snippetBlocks) {
    for (const [lang, snippets] of Object.entries(snippetBlock)) {
        Locale.extend(lang, snippets);
    }
}
