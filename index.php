<?php
require 'inc/init.php';

$slug = 'home';
$title = 'Fashion';

$slides = [
    new Slide(
        'Blanditiis eaque laudantium, maxime ullam.',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. At laudantium ex voluptate deleniti dolor fugit praesentium obcaecati, aliquam asperiores neque unde earum non quae doloremque sit repudiandae nam fugiat nulla?',
        '/img/fashion1.jpg',
        '/top3.php'
    ),
    new Slide(
        'Iure laudantium unde quibusdam sit dolores.',
        'Veritatis voluptates quaerat maxime quas assumenda reiciendis ullam unde consectetur, magni voluptate dolores a nam architecto culpa dolorem mollitia alias expedita repudiandae.',
        '/img/fashion2.jpg',
        '/top3.php'
    ),
    new Slide(
        'Aperiam distinctio dignissimos.',
        'Dolor sit amet consectetur adipisicing elit. Nobis, repellat ipsum. Repudiandae, assumenda expedita quis vel, eius perspiciatis ab odit doloremque possimus accusamus dolorum sint perferendis doloribus itaque sunt ut.',
        '/img/fashion3.jpg',
        '/top3.php'
    )
];
$slidesContainer = new SlidesContainer($slides, $slug, 1, 'Discover');

?> 
<?php require 'parts/header.php' ?>
    <?php $slidesContainer->showAll() ?>
<?php require 'parts/footer.php' ?>