import React, { useState, useEffect } from 'react'

import * as api from './api/apiService'


export default function App() {
  const [allGrades, setAllGrades] = useState([])
  const [selectedGrade, setSelectedGrade] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getGrades = async() => {
      const grades = await api.getAllGrades()
      setTimeout(()=>{
        setAllGrades(grades)
      }, 2000)
    }

    /* api.getAllGrades().then((grades)=>{
      setTimeout(()=>{
        setAllGrades(grades)
      }, 2000)
    }) */
    
    getGrades()
  }, [])



  return (
    <div>
      <h1 className="center">Controle de Notas</h1>

      {allGrades.length > 0 && <p>Notas disponíveis</p> }
      {allGrades.length === 0 && <p>Carregando notas...</p> }
    </div>
  )
  
}
