import FroshPlatformAvatarGravatarService from '../service/gravatar.service';

const { Application } = Shopware;

Application.addServiceProvider('FroshPlatformAvatarGravatarService', () => {
    const init = Application.getContainer('init');

    return new FroshPlatformAvatarGravatarService(init.httpClient);
});
