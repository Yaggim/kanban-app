import React, { useState } from 'react'
import logo from '../assets/logo-mobile.svg';
import iconDown from '../assets/icon-chevron-down.svg';
import iconUp from '../assets/icon-chevron-up.svg'
import elipsis from '../assets/icon-vertical-ellipsis.svg';
import HeaderDropdown from './HeaderDropdown';
import AddEditBoardModal from '../modals/AddEditBoardModal';
import AddEditTaskModal from '../modals/AddEditTaskModal';
import { useDispatch, useSelector } from 'react-redux'

function Header({boardModalOpen, setBoardModalOpen}) {


    const dispatch = useDispatch()
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openAddEditTask, setOpenAddEditTask] = useState(false)
    const [boardType, setBoardType] = useState('agregar')
    const boards = useSelector((state)=> state.boards)
    const board = boards.find(board => board.isActive)

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">

        <header className=" flex justify-between dark:text-white items-center  ">

            {/*Left Side*/}

            <div className=" flex items-center space-x-2  md:space-x-4">
                <img src={logo} alt="logo" className=" h-6 w-6"/>
                <h3 className=" md:text-4xl  hidden md:inline-block font-bold 
                font-sans">
                    kanban
                </h3>

                <div className=' flex items-center'>
                    <h3 className=" truncate max-w-[300px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
                        {board.name}
                    </h3>
                    <img src={openDropdown ? iconUp : iconDown} alt="dropdown icon" className=' w-3 ml-2 cursor-pointer md:hidden '
                    onClick={() => setOpenDropdown(state => !state) }
                    ></img>
                </div>
            </div>

            {/*Right side*/}

            <div className=" flex space-x-4 items-center md:space-x-6">
                <button className="hidden md:block button">
                    + Agregar nueva tarea
                </button>

                <button 
                onClick={() => {
                    setOpenAddEditTask(state => !state)
                }}
                className="button py-1 px-3 md:hidden">
                    +
                </button>

                <img src={elipsis} alt="elipsis" className=" cursor-pointer h-6 " />
            </div>

        </header>

        {openDropdown && <HeaderDropdown setBoardModalOpen={setBoardModalOpen}
        setOpenDropdown={setOpenDropdown}/>}

        {
            boardModalOpen && <AddEditBoardModal type={boardType} setBoardModalOpen={setBoardModalOpen}/>
        }


        {openAddEditTask && <AddEditTaskModal device='mobile' setOpenAddEditTask={setOpenAddEditTask} type={'agregar'}/>

        }

    </div>
  )
}

export default Header