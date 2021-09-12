import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'

// Crear el context

export const CategoriasContext = createContext();


// Provider es donde se encuentran las funciones y state

export const CategoriasProvider = ( props ) => {

    // Crear el state del context
    const [ categorias, setCategorias ] = useState([])

    // Ejecutar el llamado a la API
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

            const categorias = await axios.get( url )
            setCategorias( categorias.data.drinks )
            
        }

        obtenerCategorias();    
    }, [])


    return (

        <CategoriasContext.Provider
            // Dentro del value va todo lo que se quiera heredar hacia los componentes
            value={{
                categorias
            }}
        >
            { props.children }
        </CategoriasContext.Provider>


    )



}