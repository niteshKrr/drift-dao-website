import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Input, Textarea, Button } from "@nextui-org/react";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [formdata, setformdata] = useState(initialValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  // Validate if a string an email
  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const formSubmit = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { name, email, message } = formdata;
    let msg = "";

    if (name === "") {
      msg = "Please enter your name.";
    } else if (email === "") {
      msg = "Please enter your email.";
    } else if (message === "") {
      msg = "Please enter your message.";
    } else if (validateEmail(email) === false) {
      msg = "Please enter a valid email address";
    }

    if (msg) {
      swal({
        title: "Error!",
        text: msg,
        icon: "error",
        buttons: {
          cancel: {
            text: "Close",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      });
    } else {
      swal({
        title: "Thank you!",
        text: "Thank you, we will soon reach out to you.",
        icon: "success",
      });
      // sendMailToUs(name, email, message);
      setformdata(initialValues);
      const result = await axios({
        method: "post",
        url: "https://www.backend.drift-dao.com/contactForm",
        headers: {
          authorized_access_token:
            process.env.NEXT_PUBLIC_AUTHORIZED_ACCESS_TOKEN,
        },
        data: {
          name,
          email,
          message,
        },
      });
      // console.log(result);
    }
  };

  return (
    <div className="max-w-lg">
      {/* <form className="flex flex-col gap-4"> */}
        <div>
          <div className="mb-2 block">
            <Input
              style={{ color: "white" }}
              width="80%"
              label="Your name"
              id="name11"
              type="text"
              value={formdata.name}
              onChange={handleInputChange}
              name="name"
              required={true}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Input
              width="80%"
              label="Your email"
              id="email1"
              type="email"
              value={formdata.email}
              onChange={handleInputChange}
              name="email"
              placeholder="@drift-dao.com"
              required={true}
            />
          </div>
        </div>

        <div id="textarea">
          <div className="mb-2 block">
            <Textarea
              width="80%"
              label="Your message"
              id="comment"
              value={formdata.message}
              onChange={handleInputChange}
              name="message"
              placeholder="Leave a comment..."
              required={true}
              rows={4}
            />
          </div>
        </div>
        <div>
          <Button
            shadow
            color="success"
            onClick={formSubmit}
            type="submit"
            auto
          >
            Submit
          </Button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default ContactForm;
