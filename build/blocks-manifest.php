<?php
// This file is generated. Do not modify it manually.
return array(
	'faq-accordion-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/faq-accordion-block',
		'version' => '1.0.0',
		'title' => 'FAQ Accordion',
		'category' => 'widgets',
		'icon' => 'editor-help',
		'description' => 'A dynamic FAQ accordion block with schema markup.',
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'attributes' => array(
			'faqs' => array(
				'type' => 'array',
				'default' => array(
					array(
						'question' => 'What is your return policy?',
						'answer' => 'We offer a 30-day return policy.'
					)
				)
			),
			'activeColor' => array(
				'type' => 'string',
				'default' => '#0073aa'
			),
			'showSchema' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
