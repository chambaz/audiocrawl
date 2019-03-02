<?php

$json = array();

$mysqli = new mysqli('localhost', 'root', 'root', 'audiocrawl-legacy');

$demos = $mysqli->query('select * from demos');
$demos->data_seek(0);

while ($drow = $demos->fetch_assoc()) {
  $data = array(
    'title' => $drow['title'],
    'slug' => $drow['url_title'],
    'originalUrl' => $drow['url'],
    'image' => $drow['image'],
    'date' => $drow['activated_at']
  );

  $tags = $mysqli->query('select * from demo_tags where demo_id = '.$drow['id']);
  $tags->data_seek(0);
  $t = array();

  while ($tsrow = $tags->fetch_assoc()) {
    $tag = $mysqli->query('select * from tags where id = '.$tsrow['tag_id']);
    $tag->data_seek(0);

    while ($trow = $tag->fetch_assoc()) {
      array_push($t, $trow['title']);
    }
  }

  $data['tags'] = $t;

  array_push($json, $data);
}

$fp = fopen('import.json', 'w');
fwrite($fp, json_encode($json, JSON_PRETTY_PRINT));
fclose($fp);
