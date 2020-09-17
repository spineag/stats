<?php
$url = 'https://ua.energy/wp-admin/admin-ajax.php';
$data = array('action' => 'get_data_oes', 'report_date' => '15.09.2020', 'type' => 'day');


$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

echo $result;


?>