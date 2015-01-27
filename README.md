#Accounts-Azure-Active-Directory
Adds single sign-on integration with Azure Active Directory for [Meteor](https://www.meteor.com/).

What will this package allow me to do?
-------------------------------------
This package was written to allow the development of  meteor apps for the (windows) enterprise world. It seems to me that a large barrier to corporate acceptance of meteor having to remember a million different sets of credentials. This package allows users to authenticate using their Active Directory credentials.

What's Azure Active Directory?
-----------------------------
Essentially it's Active Directory in the cloud. You can ask your Ops/Systems team to create a mirror image of your enterprise installation or sign up for a free account and add your users manually.

Configuration
-------------
Please refer to the [wiki documentation](https://github.com/djluck/accounts-azure-active-directory/wiki/Getting-accounts-azure-active-directory-up-and-running) for a guide to configuring this package.

Adding email addresses to accounts
----------------------------------
When a user authenticates for the first time using the azure-active-directory flow, their email address is captured and passed to the Accounts.onCreateUser(). By adding the following code to your application, you can store the email addresses of each user:

    Accounts.onCreateUser(function(options, user) {
      //This is the default implementation of onCreateUser(). Retain this as it is used to copy a user's name, etc.
      if (options.profile)
        user.profile = options.profile;

      //Copy the .emails option as well.
      if (options.emails)
        user.emails = options.emails;

      return user;
    });