-- migrate:up
create table lodgmentRoom(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  roomName varchar(100) not null,
  peopleNumber varchar(10) not null,
  smoking varchar(10) not null,
  bedInfo varchar(1000),
  price int not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE
)

-- migrate:down
drop table lodgmentRoom;
