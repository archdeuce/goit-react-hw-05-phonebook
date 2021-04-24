import './App.css';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Header from './components/Header';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const onCreate = newContact => {
    if (contacts.find(({ name }) => name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(state => [newContact, ...state]);
  };

  const onFilterChanged = filter => {
    setFilter(filter);
  };

  const onDelete = removeItemId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== removeItemId));
    saveContacts();
  };

  const filteredContacts = () => {
    const f = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(f));
  };

  const saveContacts = () => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  return (
    <div className="container">
      <Header />
      <ContactForm onCreate={onCreate} />

      <h2>Contacts</h2>
      <Filter onFilterChanged={onFilterChanged} />
      <ContactList contacts={filteredContacts()} onDelete={onDelete} />
    </div>
  );
}
