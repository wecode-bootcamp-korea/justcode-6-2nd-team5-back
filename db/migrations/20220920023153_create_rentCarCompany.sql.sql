-- migrate:up
CREATE TABLE rentCarCompany (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  rentCarCompany VARCHAR NOT NULL,
  rentCarCompanyAddress VARCHAR NOT NULL
);

-- migrate:down
DROP TABLE rentCarCompany;
