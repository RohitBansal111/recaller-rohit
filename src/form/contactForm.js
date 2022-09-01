import React from "react";

const ContactForm = (props) => {
  return (
    <form className="main-form">
      <div className="field-group flexFull">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Contact Name"
          name="name"
          onChange={props.onChange}
        />
        <span className="spanError">{props.errors.name}</span>
      </div>
      <div className="field-group flex2">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Phone"
          name="phone"
          onChange={props.onChange}
        />
        <span className="spanError">{props.errors.phone}</span>
      </div>
      <div className="field-group flex2">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          name="email"
          onChange={props.onChange}
        />
        <span className="spanError">{props.errors.email}</span>
      </div>
    </form>
  );
};

export default ContactForm;
