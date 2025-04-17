import './Contact.css';
import { useState } from 'react';

// Contact page
function Contact() {
  // React variables using useState hook [variable, function to update variable, use state has initial value]
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Takes in a react.FormEvent e
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent page reloading
    e.preventDefault();

    // Checks if required fields are empty, alerts if true and exit early
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // If all fields are filled out, set submitted state to true
    setSubmitted(true);
  };

  return (
    // Container for contact page
    <div className="contact-container">
      <h1>Contact us!</h1>

      {/* Conditional Operator, if not submitted render form. If submitted render text below */}
      {!submitted ? (
        // Overall form structure
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {/* Short answer/message field */}
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </div>
          {/* Submit button, autmatically linked to submit for event */}
          <button type="submit" className="contact-us-submit-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="contact-message-container">
          <div className="contact-message">Thank you for your message, it has been received by the OBT team!</div>
          <div className="contact-message">We will respond within 24 hours to your email address from support@obt.com</div>
        </div>
      )}
    </div>
  );
}
export default Contact;
