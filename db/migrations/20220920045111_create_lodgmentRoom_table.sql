-- migrate:up
create table lodgmentRoom(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  roomName varchar not null,
  peopleNumber varchar not null,
  smoking varchar not null,
  bedInfo varchar not null,
  price int not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE
)

-- migrate:down
drop table lodgmentRoom;
