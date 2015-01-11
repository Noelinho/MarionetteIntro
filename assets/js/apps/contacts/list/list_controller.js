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

                contactsListView.on('childview:contact:edit', function(childview, model) {
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model,
                        asModal: true
                    });

                    view.on('form:submit', function(data) {
                        if (model.save(data)) {
                            childview.render();
                            ContactManager.dialogRegion.empty();
                            childview.flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }

                    });

                    ContactManager.dialogRegion.show(view);
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }

});