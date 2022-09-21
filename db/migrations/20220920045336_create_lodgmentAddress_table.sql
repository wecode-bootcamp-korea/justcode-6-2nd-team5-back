-- migrate:up
create table lodgmentAddress(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  bigAddress varchar(10) not null,
  regionAddress varchar(10) not null,
  fullAddress varchar(100) not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table lodgmentAddress;
