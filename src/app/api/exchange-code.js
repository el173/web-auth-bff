export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { code } = req.body;
  
      if (!code) {
        return res.status(400).json({ message: 'Code is required' });
      }
  
      try {
        const response = await fetch('https://example.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return res.status(200).json({ message: 'Token exchanged successfully', data });
        } else {
          return res.status(response.status).json({ message: data.message || 'Failed to exchange code' });
        }
      } catch (error) {
        console.error('Error exchanging code:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  }
  