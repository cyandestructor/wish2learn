<?php
    namespace Validators;

    class CourseCreationValidator extends CourseValidator
    {
        private static $fields = ['title', 'description', 'price'];

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
    }