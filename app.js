const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
// app.get('/',(req, res) => {
//     res.status(200).json({message: 'hello from the serverside!'})

// })

// app.post('/', (req,res) => {
//     res.send('you can post to this endpoint')
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  //   console.log(typeof id, id);

  const tour = tours.find((tour) => tour.id === parseInt(id));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //   res.send('done');
});

app.put('/api/v1/tours/:id', (req, res) => {
  //   console.log(req.body);
  const { name, duration, difficulty } = req.body;
  const { id } = req.params;
  const tour = tours.find((tour) => tour.id === parseInt(id));
  //   console.log(name, duration, difficulty);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  const newTour = { ...tour, name, duration, difficulty };
  //   console.log(newTour);
  tours[parseInt(id)] = newTour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.delete('/api/v1/tours/:id', (req, res) => {
  //   console.log(req.body);
  const { id } = req.params;
  const tour = tours.filter((tour) => tour.id !== parseInt(id));
  //   console.log(name, duration, difficulty);

  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tour),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: null,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log('listening...');
});
