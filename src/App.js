import "./App.css";
import { useState, useCallback, useMemo } from "react";
import Section from "./components/Section";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  let arr = [
    { id: "id-1", name: "Rosie Simpson", number: 4591256 },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];
  const [contacts, setContacts] = useLocalStorage("contacts", arr);
  const [filter, setFilter] = useState("");

  const formSubmitHandler = (item) => {
    const normalizedName = item.name.toLowerCase();
    contacts.find((el) => {
      return el.name.toLowerCase() === normalizedName;
    })
      ? alert(`${item.name} is already in contacts`)
      : changeContacts(item);
  };

  const changeContacts = (item) => {
    setContacts([...contacts, item]);
  };

  const changeFilter = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [filter, contacts]);

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          list={filteredContacts}
          onDeleteContact={(id) => {
            setContacts(contacts.filter((el) => el.id !== id));
          }}
        />
      </Section>
    </div>
  );
}
