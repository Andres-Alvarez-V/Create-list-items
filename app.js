class Product{
    // Clase product para crear el objeto del producto con sus respectivos valores
    constructor(name,price,year){
        this.name=name;
        this.price=price;
        this.year=year;
    }
}

class UI{

    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        console.log(element);
        //innerHTML agrega un template html dentro de otro valor html
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name:</strong> ${product.name}
                    <strong>Product Year:</strong> ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        console.log(element);
        productList.appendChild(element);
    }
    resetForm(){
        document.getElementById('product-form').reset();//reeset resetea todos los valores que hayan en el formulario pero sin recargar la pagina
    }
    deleteProduct(element){
        element.parentElement.parentElement.parentElement.remove();//parentElement es el padre del elemtento
    }
    showMessage(mesagge,classColor){
        const div = document.createElement('div');
        div.className = `alert alert-${classColor} mt-1`;
        div.appendChild(document.createTextNode(mesagge));
        //Showing DOM
        const container = document.querySelector('.container');
        const app = document.getElementById('App');
        container.insertBefore(div, app);
        setTimeout(() =>{
            document.querySelector('.alert').remove();

        }, 3000);
    }
}

//DOM EVENTS
document.getElementById('product-form')
    .addEventListener('submit', (ev) =>{
        //obtengo los elementos del dom
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        //guardo la clase iu
        const iu= new UI();

        if (name === '' || price === '' || year === '') {
            iu.showMessage('Tienes que completar todos los campos', 'danger');
        } else {
            //Creo un nuevo objeto guardando en product con sus valores. Luego los agrego al dom con la clase iu utilizando sus metodos
            const product = new Product(name,price,year);
            iu.addProduct(product);
            iu.resetForm();
            iu.showMessage('Se ha añadido correctamente un nuevo producto', 'success');
        }
        ev.preventDefault();//Esto sirve para evitar que la pagina se recargue automaticamente cuando presionamps el boton submit
    });


    //Agrego un listener a el contenedor de los productos y si el cliente le da click a el boton delete se va a revisar si le dio a la etiqueta que tiene 
    //el name="delete" y si si, se lanza el metodo de la clase iu. 
    //Se llama al metodo showMessage pasando como parametro el mensaje y el color para bootstrap.
document.getElementById('product-list')
    .addEventListener('click', (ev) => {
        const iu= new UI();
        if (ev.target.name === 'delete') {
            iu.deleteProduct(ev.target);
            iu.showMessage('Se ha eliminado exitosamente el producto', 'info');
        }
    });

