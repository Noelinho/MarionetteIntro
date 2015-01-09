ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
    var findStorageKey = function(entity) {
        if (entity.urlRootLocal) {
            return _.result(entity, 'urlRootLocal');
        }

        if (entity.urlLocal) {
            return _.result(entity, 'urlLocal');
        }

        if (entity.collection && entity.collection.urlLocal) {
            return _.result(entity.collection, 'urlLocal');
        }

        throw Error("Unable to determine storage key");
    };

    var StorageMixin = function (entityPrototype) {
        var storageKey = findStorageKey(entityPrototype);
        return {localStorage: new Backbone.LocalStorage(storageKey)};
    };

    Entities.configureStorage = function (entity) {
        _.extend(entity, new StorageMixin(entity.prototype));
    };
});