# CONFIGURACIÓN PARA HOSTINGER - CHECKLIST

## ✅ Archivos ya listos en GitHub
- ✅ server.js (configurado para producción)
- ✅ package.json (con scripts correctos)
- ✅ index.html (frontend completo)
- ✅ manifest.json
- ✅ .gitignore (excluye .env y node_modules)

## 🔧 EN HOSTINGER: Pasos que DEBES hacer

### 1️⃣ Configurar Node.js App
En el panel de Hostinger > Node.js:
- Application Startup File: `server.js`
- Node Version: 18.x o superior
- Application Root: (la carpeta donde clonaste el repo)

### 2️⃣ Configurar Variable de Entorno (MUY IMPORTANTE)
En Environment Variables de tu app:
```
OPENAI_API_KEY = [TU-API-KEY-REAL-AQUI]
```
**IMPORTANTE:** Usa la API key real de OpenAI que configuramos (empieza con sk-proj-...)

### 3️⃣ Hacer Pull desde GitHub
Si ya tenías archivos subidos:
```bash
cd /ruta/de/tu/app
git pull origin main
npm install
```

O si es nueva instalación:
```bash
git clone https://github.com/jfrances12330/Contabilidad-Dental-Saas.git
cd Contabilidad-Dental-Saas
npm install
```

### 4️⃣ Reiniciar la aplicación
En el panel de Hostinger:
- Click en "Restart Application"
- O vía SSH: `pm2 restart all`

## 🧪 Verificar que Funciona

### Test 1: Servidor corriendo
Accede a: `https://tu-dominio-temporal.com/health`
Debería mostrar: `OK`

### Test 2: Frontend carga
Accede a: `https://tu-dominio-temporal.com/`
Debería cargar el dashboard completo

### Test 3: IA funciona
1. Ve a "Asistente IA"
2. Escribe: "Hola"
3. Debería responder (NO debe decir "Error. Intenta de nuevo")

## 🔴 Si el Chat da Error

### Error: "Error. Intenta de nuevo"
**Paso 1:** Verifica logs en Hostinger
**Paso 2:** Confirma que OPENAI_API_KEY esté configurada
**Paso 3:** Revisa que tenga créditos en OpenAI

### Error 500
**Causa:** Variable de entorno no configurada
**Solución:** Ve a paso 2️⃣ arriba

### Error de CORS
**Causa:** Estás accediendo directamente al archivo HTML sin servidor
**Solución:** Asegúrate de acceder vía el dominio (no file://)

## 📋 Comandos Útiles (SSH)

```bash
# Ver logs
pm2 logs

# Reiniciar app
pm2 restart all

# Ver status
pm2 status

# Instalar dependencias
npm install

# Verificar que server.js existe
ls -la server.js
```

## ✅ Checklist Final

- [ ] Git pull ejecutado (o repo clonado)
- [ ] npm install ejecutado
- [ ] OPENAI_API_KEY configurada en Environment Variables
- [ ] Application Startup File: server.js
- [ ] Aplicación reiniciada
- [ ] /health endpoint responde OK
- [ ] Dashboard carga correctamente
- [ ] Asistente IA responde mensajes

---

**Una vez completados todos los pasos, el chat de IA debería funcionar perfectamente en producción.** 🚀
