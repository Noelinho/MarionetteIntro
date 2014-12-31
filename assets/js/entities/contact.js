ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    var contacts;

    Entities.Contact = Backbone.Model.extend({});

    Entities.ContactCollection = Backbone.Collection.extend({
        model: Entities.Contact,
        comparator: "lastName"
    });

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
    };

    var API = {
        getContactEntities: function() {
            if (contacts === undefined) {
                initializeContacts();
            }

            return contacts;
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function() {
       return API.getContactEntities();
    });
});