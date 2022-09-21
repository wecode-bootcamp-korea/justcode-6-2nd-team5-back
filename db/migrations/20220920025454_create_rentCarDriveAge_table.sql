-- migrate:up
create table rentCarDriveAge(
  id int primary key auto_increment not null,
  age varchar(100) not null
);

-- migrate:down
drop table rentCarDriveAge;
