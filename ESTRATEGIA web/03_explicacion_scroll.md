# Explicación del Scroll y la URL en Chrome Mobile

¿Por qué Chrome oculta la URL en algunas webs y en otras no?

## El Problema: "Scroll Interno" vs "Scroll Global"

Los navegadores móviles (Chrome y Safari) tienen una función inteligente: cuando detectan que el usuario está leyendo contenido y hace scroll hacia abajo, **minimizan su propia interfaz (la barra de direcciones y botones)** para dar más espacio a la aplicación.

Sin embargo, este comportamiento **solo se activa si el scroll ocurre en el elemento raíz** de la web (el `<body>`).

### Estado actual de tu App
Tu aplicación actualmente usa un diseño de "Pantalla Completa" (SPA style):
1.  El `<body>` está bloqueado (`overflow-hidden`).
2.  El contenido está dentro de un contenedor (`#view-dashboard`) que tiene su propio scroll (`overflow-y-auto`).

Para Chrome, **la página no se está moviendo**, solo se está moviendo una "caja" dentro de ella. Por eso, Chrome nunca oculta la URL.

## Nuestra Propuesta

Para que tu aplicación se comporte como una App nativa (ocultando la URL al bajar), realizaremos estos cambios:

1.  **Liberar el scroll del Body**: Permitiremos que el navegador vea el movimiento real.
2.  **Fijar Elementos**: Usaremos `position: fixed` o `sticky` para que el menú de abajo y la barra lateral sigan ahí mientras el contenido se desliza.
3.  **Dynamic Viewport (DVH)**: Utilizaremos unidades de medida modernas (`dvh`) que se adaptan automáticamente cuando la URL aparece o desaparece, evitando saltos bruscos en el diseño.

> [!TIP]
> Al realizar este cambio, tu aplicación se sentirá más espaciosa y "nativa" en iPhone y Android.
