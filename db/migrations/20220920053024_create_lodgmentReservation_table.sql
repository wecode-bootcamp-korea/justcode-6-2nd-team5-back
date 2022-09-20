-- migrate:up
create table lodgmentReservation(
  id int primary key auto_increment not null,
  userId int not null,
  lodgmentId int not null,
  roomId int not null,
  roomRentDate datetime not null,
  peopleNumber int not null,
  price int not null,
  created_at timestamp not null default now(),
  FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE,
  FOREIGN KEY (roomId) REFERENCES lodgmentRoom(id) ON UPDATE CASCADE,
  FOREIGN KEY (roomRentDate) REFERENCES lodgmentRoomRentDate(id) ON UPDATE CASCADE
)

-- migrate:down
drop table lodgmentReservation;
