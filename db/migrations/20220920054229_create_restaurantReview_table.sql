-- migrate:up
create table restaurantReview(
  id int primary key auto_increment not null,
  userId int not null,
  restaurantId int not null,
  review varchar(3000),
  tastePoint double not null,
  servicePoint double not null,
  moodPoint double not null,
  reviewPoint double not null,
  created_at timestamp not null default now(),
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON DELETE CASCADE UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table restaurantReview;
