const express = require("express")
const { randomUUID } = require("crypto")
const { request } = require("http")
const app = express()
const Banco = require('./Banco')
app.use(express.json())
const banco = new Banco();

app.listen(3333, () => {
    console.log("Servidor foi iniciado!")
});

//Vetor Alunos Para Armazenar s
alunos = []

//Metodo Get Para Listar Aluno
app.get("/alunos", (request, response) => {
  const { uuid } = request.query
  if (uuid) {
    const pos = alunos.findIndex((alunos) => alunos.uuid == uuid)
    if (pos >= 0) return response.json(aluno[pos])
  }
  return response.json([alunos])
})

//Metodo Post Para Criar Aluno
app.post("/alunos", (request, response) => {
  const { nome, email } = request.body
  const uuid = randomUUID()
  const aluno = {
    uuid,
    nome,
    email,
  }
  alunos.push(aluno)
  return response.json(aluno)
});

//Metodo Post Para Deletar Aluno
app.delete("/alunos/:uuid", (request, response) => {
  const { uuid } = request.params

  const pos = alunos.findIndex((aluno) => aluno.uuid == uuid)
  const aluno = alunos[pos]
  if (pos < 0) 
    return response.status(400).json({ mensagem: "Aluno não encontrado" })
  alunos.splice(pos, 1)
  return response.json(aluno)
});

//Metodo Post Para Atualizar Aluno
app.put("/alunos/:uuid", (request, response) => {
  const { uuid } = request.params
  const { nome, email } = request.body

  const pos = alunos.findIndex((aluno) => aluno.uuid == uuid)
  if (pos < 0)
    return response.status(400).json({ mensagem: "Aluno não encontrado" })

  const aluno = {
    uuid,
    nome,
    email,
  }
  alunos[pos] = aluno
  return response.json()
});