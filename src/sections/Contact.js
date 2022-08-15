import React, {forwardRef, useState} from 'react';
import emailjs from 'emailjs-com';
import lhs from '../media/multicolor-left-bg.png';
import rhs from '../media/multicolor-right-bg.png';

function Contact(props, ref) {
    const [selected, select] = useState('DEFAULT');
    const [position, selectPosition] = useState('DEFAULT')

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_USER_ID)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });

        e.target.reset();
        select('DEFAULT');
    }

    const renderForm = () => {
        if(selected === 'Ventures') {
            return(
                <>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="First Name" name="firstName" required/>
                        <input type="text" className="form-half" placeholder="Last Name" name="lastName" required/>
                    </div>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="City" name="city" required/>    
                        <input type="text" className="form-half" placeholder="Country" name="country" required/>
                    </div>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="Company" name="company" required/>    
                        <input type="text" className="form-half" placeholder="Job Title" name="job_title" required/>
                    </div>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="Phone Number" name="phone" required/>    
                        <input type="text" className="form-half" placeholder="Email" name="email" required/>
                    </div>
                    <div className="form-row">
                        <textarea className='form-input' placeholder='Description' rows="10" required name='description'></textarea>
                    </div>
                    <div className="form-row">
                        <textarea className='form-input' placeholder='How did you hear about us?' rows="5" required name='message'></textarea>
                    </div>
                    <div className="form-row form-action">
                        <button className="btn btn--outline btn--large" type="submit"><i className="far fa-envelope"/> Submit</button>
                    </div>
                </>
            );
        }else if(selected === 'Careers') {
            return(
                <>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="First Name" name="firstName" required/>
                        <input type="text" className="form-half" placeholder="Last Name" name="lastName" required/>
                    </div>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="City" name="city" required/>    
                        <input type="text" className="form-half" placeholder="Country" name="country" required/>
                    </div>
                    <div className="form-row">
                        <input type="text" className="form-full" placeholder="LinkedIn" name="linkedin" required/>    
                    </div>
                    <div className="form-row">
                        <input type="text" className="form-half" placeholder="Phone Number" name="phone" required/>    
                        <input type="text" className="form-half" placeholder="Email" name="email" required/>
                    </div>
                    <div className="form-row">
                        <select name="position" id="form-subject" value={position} className="form-full select-form" onChange={(e) => selectPosition(e.target.value)} required>
                            <option value="DEFAULT" disabled>Position</option>
                            <option value="Quantitative Trade">Quantitative Trader</option>
                            <option value="Research / Investing Analyst">Research / Investing Analyst</option>
                            <option value="Full Stack Engineer">Full Stack Engineer</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <textarea className='form-input' placeholder='How did you hear about us?' rows="5" required name='message'></textarea>
                    </div>
                    <div className="form-row form-action">
                        <button className="btn btn--outline btn--large" type="submit"><i className="far fa-envelope"/> Submit</button>
                    </div>
                </>
            );
        }

    }

    return (
        <div ref={ref}>
            <div className='contact-section'>
                <div className="contact-bg-right-wrapper">
                    <img src={rhs} alt="mc" className="contact-bg-right"/>
                </div>
                <div className="contact-container">
                    <h1 className="contact-header">CONTACT US</h1>
                    <form className="contact-form" onSubmit={sendEmail}>
                        <div className="form-row">
                            <select name="subject" id="form-subject" value={selected} className="form-full select-subject" onChange={(e) => select(e.target.value)} required>
                                <option value="DEFAULT" disabled>Subject</option>
                                <option value="Ventures">Ventures</option>
                                <option value="Careers">Careers</option>
                            </select>
                        </div>
                        {renderForm()}
                    </form>
                </div>
                <div className="contact-bg-left-wrapper">
                    <img src={lhs} alt="mc" className="contact-bg-left"/>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Contact);
