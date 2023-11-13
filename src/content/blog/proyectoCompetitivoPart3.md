---
title: Practica Proyecto Competitivo Parte 3
description: Documentacion sobre la práctica de Java competitiva. Aqui están los cambios que hay que hacer para la segunda parte de la práctica. 
layout: "../../layouts/BlogLayout.astro"
date: 2023-11-13
tags:
  - Programación
---

## Introduccion

En la tercera parte de la practica necesitamos una funcionalidad nueva, que es eliminar a los equipos en la que uno de los corredores ha quedado en el ultimos en los dos etapas.

## Codigos

```java
public class Escarabajosbinarios {

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

		ArrayList<double[]> corredoresLentos = calcularCorredorMasLentoEtapa(etapas, tiempos);
		eliminarEquiposCorredorRepetido(corredoresLentos, equipos, tiempos);

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
			System.out.println("Etapa " + (index + 1) + ":\n" + "Corredor mas rapido: "
					+ equipos.get(equipoRapidoEtapa)[(int) corredorRapidoEtapa[1]] + "\nDel equipo: "
					+ equipos.get(equipoRapidoEtapa)[0] + "\nTiempo del corredor mas rapido: " + corredorRapidoEtapa[2]
					+ " horas" + "\nVelocidad media del corredor mas rapido: "
					+ Math.round(velocidadKmh(etapas[index], corredorRapidoEtapa[2]) * 100.0) / 100.0 + "km/h");
			index++;
		}

		// Cerrar el objeto Scanner
		sc.close();

	}

	// metodo para meter los datos de la carrera de cada equipo

	public static void rellenarDatos(ArrayList<String[]> equipos, ArrayList<double[]> tiempos, Scanner sc) {

		equipos.add(new String[] { "Gustavo Runners", "Marta Diaz", "Peter" });
		tiempos.add(new double[] { 3, 4, 4, 3 });

		equipos.add(new String[] { "Luisa Speedsters", "Carlos Perez", "Anna" });
		tiempos.add(new double[] { 60, 5.10, 60, 7.00 });

		equipos.add(new String[] { "Juan Sprinters", "Elena Rodriguez", "Carlos" });
		tiempos.add(new double[] { 5.80, 4.70, 4.60, 6.50 });

		equipos.add(new String[] { "Laura Racers", "David Gomez", "Emma" });
		tiempos.add(new double[] { 5.90, 4.60, 4.70, 6.70 });

		equipos.add(new String[] { "Roberto Blazers", "Sara Gonzalez", "Michael" });
		tiempos.add(new double[] { 5.70, 4.40, 4.80, 6.90 });

		equipos.add(new String[] { "Diego Sprinters", "Olivia Smith", "Lucas" });
		tiempos.add(new double[] { 6.00, 4.50, 4.60, 6.80 });

		equipos.add(new String[] { "Maria Rushers", "Juan Martinez", "Sophia" });
		tiempos.add(new double[] { 5.60, 4.80, 4.90, 6.60 });

		// Equipo con bici electrica
		equipos.add(new String[] { "Daniel Racers", "Paula Ruiz", "Liam" });
		tiempos.add(new double[] { 6, 60, 4, 60, 2.6, 3, 2, 2 });

		equipos.add(new String[] { "Natalia Blazers", "Hector Sanchez", "Isabella" });
		tiempos.add(new double[] { 5.80, 1.10, 1.30, 6.30 });

		// Equipo con bici electrica
		equipos.add(new String[] { "Pablo Speedsters", "Eva Hernandez", "Noah" });
		tiempos.add(new double[] { 4.10, 5.00, 4.00, 6.20, 3.50, 1.30, 1.50, 1.0 });

//		Boolean comprobar = true; // Creamos una variable para control de errores
//		int numeroEquipos = 0; // Creamos una variable para saber el numero de equipos por teclado
//
//		// creamos un while para volver a preguntar que en caso de que el usuario
//		// introduce un valor incorrecto
//		while (comprobar) {
//			System.out.println("Introduce numero de equipos: ");
//			if (sc.hasNextInt()) {
//				numeroEquipos = sc.nextInt();
//
//				// un if para que la entrada de numero tiene que ser al menos 1
//				if (numeroEquipos > 0) {
//					comprobar = false;
//				} else {
//					System.out.println("Cantidad de equipos hay que tener al menos 1");
//				}
//			} else {
//				System.out.println("El valor introducido no es correcto. Intentalo de nuevo");
//				sc.next();
//			}
//		}
//		sc.nextLine();
//
//		// creamos un for para que haya un bucle y podamos poner el nombre de los
//		// equipos
//		for (int i = 0; i < numeroEquipos; i++) {
//			Boolean valido = true;
//			String[] equipo = new String[3]; // creamos un array para guardar el nombre del equipo y los dos
//												// participantes
//
//			double[] tiempoEquipos = new double[4]; // creamos un array para guardar los 4 tiempos del equipo
//
//			double[] corredorTiempoElectrico = new double[8]; // creamos un array para guardar los 4 tiempos del equipo
//
//			System.out.println("Introduce el nombre del equipo " + (i + 1) + ":");
//
//			equipo[0] = sc.nextLine();
//
//			String bici = ""; // creamos un string para almacenar la respuesta del usuario
//			while (valido) {
//				System.out.println("¿Tu bici es electrica? S/N: "); // preguntamos al usuario si o no
//
//				bici = sc.nextLine();
//				// si el string bici es igual a si continua el codigo siguiente
//				if (bici.toLowerCase().equals("si") || bici.toLowerCase().equals("s")) { 
//					valido = false;
//					int index = 0;
//
//					for (int j = 0; j < 2; j++) {
//						// pedimos el nombre del corredo x del equipo x
//						System.out.println(
//								"Introduce el nombre del corredor " + (j + 1) + " del equipo " + (i + 1) + ":"); 
//
//						equipo[j + 1] = sc.nextLine();
//
//						for (int p = 0; p < tiempoEquipos.length; p++) {
//							boolean valido2 = true; // boolean para salir del bucle si el usuario no introduce un numero
//													// valido
//							// creamos un while para que de un texto de error si no es un numero y volver a
//							// preguntarlo
//							while (valido2) {// creamos un while para que de un texto de error si no es un numero y
//												// volver a
//								// preguntarlo
//								System.out.println("Introduce el tiempo de la etapa " + (p + 1) + " del corredor "
//										+ (j + 1) + ":");// Pide el tiempo del corredor x del equipo x
//								if (sc.hasNextDouble()) {
//									corredorTiempoElectrico[index] = sc.nextDouble(); // Almacena el tiempo del corredor
//																						// y sale del bucle
//									valido2 = false;
//								} else {
//									// Se imprime si el valor es incorrecto
//									System.out.println("El valor introducido no es correcto. Inténtalo de nuevo."); 
//									sc.next();
//								}
//							}
//							index++;
//						}
//
//						sc.nextLine();
//
//					}
//
//					equipos.add(equipo); // guardamos los nombres del equipo y corredores en el array de equipos
//
//					tiempos.add(corredorTiempoElectrico); // guardamos los tiempos de los corredores de bici electrica
//
//				} else if (bici.toLowerCase().equals("no") || bici.toLowerCase().equals("n")) { // si el string bici es
//																								// igual a no continua
//																								// el codigo siguiente
//					valido = false;
//					// creamos un for para hacer un bucle para poner los dos corredores de los
//					// equipos
//					for (int f = 1; f <= 2; f++) {
//						System.out.println("Introduce el nombre del participante " + f + " del equipo " + (i + 1) + ":");
//						equipo[f] = sc.nextLine();
//					}
//					equipos.add(equipo); // guardamos en el ArrayList los equipos del array equipo
//
//					for (int j = 0; j < tiempoEquipos.length; j++) {
//						comprobar = true; // volver a utilizar el variable para control de errores
//
//						// creamos un while para que de un texto de error si no es un numero y volver a
//						// preguntarlo
//						while (comprobar) {
//							// Pide el tiempo del corredor x del equipo x
//							System.out.println("Tiempo de etapa " + (j + 1) + " del equipo " + (i + 1) + ":"); 
//							if (sc.hasNextDouble()) {
//								tiempoEquipos[j] = sc.nextDouble(); // Almacena el tiempo del corredor y sale del bucle
//								comprobar = false;
//								sc.nextLine();
//							} else {
//								// Se imprime si el valor es incorrecto
//								System.out.println("El valor introducido no es correcto. Intentalo de nuevo"); 
//								sc.next();
//							}
//						}
//					}
//					tiempos.add(tiempoEquipos); // Se añade el valor al array de Tiempos.
//				} else {
//					System.out.println("Entrada no válida, introduce S/N"); // Se imprime si el valor no es ni si ni no
//				}
//			}
//		}
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
		// Creamos un nuevo array list donde se almacenará la información sobre los
		// corredores mas rapidos de cada etapa.
		// Cada entrada en esta lista es un array de tres elementos: [equipo, corredor,
		// tiempo].
		ArrayList<double[]> corredoresRapidos = new ArrayList<>();

		for (int i = 0; i < etapas.length; i++) { // Bucle for que recorre cada etapa de la carrera
			double indexEquipo = 0; // Dos indices para guardar el equipo y el corredor más rápidos
			double indexCorredor = 0;
			double[] corredorRapido = new double[3]; // Se crea un array donde almacenaremos el informacion sobre el
														// equipo, el corredor y el tiempo del corredor más rapido en la
														// etapa actual.
			double tiempoRapido = Double.MAX_VALUE; // Iniciamos el tiempoRapido como el mayor posible
			for (int j = 0; j < tiempos.size(); j++) { // For que recorre la lista de tiempos de todos los equipos

				/*
				 * verifica si el equipo actual tiene la misma cantidad de tiempos que etapas.
				 * Si esta condición es verdadera, significa que el equipo no tiene bicicletas
				 * eléctricas y solo hay un tiempo por etapa. En caso contrario, el equipo tiene
				 * bicicletas eléctricas y hay dos tiempos por etapa.
				 */
				boolean condicion = tiempos.get(j).length == etapas.length ? true : false;
				if (condicion) { // Si el equipo no tiene bicicletas eléctricas (condicion es verdadera)
					if (tiempos.get(j)[i] < tiempoRapido) { // Se compara el tiempo actual en la etapa i del equipo j
															// con el tiempoRapido. Si es más rápido, se actualizan
															// tiempoRapido, indexEquipo y indexCorredor con los nuevos
															// valores.
						tiempoRapido = tiempos.get(j)[i];
						indexEquipo = j;
						indexCorredor = ((i % 2) + 1);
					}
				} else { // Si el equipo tiene bicicletas eléctricas (condicion es falsa):

					/*
					 * Se determina si el tiempo eléctrico (segundo tiempo en bicicletas eléctricas)
					 * es más rápido que el tiempo normal en la etapa i. La variable
					 * posicionTiempoElectrico se establece en el índice del tiempo más rápido (ya
					 * sea el tiempo normal o eléctrico).
					 */
					int posicionTiempoElectrico = tiempos.get(j)[i] < tiempos.get(j)[i + etapas.length] ? i : i + 4; //
					if (tiempos.get(j)[posicionTiempoElectrico] < tiempoRapido) { // Se comparan los tiempos ya sea de
																					// bici normal o electrica y se
																					// actualiza el valor.
						tiempoRapido = tiempos.get(j)[posicionTiempoElectrico];
						indexEquipo = j;
						indexCorredor = posicionTiempoElectrico < etapas.length ? 1 : 2;
					}
				}
			}
			// Se actualiza el array corredorRapido con la información del equipo más
			// rápido, el corredor más rápido y el tiempo más rápido en la etapa actual.
			corredorRapido[0] = indexEquipo;
			corredorRapido[1] = indexCorredor;
			corredorRapido[2] = tiempoRapido;
			corredoresRapidos.add(corredorRapido); // Se almacena el array corredorRapido en la lista CorredoresRapidos.
		}
		return corredoresRapidos;
	}

	public static ArrayList<double[]> calcularCorredorMasLentoEtapa(double[] etapas, ArrayList<double[]> tiempos) {
		ArrayList<double[]> corredoresLentos = new ArrayList<>();

		for (int i = 0; i < etapas.length; i++) {
			double indexEquipo = 0;
			double indexCorredor = 0;
			double[] corredorLento = new double[3];
			double tiempoLento = Double.MIN_VALUE;

			for (int j = 0; j < tiempos.size(); j++) {
				boolean condicion = tiempos.get(j).length == etapas.length ? true : false;

				if (condicion) {
					if (tiempos.get(j)[i] > tiempoLento) {
						tiempoLento = tiempos.get(j)[i];
						indexEquipo = j;
						indexCorredor = ((i % 2) + 1);
					}
				} else {
					int posicionTiempoElectrico = tiempos.get(j)[i] > tiempos.get(j)[i + etapas.length] ? i : i + 4;

					if (tiempos.get(j)[posicionTiempoElectrico] > tiempoLento) {
						tiempoLento = tiempos.get(j)[posicionTiempoElectrico];
						indexEquipo = j;
						indexCorredor = posicionTiempoElectrico < etapas.length ? 1 : 2;
					}
				}
			}

			corredorLento[0] = indexEquipo;
			corredorLento[1] = indexCorredor;
			corredorLento[2] = tiempoLento;
			corredoresLentos.add(corredorLento);
		}

		return corredoresLentos;
	}

	public static void eliminarEquiposCorredorRepetido(ArrayList<double[]> corredoresLentos,
	        ArrayList<String[]> equipos, ArrayList<double[]> tiempos) {
	    
	    ArrayList<Integer> equiposAEliminar = new ArrayList<>();

	    for (int i = 0; i < corredoresLentos.size(); i++) {
	        if (corredoresLentos.get(i).length > 0) {
	            int indexEquipo = (int) corredoresLentos.get(i)[0];

	            boolean corredorRepetido = false;

	            if (!equiposAEliminar.contains(indexEquipo)) {
	                if (tiempos.get(indexEquipo).length > corredoresLentos.size()) {
	                    double tiempoLento = corredoresLentos.get(i)[2];
	                    int contadorLentos = 0;
	                    for (int j = 0; j < tiempos.get(indexEquipo).length; j++) {
	                        if (tiempos.get(indexEquipo)[j] == tiempoLento) {
	                            contadorLentos++;
	                        }
	                    }
	                    if (contadorLentos >= 2) {
	                        corredorRepetido = true;
	                        equiposAEliminar.add(indexEquipo);
	                        System.out.println("Equipo a eliminar (Bicicleta eléctrica): " + equipos.get(indexEquipo)[0]);
	                    }
	                }

	                if (!corredorRepetido) {
	                    if (tiempos.get(indexEquipo).length == corredoresLentos.size()) {
	                        double tiempoLento = corredoresLentos.get(i)[2];
	                        int contadorLentos = 0;
	                        for (int j = 0; j < tiempos.get(indexEquipo).length; j++) {
	                            if (tiempos.get(indexEquipo)[j] == tiempoLento) {
	                                contadorLentos++;
	                            }
	                        }
	                        if (contadorLentos >= 2) {
	                            corredorRepetido = true;
	                            equiposAEliminar.add(indexEquipo);
	                            System.out.println("Equipo a eliminar: " + equipos.get(indexEquipo)[0]);
	                        }
	                    }
	                }
	            }
	        }
	    }

	    // Eliminar los equipos de las listas principales
	    for (int i = equiposAEliminar.size() - 1; i >= 0; i--) {
	        int indexEquipoEliminar = equiposAEliminar.get(i);
	        equipos.remove(indexEquipoEliminar);
	        tiempos.remove(indexEquipoEliminar);
	    }
	}
}
```