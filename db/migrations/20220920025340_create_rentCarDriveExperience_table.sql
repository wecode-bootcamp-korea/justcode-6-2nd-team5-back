-- migrate:up
create table rentCarDriveExperience(
  id int primary key auto_increment not null,
  experience varchar not null
);

-- migrate:down
drop table rentCarDriveExperience;
