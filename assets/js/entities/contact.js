ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    var contacts;

    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts"
    });

    Entities.configureStorage(Entities.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: "lastName"
    });

    Entities.configureStorage(Entities.ContactCollection);

    var initializeContacts = function() {
        contacts = new Entities.ContactCollection([
            {
                id: 1,
                firstName: "MªCarmen",
                lastName: "López",
                phoneNumber: "555-653"
            },
            {
                id: 2,
                firstName: "Joaquín",
                lastName: "Tarragó",
                phoneNumber: "555-123"
            },
            {
                id: 3,
                firstName: "Sara",
                lastName: "López",
                phoneNumber: "555-743"
            },
            {
                id: 4,
                firstName: "MªCarmen",
                lastName: "Colás",
                phoneNumber: "555-65333"
            }
        ]);

        contacts.forEach(function(contact) {
            contact.save();
        });

        return contacts;
    };

    var API = {
        getContactEntities: function() {
            var contacts = new Entities.ContactCollection();
            contacts.fetch();

            if (contacts.length == 0) {
                return initializeContacts();
            }

            return contacts;
        },

        getContactEntity: function(id) {
            var contact = new Entities.Contact({id: id});
            contact.fetch();

            return contact;
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function() {
       return API.getContactEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function(id) {
        return API.getContactEntity(id);
    });
});