package aula01;

public class OlaMundo extends HelloWorld {
	public static void main(String[] args) {
		OlaMundo olaMundo = new OlaMundo();
		olaMundo.printName();
		olaMundo.teste(1,2);
		HelloWorld helloWorld = new HelloWorld();
		helloWorld.printName();
	}
	public void teste(int a, int b){
		System.out.println("Teste");
	}
	public void teste(int a, boolean b){

	}
}
