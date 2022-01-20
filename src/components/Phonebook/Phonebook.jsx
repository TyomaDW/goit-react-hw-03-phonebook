import React from 'react';

import Section from '../Section';
import FormContacts from '../FormContacts';
import SearchContacts from '../SearchContacts';
import ContactsList from '../ContactsList';

import styles from './Phonebook.module.scss';

class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

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
