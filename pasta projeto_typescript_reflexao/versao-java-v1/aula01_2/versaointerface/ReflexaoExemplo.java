package aula01_2.versaointerface;

import javax.swing.*;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflexaoExemplo {
	public static void setObjectColor(ObjectWithColor obj, String color) {
			obj.setCor(color);
	}
	public static String getObjectColor(ObjectWithColor obj) {
		return obj.getCor();
	}
	public static void main(String[] args) {
		Class<?> cls;
		String nomeClasse;
		try {
			
			nomeClasse = JOptionPane.showInputDialog(null,"Digite o nome da classe");
			String cor = JOptionPane.showInputDialog(null,"Digite o nome da cor");
			
			cls = Class.forName("aula01_2.versaointerface.".concat(nomeClasse));

			Constructor<?> ct = cls.getConstructor(null);
			ObjectWithColor retobj = (ObjectWithColor) ct.newInstance(null);
			
			setObjectColor(retobj, cor);
			
			System.out.println("Classe:"+cls.getName()+" cor:="+ getObjectColor(retobj));
			
			
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e){
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
