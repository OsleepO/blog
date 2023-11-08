---
title: Practica Proyecto Competitivo Parte 2
description: Documentacion sobre la práctica de Java competitiva. Aqui están los cambios que hay que hacer para la segunda parte de la práctica. 
layout: "../../layouts/BlogLayout.astro"
date: 2023-11-08
tags:
  - Programación
---

## Escarabajos binarios

## Introducción

En la segunda parte de esta práctica es hacer modificaciones para adaptar nuevos cambios introducidos de la practica que es:

Modificación: El cliente solicita que este año, se va a ampliar la carrera a bicis eléctricas, en ese caso los 2 componentes de cada equipo tienen que realizar las 4 etapas. 

## Modificación

### Cambio 1
Antes:
```java
// Calcular el corredor mas rapido para cada etapa
		int[] corredorRapido = calcularCorredorMasRapidoEtapa(etapas, tiempos);

        // Para cada etapa, imprimir el numero de etapa, el nombre del corredor mas rapido, su tiempo y su velocidad media
		for(int i = 0; i < corredorRapido.length; i++) {
			System.out.println("Etapa "+(i + 1)+":\n"
					+ "Corredor mas rapido: "+equipos.get(corredorRapido[i])[i % 2 + 1]
					+ "\nTiempo del corredor mas rapido: "+tiempos.get(corredorRapido[i])[i]+" horas"
					+ "\nVelocidad media del corredor mas rapido: "+Math.round(velocidadKmh(etapas[i], tiempos.get(corredorRapido[i])[i]) * 100.0) / 100.0+"km/h");
		}
```

Ahora:
```java
int index = 0;
		// Para cada etapa, imprimir el numero de etapa, el nombre del corredor mas
		// rapido, su tiempo y su velocidad media
		for (double[] corredorRapidoEtapa : calcularCorredorMasRapidoEtapa(etapas, tiempos)) {
			int equipoRapidoEtapa = Math.round((int) corredorRapidoEtapa[0]);
			System.out.println("Etapa " + (index + 1) + ":\n"
					+ "Corredor mas rapido: " + equipos.get(equipoRapidoEtapa)[(int) corredorRapidoEtapa[1]]
					+ "\nDel equipo: " + equipos.get(equipoRapidoEtapa)[0]
					+ "\nTiempo del corredor mas rapido: " + corredorRapidoEtapa[2] + " horas"
					+ "\nVelocidad media del corredor mas rapido: "
					+ Math.round(velocidadKmh(etapas[index], corredorRapidoEtapa[2]) * 100.0) / 100.0 + "km/h");
			index++;
		}
```

### Cambio 2

Antes:
```java
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
```

Ahora:
```java
public static void rellenarDatos(ArrayList<String[]> equipos, ArrayList<double[]> tiempos, Scanner sc) {
        
		Boolean comprobar = true; // Creamos una variable para control de errores
		int numeroEquipos = 0; // Creamos una variable para saber el numero de equipos por teclado

		// creamos un while para volver a preguntar que en caso de que el usuario
		// introduce un valor incorrecto
		while (comprobar) {
			System.out.println("Introduce numero de equipos: ");
			if (sc.hasNextInt()) {
				numeroEquipos = sc.nextInt();

				// un if para que la entrada de numero tiene que ser al menos 1
				if (numeroEquipos > 0) {
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

		// creamos un for para que haya un bucle y podamos poner el nombre de los
		// equipos
		for (int i = 0; i < numeroEquipos; i++) {

			String[] equipo = new String[3]; // creamos un array para guardar el nombre del equipo y los dos participantes
			double[] tiempoEquipos = new double[4]; // creamos un array para guardar los 4 tiempos del equipo
			double[] corredorTiempoElectrico = new double[8]; // creamos un array para guardar los 4 tiempos del equipo
			System.out.println("Introduce el nombre del equipo " + (i + 1) + ":");
			equipo[0] = sc.nextLine();
			String bici = "";
			System.out.println("¿Tu bici es electrica? S/N: ");
			bici = sc.nextLine();

			if (bici.toLowerCase().equals("si") || bici.toLowerCase().equals("s")) {
				int index = 0;
				for (int j = 0; j < 2; j++) {
					System.out.println("Introduce el nombre del corredor " + (j + 1) + " del equipo " + (i + 1) + ":");
					equipo[j + 1] = sc.nextLine();

					for (int p = 0; p < 4; p++) {
						System.out.println("Introduce el tiempo de la etapa " + (p + 1) + " del corredor " + (j + 1));
						corredorTiempoElectrico[index] = sc.nextDouble();
						index++;
					}
					sc.nextLine();
				}
				equipos.add(equipo); // guardamos en el ArrayList los equipos del array equipo
				tiempos.add(corredorTiempoElectrico);
			} else if (bici.toLowerCase().equals("no") || bici.toLowerCase().equals("n")) {

				// creamos un for para hacer un bucle para poner los dos corredores de los
				// equipos
				for (int f = 1; f <= 2; f++) {
					System.out.println("Introduce el nombre del participante " + f + " del equipo " + (i + 1) + ":");
					equipo[f] = sc.nextLine();
				}
				equipos.add(equipo); // guardamos en el ArrayList los equipos del array equipo

				for (int j = 0; j < tiempoEquipos.length; j++) {
					comprobar = true; // volver a utilizar el variable para control de errores

					// creamos un while para que de un texto de error si no es un numero y volver a
					// preguntarlo
					while (comprobar) {
						System.out.println("Tiempo de etapa " + (j + 1) + " del equipo " + (i + 1) + ":");
						if (sc.hasNextDouble()) {
							tiempoEquipos[j] = sc.nextDouble();
							comprobar = false;
							sc.nextLine();
						} else {
							System.out.println("El valor introducido no es correcto. Intentalo de nuevo");
							sc.next();
						}
					}
				}
				tiempos.add(tiempoEquipos); // guardamos en el ArrayList los tiempos del array tiempoequipos
			} else {

			}
		}
	}
```

