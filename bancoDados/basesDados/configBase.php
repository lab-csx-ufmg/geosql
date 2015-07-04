<?php

define ( 'bd_dns', "pgsql" );
define ( "bd_name", "brasil" );
define ( "bd_server", "sandwich.lbd.dcc.ufmg.br" );
define ( "bd_user", "guilherme" );
define ( "bd_password", "123" );
define ( "bd_schema", "public" );
define ( "bd_port", "54321" );
define ( "geografico", true );


function getParametroBase() {
	$parametros = "host=" . bd_server . " dbname=". bd_name . " user=" . bd_user . " password=" . bd_password;
	return $parametros;
}


function db_schema() {
	$sql = "
        SELECT t.table_name as tabela, c.column_name as coluna
        FROM information_schema.tables t, information_schema.columns c
        WHERE t.table_name = c.table_name
        and t.table_catalog = '".bd_name."'
        and t.table_schema = '".bd_schema."'
        and t.table_type = 'BASE TABLE'
        ORDER BY t.table_name, c.column_name;
        ";

	return $sql;
}

?>