(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
const collection = {
  // Fetch from database
  getAllContacts() {
    return fetch("http://localhost:8088/addressbook").then(response => response.json()); // Then contactList.js will use array
  }

};
var _default = collection;
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

var _collection = _interopRequireDefault(require("./collection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactList component that displays all contacts.
// It should import the Contact component and the ContactCollection component.
// 1. Call getAllContacts (in collection.js)
// 2. Loop over array and call contactBuilder (contactInfo.js) for each item
// 3. Append to DOM
const contactListDisplay = {
  collect() {
    _collection.default.getAllContacts() // Fetches (in collection.js)
    .then(allContacts => {
      // Parses JS array
      let contactDocFrag = document.createDocumentFragment();
      allContacts.forEach(contact => {
        // Loop through data
        let contactHTML = _contactInfo.default.contactBuilder(contact);

        console.log(contactHTML);
        contactDocFrag.appendChild(contactHTML); // Built HTML is added to doc frag
      }); // console.log(contactDocFrag);

      let container = document.querySelector("#container");
      container.appendChild(contactDocFrag); // Doc frag is added to container in DOM
    });
  }

};
var _default = contactListDisplay;
exports.default = _default;

},{"./collection":1,"./contactInfo":2}],4:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_contactList.default.collect();

},{"./contactList":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RJbmZvLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBRUEsTUFBTSxVQUFVLEdBQUc7QUFDZjtBQUNBLEVBQUEsY0FBYyxHQUFHO0FBQ2IsV0FBTyxLQUFLLENBQUMsbUNBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQLENBRGEsQ0FHakI7QUFDQzs7QUFOYyxDQUFuQjtlQVNlLFU7Ozs7Ozs7Ozs7QUNYZjtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU0sV0FBVyxHQUFHO0FBRWhCLEVBQUEsY0FBYyxDQUFDLGFBQUQsRUFBZ0I7QUFBVTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBckI7QUFFQSxRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosR0FBMEIsYUFBYSxDQUFDLElBQXhDO0FBRUEsUUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbkI7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLEdBQTJCLGFBQWEsQ0FBQyxLQUF6QztBQUVBLFFBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQWxCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixHQUEwQixhQUFhLENBQUMsT0FBeEM7QUFFQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLENBQTJCLFdBQTNCO0FBQ0EsSUFBQSxjQUFjLENBQUMsV0FBZixDQUEyQixZQUEzQjtBQUNBLElBQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsV0FBM0I7QUFFQSxXQUFPLGNBQVAsQ0F0QjBCLENBc0JNO0FBQ2hDO0FBQ0g7O0FBMUJlLENBQXBCO2VBOEJlLFc7Ozs7Ozs7Ozs7O0FDNUJmOztBQUNBOzs7O0FBUkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUtBLE1BQU0sa0JBQWtCLEdBQUc7QUFDdkIsRUFBQSxPQUFPLEdBQUc7QUFDTix3QkFBVyxjQUFYLEdBQW9DO0FBQXBDLEtBQ0MsSUFERCxDQUNNLFdBQVcsSUFBSTtBQUFlO0FBQ2hDLFVBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFyQjtBQUNBLE1BQUEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsT0FBTyxJQUFJO0FBQU07QUFDakMsWUFBSSxXQUFXLEdBQUcscUJBQVksY0FBWixDQUEyQixPQUEzQixDQUFsQjs7QUFDQSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWjtBQUNBLFFBQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsV0FBM0IsRUFIMkIsQ0FHaUI7QUFDL0MsT0FKRCxFQUZpQixDQU9qQjs7QUFFQSxVQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixDQUFoQjtBQUNBLE1BQUEsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsY0FBdEIsRUFWaUIsQ0FVMkI7QUFDL0MsS0FaRDtBQWFEOztBQWZvQixDQUEzQjtlQWtCZSxrQjs7Ozs7O0FDNUJmOzs7O0FBRUEscUJBQVksT0FBWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIEEgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50IHRoYXQgbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBzdG9yYWdlLCBhbmQgc2F2ZXMgbmV3IG9uZXMuIEVhY2ggbmV3IGNvbnRhY3Qgc2hvdWxkIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgaWRlbnRpZmllci5cblxuY29uc3QgY29sbGVjdGlvbiA9IHtcbiAgICAvLyBGZXRjaCBmcm9tIGRhdGFiYXNlXG4gICAgZ2V0QWxsQ29udGFjdHMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9hZGRyZXNzYm9va1wiKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLy8gVGhlbiBjb250YWN0TGlzdC5qcyB3aWxsIHVzZSBhcnJheVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29sbGVjdGlvbjsiLCIvLyBEaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3MuXG4vLyBUaGlzIGlzIHdoZXJlIHlvdSBidWlsZCBvbmUgY29udGFjdC5cbi8vIE9iamVjdFxuLy8gQ29udmVydCB0byBIVE1MXG5cbmNvbnN0IGNvbnRhY3RJbmZvID0ge1xuXG4gICAgY29udGFjdEJ1aWxkZXIoY29udGFjdE9iamVjdCkgeyAgICAgICAgIC8vIEJ1aWxkcyBIVE1MXG4gICAgICAgIC8vIDxhcnRpY2xlPlxuICAgICAgICAvLyA8aDM+W25hbWVdPC9oMz5cbiAgICAgICAgLy8gPHA+W3Bob25lXTwvcD5cbiAgICAgICAgLy8gPHA+W2FkZHJlc3NdPC9wPlxuICAgICAgICAvLyA8L2FydGljbGU+XG5cbiAgICAgICAgbGV0IGNvbnRhY3RTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5cbiAgICAgICAgbGV0IGNvbnRhY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBjb250YWN0TmFtZS50ZXh0Q29udGVudCA9IGNvbnRhY3RPYmplY3QubmFtZTtcblxuICAgICAgICBsZXQgY29udGFjdFBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnRhY3RQaG9uZS50ZXh0Q29udGVudCA9IGNvbnRhY3RPYmplY3QucGhvbmU7XG5cbiAgICAgICAgbGV0IGNvbnRhY3RBZGR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnRhY3RBZGR5LnRleHRDb250ZW50ID0gY29udGFjdE9iamVjdC5hZGRyZXNzO1xuXG4gICAgICAgIGNvbnRhY3RTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhY3ROYW1lKTtcbiAgICAgICAgY29udGFjdFNlY3Rpb24uYXBwZW5kQ2hpbGQoY29udGFjdFBob25lKTtcbiAgICAgICAgY29udGFjdFNlY3Rpb24uYXBwZW5kQ2hpbGQoY29udGFjdEFkZHkpO1xuXG4gICAgICAgIHJldHVybiBjb250YWN0U2VjdGlvbjsgICAgICAgICAgLy8gUmV0dXJuIG5ld2x5IGNyZWF0ZWQgc2VjdGlvblxuICAgICAgICAvLyBOb3cgY2FsbCBmdW5jdGlvbiBpbiBjb250YWN0TGlzdC5qc1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWN0SW5mbzsiLCIvLyBBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy5cbi8vIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuXG4vLyAxLiBDYWxsIGdldEFsbENvbnRhY3RzIChpbiBjb2xsZWN0aW9uLmpzKVxuLy8gMi4gTG9vcCBvdmVyIGFycmF5IGFuZCBjYWxsIGNvbnRhY3RCdWlsZGVyIChjb250YWN0SW5mby5qcykgZm9yIGVhY2ggaXRlbVxuLy8gMy4gQXBwZW5kIHRvIERPTVxuXG5pbXBvcnQgY29udGFjdEluZm8gZnJvbSBcIi4vY29udGFjdEluZm9cIlxuaW1wb3J0IGNvbGxlY3Rpb24gZnJvbSBcIi4vY29sbGVjdGlvblwiXG5cbmNvbnN0IGNvbnRhY3RMaXN0RGlzcGxheSA9IHtcbiAgICBjb2xsZWN0KCkge1xuICAgICAgICBjb2xsZWN0aW9uLmdldEFsbENvbnRhY3RzKCkgICAgICAgICAvLyBGZXRjaGVzIChpbiBjb2xsZWN0aW9uLmpzKVxuICAgICAgICAudGhlbihhbGxDb250YWN0cyA9PiB7ICAgICAgICAgICAgICAvLyBQYXJzZXMgSlMgYXJyYXlcbiAgICAgICAgICAgIGxldCBjb250YWN0RG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGFsbENvbnRhY3RzLmZvckVhY2goY29udGFjdCA9PiB7ICAgICAvLyBMb29wIHRocm91Z2ggZGF0YVxuICAgICAgICAgICAgICAgIGxldCBjb250YWN0SFRNTCA9IGNvbnRhY3RJbmZvLmNvbnRhY3RCdWlsZGVyKGNvbnRhY3QpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRhY3RIVE1MKTtcbiAgICAgICAgICAgICAgICBjb250YWN0RG9jRnJhZy5hcHBlbmRDaGlsZChjb250YWN0SFRNTCk7ICAgIC8vIEJ1aWx0IEhUTUwgaXMgYWRkZWQgdG8gZG9jIGZyYWdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWN0RG9jRnJhZyk7XG5cbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWN0RG9jRnJhZyk7ICAgICAgLy8gRG9jIGZyYWcgaXMgYWRkZWQgdG8gY29udGFpbmVyIGluIERPTVxuICAgICAgICB9KVxuICAgICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TGlzdERpc3BsYXk7IiwiaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcblxuY29udGFjdExpc3QuY29sbGVjdCgpIl19
