-- migrate:up
CREATE TABLE rentCarInfo (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  carName VARCHAR NOT NULL,
  carPhoto VARCHAR,
  ridePeopleNumber INT,
  oilType VARCHAR
);

-- migrate:down
DROP TABLE rentCarInfo;
