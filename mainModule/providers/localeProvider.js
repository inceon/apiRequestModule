proxyMed
    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'js/locales/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ua');
        $translateProvider.useSanitizeValueStrategy(null);
    });