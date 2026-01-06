# 🚀 WORKFLOW DE ACTUALIZACIONES - VPS

**Guía completa para actualizar la app en el VPS desde tu Mac**

---

## 📋 ESCENARIO 1: Realizaste cambios - Workflow completo

### **Paso 1: Verificar conexión (si no estás seguro)**

Abre Terminal y ejecuta:

```bash
cd "/Users/jorgefrancesolivas/Desktop/Contabilidad Dental"
```

---

### **Paso 2: Guardar cambios localmente**

```bash
git add .
git commit -m "feat: descripción de tus cambios"
git push origin main
```

**Ejemplos de mensajes:**
- `"feat: mejorar mensaje chatbot"`
- `"fix: corregir cálculo de gastos"`
- `"style: actualizar colores del dashboard"`

---

### **Paso 3: Conectar al VPS**

```bash
ssh root@185.158.107.45
```

*(Te pedirá la contraseña del VPS - la que creaste en Hostinger)*

---

### **Paso 4: Navegar a la carpeta de la app**

```bash
cd /var/www/dental-app
```

---

### **Paso 5: Descargar cambios de GitHub**

```bash
git pull origin main
```

---

### **Paso 6: Reiniciar app (SOLO SI ES NECESARIO)**

**¿Modificaste `server.js`, `.env` o `package.json`?**

```bash
pm2 restart dental-app
```

**¿Solo modificaste `index.html`, CSS o JS frontend?**

NO hace falta reiniciar. Solo haz **F5 (refresh)** en el navegador.

---

### **Paso 7: Verificar que funciona**

```bash
pm2 logs dental-app
```

Presiona `Ctrl+C` para salir de los logs.

Abre navegador: `http://185.158.107.45:8080`

---

## 📋 ESCENARIO 2: Reconectarte al VPS (estabas desconectado)

```bash
ssh root@185.158.107.45
```

Contraseña: *(la que creaste)*

**Ver estado de la app:**

```bash
pm2 status
```

**Ver logs en tiempo real:**

```bash
pm2 logs dental-app
```

**Salir de logs:** `Ctrl+C`

---

## 🔧 COMANDOS ÚTILES EN EL VPS

### **Ver estado de todas las apps:**
```bash
pm2 status
```

### **Ver logs en tiempo real:**
```bash
pm2 logs dental-app
```

### **Reiniciar la app:**
```bash
pm2 restart dental-app
```

### **Detener la app:**
```bash
pm2 stop dental-app
```

### **Iniciar la app (si está detenida):**
```bash
pm2 start dental-app
```

### **Ver uso de CPU/RAM:**
```bash
pm2 monit
```
*(Presiona `q` para salir)*

---

## 📊 TABLA RÁPIDA: ¿Necesito reiniciar?

| Archivo modificado | ¿Reiniciar? | Comando |
|-------------------|-------------|---------|
| `index.html` | ❌ NO | Solo F5 en navegador |
| `styles.css` | ❌ NO | Solo F5 en navegador |
| `script.js` (frontend) | ❌ NO | Solo F5 en navegador |
| `server.js` | ✅ SÍ | `pm2 restart dental-app` |
| `.env` | ✅ SÍ | `pm2 restart dental-app` |
| `package.json` | ✅ SÍ | `npm install && pm2 restart dental-app` |

---

## ⚡ WORKFLOW ULTRA-RÁPIDO (desde Terminal en Mac)

```bash
# 1. Ir a la carpeta del proyecto
cd "/Users/jorgefrancesolivas/Desktop/Contabilidad Dental"

# 2. Guardar y subir cambios
git add . && git commit -m "feat: tus cambios" && git push origin main

# 3. Conectar al VPS, actualizar y reiniciar (todo en uno)
ssh root@185.158.107.45 "cd /var/www/dental-app && git pull origin main && pm2 restart dental-app"
```

*(Este último comando hace todo automáticamente, pero te pedirá la contraseña del VPS)*

---

## 🆘 RESOLUCIÓN DE PROBLEMAS

### **"fatal: Not a git repository"**
```bash
cd "/Users/jorgefrancesolivas/Desktop/Contabilidad Dental"
```

### **"Permission denied (publickey)"** al hacer git push
Tu clave SSH no está configurada. Usa:
```bash
git push origin main
```
Te pedirá usuario/password de GitHub.

### **La app no responde en `http://185.158.107.45:8080`**

Verificar estado:
```bash
ssh root@185.158.107.45
pm2 status
pm2 logs dental-app
```

Si la app está "stopped" o "errored":
```bash
pm2 restart dental-app
```

### **"Already up to date" en git pull pero no veo cambios**

El navegador tiene caché. Presiona:
- **Mac:** `Cmd + Shift + R` (hard refresh)
- **O:** Abre en ventana privada/incógnito

---

## 📝 NOTAS IMPORTANTES

1. **Siempre haz `git pull` en el VPS después de `git push` en tu Mac**
2. **No modifiques archivos directamente en el VPS**, siempre edita en tu Mac y sube con git
3. **PM2 mantiene la app corriendo 24/7**, incluso si cierras el terminal
4. **Para cambios en frontend (HTML/CSS/JS)**, solo necesitas F5, no reiniciar
5. **Para cambios en backend (server.js/.env)**, SIEMPRE reinicia con PM2

---

**Fecha:** 6 enero 2026  
**URL App:** http://185.158.107.45:8080  
**VPS IP:** 185.158.107.45  
**Usuario:** root
