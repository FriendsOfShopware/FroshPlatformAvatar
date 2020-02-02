import './frosh-avatar-media-gravatar-form.scss';
import template from './frosh-avatar-media-gravatar-form.html.twig';

const { Component } = Shopware;

/**
 * @status ready
 * @description The <u>frosh-avatar-media-gravatar-form</u> component is used to preview gravatar avatars.
 * @example-type static
 * @component-example
 * <frosh-avatar-media-gravatar-form variant="inline">
 * </frosh-avatar-media-gravatar-form>
 */
Component.register('frosh-avatar-media-gravatar-form', {
    template,

    inject: [
        'FroshPlatformAvatarGravatarService'
    ],

    props: {
        variant: {
            type: String,
            required: true,
            validValues: ['modal', 'inline'],
            validator(value) {
                return ['modal', 'inline'].includes(value);
            },
            default: 'inline'
        },

        email: {
            type: String,
            required: false,
            default: null
        }
    },

    data() {
        return {
            loading: false,
            url: ''
        };
    },

    created() {
        this.loadUrl();
    },

    watch: {
        email() {
            this.loadUrl();
        }
    },

    computed: {
        isValid() {
            return !this.loading && this.url;
        }
    },

    methods: {
        loadUrl() {
            this.loading = true;
            this.FroshPlatformAvatarGravatarService.requestAvatarUrl(this.email, 240)
                .then(url => {
                    this.url = url;
                    this.loading = false;
                });
        },

        emitUrl(originalDomEvent) {
            if (this.isValid) {
                this.$emit('frosh-avatar-media-gravatar-form-submit', {
                    originalDomEvent,
                    url: new URL(this.url),
                    fileExtension: 'jpg'
                });

                if (this.variant === 'modal') {
                    this.closeModal();
                }
            }
        },

        closeModal() {
            this.$emit('modal-close');
        }
    }
});
