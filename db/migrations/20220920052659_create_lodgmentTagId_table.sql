-- migrate:up
create table lodgmentTagId(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  lodgmentTagId int not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (lodgmentTagId) REFERENCES lodgmentTag(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table lodgmentTagId;
