<?php
    require_once('UserValidator.php');

    class UserEditionValidator extends UserValidator
    {
        private static $fields = ['name', 'lastname', 'description'];

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

            $this->validateName();
            $this->validateLastname();
            $this->validateDescription();

            return $this->errors;
        }

        protected function validateDescription()
        {
            $field = 'description';
            $description = trim($this->data[$field]);
            $max_length = 1000;

            Validations::validate($description, $field, $this->errors)
                ->maxLength($max_length, "The description must be less than $max_length characters long")
                ->notRequired();
        }
    }