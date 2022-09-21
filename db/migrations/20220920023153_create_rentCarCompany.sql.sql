-- migrate:up
CREATE TABLE rentCarCompany (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  rentCarCompany VARCHAR(50) NOT NULL,
  rentCarCompanyAddress VARCHAR(300) NOT NULL
);

-- migrate:down
DROP TABLE rentCarCompany;
