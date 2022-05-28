//variable that stores the connected database object when connection is complete
let db;
// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
// 1st parameter - The name of the IndexedDB database you'd like to create (if it doesn't exist) or connect to (if it does exist). We'll use the name pizza_hunt.
// 2nd parameter - The version of the database. By default, we start it at 1. This parameter is used to determine whether the database's structure has changed between connections. Think of it as if you were changing the columns of a SQL database.
const request = indexedDB.open("pizza_hunt", 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore("new_pizza", { autoIncrement: true });
};