package aula01_1;
import javax.swing.*;
import java.lang.reflect.*;
import aula01.*;

public class Ex1ReflexaoListarMetodos {

	public static void main(String args[]) {
		try {
			String className = JOptionPane.showInputDialog("Digite nome da classe");
			Class<?> c = Class.forName(className);
			//OlaMundo ola = new OlaMundo();
			//Class<?> c = ola.getClass();
			System.out.println("SuperClass:"+c.getSuperclass().getSimpleName());
			//Lista todos os metodos declaradas nas classe do metadado
			Method m[] = c.getDeclaredMethods();
			for (int i = 0; i < m.length; i++) {
				System.out.println( m[i].toString() );
			}
		}catch (Throwable e) {
			System.err.println(e);
		}
	}
}
