<?php
    interface ResourceInterface
    {
        public function get(HttpRequest $request);
        public function post(HttpRequest $request);
        public function put(HttpRequest $request);
        public function delete(HttpRequest $request);
        public function defaultMethod(HttpRequest $request);
    }