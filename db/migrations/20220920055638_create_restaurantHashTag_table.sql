-- migrate:up
create table restaurantHashTag(
  id int primary key auto_increment not null,
  hashTag varchar(50) not null
)

-- migrate:down
drop table restaurantHashTag;
