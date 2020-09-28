const express = require('express');
const router = express.Router();

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
];

//////////////////// Get full list of courses and their IDs /////////////////////////
router.get('/', (req, res) => {
  res.send(courses);
});

//////////////////// Get a specific course based on the given ID  /////////////////////////
router.get('/:id', (req, res) => {
  //res.send(req.params.id);
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found..');
  res.send(course); // 404 object not found
});

//////////////////// Add a new course with the given name and increment ID /////////////////////////
router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1, // <- not working??
    name: req.body.name
  };
  console.log(courses.length);
  courses.push(course);
  res.send(course);
});

//////////////////// Update the name of a course based on ID /////////////////////////
router.put('/:id', (req, res) => {

  // Look up the course with the given ID, if it doesn't exist, return 404...
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found..');

  // Otherwise validate that the course input is valide..
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Otherwise update the course name and return the course object to the client
  course.name = req.body.name;  // if good, update course name
  res.send(course); // return updated course to the client
});

// function for validating Course object - used by both routes
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

router.delete('/:id',  (req, res) => {

  // Look up the course by ID, if it doesn't exist, return 404 error..
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found..');

  // Otherwise delete the course and return the deleted course ID/name
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
