import React from 'react';
import '../style/Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <div className="footer-info-container">
                <div className="footer-social-container">
                    <a 
                        className='footer-social-icon footer-mail'
                        href='mailto:ir@digitaleyes.capital'
                        aria-label='Mail'
                    >
                        <i className='fas fa-envelope fa-2x' />
                    </a>
                    <a 
                        className='footer-social-icon footer-linkedin'
                        href='https://www.linkedin.com/'
                        target='_blank'
                        rel="noopener noreferrer"
                        aria-label='LinkedIn'
                    >
                        <i className='fab fa-linkedin fa-2x' />
                    </a>
                    <a 
                        className='footer-social-icon footer-twitter'
                        href='https://twitter.com/'
                        target='_blank'
                        rel="noopener noreferrer"
                        aria-label='Twitter'
                    >
                        <i className='fab fa-twitter fa-2x' />
                    </a>
                    <a 
                        className='footer-social-icon footer-medium'
                        href='https://medium.com/'
                        target='_blank'
                        rel="noopener noreferrer"
                        aria-label='Medium'
                    >
                        <i className='fab fa-medium fa-2x' />
                    </a>
                </div>
                <div className="footer-address">
                    36 Hope St; Douglas, Isle of Man IM1 1AR, Isle of Man.
                </div>
            </div>
            <div className="footer-site-rights">
                <small className="footer-site-text">Digital Eyes Capital Ltd ®</small>
            </div>
        </div>
    )
}

export default Footer
