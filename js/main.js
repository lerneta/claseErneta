window.addEventListener('DOMContentLoaded',
    function () {
        console.log('El DOM  esta listo!');
    })

$(document).ready(function () {
    const APIURL = 'https://jsonplaceholder.typicode.com/posts';
    const infoPost = { nombre: "Ana", profesion: "Programadora" }
    $("#navegacion").prepend('<a href="#" id="btn1">Enviar petición</a>');
    $("#btn1").click(() => {
        $.ajax({
            method: "POST",
            url: APIURL,
            data: infoPost,
            success: function (respuesta) {
                $("body").prepend(`<div>${respuesta.nombre}</div>`);
            }
        })
    })

})

const Http = new XMLHttpRequest();
const URLGET = 'https://jsonplaceholder.typicode.com/posts/1';
const infopost = { nombre: "Ana", profesion: "Programadora" }
$("#navegacion").prepend('<a href="#" id="btn2">Enviar petición 2</a>');
$("#btn2").click(() => {
    Http.open("GET", URLGET);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
})





const cantidad_litros_input = document.getElementById('litros');
const cantidad_rechazada_input = document.getElementById('litrosn');
const porcentaje_materia_seca_input = document.getElementById('solidos');
const precio_kilo_input = document.getElementById('pkilo');


$('#espacioboton').prepend('<button type="button" id="calculo" class="btn btn-primary">Calcular</button>');


$("#oc").click(function () {
    if ($("#seccion1").first().is(":hidden")) {
        $("#seccion1").slideDown("fast");
        $("#result").removeClass("col-md-12").addClass("col-md-5");
    } else {
        $("#seccion1").hide();
        $("#result").removeClass("col-md-5").addClass("col-md-12");
    }
});


$('#calculo').click(function (e) {
    calcularvalor();
})
let cantidad_litros;
let cantidad_rechazada;
let porcentaje_materia_seca;
let precio_kilo;


class establecimiento {
    constructor(nombre, promedio_cantidad_diaria, cantidad_vacas) {
        this.nombre = nombre;
        this.promedio_cantidad_diaria = promedio_cantidad_diaria;
        this.cantidad_vacas = cantidad_vacas;
    }
    leer() {
        console.log("El establecimiento es " + (this.nombre));
    }
}

var codigo_animales = [10, 8, 9, 5, 3, 78, 23];
console.log(codigo_animales.sort((a, b) => a - b));


let establecimiento1 = new establecimiento("La Sorianita", 60000, 70);
establecimiento1.leer();

const resultados = [];



function calcularvalor() {

    if (cantidad_litros_input.value == '') {
        setTimeout(cantidad_litros_input.style.background = 'red', 5000);
        return
    }

    if (cantidad_rechazada_input.value == '') {
        setTimeout(cantidad_rechazada_input.style.background = 'red', 5000);
        return
    }

    if (porcentaje_materia_seca_input.value == '' || porcentaje_materia_seca_input.value > 100) {
        setTimeout(porcentaje_materia_seca_input.style.background = 'red', 5000);
        return
    }

    if (precio_kilo_input.value == '') {
        setTimeout(precio_kilo_input.style.background = 'red', 5000);
        return
    }


    cantidad_litros = cantidad_litros_input.value;
    cantidad_rechazada = cantidad_rechazada_input.value;
    porcentaje_materia_seca = porcentaje_materia_seca_input.value;
    precio_kilo = precio_kilo_input.value;

    //Calculamos la cantidad de litros del tambo que se venden. 
    //Cierta cantidad se desecha por no cumplir los requerimientos
    let valor_utilizable = cantidad_litros - cantidad_rechazada;

    //Calculamos el % de eficiencia. Cuanto menos se desecha, más eficiente es el sistema
    let porcentaje_aprovechable = (valor_utilizable * 100) / cantidad_litros;

    //Obtenemos los gramos de materia seca de ese valor que se venderá. 
    //Esto depende del porcentaje de materia seca que cuente el establecimiento
    let gramos_materia_seca = valor_utilizable * (porcentaje_materia_seca / 100);

    //A partir de los gramos pasamos a kilos
    let cantidad_kilos = gramos_materia_seca / 1000;

    //Calculamos el valor
    let valor = cantidad_kilos * precio_kilo;

    //Obtenemos un promedio por vaca
    let promediov = valor_utilizable / establecimiento1.cantidad_vacas;


    //Mostramos los valores obtenidos
    console.log("El valor es $" + valor);
    console.log("El porcentaje de eficiencia es de " + porcentaje_aprovechable + "%");
    console.log("El promedio de litros por animal es de " + promediov + " litros");
    if (valor_utilizable > establecimiento1.promedio_cantidad_diaria) {
        console.log("¡La producción superó el promedio diario del establecimiento!");
    }

    resultados.push({ ganancia: valor, eficiencia: porcentaje_aprovechable, promedio: promediov });

    console.log(resultados);

    //Anteriores
    mostrartodo();

    cantidad_litros_input.value = "";
    cantidad_rechazada_input.value = "";
    porcentaje_materia_seca_input.value = "";
    precio_kilo_input.value = "";

    cantidad_litros_input.style.background = 'white';
    cantidad_rechazada_input.style.background = 'white';
    porcentaje_materia_seca_input.style.background = 'white';
    precio_kilo_input.style.background = 'white';

}

function mostrartodo() {
    document.getElementById('resultados2').innerHTML = "";
    let i = 0;
    let registro = "";
    while (i < resultados.length) {
        registro = registro + `<tr><td>${i + 1}</td><td> $${resultados[i].ganancia}</td>
        <td> ${resultados[i].eficiencia}%</td>
        <td> ${resultados[i].promedio} </td></tr>`;
        i++;
    }

    $('#resultados2').prepend(registro);



}