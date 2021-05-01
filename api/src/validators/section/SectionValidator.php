<?php
    namespace Validators;

    class SectionValidator implements ValidatorInterface
    {
        private $data;
        private $errors = [];
        private static $fields = ['title', 'price'];

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
            $this->validatePrice();
            
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

        private function validatePrice()
        {
            $field = 'price';
            $price = trim($this->data[$field]);

            Validations::validate($price, $field, $this->errors)
                ->number('The price must be a valid number')
                ->minValue(0, 'The price must be greater or equal than 0')
                ->notRequired();
        }
    }