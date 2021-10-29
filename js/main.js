


const cantidad_litros_input = document.getElementById('litros');
const cantidad_rechazada_input = document.getElementById('litrosn');
const porcentaje_materia_seca_input = document.getElementById('solidos');
const precio_kilo_input = document.getElementById('pkilo');
const calculo = document.getElementById('calculo');

calculo.onclick = () => { calcularvalor() };

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

    //Ultimo Valor ingresado
    document.getElementById('resultados').innerHTML = `<p>La ganancia es de ${valor}</p>
    <p>El porcentaje aprovechable es de ${porcentaje_aprovechable}%</p>
    <p>El promedio de producción por animal es de ${promediov} litros</p>`;

    //Anteriores
    mostrartodo();


}

function mostrartodo() {
    let i = 0;
    let registro = "";
    while (i < resultados.length) {
        registro = registro + `<h2>Registro ${i + 1}</h2><p>La ganancia es de $${resultados[i].ganancia}</p>
        <p>El porcentaje aprovechable es de ${resultados[i].eficiencia}%</p>
        <p>El promedio de producción por animal es de ${resultados[i].promedio} litros</p>`;
        i++;
    }
    document.getElementById('resultados2').innerHTML = registro;
}
