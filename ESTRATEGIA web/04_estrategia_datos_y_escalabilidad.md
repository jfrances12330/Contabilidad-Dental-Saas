# 04_Estrategia de Datos y Escalabilidad

Este documento detalla cómo manejaremos el crecimiento de los datos en la aplicación Dental SaaS para asegurar que el rendimiento sea siempre óptimo.

## 1. El Enfoque "Raw Data" (Datos Brutos)
Alimentaremos la aplicación con cada fila de ingreso y gasto individual. 
- **Ventaja:** Permite análisis granulares (ej: "¿Qué tratamientos de ortodoncia se hicieron el mes pasado?").
- **Escalabilidad:** Los navegadores modernos pueden procesar decenas de miles de filas sin despeinarse.

## 2. Optimización para la IA (Gemini)
No enviaremos miles de filas a la IA en cada pregunta. La aplicación hace el "trabajo sucio":
1. La App procesa los datos y genera resúmenes (KPIs, porcentajes, rankings).
2. Cuando preguntas a la IA, le enviamos un **"Contexto Analítico"** ya resumido.
3. Ejemplo: *"Facturación: 25k, Gasto: 10k, Líder: Dr. Fernando"*.
4. Esto acelera la respuesta y evita errores de conteo de la propia IA.

## 3. Manejo a Largo Plazo
- **Archivado:** Si después de 5 años los datos se vuelven excesivos, implementaremos un selector de año para cargar solo los datos necesarios por sesión.
- **Velocidad:** El uso de JavaScript puro asegura que la App sea instantánea independientemente del tamaño del archivo Google Sheets.
