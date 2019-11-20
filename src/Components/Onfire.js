import React from 'react';
import { Image } from "react-bootstrap";

export const Onfire = (props) => (
    
    <div className="Onfire">
       <Image fluid src={props.image}/>
       <label>¡ON <span>FIRE</span>!</label>
       <p>Hoy {props.dia} de {props.mes} tienes:</p>
       <h2>{props.puntos}<br/><span>puntos</span></h2>
    </div>
);