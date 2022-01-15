import React from 'react';
// import PropTypes from 'prop-types';

import Section from '../Section/Section';
import FormContacts from '../FormContacts/FormContacts';
import SearchContacts from '../SearchContacts/SearchContacts';
import ContactsList from '../ContactsList/ContactsList';

import styles from './Phonebook.module.scss';

class Phonebook extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // formSubmitHandler = data => {
  //   this.state.contacts.find(contact => contact.name === data.name)
  //     ? alert(`${data.name} is already in contacts`)
  //     : this.setState(({ contacts }) => ({ contacts: [data, ...contacts] }));
  // };

  getContactNames = () => {
    return this.state.contacts.map(contact => contact.name.toLowerCase());
  };

  formSubmitHandler = data => {
    const existingNames = this.getContactNames();

    if (existingNames.includes(data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [data, ...prevState.contacts],
      }));
    }
  };

  handleSearch = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  handleDeleteContact = data => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== data.id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const search = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
      <div className={styles.phonebook}>
        <Section title="Phonebook">
          <FormContacts onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <SearchContacts
            label="Find contacts by name"
            value={filter}
            onChange={this.handleSearch}
          />
          <ContactsList
            contacts={search}
            onDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default Phonebook;
