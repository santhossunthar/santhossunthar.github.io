import React from 'react'

function Contact() {
    return (
        <div className="container-fluid contact">

        <form action="#">
              <div class="input_group">
                 <input class="btn btn-lg myTexts" name="name" id="name" type="name" placeholder="Name" required/>
                 <input class="btn btn-lg myTexts" name="email" id="email" type="email" placeholder="Email" required/>
                 <textarea class="btn btn-lg myTextArea" name="message" id="message" type="text" placeholder="Message" required/>
 
                 <button class="btn btn-info btn-lg myBtn" type="submit">Send</button>
              </div>
             </form>

        </div>
    )
}

export default Contact
