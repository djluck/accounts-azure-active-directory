Package.describe({
    summary: "Login service for Azure Active Directory",
    version: "0.1.0"
});

Package.onUse(function(api) {
    api.use(['underscore', 'random']);
    api.use('accounts-base', ['client', 'server']);
// Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('azure-active-directory', ['client', 'server']);

    api.addFiles("azure_ad.js");
});
