import React, { useContext, useState } from 'react'
import { ModalContext } from '../context/ModalContext'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
// import { ModalConsumer } from '../context/ModalContext';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));




export const Receta = ({ receta }) => {


    const [ modalStyle ] = useState(getModalStyle)
    const [ open, setOpen ] = useState(false)

    const classes = useStyles()

    const handleOpen = () => {
        setOpen( true )
    }

    const handleClose = () => {
        setOpen( false )
    }


    const { infoReceta, setIdReceta, setReceta } = useContext(ModalContext)

    // Muestra los ingredientes
    const mostrarIngredientes = ( infoReceta ) => {
        let ingredientes = [];
        for( let i = 1; i < 16; i++ ){
            if ( infoReceta[`strIngredient${ i }`] ) {
                ingredientes.push(
                    
                    <li key={ i }>{ infoReceta[`strIngredient${ i }`] } { infoReceta[`strMeasure${ i }`] } </li>
                )
            }
        }
        return ingredientes
    }


    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">
                    { receta.strDrink }
                </h2>
                <img className="card-img-top" src={ receta.strDrinkThumb } alt={`Imagen de ${ receta.strDrink }`} />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={ () => {
                            setIdReceta( receta.idDrink )
                            handleOpen()
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={ open }
                        onClose = {() => {
                            setIdReceta(null)
                            setReceta({})
                            handleClose()
                        }}
                    >
                        <div style={ modalStyle } className={ classes.paper }>
                            <h2>{infoReceta.strDrink}</h2>
                            <h3 className="mt-4">Instructions</h3>
                            <p>
                                { infoReceta.strInstructions }
                            </p>
                            <img className="img-fluid my-4" src={ infoReceta.strDrinkThumb } alt={`Imagen de ${ receta.strDrink }`}/>

                            <h3>Ingredients and Measures</h3>
                            <ul>
                                { mostrarIngredientes(infoReceta) }
                            </ul>
                        </div>
                    </Modal>
                </div> 
            </div>
        </div>
    )
}
