import React, { useState, useEffect } from 'react';

import './styles.css';

interface ITimerProps { }

interface ITimer {
    day: number;
    month: number;
    year: number;
    hour: number;
    minutes: number;
    seconds: number;
}

const pad = (value: number): string => value < 10 ? `0${value}` : String(value);

export const Timer = (_: ITimerProps) => {
    const [date, setDate] = useState<ITimer>({ day: 0, month: 0, year: 0, hour: 0, minutes: 0, seconds: 0 });

    /**
     * Para inicializar nuestro timer, necesitaremos usar useEffect, y así usar el ciclo de vida del componente React,
     * de lo contrario, cada vez que el componente Timer se actualce, se creará un setInterval
     */
    //setInterval(() => { }, 1000); <- Vaaaamos, ni se te ocurra 😅

    /** 
     * Para el uso de useEffect, necesitaremos parsarle dos argumentos
     * el primero será una función, en la cual ejecutaremos nuestra magia
     * el segundo parámetro será un array, y le indicará al useEffect, cuando a de activarse
     */
    useEffect(() => {
        const timerId = setInterval(() => {
            const today = new Date();

            setDate({
                day: today.getDate(),
                month: today.getMonth() + 1,
                year: today.getFullYear(),
                hour: today.getHours(),
                minutes: today.getMinutes(),
                seconds: today.getSeconds()
            });
        }, 1000);

        // El hook useEffect, podemos user el retorno de la función, para así entrar en el ciclo de vida, y ejecutar
        // la magia que queramos cuando el componente Timer, se destruya.
        return () => {
            clearInterval(timerId);
        }
    }, []);
    // Si se le pasa array vacío, le estaremos diciendo que se ejecuté solamente al inicio de nuestro componente,
    // en este caso, nuestro componente Timer

    return <div className="timer">
        <span className="timer__date">
            <span>{pad(date.day)}</span> / <span>{pad(date.month)}</span> / <span>{pad(date.year)}</span>
        </span>
        <span>{pad(date.hour)}</span>
        <span>:</span>
        <span>{pad(date.minutes)}</span>
        <span>:</span>
        <span>{pad(date.seconds)}</span>
    </div>;
}