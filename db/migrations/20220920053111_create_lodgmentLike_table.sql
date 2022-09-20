-- migrate:up
create table lodgmentLike(
  id int primary key auto_increment not null,
  userId int not null,
  lodgmentId int not null,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON DELETE CASCADE UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table lodgmentLike;
