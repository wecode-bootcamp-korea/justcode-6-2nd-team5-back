-- migrate:up
create table rentCarDriveInsurance(
  id int primary key auto_increment not null,
  insurance varchar(100) not null
);

-- migrate:down
drop table rentCarDriveInsurance;
