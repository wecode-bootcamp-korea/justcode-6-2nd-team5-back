-- migrate:up
create table restaurantMenu(
  id int primary key auto_increment not null,
  restaurantId int not null,
  menu varchar(20) not null,
  price int not null,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(Id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table restaurantMenu;
