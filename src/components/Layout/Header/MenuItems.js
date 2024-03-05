import React from "react";
import { Link, useLocation } from "react-router-dom";



const MenuItems = (props) => {
  const { parentMenu } = props;

  const location = useLocation();

  return (
    <React.Fragment>
      <li
        className={
          parentMenu === "home"
            ? "rs-mega-menu menu-item-has-children current-menu-item"
            : "rs-mega-menu menu-item-has-children"
        }
      >
        <Link className="rm-header-title" to="/">Inicio</Link>
      </li>

      <li
        className={
          parentMenu === "course"
            ? "menu-item-has-children current-menu-item"
            : "menu-item-has-children"
        }
      >
        <Link to="/cursos" as="#">
          Cursos
        </Link>
      </li>

      <li
        className={
          parentMenu === "about"
            ? "menu-item-has-children current-menu-item"
            : "menu-item-has-children"
        }
      >
        <Link to="/about-2">Nosotros</Link>
      </li>

      <li
        className={
          parentMenu === "contact"
            ? "menu-item-has-children current-menu-item"
            : "menu-item-has-children"
        }
      >
        <Link to="/contact-2">Contacto</Link>
      </li>
      <li
        className={
          parentMenu === "create"
            ? "menu-item-has-children current-menu-item"
            : "menu-item-has-children"
        }
      >
        <Link to="#">Administrar cursos</Link>
        <ul className="sub-menu">
          <li>
            <Link
              to="/administrar-todos"
              className={location.pathname === "/administrar-todos" ? "active-menu" : ""}
            >
              Administrar cursos
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className={location.pathname === "/create" ? "active-menu" : ""}
            >
              Crear nuevo curso
            </Link>
          </li>
        </ul>
      </li>
    </React.Fragment>
  );
};

export default MenuItems;
