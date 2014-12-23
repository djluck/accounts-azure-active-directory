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
    Accounts.addAutopublishFields({
        forLoggedInUser: _.map(
            // publish access token since it can be used from the client (if
            // transmitted over ssl or on
            // localhost). https://developers.google.com/accounts/docs/OAuth2UserAgent
            // refresh token probably shouldn't be sent down.
            AzureAd.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
            function (subfield) { return 'services.azuread.' + subfield; }),

        forOtherUsers: _.map(
            // even with autopublish, no legitimate web app should be
            // publishing all users' emails
            _.without(AzureAd.whitelistedFields, 'mail', 'userPrincipleName'),
            function (subfield) { return 'services.azuread.' + subfield; })
    });
}
