import express, { Request, Response } from 'express';
import Result, { IResult } from './results.model';

const router = express.Router();
// http://localhost:3000/results/

// GET all results
router.get('/', async (req: Request, res: Response) => {
  try {
    const results: IResult[] = await Result.find({});
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// GET a specific result by ID
router.get('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;

  try {
    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });


// CREATE a new result
router.post('/', async (req: Request, res: Response) => {
  const result = new Result(req.body);
  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a specific result by ID
// PUT (update) a specific result by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
      const result = await Result.findById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Result not found' });
      }
  
      if (req.body.status != null) {
        result.status = req.body.status;
      }
      if (req.body.repositoryName != null) {
        result.repositoryName = req.body.repositoryName;
      }
      if (req.body.findings != null) {
        result.findings = req.body.findings;
      }
      if (req.body.queuedAt != null) {
        result.queuedAt = req.body.queuedAt;
      }
      if (req.body.scanningAt != null) {
        result.scanningAt = req.body.scanningAt;
      }
      if (req.body.finishedAt != null) {
        result.finishedAt = req.body.finishedAt;
      }
  
      const updatedResult = await result.save();
      res.json(updatedResult);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
  

// DELETE a specific result by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const result = await Result.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Result not found' });
      }
      res.json({ message: 'Result deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
  

export default router;