### Cambio 3
Antes:
```java
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
```

Ahora:
```java
public static double[] velocidadMediaEquipos(ArrayList<double[]> tiempos, double[] etapas) {
		// velocidadE guardamos dentro del array es la velocidad media de cada equipo,
		double[] velocidadE = new double[tiempos.size()];
		int index = 0;

		// Este double es para que se sumen todas las etapas con Arrays.stream().sum() y
		// las ponga en una variable que la hemos llamado sumaEtapas
		double sumaEtapas = Arrays.stream(etapas).sum();

		// Este forEach es para recorrer todo el ArrayList y poder calcular la velocidad
		// media de cada uno de los equipos
		for (double[] tiempoEquipos : tiempos) {
			int numeroEtapas = tiempoEquipos.length / etapas.length;

			
			/*
			 * Lo igualamos a la funcion Math. round() que retorna el valor de un numero
			 * redondeado
			 * 
			 * con 2 decimales multiplicando por 100.0 y dividiendo por 100.0 y dentro de
			 * eso usamos
			 * 
			 * el metodo de velocidadKmh y ponemos dentro sumaEtapas y el sumatorio de
			 * tiempoEquipos
			 * 
			 * para obtener la velocidad media del equipo.
			 * 
			 */
			velocidadE[index] = Math.round(
					(velocidadKmh((sumaEtapas * numeroEtapas), Arrays.stream(tiempoEquipos).sum())) * 100.0) / 100.0;
			index++;
		}
		// Aqui devolvemos el valor de velocidadE
		return velocidadE;
	}
```

### Cambio 4

Antes:
```java
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
```

Ahora:
```java
public static ArrayList<double[]> calcularCorredorMasRapidoEtapa(double[] etapas, ArrayList<double[]> tiempos) {
		ArrayList<double[]> corredoresRapidos = new ArrayList<>();
		
		
		for(int i = 0; i < etapas.length; i++) {
			double indexEquipo = 0;
			double indexCorredor = 0;
			double[] corredorRapido = new double[3];
			double tiempoRapido = Double.MAX_VALUE;
			for(int j = 0; j < tiempos.size(); j++) {
				boolean condicion = tiempos.get(j).length == etapas.length ? true : false;
				if(condicion) {
					if(tiempos.get(j)[i] < tiempoRapido) {
						tiempoRapido = tiempos.get(j)[i];
						indexEquipo = j;
						indexCorredor = ((i % 2) + 1);
					}
				} else {
					int posicionTiempoElectrico = tiempos.get(j)[i] < tiempos.get(j)[i + etapas.length] ? i : i + 4;
					if(tiempos.get(j)[posicionTiempoElectrico] < tiempoRapido) {
						tiempoRapido = tiempos.get(j)[posicionTiempoElectrico];
						indexEquipo = j;
						indexCorredor = posicionTiempoElectrico < etapas.length ? 1 : 2;
					}
				}
			}
			corredorRapido[0] = indexEquipo;
			corredorRapido[1] = indexCorredor;
			corredorRapido[2] = tiempoRapido;
			corredoresRapidos.add(corredorRapido);
		}
		return corredoresRapidos;
	}
```

