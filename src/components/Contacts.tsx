// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addContact, deleteContact } from '../store';

// interface Contact {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
// }

// const Contacts: React.FC = () => {
//   const contacts = useSelector((state: Contact[]) => state);
//   const dispatch = useDispatch();

//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

//   const handleContactClick = (contact: Contact) => {
//     setSelectedContact(contact);
//   };

//   const handlePopupClose = () => {
//     setSelectedContact(null);
//   };

//   const [newContact, setNewContact] = useState<Contact>({
//     id: 1,
//     name: '',
//     phone: '',
//     email: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
//   };

//   const handleAddContact = () => {
//     dispatch(addContact(newContact));
//     setNewContact((prevContact) => ({
//       id: prevContact.id + 1,
//       name: '',
//       phone: '',
//       email: '',
//     }));
//   };

//   const handleDeleteContact = (id: number) => {
//     dispatch(deleteContact(id));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
//       <form className="mb-4 space-y-2">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={newContact.name}
//           onChange={handleChange}
//           className="border rounded-md p-2 w-full"
//         />
//         <input
//           type="number"
//           name="phone"
//           placeholder="Phone"
//           value={newContact.phone}
//           onChange={handleChange}
//           className="border rounded-md p-2 w-full"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={newContact.email}
//           onChange={handleChange}
//           className="border rounded-md p-2 w-full"
//         />
//         <button
//           type="button"
//           onClick={handleAddContact}
//           className="bg-blue-500 text-white rounded-md py-2 px-4"
//         >
//           Add
//         </button>
//       </form>

//       <h2 className="text-2xl font-bold mb-4">Contacts List</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {contacts.map((contact) => (
//           <div
//             key={contact.id}
//             className="flex items-center bg-white rounded-lg shadow-md p-4 cursor-pointer"
//           >
//             <div onClick={() => handleContactClick(contact)}>
//               <div className="flex-grow">
//                 <p className="text-gray-600">Name : {contact.name}</p>
//                 <p className="text-gray-600">Phone : {contact.phone}</p>
//                 <p className="text-gray-300">click to see email also</p>
//               </div>
//             </div>
//             <button
//               onClick={() => handleDeleteContact(contact.id)}
//               className="bg-red-500 text-white rounded-md py-2 px-4 ml-4"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedContact && (
//         <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg">
//             <h3 className="text-xl font-bold mb-2">
//               {selectedContact.name}
//             </h3>
//             <p className="mb-2">Phone: {selectedContact.phone}</p>
//             <p className="mb-4">Email: {selectedContact.email}</p>
//             <button
//               onClick={handlePopupClose}
//               className="bg-blue-500 text-white rounded-md py-2 px-4"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Contacts;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../store';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  status: string;
}

const Contacts: React.FC = () => {
  const contacts = useSelector((state: Contact[]) => state);
  const dispatch = useDispatch();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handlePopupClose = () => {
    setSelectedContact(null);
  };

  const [newContact, setNewContact] = useState<Contact>({
    id: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleAddContact = () => {
    dispatch(addContact(newContact));
    setNewContact((prevContact) => ({
      id: prevContact.id + 1,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      status: 'active',
    }));
  };

  const handleDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  const handleEditContact = (contact: Contact) => {
    setNewContact(contact);
    setSelectedContact(null);
  };

  const handleUpdateContact = () => {
    dispatch(updateContact(newContact)); // Make sure you have an updateContact action
    setNewContact({
      id: newId(),
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      status: 'active',
    });
    setSelectedContact(null); // Clear selected contact after update
  };
  return (
    <div className="p-4">
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newContact.firstName}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newContact.lastName}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-600 font-medium">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={newContact.phone}
          onChange={handleChange}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-600 font-medium">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleChange}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-gray-600 font-medium">Status:</label>
        <label className="flex items-center space-x-1 text-gray-700">
          <input
            type="radio"
            name="status"
            value="active"
            checked={newContact.status === 'active'}
            onChange={handleChange}
            className="text-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          Active
        </label>
        <label className="flex items-center space-x-1 text-gray-700">
          <input
            type="radio"
            name="status"
            value="inactive"
            checked={newContact.status === 'inactive'}
            onChange={handleChange}
            className="text-red-500 focus:ring-2 focus:ring-red-500"
          />
          Inactive
        </label>
      </div>
      <button
        type="button"
        onClick={handleAddContact}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 transition duration-300"
      >
        Add
      </button>
    </form>
  </div>



      <h2 className="text-2xl font-bold mb-4">Contacts List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {contacts.map((contact) => (
      <div
        key={contact.id}
        className="flex items-center bg-white rounded-lg shadow-md p-4 cursor-pointer"
      >
        <div onClick={() => handleContactClick(contact)}>
              <div className="flex-grow">
                <p className="text-gray-600">Name : {contact.firstName} {contact.lastName}</p>
                <p className="text-gray-600">Phone : {contact.phone}</p>
                <p className="text-gray-300">Status : {contact.status}</p>
              </div>
            </div>
            <div className="flex space-x-2">
            <div className="flex space-x-2">
          <button
            onClick={() => handleEditContact(contact)} // Updated handler
            className="bg-green-500 text-white rounded-md py-2 px-4"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteContact(contact.id)}
            className="bg-red-500 text-white rounded-md py-2 px-4"
          >
            Delete
          </button>
        </div>
      </div>
      </div>
    ))}
  </div>


      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              {selectedContact.firstName} {selectedContact.lastName}
            </h3>
            <p className="mb-2">Phone: {selectedContact.phone}</p>
            <p className="mb-2">Email: {selectedContact.email}</p>
            <p className="mb-4">Status: {selectedContact.status}</p>
            <button
              onClick={handlePopupClose}
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
