<?php
    namespace Models;

    class Review
    {
        public $id;
        public $body;
        public $date;
        public $published;

        public $courseID;
        public $userID;
        public $userName;

        public $rate;
    }
    