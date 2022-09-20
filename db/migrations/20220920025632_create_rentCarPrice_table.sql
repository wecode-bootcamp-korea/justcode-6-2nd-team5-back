-- migrate:up
create table rentCarPrice(
  id int primary key auto_increment not null,
  rentCarCompanyId int not null,
  experienceId int not null,
  ageId int not null,
  insuranceId int not null,
  price int not null,
  FOREIGN KEY (rentCarCompanyId) REFERENCES rentCompanyCar(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (experienceId) REFERENCES rentCarDriveExperience(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (ageId) REFERENCES rentCarDriveAge(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (insuranceId) REFERENCES rentCarDriveInsurance(id) ON UPDATE CASCADE DELETE CASCADE,
);

-- migrate:down
drop table rentCarPrice;
