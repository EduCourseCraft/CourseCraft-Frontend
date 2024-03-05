import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const RSMobileMenu = ({ setMenuOpen, menuOpen, parentMenu, secondParentMenu, headerFullWidth }) => {

 const location = useLocation();

 const [home, setHome] = useState(false)
 const [about, setAbout] = useState(false)
 const [course, setCourse] = useState(false)
 const [pages, setPages] = useState(false)
 const [team, setTeam] = useState(false)
 const [event, setEvent] = useState(false)
 const [gallery, setGallery] = useState(false)
 const [shop, setShop] = useState(false)
 const [otherPages, setOtherPages] = useState(false)
 const [blog, setBlog] = useState(false)
 const [blogSidebar, setBlogSidebar] = useState(false)
 const [blogSingle, setBlogSingle] = useState(false)
 const [contact, setContact] = useState(false)

 const openMobileMenu = menu => {

  if (menu === 'home') {
   setHome(!home)
   setAbout(false)
   setCourse(false)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'about') {
   setHome(false)
   setAbout(!about)
   setCourse(false)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'course') {
   setHome(false)
   setAbout(false)
   setCourse(!course)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'pages') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(!pages)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'team') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(true)
   setTeam(!team)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'event') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(true)
   setTeam(false)
   setEvent(!event)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'gallery') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(true)
   setTeam(false)
   setEvent(false)
   setGallery(!gallery)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'shop') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(true)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(!shop)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'otherPages') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(true)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(!otherPages)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'blog') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(!blog)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'blogSidebar') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(true)
   setBlogSidebar(!blogSidebar)
   setBlogSingle(false)
   setContact(false)
  }
  else if (menu === 'blogSingle') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(true)
   setBlogSidebar(false)
   setBlogSingle(!blogSingle)
   setContact(false)
  }
  else if (menu === 'contact') {
   setHome(false)
   setAbout(false)
   setCourse(false)
   setPages(false)
   setTeam(false)
   setEvent(false)
   setGallery(false)
   setShop(false)
   setOtherPages(false)
   setBlog(false)
   setBlogSidebar(false)
   setBlogSingle(false)
   setContact(!contact)
  }
 };

 return (
  <div className={headerFullWidth ? "container-fluid relative" : "container relative"}>
   <div className={menuOpen ? "mobile-menu-part open" : "mobile-menu-part"}>
    <div className="mobile-menu">
     <ul className="nav-menu">

      <li className={home ? "menu-item-has-children current-menu-item" : "menu-item-has-children"}>
       <Link to="/home" onClick={() => { openMobileMenu('home'); }} className={parentMenu === 'home' ? 'active-menu' : ''}>Inicio</Link>
      </li>

      <li className={about ? "menu-item-has-children current-menu-item" : "menu-item-has-children"}>
       <Link to="/about-2" onClick={() => { openMobileMenu('about'); }} className={parentMenu === 'about' ? 'active-menu' : ''}>Nosotros</Link>
      </li>

      <li className={course ? "menu-item-has-children current-menu-item" : "menu-item-has-children"}>
       <Link to="/course-2" onClick={() => { openMobileMenu('course'); }} className={parentMenu === 'course' ? 'active-menu' : ''}>Cursos</Link>
      </li>

      <li className={contact ? "menu-item-has-children current-menu-item" : "menu-item-has-children"}>
       <Link to="/contact-2" onClick={() => { openMobileMenu('contact'); }} className={parentMenu === 'contact' ? 'active-menu' : ''}>Contacto</Link>
      </li>

      <li className={contact ? "menu-item-has-children current-menu-item" : "menu-item-has-children"}>
       <Link to="#" onClick={() => { openMobileMenu('contact'); }} className={parentMenu === 'contact' ? 'active-menu' : ''}>Administrar cursos</Link>
       <ul className={contact ? "sub-menu current-menu" : "sub-menu"}>

        <li>
         <Link to="/administrar-todos" className={location.pathname === "/administrar-todos" ? "active-menu" : ""}>Crear curso</Link>
        </li>

        <li>
         <Link to="/create" className={location.pathname === "/create" ? "active-menu" : ""}>Crear curso</Link>
        </li>

       </ul>
      </li>

     </ul>
    </div>
   </div>
  </div>
 )
}

export default RSMobileMenu;