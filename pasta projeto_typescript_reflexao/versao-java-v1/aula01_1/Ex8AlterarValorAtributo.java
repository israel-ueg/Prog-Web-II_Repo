package aula01_1;

import java.io.StringBufferInputStream;
import java.lang.reflect.*;
import java.util.Objects;

public class Ex8AlterarValorAtributo {

	private Double atributoD = 3.2;
	public double getAtributoD(){
		return this.atributoD;
	}
	public void setAtributoD(Double atributoD){
		if(!Objects.isNull(atributoD) && atributoD.doubleValue() > 0.0){
			this.atributoD = atributoD;
		}else{
			this.atributoD = 0.0;
		}
	}

	public Double salario;
	public Double getSalario() {return this.salario;};
	public void setSalario(Double valor){ this.salario = valor;};

	public static void main(String args[]) {
		try {
			//Class cls = Class.forName("aula01_1.Ex8AlterarValorAtributo");
			Class cls = new Ex8AlterarValorAtributo().getClass();
			Field campos [] = cls.getDeclaredFields();
			Field fld = null;
			String nomeAtributo = "atributoD";
			for(int i =0 ; i< campos.length; i++){
				campos[i].setAccessible(true);
				if(campos[i].getName().equals(nomeAtributo)){
					fld = campos[i];
				}
			}
			//Field fld = cls.getField("d");
			

			Constructor ct = cls.getConstructor(null);
			Object f2obj = ct.newInstance(null);

			System.out.println("type "+nomeAtributo+":"+fld.getType().getSimpleName());
			System.out.println(nomeAtributo+":"+fld.get(f2obj));
			if(Objects.nonNull(fld.get(f2obj))) {
				System.out.println(nomeAtributo+" = " + fld.get(f2obj));
			}
			
			fld.set(f2obj, new Double(-12.34));
			System.out.println(nomeAtributo+" = " + fld.get(f2obj));
			String nomeMethodo = "get"+getFirstUpperCase(nomeAtributo);
			System.out.println("nomeMethod:"+nomeMethodo);
			Method methGet = cls.getMethod(nomeMethodo);
			Object retorno = methGet.invoke(f2obj);
			System.out.println("Retorno:"+retorno.toString());

			nomeMethodo = "set"+getFirstUpperCase(nomeAtributo);
			Method methSet = cls.getMethod(nomeMethodo, new Class[]{fld.getType()});
			methSet.invoke(f2obj,new Object[]{Double.valueOf(-2.2d)});
			retorno = methGet.invoke(f2obj);
			System.out.println("Retorno2:"+retorno.toString());
			
		} catch (Throwable e) {
			e.printStackTrace();
			System.err.println(e);
		}
	}
	public static String getFirstUpperCase(String nome){
		if(Objects.isNull(nome) || nome.isEmpty()){
			return "";
		}
		if(nome.length()==1){
			return nome.toUpperCase();
		}
		return nome.substring(0,1).toUpperCase()+nome.substring(1);
	}
}
