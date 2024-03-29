import SignMessage from "./SignMessage";
import VerifyMessage from "./VerifyMessage";
import * as yup from "yup";

import "./app.styles.css";

// import fonts
import "./fonts/NaverBD-Light.ttf";
import "./fonts/NaverBD-Regular.ttf";
import "./fonts/NaverBD-Bold.ttf";
import "./fonts/NaverBD-ExtraBold.ttf";
import "./fonts/NaverBD-Heavy.ttf";
import "./fonts/nulshock bd.otf";
import { Field, Form, Formik } from "formik";

const FormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  interestedToken: yup.number().required("Interested token is required"),
});

export default function App() {
  const handleSubmit = (values) => {
    let interestedToken = values.interestedToken;

    switch (interestedToken) {
      case 1:
        interestedToken = "100$";
        break;
      case 2:
        interestedToken = "200$";
        break;
      case 3:
        interestedToken = "500$";
        break;
      case 4:
        interestedToken = "1000$";
        break;
      case 5:
        interestedToken = "1000$+";
        break;
    }

    const req_data = {
      data: {
        full_name: values.name,
        email: values.email,
        interested_amount: interestedToken,
      },
    };

    fetch("https://api.asilium.io/api/wishlist-forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req_data),
    });

    console.log(values);
  };

  return (
    <div className="waitlist">
      <div className="w-full lg:w-1/2">
        <SignMessage />
      </div>
      <a href="https://asilium.io/" className="btn-back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="1rem"
          height="1rem"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Return
      </a>
      <a href="/" className="logo-container">
        <img src="/asilium.png" alt="asilium" />
      </a>
      <div>
        <h1 className="waitlist-title">Join the waitlist</h1>
        <h2 className="waitlist-title waitlist-title-second">
          the Manage web3 Relationships
        </h2>
      </div>
      <Formik
        validationSchema={FormSchema}
        validateOnBlur
        validateOnMount
        initialValues={{
          name: "",
          email: "",
          interestedToken: 1,
        }}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="waitlist-form">
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Full name..."
            />
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Email address..."
            />
            <div className="interest-range-slider">
              <label htmlFor="interested-token">I'm interested to buy</label>
              <div className="interest-range-wrapper">
                <div className="interest-range-values">
                  <span>100$</span>
                  <span>200$</span>
                  <span>500$</span>
                  <span>1000$</span>
                  <span>1000$+</span>
                </div>
                <Field
                  type="range"
                  min="1"
                  max="5"
                  name="interestedToken"
                  id="interestedToken"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={errors.email || errors.interestedToken || errors.name}
            >
              Join the waitlist
              <span className="btn-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="1rem"
                  height="1rem"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </button>
          </Form>
        )}
      </Formik>

      <p className="waitlist-text">
        By joining the waitlist, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </p>
    </div>
  );
}
