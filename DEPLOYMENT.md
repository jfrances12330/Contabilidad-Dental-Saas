# DEPLOYMENT A HOSTINGER - GUÍA RÁPIDA

## ⚡ Pasos para Subir a Producción

### 1️⃣ Verificar que Hostinger soporte Node.js
- Entra a tu panel de Hostinger
- Busca "Node.js" o "Aplicaciones Node"
- Si NO lo tiene, contacta soporte o considera Vercel/Railway

### 2️⃣ Subir Archivos (vía FTP o Git)

**Archivos a subir:**
```
✅ index.html
✅ server.js
✅ package.json
✅ package-lock.json
✅ manifest.json
✅ README.md
```

**NO subir:**
```
❌ .env (contiene secretos)
❌ node_modules/ (se instala en el servidor)
❌ .git/ (opcional)
❌ ESTRATEGIA web/ (no necesario para producción)
```

### 3️⃣ Configurar Variable de Entorno

**En el panel de Hostinger:**
```
Variable: OPENAI_API_KEY
Valor: [TU-API-KEY-DE-OPENAI-AQUI]
```

⚠️ **IMPORTANTE:** Esta API key es SECRETA, nunca la compartas públicamente.
⚠️ **Usa la API key que configuraste en https://platform.openai.com/api-keys**

### 4️⃣ SSH: Instalar y Ejecutar

```bash
# Conectar por SSH
ssh tu-usuario@tu-servidor.hostinger.com

# Ir a la carpeta de tu app
cd public_html  # o donde hayas subido los archivos

# Instalar dependencias
npm install

# Iniciar servidor
npm start

# O con PM2 (recomendado para mantener corriendo):
npm install -g pm2
pm2 start server.js --name dental-app
pm2 save
pm2 startup
```

### 5️⃣ Verificar que Funciona

**Accede a tu dominio:**
```
https://tudominio.com
```

**Prueba el chat:**
1. Ve a "Asistente IA"
2. Escribe: "Hola"
3. Debería responder ✅

---

## 🔴 Si Algo Falla

### Error: "npm: command not found"
→ Hostinger no tiene Node.js. Opciones:
1. Contactar soporte para activarlo
2. Migrar a Vercel/Railway (gratis y fácil)

### Error 500 en /api/chat
→ Falta configurar OPENAI_API_KEY
→ Verifica los logs: `pm2 logs dental-app`

### Site no carga
→ Verifica que el puerto esté correcto
→ Hostinger debe asignar automáticamente el puerto

---

## 🆘 Alternativa: Vercel (Más Fácil)

Si Hostinger da problemas, puedes deployar en Vercel:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd "/Users/jorgefrancesolivas/Desktop/Contabilidad Dental"
vercel

# Configurar variable de entorno en el dashboard de Vercel
# OPENAI_API_KEY=tu-api-key
```

---

## ✅ Checklist Final

- [ ] Node.js disponible en Hostinger
- [ ] Archivos subidos (sin .env ni node_modules)
- [ ] Variable OPENAI_API_KEY configurada
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor corriendo (`npm start` o `pm2`)
- [ ] Dominio funcionando
- [ ] Chat de IA respondiendo
- [ ] Sync con Google Sheets funcionando
