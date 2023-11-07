---
title: Practica Proyecto Competitivo
description: Documentacion sobre la practica de Java competitiva. Aqui se explican los metodos y como se organizan. 
layout: "../../layouts/BlogLayout.astro"
date: 2023-11-05
tags:
  - Programación
---

## Escarabajos binarios

## Datos

El programa trabajará sobre tres datos principales.

El primer dato principal serán las etapas. Son 4 etapas por lo que guardamos los kilometros en un Array de 4 posiciones, una por etapa.

```java
double[] = { 74.12, 63.89, 67.37, 84.03 };
```

El segundo, sera un ArrayList de Arrays, cada array (el String[]) hace referencia a un equipo

```java
// ArrayList donde se guardan todos los equipos
ArrayList<String[]> equipos;

// Array donde se guarda cada equipo
String[] equipo = {"Nombre Equipo", "Nombre corredor 1", "Nombre corredor 2"};

// Guardamos el equipo
equipos.add(equipo);
```

Basicamente, lo que contiene cada String[] es un equipo que se guarda en el ArrayList equipos.

Ahora para guardar el tiempo de cada equipo en una etapa, utilizaremos el tercer dato principal, que será este:

```java
// ArrayList donde se guardan todos los tiempos de cada etapa de los equipos
ArrayList<double[]> tiempos;

// Array donde se guarda cada el tiempo de cada equipo
double[] tiempo = {tiempo1, tiempo2, tiempo3, tiempo4};

// Guardamos el tiempo en el array
tiempos.add(tiempo);

```

Este Array tiene 4 posiciones, las cuales hacen referencia al tiempo que ha tardado cada equipo en una etapa.

## Métodos

1. **Desarrollador 1 (Wang):** Puede trabajar en la definición de las variables de clase y el método main. 
Este desarrollador también será responsable de coordinar el trabajo de los demás desarrolladores, ya 
que estos componentes del código interactúan directamente con todas las demás partes.

2. **Desarrollador 2 (Ruben):** Puede trabajar en los métodos rellenarDatos y calcularMediaTiempo. Estos 
métodos se encargan de inicializar los datos de la carrera y calcular los tiempos medios, 
respectivamente.

3. **Desarrollador 3 (Juan):** Puede trabajar en los métodos clasificacion. 
El método clasificacion requiere que el método calcularMediaTiempo esté completo, 
por lo que este desarrollador necesitará trabajar en estrecha colaboración con el 
Desarrollador 2.

4. **Desarrollador 4 (Alex):** Puede trabajar en el método velocidadKmh y velocidadMediaEquipos. 
Este método depende del método velocidadKmh y por lo tanto necesitara terminar primero con 
el método velocidadKmh.

5. **Desarrollador 5 (Javi):** Puede trabajar en el método corredorMasRapidoPorEtapa. Este 
método es bastante independiente de los demás, pero este desarrollador 
necesitará comunicarse con el Desarrollador 1 para asegurarse de que su código 
funciona correctamente con el método main.

## Codigos

