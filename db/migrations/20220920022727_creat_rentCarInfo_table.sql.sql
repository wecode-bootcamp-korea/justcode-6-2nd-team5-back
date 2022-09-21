-- migrate:up
CREATE TABLE rentCarInfo (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  carName VARCHAR(50) NOT NULL,
  carPhoto VARCHAR(3000),
  ridePeopleNumber INT,
  oilType VARCHAR(20)
);

-- migrate:down
DROP TABLE rentCarInfo;
