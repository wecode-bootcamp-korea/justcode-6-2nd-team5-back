-- migrate:up
create table rentCompanyCar(
  id int primary key auto_increment not null,
  rentCarInfoId int not null,
  rentCarCompanyId int not null,
  rentCarYearInfo  int not null,
  totalReserve int,
  reviewPoint double,
  FOREIGN KEY (rentCarInfoId) REFERENCES rentCarInfo(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (rentCarCompanyId) REFERENCES rentCarCompany(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- migrate:down
drop table rentCompanyCar;
