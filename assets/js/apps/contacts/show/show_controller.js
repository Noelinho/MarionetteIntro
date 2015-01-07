ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function(id) {
            var contact = ContactManager.request('contact:entity', id);

            var showViewContact = new Show.Contact({model:contact});

            if (contact === undefined) {
                showViewContact = new Show.MissingContact();
            }

            ContactManager.mainRegion.show(showViewContact);
        }
    }
});