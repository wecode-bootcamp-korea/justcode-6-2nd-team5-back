-- migrate:up
create table restaurantHashTagId(
  id int primary key auto_increment not null,
  restaurantId int not null,
  restaurantHashTagId int not null,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (restaurantHashTagId) REFERENCES restaurantHashTag(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table restaurantHashTagId;
