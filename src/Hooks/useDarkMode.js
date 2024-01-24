import React, { useEffect, useState } from 'react';

function useDarkMode() {
    // Estado para almacenar el tema actual (dark o light)
    const [theme, setTheme] = useState(localStorage.theme);

    // Determina el tema opuesto al actual
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        // Accede al elemento raíz del documento
        const root = window.document.documentElement;

        // Elimina la clase del tema opuesto y agrega la clase del tema actual
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        // Almacena el tema actual en el almacenamiento local
        localStorage.setItem('theme', theme);

    }, [theme, colorTheme]);

    // Devuelve el tema actual y la función para cambiar el tema
    return [colorTheme, setTheme];
}

export default useDarkMode;