<?php
    namespace W2l\Validators;

    class CourseValidator implements ValidatorInterface
    {
        protected $data;
        protected $errors = [];
        private static $fields = ['title', 'description', 'price'];

        public function __construct($post_data)
        {
            $this->data = $post_data;
        }

        public function validateForm()
        {
            foreach(self::$fields as $field)
            {
                if (!array_key_exists($field, $this->data)) {
                    trigger_error("$field is not present in the data");
                    return;
                }
            }

            $this->validateTitle();
            $this->validateDescription();
            $this->validatePrice();

            return $this->errors;
        }

        protected function validateTitle()
        {
            $field = 'title';
            $title = trim($this->data[$field]);

            $max_length = 70;

            Validations::validate($title, $field, $this->errors)
                ->maxLength($max_length, "The title must be less than $max_length characters long")
                ->required('The title cannot be empty');
        }

        protected function validateDescription()
        {
            $field = 'description';
            $description = trim($this->data[$field]);

            $max_length = 2000;

            Validations::validate($description, $field, $this->errors)
                ->maxLength($max_length, "The description must be less than $max_length characters long")
                ->notRequired();
        }

        protected function validatePrice()
        {
            $field = 'price';
            $price = trim($this->data[$field]);

            Validations::validate($price, $field, $this->errors)
                ->number('The price must be a valid number')
                ->minValue(0, 'The price must be greater or equal than 0')
                ->notRequired();
        }
    }