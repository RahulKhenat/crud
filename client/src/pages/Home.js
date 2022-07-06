import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
//import { toast } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";


const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, [data]);

  const deleteContact = (id) =>{
    if (window.confirm('Are You Sure')){
      axios.delete (`http://localhost:5000/api/${id}`);
      toast.success('Contact deleted Successfully');
      setTimeout(() => {
        loadData()
        
      }, 500);
    }
  }
  return (
    <div style={{ marginTop: "150px" }}>
    <Link to='/addContact'>
      <button className="btn btn-contact">Add Contact</button>
    </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Salary</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                
                <td>{item.name}</td>
                <td>{item.salary}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=> deleteContact(item.id)}>Delete</button>
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