```java
package ciclismo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class carrera {

	public static void main(String[] args) {
        // Crear un objeto Scanner para leer la entrada del usuario
		Scanner sc = new Scanner(System.in);

        // Definir las distancias de las etapas de la carrera
		double[] etapas = {74.12, 63.89, 67.37, 84.03};

        // Crear listas para almacenar los datos de los equipos y sus tiempos
		ArrayList<String[]> equipos = new ArrayList<>();
		ArrayList<double[]> tiempos = new ArrayList<>();

		System.out.println( // Explica el programa a modo de guia para el usuario.
                		"Bienvenido usuario, este programa analizara los equipos que introduzcas, devolviendo: \r\n"
                        + "-Cuales son los tres equipos clasificados como primeros globalmente, \r\n"
                        + " mostrando su puesto ,nombre y su velocidad media en la carrera.\r\n"
                        + "-El corredor mas rapido de la 1ª, 2ª, 3ª y 4ª etapa y su velocidad media.\r\n");
        // Llenar las listas con los datos de entrada del usuario
		rellenarDatos(equipos, tiempos, sc);
		
		// Usamos un operador ternario para en caso de que tenga menos de 3 equipos funciona bien el programa
		/* lo que hace es ver la longitud del calcularClasificacion y si es menor que 3 usa su propia longitud
		 * y si es mayor que 3, lo limita a 3.
		 */
		int condicion = calcularClasificacion(equipos, tiempos).length < 3 ? calcularClasificacion(equipos, tiempos).length : 3;
        // Los 3 primeros, para cada equipo, imprimir su posicion, su nombre y su velocidad media
		for (int i = 0; i < condicion; i++) {
        	System.out.println("El equipo " + equipos.get(calcularClasificacion(equipos, tiempos)[i])[0] + " esta en la posicion " + (i + 1)
        			+" con una velocidad media de "+velocidadMediaEquipos(tiempos, etapas)[calcularClasificacion(equipos, tiempos)[i]]+"km/h");
        }

        // Calcular el corredor mas rapido para cada etapa
		int[] corredorRapido = calcularCorredorMasRapidoEtapa(etapas, tiempos);

        // Para cada etapa, imprimir el numero de etapa, el nombre del corredor mas rapido, su tiempo y su velocidad media
		for(int i = 0; i < corredorRapido.length; i++) {
			System.out.println("Etapa "+(i + 1)+":\n"
					+ "Corredor mas rapido: "+equipos.get(corredorRapido[i])[i % 2 + 1]
					+ "\nTiempo del corredor mas rapido: "+tiempos.get(corredorRapido[i])[i]+" horas"
					+ "\nVelocidad media del corredor mas rapido: "+Math.round(velocidadKmh(etapas[i], tiempos.get(corredorRapido[i])[i]) * 100.0) / 100.0+"km/h");
		}

        // Cerrar el objeto Scanner
		sc.close();
	}
	
	//metodo para meter los datos de la carrera de cada equipo
	public static void rellenarDatos(ArrayList<String[]> equipos, ArrayList<double[]> tiempos, Scanner sc) {
		Boolean comprobar = true;	//Creamos una variable para control de errores
		int numeroEquipos = 0; //Creamos una variable para saber el numero de equipos por teclado
        
		//creamos un while para volver a preguntar que en caso de que el usuario introduce un valor incorrecto
        while(comprobar) {
        	System.out.println("Introduce numero de equipos: ");
        	if(sc.hasNextInt()) {
        		numeroEquipos = sc.nextInt();
        		
        		//un if para que la entrada de numero tiene que ser al menos 1
        		if(numeroEquipos > 0) {
        			comprobar = false;
        		} else {
            		System.out.println("Cantidad de equipos hay que tener al menos 1");
            	}
        	} else {
        		System.out.println("El valor introducido no es correcto. Intentalo de nuevo");
        		sc.next();
        	}
        }
        sc.nextLine();
        
        //creamos un for para que haya un bucle y podamos poner el nombre de los equipos
        for (int i = 0; i < numeroEquipos ; i++) {
        	String[] equipo = new String[3]; //creamos un array para guardar el nombre del equipo y los dos participantes
            double[] tiempoEquipos= new double[4];	//creamos un array para guardar los 4 tiempos del equipo
            System.out.println("Introduce el nombre del equipo " + (i+1)+":");
            equipo[0] = sc.nextLine();
            
            //creamos un for para hacer un bucle para poner los dos corredores de los equipos
            for (int f = 1; f <= 2; f++) {
                System.out.println("Introduce el nombre del participante "+f+" del equipo " + (i+1)+":");
                equipo[f] = sc.nextLine();

            }
            equipos.add(equipo);	//guardamos en el ArrayList los equipos del array equipo

        for (int j = 0; j < tiempoEquipos.length; j++) {
        	comprobar = true;	//volver a utilizar el variable para control de errores
                
                //creamos un while para que de un texto de error si no es un numero y volver a preguntarlo
                while(comprobar) {
                	System.out.println("Tiempo de etapa "+ (j+1) + " del equipo " + (i+1)+":");
                	if(sc.hasNextDouble()) {
                		tiempoEquipos[j] = sc.nextDouble();
                		comprobar = false;
                		sc.nextLine();
                	} else {
                		System.out.println("El valor introducido no es correcto. Intentalo de nuevo");
                		sc.next();
                	}
                }
            }
            tiempos.add(tiempoEquipos);	//guardamos en el ArrayList los tiempos del array tiempoequipos

        }
    }
	
	//metodo para hacer la media de los equipos
	public static double[] calcularMediaTiempo(ArrayList<double[]> tiempos) {
        
        int index = 0;	//creamos una variable para llevar un seguimiento del indice actual
        double[] mediaEquipo = new double[tiempos.size()];	//creamos un array para almacenar la media de los equipos
        
        //usamos un forEach para que recorra toda la variable tiempos
        for (double[] i : tiempos) {
        	double media = 0;	//variable para guardar la suma de los valores
        	
        	//forEach para recorrer todo los tiempos de cada i
            for (double f : i) {
                media += f ;	//se suma los valores y se acumula la suma en media
            }
        mediaEquipo[index] = media/i.length;	//se calcula la media
            index++;
        }
        return mediaEquipo;	//devuelve las medias de cada equipo

	}
	
	//creamos un metodo array int para que guarde las posiciones del metodo CalcularMediaTiempo ordenadas
	public static int[] calcularClasificacion(ArrayList<String[]> equipos, ArrayList<double[]> tiempos) {
		
		//creamos la variable
        double[] mediaEquipos = calcularMediaTiempo(tiempos);
        
        //creamos la variable ordenada y lo ordenamos
        double[] mediaOrdenadas = calcularMediaTiempo(tiempos);
        Arrays.sort(mediaOrdenadas);
        
        //creamos un int[] para guardar la posicion del equipo
        int[] clasificacion = new int[mediaOrdenadas.length];
        
        //creamos un for para que recorra mediaordenadas
        for (int i=0; i<mediaOrdenadas.length;i++) {
        	
        	//creamos un for para que compare el valor de mediaordenadas con mediaequipos si el valor es igual guarda la posicion
            for (int j = 0; j < mediaEquipos.length; j++) {
            	
            	//comparar la posicion del array ordenado con la posicion del array sin ordenar para poder sacarlo
                if (mediaOrdenadas[i] == mediaEquipos[j]) {
                    clasificacion[i] = j;
                }
            }
        }
        return clasificacion; //devuelve un int[] que contiene las posiciones de cada equipo
    }
	
	//metodo para calcular la velocidad en km/h
	public static double velocidadKmh(double km, double h) {
		return km / h;
	}
	
	//Este metodo lo que hace es calcular la velocidad media de cada equipo
	public static double[] velocidadMediaEquipos(ArrayList<double[]>tiempos, double[]etapas) {
		double[] velocidadE = new double[tiempos.size()];
		int index = 0;

		//Este double es para que se sumen todas las etapas con Arrays.stream().sum() y las ponga en una variable que la hemos llamado sumaEtapas
		double sumaEtapas = Arrays.stream(etapas).sum();

		// Este forEach es para recorrer todo el ArrayList y poder calcular la velocidad media de cada uno de los equipos
		for (double[] tiempoEquipos : tiempos) {

			// velocidadE guardamos dentro del array es la velocidad media de cada equipo, 
			/* Lo igualamos a la funcion Math. round() que retorna el valor de un numero redondeado 
			 * con 2 decimales multiplicando por 100.0 y dividiendo por 100.0 y dentro de eso usamos
			 * el metodo de velocidadKmh y ponemos dentro sumaEtapas y el sumatorio de tiempoEquipos
			 * para obtener la velocidad media del equipo.
			*/
			velocidadE[index] = Math.round((velocidadKmh(sumaEtapas, Arrays.stream(tiempoEquipos).sum())) * 100.0) / 100.0;
			
			index++;
		}

		// Aqui devolvemos el valor de velocidadE
		return velocidadE;
	}
	
	//Metodo para almacenar en un array los corredores mas rapidos de cada etapa
	public static int[] calcularCorredorMasRapidoEtapa(double[] etapas, ArrayList<double[]> tiempos) {
		
		// Array para almacenar el indice del corredor mas rapido de cada etapa.
	    int[] corredorRapido = new int[etapas.length];
	    
	    //for que recorre las etapas.
	    for(int i = 0; i < etapas.length; i++) {
	    	
	    	//Variable que guarda el primer tiempo del correodor para empezar y despues establecer el corredor mas rapido de cada etapa.
	        double tiempoMasRapido = tiempos.get(0)[i];
	        
	        //Indice para llevar un seguimiento del indice del corredor mas rapido del equipo
	        int index = 0;
	        
	        //forEach para comparar el tiempo mas rapido del corredor con todos los tiempos de los equipos
	        for(double[] t : tiempos) {
	        	
	        	 // Si el tiempo actual es menor que tiempoMasRapido se actualiza el corredor mas rapido con el indice actual
	        	if(t[i] < tiempoMasRapido) {
	                tiempoMasRapido = t[i];
	                corredorRapido[i] = index;
	            }
	        	
	        	// se incrementa el indice para pasar al siguiente corredor
	            index++;
	        }
	    }
	    
	    // Devuelve el array con el indice de todos los corredores mas rapidos de cada etapa
	    return corredorRapido; 
	}
}
```