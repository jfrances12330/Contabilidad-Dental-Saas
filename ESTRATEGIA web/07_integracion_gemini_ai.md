# Integración Gemini AI - Guía Completa

## 🎯 Funcionalidades IA que Vamos a Implementar

### Fase 1: Alertas Inteligentes
- ✅ Detectar gastos inusuales (ej: "+20% en Laboratorio este mes")
- ✅ Identificar bajadas de rendimiento por doctor
- ✅ Alertar de objetivos en riesgo
- ✅ Detectar tendencias negativas

### Fase 2: Recomendaciones Automáticas
- 📊 Sugerencias de optimización de costes
- 📈 Proyecciones basadas en patrones históricos
- 💡 Comparativas vs benchmarks del sector

### Fase 3: Asistente Conversacional
- 💬 Chat para consultas ("¿Qué doctor tiene mejor ROI?")
- 📋 Generación de informes en lenguaje natural

---

## 📝 Paso a Paso: Obtener API Key de Gemini

### 1. Ve a Google AI Studio
```
https://aistudio.google.com/app/apikey
```

### 2. Crea tu API Key
- Click en "Get API Key" o "Create API Key"
- Selecciona un proyecto (o crea uno nuevo)
- **IMPORTANTE**: Copia la key INMEDIATAMENTE (solo se muestra una vez)

**Ejemplo de API Key:**
```
AIzaSyD...tu_key_aqui...xYZ123
```

### 3. Pásame la Key de Forma Segura

**Opción A (Recomendada): Crear archivo .env**
1. Crea archivo `.env` en tu proyecto:
```bash
GEMINI_API_KEY=AIzaSyD...tu_key_aqui...xYZ123
```

2. Pégame solo la key aquí en el chat (yo la integraré)

**Opción B: Configuración en la app**
- Te crearé un campo de configuración en Settings
- Introduces la key desde la UI
- Se guarda en localStorage (encriptada)

---

## 🔧 Arquitectura de Integración

### Modelo que Usaremos
```javascript
modelo: "gemini-2.0-flash-exp"
// Rápido, económico, perfecto para análisis de datos
```

### Prompt Engineering Optimizado

**Ejemplo 1: Detección de Anomalías**
```javascript
const prompt = `
Eres un analista financiero experto en clínicas dentales.

DATOS DEL MES ACTUAL:
- Ingresos: ${incomeThisMonth}€
- Gastos: ${expensesThisMonth}€
- Desglose de gastos: ${JSON.stringify(expensesByCategory)}

DATOS DEL MES ANTERIOR:
- Ingresos: ${incomePrevMonth}€
- Gastos: ${expensesPrevMonth}€

INSTRUCCIONES:
1. Identifica gastos que hayan aumentado >15%
2. Detecta categorías con anomalías
3. Genera UNA alerta corta y accionable (máximo 20 palabras)

FORMATO DE RESPUESTA:
{
  "alerta": "texto de la alerta",
  "categoria": "nombre categoría afectada",
  "variacion": "+20%",
  "criticidad": "alta/media/baja"
}
`;
```

**Ejemplo 2: Recomendaciones de Gestión**
```javascript
const prompt = `
Analiza el rendimiento de este doctor:

DOCTOR: ${doctor.name}
PRODUCCIÓN: ${doctor.generated}€
OBJETIVO: ${doctor.goal}€
PROGRESO: ${progress}%
DÍAS RESTANTES: ${daysLeft}

TOP CATEGORÍAS:
${topCategories.map(c => `- ${c.name}: ${c.amount}€`).join('\n')}

Genera UNA recomendación específica para que alcance su objetivo.
Máximo 15 palabras.
`;
```

---

## 💻 Código de Integración

### Paso 1: Añadir SDK de Gemini

Añadiré esto al `<head>` de tu `index.html`:

```html
<script type="importmap">
{
  "imports": {
    "@google/generative-ai": "https://esm.run/@google/generative-ai"
  }
}
</script>
```

