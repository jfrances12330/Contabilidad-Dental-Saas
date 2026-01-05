# 05_Conexión Google Sheets con Tu Aplicación

Para conectar tu Google Sheet y que actúe como "cerebro" de la web, seguiremos un método sencillo y profesional llamado **"Publicar como CSV"**. Esto permite que la web lea los datos sin necesidad de bases de datos complejas.

## Paso 1: Preparar tu Google Sheet
Asegúrate de que tu pestaña de **Ingresos** tenga exactamente estas cabeceras en la primera fila:
`Fecha | Concepto | Importe | Coste | Tipo | Doctor | Categoria`

## Paso 2: Publicar en la Web
1. En tu Google Sheet, ve a: **Archivo > Compartir > Publicar en la web**.
2. Selecciona la pestaña (ej: "Ingresos").
3. Cambia "Página web" por **Valores separados por comas (.csv)**.
4. Haz clic en **Publicar** y copia el enlace que aparece.

## Paso 3: Pegar el enlace en la Aplicación
Abriremos tu `index.html` y buscaremos la línea donde se define la carga de datos.
1. Busca la función `loadFromSheets()`.
2. Sustituye la URL de ejemplo por la URL que copiaste en el Paso 2.

## Paso 4: Sincronización Automática
Cada vez que abras la aplicación o pulses el botón "Actualizar", la web irá a buscar los últimos cambios en tu Google Sheet automáticamente.

---

> [!IMPORTANT]
> **Privacidad:** Al publicar como CSV, Google genera un enlace técnico. Aunque es difícil de adivinar, cualquier persona con el enlace podría ver los datos. Para máxima seguridad, también podemos implementar una conexión vía API privada (más complejo).
