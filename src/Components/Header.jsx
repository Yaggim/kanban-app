import React, { useState } from 'react';
import logo from '../assets/logo-mobile.svg';
import iconDown from '../assets/icon-chevron-down.svg';
import iconUp from '../assets/icon-chevron-up.svg';
import elipsis from '../assets/icon-vertical-ellipsis.svg';
import HeaderDropdown from './HeaderDropdown';

function Header() {
    // Estado para controlar si el menú desplegable está abierto o cerrado
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
            {/* Encabezado */}
            <header className="flex justify-between dark:text-white items-center">
                {/* Lado izquierdo */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Logo */}
                    <img src={logo} alt="logo" className="h-6 w-6" />
                    {/* Título */}
                    <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
                        kanban
                    </h3>
                    {/* Nombre del tablero y botón desplegable */}
                    <div className='flex items-center'>
                        <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
                            board Name
                        </h3>
                        <img
                            src={openDropdown ? iconUp : iconDown}
                            alt="dropdown icon"
                            className='w-3 ml-2 cursor-pointer md:hidden'
                            onClick={() => setOpenDropdown(state => !state)}
                        />
                    </div>
                </div>
                {/* Lado derecho */}
                <div className="flex space-x-4 items-center md:space-x-6">
                    {/* Botón para agregar nueva tarea (visible en dispositivos grandes) */}
                    <button className="hidden md:block button">
                        + Add new task
                    </button>
                    {/* Botón para agregar nueva tarea (visible en dispositivos pequeños) */}
                    <button className="button py-1 px-3 md:hidden">
                        +
                    </button>
                    {/* Ícono de puntos suspensivos para menú */}
                    <img src={elipsis} alt="elipsis" className="cursor-pointer h-6" />
                </div>
            </header>
            {/* Menú desplegable (se renderiza si openDropdown es true) */}
            {openDropdown && <HeaderDropdown setOpenDropdown={setOpenDropdown} />}
        </div>
    );
}

export default Header;