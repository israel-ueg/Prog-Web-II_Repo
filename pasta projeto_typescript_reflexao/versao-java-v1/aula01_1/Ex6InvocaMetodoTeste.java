package aula01_1;

import javax.swing.*;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class Ex6InvocaMetodoTeste {
    public static void main(String args[]) {
        try {
            Class<?> partypes[] = new Class[2];
            partypes[0] = Integer.TYPE;
            partypes[1] = Integer.TYPE;
            Class<?> cls = Class.forName("aula01_1.Ex6InvocaMetodo");
            String nameMetodos = "";
            Method metodos[] = cls.getDeclaredMethods();
            for(int i=0; i< metodos.length; i++){
                nameMetodos+=","+metodos[i].getName();
            }
            nameMetodos = nameMetodos.substring(1);
            String metodo = JOptionPane.showInputDialog(null, "Digite o metodo("+nameMetodos+")");
            Method meth = cls.getMethod(metodo, partypes);
            Object arglist[] = new Object[2];
            //noinspection removal
            arglist[0] = new Integer(37);
            //noinspection removal
            arglist[1] = new Integer(47);


            Object methobj = cls.getDeclaredConstructors()[0].newInstance();

            Object retobj = meth.invoke(methobj, arglist);
            //Integer retval = (Integer) retobj;
            //System.out.println(retval.toString());
            if(retobj instanceof Integer){
                int teste = (Integer) retobj;
            }
            System.out.println(retobj.toString());
        } catch (Throwable e) {
            System.err.println(e);
        }
    }
}
