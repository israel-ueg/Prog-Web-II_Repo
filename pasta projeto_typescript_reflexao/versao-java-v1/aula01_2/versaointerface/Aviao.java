package aula01_2.versaointerface;

public class Aviao implements ObjectWithColor{
	private String cor;
	private String Emprea;
	private int velocidade;
	public String getCor() {
		return cor;
	}
	public void setCor(String cor) {
		this.cor = cor;
	}
	public String getEmprea() {
		return Emprea;
	}
	public void setEmprea(String emprea) {
		Emprea = emprea;
	}
	public int getVelocidade() {
		return velocidade;
	}
	public void setVelocidade(int velocidade) {
		this.velocidade = velocidade;
	}
}
