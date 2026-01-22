// server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// To handle c++ code
app.post("/cpp", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: "cpp",
      version: "10.2.0",
      files: [{ name: "main.cpp", content: code }],
    });

    res.json({ output: response.data.run.output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error running code" });
  }
});

// To handle Python code
// app.post('/python', async (req, res) => {
//   const { code } = req.body;
//   // console.log(typeof code)
//   if (typeof code !== 'string') {
//     return res.status(400).json({ error: 'code must be string' });
//   }

//   try {
//     // Example: send to Pipedream Python API endpoint
//     const apiUrl = 'https://eo8b8167xc7m31a.m.pipedream.net'; 
//     // Replace with actual URL from Pipedream workflow
    
//     const response = await axios.post(apiUrl, {
//       // the exact field names will depend on the Pipedream config
//       code: code,
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer 329e750fe19c9769b3ee3a13cbf4faf7`,  // use env var for key
//       }
//     });
//     console.log(response.data)
//     // assume the response has { output: "...", error: "..."} or something similar
//     const { output, error } = response.data;
//     // console.log(output)
//     return res.json({ output, error });

//   } catch (err) {
//     console.error('Error executing code:', err);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });



app.listen(5002, () => console.log("🚀 Server running on http://localhost:5002"));
