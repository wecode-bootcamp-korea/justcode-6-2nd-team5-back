-- migrate:up
create table lodgment(
  id int primary key auto_increment not null,
  name varchar(100) not null,
  intro varchar(1000),
  phoneNumber varchar(20) not null,
  reviewPoint double,
  useInfo varchar(3000),
  roomId int
)

-- migrate:down
drop table lodgment;
