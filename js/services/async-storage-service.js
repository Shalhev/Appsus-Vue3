export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    save,
    makeId,
    unshift
}

// gets all the items
function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities);
}

//get an item by id
function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity.id === entityId))
}

//create new item
function post(entityType, newEntity) {
    newEntity.id = makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity);
            save(entityType, entities)
            return newEntity;
        })
}

function unshift(entityType, newEntity) {
    newEntity.id = makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity);
            save(entityType, entities)
            return newEntity;
        })
}

//create new items
function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            entities.push(...newEntities);
            save(entityType, entities)
            return entities;
        })
}

//update an item
function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
            entities.splice(idx, 1, updatedEntity)
            save(entityType, entities)
            return updatedEntity;
        })
}
//remove an item
function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === entityId);
            entities.splice(idx, 1)
            save(entityType, entities)
        })
}

//save to local storage
function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function makeId(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}