# Dental SaaS - Aplicación de Gestión Clínica

Aplicación web para gestión dental con integración de IA (OpenAI), análisis financiero, gestión de equipo y reportes.

## 🚀 Deployment en Hostinger

### Pre-requisitos
- Hosting con soporte de Node.js (versión 16 o superior)
- Acceso SSH o panel de Node.js en Hostinger
- API Key de OpenAI

### Pasos para Deployment

#### 1. Subir archivos al servidor
Sube los siguientes archivos/carpetas a tu hosting:
```
- index.html
- server.js
- package.json
- package-lock.json
- manifest.json
- (NO subir .env, node_modules, ni .git)
```

#### 2. Configurar Variables de Entorno en Hostinger

**Opción A - Panel de Hostinger:**
1. Ve a tu panel de Hostinger
2. Busca "Node.js" o "Variables de entorno"
3. Añade la variable:
   - **Nombre:** `OPENAI_API_KEY`
   - **Valor:** `tu-api-key-de-openai`

**Opción B - SSH:**
```bash
cd /ruta/a/tu/aplicacion
echo "OPENAI_API_KEY=tu-api-key-aqui" > .env
```

#### 3. Instalar Dependencias (vía SSH)
```bash
npm install
```

#### 4. Iniciar la Aplicación

**Opción A - Si Hostinger tiene interfaz Node.js:**
- Selecciona `server.js` como punto de entrada
- Configura el comando de inicio: `npm start`
- Asegúrate de que el puerto esté configurado (la app usa `process.env.PORT` o 3000)

**Opción B - SSH Manual:**
```bash
npm start
# O con PM2 para mantenerlo corriendo:
pm2 start server.js --name dental-saas
pm2 save
```

#### 5. Configurar Puerto
Hostinger asignará un puerto automáticamente. La app ya está configurada para usar `process.env.PORT`.

---

## 🔧 Configuración Local (Desarrollo)

### Instalación
```bash
# 1. Clonar repositorio
git clone [url-del-repo]
cd "Contabilidad Dental"

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
echo "OPENAI_API_KEY=tu-api-key" > .env

# 4. Iniciar servidor
npm start
```

### Acceder
- Local: http://localhost:3000

---

## 📁 Estructura del Proyecto

```
├── index.html           # Frontend de la aplicación
├── server.js            # Backend Node.js con Express
├── package.json         # Dependencias del proyecto
├── manifest.json        # PWA manifest
├── .env                 # Variables de entorno (NO subir a git)
└── .gitignore          # Archivos ignorados por git
```

---

## 🔑 Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `OPENAI_API_KEY` | API Key de OpenAI | `sk-proj-...` |
| `PORT` | Puerto del servidor (opcional, Hostinger lo asigna) | `3000` |

---

## 🛠️ Tecnologías

- **Frontend:** HTML, CSS (Tailwind), JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **IA:** OpenAI API (GPT-3.5-turbo)
- **Gráficas:** Chart.js
- **Datos:** Google Sheets (sync)

---

## ⚠️ Solución de Problemas en Hostinger

### Error: "Cannot GET /"
- Verifica que `server.js` esté configurado como punto de entrada
- Asegúrate de que el puerto esté correctamente configurado

### Error 500: OpenAI
- Verifica que `OPENAI_API_KEY` esté configurada
- Revisa logs del servidor para más detalles

### Chat no responde (Error 429)
- Tu cuenta de OpenAI ha agotado créditos
- Ve a https://platform.openai.com/settings/organization/billing

### CORS Errors
- Asegúrate de que estés accediendo vía el dominio correcto
- No uses `file://` (debe ser `http://` o `https://`)

---

## 📞 Soporte

Si encuentras algún problema durante el deployment:
1. Captura el mensaje de error exacto
2. Verifica los logs del servidor
3. Revisa que todas las variables de entorno estén configuradas

---

## 📄 Licencia

ISC
