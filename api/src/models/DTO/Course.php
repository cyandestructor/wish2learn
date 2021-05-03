<?php
    namespace Models;

    class Course
    {
        public $id;
        public $title;
        public $description;
        public $price;
        public $publicationDate;
        public $lastUpdate;
        public $published;

        public $productId;

        public $instructorId;
        public $instructorName;

        public $grade;
        public $totalStudents;
        public $totalLessons;

        public $image;
        public $imageType;
    }
    