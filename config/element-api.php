<?php
use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
  'endpoints' => [
    '/api/crawls.json' => function() {
      return [
        'elementType' => Entry::class,
        'criteria' => ['section' => 'crawls'],
        'transformer' => function(Entry $entry) {
          return [
            'url' => $entry->url,
            'title' => $entry->title,
            'description' => $entry->description,
            'originalUrl' => $entry->originalUrl,
            'date' => array(
              'human' => $entry->date->format('M j, Y'),
              'machine' => $entry->date->format('Y-M-D'),
            ),
            'image' => $entry->image[0]->url,
          ];
        }
      ];
    }
  ]
];