import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import boardIcon from '../assets/icon-board.svg';
import lightIcon from '../assets/icon-light-theme.svg';
import darkIcon from '../assets/icon-dark-theme.svg';
import { Switch } from '@headlessui/react';
import useDarkMode from '../Hooks/useDarkMode';

function HeaderDropdown({ setOpenDropdown }) {

    // Custom hook para manejar el tema oscuro
    const [colorTheme, setColorTheme] = useDarkMode();
    // Estado local para controlar el lado oscuro del tema
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false 
    );

    // Función para manejar el cambio de modo oscuro
    const toggleDarkMode = (checked) => {
        setColorTheme(colorTheme);  // <- Este línea no tiene efecto, puede eliminarse
        setDarkSide(checked);
    };

    // Seleccionar el estado de 'boards' desde Redux
    const boards = useSelector((state) => state.boards);

    console.log('boards =', boards);

    return (
        <div className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenDropdown(false);
            }}
        >
            {/* Dropdown modal */}
            <div className='bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364ef31a] w-full
                py-4 rounded-xl'>
                <h3 className='dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'>
                    All boards ({boards?.length})
                </h3>

                <div>
                    {/* Mapeo de boards para mostrar en el dropdown */}
                    {boards?.map((board, index) => (
                        <div
                            className={`flex items-baseline space-x-2 px-5 py-4 dark:text-white
                                ${board.isActive && 'bg-[#625fc7] rounded-r-full text-white mr-8'}`}
                            key={index}
                        >
                            <img src={boardIcon} alt={board} className="h-4"></img>
                            <p className='text-lg font-bold'>{board.name}</p>
                        </div>
                    ))}
                    
                    {/* Crear un nuevo tablero */}
                    <div
                        className='flex items-baseline space-x-2 text-[#635fc7] px-5 py-4'>
                        <img src={boardIcon} alt="" className="h-4"/>
                        <p className='text-lg font-bold'>Create New Board</p>
                    </div>

                    {/* Sección de cambio de tema */}
                    <div
                        className='mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center
                            rounded-lg'>
                        <img src={lightIcon} alt="Light Theme Icon"/>

                        {/* Switch para cambiar entre tema claro y oscuro */}
                        <Switch
                            checked={darkSide}
                            onChange={toggleDarkMode}
                            className={` ${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6
                                w-11 items-center rounded-full `}
                        >
                            <span
                                className={` ${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 
                                    transform transition rounded-full bg-white`}
                            ></span>
                        </Switch>

                        <img src={darkIcon} alt="Dark Theme Icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderDropdown;