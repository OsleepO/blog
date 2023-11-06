---
title: Practica Proyecto Competitivo
description: Documentación sobre la practica de Java competitiva. Aquí se explican los metodos y como se organizan. 
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
ArrayList<double[]> tiemposEtapa;

// Array donde se guarda cada el tiempo de cada equipo
double[] tiempoEtapa = new double[4];

// Guardamos el tiempo en el array
tiemposEtapa.add(tiempoEtapa);

```

Este Array tiene 4 posiciones, las cuales hacen referencia al tiempo que ha tardado cada equipo en una etapa.

## Metodos

1. **Desarrollador** 1: Puede trabajar en la definición de las variables de clase y el
método main . Este desarrollador también será responsable de coordinar el trabajo
de los demás desarrolladores, ya que estos componentes del código interactúan
directamente con todas las demás partes.

2. **Desarrollador** 2: Puede trabajar en los métodos rellenarDatos y tiempoMedia .
Estos métodos se encargan de inicializar los datos de la carrera y calcular los
tiempos medios, respectivamente.

3. **Desarrollador** 3: Puede trabajar en los métodos clasificacion y velocidadKmh .
El método clasificacion requiere que el método tiempoMedia esté completo,
por lo que este desarrollador necesitará trabajar en estrecha colaboración con el
Desarrollador 2.

4. **Desarrollador** 4: Puede trabajar en el método velocidadMedia . Este método
depende del método velocidadKmh , por lo que este desarrollador necesitará
trabajar en estrecha colaboración con el Desarrollador 3.

5. **Desarrollador** 5: Puede trabajar en el método corredorMasRapidoPorEtapa . Este
método es bastante independiente de los demás, pero este desarrollador
necesitará comunicarse con el Desarrollador 1 para asegurarse de que su código
funciona correctamente con el método main 

## Codigos

```java
package prueba;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class pruebaProyecto {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		double[] etapas = {74.12, 63.89, 67.37, 84.03};
		ArrayList<String[]> equipos = new ArrayList<>();
		ArrayList<double[]> tiempos = new ArrayList<>();
		rellenarDatos(equipos, tiempos, sc);
		for (int i = 0; i < 3; i++) {
        	System.out.println("El equipo " + equipos.get(calcularClasificacion(equipos, tiempos)[i])[0] + " está en la posición " + (i + 1));
        }
		calcularClasificacion(equipos, tiempos);
		
		int[] corredorRapido = calcularCorredorMasRapidoEtapa(etapas, equipos, tiempos);
		for(int i = 0; i < corredorRapido.length; i++) {
			System.out.println("Etapa "+(i + 1)+":\n"
					+ "Corredor más rápido: "+equipos.get(corredorRapido[i])[i % 2 + 1]
					+ "\nTiempo del corredor más rápido: "+tiempos.get(corredorRapido[i])[i]
					+ "\nVelocidad media del corredor mas rapido: "+Math.round(velocidadKmh(etapas[i], tiempos.get(corredorRapido[i])[i]) * 100.0) / 100.0+"km/h");
		}
		
		
		sc.close();
		
	}
	
	public static void rellenarDatos(ArrayList<String[]> equipos, ArrayList<double[]> tiempos, Scanner sc) {
		
//		equipos.add(new String[]{"Luisa Speedsters", "Carlos Perez", "Anna"});
//	    tiempos.add(new double[]{6.20, 5.10, 4.90, 7.00});
//
//	    equipos.add(new String[]{"Juan Sprinters", "Elena Rodriguez", "Carlos"});
//	    tiempos.add(new double[]{5.80, 4.70, 4.60, 6.50});
//	    
//	    equipos.add(new String[]{"Laura Racers", "David Gomez", "Emma"});
//	    tiempos.add(new double[]{5.90, 4.60, 4.70, 6.70});
//
//	    equipos.add(new String[]{"Roberto Blazers", "Sara Gonzalez", "Michael"});
//	    tiempos.add(new double[]{5.70, 4.40, 4.80, 6.90});
//	    
//	    equipos.add(new String[]{"Diego Sprinters", "Olivia Smith", "Lucas"});
//	    tiempos.add(new double[]{6.00, 4.50, 4.60, 6.80});	
//
//	    equipos.add(new String[]{"Maria Rushers", "Juan Martinez", "Sophia"});
//	    tiempos.add(new double[]{5.60, 4.80, 4.90, 6.60});
//
//	    equipos.add(new String[]{"Daniel Racers", "Paula Ruiz", "Liam"});
//	    tiempos.add(new double[]{5.50, 4.90, 4.60, 6.40});
//
//	    equipos.add(new String[]{"Natalia Blazers", "Hector Sanchez", "Isabella"});
//	    tiempos.add(new double[]{5.80, 4.70, 4.70, 6.30});
//
//	    equipos.add(new String[]{"Pablo Speedsters", "Eva Hernandez", "Noah"});
//	    tiempos.add(new double[]{6.10, 5.00, 4.80, 6.20});
        

        System.out.println("Introduce numero de equipos");
        int numeroEquipos = sc.nextInt() ;
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
                System.out.println("Tiempo de etapa "+ (j+1) + " del equipo " + (i+1)+":");
                tiempoEquipos[j] = sc.nextDouble();
                sc.nextLine();
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
        
       /* Collections.sort(equipos, new Comparator<Equipos>() {
            @Override
            public int compare(Equipos e1, Equipos e2) {
                return Double.compare(e2.calcularVelocidadMedia(), e1.calcularVelocidadMedia());*/
        return clasificacion;

        //bucle for para comparar cada posicion del array ordenado con el desordenado para sacar la posicion del valor exacto
        //comparar la posicion del array ordenado con la posicion del array sin ordenar para poder sacarlo



    }
	
	private static double velocidadKmh(double km, double h) {
		return km / h;
	}
	
	public static int[] calcularCorredorMasRapidoEtapa(double[] etapas, ArrayList<String[]> equipos, ArrayList<double[]> tiempos) {
	    int[] almacen = new int[etapas.length];
	    
	    for(int i = 0; i < etapas.length; i++) {
	        double tiempoMasRapido = tiempos.get(0)[i];
	        int index = 0;
	        for(double[] t : tiempos) {
	        	if(t[i] < tiempoMasRapido) {
	                tiempoMasRapido = t[i];
	                almacen[i] = index;
	            }
	            index++;
	        }
	    }
	    
	    return almacen; 
	}
}
```