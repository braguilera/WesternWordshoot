import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const JuegoVaquero = () => {
    const [palabras, setPalabras] = useState([]);
    const [inputUsuario, setInputUsuario] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const palabrasEjemplo = ["react", "vaquero", "desierto", "disparo"]; // Puedes usar un array más amplio

  // Genera palabras voladoras periódicamente
    useEffect(() => {
        const intervalo = setInterval(() => {
            const nuevaPalabra = palabrasEjemplo[Math.floor(Math.random() * palabrasEjemplo.length)];
            setPalabras(palabras => [...palabras, { texto: nuevaPalabra, id: Date.now() }]);
        }, 3000); // Cambia el tiempo para ajustar la dificultad
        return () => clearInterval(intervalo);
    }, []);

  // Verificar si la palabra escrita coincide con alguna palabra en pantalla
    useEffect(() => {
        palabras.forEach((palabra) => {
            if (palabra.texto === inputUsuario) {
                setPuntuacion(puntos => puntos + 10);
                setPalabras(palabras => palabras.filter(p => p.id !== palabra.id));
                setInputUsuario("");
            }
        });
    }, [inputUsuario, palabras]);

  // Maneja el ingreso del usuario
    const manejarTecla = (e) => {
        setInputUsuario(prev => prev + e.key);
    };

    useEffect(() => {
        window.addEventListener('keypress', manejarTecla);
        return () => window.removeEventListener('keypress', manejarTecla);
    }, []);

    return (
        <div>
            <h1>Puntuación: {puntuacion}</h1>
            <div className="vaquero">🤠</div>
            <div className="palabras">
            {palabras.map(palabra => (
                <motion.div
                    key={palabra.id}
                    initial={{ x: '100vw' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 5 }} // Ajusta la velocidad
                    onAnimationComplete={() => setPalabras(palabras => palabras.filter(p => p.id !== palabra.id))}
                >
                {palabra.texto}
                </motion.div>
            ))}
            </div>
        </div>
    );
};

export default JuegoVaquero;
