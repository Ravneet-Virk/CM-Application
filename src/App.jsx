import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import uuid4 from 'uuid4';
import "./App.css"

const App = () => {

  // All states are defined here
  const localStorageKey = "contact";

  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || []
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }, [list])

  const [contact, setContact] = useState({ name: "", email: "" }); // state for form object

  // list of objects of details of a person

  const [flag, setFlag] = useState(false);

  const [ID, setID] = useState("");

  // All functions are defined here

  const handleChange = (e) => {   // Input Form function
    if (e.target.name === "name") {
      setContact({ ...contact, name: e.target.value });
    }
    else {
      setContact({ ...contact, email: e.target.value });
    }
    // console.log(contact);
  }

  const handleAdd = (e) => {    // Add button functionality
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("Please fill all the details !!")
      return
    }
    setList((list) => {
      const newList = [...list, { id: uuid4(), contact }];
      // console.log(newList);
      return newList
    })
    setContact({ name: "", email: "" });
  }

  const handleDelete = (id) => { // Delete Functionality Here
    // e.preventDefault();
    // console.log(id);
    const filterList = list.filter((val) => {
      return val.id !== id
    });
    setList(filterList);
  }

  const handleEdit = (id) => {
    const row = list.find((val) => {
      return val.id === id
    })
    // console.log(row);
    setContact({ name: row.contact.name, email: row.contact.email });
    setID(row.id);
    setFlag(true);
  }

  const handleUpdate = (id) => {
    // console.log(id);

    const newlist = list.map(obj => {
      if (obj.id === id) {
        return {
          ...obj, contact: {
            name: contact.name, email: contact.email
          }
        }
      }
      return obj
    });
    // console.log(newlist);
    setList(newlist);
    setContact({ name: "", email: "" });
    setFlag(false);
  }

  return (
    <div>
      <Header />
      <div className="container">

        {/* ------ Input Form ------- */}
        <div className="contact-form">
          <h1>CONTACT FORM</h1>
          <form>
            <label>Name: </label><br />
            <input type='text' name='name' placeholder='Enter Name' value={contact.name} onChange={handleChange}></input><br />
            <label>Email: </label><br />
            <input type='text' name='email' placeholder='Enter Email' value={contact.email} onChange={handleChange}></input>
          </form>
          <div className="add-btn">
            <button onClick={handleAdd}>Add Contact</button>
            {flag && <button onClick={() => handleUpdate(ID)}>Update</button>}
          </div>
        </div>

        {/* ----------- List Population ---------- */}
        <div className="contact-list">
          <div>
            <h1>CONTACT LIST</h1>
          </div>
          <div className="list-box">
            {list.map((val, i) => (
              <div key={i} className='list-box-row'>
                <div>{val.contact.name}</div>
                <div>{val.contact.email}</div>
                <div className='btn-box'>
                  <button onClick={() => handleDelete(val.id)} style={{ margin: "0 10px" }}>Delete</button>
                  <button onClick={() => handleEdit(val.id)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div >

    </div>
  )
}

export default App
