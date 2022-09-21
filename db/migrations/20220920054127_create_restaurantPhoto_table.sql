-- migrate:up
create table restaurantPhoto(
  id int primary key auto_increment not null,
  restaurantId int not null,
  photo varchar(3000),
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table restaurantPhoto;
