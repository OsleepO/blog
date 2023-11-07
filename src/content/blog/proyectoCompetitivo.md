---
title: Practica Proyecto Competitivo
description: Documentacion sobre la practica de Java competitiva. Aqui se explican los metodos y como se organizan. 
layout: "../../layouts/BlogLayout.astro"
date: 2023-11-05
tags:
  - Programacion
---

## Escarabajos binarios

## Datos

El programa trabajara sobre tres datos principales.

El primer dato principal seran las etapas. Son 4 etapas por lo que guardamos los kilometros en un Array de 4 posiciones, una por etapa.

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

Ahora para guardar el tiempo de cada equipo en una etapa, utilizaremos el tercer dato principal, que sera este:

```java
// ArrayList donde se guardan todos los tiempos de cada etapa de los equipos
ArrayList<double[]> tiempos;

// Array donde se guarda cada el tiempo de cada equipo
double[] tiempo = {tiempo1, tiempo2, tiempo3, tiempo4};

// Guardamos el tiempo en el array
tiempos.add(tiempo);

```

Este Array tiene 4 posiciones, las cuales hacen referencia al tiempo que ha tardado cada equipo en una etapa.

## Metodos

1. **Desarrollador 1 (Wang):** Puede trabajar en la definicion de las variables de clase y el
metodo main . Este desarrollador tambien sera responsable de coordinar el trabajo
de los demas desarrolladores, ya que estos componentes del codigo interactuan
directamente con todas las demas partes.

2. **Desarrollador 2 (Ruben):** Puede trabajar en los metodos rellenarDatos y calcularMediaTiempo.
Estos metodos se encargan de inicializar los datos de la carrera y calcular los
tiempos medios, respectivamente.

3. **Desarrollador 3 (Juan):** Puede trabajar en los metodos clasificacion.
El metodo clasificacion requiere que el metodo calcularMediaTiempo este completo,
por lo que este desarrollador necesitara trabajar en estrecha colaboracion con el
Desarrollador 2.

4. **Desarrollador 4 (alex):** Puede trabajar en el metodo velocidadKmh y velocidadMediaEquipos. Este metodo
depende del metodo velocidadKmh y por lo tanto necesitara terminar primero con el metodo
velocidadKmh.

5. **Desarrollador 5 (Javi):** Puede trabajar en el metodo corredorMasRapidoPorEtapa. Este
metodo es bastante independiente de los demas, pero este desarrollador
necesitara comunicarse con el Desarrollador 1 para asegurarse de que su codigo
funciona correctamente con el metodo main 

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
		// mas info: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator
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
	
	public static void rellenarDatos(ArrayList<String[]> equipos, ArrayList<double[]> tiempos, Scanner sc) {
		Boolean comprobar = true;
		int numeroEquipos = 0;
        System.out.println("Introduce numero de equipos: ");
        while(comprobar) {
        	if(sc.hasNextInt()) {
        		numeroEquipos = sc.nextInt();
        		comprobar = false;
        	} else {
        		System.out.println("El valor introducido no es correcto. Intentalo de nuevo");
        		sc.next();
        	}
        }
        sc.nextLine();
        for (int i = 0; i < numeroEquipos ; i++) {
        	String[] equipo = new String[3]; 
            double[] tiempoEquipos= new double[4];
            System.out.println("Introduce el nombre del equipo " + (i+1)+":");
            equipo[0] = sc.nextLine();
            for (int f = 1; f <= 2; f++) {
                System.out.println("Introduce el nombre del participante "+f+" del equipo " + (i+1)+":");
                equipo[f] = sc.nextLine();

            }
            equipos.add(equipo);

        for (int j = 0; j < tiempoEquipos.length; j++) {
        	comprobar = true;
                System.out.println("Tiempo de etapa "+ (j+1) + " del equipo " + (i+1)+":");
                while(comprobar) {
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
            tiempos.add(tiempoEquipos);

        }
    }
	public static double[] calcularMediaTiempo(ArrayList<double[]> tiempos) {
        
        int index = 0;
        double[] mediaEquipo = new double[tiempos.size()];
        for (double[] i : tiempos) {
        	double media = 0;
            for (double f : i) {
                media += f ;
            }
        mediaEquipo[index] = media/i.length;
            index++;
        }
        return mediaEquipo;

	}
	
	public static int[] calcularClasificacion(ArrayList<String[]> equipos, ArrayList<double[]> tiempos) {
        double[] mediaEquipos = calcularMediaTiempo(tiempos);
        double[] mediaOrdenadas = calcularMediaTiempo(tiempos);
        Arrays.sort(mediaOrdenadas);
        int[] clasificacion = new int[mediaOrdenadas.length];
        for (int i=0; i<mediaOrdenadas.length;i++) {

            for (int j = 0; j < mediaEquipos.length; j++) {
                if (mediaOrdenadas[i] == mediaEquipos[j]) {
                    clasificacion[i] = j;
                }
            }
        }
        return clasificacion;

        //bucle for para comparar cada posicion del array ordenado con el desordenado para sacar la posicion del valor exacto
        //comparar la posicion del array ordenado con la posicion del array sin ordenar para poder sacarlo
    }
	
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