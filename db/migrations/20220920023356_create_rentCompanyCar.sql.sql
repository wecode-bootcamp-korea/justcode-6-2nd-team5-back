-- migrate:up
create table rentCompanyCar(
  id int primary key auto_increment not null,
  rentCarInfoId int not null,
  rentCarCompanyId int not null,
  rentCarYearInfo  int not null,
  totalReserve int,
  reviewPoint double
  FOREIGN KEY (rentCarInfoId) REFERENCES rentCarInfo(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (rentCarCompanyId) REFERENCES rentCarCompany(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table rentCompanyCar;
