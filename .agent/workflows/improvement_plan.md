---
description: Plan de mejoras técnicas y funcionales para la aplicación Lobato Dental SaaS
---

# 🚀 Plan de Mejoras - Lobato Dental

Este documento rastrea las mejoras técnicas pendientes y futuras implementaciones.

## 🔥 Alta Prioridad (Próximos Pasos)

### 1. Integración Nativa Google Sheets API (Backend)
**Estado:** ⬜ Pendiente
**Objetivo:** Reemplazar la importación CSV pública por una conexión directa y segura API-to-API.
**Ventajas:**
- Sincronización real en tiempo real (sin retraso de publicación web).
- Tipado estricto (fechas, números) evitando errores de parseo.
- Privacidad total (no requiere "Publicar en la web").
- Posibilidad futura de escritura (editar el Excel desde la App).

**Pasos de Implementación:**
1. [User] Crear proyecto en Google Cloud Console.
2. [User] Habilitar **Google Sheets API**.
3. [User] Crear **Service Account** y descargar `credentials.json`.
4. [Dev] Instalar `googleapis` en Node.js.
5. [Dev] Reescribir lógica de sincronización en `server.js` para usar la API en lugar de `fetch` CSV.

## 🌟 Media Prioridad

### 2. Refinamiento de Métricas "Suma Mostrada"
**Estado:** ✅ Completado (MVP)
- Se ha ajustado para mostrar Neto en filtros globales.
- Posible mejora: Añadir selectores de qué métricas ver en el dashboard.

### 3. Login real multi-usuario
**Estado:** ⬜ Pendiente
- Actualmente es un solo usuario (Admin).
- Futuro: Roles (Doctor vs Gerente) para que cada doctor vea solo sus estadísticas.

## 📝 Notas Técnicas
- La integración de la API de Sheets requiere reiniciar el servidor y configurar variables de entorno nuevas (`GOOGLE_APPLICATION_CREDENTIALS`).
