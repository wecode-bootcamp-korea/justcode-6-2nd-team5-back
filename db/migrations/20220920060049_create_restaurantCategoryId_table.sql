-- migrate:up
create table restaurantCategoryId(
  id int primary key auto_increment not null,
  restaurantId int not null,
  restaurantCategoryId int not null,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (restaurantCategoryId) REFERENCES restaurantCategory(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table restaurantCategoryId;
