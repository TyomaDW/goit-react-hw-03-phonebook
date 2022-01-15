import styles from './ContactItem.module.scss';

const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <li className={styles.item}>
      <span>{contact.name}</span>
      <span>{contact.number}</span>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          onDeleteContact(contact);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
