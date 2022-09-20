-- migrate:up
create table lodgmentRoomRentedDate(
  id int primary key auto_increment not null,
  roomId int not null,
  rentedDate datetime not null,
  FOREIGN KEY (roomId) REFERENCES lodgmentRoom(id) ON UPDATE CASCADE
)

-- migrate:down
drop table lodgmentRoomRentedDate;
