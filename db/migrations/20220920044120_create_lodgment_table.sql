-- migrate:up
create table lodgment(
  id int primary key auto_increment not null,
  name varchar not null,
  intro varchar,
  phoneNumber varchar not null,
  reviewPoint double,
  useInfo varchar,
  roomId int
)

-- migrate:down
drop table lodgment;
