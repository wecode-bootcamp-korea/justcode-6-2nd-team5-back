-- migrate:up
create table restaurant(
  id int primary key auto_increment not null,
  name varchar(100) not null,
  intro varchar(1000),
  businessHour varchar(50) not null,
  phoneNumber varchar(15) not null,
  closedDay varchar(20) not null,
  reviewPoint double
)

-- migrate:down
drop table restaurant;
