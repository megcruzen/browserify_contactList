// A ContactList component that displays all contacts.
// It should import the Contact component and the ContactCollection component.

// 1. Call getAllContacts (in collection.js)
// 2. Loop over array and call contactBuilder (contactInfo.js) for each item
// 3. Append to DOM

import contactInfo from "./contactInfo"
import collectionData from "./collectionData"

const contactListDisplay = {
    collect() {
        collectionData.getAllContacts()         // Fetches (in collection.js)
        .then(allContacts => {              // Parses JS array
            let contactDocFrag = document.createDocumentFragment();
            allContacts.forEach(contactObj => {     // Loop through data
                let contactHTML = contactInfo.contactBuilder(contactObj);
                console.log(contactHTML);
                contactDocFrag.appendChild(contactHTML);    // Built HTML is added to doc frag
            })
            // console.log(contactDocFrag);

            let container = document.querySelector("#listContainer");
            container.innerHTML = "";
            container.appendChild(contactDocFrag);      // Doc frag is added to container in DOM
        })
      }
}

export default contactListDisplay;