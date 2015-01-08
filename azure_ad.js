Accounts.oauth.registerService('azureAd');

if (Meteor.isClient) {
    Meteor.loginWithAzureAd = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        AzureAd.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    var fieldsForLoggedInusers = _.map(
        AzureAd.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
        function (subfield) { return 'services.azureAd.' + subfield; }
    );
    var fieldsForOtherUsers = _.map(
        // even with autopublish, no legitimate web app should be
        // publishing all users' emails
        _.without(AzureAd.whitelistedFields, 'mail', 'userPrincipleName'),
        function (subfield) { return 'services.azureAd.' + subfield; }
    );

    Accounts.addAutopublishFields({
        forLoggedInUser: fieldsForLoggedInusers,
        forOtherUsers: fieldsForOtherUsers
    });
}
