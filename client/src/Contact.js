import React from 'react'

function Contact() {
  return (
    <div className='contact'>
       <div className="container">
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to get in touch with us. We'd love to hear from you!</p>
        <form className='contactform'>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Contact
