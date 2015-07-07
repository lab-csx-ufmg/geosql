/**
 * Função para criar um objeto XMLHTTPRequest
 */
function CriaRequest() {
	try {
		request = new XMLHttpRequest();
	} catch (IEAtual) {

		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (IEAntigo) {

			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (falha) {
				request = false;
			}
		}
	}

	if (!request)
		alert("Seu Navegador não suporta Ajax!");
	else
		return request;
}

/**
 * Função para enviar os dados
 */

function retiraQuebraLinha(consulta){
	var str = consulta;
	var strsaida = str.replace(/[\n|\n\r]/g, " ");
	return strsaida;
}
function getDados1() {

	// Declaração de Variáveis
	var consulta = document.getElementById("query").value;
	var result = document.getElementById("Resultado");
	var xmlreq = CriaRequest();
	// var consutaProcesada = processaQuery(consuta);
	//var resultado = '';
	ativarTab();
	var consultapos ='';
	// Exibi a imagem de progresso
	result.innerHTML = '<div align="center"><img src="imagens/loading.gif"/> </div>';
	
	consultapos = retiraQuebraLinha(consulta);
	console.log (consultapos);
	// Iniciar uma requisição
	xmlreq.open("GET", "bancoDados/bdPersistencia.php?query=" + consultapos, true);

	// Atribui uma função para ser executada sempre que houver uma mudança de
	// ado
	xmlreq.onreadystatechange = function() {

		// Verifica se foi concluído com sucesso e a conexão fechada
		// (readyState=4)
		if (xmlreq.readyState == 4) {

			// Verifica se o arquivo foi encontrado com sucesso
			//if (xmlreq.status == 200) {
			//	result.innerHTML  =  xmlreq.responseText; // mudar aqui
			//} else {
			//	result.innerHTML = "Erro: " + xmlreq.statusText;
			//}
			tabelas(xmlreq.responseText);
		}
		
	};
	xmlreq.send(null);
	//return resultado;
	
}

function tabelas(data) {

	// ativarTab();
	//console.log(vare);
	//$.getJSON(vare, 
	//function(data) {
	//console.log(data);
		var k = '';
		var f = '';
		var result = "<table class='table table-bordered' id= 'tableResult'> <thead> <tr> ";
		var i = 0;
		var j = 0;
		var g = null;

		var resultado = document.getElementById("Resultado");
		
		var dadosGrafo;
		try{
		dadosGrafo = JSON.parse(data);
		}catch (e) {
			resultado.innerHTML = data;
			k = [0];
			f = [0];
		}

		k = Object.keys(dadosGrafo.features[0].properties);
		console.log(k);

		f = Object.keys(dadosGrafo.features);
		console.log(f);
		g = dadosGrafo.features[0].geometry;
		console.log(g);
		
		if (g != null){
			createVetL(k);
		}
		
		
		for (i = 0; i < k.length; i++) {

			result = result + '<th id = "headTabela">' + k[i] + '</th>';

		}

		result = result + '</tr> </thead> <tbody> ';

		for (i = 0; i < f.length; i++) {
			result = result + '<tr>';
			for (j = 0; j < k.length; j++) {
				result = result + '<td>'
						+ dadosGrafo.features[i].properties[k[j]] + '</td>';
			}
			result = result + '</tr>';
		}

		des = dadosGrafo.features

		// result = result + '</tr>';
		result = result + "</tbody></table>";

		resultado.innerHTML = result;
		
		
		//if (dadosGrafos.features[0].geometry != null){
			//createVetL();
		//}

	//}
	//);
}

function getDados() {
	getDados1();
	
	//tabelas(vare);
}
