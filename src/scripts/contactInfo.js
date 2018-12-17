// Displays a person's name, phone number, and address.
// This is where you build one contact.
// Object
// Convert to HTML

const contactInfo = {

    contactBuilder(contactObject) {         // Builds HTML
        // <article>
        // <h3>[name]</h3>
        // <p>[phone]</p>
        // <p>[address]</p>
        // </article>

        let contactSection = document.createElement("section");

        let contactName = document.createElement("h3");
        contactName.textContent = contactObject.name;

        let contactPhone = document.createElement("p");
        contactPhone.textContent = contactObject.phone;

        let contactAddy = document.createElement("p");
        contactAddy.textContent = contactObject.address;

        contactSection.appendChild(contactName);
        contactSection.appendChild(contactPhone);
        contactSection.appendChild(contactAddy);

        return contactSection;          // Return newly created section
        // Now call function in contactList.js
    }

}

export default contactInfo;