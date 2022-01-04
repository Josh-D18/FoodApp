import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import dataObj from "../../config/config";

export default function SendEmail({ data }) {
  const form = useRef();
  const SendEmailFunc = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        dataObj.serviceID,
        dataObj.templateID,
        form.current,
        dataObj.user_id
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={SendEmailFunc}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <input name="message" value={"Hellos"} type="hidden" />
      <input type="submit" value="Send" />
    </form>
  );
}
