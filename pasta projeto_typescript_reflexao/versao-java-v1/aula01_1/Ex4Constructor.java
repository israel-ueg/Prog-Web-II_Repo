package aula01_1;
import java.lang.reflect.*;

public class Ex4Constructor {

	public Ex4Constructor() throws RuntimeException { }
  
	public Ex4Constructor(int i, double d) { }
  
	public static void main(String args[]) {
		try {
			Class<?> cls = Class.forName("aula01_1.Ex4Constructor");
			//obtem uma lista dos contruturoes
			Constructor<?> ctorlist[] = cls.getDeclaredConstructors();

			for (int i = 0; i < ctorlist.length; i++) {
				Constructor<?> ct = ctorlist[i];
				System.out.println("nome = " + ct.getName());
				System.out.println("membro da classe = " + ct.getDeclaringClass());
        
				Class<?> pvec[] = ct.getParameterTypes();
				for (int j = 0; j < pvec.length; j++)
					System.out.println("parametro #" + j + " " + pvec[j]);

				Class<?> evec[] = ct.getExceptionTypes();
				for (int j = 0; j < evec.length; j++)
					System.out.println("exceção #" + j + " " + evec[j]);

				System.out.println("------");
			}
		}
		catch (Throwable e) {
			System.err.println(e);
		}
	}
}
