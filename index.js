const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const e = require('cors');
const app = express();
const port = 5000;

const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// 特定のquizの取得
app.get('/quiz/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const q = await prisma.quiz.findUnique({ where: { id: Number(id) } });
    if (q) {
      res.json(q);
    } else {
      res.status(404).json({ error: 'quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 特定の選択肢の取得
app.get('/choice/:qid', async (req, res) => {
    const  qid  = req.params.qid;
    try {
      const c = await prisma.choice.findMany({ where: { quizId: parseInt(qid) } });
      if (c) {
        res.json(c);
      } else {
        res.status(404).json({ error: 'quiz not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// 特定の統計の取得
app.get('/statistics/:cid', async (req, res) => {
    const  cid  = req.params.cid;
    try {
      const s = await prisma.statistics.findMany({ where: {  choiceId: parseInt(cid) } });
      if (s) {
        res.json(s);
      } else {
        res.status(404).json({ error: 'quiz not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// 回答統計の更新
app.put('/statistics/update/:cid', async (req, res) => {
  const  cid  = req.params.cid;
  const {choiceResponses} = req.body;
  try {
    const c = await prisma.statistics.updateMany({
      where: { choiceId: parseInt(cid) },
      data: { choiceResponses:parseInt(choiceResponses) }
    });
    res.json(c);
  } catch (error) {
    res.status(400).json({ choiceerror: error.message });
  }
});

app.put('/quiz/update/:qid', async (req, res) => {
    const  qid  = req.params.qid;
    const  totalReaoinses = req.body.totalReaoinses;
    try {
      const q = await prisma.quiz.updateMany({
        where: { id: parseInt(qid) },
        data: { totalResponses :totalReaoinses }
      });
      res.json(q);
    } catch (error) {
      res.status(400).json({ quizerror: error.message });
    }

  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });