import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch } from 'react-redux'
import boardsSlice from '../redux/boardsSlice'

function AddEditBoardModal({setBoardModalOpen, type}) {

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(true)

  const [newColumns, setNewColumns] = useState(
    [
      {name: 'Por hacer', task: [], id: uuidv4()},
      {name: 'En proceso', task: [], id: uuidv4()},
    ]
  )
  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
        const newState = [...prevState]
        const column = newState.find((col) => col.id === id)
        column.name = newValue
        return newState
    }
    )
  }

  const onDelete = (id) => {
    setNewColumns( (prevState) => prevState.filter((el) => el.id !== id) )
    
  }

  const Validate = () => {
    setIsValid(false)
    if(!name.trim()){
      return false
    }

    for (let i = 0; i<newColumns.length ; i++)  {
        if(!newColumns[i].name.trim()){
          return false
        }
    }

    setIsValid(true)
    return true
  }

  const onSubmit = (type) =>{
    setBoardModalOpen(false)
    if(type === 'agregar'){
      dispatch(boardsSlice.actions.addBoard({name, newColumns}))

    }else{
      dispatch(boardsSlice.actions.editBoard({name, newColumns}))
    }
  }

  return (
    <div
    onClick={(e)=>{
        if(e.target !== e.currentTarget){
          return
        }
        setBoardModalOpen(false)
    }}
    className='
      fixed top-0 left-0 right-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center 
      flex bg-[#00000080]
    '
    >

      {/*Modal Section*/}
      <div
      className='
        scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37]
         text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] 
         max-w-md mx-auto w-full px-8 py-8 rounded-xl
      '
      >
          <h3
          className=' text-lg'
          >
            {type === 'edit' ? 'Editar' : 'Agregar Nuevo'} Tablero
          </h3>

          {/*Task name */}

          <div className=' mt-8 flex flex-col space-y-3'>
              <label className=' text-sm dark:text-white text-gray-500'>
                Nombre del tablero
              </label>
              <input 
              className=' bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600
               focus:outline-[#635fc7] outline-none outline-1 ring-0'
               placeholder=' ej: Diseño Web'
               value={name}
               onChange={(e)=>{
                  setName(e.target.value);
               }}
               id='board-name-input'
              />
          </div>

               {/*Boards columns */}

          <div
          className=' mt-8 flex flex-col space-y-3 '
          >

              <label className=' text-sm dark:text-white text-gray-500'>
                 Columnas del tablero
              </label>

               {
                newColumns.map((column, index) => (
                  <div key={index} className=' flex items-center w-full'>
                      <input 
                      className=' bg-transparent flex-grow px-4 py-2 rounded-md 
                      text-sm border border-gray-600 outline-none focus:outline[#735fc7]
                      '
                      value={column.name}
                      onChange={(e) => {
                          onChange( column.id, e.target.value)
                      }}
                      type="text" />

                      <img src={crossIcon} 
                      className=' cursor-pointer m-4'
                      onClick={() => {
                        onDelete(column.id)
                      }}
                      />
                  </div>
                ))
               }

          </div>

          <div
          className=''
          >
            <button
            className=' items-center w-full hover:opacity-75 dark:text-[#635fc7]
            dark:bg-white mt-2 text-white bg-[#635fc7] py-2 rounded-full'
            onClick={() => {
                setNewColumns( (state)=> [
                ...state,
                {name: '', task: [], id: uuidv4()},
                  ]  )
            }}  
            >
            + Agregar nueva columna
            
            </button>

            <button
            className=' items-center w-full hover:opacity-75 dark:text-white
            dark:bg-[#635fc7] bg-[#635fc7] mt-8 text-white  py-2 rounded-full'
            onClick={
              ()=> {
                const isValid = Validate()
                if(isValid === true) onSubmit(type)
              }
            }
            >
              {type === 'agregar' ? 'Crear nuevo tablero' : 'Guardar cambios'}
            
            </button>

          </div>

      </div>

    </div>
  )
}

export default AddEditBoardModal