import ContactListItem from "./ContactListItem";
import PropTypes from "prop-types";

export default function ContactList({ list, onDeleteContact }) {
  return (
    <ul>
      {list.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
}
ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
};
