import React from 'react';
// import { menuItem } from './Data';
import { menuItem } from './menuItem';
import { Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BiX } from "react-icons/bi";
import  "./MenuBar.css";

type menuBarProps = {
    isMenuBar: boolean,
    setIsMenuBar: any
}

const MenuBar = ({ isMenuBar, setIsMenuBar }: menuBarProps) => {
    const screenWidth = useSelector((state: any) => state.layout.currentScreenWidth);
    const bankLogo = useSelector((state: any) => state.layout.bankLogo);

    return (
        <>
            {isMenuBar && <div className={`${screenWidth <= 875 && "bg-mobile"}`}></div>}

            {screenWidth >= 875 ?
                <div className="header-Container">
                    <Container className="d-flex p-2" >
                        {menuItem.map((items:any) => {
                            const { Icon } = items;
                            return (
                                <NavLink
                                    key={items.id}
                                    to={items.link}
                                    className="mainMenu d-flex justify-content-center align-items-center"
                                >
                                    <Icon className='manuIcon' />
                                    <span className="ms-1 text-sm menuText">{items.name}</span>
                                </NavLink>
                            )
                        })}
                    </Container>
                </div>
                :
                <div className={`sidebar ${screenWidth <= 875 && isMenuBar ? 'MobileSidebar' : "hideSidebar"}`}>
                    {isMenuBar &&
                        <div className='top-section'>
                            <Link to="/dashboard" className="logo" onClick={() => setIsMenuBar(false)}>
                                <img src={bankLogo.mainLogo} alt="logo" />
                            </Link>

                            {screenWidth <= 875 &&
                                <div className="close-menu">
                                    <Button className="border-0 bg-transparent" onClick={() => setIsMenuBar(false)}>
                                        <BiX />
                                    </Button>
                                </div>}
                        </div>
                    }

                    <div className="main-menu" style={{ marginTop: 60 }}>
                        <ul>
                            {menuItem.map((items:any) => {
                                const { Icon } = items;
                                return (
                                    <li key={items.id} className='my-2 '>
                                        <NavLink className='menu-link' to={items.link} onClick={() => setIsMenuBar(false)}>
                                            <span className="menu-icon" style={{ flexGrow: 0 }}>
                                                <Icon />
                                            </span>
                                            <div className="text-sm menu-title" style={{ flexGrow: 1 }}>
                                                {items.name}
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default MenuBar