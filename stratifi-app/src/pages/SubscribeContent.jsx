import React, { Component } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import Input from "../components/common/input";
import Joi from "joi-browser";
import backgroundfooter from "../images/backgroundfooter.svg";
import MailchimpDownload from "../components/mailchimpDownload";
import logo from "../images/logo.png";

class SubscribeContent extends Component {
  state = {
    account: {
      email: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
  };

  validateOnChange = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    console.log(errors);
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    // console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateOnChange(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    const url =
      "https://app.us13.list-manage.com/subscribe/post?u=311327338697ce69baa12d960&amp;id=3f88d6e974&amp;f_id=00c297e2f0";

    return (
      <div
        style={{ backgroundImage: `url(${backgroundfooter})` }}
        className="flex justify-center  h-screen"
      >
        <div className="flex flex-col gap-4 justify-center my-auto bg-white w-4/5 lg:w-5/12 h-auto rounded-xl shadow-2xl">
          <div className="flex flex-col mx-auto mt-5">
            <h1 className=" mx-auto text-xl lg:text-2xl font-bold text-gray-800">
              Hey there!
            </h1>
            <span className="mx-auto text-center text-gray-800 text-sm lg:text-base lg:w-full w-10/12">
              Enter your email below to download your free package
            </span>
          </div>
          <MailchimpDownload url={url} />

          <div className="flex flex-col mx-auto mb-5">
            <span className="text-center text-gray-800 text-sm">
              Don't have an account yet?{" "}
              <Link
                className="underline underline-offset-2 text-sm"
                to="/register"
              >
                Sign Up
              </Link>
            </span>
            <div className="items-center flex flex-col  ">
              <img className="mx-auto w-[3rem]" src={logo} alt="" srcSet="" />
              <span className="font-black text-slate-700 text-lg my-auto">
                STRATIFI.NG
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscribeContent;

// a basic form
// const SimpleFormDownload = ({
//   status,
//   message,
//   className,
//   style,
//   onSubmitted,
// }) => {
//   let input;
//   const submit = () =>
//     input &&
//     input.value.indexOf("@") > -1 &&
//     onSubmitted({
//       EMAIL: input.value,
//     });

//   return (
//     <div>
//       <div className="flex form-input h-10 w-80 mt-5 rounded p-1" style={style}>
//         <input
//           ref={(node) => (input = node)}
//           className="border-0 p-0 focus:ring-0 w-0 grow text-center text-black"
//           type="email"
//           placeholder="Enter your email address"
//         />
//         <button
//           className=" block px-4 bg-[#FF8F50] hover:bg-[#FF7A30] active:bg-[#FF6610] ring-1 ring-[#FF7A30] rounded"
//           onClick={submit}
//         >
//           Submit
//         </button>
//       </div>
//       {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
//       {status === "error" && (
//         <div
//           style={{ color: "red" }}
//           dangerouslySetInnerHTML={{ __html: message }}
//         />
//       )}
//       {status === "success" && (
//         <div
//           style={{ color: "green" }}
//           dangerouslySetInnerHTML={{ __html: message }}
//         />
//       )}
//     </div>
//   );
// };

// export default SimpleFormDownload;
