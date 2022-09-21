-- migrate:up
create table restaurantCategory(
  id int not null auto_increment primary key,
  category varchar(50) not null
)

-- migrate:down
drop table restaurantCategory;
