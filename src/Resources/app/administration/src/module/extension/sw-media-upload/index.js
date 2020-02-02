import './sw-media-upload.scss';
import template from './sw-media-upload.html.twig';

const { Component, Utils } = Shopware;
const { types } = Utils;
const FROSH_AVATAR_INPUT_TYPE_GRAVATAR_IMPORT = 'frosh-avatar-gravatar-import';

Component.override('sw-media-upload', {
    template,

    computed: {
        isFroshAvatarGravatarImport() {
            return this.inputType === FROSH_AVATAR_INPUT_TYPE_GRAVATAR_IMPORT;
        },

        froshAvatarGravatarEmail() {
            if (this.sourceContext &&
                types.isObject(this.sourceContext) &&
                this.sourceContext.email &&
                types.isString(this.sourceContext.email) &&
                this.sourceContext.email.length) {
                return this.sourceContext.email;
            }

            return null;
        }
    },

    methods: {
        useFroshAvatarGravatarImport() {
            this.inputType = FROSH_AVATAR_INPUT_TYPE_GRAVATAR_IMPORT;
        }
    }
});
