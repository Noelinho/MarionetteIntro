ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    var contacts;

    Entities.Contact = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage("contacts"),
        validate: function(attrs, options) {
            var errors = {};
            if (!attrs.firstName) {
                errors.firstName = "Es obligatorio tener nombre";
            }

            if (!attrs.lastName) {
                errors.lastName = "Es obligatorio tener apellidos";
            } else {
                if (attrs.lastName.length < 2) {
                    errors.lastName = "Apellido demasiado corto";
                }
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }

        }
    });

    //Entities.configureStorage(Entities.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("contacts"),
        model: Entities.Contact,
        comparator: "lastName"
    });

    //Entities.configureStorage(Entities.ContactCollection);

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

        return contacts.models;
    };

    var API = {
        getContactEntities: function() {
            var contacts = new Entities.ContactCollection();
            var defer = $.Deferred();

            setTimeout(function() {
                contacts.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    }
                })
            },2000);

            var promise = defer.promise();

            $.when(promise).done(function(contacts) {
                if (contacts.length == 0) {
                    var models = initializeContacts();
                    contacts.reset(models);
                }
            });

            return promise;
        },

        getContactEntity: function(id) {
            var contact = new Entities.Contact({id: id});
            var defer = $.Deferred();

            setTimeout(function() {
                contact.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    },
                    error: function(data) {
                        defer.resolve(undefined);
                    }
                });
            }, 2000);


            return defer.promise();
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function() {
       return API.getContactEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function(id) {
        return API.getContactEntity(id);
    });
});