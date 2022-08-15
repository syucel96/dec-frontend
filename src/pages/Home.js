import React, {forwardRef} from 'react';
import {HeroSection, Portfolio, Team, Contact, About} from '../sections';
import '../style/Home.css';

function Home({refPortfolio, refTeam, refAbout, refContact, scrollToSection}, ref) {
    return (
        <>
            <HeroSection scrollToSection={scrollToSection}/>
            <About ref={refAbout} />
            {/* <Portfolio ref={refPortfolio} /> */}
            <Team ref={refTeam} />
            <Contact ref={refContact} />
        </>
    );
}

export default forwardRef(Home);
