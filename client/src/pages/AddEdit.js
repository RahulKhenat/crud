import React, { useEffect, useState } from "react";
import "./AddEdit.css";
import { useHistory, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  salary: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[id] }));
  }, [id]);

  const { name, salary } = state;
  const handleSubmit = (e) => {
    console.log(id, name, salary);
    e.preventDefault();
    if ( !name || !salary) {
      toast.error("Please Enter All Details");
    } else {
      if (!id) {
        axios
          .post(`http://localhost:5000/api`, {
            name,
            salary,
          })
          .then((res) => {
            console.log(res);
            setState({ name: "", salary: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added Successfully");
      } else {
        axios
        .put(`http://localhost:5000/api/${id}`, {
          
          name,
          salary,
        })
        .then((res) => {
          console.log(res);
          setState({ id:'', name: "", salary: "" });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Contact updated Successfully");

      }

      setTimeout(() => {
        history.push("/");
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="YOUR NAME"
          value={name || ""}
          onChange={handleInputChange}
        ></input>

        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          placeholder="YOUR SALARY"
          value={salary || ""}
          onChange={handleInputChange}
        ></input>

        <input type="submit" value={id ? "update" : "save"}></input>
        <Link to="/">
          <input type="button" value="Go Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
