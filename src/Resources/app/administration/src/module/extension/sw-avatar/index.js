const { Component, Utils } = Shopware;
const { types } = Utils;

Component.override('sw-avatar', {
    inject: [
        'FroshPlatformAvatarGravatarService',
    ],

    data() {
        return {
            froshAvatarGravatarImage: null
        }
    },

    watch: {
        sourceContext() {
            this.froshAvatarGravatarImage = null;
            this.loadFroshAvatarGravatar();
        }
    },

    computed: {
        avatarImage() {
            const imageUrl = this.$super('avatarImage');

            if (imageUrl) {
                return imageUrl;
            }

            if (!this.froshAvatarGravatarImage || !this.froshAvatarGravatarImage.length) {
                return null;
            }

            return {
                'background-image': `url('${this.froshAvatarGravatarImage}')`
            };
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.loadFroshAvatarGravatar();
        });
    },

    methods: {
        loadFroshAvatarGravatar() {
            if (!this.sourceContext ||
                !types.isObject(this.sourceContext) ||
                !this.sourceContext.email ||
                !types.isString(this.sourceContext.email) ||
                !this.sourceContext.email.length) {
                return Promise.reject(null);
            }

            const email = this.sourceContext.email;
            const size = (this.size || '80');
            let imageSize = Number(size.replace(/\D/g, ''));

            if (size.indexOf('%') > -1) {
                imageSize *= 20.48;
            }

            return this.FroshPlatformAvatarGravatarService
                .requestAvatarUrl(email, Math.floor(imageSize))
                .then(url => {
                    this.froshAvatarGravatarImage = url;
                    return url;
                });
        }
    }
});
