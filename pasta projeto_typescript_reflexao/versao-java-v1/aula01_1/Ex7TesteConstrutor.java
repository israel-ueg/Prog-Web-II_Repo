package aula01_1;
import javax.swing.*;
import java.lang.reflect.*;

public class Ex7TesteConstrutor {

	public Ex7TesteConstrutor() { }
  
	public Ex7TesteConstrutor(int a, int b) {
		System.out.println("a = " + a + " b = " + b);
	}
	public void digaOla(){
		System.out.println("ola");
	}
  
	public static void main(String args[]) {
		try {
			//Class cls = Class.forName("aula01_1.Ex7TesteConstrutor");
			Class cls = Class.forName("aula01_1.Ex6InvocaMetodo");

			Class partypes[] = new Class[2];
			partypes[0] = Integer.TYPE;
			partypes[1] = Integer.TYPE;

			Constructor ct = cls.getConstructor(null);
			//Constructor ct = cls.getConstructor(partypes);

			Object arglist[] = new Object[2];
			arglist[0] = new Integer(37);
			arglist[1] = new Integer(47);

			Object retobj = ct.newInstance(null);
			//Object retobj = ct.newInstance(arglist);
			Method mlist[] = cls.getDeclaredMethods();
			for (int i = 0; i < mlist.length; i++) {
				Method m = mlist[i];
				if(m.getParameterTypes().length == 2){
					System.out.println("Nome:"+m.getName());
				}
			}
			String metodo = JOptionPane.showInputDialog("Digite o nome do método com dois parametros inteiros");
			Method met = cls.getMethod(metodo, partypes);
			
			Object retobj2 = met.invoke(retobj, arglist);
			Integer retval = (Integer) retobj2;
			System.out.println(retval.intValue());
			
			
		}
		catch (Throwable e) {
			System.err.println(e);
		}
	}
}
