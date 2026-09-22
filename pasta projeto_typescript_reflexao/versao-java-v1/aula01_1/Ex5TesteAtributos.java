package aula01_1;

import java.lang.reflect.*;

public class Ex5TesteAtributos {

	private double d;
	public static final int i = 37;
	String s = "testing";
  
	public static void main(String args[]) {
		try {
			 Class<?> cls = Class.forName("aula01_1.Ex5TesteAtributos");
			//Class<?> cls = new Ex5TesteAtributos().getClass();
      
			System.out.println("--------atributos---------");
			
			//Obtem uma lista dos atributos de uma classe(a partir do metadado
			Field fieldlist[] = cls.getDeclaredFields();
			for (int i = 0; i < fieldlist.length; i++) {
				Field fld = fieldlist[i];
				System.out.println("nome atributo = " + fld.getName());
				System.out.println("membro da classe = " + fld.getDeclaringClass());
				System.out.println("tipo = " + fld.getType());
				int mod = fld.getModifiers();
				System.out.println("modificadores = " + Modifier.toString(mod));
				System.out.println("---------------");
			}
		}
		catch (Throwable e) {
			System.err.println(e);
		}
	}
}
