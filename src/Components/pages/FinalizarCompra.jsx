import React from 'react'
import { Link } from 'react-router-dom'

const FinalizarCompra = () => {
    const productosElegidos = window.localStorage.getItem("productosElegidos");
    const productosElegidosParse = JSON.parse(productosElegidos);
    const form = document.querySelector("#form")

    

    const totalPrecio = window.localStorage.getItem("Total");
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const persona = document.querySelector('#persona').value
        const email = document.querySelector('#email').value
            if(!email === '' || persona === ''){
            //     Swal.fire({
            //     title: "¡Debes completar tu email y nombre!",
            //     text: "Rellena el formulario",
            //     icon: "error",
            //     confirmButtonText: "Aceptar",
            // })
        }
    });
    return (
        <form id="form" method="POST">
            <div className="form-group row mt-5">
                <label htmlFor="cliente" className="col-12 col-md-2 col-form-label h2">Cliente :</label>
                    <div className="col-12 col-md-10">
                        <input type="text" className="form-control" id="persona" placeholder="Nombre y Apellido" name="persona"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-12 col-md-2 col-form-label h2">Correo :</label>
                    <div className="col-12 col-md-10">
                        <input type="text" className="form-control"  name="email" id="email" placeholder="Correo Electronico"/>
                    </div>
                </div>
            <div  className="form-group table-responsive">
                <table  className="mt-5 mb-5 table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Sub Total</th>
                        </tr>
                    </thead>
                    {productosElegidosParse.map(product =>                  
                    <tbody key={product.id}>
                        <tr>
                            <td>{product.nombre}</td>
                            <td>${product.precio}</td>
                            <td>{product.elegidos}</td>
                            <td>${product.precioSubTotal}</td>
                        </tr>
                    </tbody>
                    )}
                    <tbody>
                        <tr>
                            <th colSpan="4" scope="col" className="text-right">
                                <h2>total precio ${totalPrecio}</h2>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <div className="col-md-4 mb-2">
                        <Link className="btn btn-info btn-block" aria-current="page" to={'/Productos'}>Seguir Comprando</Link>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <input type="submit" className="btn btn-success btn-block" id="button" value="Finalizar compra" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FinalizarCompra