import React, { createContext, useState } from 'react'

const CartContext = createContext();

const CartProvider = (props) =>{

    const [productosElegidos, setProductosElegidos] = useState([])

    const itemEnCarrito = (id) => {
        return productosElegidos.find((prod) => prod.id === id);
    };

    const agregarProducto = (producto) => {
        const itemParaActualizar = itemEnCarrito(producto.id);
        // si el elemento si existe actualizamos cantidad elegida y precio subtotal
        if (itemParaActualizar){
            let precioParaActualizar = itemParaActualizar.precio;
            itemParaActualizar.elegidos = itemParaActualizar.elegidos + 1;
            itemParaActualizar.precioSubTotal = itemParaActualizar.elegidos * precioParaActualizar;
            setProductosElegidos([...productosElegidos]);
        }
        // si el elemento no existe ya en el array productosElegidos que....
        else{
            const nuevoProducto = {
                id : producto.id,
                nombre : producto.nombre,
                precio : producto.precio,
                img1 : producto.img1,
                img2 : producto.img2,
                precioSubTotal : producto.precio,
                elegidos : 1,
            };
            setProductosElegidos([...productosElegidos, nuevoProducto]);
        }
    };

    const limpiarCarrito = () => {
        setProductosElegidos= [];
        window.sessionStorage.clear();
    };

    const eliminarItem = (id) => {
        let itemParaActualizar = itemEnCarrito
        // si la cantidad es menos a dos limpiamos el producto
        if (itemParaActualizar.elegidos < 2 ){
            const prodId = id
            productosElegidos = productosElegidos.filter((product) => product.id !== prodId);
            itemParaActualizar.elegidos = 0;
        }
        // sino descontamos uno a cantidad elegida
        else {
            itemParaActualizar.elegidos = itemParaActualizar.elegidos - 1;
            let precioParaActualizar = itemParaActualizar.precio;
            itemParaActualizar.precioSubTotal = itemParaActualizar.elegidos * precioParaActualizar;
        };
    };

    const totalPrecio = () => {
        const totalPrecio = productosElegidos.reduce((acumulador, product) => acumulador + product.precioSubTotal, 0);
    };

    const totalCantidad = () => {
        const totalPrecio = productosElegidos.reduce((acumulador, product) => acumulador + product.elegidos, 0);
    };

    const localStorage = () => {
        // convertimos los objetos en json
        const JsonProductos = JSON.stringify(productosElegidos)
        // almacenamos en localStorage
        window.localStorage.setItem("productosElegidos", JsonProductos)
        window.dispatchEvent(new Event('storage'))
    };

    return(
        <CartContext.Provider value={{productosElegidos, limpiarCarrito, itemEnCarrito,  eliminarItem, totalPrecio, totalCantidad, agregarProducto, localStorage}}>
        {props.children}
        </CartContext.Provider>
    )
}


export {CartProvider}
export default CartContext;       