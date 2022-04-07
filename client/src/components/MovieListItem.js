import React from 'react';
import "../styles/MovieListItem.css";
import {Button} from 'semantic-ui-react'

function MovieListItem(props){
    const {poster, title, year, existing, clickMovie} = props
    const  deleteMovie = (event) => {
        event.stopPropagation();
    }
    const click = () =>{
        clickMovie(title, year);
    }
    return(
        <div className="Movie_Item" onClick={click}>
            <div>
                <img id="Poster" src={poster}></img>
            </div>
            <div className="Movie_Info_Container">
                <label className="Movie_Info">{title}</label>
                <label className="Movie_Info Movie_Info_Year">({year})</label>
                {existing? <Button onClick={deleteMovie}>Delete</Button> : null}
            </div>
        </div>
    )
}

export default MovieListItem;