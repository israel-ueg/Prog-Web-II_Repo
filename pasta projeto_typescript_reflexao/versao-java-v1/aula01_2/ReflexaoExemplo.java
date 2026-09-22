package aula01_2;

import java.lang.reflect.*;
import java.util.Objects;

import javax.swing.JOptionPane;

public class ReflexaoExemplo {
	public static void setObjectColor(Object obj, String color) {
		if(Objects.isNull(obj)){
			throw  new IllegalArgumentException("Defina o parametro Obj antes de chamar o metodo");
		}

		Class<? extends Object> cls = obj.getClass();

		try {

			Method method = cls.getMethod("setCor",
					new Class[] { String.class });

			method.invoke(obj, new Object[] { color });

		}

		catch (NoSuchMethodException ex) {

			throw new IllegalArgumentException(cls.getName()
					+ " n�o suporte o metodo setCor(String)");
		}

		catch (IllegalAccessException ex) {

			throw new IllegalArgumentException(
					"Permiss�es de acesso insuficientes para executar"
							+ "setColor(:String) na classe " + cls.getName());
		}

		catch (InvocationTargetException ex) {
			throw new RuntimeException(ex);
		}
	}
	public static String getObjectColor(Object obj) {

		Class<? extends Object> cls = obj.getClass();
		String ret;
		ret = "";

		try {

			Method method = cls.getMethod("getCor");

			ret = (String)method.invoke(obj);

		}

		catch (NoSuchMethodException ex) {

			throw new IllegalArgumentException(cls.getName()
					+ " n�o suporte o metodo setColor(String)");
		}

		catch (IllegalAccessException ex) {

			throw new IllegalArgumentException(
					"Permiss�es de acesso insuficientes para executar"
							+ "setColor(:String) na classe " + cls.getName());
		}

		catch (InvocationTargetException ex) {
			throw new RuntimeException(ex);
		}
		return ret;
	}
	public static void main(String[] args) {
		Class<?> cls;
		String nomeClasse;
		try {
			
			nomeClasse = JOptionPane.showInputDialog(null,"Digite o nome da classe");
			String cor = JOptionPane.showInputDialog(null,"Digite o nome da cor");
			
			cls = Class.forName("aula01_2.".concat(nomeClasse));

			Constructor<?> ct = cls.getConstructor(null);
			Object retobj = ct.newInstance(null);

			ReflexaoExemplo.setObjectColor(retobj, cor);
			
			System.out.println("Classe:"+cls.getName()+" cor:="+ ReflexaoExemplo.getObjectColor(retobj));
			
			
			
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
