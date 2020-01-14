// TODO: Desafio goStack
const express = require("express"); //Declarar express

const server = express();
server.use(express.json());
const projects = [{ id: 1, title: "PecNordeste", tasks: [] }];

// server.post("/projects/", (req, res) => {});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:index", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  //   const { project } = req.body;

  projects.push(req.body);

  return res.json({
    verbose: ` ${req.body.title} Salvo com sucesso`,
    projects: projects
  });
});

server.put("/projects/:index", (req, res) => {});

server.listen(3002);
