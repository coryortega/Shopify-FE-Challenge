import React, { useEffect, useState } from 'react';
import "./MovieCard.css";


export default function MovieCard(props) {
    return(
        <div className="card-container">
            <h3>{props.title}</h3>
            <p>({props.year})</p>
            {props.src == 'N/A' ? <p>No image available</p> : <img src={props.src} alt="No movie image"/>}
        </div>
    );
}