### Paso 2: Inicializar Cliente

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cargar desde localStorage o .env
const API_KEY = localStorage.getItem('GEMINI_API_KEY') || 'TU_KEY_AQUI';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
```

### Paso 3: Función de Análisis Inteligente

```javascript
async function analyzeFinancialAnomaly() {
    const thisMonth = calculatePeriodData('mes');
    const prevMonth = calculatePreviousPeriodData('mes');
    
    const prompt = `...`; // Ver arriba
    
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parsear JSON y mostrar alerta
        const alert = JSON.parse(text);
        updateAIAlert(alert);
    } catch (error) {
        console.error('AI Error:', error);
    }
}
```

### Paso 4: Actualizar UI con Alerta

```javascript
function updateAIAlert(alert) {
    const alertText = document.querySelector('#ai-alert-text');
    const alertButton = document.querySelector('#ai-alert-button');
    
    if (alertText) {
        alertText.innerHTML = `He detectado <span class="font-bold">${alert.categoria}</span> con variación de ${alert.variacion}. ${alert.alerta}`;
    }
    
    // Cambiar color según criticidad
    if (alert.criticidad === 'alta') {
        alertText.classList.add('text-red-600');
    }
}
```

---

## 📊 Funcionalidades Concretas a Implementar

### 1. **Alerta Automática en Dashboard** (1-2 horas)
- Se ejecuta al cargar Dashboard
- Compara mes actual vs anterior
- Muestra alerta si detecta anomalía >15%

### 2. **Recomendaciones por Doctor** (2-3 horas)
- Botón "Pedir sugerencia IA" en cada doctor
- Gemini analiza su rendimiento
- Sugiere: "Aumentar higienes recurrentes +3/semana"

### 3. **Predictor de Cierre de Mes** (1-2 horas)
- Basado en tendencia diaria actual
- Gemini ajusta por patrones históricos
- "Proyección IA: €52.300 (vs simple: €50.000)"

### 4. **Chat Analista Virtual** (3-4 horas)
- Input de texto
- Preguntas en lenguaje natural
- "¿Qué categoría me está haciendo perder más dinero?"

---

## 🔐 Gestión Segura de API Key

### NO hacer:
```javascript
❌ const API_KEY = "AIzaSyD...";  // Hardcoded en código
```

### SÍ hacer:
```javascript
✅ const API_KEY = localStorage.getItem('GEMINI_API_KEY');
// O desde variable de entorno en producción
```

### Encriptación Básica (Opcional)
```javascript
function encryptKey(key) {
    return btoa(key); // Base64 simple
}

function decryptKey(encrypted) {
    return atob(encrypted);
}

// Guardar
localStorage.setItem('GEMINI_API_KEY', encryptKey(key));

// Usar
const key = decryptKey(localStorage.getItem('GEMINI_API_KEY'));
```

---

## 💰 Costos Estimados

**Gemini 2.0 Flash (Gratis actualmente):**
- Input: Gratis hasta 15 RPM
- Output: Gratis hasta 15 RPM
- 1 millón tokens/día gratis

**Con tu uso estimado:**
- 1 alerta al cargar Dashboard
- ~5-10 análisis/día
- **Coste: €0/mes** (dentro del tier gratuito)

---

## 🚀 Plan de Implementación

### Esta Semana (Si me pasas la key ahora):
1. ✅ **Hoy**: Integro SDK + Alerta automática en Dashboard
2. ✅ **Mañana**: Recomendaciones por doctor en Team view
3. ✅ **Pasado**: Predictor inteligente de cierre de mes

### Próxima Semana:
4. Chat analista virtual
5. Categorización automática de transacciones

---

## 📝 ¿Qué Necesito de Ti AHORA?

**Solo 3 pasos:**

1. Ve a: https://aistudio.google.com/app/apikey
2. Crea una API Key
3. Pégamela aquí en formato:
```
GEMINI_API_KEY=AIzaSyD...tu_key_aqui...
```

En cuanto la tenga, empiezo la integración inmediatamente y en 1-2 horas tendrás alertas IA funcionando. 🚀

---

## 🎁 Bonus: Ejemplos de Alertas que Verás

```
✅ "Laboratorio subió +22% este mes. Revisar proveedor."
✅ "Dr. Fernando va 15% por debajo del objetivo. Aumentar agenda."
✅ "Ortodoncia generó 40% más que el promedio. Potenciar."
✅ "Gastos operativos suben 3 meses seguidos. Optimizar."
```

¿Listo para activar la IA? Pásame la key cuando quieras. 💪
