//  ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage.
// It should import the ContactCollection component.

import collectionData from "./collectionData.js"
import contactList from "./contactList.js"

const form = {
    formBuilder() {
        let formContainer = document.querySelector("#form");
        let formHTML = `
        <h1>Address Book</h1>
        <article id="formfields">
            <fieldset>
                <label for="contactName">Name:</label>
                <input type="text" name="contactName" id="contactName">
            </fieldset>
            <fieldset>
                <label for="contactPhone">Phone:</label>
                <input type="text" name="contactPhone" id="contactPhone">
            </fieldset>
            <fieldset>
                <label for="contactAddress">Address:</label>
                <input type="text" name="contactAddress" id="contactAddress">
            </fieldset>
            <button id="add-button" form="addressbook" value="Record New Contact">Record New Contact</button>
        </article>
        `
        formContainer.innerHTML = formHTML;
        let addButton = document.querySelector("#add-button");
        addButton.addEventListener("click", () => {
            // ^^^ Add click event to button
            // Then pull data from each input field (set variable for each)
            let contactName = document.querySelector("input[name='contactName']").value;
            let contactPhone = document.querySelector("input[name='contactPhone']").value;
            let contactAddress = document.querySelector("input[name='contactAddress']").value;
            console.log("Button was clicked");

            console.log("Input values:", contactName, contactPhone, contactAddress);

            let newContact = {             // Creates new object using input values
                name: contactName,
                phone: contactPhone,
                address: contactAddress
            };

            console.log(newContact);

            collectionData.postNewContact(newContact)
            .then(response => {
                contactList.collect()
            })
        })
    }
}

export default form;





// This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new food to their refrigerator and a button with an event listener that will listen for the click
// 1. Build HTML form
// 2. Attach event listener to button in form
// 3. Append the HTML form to the DOM

// This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
// 1. Get user input that user entered
// 2. Create a new object with the same structure we have been using throughout the application to represent a food item:
// {
//   name: "user input name",
//   expiration: "user input expiration",
//   type: "user input type"
// }
// 3. Call the method(postNewFood) with the fetch request to POST to the API and pass it the object we created in the previous step
