-- migrate:up
create table rentCarOption(
  id int primary key auto_increment not null,
  option varchar(100) not null
);

-- migrate:down
drop table rentCarOption;
