-- migrate:up
create table rentCarReservation(
  id int primary key auto_increment not null,
  userId int not null,
  rentCarId int not null,
  rentDate datetime not null,
  returnDate datetime not null,
  category varchar(100) not null,
  created_at timestamp not null default now(),
  FOREIGN KEY (rentCarId) REFERENCES rentCompanyCar(id) ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table rentCarReservation;
