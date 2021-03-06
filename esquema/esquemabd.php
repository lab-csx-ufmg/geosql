<html>
<?php
include '/home/guilhermehenrique/workspaceweb/geosql7/bancoDados/basesDados/configBase.php';

function getSchema(){
	$strConsult = " SELECT t.table_name as tabela, c.column_name as coluna
        FROM information_schema.tables t, information_schema.columns c
        WHERE t.table_name = c.table_name
        and t.table_catalog = '" . bd_name . "'
        and t.table_schema = '" . bd_schema . "'
        and t.table_type = 'BASE TABLE'
        ORDER BY t.table_name, c.column_name;
        ";
	
	$ParaConexao = getParametroBase ();
	$conexao = pg_pconnect ( $ParaConexao );
	$tableResult = pg_query ( $conexao, $strConsult );
	
	return $tableResult;

}

function arrumaschema($tableResult){
	$tableArray = pg_fetch_all_columns($tableResult,0);
	$colunArray = pg_fetch_all_columns($tableResult,1);
	
	//$colunas = array();
	//$tabArray = array();
	
	$tableArrayAux = utf8_encode($tableArray[0]);
	echo "<table class = 'table table-bordered' id='tabSchema'>";
	echo $tableArrayAux . "<br> <tr><td>".utf8_encode($colunArray[0]). "</td>";
	for($i = 1; $i < count($tableArray); $i++){
		if($tableArrayAux==$tableArray[$i]){
			$tableArrayAux = $tableArray[$i];
			echo "<td>". utf8_encode($colunArray[$i])."</td> ";
			//array_push($colunas, $tableArray[i]);
			
		}else{
			echo "</table>";
			echo "<table class = 'table table-bordered' id='tabSchema'>";
			$tableArrayAux = utf8_encode($tableArray[$i]);
			echo "<br>".$tableArrayAux . "<br><tr>" ;
			echo "<td>".$colunArray[$i]. "</td> ";
			//array_push($tabArray, $colunas);
			
		}
	}
	echo "</table>";
}

function plotaschema(){
	$tableResult = getSchema();
	//echo constant(bd_name);
	arrumaschema($tableResult);

}
?>

</html>
