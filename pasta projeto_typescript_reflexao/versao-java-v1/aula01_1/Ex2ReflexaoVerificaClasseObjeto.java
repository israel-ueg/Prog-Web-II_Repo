package aula01_1;

import javax.swing.JOptionPane;

public class Ex2ReflexaoVerificaClasseObjeto {
	public static void main(String[] args){
		String parm = JOptionPane.showInputDialog(null, "Digite nome de uma classe do pacote java.lang (ex: String, Integer, Boolean)");
		Class<?> cls = null;
		
		try {
			cls = Class.forName(parm);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.exit(1);
		}
		System.out.println("Classe:"+cls.getSimpleName());
		//Verifica se um dado objeto  instancia da classe do metadado
		boolean b1 = cls.isInstance(new Integer(37));
		System.out.println(b1);
		
		//verifica se um dado objeto  instancia da classe do metadado
		Boolean b2 = cls.isInstance(new java.lang.String("teste"));
		System.out.println(b2);
	}
}
