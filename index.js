require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");


const app = express();
app.use(cors());

morgan.token("req-body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
app.use(express.static("./build"));


app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/api/persons/:id", (req, res,next) => {
  Person.findById(req.params.id)
  .then(person =>{
    if (person) {
        res.json(person)
    } else {
        response.status(404).end()
    }
  }).catch(error => next(error))
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`Phonebook has info for ${persons.length} people. \n${date}`);
});

app.post("/api/persons", async (req, res) => {
  const { name = undefined, number = undefined } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: " missing name or number" });
  }

  const result = await Person.find({ name });
  if (result.length) {
      console.log(result);
    //return res.status(400).json({ error: "name alredy exist" });
    return result[0].id;
} else {
    const person = new Person({
      name: name,
      number: number,
    });

    person.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  }
});

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   res.status(204).end();
// });

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })

  app.put('/api/persons/:id', (req, res, next) => {
    const {name, number} = req.body
  
    const person = {
      name,
      number,
    }
  
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
      .then(updatedPerson => {
        res.json(updatedPerson)
      })
      .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
