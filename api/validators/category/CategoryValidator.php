<?php
    require_once('../ValidatorInterface.php');
    require_once('../Validations.php');

    class CategoryValidator implements ValidatorInterface
    {
        private $data;
        private $errors = [];
        private static $fields = ['name', 'description'];

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

            $this->validateName();
            $this->validateDescription();

            return $this->errors;
        }

        private function validateName()
        {
            $field = 'name';
            $name = trim($this->data[$field]);

            Validations::validate($name, $field, $this->errors)
                ->maxLength(50, 'The category must be less than 50 characters long')
                ->required('The category cannot be empty');
        }

        private function validateDescription()
        {
            $field = 'description';
            $description = trim($this->data[$field]);

            $max_length = 255;

            Validations::validate($description, $field, $this->errors)
                ->maxLength($max_length, "The description must be less than $max_length characters long")
                ->notRequired();
        }
    }