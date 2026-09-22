package aula01_2.versaointerface;

public class Bicicleta implements  ObjectWithColor{
	private String cor;
	private String marca;
	private int numMachas;
	public String getCor() {
		return cor;
	}
	public void setCor(String cor) {
		this.cor = cor;
	}
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}
	public int getNumMachas() {
		return numMachas;
	}
	public void setNumMachas(int numMachas) {
		this.numMachas = numMachas;
	}
}
