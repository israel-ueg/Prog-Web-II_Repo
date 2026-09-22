package aula01;

public class HelloWorld {
	public void printName() {
		Class<?> metaobject = this.getClass();
		System.out.println(metaobject.getName());
		System.out.println(metaobject.getSimpleName());
		System.out.println(this.toString());
	}

	public static void main(String[] args) {
		HelloWorld olamudo = new HelloWorld();
		olamudo.printName();
		System.out.println("------");
		HelloWorld olamudo2 = new HelloWorld();
		olamudo2.printName();
	}
}
