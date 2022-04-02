<?php
require 'inc/init.php';

$slug = 'top3';
$title = 'Fashion';

$slides = [
    new Slide(
        "Lorem ipsum, dolor sit amet.",
        "Incidunt quasi ad repellat nobis ullam provident dolorem ex ratione pariatur, voluptate et dicta accusamus dolore, quod earum. Dolor fugiat voluptate vel.",
        '/img/top1.jpg',
        '/'
    ),
    new Slide(
        "Incidunt quidem inventore reiciendis iure.",
        "Quibusdam sequi voluptatibus at quo tempore sed, voluptas hic odio eaque possimus quam sint ut saepe impedit quidem excepturi, animi eos harum.",
        '/img/top2.jpg',
        '/'
    ),
    new Slide(
        "Maxime error inventore blanditiis!",
        "Voluptatum omnis itaque consequatur harum necessitatibus nostrum hic, explicabo perferendis natus ipsum! Eligendi consectetur harum et praesentium aperiam iure ipsa similique illo?",
        '/img/top3.jpg',
        '/'
    )
];
$slidesContainer = new SlidesContainer($slides, $slug, 2);

?>
<?php require 'parts/header.php' ?>
<h1>Top 3</h1>
<?php $slidesContainer->showAll() ?>
<?php require 'parts/footer.php' ?>