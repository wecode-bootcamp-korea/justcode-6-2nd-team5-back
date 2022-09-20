-- migrate:up
create table rentCarOptionId(
  id int primary key auto_increment not null,
  rentCarId int not null,
  optionId int not null,
  FOREIGN KEY (rentCarId) REFERENCES rentCompanyCar(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (optionId) REFERENCES rentCarOption(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table rentCarOptionId;
