package aula01_2;

import java.sql.Date;

public class Sucata {
	private String motivo;
	public String getMotivo() {
		return motivo;
	}
	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	private Date data;
}
