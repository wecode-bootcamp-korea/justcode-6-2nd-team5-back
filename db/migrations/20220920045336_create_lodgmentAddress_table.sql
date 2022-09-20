-- migrate:up
create table lodgmentAddress(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  bigAddress varchar not null,
  regionAddress varchar not null,
  fullAddress varchar not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table lodgmentAddress;
