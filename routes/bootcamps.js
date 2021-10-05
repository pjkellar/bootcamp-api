const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ sucess: true, message: 'Show all bootcamps' });
});

router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ sucess: true, message: `Show bootcamp: ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(200).json({ sucess: true, message: 'Create new bootcamp' });
});

router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ sucess: true, message: `Update bootcamp: ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ sucess: true, message: `Delete bootcamp: ${req.params.id}` });
});

module.exports = router;
