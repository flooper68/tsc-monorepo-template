-- liquibase formatted sql

--changeset your.name:1
--rollback DROP TABLE test_entities;
CREATE TABLE users(
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);
