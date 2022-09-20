-- migrate:up
create table lodgmentHashTagId(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  hashTagId int not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (hashTagId) REFERENCES lodgmentHashTag(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table lodgmentHashTagId;
