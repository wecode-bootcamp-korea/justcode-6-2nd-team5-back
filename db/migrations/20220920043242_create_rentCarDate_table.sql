-- migrate:up
create table rentedCarDate(
  id int primary key auto_increment not null,
  rentCarId int not null,
  rentCarReservationId int not null,
  unableDate datetime not null,
  FOREIGN KEY (rentCarId) REFERENCES rentCompanyCar(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (rentCarReservationId) REFERENCES rentCarReservation(id) ON UPDATE CASCADE DELETE CASCADE
)

-- migrate:down
drop table rentedCarDate;
