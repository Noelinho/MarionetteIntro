ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function(id) {
            var loaingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loaingView);

            var fetchingContact = ContactManager.request('contact:entity', id);

            $.when(fetchingContact).done(function(contact) {
                var showViewContact = new Show.Contact({model:contact});

                if (contact === undefined) {
                    showViewContact = new Show.MissingContact();
                }

                ContactManager.mainRegion.show(showViewContact);
            });
        }
    }
});