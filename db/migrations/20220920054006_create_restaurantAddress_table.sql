-- migrate:up
create table restaurantAddress(
  id int primary key auto_increment not null,
  restaurantId int not null,
  regionAddress varchar not null,
  fullAddress varchar not null,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table restaurantAddress;
