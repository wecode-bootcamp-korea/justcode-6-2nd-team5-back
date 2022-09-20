-- migrate:up
create table rentedCarReview(
  id int primary key auto_increment not null,
  userId int not null,
  rentCarId int not null,
  carId int,
  review varchar,
  reviewPhoto varchar,
  kindPoint double not null,
  cleanPoint double not null,
  conveniencePoint double not null,
  reviewPoint double not null,
  category varchar not null,
  created_at timestamp not null default now(),
  FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (rentCarId) REFERENCES rentCompanyCar(id) ON UPDATE CASCADE DELETE CASCADE
)

-- migrate:down
drop table rentedCarReview;
