'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState, useEffect } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [admin, setAdmin] = useState(false);
  const { data: loggedInUserData } = useProfile();

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setImage(user.image || '');
      setPhone(user.phone || '');
      setStreetAddress(user.streetAddress || '');
      setPostalCode(user.postalCode || '');
      setCity(user.city || '');
      setCountry(user.country || '');
      setAdmin(user.admin || false);
    }
  }, [user]);

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault(); // Prevent page reload on submit

    await onSave(ev, {
      username: userName,
      image,
      phone,
      admin,
      streetAddress,
      city,
      country,
      postalCode,
    });

    // Clear form fields after successful save
    setUserName('');
    setImage('');
    setPhone('');
    setStreetAddress('');
    setPostalCode('');
    setCity('');
    setCountry('');
  }

  if (!user || !loggedInUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form className="grow" onSubmit={handleFormSubmit}>
        <label>First and last name</label>
        <input
          type="text"
          name="username"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email || ''}
          placeholder="email"
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData?.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                value="1"
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
