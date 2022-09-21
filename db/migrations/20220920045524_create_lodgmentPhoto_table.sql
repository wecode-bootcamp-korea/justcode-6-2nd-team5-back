-- migrate:up
create table lodgmentPhoto(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  photo varchar(3000),
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table lodgmentPhoto;
