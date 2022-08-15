import React,{useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Digital from '../media/digital.png';
import '../style/Navbar.css';

function Navbar({refPortfolio, refTeam, refAbout, refContact}) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [inView, setInView] = useState([false,false,false,false]);

    const handleClick = () => {
        setClick(!click);
        if(click) {
            console.log(click);
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };
    const closeMobileMenu = () => {
        setClick(false);
        document.body.style.overflow = 'unset';
    };

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const location = useLocation().pathname;

    const scrollToSection = (section) => {
        if(section===1){
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        else if(section===2)
        {
            if(location === '/') {
                refPortfolio.current.scrollIntoView({behavior: 'smooth'});
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        else if(section===3)
        {
            if(location === '/') {
                refTeam.current.scrollIntoView({behavior: 'smooth'});
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        else if(section===4)
        {
            if(location === '/') {
                refAbout.current.scrollIntoView({behavior: 'smooth'});
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        else if(section===5)
        {
            if(location === '/') {
                refContact.current.scrollIntoView({behavior: 'smooth'});
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    useEffect(() => {
        const highlightLink = () => {
            let offsetTop = window.scrollY;
            let topOffset = 200;
            let offsets = {
                'about': refAbout.current ? refAbout.current.offsetTop - topOffset : 1000,
                'portfolio': refPortfolio.current ? refPortfolio.current.offsetTop - topOffset : 2000,
                'team': refTeam.current ? refTeam.current.offsetTop - topOffset : 3000,
                'contact': refContact.current ? refContact.current.offsetTop - topOffset : 4000
            }
            if(offsets.about <= offsetTop && offsetTop <= offsets.portfolio)
                setInView([true,false,false,false]);
            else if(offsets.portfolio <= offsetTop && offsetTop <= offsets.team)
                setInView([false,true,false,false]);
            else if(offsets.team <= offsetTop && offsetTop <= offsets.contact)
                setInView([false,false,true,false]);
            else if(offsets.contact <= offsetTop)
                setInView([false,false,false,true]);
            else
                setInView([false,false,false,false]);
        }

        window.addEventListener('resize', showButton);
        window.addEventListener('scroll', highlightLink);

        return () => {
            window.removeEventListener('resize', showButton);
            window.removeEventListener('scroll', highlightLink);
          }
    }, [refAbout, refContact, refPortfolio, refTeam])

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={()=>{
                    closeMobileMenu();
                    scrollToSection(1);
                }}>
                    <img className="igital" src={Digital} alt='DigitalEyes'/>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className={inView[0] ? "nav-links active nav-about" : "nav-links passive nav-about"} onClick={()=>{
                            closeMobileMenu();
                            scrollToSection(4);
                            }}>
                                About
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/" className={inView[1] ? "nav-links active nav-port" : "nav-links passive nav-port"} onClick={()=>{
                        closeMobileMenu();
                        scrollToSection(2);
                        }}>
                            Portfolio
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link to="/" className={inView[2] ? "nav-links active nav-team" : "nav-links passive nav-team"} onClick={()=>{
                            closeMobileMenu();
                            scrollToSection(3);
                            }}>
                                Team
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className={inView[3] ? "nav-links active nav-contact" : "nav-links passive nav-contact"} onClick={()=>{
                            closeMobileMenu();
                            scrollToSection(5);
                            }}>
                                Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar
