<?php
    namespace W2l\Models\Dto;

    class Review
    {
        public $id;
        public $body;
        public $date;
        public $published;

        public $courseId;
        public $userId;
        public $userName;

        public $rate;
    }
    