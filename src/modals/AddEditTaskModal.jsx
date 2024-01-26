import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch, useSelector } from 'react-redux'
import boardsSlice from '../redux/boardsSlice'

function AddEditTaskModal({ type, device, setOpenAddEditTask, taskIndex, prevColIndex = 0}) {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isValid, setIsValid] = useState(true)

  const board = useSelector((state)=> state.boards).find(
    (board) => board.isActive)
  const columns = board.columns
  const col = columns.find((col, index) => index === prevColIndex)
  
  const [status, setStatus] = useState(columns[prevColIndex].name)
  const [newColIndex, setNewColIndex] = useState(prevColIndex)

  const [subTasks, setSubTasks] = useState(
    [
      {title: '', isCompleted: false, id: uuidv4()},
      {title: '', isCompleted: false, id: uuidv4()},
    ]
  )
  const onChange = (id, newValue) => {
    setSubTasks((prevState) => {
        const newState = [...prevState]
        const subTask = newState.find((subTask) => subTask.id === id)
        subTask.title = newValue
        return newState
    }
    )
  }
  const onChangeStatus = (e) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  const onDelete = (id) => {
    setSubTasks( (prevState) => prevState.filter((el) => el.id !== id) )
    
  }

  const Validate = () => {
    setIsValid(false)
    if(!title.trim()){
      return false
    }

    for (let i = 0; i<subTasks.length ; i++)  {
        if(!subTasks[i].title.trim()){
          return false
        }
    }

    setIsValid(true)
    return true
  }

  const onSubmit = (type) =>{
    if(type === 'agregar'){
      dispatch(boardsSlice.actions.addTask({title, description, subTasks, status, newColIndex}))
    }else{
      dispatch(boardsSlice.actions.editTask({title, description, subTasks, status, taskIndex, prevColIndex, newColIndex}))
    }
  }

 
  return (
    <div
    onClick={(e)=> {
        if(e.target !== e.currentTarget){
            return 
        }
        setOpenAddEditTask(false)
    }}
    className={
        device === 'mobile' ? ' px-6 py-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]' : 
        ' px-6 py-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]'

    }
    >
      {/*Modal section*/}

      <div
        className=' scrollbar-hide overflow-y-scroll max-h-[95hv] my-auto bg-white
         dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md
          shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl '
        >

          <h3
          className=' text-lg'
          >
            {type === 'edit' ? 'Editar' : 'Agregar Nueva'} Tarea
          </h3>


          {/* Task name*/}
        <div className=' mt-8 flex flex-col space-y-1'>
              <label className=' text-sm dark:text-white text-gray-500'>
                Nombre de la Tarea
              </label>
              <input 
              className=' bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600
               focus:outline-[#635fc7] outline-none ring-0 focus:border-0' 
               placeholder=' ej: Tomar una taza de cafe'
               type="text"
               value={title}
               onChange={(e)=>{
                  setTitle(e.target.value);
               }}
               id="task-name-input"
              />
        </div>

        {/* Description*/}
        <div className=' mt-8 flex flex-col space-y-1'>
              <label className=' text-sm dark:text-white text-gray-500'>
                Descripción
              </label>
              <textarea 
              className=' bg-transparent px-4 py-2 items-start min-h-[200px] rounded-md text-sm border border-gray-600
               focus:outline-[#635fc7] outline-none ring-0 focus:border-0' 
               placeholder=' ej: Siempre es un buen momento para tomar una pausa'
               value={description}
               id="task-description-input"
               onChange={(e)=>{
                  setDescription(e.target.value);
               }}
              />
        </div>

        {/*Sub Task Section*/}


        <div
          className=' mt-8 flex flex-col space-y-1 '
          >
              <label className=' text-sm dark:text-white text-gray-500'>
                 Subtareas
              </label>

               {
                subTasks.map((subTask, index) => (
                  <div key={index} className=' flex items-center w-full'>
                      <input 
                      className=' bg-transparent flex-grow px-4 py-2 rounded-md 
                      text-sm border border-gray-600 outline-none focus:outline[#735fc7]
                      '
                      value={subTask.title}
                      onChange={(e) => {
                          onChange( subTask.id, e.target.value)
                      }}
                      type="text" />

                      <img src={crossIcon} 
                      className=' cursor-pointer m-4'
                      onClick={() => {
                        onDelete(subTask.id)
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
              setSubTasks( (state)=> [
                ...state,
                {title: '', isCompleted: false, id: uuidv4()},
                  ]  )
            }}  
            >
            + Agregar Nueva Subtarea
            
            </button>
          </div>

          {/*Current Status Section*/}

          <div
          className=' mt-8 flex flex-col space-y-3'
          >
            <label 
            className=' text-sm dark:text-white text-gray-500'
            >
            Estado actual
            </label>
            <select 
            value={status}
            onChange={onChangeStatus}
            className=' select-status flex flex-grow px-4 py-2
            rounded-md text-sm bg-transparent focus:border-0
             border border-gray-300 focus:outline-[#635fc7]
              outline-none '
            >
              { columns.map((column , index) => (
                <option 
                key={index}
                >
                  {column.name}
                </option>
              ))}
            </select>

          </div>
          
          <div>
            <button
            className=' items-center w-full hover:opacity-75 dark:text-white
            dark:bg-[#635fc7] bg-[#635fc7] mt-8 text-white  py-2 rounded-full'
            onClick={
              ()=> {
                const isValid = Validate()
                if(isValid === true) 
                {
                onSubmit(type)
                setOpenAddEditTask(false)
                }
              }
            }
            >
              {type === 'editar' ? 'Guardar cambios' : 'Crear Nueva Tarea'}
            
            </button>
          </div>
      </div>


    </div>

        
    
  )
}

export default AddEditTaskModal