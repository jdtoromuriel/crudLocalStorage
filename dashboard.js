//variables globales
let nombreInput = document.querySelector("#nombre-input");
let tipoIdInput = document.querySelector("#tipo-id-input");
let numeroIdInput = document.querySelector("#numero-input");
let areaInput = document.querySelector("#area-input");
let salarioInput = document.querySelector("#salario-input");
let btnGuardar = document.querySelector(".boton-guardar");
let tabla = document.querySelector(".table > tbody");
// Buscador
document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        let buscar = e.target.value.toLowerCase();

        document.querySelectorAll(".table tbody tr").forEach(row => {
            let nombreEmpleado = row.querySelector(".nombre").textContent.toLowerCase();

            if (nombreEmpleado.includes(buscar)) {
                row.classList.remove("filtro")
            } else {
                row.classList.add("filtro")
            }
        })
    }
})
//evento click al boton guardar
btnGuardar.addEventListener("click", ()=>{
   // alert("diste click");
    let datosForm = validarForm();
    if (datosForm != null) {
        guardarDatos( datosForm );
    }
    
    borrarTabla();
    mostrarDatos();

});

//funcion para validar el formulario
function validarForm() {
    let datosForm;
    if( nombreInput.value && tipoIdInput.value && numeroIdInput.value
        && areaInput.value && salarioInput.value){
            datosForm = {
                nombre : nombreInput.value,
                tipoid : tipoIdInput.value,
                numeroid : numeroIdInput.value,
                area : areaInput.value,
                salario : salarioInput.value
            }
    }else{
        alert("Todos los campos son obligatorios");
    }
    return datosForm;
}

//funcion para guardar los datos en localStorage
function guardarDatos( datos ) {
    let empleados = [];
    let empleadosPrevios = JSON.parse(localStorage.getItem("empleados"));
    if(empleadosPrevios != null){
        empleados = empleadosPrevios;
    }
    empleados.push(datos);
    localStorage.setItem("empleados", JSON.stringify(empleados));
    alert("Datos guardados con exito");

    nombreInput.value = "";
    tipoIdInput.value = "";
    numeroIdInput.value = "";
    areaInput.value = "";
    salarioInput.value = "";
}

// funcion para extraer los datos guardados previamente en el localStorage
function mostrarDatos() {
    let empleados = [];
    // Extraer datos guardados en el localstorage
    let empleadosPrevios = JSON.parse(localStorage.getItem("empleados"));
    // Validar que hayan datos
    if (empleadosPrevios != null) {
        empleados = empleadosPrevios;
    }

    console.log(empleados)
    empleados.forEach((e,i)=>{
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td class="nombre">${e.nombre}</td>
            <td>${e.tipoid}</td>
            <td>${e.numeroid}</td>
            <td>${e.area}</td>
            <td>${e.salario}</td>
            <td>
                <span onClick="actualizarEmpleado(${i})" class="btn-editar btn btn-warning"> 📝</span>
                <span onClick="eliminarEmpleado(${i})" class="btn-eliminar btn btn-danger"> ❌ </span>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Quitar datos de la tabla
function borrarTabla(){
    let filas = document.querySelectorAll(".table tbody tr");
    filas.forEach((f)=> {
        f.remove();
    })
}
//Actualizar empleado del localStorage
function actualizarEmpleado(pos){
    let empleados = [];
    let empleadosPrevios = JSON.parse(localStorage.getItem("empleados"));
    if(empleadosPrevios != null){
        empleados = empleadosPrevios;
    }
    // Pasar datos al formulario
    nombreInput.value = empleados[pos].nombre,
    tipoIdInput.value = empleados[pos].tipoid,
    numeroIdInput.value = empleados[pos].numeroid,
    areaInput.value= empleados[pos].area,
    salarioInput.value= empleados[pos].salario

    // Activar botón de actualizar
    let btnActualizar = document.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none")
    btnGuardar.classList.toggle("d-none")

    // Agregar evento al boton de actualizar
    btnActualizar.addEventListener("click", () => {
        empleados[pos].nombre = nombreInput.value;
        empleados[pos].tipoid = tipoIdInput.value;
        empleados[pos].numeroid = numeroIdInput.value;
        empleados[pos].area = areaInput.value;
        empleados[pos].salario = salarioInput.value;

        //Guardar datos editados en localStorage
        localStorage.setItem("empleados", JSON.stringify(empleados));
        alert("Datos actualizados con exito");
        borrarTabla();
        mostrarDatos();

        nombreInput.value = "";
        tipoIdInput.value = "";
        numeroIdInput.value = "";
        areaInput.value = "";
        salarioInput.value = "";
    });
}
// Funcion eliminar un empleado de la tabla
function eliminarEmpleado(pos) {
    let empleados = [];
    let empleadosPrevios = JSON.parse(localStorage.getItem("empleados"));
    if (empleadosPrevios != null) {
        empleados = empleadosPrevios;
    }
    let confirmar = confirm("¿Deseas eliminar este empleado: " + empleados[pos].nombre + "?");
    if (confirmar) {
        let empleadoEliminado = empleados.splice(pos, 1)[0]; // Obtener el objeto eliminado
        alert("Empleado " + empleadoEliminado.nombre + " eliminado con éxito");
        localStorage.setItem("empleados", JSON.stringify(empleados));
        borrarTabla();
        mostrarDatos();
    }
}
document.addEventListener('DOMContentLoaded', () =>{
    borrarTabla();
    mostrarDatos();
});

