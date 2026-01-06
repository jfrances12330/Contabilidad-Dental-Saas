const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Hostinger often provides the port via process.env.PORT
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Main route -> Serves the Unified HTML structure
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// OpenAI Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un asistente de gestión dental experto. Respondes de forma breve, concisa y profesional (máximo 50 palabras). Usas los datos financieros proporcionados para dar respuestas específicas y accionables.'
                    },
                    {
                        role: 'user',
                        content: context ? `CONTEXTO: ${context}\n\nPREGUNTA: ${message}` : message
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API Error:', error);
            return res.status(response.status).json({ error: 'Error from OpenAI API' });
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        res.json({ message: aiMessage });
    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint (optional but good for monitoring)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Servidor Dental SaaS corriendo en el puerto ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
});
