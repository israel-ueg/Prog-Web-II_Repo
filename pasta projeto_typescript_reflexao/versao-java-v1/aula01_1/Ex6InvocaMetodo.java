package aula01_1;

import java.lang.reflect.*;

import javax.swing.JOptionPane;

public class Ex6InvocaMetodo {

	public int soma(int a, int b) {
		return a + b;
	}
	public int multiplica(int x, int y){
		return x * y;
	}
	public String concatenar(int x, int y)
		{return String.valueOf(x).concat(String.valueOf(y));}
	public int subtrair(int a, int b){ return a-b;}
	public int bascara(int a, int b){ return b-a;}

}
