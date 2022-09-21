-- migrate:up
create table restaurantFacility(
  id int primary key auto_increment not null,
  facility varchar(50) not null
)

-- migrate:down
drop table restaurantFacility;
