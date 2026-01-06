# 🚀 MEJORAS VPS - Para implementar DESPUÉS

*Archivo creado: 6 enero 2026*

---

## ✅ LO QUE YA TIENES FUNCIONANDO:

- App Dental corriendo en VPS
- PM2 gestionando el proceso
- Nginx como proxy reverso
- Acceso por dominio/subdominio

---

## 🔮 MEJORAS PENDIENTES (implementar cuando tengas tiempo)

### **MEJORA 1: Auto-Deploy desde GitHub (30 min)**

**Beneficio:** Cada vez que hagas `git push`, la app se actualiza automáticamente en el VPS.

#### **Paso 1: Crear usuario separado (mejor seguridad)**

```bash
# Conectar al VPS
ssh root@185.158.107.45

# Crear usuario
adduser dental
# (te pedirá contraseña, invénta una segura)

# Darle permisos sudo
usermod -aG sudo dental

# Cambiar propiedad de la app
chown -R dental:dental /var/www/dental-app
```

---

#### **Paso 2: Crear script de deploy**

```bash
# Cambiar a usuario dental
su - dental

# Crear script
nano ~/deploy.sh
```

**Contenido del script:**

```bash
#!/bin/bash
APP_DIR="/var/www/dental-app"

cd "$APP_DIR" || exit 1

# Descargar cambios de GitHub
git pull origin main

# Instalar dependencias (por si hay nuevas)
npm install

# Reiniciar app con PM2
pm2 restart dental-app || pm2 start server.js --name dental-app

echo "✅ Deploy completado: $(date)"
```

**Guardar:** `Ctrl+X` → `Y` → `Enter`

**Hacer ejecutable:**

```bash
chmod +x ~/deploy.sh

# Probar manualmente
~/deploy.sh
```

---

#### **Paso 3: Crear servidor webhook**

```bash
nano ~/webhook.js
```

**Contenido:**

```javascript
const http = require('http');
const { exec } = require('child_process');

const PORT = 9000; // Puerto interno para webhook
const SECRET = 'TU_SECRETO_AQUI_123'; // Cambia esto

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/deploy') {
        // Aquí podrías validar el secret de GitHub
        console.log('🚀 Deploy iniciado:', new Date());
        
        exec('/home/dental/deploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Error:', error);
                return;
            }
            console.log('✅ Output:', stdout);
            if (stderr) console.error('⚠️ Stderr:', stderr);
        });
        
        res.writeHead(200);
        return res.end('Deploy iniciado');
    }
    
    res.writeHead(404);
    res.end('Not found');
}).listen(PORT, () => {
    console.log(`🎣 Webhook escuchando en puerto ${PORT}`);
});
```

**Guardar y lanzar con PM2:**

```bash
pm2 start webhook.js --name "dental-webhook"
pm2 save
```

---

#### **Paso 4: Configurar Nginx para el webhook**

```bash
# Volver a root
exit

# Editar config de Nginx
nano /etc/nginx/sites-available/dental-app.conf
```

**Añadir esta sección DENTRO del bloque server:**

```nginx
# Webhook endpoint
location /webhook-deploy {
    proxy_pass http://127.0.0.1:9000/deploy;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

**Recargar Nginx:**

```bash
nginx -t
systemctl reload nginx
```

---

#### **Paso 5: Configurar Webhook en GitHub**

1. Ve a tu repo: https://github.com/jfrances12330/Contabilidad-Dental-Saas
2. **Settings** → **Webhooks** → **Add webhook**
3. **Payload URL:** `http://TU_DOMINIO.com/webhook-deploy`
   - O si usas IP: `http://185.158.107.45/webhook-deploy`
4. **Content type:** `application/json`
5. **Which events:** Solo "Just the push event"
6. **Active:** ✅
7. Click **Add webhook**

---

#### **Paso 6: Probar el auto-deploy**

