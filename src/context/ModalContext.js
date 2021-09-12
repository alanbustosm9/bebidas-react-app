import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'



export const ModalContext = createContext()


export const ModalProvider = ( props ) => {

    // State del provider
    const [ idReceta, setIdReceta ] = useState(null)
    const [ infoReceta, setReceta ] = useState({})

    useEffect(() => {
        const obtenerReceta = async () => {
            if ( !idReceta ) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ idReceta }`
            const resultado = await axios.get( url )
            setReceta( resultado.data.drinks[0] )
        }
        obtenerReceta()
        
    }, [ idReceta ])


    return (
        <ModalContext.Provider
            value = {{
                infoReceta,
                setIdReceta,
                setReceta
            }}
        >
            { props.children }
        </ModalContext.Provider>
    )
}



