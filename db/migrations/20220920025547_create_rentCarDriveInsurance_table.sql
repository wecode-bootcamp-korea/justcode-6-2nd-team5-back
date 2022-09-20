-- migrate:up
create table rentCarDriveInsurance(
  id int primary key auto_increment not null,
  insurance varchar not null
);

-- migrate:down
drop table rentCarDriveInsurance;
