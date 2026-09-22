package aula01_1;

import java.lang.reflect.*;

public class Ex3Classe {

	private int funcao1( Object p, int x ) throws NullPointerException {
		if (p == null)
			throw new NullPointerException();
		return x;
	}
	private static int funcao2(){return 0;};
	private final int funcao3(){return 0;};

	public static void main(String args[]) {
		try {
			Class cls = Class.forName("aula01_1.Ex3Classe");
			Method methlist[] = cls.getDeclaredMethods();

			for (int i = 0; i < methlist.length; i++) {
				Method m = methlist[i];
				System.out.println("nome = " + m.getName());
				System.out.println("membro da classe = " + m.getDeclaringClass());
				System.out.println("modificador num="+ m.getModifiers());
				System.out.println("modificador = " + Modifier.toString( m.getModifiers() ));
				Class pvec[] = m.getParameterTypes();

				for (int j = 0; j < pvec.length; j++){
					System.out.println("parâmetro #" + j + " " + pvec[j].toString());
				}
				

				Class evec[] = m.getExceptionTypes();
				for (int j = 0; j < evec.length; j++){
					System.out.println("exceção #" + j + " " + evec[j]);
				}

				System.out.println("tipo de retorno = " + m.getReturnType());
				System.out.println("-----");
			}
		}
		catch (Throwable e) {
			System.err.println(e);
		}
	}
}
