// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.

const collection = {
    // Fetch from database
    getAllContacts() {
        return fetch("http://localhost:8088/addressbook")
        .then(response => response.json())
    // Then contactList.js will use array
    }
}

export default collection;