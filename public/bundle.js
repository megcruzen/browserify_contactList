(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
const collectionData = {
  // Fetch from database
  getAllContacts() {
    return fetch("http://localhost:8088/addressbook").then(response => response.json()); // Then contactList.js will use array
  },

  // This method will make a HTTP POST request to the API. Because a POST has a body with the data for the new item you want created, this method will take one argument which will be the object for the new food item we want to add to our collection in the API.
  postNewContact(newContactToSave) {
    // We want to return this fetch request so that at the point it is called, we can take advantage of the asynchronous nature of promises to wait for this to be done before getting the latest data and rerendering the DOM.
    return fetch("http://localhost:8088/addressbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newContactToSave)
    });
  }

};
var _default = collectionData;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Displays a person's name, phone number, and address.
// This is where you build one contact.
// Object
// Convert to HTML
const contactInfo = {
  contactBuilder(contactObject) {
    // Builds HTML
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
    return contactSection; // Return newly created section
    // Now call function in contactList.js
  }

};
var _default = contactInfo;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactInfo = _interopRequireDefault(require("./contactInfo"));

var _collectionData = _interopRequireDefault(require("./collectionData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactList component that displays all contacts.
// It should import the Contact component and the ContactCollection component.
// 1. Call getAllContacts (in collection.js)
// 2. Loop over array and call contactBuilder (contactInfo.js) for each item
// 3. Append to DOM
const contactListDisplay = {
  collect() {
    _collectionData.default.getAllContacts() // Fetches (in collection.js)
    .then(allContacts => {
      // Parses JS array
      let contactDocFrag = document.createDocumentFragment();
      allContacts.forEach(contactObj => {
        // Loop through data
        let contactHTML = _contactInfo.default.contactBuilder(contactObj);

        console.log(contactHTML);
        contactDocFrag.appendChild(contactHTML); // Built HTML is added to doc frag
      }); // console.log(contactDocFrag);

      let container = document.querySelector("#listContainer");
      container.innerHTML = "";
      container.appendChild(contactDocFrag); // Doc frag is added to container in DOM
    });
  }

};
var _default = contactListDisplay;
exports.default = _default;

},{"./collectionData":1,"./contactInfo":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collectionData = _interopRequireDefault(require("./collectionData.js"));

var _contactList = _interopRequireDefault(require("./contactList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage.
// It should import the ContactCollection component.
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
        `;
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
      let newContact = {
        // Creates new object using input values
        name: contactName,
        phone: contactPhone,
        address: contactAddress
      };
      console.log(newContact);

      _collectionData.default.postNewContact(newContact).then(response => {
        _contactList.default.collect();
      });
    });
  }

};
var _default = form; // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new food to their refrigerator and a button with an event listener that will listen for the click
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

exports.default = _default;

},{"./collectionData.js":1,"./contactList.js":3}],5:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

var _form = _interopRequireDefault(require("./form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_contactList.default.collect();

_form.default.formBuilder();

},{"./contactList":3,"./form":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbGxlY3Rpb25EYXRhLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0SW5mby5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2Zvcm0uanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUVBLE1BQU0sY0FBYyxHQUFHO0FBQ25CO0FBQ0EsRUFBQSxjQUFjLEdBQUc7QUFDYixXQUFPLEtBQUssQ0FBQyxtQ0FBRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVAsQ0FEYSxDQUdqQjtBQUNDLEdBTmtCOztBQVFuQjtBQUVBLEVBQUEsY0FBYyxDQUFDLGdCQUFELEVBQW1CO0FBQ2pDO0FBQ0EsV0FBTyxLQUFLLENBQUMsbUNBQUQsRUFBc0M7QUFDaEQsTUFBQSxNQUFNLEVBQUUsTUFEd0M7QUFFaEQsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZ1QztBQUtoRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGdCQUFmO0FBTDBDLEtBQXRDLENBQVo7QUFPRDs7QUFuQm9CLENBQXZCO2VBc0JlLGM7Ozs7Ozs7Ozs7QUN4QmY7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNLFdBQVcsR0FBRztBQUVoQixFQUFBLGNBQWMsQ0FBQyxhQUFELEVBQWdCO0FBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFFBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLENBQXJCO0FBRUEsUUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBbEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLEdBQTBCLGFBQWEsQ0FBQyxJQUF4QztBQUVBLFFBQUksWUFB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SSxFQU1mO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUVBOztBQUNBOzs7O0FBRUEscUJBQW1CLE9BQW5COztBQUNBLGNBQUssV0FBTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIEEgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50IHRoYXQgbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBzdG9yYWdlLCBhbmQgc2F2ZXMgbmV3IG9uZXMuIEVhY2ggbmV3IGNvbnRhY3Qgc2hvdWxkIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgaWRlbnRpZmllci5cblxuY29uc3QgY29sbGVjdGlvbkRhdGEgPSB7XG4gICAgLy8gRmV0Y2ggZnJvbSBkYXRhYmFzZVxuICAgIGdldEFsbENvbnRhY3RzKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvYWRkcmVzc2Jvb2tcIilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC8vIFRoZW4gY29udGFjdExpc3QuanMgd2lsbCB1c2UgYXJyYXlcbiAgICB9LFxuXG4gICAgLy8gVGhpcyBtZXRob2Qgd2lsbCBtYWtlIGEgSFRUUCBQT1NUIHJlcXVlc3QgdG8gdGhlIEFQSS4gQmVjYXVzZSBhIFBPU1QgaGFzIGEgYm9keSB3aXRoIHRoZSBkYXRhIGZvciB0aGUgbmV3IGl0ZW0geW91IHdhbnQgY3JlYXRlZCwgdGhpcyBtZXRob2Qgd2lsbCB0YWtlIG9uZSBhcmd1bWVudCB3aGljaCB3aWxsIGJlIHRoZSBvYmplY3QgZm9yIHRoZSBuZXcgZm9vZCBpdGVtIHdlIHdhbnQgdG8gYWRkIHRvIG91ciBjb2xsZWN0aW9uIGluIHRoZSBBUEkuXG5cbiAgICBwb3N0TmV3Q29udGFjdChuZXdDb250YWN0VG9TYXZlKSB7XG4gICAgLy8gV2Ugd2FudCB0byByZXR1cm4gdGhpcyBmZXRjaCByZXF1ZXN0IHNvIHRoYXQgYXQgdGhlIHBvaW50IGl0IGlzIGNhbGxlZCwgd2UgY2FuIHRha2UgYWR2YW50YWdlIG9mIHRoZSBhc3luY2hyb25vdXMgbmF0dXJlIG9mIHByb21pc2VzIHRvIHdhaXQgZm9yIHRoaXMgdG8gYmUgZG9uZSBiZWZvcmUgZ2V0dGluZyB0aGUgbGF0ZXN0IGRhdGEgYW5kIHJlcmVuZGVyaW5nIHRoZSBET00uXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2FkZHJlc3Nib29rXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdDb250YWN0VG9TYXZlKVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29sbGVjdGlvbkRhdGE7IiwiLy8gRGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxuLy8gVGhpcyBpcyB3aGVyZSB5b3UgYnVpbGQgb25lIGNvbnRhY3QuXG4vLyBPYmplY3Rcbi8vIENvbnZlcnQgdG8gSFRNTFxuXG5jb25zdCBjb250YWN0SW5mbyA9IHtcblxuICAgIGNvbnRhY3RCdWlsZGVyKGNvbnRhY3RPYmplY3QpIHsgICAgICAgICAvLyBCdWlsZHMgSFRNTFxuICAgICAgICAvLyA8YXJ0aWNsZT5cbiAgICAgICAgLy8gPGgzPltuYW1lXTwvaDM+XG4gICAgICAgIC8vIDxwPltwaG9uZV08L3A+XG4gICAgICAgIC8vIDxwPlthZGRyZXNzXTwvcD5cbiAgICAgICAgLy8gPC9hcnRpY2xlPlxuXG4gICAgICAgIGxldCBjb250YWN0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuXG4gICAgICAgIGxldCBjb250YWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgY29udGFjdE5hbWUudGV4dENvbnRlbnQgPSBjb250YWN0T2JqZWN0Lm5hbWU7XG5cbiAgICAgICAgbGV0IGNvbnRhY3RQaG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb250YWN0UGhvbmUudGV4dENvbnRlbnQgPSBjb250YWN0T2JqZWN0LnBob25lO1xuXG4gICAgICAgIGxldCBjb250YWN0QWRkeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb250YWN0QWRkeS50ZXh0Q29udGVudCA9IGNvbnRhY3RPYmplY3QuYWRkcmVzcztcblxuICAgICAgICBjb250YWN0U2VjdGlvbi5hcHBlbmRDaGlsZChjb250YWN0TmFtZSk7XG4gICAgICAgIGNvbnRhY3RTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhY3RQaG9uZSk7XG4gICAgICAgIGNvbnRhY3RTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhY3RBZGR5KTtcblxuICAgICAgICByZXR1cm4gY29udGFjdFNlY3Rpb247ICAgICAgICAgIC8vIFJldHVybiBuZXdseSBjcmVhdGVkIHNlY3Rpb25cbiAgICAgICAgLy8gTm93IGNhbGwgZnVuY3Rpb24gaW4gY29udGFjdExpc3QuanNcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEluZm87IiwiLy8gQSBDb250YWN0TGlzdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhbGwgY29udGFjdHMuXG4vLyBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cblxuLy8gMS4gQ2FsbCBnZXRBbGxDb250YWN0cyAoaW4gY29sbGVjdGlvbi5qcylcbi8vIDIuIExvb3Agb3ZlciBhcnJheSBhbmQgY2FsbCBjb250YWN0QnVpbGRlciAoY29udGFjdEluZm8uanMpIGZvciBlYWNoIGl0ZW1cbi8vIDMuIEFwcGVuZCB0byBET01cblxuaW1wb3J0IGNvbnRhY3RJbmZvIGZyb20gXCIuL2NvbnRhY3RJbmZvXCJcbmltcG9ydCBjb2xsZWN0aW9uRGF0YSBmcm9tIFwiLi9jb2xsZWN0aW9uRGF0YVwiXG5cbmNvbnN0IGNvbnRhY3RMaXN0RGlzcGxheSA9IHtcbiAgICBjb2xsZWN0KCkge1xuICAgICAgICBjb2xsZWN0aW9uRGF0YS5nZXRBbGxDb250YWN0cygpICAgICAgICAgLy8gRmV0Y2hlcyAoaW4gY29sbGVjdGlvbi5qcylcbiAgICAgICAgLnRoZW4oYWxsQ29udGFjdHMgPT4geyAgICAgICAgICAgICAgLy8gUGFyc2VzIEpTIGFycmF5XG4gICAgICAgICAgICBsZXQgY29udGFjdERvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICBhbGxDb250YWN0cy5mb3JFYWNoKGNvbnRhY3RPYmogPT4geyAgICAgLy8gTG9vcCB0aHJvdWdoIGRhdGFcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdEhUTUwgPSBjb250YWN0SW5mby5jb250YWN0QnVpbGRlcihjb250YWN0T2JqKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250YWN0SFRNTCk7XG4gICAgICAgICAgICAgICAgY29udGFjdERvY0ZyYWcuYXBwZW5kQ2hpbGQoY29udGFjdEhUTUwpOyAgICAvLyBCdWlsdCBIVE1MIGlzIGFkZGVkIHRvIGRvYyBmcmFnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGFjdERvY0ZyYWcpO1xuXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0Q29udGFpbmVyXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFjdERvY0ZyYWcpOyAgICAgIC8vIERvYyBmcmFnIGlzIGFkZGVkIHRvIGNvbnRhaW5lciBpbiBET01cbiAgICAgICAgfSlcbiAgICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdExpc3REaXNwbGF5OyIsIi8vICBDb250YWN0Rm9ybSBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuXG4vLyBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG5cbmltcG9ydCBjb2xsZWN0aW9uRGF0YSBmcm9tIFwiLi9jb2xsZWN0aW9uRGF0YS5qc1wiXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIlxuXG5jb25zdCBmb3JtID0ge1xuICAgIGZvcm1CdWlsZGVyKCkge1xuICAgICAgICBsZXQgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybVwiKTtcbiAgICAgICAgbGV0IGZvcm1IVE1MID0gYFxuICAgICAgICA8aDE+QWRkcmVzcyBCb29rPC9oMT5cbiAgICAgICAgPGFydGljbGUgaWQ9XCJmb3JtZmllbGRzXCI+XG4gICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbnRhY3ROYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb250YWN0TmFtZVwiIGlkPVwiY29udGFjdE5hbWVcIj5cbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbnRhY3RQaG9uZVwiPlBob25lOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvbnRhY3RQaG9uZVwiIGlkPVwiY29udGFjdFBob25lXCI+XG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb250YWN0QWRkcmVzc1wiPkFkZHJlc3M6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29udGFjdEFkZHJlc3NcIiBpZD1cImNvbnRhY3RBZGRyZXNzXCI+XG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFkZC1idXR0b25cIiBmb3JtPVwiYWRkcmVzc2Jvb2tcIiB2YWx1ZT1cIlJlY29yZCBOZXcgQ29udGFjdFwiPlJlY29yZCBOZXcgQ29udGFjdDwvYnV0dG9uPlxuICAgICAgICA8L2FydGljbGU+XG4gICAgICAgIGBcbiAgICAgICAgZm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBmb3JtSFRNTDtcbiAgICAgICAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWJ1dHRvblwiKTtcbiAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBeXl4gQWRkIGNsaWNrIGV2ZW50IHRvIGJ1dHRvblxuICAgICAgICAgICAgLy8gVGhlbiBwdWxsIGRhdGEgZnJvbSBlYWNoIGlucHV0IGZpZWxkIChzZXQgdmFyaWFibGUgZm9yIGVhY2gpXG4gICAgICAgICAgICBsZXQgY29udGFjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0nY29udGFjdE5hbWUnXVwiKS52YWx1ZTtcbiAgICAgICAgICAgIGxldCBjb250YWN0UGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0nY29udGFjdFBob25lJ11cIikudmFsdWU7XG4gICAgICAgICAgICBsZXQgY29udGFjdEFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0nY29udGFjdEFkZHJlc3MnXVwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnV0dG9uIHdhcyBjbGlja2VkXCIpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklucHV0IHZhbHVlczpcIiwgY29udGFjdE5hbWUsIGNvbnRhY3RQaG9uZSwgY29udGFjdEFkZHJlc3MpO1xuXG4gICAgICAgICAgICBsZXQgbmV3Q29udGFjdCA9IHsgICAgICAgICAgICAgLy8gQ3JlYXRlcyBuZXcgb2JqZWN0IHVzaW5nIGlucHV0IHZhbHVlc1xuICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRhY3ROYW1lLFxuICAgICAgICAgICAgICAgIHBob25lOiBjb250YWN0UGhvbmUsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogY29udGFjdEFkZHJlc3NcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0NvbnRhY3QpO1xuXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGF0YS5wb3N0TmV3Q29udGFjdChuZXdDb250YWN0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LmNvbGxlY3QoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm07XG5cblxuXG5cblxuLy8gVGhpcyBtb2R1bGUgd2lsbCBidWlsZCBhIGZvcm0gYW5kIGFwcGVuZCBpdCB0byB0aGUgRE9NLiBUaGUgZm9ybSB3aWxsIGNvbnRhaW4gaW5wdXQgZmllbGRzIGZvciBhIHVzZXIgdG8gYWRkIGEgbmV3IGZvb2QgdG8gdGhlaXIgcmVmcmlnZXJhdG9yIGFuZCBhIGJ1dHRvbiB3aXRoIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgd2lsbCBsaXN0ZW4gZm9yIHRoZSBjbGlja1xuLy8gMS4gQnVpbGQgSFRNTCBmb3JtXG4vLyAyLiBBdHRhY2ggZXZlbnQgbGlzdGVuZXIgdG8gYnV0dG9uIGluIGZvcm1cbi8vIDMuIEFwcGVuZCB0aGUgSFRNTCBmb3JtIHRvIHRoZSBET01cblxuLy8gVGhpcyBtb2R1bGUgd2lsbCBhbHNvIGNvbnRhaW4gdGhlIGZ1bmN0aW9uIHRoYXQgZXhlY3V0ZXMgd2hlbiB0aGUgYnV0dG9uIGluIHRoZSBmb3JtIGlzIGNsaWNrZWQuIFdoZW4gdGhlIGJ1dHRvbiBpbiB0aGUgZm9ybSBpcyBjbGlja2VkLCB0aGUgZm9sbG93aW5nIHdpbGwgaGFwcGVuOlxuLy8gMS4gR2V0IHVzZXIgaW5wdXQgdGhhdCB1c2VyIGVudGVyZWRcbi8vIDIuIENyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzdHJ1Y3R1cmUgd2UgaGF2ZSBiZWVuIHVzaW5nIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uIHRvIHJlcHJlc2VudCBhIGZvb2QgaXRlbTpcbi8vIHtcbi8vICAgbmFtZTogXCJ1c2VyIGlucHV0IG5hbWVcIixcbi8vICAgZXhwaXJhdGlvbjogXCJ1c2VyIGlucHV0IGV4cGlyYXRpb25cIixcbi8vICAgdHlwZTogXCJ1c2VyIGlucHV0IHR5cGVcIlxuLy8gfVxuLy8gMy4gQ2FsbCB0aGUgbWV0aG9kKHBvc3ROZXdGb29kKSB3aXRoIHRoZSBmZXRjaCByZXF1ZXN0IHRvIFBPU1QgdG8gdGhlIEFQSSBhbmQgcGFzcyBpdCB0aGUgb2JqZWN0IHdlIGNyZWF0ZWQgaW4gdGhlIHByZXZpb3VzIHN0ZXBcbiIsImltcG9ydCBjb250YWN0TGlzdERpc3BsYXkgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuaW1wb3J0IGZvcm0gZnJvbSBcIi4vZm9ybVwiXG5cbmNvbnRhY3RMaXN0RGlzcGxheS5jb2xsZWN0KCk7XG5mb3JtLmZvcm1CdWlsZGVyKCk7XG5cbiJdfQ==