##Codigo
```java
package package_escarabajosbinarios;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class EscarabajosBinarios2 {

	public static void main(String[] args) {

		// Crear un objeto Scanner para leer la entrada del usuario
		Scanner sc = new Scanner(System.in);

		// Definir las distancias de las etapas de la carrera
		double[] etapas = { 74.12, 63.89, 67.37, 84.03 };

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

		// Usamos un operador ternario para en caso de que tenga menos de 3 equipos
		// funciona bien el programa
		/*
		 * lo que hace es ver la longitud del calcularClasificacion y si es menor que 3
		 * usa su propia longitud
		 * 
		 * y si es mayor que 3, lo limita a 3.
		 * 
		 */
		int condicion = calcularClasificacion(equipos, tiempos).length < 3
				? calcularClasificacion(equipos, tiempos).length
				: 3;

		// Los 3 primeros, para cada equipo, imprimir su posicion, su nombre y su
		// velocidad media
		for (int i = 0; i < condicion; i++) {
			System.out.println("El equipo " + equipos.get(calcularClasificacion(equipos, tiempos)[i])[0]
					+ " esta en la posicion " + (i + 1)

					+ " con una velocidad media de "
					+ velocidadMediaEquipos(tiempos, etapas)[calcularClasificacion(equipos, tiempos)[i]] + "km/h");
		}

		int index = 0;
		// Para cada etapa, imprimir el numero de etapa, el nombre del corredor mas
		// rapido, su tiempo y su velocidad media
		for (double[] corredorRapidoEtapa : calcularCorredorMasRapidoEtapa(etapas, tiempos)) {
			int equipoRapidoEtapa = Math.round((int) corredorRapidoEtapa[0]);
			System.out.println("Etapa " + (index + 1) + ":\n"
					+ "Corredor mas rapido: " + equipos.get(equipoRapidoEtapa)[(int) corredorRapidoEtapa[1]]
					+ "\nDel equipo: " + equipos.get(equipoRapidoEtapa)[0]
					+ "\nTiempo del corredor mas rapido: " + corredorRapidoEtapa[2] + " horas"
					+ "\nVelocidad media del corredor mas rapido: "
					+ Math.round(velocidadKmh(etapas[index], corredorRapidoEtapa[2]) * 100.0) / 100.0 + "km/h");
			index++;
		}

		// Cerrar el objeto Scanner
		sc.close();

	}

	// metodo para meter los datos de la carrera de cada equipo

	public static void rellenarDatos(ArrayList<String[]> equipos, ArrayList<double[]> tiempos, Scanner sc) {
		
//		equipos.add(new String[] { "Gustavo Runners", "Marta Diaz", "Peter" });
//        tiempos.add(new double[] { 5.50, 4.30, 4.50, 6.30 });
//
//        equipos.add(new String[] { "Luisa Speedsters", "Carlos Perez", "Anna" });
//        tiempos.add(new double[] { 6.20, 5.10, 4.90, 7.00 });
//
//        equipos.add(new String[] { "Juan Sprinters", "Elena Rodriguez", "Carlos" });
//        tiempos.add(new double[] { 5.80, 4.70, 4.60, 6.50 });
//
//        equipos.add(new String[] { "Laura Racers", "David Gomez", "Emma" });
//        tiempos.add(new double[] { 5.90, 4.60, 4.70, 6.70 });
//
//        equipos.add(new String[] { "Roberto Blazers", "Sara Gonzalez", "Michael" });
//        tiempos.add(new double[] { 5.70, 4.40, 4.80, 6.90 });
//
//        equipos.add(new String[] { "Diego Sprinters", "Olivia Smith", "Lucas" });
//        tiempos.add(new double[] { 6.00, 4.50, 4.60, 6.80 });
//
//        equipos.add(new String[] { "Maria Rushers", "Juan Martinez", "Sophia" });
//        tiempos.add(new double[] { 5.60, 4.80, 4.90, 6.60 });
//
//        // Equipo con bici electrica
//        equipos.add(new String[] { "Daniel Racers", "Paula Ruiz", "Liam" });
//        tiempos.add(new double[] { 5.50, 4.90, 4.60, 6.40, 2.00, 4.50, 4.60, 6.80 });
//
//        equipos.add(new String[] { "Natalia Blazers", "Hector Sanchez", "Isabella" });
//        tiempos.add(new double[] { 5.80, 1.10, 1.30, 6.30 });
//
//        // Equipo con bici electrica
//        equipos.add(new String[] { "Pablo Speedsters", "Eva Hernandez", "Noah" });
//        tiempos.add(new double[] { 4.10, 5.00, 4.00, 6.20, 3.50, 1.30, 1.50, 1.0 });
        
		Boolean comprobar = true; // Creamos una variable para control de errores
		int numeroEquipos = 0; // Creamos una variable para saber el numero de equipos por teclado

		// creamos un while para volver a preguntar que en caso de que el usuario
		// introduce un valor incorrecto
		while (comprobar) {
			System.out.println("Introduce numero de equipos: ");
			if (sc.hasNextInt()) {
				numeroEquipos = sc.nextInt();

				// un if para que la entrada de numero tiene que ser al menos 1
				if (numeroEquipos > 0) {
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

		// creamos un for para que haya un bucle y podamos poner el nombre de los
		// equipos
		for (int i = 0; i < numeroEquipos; i++) {

			String[] equipo = new String[3]; // creamos un array para guardar el nombre del equipo y los dos participantes
			double[] tiempoEquipos = new double[4]; // creamos un array para guardar los 4 tiempos del equipo
			double[] corredorTiempoElectrico = new double[8]; // creamos un array para guardar los 4 tiempos del equipo
			System.out.println("Introduce el nombre del equipo " + (i + 1) + ":");
			equipo[0] = sc.nextLine();
			String bici = "";
			System.out.println("¿Tu bici es electrica? S/N: ");
			bici = sc.nextLine();

			if (bici.toLowerCase().equals("si") || bici.toLowerCase().equals("s")) {
				int index = 0;
				for (int j = 0; j < 2; j++) {
					System.out.println("Introduce el nombre del corredor " + (j + 1) + " del equipo " + (i + 1) + ":");
					equipo[j + 1] = sc.nextLine();

					for (int p = 0; p < 4; p++) {
						System.out.println("Introduce el tiempo de la etapa " + (p + 1) + " del corredor " + (j + 1));
						corredorTiempoElectrico[index] = sc.nextDouble();
						index++;
					}
					sc.nextLine();
				}
				equipos.add(equipo); // guardamos en el ArrayList los equipos del array equipo
				tiempos.add(corredorTiempoElectrico);
			} else if (bici.toLowerCase().equals("no") || bici.toLowerCase().equals("n")) {

				// creamos un for para hacer un bucle para poner los dos corredores de los
				// equipos
				for (int f = 1; f <= 2; f++) {
					System.out.println("Introduce el nombre del participante " + f + " del equipo " + (i + 1) + ":");
					equipo[f] = sc.nextLine();
				}
				equipos.add(equipo); // guardamos en el ArrayList los equipos del array equipo

				for (int j = 0; j < tiempoEquipos.length; j++) {
					comprobar = true; // volver a utilizar el variable para control de errores

					// creamos un while para que de un texto de error si no es un numero y volver a
					// preguntarlo
					while (comprobar) {
						System.out.println("Tiempo de etapa " + (j + 1) + " del equipo " + (i + 1) + ":");
						if (sc.hasNextDouble()) {
							tiempoEquipos[j] = sc.nextDouble();
							comprobar = false;
							sc.nextLine();
						} else {
							System.out.println("El valor introducido no es correcto. Intentalo de nuevo");
							sc.next();
						}
					}
				}
				tiempos.add(tiempoEquipos); // guardamos en el ArrayList los tiempos del array tiempoequipos
			} else {

			}
		}
	}

	// metodo para hacer la media de los equipos

	public static double[] calcularMediaTiempo(ArrayList<double[]> tiempos) {

		int index = 0; // creamos una variable para llevar un seguimiento del indice actual

		double[] mediaEquipo = new double[tiempos.size()]; // creamos un array para almacenar la media de los equipos

		// usamos un forEach para que recorra toda la variable tiempos

		for (double[] i : tiempos) {

			double media = 0; // variable para guardar la suma de los valores

			// forEach para recorrer todo los tiempos de cada i

			for (double f : i) {

				media += f; // se suma los valores y se acumula la suma en media

			}

			mediaEquipo[index] = media / i.length; // se calcula la media

			index++;

		}

		return mediaEquipo; // devuelve las medias de cada equipo

	}

	// creamos un metodo array int para que guarde las posiciones del metodo
	// CalcularMediaTiempo ordenadas

	public static int[] calcularClasificacion(ArrayList<String[]> equipos, ArrayList<double[]> tiempos) {

		// creamos la variable

		double[] mediaEquipos = calcularMediaTiempo(tiempos);

		// creamos la variable ordenada y lo ordenamos

		double[] mediaOrdenadas = calcularMediaTiempo(tiempos);

		Arrays.sort(mediaOrdenadas);

		// creamos un int[] para guardar la posicion del equipo

		int[] clasificacion = new int[mediaOrdenadas.length];

		// creamos un for para que recorra mediaordenadas

		for (int i = 0; i < mediaOrdenadas.length; i++) {

			// creamos un for para que compare el valor de mediaordenadas con mediaequipos
			// si el valor es igual guarda la posicion

			for (int j = 0; j < mediaEquipos.length; j++) {

				// comparar la posicion del array ordenado con la posicion del array sin ordenar
				// para poder sacarlo

				if (mediaOrdenadas[i] == mediaEquipos[j]) {

					clasificacion[i] = j;

				}

			}

		}

		return clasificacion; // devuelve un int[] que contiene las posiciones de cada equipo

	}

	// metodo para calcular la velocidad en km/h

	public static double velocidadKmh(double km, double h) {

		return km / h;

	}

	// Este metodo lo que hace es calcular la velocidad media de cada equipo

	public static double[] velocidadMediaEquipos(ArrayList<double[]> tiempos, double[] etapas) {

		double[] velocidadE = new double[tiempos.size()];

		int index = 0;

		// Este double es para que se sumen todas las etapas con Arrays.stream().sum() y
		// las ponga en una variable que la hemos llamado sumaEtapas

		double sumaEtapas = Arrays.stream(etapas).sum();

		// Este forEach es para recorrer todo el ArrayList y poder calcular la velocidad
		// media de cada uno de los equipos

		for (double[] tiempoEquipos : tiempos) {

			int numeroEtapas = tiempoEquipos.length / etapas.length;

			// velocidadE guardamos dentro del array es la velocidad media de cada equipo,

			/*
			 * Lo igualamos a la funcion Math. round() que retorna el valor de un numero
			 * redondeado
			 * 
			 * con 2 decimales multiplicando por 100.0 y dividiendo por 100.0 y dentro de
			 * eso usamos
			 * 
			 * el metodo de velocidadKmh y ponemos dentro sumaEtapas y el sumatorio de
			 * tiempoEquipos
			 * 
			 * para obtener la velocidad media del equipo.
			 * 
			 */

			velocidadE[index] = Math.round(
					(velocidadKmh((sumaEtapas * numeroEtapas), Arrays.stream(tiempoEquipos).sum())) * 100.0) / 100.0;

			index++;

		}

		// Aqui devolvemos el valor de velocidadE

		return velocidadE;

	}

	// Metodo para almacenar en un array los corredores mas rapidos de cada etapa

	public static ArrayList<double[]> calcularCorredorMasRapidoEtapa(double[] etapas, ArrayList<double[]> tiempos) {
		ArrayList<double[]> corredoresRapidos = new ArrayList<>();
		
		
		for(int i = 0; i < etapas.length; i++) {
			double indexEquipo = 0;
			double indexCorredor = 0;
			double[] corredorRapido = new double[3];
			double tiempoRapido = Double.MAX_VALUE;
			for(int j = 0; j < tiempos.size(); j++) {
				boolean condicion = tiempos.get(j).length == etapas.length ? true : false;
				if(condicion) {
					if(tiempos.get(j)[i] < tiempoRapido) {
						tiempoRapido = tiempos.get(j)[i];
						indexEquipo = j;
						indexCorredor = ((i % 2) + 1);
					}
				} else {
					int posicionTiempoElectrico = tiempos.get(j)[i] < tiempos.get(j)[i + etapas.length] ? i : i + 4;
					if(tiempos.get(j)[posicionTiempoElectrico] < tiempoRapido) {
						tiempoRapido = tiempos.get(j)[posicionTiempoElectrico];
						indexEquipo = j;
						indexCorredor = posicionTiempoElectrico < etapas.length ? 1 : 2;
					}
				}
			}
			corredorRapido[0] = indexEquipo;
			corredorRapido[1] = indexCorredor;
			corredorRapido[2] = tiempoRapido;
			corredoresRapidos.add(corredorRapido);
		}
		return corredoresRapidos;
	}

}
```