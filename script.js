document.addEventListener('DOMContentLoaded', () => {
    // 1. Crea el contenedor de fuegos artificiales y añádelo al cuerpo
    const container = document.createElement('div');
    container.className = 'fireworks-container';
    document.body.appendChild(container);

    // Colores que usaremos para la explosión
    const colors = ['#ff4500', '#ffd700', '#ff1493', '#00ff7f', '#1e90ff', '#ffffff'];
    const totalParticles = 40; // Número de partículas por explosión

    /**
     * Genera un fuego artificial en una posición específica.
     * @param {number} x - Posición X (horizontal) en píxeles.
     * @param {number} y - Posición Y (vertical) en píxeles.
     */
    function createFirework(x, y) {
        // Elige un color al azar
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            
            // Establece la posición inicial de la partícula
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = color;

            // Calcula un ángulo y distancia aleatorios para la dispersión (la explosión)
            const angle = Math.random() * 4 * Math.PI;
            const distance = Math.random() * 100 + 80; // Distancia de 50px a 130px
            
            // Calcula el desplazamiento final (variables CSS)
            const finalX = Math.cos(angle) * distance;
            const finalY = Math.sin(angle) * distance;

            // Asigna las variables CSS para la animación 'explode'
            particle.style.setProperty('--x', `${finalX}px`);
            particle.style.setProperty('--y', `${finalY}px`);
            
            // Inicia la animación de explosión
            const duration = Math.random() * 0.8 + 0.4; // Duración entre 0.4s y 1.2s
            particle.style.animation = `explode ${duration}s ease-out forwards`;
            
            container.appendChild(particle);

            // Elimina la partícula del DOM después de que termine la animación
            setTimeout(() => {
                particle.remove();
            }, duration * 1000); 
        }
    }

    /**
     * Lanza fuegos artificiales automáticamente a intervalos y posiciones aleatorias.
     */
    function launchFireworks() {
        // Posiciones aleatorias dentro del 20% y 80% de la pantalla para evitar bordes
        const randomX = Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.2);
        const randomY = Math.random() * (window.innerHeight * 0.5) + (window.innerHeight * 0.1);
        
        createFirework(randomX, randomY);
    }
    
    // Lanza un fuego artificial inmediatamente y luego cada 1.5 a 2.5 segundos
    launchFireworks();
    setInterval(launchFireworks, Math.random() * 1000 + 1500); // Intervalo de 1.5s a 2.5s
});