-- migrate:up
create table restaurantFacilityId(
  id int primary key auto_increment not null,
  restaurantId int not null,
  restaurantFacilityId int not null,
  FOREIGN KEY (restaurantFacilityId) REFERENCES restaurantFacility(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table restaurantFacilityId;
