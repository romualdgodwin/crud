const express = require('express')

const app = express()

const data = [
    {id : 1 , language : 'javascript'},
    {id : 2 , language : 'java'},
    {id : 3 , langage : 'python'},

]

app.use(express.json())

// all data
app.get('/', (req, res)=>{
    res.status(200).json(data)
})



//one data 
app.get('/:id',(req, res)=>{ // ":" signifie donnée dynamique
    const { id } = req.params//.id
    const one = data.find(el => el.id === +id)//il va retounrer tous les elements dispo dans notre tableau
    if(!one) return res.json({ message : "not found"})
    res.status(200).json(one)
    
})    

//post
app.post('/', (req, res)=>{
    const { body } = req
        const newOne = {
            id: data.length + 1,
            ...body
        }
        data.push(newOne)
        res.status(201).json(newOne)
    
})

//update
app.put('/:id', (req, res)=>{
    const { id } = req.params
    const { body } = req 
    const one = data.find(el => el.id === +id)
    if(!one) return res.status(404).json({ message : "not found"})
    one.language = body.language
    res.status(200).json(one)
})

//delete
app.delete('/:id', (req, res)=>{
    const { id } = req.params
    const one = data.find(el => el.id === +id)
    if(!one) return res.status(404).json({ message : "not found"})
    data.splice(data.indexOf(+id), 1)
    res.status(200).json({message : "Ressource supprimé"})
})
app.listen(8082, ()=> console.log('port 8082'))