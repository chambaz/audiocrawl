<?php
use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
  'endpoints' => [
    '/api/crawls.json' => function() {

      // query params for filtering
      $tagParam = \Craft::$app->request->getQueryParam('tag');
      $searchParam = \Craft::$app->request->getQueryParam('q');

      // build up criteria array
      $criteria = [
        'section' => 'crawls'
      ];

      // add tag filter
      if ($tagParam) {
        $criteria['relatedTo'] = \craft\elements\Tag::find()->search($tagParam)->first();
      }

      // add search filter
      if ($searchParam) {
        $criteria['search'] = $searchParam;
      }

      return [
        'elementType' => Entry::class,
        'criteria' => $criteria,
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