<?php

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_RETURNTRANSFER => 1,
  CURLOPT_URL => 'http://audiocrawl.ac.dsdev/api/crawls.json?perPage=-1'
]);
$result = curl_exec($curl);
curl_close($curl);

if (!$result) {
  die;
}

$json = json_decode($result);

foreach($json->data as $crawl) {
  $curl = curl_init();
  curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $crawl->originalUrl
  ]);
  $result = curl_exec($curl);
  $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ($httpcode !== 200) {
    echo $httpcode.': '.$crawl->title."\r\n";
  }

  curl_close($curl);
}
