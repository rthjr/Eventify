// export default async function handler(req, res) {
//   const apiName = 
//   if (req.method === 'GET') {
//       try {
//           const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify');
//           if (!response.ok) {
//               return res.status(response.status).json({ error: 'Failed to fetch data from the API' });
//           }
//           const data = await response.json();
//           return res.status(200).json(data);
//       } catch (error) {
//           return res.status(500).json({ error: 'Internal Server Error' });
//       }
//   } else if (req.method === 'POST') {
//      try {
//       const response = await fetch
//      }
//       return res.status(405).json({ error: 'POST method is not implemented' });
//   } else if (req.method === 'PUT') {
//       return res.status(405).json({ error: 'PUT method is not implemented' });
//   } else if (req.method === 'DELETE') {
//       return res.status(405).json({ error: 'DELETE method is not implemented' });
//   } else {
//       return res.status(405).json({ error: 'Method not allowed' });
//   }
// }
