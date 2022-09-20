-- migrate:up
create table restaurantLike(
  id int primary key auto_increment not null,
  userId int not null,
  restaurantId int not null,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON DELETE CASCADE UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table restaurantLike;
