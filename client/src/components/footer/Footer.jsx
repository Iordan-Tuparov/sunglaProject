import "./Footer.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <footer>
            <p>&copy; 2023 Your Website Name</p>
            <p>Designed by Iordan Typarow</p>
            <a href="https://www.facebook.com/profile.php?id=100084871037402"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.instagram.com/_tuparow_"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://www.linkedin.com/in/iordan-typarov-5848b3299"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://github.com/IordanTyparow"><FontAwesomeIcon icon={faGithub} /></a>
        </footer>
    )
}