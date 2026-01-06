const express = require('express');
const path = require('path');
const fs = require('fs'); // ✅ Añadido para memoria persistente
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Hostinger often provides the port via process.env.PORT
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// ============================================================
// 🧠 MEMORIA NIVEL 2: Persistencia de Conversaciones
// ============================================================
const CONVERSATIONS_FILE = './conversations.json';
let allConversations = [];

// Cargar conversaciones previas al iniciar
if (fs.existsSync(CONVERSATIONS_FILE)) {
    try {
        const data = fs.readFileSync(CONVERSATIONS_FILE, 'utf8');
        allConversations = JSON.parse(data);
        console.log(`✅ Cargadas ${allConversations.length} conversaciones previas`);
    } catch (error) {
        console.error('Error cargando conversaciones:', error);
        allConversations = [];
    }
}

// Main route -> Serves the Unified HTML structure
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// OpenAI Chat Endpoint (con memoria)
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context, conversationHistory = [] } = req.body; // ✅ Añadido conversationHistory

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        // ============================================================
        // 🎯 INFORMACIÓN PERSONALIZADA DE TU NEGOCIO
        // ============================================================
        // Aquí puedes añadir información específica de tu clínica/negocio
        const businessInfo = `
📋 INFORMACIÓN DEL NEGOCIO:
- Nombre: Lobato Dental
- Ubicación: Elche (Alicante)
- Servicios principales: Ortodoncia, Implantes, Estética dental, Odontología General, Ortodoncia Pediátrica, Periodoncia, Endodoncia, Cirugía oral
- Objetivos 2026: Aumentar facturación 30%
- Presupuesto marketing anual: 12.000€ (1.000€/mes)
- Canal principal de captación: Google Ads, SEO Local, Recomendaciones

👥 EQUIPO ACTUAL DE LOBATO DENTAL:

RECEPCIÓN Y ADMINISTRACIÓN:
- Alejandra: Recepcionista principal (gestión de pacientes, cobros, presupuestos, citas)
  → Ya cubre toda la gestión administrativa, no sugerir contratar más recepción

EQUIPO CLÍNICO:
- 3 Higienistas dentales (limpiezas, profilaxis, mantenimientos)
- Varios Doctores/Odontólogos: Los nombres y especialidades están en la columna de INGRESOS
  → El agente DEBE leer los conceptos de ingresos para identificar:
    * Qué doctores hay (aparecen en descripciones de transacciones)
    * Especialidad de cada uno (según tipo de tratamiento que facturan)
    * Rendimiento individual (volumen de ingresos generados)

INSTRUCCIÓN AL AGENTE:
- Cuando analices datos financieros, IDENTIFICA automáticamente los doctores
- Ejemplo: Si ves "Implante - Dr. Martínez" → ese es el implantólogo
- Usa estos datos para análisis de rendimiento, distribución de carga, etc.
- NO sugieras contratar recepcionista (ya tiene a Alejandra)
- Sugiere optimizaciones de equipo clínico basadas en datos reales

👥 PÚBLICO OBJETIVO (basado en análisis demográfico Elche):
- Familias con niños (25-45 años) que buscan odontopediatría y ortodoncia
- Adultos 35-55 años interesados en estética dental e implantes
- Personas mayores 55+ que necesitan prótesis y rehabilitación
- Profesionales con poder adquisitivo medio-alto
- Residentes zona centro y Altabix de Elche

🔍 ANÁLISIS SEO - "dentista en elche":
COMPETENCIA PRINCIPAL (Top 10 SERP):
1. Dental Roca (25+ años, fuerte en medicina estética)
2. Clínica Dental Maruenda & Pérez (reputación de profesionalidad)
3. Vitaldent Elche (cadena nacional, marca reconocida)
4. Sanitas Milenium Elche (respaldo de seguro médico)
5. IGB Dental (empresa familiar, múltiples ubicaciones)
6. Clínica Dental TrueSmile (centro de Elche)
7. AN Dental (primera cita gratuita, marketing agresivo)
8. Dra. Martínez Bru (especialista en odontopediatría)
9. Oralvium (primera visita gratuita)
10. Dentisana (alta especialización)

OPORTUNIDADES SEO DETECTADAS:
- Keywords long-tail: "ortodoncia invisible Elche", "implantes dentales Elche precio"
- Nicho odontopediatría menos saturado
- Google My Business optimizable (reseñas, fotos, posts)
- Contenido local: "mejor dentista Elche", "dentista urgencias Elche"

👨‍⚕️ ANÁLISIS AUTOMÁTICO DE EQUIPO:
El agente debe:
1. Leer columna de ingresos y extraer nombres de doctores
2. Clasificar por especialidad según tratamientos
3. Calcular rendimiento individual (facturación)
4. Identificar gaps en el equipo (servicios poco cubiertos)
5. Sugerir redistribución de pacientes si hay desequilibrios
6. Proponer formación o contratación SOLO si hay gaps claros

Ejemplo de análisis esperado:
"Veo que Dr. X genera 45% de ingresos con ortodoncia (es tu estrella). 
Higienistas cubren bien mantenimientos (20% ingresos estables). 
PERO: Solo 8% en implantes. Considera formar a un doctor actual o contratar implantólogo."
        `.trim();

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
                        content: `Eres Lobato AI, el estratega financiero de la Clínica Dental Lobato.
Tu usuario es Fernando Lobato, gerente.

🎯 TUS 5 MANDAMIENTOS (CÚMPLELOS O FALLARÁS):
1. ADAPTATIVIDAD: Sé conciso para datos simples. Extiéndete SOLO si te piden explicaciones, análisis de pacientes o estrategias.
2. DATOS EXACTOS: Tienes una lista "BBDD MOVIMIENTOS". Si preguntan por un paciente, BUSCA ahí y da fecha, importe y detalles.
3. ACCIÓN: Diles QUÉ hacer. (Ej: "Revisa agenda del Dr. Pérez").
4. MEMORIA: Mantén el contexto de lo hablado.
5. PERSONALIDAD: Profesional, "tú", usa emojis clave (📉 📈 💰).

� DATOS CLÍNICA (Contexto Fijo):
${businessInfo}

💡 DATOS EN PANTALLA (ÚSALOS SI NO SON NULL):
${context || "No se están visualizando datos específicos ahora mismo."}

INSTRUCCIONES EXTRA:
- Si detectas caída de ingresos: ALERTA ROJA y propón solución.
- NO saludes "Hola espero que estés bien". Di "Hola Fernando," y responde.`
                    },
                    ...(conversationHistory && Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : []),
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 600, // Suficiente para respuestas desarrolladas
                temperature: 0.7 // Balance entre creatividad y precisión
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API Error:', error);
            return res.status(response.status).json({ error: 'Error from OpenAI API' });
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // ============================================================
        // 🧠 MEMORIA NIVEL 2: Guardar conversación persistente
        // ============================================================
        const conversation = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user: 'Fernando',
            userMessage: message,
            aiResponse: aiMessage,
            context: context || null,
            conversationLength: conversationHistory.length + 1
        };

        allConversations.push(conversation);

        // Guardar en archivo JSON
        try {
            fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(allConversations, null, 2));
        } catch (error) {
            console.error('Error guardando conversación:', error);
        }

        res.json({ message: aiMessage });
    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================================
// 📊 ENDPOINTS DE GESTIÓN DE CONVERSACIONES
// ============================================================

// Ver historial completo
app.get('/api/history', (req, res) => {
    res.json({
        total: allConversations.length,
        conversations: allConversations
    });
});

// Exportar para fine-tuning OpenAI
app.get('/api/export-training', (req, res) => {
    const trainingData = allConversations.map(conv => ({
        messages: [
            { role: 'system', content: 'Asistente IA Lobato Dental' },
            { role: 'user', content: conv.userMessage },
            { role: 'assistant', content: conv.aiResponse }
        ]
    }));
    res.json(trainingData);
});

// Estadísticas
app.get('/api/stats', (req, res) => {
    res.json({
        totalConversations: allConversations.length,
        firstDate: allConversations[0]?.timestamp || null,
        lastDate: allConversations[allConversations.length - 1]?.timestamp || null
    });
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
