

// Obtener referencias al modal y al botón de abrir
var modal = document.getElementById('modal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementById('cierraModalAgregar');

// Abrir el modal cuando se hace clic en el botón
modalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Cerrar el modal cuando se hace clic en el botón de cierre
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

//crear cliente
let formularioCrear = document.getElementById('myForm')

formularioCrear.addEventListener('click', function(e) {
// e.preventDefault(); 

let nombre = document.getElementById("nombre").value
let apellido = document.getElementById("apellido").value
let telefono = document.getElementById("telefono").value
let correo = document.getElementById("correo").value
let dni = document.getElementById("dni").value

let formData = new FormData();
formData.append('nombre', nombre);
formData.append('apellido', apellido);
formData.append('telefono', telefono);
formData.append('correo', correo);
formData.append('dni', dni);

axios.post('../Controller/crearUsuarios.php', formData)
    .then(function (response) {
        let modal = document.getElementById('modal');
        modal.style.display = "none"
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("dni").value = ""

        const ctnCuadrado = document.getElementById('ctnCuadrado');
        ctnCuadrado.innerHTML = "";
        let modaltree = document.getElementById("modaltres")
        modaltree.style.display = "block";
        let resCreado = document.getElementById("resCreado")
        resCreado.style.display = "block"
        
        setTimeout(function(){
            modaltree.style.display = "none"
            resCreado.style.display = "none"
        }, 1000)

        leer()
    })
    .catch(function (error) {
        console.log(error);
    });
});




function leer(){
    let ctnCuadradodo = document.getElementById("ctnCuadradodo")

    axios.get('../Controller/verUsuarios.php')
        .then(function(response) {
            const usuarios = response.data;
            const ctnCuadrado = document.getElementById('ctnCuadrado');
            let cuadritosHTML = ''; // Variable para acumular el HTML de los cuadritos
            let contador = 1;

            usuarios.forEach(usuario => {
                let esta = ""
                let chec = "";
                contador++
                console.log(contador)
                if(usuario.estado == 1){
                    esta = "Activado"
                    chec = "checked"
                }else{
                    esta = "Desactivado"
                    chec = "";
                }
                cuadritosHTML += `<div  class="col-lg-6 ${usuario.nombre}  ${esta} ">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="row">
                                <div class="col-sm-6 b-r">
                                    <p class="text-center">
                                        <a><i class="fa fa-user-circle big-icon"></i></a>
                                    </p>
                                    <p class="text-center">
                                        <div class=" text-center"><dt>Nombre:</dt>
                                            <dd class="sm-2">${usuario.nombre}</dd>
                                        </div>
                                    </p>
                                    <div class="container">
                                        <div class="d-flex align-items-center">
                                            <label class="switch">
                                                <input id="estadito" type="checkbox" onchange="cambio(this, ${usuario.id_cliente})" ${chec} />
                                                <span class="slider"></span>
                                            </label>
                                            <p class="estado mb-0 mx-4">${esta}</p>   
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <form role="form">
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>DNI:</dt>
                                                <dd class="sm-2"> ${usuario.dni}</dd>
                                            </div>
                                        </dl>
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>Correo:</dt>
                                                <dd class="sm-2"> ${usuario.correo}</dd>
                                            </div>
                                        </dl>
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>Celular</dt>
                                                <dd class="sm-2"> ${usuario.telefono}</dd>
                                            </div>
                                        </dl>
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>Fecha de Creación:</dt>
                                                <dd class="sm-2">${usuario.fecha}</dd>
                                            </div>
                                        </dl>
                                        <div>
                                            <div class="mb-4">
                                                <button  onclick="editar(this,${usuario.id_cliente})" class="btn btn-success float-right mx-2" type="button"><i class="fa fa-edit" href="#modal-form1" data-toggle="modal"></i></button>
                                                <button onclick="eliminar(this,${usuario.id_cliente})" class="btn btn-danger float-right mx-2" type="button"><i class="fa fa-trash-o" ></i></button>
                                                
                                            </div>
                                        </div>
                                    </form>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            
            // Establecer el contenido de ctnCuadrado con todos los cuadritos acumulados
            ctnCuadrado.innerHTML = cuadritosHTML;
        })
        .catch(function(error) {
            console.error('Error obteniendo usuarios:', error);
        });
}

leer();

// inicia check
function cambio(checkbox, id_cliente) {
        // Obtener el estado del checkbox
        const isChecked = checkbox.checked;
        let status = "";
        // Obtener el ID del checkbox
        // const checkboxId = checkbox.id;

        
        if (isChecked) {
             status = "1"
        } else {
            status = "0"
        }

        let enviar = new FormData();
        enviar.append("status", status);
        enviar.append("id", id_cliente);
        axios.post('../Controller/status.php', enviar)
            .then(function (response){
                 let selectElement = document.getElementById('miSelect');
                selectElement.selectedIndex = 0;
                leer();
            })


}
// fin check


// inicia eliminar

    function eliminar(elemento, id){
        let eliminar = new FormData();
        let bus = document.getElementById("bus")
        eliminar.append("id", id);
        axios.post('../Controller/eliminar.php', eliminar)
            .then(function(e){

                let resEnd = document.getElementById("resEnd");
                let modaltres = document.getElementById("modaltres")



                resEnd.style.display = "block"
                modaltres.style.display = "block"

                setTimeout(function(){
                    resEnd.style.display = "none"
                    modaltres.style.display = "none"
                }, 1000)

                bus.value = ""
                let selectElement = document.getElementById('miSelect');
                selectElement.selectedIndex = 0;
                leer();
               
            })
    }
// fin eliminar

// inicia editar
    let modaldos = document.getElementById("modaldos");

    function editar(elemento, id){
        modaldos.style.display = "block";

        let editar = new FormData()
        editar.append("id", id);

        axios.post('../Controller/editar.php', editar)
            .then(function(response){
                
                let respuesta = response.data;
                let meter = '';
                let ctnEdit= document.getElementById('ctnEdit');
                respuesta.forEach(dato => {

                   meter += ` 

                   
                        <div class="modal-body">
                            <h3 class="m-t-none m-b text-center"> Modificar Cliente</h3>
                            <div class="row">           
                                <div class="col-sm-6 text-center">      
                                    <div class="custom-file w-200 h-300 " style="padding: 20px 0px;">
                                        <p class="text-center">
                                            <a><i class="fa fa-user-circle big-icon"></i></a>
                                        </p> 
                                        <div class="form-group"><label><h5 class="m-t-none">NOMBRE:</h5></label><input style="padding: 1px 8px;" type="text" class="form-control mb-4"  id="nombreEdit" value="${dato.nombre}" placeholder="nombre"></div>
                                        <div class="form-group"><label><h5 class="m-t-none">APELLIDO:</h5></label><input style="padding: 1px 8px;" class="form-control mb-4" type="text"  id="apellidoEdit" value="${dato.apellido}" placeholder="apellido"></div>           
                                    </div>
                                            
                                </div>         
                                <div class="col-sm-6 ">
                                        <div class="form-group text-center"><label><h5 class="m-t-none">TELEFONO:</h5></label><input style="padding: 1px 8px;" class="form-control mb-4" value="${dato.telefono}" type="number" id="telefonoEdit"></div>
                                        <div class="form-group text-center"><label><h5 class="m-t-none text-center">CORREO:</h5></label><input style="padding: 1px 8px;" class="form-control mb-4" type="text" value="${dato.correo}" id="correoEdit" placeholder="gmail"></div>
                                        <div class="form-group text-center"><label><h5 class="m-t-none text-center">DNI:</h5></label><input style="padding: 1px 8px;" class="form-control mb-5" type="text" value="${dato.dni}" placeholder="dni" id="dniEdit"></div>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn btn-sm btn-primary fa btn-success" onclick="actualizar(${dato.id_cliente})" style="font-size: 16px; width: 100px;" type="button">Modificar</button>
                                            <p id="resActualizar">Cliente Actualizado</p>
                                        </div>                   
                                </div>       
                            </div>
                        </div>
            
                    
                    `;


                })

                ctnEdit.innerHTML = meter;


            })

    }

    let modaldosCierra = document.getElementById("cierraModalEditar");
    modaldosCierra.addEventListener('click', function() {
            modaldos.style.display = 'none';
    });

// fin editar


// inicia actualizar
    function  actualizar(id) {
        let nombreEdit = document.getElementById("nombreEdit").value
        let apellidoEdit = document.getElementById("apellidoEdit").value
        let telefonoEdit = document.getElementById("telefonoEdit").value
        let correoEdit = document.getElementById("correoEdit").value
        let dniEdit = document.getElementById("dniEdit").value
        let bus = document.getElementById("bus")
        let actualizar = new FormData()
        actualizar.append("nombre", nombreEdit)
        actualizar.append("apellido", apellidoEdit)
        actualizar.append("telefono", telefonoEdit)
        actualizar.append("correo", correoEdit)
        actualizar.append("dni", dniEdit)
        actualizar.append("id", id);
        axios.post('../Controller/actualizar.php', actualizar)
            .then(function(e){

                let resActualizar = document.getElementById("resActualizar");
                resActualizar.style.display = "block"

                setTimeout(function(){
                    resActualizar.style.display = "none"
                }, 1000)

                bus.value = ""
                let selectElement = document.getElementById('miSelect');
                selectElement.selectedIndex = 0;
                leer();
            })
    }

// fin actualziar


// inicia buscar

    function buscar(valor){
        
        let ctnCuadrado1 = document.getElementById('ctnCuadrado');
        
        let buscar = new FormData()
        buscar.append("filtro", valor)

        if (valor.length < 1) {
           
            ctnCuadrado1.style.display = ""
            leer()
            return;
        }else{
          
            // ctnCuadrado1.style.display = "none"
             ctnCuadrado1.innerHTML = ""
        }


        axios.post('../Controller/filtrarUsuario.php', buscar)
            .then(function(response){
            const usuarios = response.data;
            let cuadritosHTMLDos = ''; // Variable para acumular el HTML de los cuadritos

            usuarios.forEach(usuario => {
                let esta = ""
                let chec = "";
                if(usuario.estado == 1){
                    esta = "Activado"
                    chec = "checked"
                }else{
                    esta = "Desactivado"
                    chec = "";
                }
                cuadritosHTMLDos += `<div class="col-lg-6 ${usuario.nombre}">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="row">
                                <div class="col-sm-6 b-r">
                                    <p class="text-center">
                                        <a><i class="fa fa-user-circle big-icon"></i></a>
                                    </p>
                                    <p class="text-center">
                                    <p>Modificado Jhordy</p>
                                    ${usuario.nombre}

                                    </p>
                                    <label class="switch">
                                        <input id="estadito" type="checkbox" onchange="cambio(this, ${usuario.id_cliente})" ${chec} />
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <div class="col-sm-6">
                                    <form role="form">
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>DNI:</dt>
                                                <dd class="sm-2"> ${usuario.dni}</dd>
                                            </div>
                                        </dl>
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>Correo:</dt>
                                                <dd class="sm-2"> ${usuario.correo}</dd>
                                            </div>
                                        </dl>
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>Celular</dt>
                                                <dd class="sm-2"> ${usuario.telefono}</dd>
                                            </div>
                                        </dl>
                                        <dl class="row mb-0">
                                            <div class="col-sm-6 text-sm-left"><dt>Fecha de Creación:</dt>
                                                <dd class="sm-2">${usuario.fecha}</dd>
                                            </div>
                                        </dl>
                                        <div>
                                            <div class="mb-4">
                                                <button  onclick="editar(this,${usuario.id_cliente})" class="btn btn-success float-right mx-2" type="button"><i class="fa fa-edit" href="" data-toggle="modal"></i></button>
                                                <button onclick="eliminar(this,${usuario.id_cliente})" class="btn btn-danger float-right mx-2" type="button"><i class="fa fa-trash-o" ></i></button>
                                                
                                            </div>
                                        </div>
                                    </form>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            // Establecer el contenido de ctnCuadrado con todos los cuadritos acumulados
            ctnCuadrado1.innerHTML = cuadritosHTMLDos;

                
            })
    }
// fin buscar

// inicia filtroEstado
    function filtroEstado(valor){
        
        let desactivado = document.getElementsByClassName("Desactivado");
        let activado = document.getElementsByClassName("Activado");

        if(valor == "Activado"){

            
            for (let i = 0; i < desactivado.length; i++) {
                desactivado[i].style.display = 'none';
            }

            for (let i = 0; i < activado.length; i++) {
                activado[i].style.display = '';
            }

        }else if( valor == "Desactivado"){

            
            for (let i = 0; i < activado.length; i++) {
                activado[i].style.display = 'none';
            }

            for (let i = 0; i < desactivado.length; i++) {
                desactivado[i].style.display = '';
            }

        }else{
            for (let i = 0; i < activado.length; i++) {
                activado[i].style.display = '';
            }

            for (let i = 0; i < desactivado.length; i++) {
                desactivado[i].style.display = '';
            }
        }

        
    }
// fin filtroEstado
