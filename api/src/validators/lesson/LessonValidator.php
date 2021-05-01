<?php
    namespace Validators;

    class LessonValidator implements ValidatorInterface
    {
        private $data;
        private $errors = [];
        private static $fields = ['title'];

        public function __construct($post_data)
        {
            $this->data = $post_data;
        }

        public function validateForm()
        {
            foreach (self::$fields as $field)
            {
                if (!array_key_exists($field, $this->data)) {
                    trigger_error("$field is not present in the data");
                    return;
                }
            }

            $this->validateTitle();

            return $this->errors;
        }

        private function validateTitle()
        {
            $field = 'title';
            $title = trim($this->data[$field]);

            Validations::validate($title, $field, $this->errors)
                ->maxLength(50, 'The title must be less than 50 characters long')
                ->required('The title cannot be empty');
        }
    }
    