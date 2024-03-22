import SignMessage from "./SignMessage";
import VerifyMessage from "./VerifyMessage";

import "./app.styles.css";

// import fonts
import "./fonts/NaverBD-Light.ttf";
import "./fonts/NaverBD-Regular.ttf";
import "./fonts/NaverBD-Bold.ttf";
import "./fonts/NaverBD-ExtraBold.ttf";
import "./fonts/NaverBD-Heavy.ttf";

export default function App() {
  return (
    <div className="waitlist">
      <div className="w-full lg:w-1/2">
        <SignMessage />
      </div>
      <a href="https://asilium.io/" class="btn-back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="1rem"
          height="1rem"
          strokeWidth="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Return
      </a>
      <a href="/" class="logo-container">
        <img src="/asilium.png" alt="asilium" />
      </a>
      <div>
        <h1 class="waitlist-title">Join the waitlist</h1>
        <h2 class="waitlist-title waitlist-title-second">
          the Manage web3 Relationships
        </h2>
      </div>

      <form class="waitlist-form">
        <input type="text" name="name" id="name" placeholder="Full name..." />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address..."
        />
        <div class="interest-range-slider">
          <label for="interested-token">I'm interested to buy</label>
          <div class="interest-range-wrapper">
            <div class="interest-range-values">
              <span>100$</span>
              <span>200$</span>
              <span>500$</span>
              <span>1000$</span>
              <span>1000$+</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value="0"
              name="interested-token"
              id="interested-token"
            />
          </div>
        </div>
        <button type="submit" disabled={true}>
          Join the waitlist
          <span class="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="1rem"
              height="1rem"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </button>
      </form>

      <p class="waitlist-text">
        By joining the waitlist, you agree to our
        <a href="#">Terms of Service</a> and
        <a href="#">Privacy Policy</a>
      </p>
    </div>
  );
}
