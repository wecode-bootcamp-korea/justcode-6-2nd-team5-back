-- migrate:up
create table rentCarHashTagId(
  id int primary key auto_increment not null,
  rentCarId int not null,
  hashTagId int not null,
  FOREIGN KEY (rentCarId) REFERENCES rentCompanyCar(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (hashTagId) REFERENCES rentCarHashTag(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table rentCarHashTagId;
