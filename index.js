// TODO: Desafio goStack
const express = require("express"); //Declarar express

const server = express();

server.use(express.json());

const projects = [{ id: "1", title: "PecNordeste", tasks: [] }];
function checkProjectInArray(req, res, next) {
  const project = projects[req.params.index];
  if (!project) {
    return res.status(400).json({ error: "Projeto não encontrado" });
  }

  req.project = project;
  return next();
}

function CountAllReqs(req, res, next) {
  console.count("Número de requisições");

  return next();
}

server.use(CountAllReqs);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:index", checkProjectInArray, (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  projects.push(req.body);

  return res.json({
    verbose: ` ${req.body.title} foi Salvo com sucesso`,
    projects: projects
  });
});

server.post("/projects/:index/tasks", checkProjectInArray, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;
  projects[index].tasks.push(title);

  return res.json({
    verbose: ` Task : ${title} foi  Salva com sucesso`,
    projects: projects
  });
});

server.put("/projects/:index", checkProjectInArray, (req, res) => {
  const { index } = req.params;

  projects[index] = req.body;
  return res.json({
    verbose: `Projeto id ${index} ,  ${req.body.title} foi Editado com Sucesso `,
    projects: projects
  });
});

server.delete("/projects/:index", checkProjectInArray, (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.json({
    verbose: `Projeto id ${index} foi Removido com Sucesso `,
    projects: projects
  });
});

server.listen(3002);