1. Haz un cambio pequeño en tu código local
2. `git add .`
3. `git commit -m "test: probar auto-deploy"`
4. `git push origin main`
5. ⏳ Espera 10-30 segundos
6. Verifica que la app se actualizó:

```bash
ssh root@185.158.107.45
pm2 logs dental-app
```

---

### **MEJORA 2: SSL/HTTPS con Certbot (10 min)**

**Beneficio:** Certificado SSL gratis, conexión segura.

```bash
# Instalar Certbot
apt update
apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL (cambia por tu dominio)
certbot --nginx -d app.lobatodental.com

# Seguir instrucciones en pantalla
# Certbot configurará Nginx automáticamente
```

**Renovación automática:**

```bash
# Probar renovación
certbot renew --dry-run

# Si funciona, está configurado para auto-renovar
```

---

### **MEJORA 3: Monitoreo con PM2 Plus (Opcional)**

**Beneficio:** Panel web para ver estado de apps, CPU, RAM, logs.

1. Crea cuenta gratis en: https://app.pm2.io
2. Sigue instrucciones para linkear tu VPS
3. Tendrás dashboard web para monitorear todo

---

### **MEJORA 4: Backups Automatizados**

**Script de backup diario:**

```bash
nano /root/backup-dental.sh
```

**Contenido:**

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
APP_DIR="/var/www/dental-app"

mkdir -p $BACKUP_DIR

# Backup del código
tar -czf $BACKUP_DIR/dental-app_$DATE.tar.gz $APP_DIR

# Backup de conversaciones (si existen)
if [ -f $APP_DIR/conversations.json ]; then
    cp $APP_DIR/conversations.json $BACKUP_DIR/conversations_$DATE.json
fi

# Mantener solo últimos 7 días
find $BACKUP_DIR -name "dental-app_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "conversations_*.json" -mtime +7 -delete

echo "✅ Backup completado: $DATE"
```

**Hacer ejecutable:**

```bash
chmod +x /root/backup-dental.sh
```

**Programa backup diario (cron):**

```bash
crontab -e
```

**Añadir esta línea:**

```
0 3 * * * /root/backup-dental.sh >> /var/log/dental-backup.log 2>&1
```

*(Se ejecutará todos los días a las 3:00 AM)*

---

### **MEJORA 5: Firewall UFW (5 min)**

**Beneficio:** Bloquear puertos innecesarios.

```bash
# Permitir SSH
ufw allow 22/tcp

# Permitir HTTP y HTTPS
ufw allow 'Nginx Full'

# Activar firewall
ufw enable

# Ver estado
ufw status
```

---

### **MEJORA 6: Monitoreo de Recursos**

**Instalar htop:**

```bash
apt install htop -y

# Ejecutar para ver uso de CPU/RAM en tiempo real
htop
```

**Ver logs de PM2:**

```bash
pm2 logs dental-app
pm2 monit
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN:

Cuando decidas implementar estas mejoras:

- [ ] Crear usuario `dental` separado
- [ ] Implementar auto-deploy con webhook
- [ ] Configurar SSL/HTTPS con Certbot
- [ ] Configurar backups automáticos
- [ ] Activar firewall UFW
- [ ] (Opcional) Configurar PM2 Plus

---

## 🎯 PRIORIDAD:

1. **Alta:** SSL/HTTPS (seguridad básica)
2. **Alta:** Backups automáticos (protección de datos)
3. **Media:** Auto-deploy (comodidad)
4. **Media:** Firewall (seguridad adicional)
5. **Baja:** PM2 Plus (nice to have)

---

## 📞 NOTAS:

- **Tiempo total:** ~1-2 horas para implementar todo
- **Mejor momento:** Cuando la app esté estable y sin cambios frecuentes
- **Orden sugerido:** SSL → Backups → Auto-deploy → Firewall → Monitoreo

---

**¡Guarda este archivo para cuando tengas tiempo!** 🚀

*Creado por: Antigravity AI + Jorge Frances*
*Fecha: 6 enero 2026*
