---
description: Implementación de Inteligencia de Negocio y KPIs "Elite"
---

# Objetivo
Transformar Lobato Dental en una herramienta de Business Intelligence siguiendo las recomendaciones del Product Manager & Data Scientist. Implementar KPIs reales basados en las columnas existentes del Google Sheet para optimizar la toma de decisiones.

# Información de Origen (Google Sheet)
Se utilizarán las siguientes columnas ya presentes en el CSV:
- **Fecha**: Temporalidad.
- **Dentista**: Rendimiento individual.
- **Paciente**: Fidelización (Nuevos vs Recurrentes).
- **Concepto**: Análisis de tratamientos.
- **Efectivo/Tarjeta/Financiación**: Mix de cobros.
- **Laboratorio**: Ratio de costes externos.
- **Total**: Ingresos brutos.

# Tareas

## 1. Dashboard "Cockpit" (Vista Gerente)  ✅
- [x] **Margen de Beneficio Real**: Implementado con sistema de semáforo (Traffic Light).
- [x] **Forecast Maestro**: Refinado con promedio diario (k€/día) y proyección a 30 días.
- [x] **KPI Fidelización**: Análisis de Pacientes Nuevos vs Recurrentes implementado.
- [x] **Limpieza Visual**: Dashboard simplificado y enfocado en KPIs estratégicos.

## 2. Equipo Médico (Auditoría de Talento) ✅
- [x] **Ticket Medio por Doctor**: Calculado sobre Pacientes ÚNICOS para precisión real.
- [x] **Barras de Cumplimiento**: Visualización de progreso con indicadores de ritmo (on-pace/behind).
- [x] **Ranking de Facturación**: Medallero dinámico (🥇🥈🥉) integrado.
- [x] **Tendencia de Crecimiento**: Indicador de crecimiento porcentual vs periodo anterior por doctor.

## 3. Analítica Financiera (Auditoría Profunda) ✅
- [x] **Ratio de Laboratorio (KPI Crítico)**: Implementado con alertas visuales (Óptimo < 20%).
- [x] **Mix de Pagos**: Gráfico de distribución Efectivo/Tarjeta/Financiación añadido.
- [x] **EBITDA Estimado**: Implementado como métrica principal de rentabilidad operativa.

# Consideraciones Técnicas
- **backend**: Mantener el procesamiento en el frontend (navegador) para privacidad total.
- **UX/UI**: Mantener el estilo "Elite" (glassmorphism/dark mode) en los nuevos indicadores.
