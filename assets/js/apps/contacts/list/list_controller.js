ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function() {
            var loaingView = new ContactManager.Common.Views.Loading(
                {
                    title: "Contactos",
                    message: "Cargando contactos"
                }
            );
            ContactManager.mainRegion.show(loaingView);

            var fetchingContacts = ContactManager.request('contact:entities');

            $.when(fetchingContacts).done(function(contacts){
                var contactsListView = new List.Contacts({collection: contacts});

                contactsListView.on('childview:contact:delete', function(childview, model) {
                    model.destroy();
                });

                contactsListView.on('childview:contact:show', function(childview, model) {
                    ContactManager.trigger('contact:show', model.get('id'));
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }

});