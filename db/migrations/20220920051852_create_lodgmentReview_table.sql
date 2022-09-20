-- migrate:up
create table lodgmentReview(
  id int primary key auto_increment not null,
  userId int not null,
  category varchar not null,
  lodgmentId int not null,
  review varchar,
  cleanPoint double not null,
  facilityPoint double not null,
  servicePoint double not null,
  costperformancePoint double not null,
  reviewPoint double not null,
  created_at timestamp not null default now(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE UPDATE CASCADE,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table lodgmentReview;
