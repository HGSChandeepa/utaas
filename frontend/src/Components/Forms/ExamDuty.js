import React from 'react'
import Input from '../Input/Input'

const ExamDuty = () => {
  return (
    <div>
        <form>
            <Input label={"Date"} type={"date"} placeholder={"2021-09-01"} />    
             <Input label={"Time"} type={"time"} placeholder={"14:00"} /> 
             <Input label={"Location"} type={"text"} placeholder={"2"} />
             <Input label={"Duty / Role"} type={"text"} placeholder={"Invigilator"} />
             <Input label={"Number of Students"} type={"number"} placeholder={"120"} />
         </form>
    </div>
  )
}

export default ExamDuty