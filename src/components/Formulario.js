import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'

export const Formulario = () => {

    const { categorias } = useContext(CategoriasContext)
    const { setIngredientes, setConsulta } = useContext(RecetasContext)

    const [ busqueda, setBusqueda ] = useState({
        nombre: '',
        categoria: ''
    })

    // Leer los contenidos
    const obtenerDatosReceta = ( e ) => {
        setBusqueda({
            ...busqueda,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        setIngredientes( busqueda )
        setConsulta( true )
    }

    return (
        <form
            className="col-12"
            onSubmit={ handleSubmit }
        >
            <fieldset className="text-center">
                <legend>Enter the ingredients and the category</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Tequila"
                        onChange={ obtenerDatosReceta }
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={ obtenerDatosReceta }
                    >
                        <option value="">- Select your Category -</option>
                        { categorias.map( categoria => (
                            <option 
                                key={ categoria.strCategory }
                                value={ categoria.strCategory }
                            >
                                { categoria.strCategory }
                            </option>
                        )) }

                    </select>

                </div>

                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-blocl btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>

            </div>
        </form>
    )
}
