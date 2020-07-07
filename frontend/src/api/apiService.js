import axios from 'axios'

const API_URL = 'http://localhost:3001/grade/'

const GRADE_VALIDATION = [
    {
        id: 1,
        gradeType: 'Exercícios',
        minValue: 0,
        maxValue: 10,
    },
    {
        id: 2,
        gradeType: 'Trabalho Prático',
        minValue: 0,
        maxValue: 40,
    },
    {
        id: 3,
        gradeType: 'Desafio',
        minValue: 0,
        maxValue: 50,
    },
]

async function getAllGrades(){
    const res = await axios.get(API_URL)

    const grades = res.data.grades.map((grade)=>{
        const {student, subject, type} = grade

        return {
            ...grade,
            studentLowerCase: student.toLowerCase(),
            subjectLowerCase: subject.toLowerCase(),
            typeLowerCase: type.toLowerCase(),
            isDeleted: false
        }
    })
    //Forma um conjunto de dados para se ter dados únicos
    let allStudents = new Set()
    grades.forEach(grade => allStudents.add(grade.student))
    //Transforma em array
    allStudents=Array.from(allStudents)

    let allSubjects = new Set()
    grades.forEach(grade => allSubjects.add(grade.subject))
    allSubjects=Array.from(allSubjects)
    
    let allTypes = new Set()
    grades.forEach(grade => allTypes.add(grade.type))
    allTypes=Array.from(allTypes)

    const allCombinations = []
    allStudents.forEach(student=>{
        allSubjects.forEach(subject=>{
            allTypes.forEach(type=>{
                allCombinations.push({
                    student,
                    subject,
                    type,
                })
            })
        })
    })

    allCombinations.forEach(({student, subject, type})=>{
        const hasItem = grades.find((grade)=>{
            grade.subject = subject && grade.student === student && grade.type === type
        })

        if(!hasItem){
            //adicionando um item que não existe no back-end
            grades.push({
                id: grades.length+1,
                student,
                studentLowerCase: student.toLowerCase(),
                subject,
                subjectLowerCase: subject.toLowerCase(),
                type,
                typeLowerCase: type.toLowerCase(),
                value: 0,
                isDeleted: true,
            })
        }
    })


    return allCombinations
}

export {getAllGrades}