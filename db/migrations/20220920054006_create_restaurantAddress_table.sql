-- migrate:up
create table restaurantAddress(
  id int primary key auto_increment not null,
  restaurantId int not null,
  regionAddress varchar(10) not null,
  fullAddress varchar(100) not null,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table restaurantAddress;
