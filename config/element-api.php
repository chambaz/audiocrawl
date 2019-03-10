<?php
use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
  'endpoints' => [
    '/api/crawls.json' => function() {
      return [
        'elementType' => Entry::class,
        'criteria' => ['section' => 'crawls'],
        'elementsPerPage' => 18,
        'transformer' => function(Entry $entry) {
          return [
            'url' => $entry->url,
            'slug' => $entry->slug,
            'title' => $entry->title,
            'description' => $entry->description,
            'originalUrl' => $entry->originalUrl,
            'date' => array(
              'human' => $entry->date->format('M j, Y'),
              'machine' => $entry->date->format('Y-m-d'),
            ),
            'image' => $entry->image[0]->url,
            'tags' => array_map('strval', $entry->tags->all())
          ];
        }
      ];
    }
  ]
];