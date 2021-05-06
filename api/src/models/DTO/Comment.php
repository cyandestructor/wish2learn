<?php
    namespace Models;

    class Comment
    {
        public $id;
        public $body;
        public $upVotes;
        public $date;

        public $parentId;

        public $userId;
        public $userName;
        public $upVotedByUser;

        public $lessonId;

        public $published;
    }
    