<?php
    class UserRegisterValidator implements ValidatorInterface
    {
        private $data;
        private $errors = [];
        private static $fields = ["username", "name", "lastname", "email", "password"];

        public function __constructor($post_data)
        {
            $this->$data = $post_data;
        }

        public function validateForm()
        {
            foreach(self::$fields as $field)
            {
                if (!array_key_exists($field, $data)) {
                    trigger_error("$field is not present in the data");
                    return;
                }
            }

            $this->validateUsername();
            $this->validateEmail();
            $this->validateName();
            $this->validateLastname();
            $this->validatePassword();

            return $this->$errors;
        }

        private function validateUsername()
        {
            $field = "username";
            $username = trim($this->$data[$field]);

            if (empty($username)) {
                $this->addError($field, "The username cannot be empty");
            }
            else {
                if (!preg_match("/^[a-zA-Z0-9]{6-20}$/")) {
                    $this->addError($field, "The username must be alphanumeric and 6-20 characters long");
                }
            }
        }

        private function validateEmail()
        {
            $field = "email";
            $email = trim($this->$data[$field]);

            if(empty($email)){
                $this->addError($field, "The email cannot be empty");
            }
            else {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $this->addError($field, "The email must be a valid email");
                }
            }
        }

        private function validateName()
        {
            $field = "name";
            $name = trim($this->$data[$name_field]);

            if (empty($name)) {
                $this->addError($field, "The name cannot be empty");
            }
            else {

            }
        }

        private function validateLastname()
        {
            
        }

        private function validatePassword()
        {
            $field = "password";
            $password = trim($this->$data[$field]);

            if (empty($password)) {
                $this->addError($field, "Password cannot be empty");
            }
            else {
                # TODO: Change the regex
                if (!preg_match("/^[a-zA-Z0-9]{8-}$/")) {
                    $this->addError($field, "The password must include alphanumeric characters and least one special character and 8 characters long");
                }
            }
        }

        private function addError($key, $value)
        {
            $this->$errors[$key] = $value;
        }
    }  
?>