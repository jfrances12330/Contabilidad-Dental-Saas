# 🤖 GUÍA COMPLETA: Desarrollar Chatbots IA Personalizados para WordPress

*Documentación completa basada en el proyecto Lobato Dental - Enero 2026*

---

## 📋 ÍNDICE

1. [Arquitectura General](#arquitectura)
2. [Backend Node.js + OpenAI](#backend)
3. [Integración en WordPress](#wordpress)
4. [Personalización del Prompt](#prompt)
5. [Deployment en Hostinger](#deployment)
6. [Monetización](#monetizacion)
7. [Casos de Uso](#casos-uso)

---

## 🏗️ ARQUITECTURA GENERAL

### Componentes:

```
WordPress (www.miweb.com)
    ↓ (Widget JavaScript)
Backend Node.js (chat.miweb.com) → OpenAI API
    ↓ (Almacenamiento)
Base de Datos (Conversaciones)
```

### Ventajas de esta arquitectura:

✅ **Reutilizable:** Un backend → Múltiples webs  
✅ **Escalable:** Fácil de mantener y actualizar  
✅ **Independiente:** No depende de WordPress  
✅ **Segura:** API keys en backend, no expuestas  
✅ **Performance:** No sobrecarga WordPress  

---

## 🖥️ BACKEND NODE.JS + OPENAI

### Estructura de archivos:

```
/chatbot-backend/
├── server.js          # Backend principal
├── package.json       # Dependencias
├── .env              # API keys (NUNCA subir a Git)
├── .gitignore        # Ignorar .env
├── conversations.json # Historial (se genera automático)
└── README.md         # Documentación
```

Consulta el archivo completo descargado para ver todos los detalles técnicos, código completo y ejemplos de integración.

---

**Documento guardado en:** `/Users/jorgefrancesolivas/Desktop/Contabilidad Dental/DOCS/GUIA-CHATBOTS-WORDPRESS.md`
